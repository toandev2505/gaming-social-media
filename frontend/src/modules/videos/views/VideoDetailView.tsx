// frontend/src/modules/videos/views/VideoDetailView.tsx
"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useVideoDetailViewModel } from "../viewmodels/useVideoDetailViewModel";

interface VideoDetailViewProps {
  videoId: string;
}

export function VideoDetailView({ videoId }: VideoDetailViewProps) {
  const vm = useVideoDetailViewModel(videoId);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 p-4 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <Link
          href="/videos"
          className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-[#b8f53b] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại danh sách video</span>
        </Link>
      </div>

      {vm.loading && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-sm text-zinc-400">
          Đang tải chi tiết video...
        </div>
      )}

      {!vm.loading && vm.errorMessage && (
        <div className="rounded-2xl border border-red-800/70 bg-red-950/60 p-6 space-y-3 text-sm text-red-300">
          <p>{vm.errorMessage}</p>
          <button
            type="button"
            onClick={vm.retry}
            className="h-9 px-4 rounded-lg bg-red-900 text-white text-xs cursor-pointer"
          >
            Thử lại
          </button>
        </div>
      )}

      {!vm.loading && vm.video && (
        <article className="space-y-4">
          <div className="aspect-video w-full rounded-2xl overflow-hidden border border-zinc-800 bg-black">
            <video
              src={vm.video.videoUrl}
              poster={vm.video.thumbnailUrl}
              controls
              className="w-full h-full"
            />
          </div>

          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 space-y-3">
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#b8f53b]">
              <span>{vm.video.gameCategoryName || `Category #${vm.video.gameCategoryId ?? "—"}`}</span>
              <span>•</span>
              <span className="text-zinc-400">
                {vm.video.creatorName || `Creator #${vm.video.creatorId ?? "—"}`}
              </span>
              {vm.video.views != null && (
                <>
                  <span>•</span>
                  <span className="text-zinc-400">{vm.video.views} lượt xem</span>
                </>
              )}
            </div>

            <h1 className="text-2xl font-bold text-white">{vm.video.title}</h1>

            <p className="text-sm text-zinc-300 whitespace-pre-line leading-relaxed">
              {vm.video.description || "Không có mô tả cho video này."}
            </p>
          </div>
        </article>
      )}
    </div>
  );
}