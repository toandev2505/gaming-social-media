// frontend/src/modules/videos/viewmodels/useVideoDetailViewModel.ts
"use client";

import { useCallback, useEffect, useState, FormEvent } from "react";
import { videoService } from "../models/video.service";
import { VideoResponse } from "../models/video.types";
import { ApiError } from "@/core/api/http-client";
import { getStoredSession } from "@/modules/auth/models/auth.session";

export interface VideoCommentItem {
  id: string;
  author: string;
  content: string;
  createdAtText: string;
}

export function useVideoDetailViewModel(videoId: string) {
  const [video, setVideo] = useState<VideoResponse | null>(null);
  const [recommendedVideos, setRecommendedVideos] = useState<VideoResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isFollowing, setIsFollowing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const [comments, setComments] = useState<VideoCommentItem[]>([
    {
      id: "c-1",
      author: "nora.exe",
      content: "Pha xử lý đoạn giữa căng thật, góc nhìn rất rõ ràng.",
      createdAtText: "15 phút trước",
    },
    {
      id: "c-2",
      author: "AshenOne",
      content: "Chia sẻ thêm setup và mẹo canh thời gian ở đoạn cuối nhé.",
      createdAtText: "42 phút trước",
    },
  ]);
  const [commentInput, setCommentInput] = useState("");
  const [commentError, setCommentError] = useState<string | null>(null);

  const loadDetailAndRecommendations = useCallback(async () => {
    if (!videoId) return;
    try {
      setLoading(true);
      setErrorMessage(null);

      const currentVideo = await videoService.getVideoById(videoId);
      setVideo(currentVideo);

      const categoryId =
        currentVideo.gameCategoryId != null && !Number.isNaN(Number(currentVideo.gameCategoryId))
          ? Number(currentVideo.gameCategoryId)
          : null;

      const pageData = await videoService.getVideos({
        gameCategoryId: categoryId,
        page: 0,
        size: 12,
      });

      let candidates = (pageData.content ?? []).filter(
        (item) => String(item.id) !== String(currentVideo.id)
      );

      if (candidates.length === 0 && categoryId != null) {
        const fallbackPage = await videoService.getVideos({ page: 0, size: 12 });
        candidates = (fallbackPage.content ?? []).filter(
          (item) => String(item.id) !== String(currentVideo.id)
        );
      }

      setRecommendedVideos(candidates.slice(0, 8));
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Không thể tải chi tiết video.");
      }
    } finally {
      setLoading(false);
    }
  }, [videoId]);

  useEffect(() => {
    loadDetailAndRecommendations();
  }, [loadDetailAndRecommendations]);

  const toggleFollow = () => {
    setIsFollowing((prev) => !prev);
  };

  const copyShareLink = async () => {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch {
      setCopiedLink(false);
    }
  };

  const handleAddComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCommentError(null);

    const text = commentInput.trim();
    if (!text) {
      setCommentError("Vui lòng nhập nội dung bình luận.");
      return;
    }

    const session = getStoredSession();
    const authorName =
      session.user?.username || session.user?.email || "Người xem LeeMed";

    const newItem: VideoCommentItem = {
      id: `c-${Date.now()}`,
      author: authorName,
      content: text,
      createdAtText: "Vừa xong",
    };

    setComments((prev) => [newItem, ...prev]);
    setCommentInput("");
  };

  return {
    video,
    recommendedVideos,
    loading,
    errorMessage,
    retry: loadDetailAndRecommendations,
    isFollowing,
    toggleFollow,
    copiedLink,
    copyShareLink,
    comments,
    commentInput,
    setCommentInput,
    commentError,
    handleAddComment,
  };
}