// frontend/src/modules/videos/viewmodels/useVideoListViewModel.ts
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { videoService } from "../models/video.service";
import { VideoResponse } from "../models/video.types";
import { ApiError } from "@/core/api/http-client";

export interface VideoCardVM {
  id: number | string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  durationText: string;
  viewsText: string;
  creatorName: string;
  gameCategoryName: string;
  createdAtText: string;
}

function formatDuration(seconds?: number, label?: string): string {
  if (label) return label;
  if (!seconds || seconds <= 0) return "05:00";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function formatViews(views?: number): string {
  if (views == null) return "Mới đăng";
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M lượt xem`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(1)}K lượt xem`;
  return `${views} lượt xem`;
}

function formatRelativeTime(iso?: string): string {
  if (!iso) return "Vừa xong";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "Vừa xong";
  const diffHours = Math.max(1, Math.floor((Date.now() - date.getTime()) / 3_600_000));
  if (diffHours < 24) return `${diffHours} giờ trước`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} ngày trước`;
}

function mapToCardVM(item: VideoResponse): VideoCardVM {
  return {
    id: item.id,
    title: item.title,
    description: item.description || "Video highlight & chia sẻ từ cộng đồng LeeMed.",
    videoUrl: item.videoUrl,
    thumbnailUrl: item.thumbnailUrl || "/images/video-placeholder.jpg",
    durationText: formatDuration(item.durationSeconds, item.durationLabel),
    viewsText: formatViews(item.views),
    creatorName: item.creatorName || `Creator #${item.creatorId ?? "LeeMed"}`,
    gameCategoryName: item.gameCategoryName || "Cộng đồng Game",
    createdAtText: formatRelativeTime(item.createdAt),
  };
}

export function useVideoListViewModel(initialPageSize = 9) {
  const [rawVideos, setRawVideos] = useState<VideoResponse[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedCreatorId, setSelectedCreatorId] = useState<number | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [size] = useState(initialPageSize);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchVideos = useCallback(async () => {
    try {
      setLoading(true);
      setErrorMessage(null);
      const data = await videoService.getVideos({
        gameCategoryId: selectedCategoryId,
        creatorId: selectedCreatorId,
        page,
        size,
      });
      setRawVideos(data.content ?? []);
      setTotalPages(data.totalPages ?? 0);
      setTotalElements(data.totalElements ?? 0);
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Không thể tải danh sách video.");
      }
    } finally {
      setLoading(false);
    }
  }, [selectedCategoryId, selectedCreatorId, page, size]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const mappedVideos = useMemo(() => {
    const items = rawVideos.map(mapToCardVM);
    const q = searchKeyword.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.creatorName.toLowerCase().includes(q) ||
        v.gameCategoryName.toLowerCase().includes(q)
    );
  }, [rawVideos, searchKeyword]);

  const trendingVideo = mappedVideos[0] ?? null;
  const feedVideos = mappedVideos;

  const selectCategory = (categoryId: number | null) => {
    setPage(0);
    setSelectedCategoryId(categoryId);
  };

  const toggleCreatorFilter = (creatorId: number | null) => {
    setPage(0);
    setSelectedCreatorId((prev) => (prev === creatorId ? null : creatorId));
  };

  return {
    trendingVideo,
    feedVideos,
    selectedCategoryId,
    selectCategory,
    selectedCreatorId,
    toggleCreatorFilter,
    searchKeyword,
    setSearchKeyword,
    page,
    setPage,
    totalPages,
    totalElements,
    loading,
    errorMessage,
    refresh: fetchVideos,
  };
}