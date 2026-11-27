
// frontend/src/modules/videos/viewmodels/useUploadVideoViewModel.ts
"use client";

import { useState, FormEvent } from "react";
import { videoService } from "../models/video.service";
import { VideoResponse } from "../models/video.types";
import { ApiError } from "@/core/api/http-client";

export function useUploadVideoViewModel(onSuccess?: (created: VideoResponse) => void) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [gameCategoryId, setGameCategoryId] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setVideoUrl("");
    setThumbnailUrl("");
    setGameCategoryId("");
    setErrorMessage(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!title.trim()) {
      setErrorMessage("Vui lòng nhập tiêu đề video.");
      return;
    }
    if (!videoUrl.trim()) {
      setErrorMessage("Vui lòng nhập đường dẫn video (videoUrl).");
      return;
    }

    const parsedCategoryId =
      gameCategoryId.trim() !== "" && !Number.isNaN(Number(gameCategoryId))
        ? Number(gameCategoryId)
        : null;

    try {
      setSubmitting(true);
      const created = await videoService.uploadVideo({
        title: title.trim(),
        description: description.trim() || undefined,
        videoUrl: videoUrl.trim(),
        thumbnailUrl: thumbnailUrl.trim() || undefined,
        gameCategoryId: parsedCategoryId,
      });
      resetForm();
      onSuccess?.(created);
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Không thể đăng video. Vui lòng thử lại.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    videoUrl,
    setVideoUrl,
    thumbnailUrl,
    setThumbnailUrl,
    gameCategoryId,
    setGameCategoryId,
    submitting,
    errorMessage,
    handleSubmit,
    resetForm,
  };
}