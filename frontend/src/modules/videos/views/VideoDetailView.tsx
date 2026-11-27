// frontend/src/modules/videos/views/VideoDetailView.tsx
"use client";

import { FormEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Coins,
  UserPlus,
  Check,
  Share2,
  Play,
  MessageSquare,
  Film,
  Home,
  Radio,
  Gamepad2,
} from "lucide-react";
import { useVideoDetailViewModel } from "../viewmodels/useVideoDetailViewModel";

interface VideoDetailViewProps {
  videoId: string;
}

export function VideoDetailView({ videoId }: VideoDetailViewProps) {
  const vm = useVideoDetailViewModel(videoId);

  const onSubmitComment = (e: FormEvent<HTMLFormElement>) => {
    vm.handleAddComment(e);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col">
      {/* Top Bar */}
      <header className="h-14 px-4 lg:px-6 border-b border-zinc-900 bg-[#09090b]/95 sticky top-0 z-30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-base text-white">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-[#b8f53b] text-black text-xs font-extrabold">
              L
            </span>
            <span>LeeMed</span>
          </Link>

          <Link
            href="/videos"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#b8f53b] transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại Video</span>
            {vm.video?.gameCategoryName && (
              <>
                <span className="text-zinc-600">/</span>
                <span className="text-zinc-300">{vm.video.gameCategoryName}</span>
              </>
            )}
          </Link>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/videos"
            className="h-8 px-3 rounded-lg bg-[#b8f53b] hover:bg-[#c6ff4d] text-zinc-950 font-semibold text-xs inline-flex items-center"
          >
            + Danh sách video
          </Link>
          <Link
            href="/login"
            className="h-8 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-200 inline-flex items-center"
          >
            Tài khoản
          </Link>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Left Icon Rail */}
        <aside className="hidden md:flex w-12 shrink-0 flex-col items-center py-4 gap-3 border-r border-zinc-900 bg-zinc-950/60">
          <Link
            href="/"
            title="Trang chủ"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-900"
          >
            <Home className="w-4 h-4" />
          </Link>
          <Link
            href="/videos"
            title="Video"
            className="w-8 h-8 rounded-lg flex items-center justify-center bg-zinc-900 text-[#b8f53b] border border-zinc-800"
          >
            <Film className="w-4 h-4" />
          </Link>
          <span
            title="Livestream"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500"
          >
            <Radio className="w-4 h-4" />
          </span>
          <span
            title="Danh mục game"
            className="w-8 h-8 rounded-lg flex items-center justify-center text-zinc-500"
          >
            <Gamepad2 className="w-4 h-4" />
          </span>
        </aside>

        {/* Main Watch Content */}
        <main className="flex-1 max-w-[1440px] w-full mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Player + Meta + Info Cards + Comments */}
          <div className="lg:col-span-8 space-y-5">
            {vm.loading && (
              <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-8 text-sm text-zinc-400">
                Đang tải video #{videoId}...
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
              <>
                {/* Video Player */}
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-800 bg-black">
                  <video
                    src={vm.video.videoUrl}
                    poster={vm.video.thumbnailUrl}
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Title + Creator + Action Buttons */}
                <div className="space-y-3">
                  <h1 className="text-xl sm:text-2xl font-bold text-white leading-snug">
                    {vm.video.title}
                  </h1>

                  <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-zinc-900">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-[#b8f53b]">
                        {(vm.video.creatorName || "LM").slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-white">
                          <span>{vm.video.creatorName || `Creator #${vm.video.creatorId ?? "1"}`}</span>
                          <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[10px] text-[#b8f53b]">
                            {vm.video.gameCategoryName || "Cộng đồng Game"}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-400">
                          {vm.video.views != null ? `${vm.video.views} lượt xem` : "Video cộng đồng"} • ID #{vm.video.id}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={vm.toggleFollow}
                        className={`h-9 px-3.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition cursor-pointer ${
                          vm.isFollowing
                            ? "bg-[#b8f53b] text-zinc-950"
                            : "bg-zinc-900 hover:bg-zinc-800 text-zinc-100 border border-zinc-800"
                        }`}
                      >
                        {vm.isFollowing ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Đang theo dõi</span>
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-3.5 h-3.5" />
                            <span>Theo dõi</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={vm.copyShareLink}
                        className="h-9 px-3.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-200 inline-flex items-center gap-1.5 transition cursor-pointer"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>{vm.copiedLink ? "Đã sao chép link" : "Chia sẻ"}</span>
                      </button>

                      <span className="h-9 px-3 rounded-lg bg-zinc-950 border border-zinc-800/80 text-xs text-zinc-400 inline-flex items-center gap-1.5">
                        <Coins className="w-3.5 h-3.5 text-[#b8f53b]" />
                        <span>Ủng hộ creator</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Two Info Cards Below Video */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4 space-y-2">
                    <h2 className="text-xs font-semibold text-white">
                      Về {vm.video.creatorName || "Creator"}
                    </h2>
                    <p className="text-xs text-zinc-400 leading-relaxed whitespace-pre-line">
                      {vm.video.description ||
                        "Chia sẻ highlight, hướng dẫn chiến thuật và khoảnh khắc đáng nhớ cùng cộng đồng LeeMed."}
                    </p>
                  </div>

                  <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <h2 className="font-semibold text-white">Thông tin video</h2>
                      <span className="text-[11px] text-[#b8f53b]">
                        {vm.video.gameCategoryName || "Game"}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      Mã video: <span className="text-zinc-200">#{vm.video.id}</span>
                    </p>
                    <p className="text-xs text-zinc-400">
                      Danh mục:{" "}
                      <span className="text-zinc-200">
                        {vm.video.gameCategoryName || `#${vm.video.gameCategoryId ?? "Chưa phân loại"}`}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Comments Section */}
                <section className="rounded-2xl border border-zinc-800/80 bg-zinc-950 p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#b8f53b]" />
                      <h2 className="text-sm font-bold text-white">
                        Bình luận ({vm.comments.length})
                      </h2>
                    </div>
                    <span className="text-[11px] text-zinc-500">Thảo luận cộng đồng</span>
                  </div>

                  <form onSubmit={onSubmitComment} className="space-y-2.5">
                    <textarea
                      rows={2}
                      value={vm.commentInput}
                      onChange={(e) => vm.setCommentInput(e.target.value)}
                      placeholder="Viết bình luận của bạn về video này..."
                      className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#b8f53b]"
                    />

                    {vm.commentError && (
                      <p className="text-xs text-red-400">{vm.commentError}</p>
                    )}

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="h-9 px-4 rounded-lg bg-[#b8f53b] hover:bg-[#c6ff4d] text-zinc-950 font-semibold text-xs transition cursor-pointer"
                      >
                        Gửi bình luận
                      </button>
                    </div>
                  </form>

                  <div className="space-y-3 pt-2 border-t border-zinc-900">
                    {vm.comments.map((cmt) => (
                      <div
                        key={cmt.id}
                        className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/60 space-y-1"
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-zinc-200">{cmt.author}</span>
                          <span className="text-zinc-500">{cmt.createdAtText}</span>
                        </div>
                        <p className="text-xs text-zinc-300 leading-relaxed">{cmt.content}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>

          {/* Right Column: Recommended Videos */}
          <aside className="lg:col-span-4 rounded-2xl border border-zinc-800/80 bg-zinc-950 p-4 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
              <h2 className="text-sm font-bold text-white">Video đề xuất</h2>
              <Link
                href="/videos"
                className="text-[11px] text-[#b8f53b] hover:underline"
              >
                Xem tất cả
              </Link>
            </div>

            {vm.recommendedVideos.length === 0 ? (
              <p className="text-xs text-zinc-500 py-6 text-center">
                Chưa có video đề xuất khác.
              </p>
            ) : (
              <div className="space-y-3">
                {vm.recommendedVideos.map((item) => (
                  <Link
                    key={item.id}
                    href={`/videos/${item.id}`}
                    className="group flex gap-3 p-2 rounded-xl hover:bg-zinc-900/80 border border-transparent hover:border-zinc-800 transition"
                  >
                    <div className="relative w-32 aspect-video shrink-0 rounded-lg overflow-hidden bg-zinc-900">
                      <img
                        src={item.thumbnailUrl || "/images/video-placeholder.jpg"}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                      <span className="w-7 h-7 rounded-full bg-black/70 flex items-center justify-center text-white absolute inset-0 m-auto">
                        <Play className="w-3.5 h-3.5 fill-white" />
                      </span>
                    </div>

                    <div className="min-w-0 flex-1 space-y-1">
                      <h3 className="text-xs font-semibold text-zinc-100 group-hover:text-[#b8f53b] line-clamp-2 leading-snug transition">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-zinc-400 truncate">
                        {item.creatorName || `Creator #${item.creatorId ?? "—"}`}
                      </p>
                      <p className="text-[10px] text-[#b8f53b]/90 truncate">
                        {item.gameCategoryName || "Cộng đồng Game"}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </aside>
        </main>
      </div>
    </div>
  );
}