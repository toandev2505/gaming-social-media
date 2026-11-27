// frontend/src/modules/videos/viewmodels/useVideoDetailViewModel.ts
"use client";

import { useCallback, useEffect, useState } from "react";
import { videoService } from "../models/video.service";
import { VideoResponse } from "../models/video.types";
import { ApiError } from "@/core/api/http-client";

export function useVideoDetailViewModel(videoId: string) {
  const [video, setVideo] = useState<VideoResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadDetail = useCallback(async () => {
    if (!videoId) return;
    try {
      setLoading(true);
      setErrorMessage(null);
      const data = await videoService.getVideoById(videoId);
      setVideo(data);
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
    loadDetail();
  }, [loadDetail]);

  return {
    video,
    loading,
    errorMessage,
    retry: loadDetail,
  };
}