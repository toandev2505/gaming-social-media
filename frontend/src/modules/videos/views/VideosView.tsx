// frontend/src/modules/videos/views/VideosView.tsx
"use client";

import { useEffect, useState } from "react";
import { canUploadVideoByRole, getStoredSession } from "@/modules/auth/models/auth.session";
import Link from "next/link";
import {
  Home,
  Film,
  MessageSquare,
  Radio,
  Gamepad2,
  Tag,
  Wallet,
  Plus,
  Search,
  Play,
  ChevronLeft,
  ChevronRight,
  Settings,
} from "lucide-react";
import { useVideoListViewModel } from "../viewmodels/useVideoListViewModel";
import { UploadVideoModal } from "./UploadVideoModal";

const QUICK_CATEGORIES: { id: number | null; label: string }[] = [
  { id: null, label: "Tất cả" },
  { id: 1, label: "VALORANT" },
  { id: 2, label: "Elden Ring" },
  { id: 3, label: "Cyberpunk 2077" },
  { id: 4, label: "Counter-Strike 2" },
  { id: 5, label: "Minecraft" },
];

export function VideosView() {
  const vm = useVideoListViewModel(9);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [canUploadVideo, setCanUploadVideo] = useState(false);

  useEffect(() => {
    const syncRole = () => {
      const { role } = getStoredSession();
      setCanUploadVideo(canUploadVideoByRole(role));
    };
    syncRole();
    window.addEventListener("storage", syncRole);
    return () => window.removeEventListener("storage", syncRole);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col">
      {/* Top Header */}
      <header className="h-14 px-4 lg:px-6 border-b border-zinc-900 bg-[#09090b]/95 sticky top-0 z-30 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 font-bold text-base text-white">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-[#b8f53b] text-black text-xs font-extrabold">
              L
            </span>
            <span>LeeMed</span>
          </Link>
        </div>

        {/* Search Input */}
        <div className="flex-1 max-w-md hidden sm:flex items-center relative">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3" />
          <input
            type="text"
            value={vm.searchKeyword}
            onChange={(e) => vm.setSearchKeyword(e.target.value)}
            placeholder="Tìm game, creator hoặc cộng đồng..."
            className="w-full h-9 pl-9 pr-4 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#b8f53b]"
          />
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {canUploadVideo && (
            <button
              type="button"
              onClick={() => setUploadOpen(true)}
              className="h-9 px-3.5 rounded-lg bg-[#b8f53b] hover:bg-[#c6ff4d] text-zinc-950 font-semibold text-xs inline-flex items-center gap-1.5 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Đăng video</span>
            </button>
          )}

          <Link
            href="/login"
            className="h-9 px-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-medium text-zinc-200 inline-flex items-center"
          >
            Tài khoản
          </Link>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Left Sidebar */}
        <aside className="hidden md:flex w-56 shrink-0 flex-col justify-between border-r border-zinc-900 bg-zinc-950/60 p-3">
          <div className="space-y-5">
            <div>
              <p className="px-2.5 mb-2 text-[10px] font-semibold tracking-wider uppercase text-zinc-500">
                KHÔNG GIAN LÀM VIỆC
              </p>
              <nav className="space-y-1 text-xs">
                <Link href="/" className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-900">
                  <Home className="w-4 h-4" />
                  <span>Trang chủ</span>
                </Link>
                <Link href="/videos" className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg bg-zinc-900 text-[#b8f53b] font-medium border border-zinc-800/80">
                  <Film className="w-4 h-4" />
                  <span>Video</span>
                </Link>
                <span className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-zinc-500">
                  <MessageSquare className="w-4 h-4" />
                  <span>Bài viết</span>
                </span>
                <span className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-zinc-500">
                  <Radio className="w-4 h-4" />
                  <span>Livestream</span>
                </span>
                <span className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-zinc-500">
                  <Gamepad2 className="w-4 h-4" />
                  <span>Danh mục game</span>
                </span>
                <span className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-zinc-500">
                  <Tag className="w-4 h-4" />
                  <span>Sản phẩm Affiliate</span>
                </span>
                <span className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-zinc-500">
                  <Wallet className="w-4 h-4" />
                  <span>Ví / Tài chính</span>
                </span>
              </nav>
            </div>

            <div>
              <p className="px-2.5 mb-2 text-[10px] font-semibold tracking-wider uppercase text-zinc-500">
                CỘNG ĐỒNG CỦA BẠN
              </p>
              <div className="space-y-1 text-xs">
                {QUICK_CATEGORIES.filter((c) => c.id !== null).map((cat) => {
                  const active = vm.selectedCategoryId === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => vm.selectCategory(active ? null : cat.id)}
                      className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-left transition cursor-pointer ${
                        active
                          ? "bg-zinc-900 text-[#b8f53b] font-medium"
                          : "text-zinc-400 hover:text-white hover:bg-zinc-900/60"
                      }`}
                    >
                      <span className="truncate">{cat.label}</span>
                      <span className="text-[10px] text-zinc-500">#{cat.id}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-900 text-xs text-zinc-500 flex items-center gap-2 px-2.5">
            <Settings className="w-4 h-4" />
            <span>Cài đặt & trợ giúp</span>
          </div>
        </aside>

        {/* Center + Right Content */}
        <main className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-6 p-4 lg:p-6">
          {/* Center Column */}
          <div className="xl:col-span-9 space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Video</h1>
              <p className="text-xs text-zinc-400 mt-0.5">
                Những pha xử lý, câu chuyện và thế giới game đáng bấm xem.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {QUICK_CATEGORIES.map((cat) => {
                const isActive = vm.selectedCategoryId === cat.id;
                return (
                  <button
                    key={cat.label}
                    type="button"
                    onClick={() => vm.selectCategory(cat.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition cursor-pointer ${
                      isActive
                        ? "bg-[#b8f53b] text-zinc-950 font-semibold"
                        : "bg-zinc-900 text-zinc-300 border border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Trending Hero Card */}
            {!vm.loading && vm.trendingVideo && (
              <section className="space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <h2 className="font-semibold text-zinc-200">Nổi bật hiện nay</h2>
                  <span className="text-zinc-500">Tổng cộng: {vm.totalElements} video</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-950">
                  <Link
                    href={`/videos/${vm.trendingVideo.id}`}
                    className="md:col-span-7 relative min-h-[220px] bg-zinc-900 group overflow-hidden block"
                  >
                    <img
                      src={vm.trendingVideo.thumbnailUrl}
                      alt={vm.trendingVideo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <span className="w-11 h-11 rounded-full bg-black/70 border border-white/25 flex items-center justify-center text-white absolute inset-0 m-auto">
                      <Play className="w-5 h-5 fill-white" />
                    </span>
                  </Link>

                  <div className="md:col-span-5 p-5 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <span className="inline-block text-[10px] font-semibold tracking-wider uppercase text-[#b8f53b]">
                        #1 NỔI BẬT • {vm.trendingVideo.gameCategoryName}
                      </span>
                      <h3 className="text-xl font-bold text-white leading-snug">
                        {vm.trendingVideo.title}
                      </h3>
                      <p className="text-xs text-zinc-400 line-clamp-3">
                        {vm.trendingVideo.description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[11px] text-zinc-400">
                        <span>{vm.trendingVideo.creatorName}</span>
                        <span>
                          {vm.trendingVideo.viewsText} • {vm.trendingVideo.durationText}
                        </span>
                      </div>

                      <Link
                        href={`/videos/${vm.trendingVideo.id}`}
                        className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-lg bg-[#b8f53b] hover:bg-[#c6ff4d] text-zinc-950 font-semibold text-xs transition"
                      >
                        <Play className="w-3.5 h-3.5 fill-zinc-950" />
                        <span>Xem video</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Error State */}
            {vm.errorMessage && (
              <div className="p-4 rounded-xl bg-red-950/60 border border-red-800/70 text-xs text-red-300 flex items-center justify-between">
                <span>{vm.errorMessage}</span>
                <button
                  type="button"
                  onClick={vm.refresh}
                  className="px-3 py-1.5 rounded bg-red-900/70 hover:bg-red-800 text-white cursor-pointer"
                >
                  Thử lại
                </button>
              </div>
            )}

            {/* Loading State */}
            {vm.loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="rounded-xl border border-zinc-900 bg-zinc-950 overflow-hidden animate-pulse"
                  >
                    <div className="aspect-video bg-zinc-900" />
                    <div className="p-3.5 space-y-2">
                      <div className="h-4 bg-zinc-900 rounded w-3/4" />
                      <div className="h-3 bg-zinc-900 rounded w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : vm.feedVideos.length === 0 ? (
              <div className="p-10 rounded-2xl border border-zinc-800 bg-zinc-950 text-center space-y-3">
                <p className="text-sm text-zinc-300">Chưa có video nào phù hợp với bộ lọc hiện tại.</p>
                <button
                  type="button"
                  onClick={() => setUploadOpen(true)}
                  className="h-9 px-4 rounded-lg bg-[#b8f53b] text-zinc-950 font-semibold text-xs cursor-pointer"
                >
                  Đăng video đầu tiên
                </button>
              </div>
            ) : (
              /* Video 3-Column Grid */
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-zinc-200">Dành cho bạn</h2>
                  {vm.selectedCreatorId != null && (
                    <button
                      type="button"
                      onClick={() => vm.toggleCreatorFilter(null)}
                      className="text-xs text-[#b8f53b] hover:underline cursor-pointer"
                    >
                      Bỏ lọc Creator #{vm.selectedCreatorId}
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vm.feedVideos.map((video) => (
                    <Link
                      key={video.id}
                      href={`/videos/${video.id}`}
                      className="group rounded-xl border border-zinc-800/80 bg-zinc-950 hover:border-zinc-700 overflow-hidden transition flex flex-col"
                    >
                      <div className="relative aspect-video bg-zinc-900 overflow-hidden">
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                        />
                        <span className="w-9 h-9 rounded-full bg-black/70 border border-white/20 flex items-center justify-center text-white absolute inset-0 m-auto">
                          <Play className="w-4 h-4 fill-white" />
                        </span>
                        <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/85 text-[10px] font-medium text-zinc-200">
                          {video.durationText}
                        </span>
                      </div>

                      <div className="p-3.5 space-y-1.5 flex-1 flex flex-col justify-between">
                        <h3 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-[#b8f53b] transition">
                          {video.title}
                        </h3>

                        <div className="pt-1 space-y-0.5 text-[11px] text-zinc-400">
                          <div className="flex items-center justify-between gap-2">
                            <span className="truncate text-zinc-300">{video.creatorName}</span>
                            <span className="text-[#b8f53b]/90 truncate">{video.gameCategoryName}</span>
                          </div>
                          <div>
                            {video.viewsText} • {video.createdAtText}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Pagination */}
            {vm.totalPages > 1 && (
              <div className="flex items-center justify-between pt-2 text-xs text-zinc-400">
                <span>
                  Trang {vm.page + 1} / {vm.totalPages}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={vm.page <= 0}
                    onClick={() => vm.setPage((p) => Math.max(0, p - 1))}
                    className="h-8 px-3 rounded-lg bg-zinc-900 border border-zinc-800 disabled:opacity-40 inline-flex items-center gap-1 hover:text-white cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Trước</span>
                  </button>
                  <button
                    type="button"
                    disabled={vm.page >= vm.totalPages - 1}
                    onClick={() => vm.setPage((p) => p + 1)}
                    className="h-8 px-3 rounded-lg bg-zinc-900 border border-zinc-800 disabled:opacity-40 inline-flex items-center gap-1 hover:text-white cursor-pointer"
                  >
                    <span>Sau</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Panel */}
          <aside className="xl:col-span-3 space-y-4">
            <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold text-white">Lọc nhanh theo Creator ID</h3>
                <span className="text-[10px] text-zinc-500">API Filter</span>
              </div>
              <p className="text-[11px] text-zinc-400">
                Chọn một creator ID để gọi trực tiếp tham số <code className="text-zinc-300">creatorId</code> của API danh sách video.
              </p>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((id) => {
                  const active = vm.selectedCreatorId === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => vm.toggleCreatorFilter(id)}
                      className={`px-2.5 py-1 rounded-lg text-xs border transition cursor-pointer ${
                        active
                          ? "bg-[#b8f53b] text-zinc-950 border-[#b8f53b] font-semibold"
                          : "bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700"
                      }`}
                    >
                      Creator #{id}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-4 space-y-2 text-xs">
              <h3 className="font-semibold text-white">Gợi ý nhanh</h3>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Nhấn <strong className="text-zinc-200">Đăng video</strong> để gọi <code className="text-zinc-300">POST /api/v1/videos</code> hoặc bấm vào bất kỳ thẻ video nào để mở trang chi tiết <code className="text-zinc-300">/videos/[id]</code>.
              </p>
            </div>
          </aside>
        </main>
      </div>

      <UploadVideoModal
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
        onCreated={() => vm.refresh()}
      />
    </div>
  );
}