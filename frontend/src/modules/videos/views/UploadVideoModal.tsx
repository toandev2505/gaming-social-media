// frontend/src/modules/videos/views/UploadVideoModal.tsx
"use client";

import { X } from "lucide-react";
import { useUploadVideoViewModel } from "../viewmodels/useUploadVideoViewModel";
import { VideoResponse } from "../models/video.types";

interface UploadVideoModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (video: VideoResponse) => void;
}

export function UploadVideoModal({ open, onClose, onCreated }: UploadVideoModalProps) {
  const vm = useUploadVideoViewModel((created) => {
    onCreated(created);
    onClose();
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-2xl bg-zinc-950 border border-zinc-800 p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Đăng video mới</h2>
            <p className="text-xs text-zinc-400">
              Gửi metadata, liên kết video và ảnh thumbnail lên hệ thống.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={vm.handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-zinc-300">
              Tiêu đề video *
            </label>
            <input
              type="text"
              value={vm.title}
              onChange={(e) => vm.setTitle(e.target.value)}
              placeholder="Ví dụ: Highlight combat cuối trận"
              className="w-full h-10 px-3.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-[#b8f53b]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-zinc-300">
              Đường dẫn video (videoUrl) *
            </label>
            <input
              type="url"
              value={vm.videoUrl}
              onChange={(e) => vm.setVideoUrl(e.target.value)}
              placeholder="https://.../video.mp4"
              className="w-full h-10 px-3.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-[#b8f53b]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-zinc-300">
                Ảnh thumbnail (thumbnailUrl)
              </label>
              <input
                type="url"
                value={vm.thumbnailUrl}
                onChange={(e) => vm.setThumbnailUrl(e.target.value)}
                placeholder="https://.../thumb.jpg"
                className="w-full h-10 px-3.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-[#b8f53b]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-zinc-300">
                ID Danh mục game (gameCategoryId)
              </label>
              <input
                type="number"
                value={vm.gameCategoryId}
                onChange={(e) => vm.setGameCategoryId(e.target.value)}
                placeholder="Ví dụ: 1"
                className="w-full h-10 px-3.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-[#b8f53b]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-zinc-300">
              Mô tả
            </label>
            <textarea
              rows={3}
              value={vm.description}
              onChange={(e) => vm.setDescription(e.target.value)}
              placeholder="Mô tả ngắn về trận đấu, mẹo chơi hoặc nội dung video..."
              className="w-full p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-[#b8f53b]"
            />
          </div>

          {vm.errorMessage && (
            <div className="p-3 rounded-lg bg-red-950/60 border border-red-800/70 text-xs text-red-300">
              {vm.errorMessage}
            </div>
          )}

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="h-10 px-4 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs font-medium text-zinc-300 cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={vm.submitting}
              className="h-10 px-5 rounded-lg bg-[#b8f53b] hover:bg-[#c6ff4d] disabled:opacity-60 text-xs font-semibold text-zinc-950 cursor-pointer"
            >
              {vm.submitting ? "Đang đăng..." : "Đăng video"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}