"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Eye, EyeOff, ArrowUpRight } from "lucide-react";
import { useLoginViewModel } from "../viewmodels/useLoginViewModel";

export function LoginView() {
  const vm = useLoginViewModel();

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col justify-between">
      {/* Top Bar */}
      <header className="w-full px-6 py-4 flex items-center justify-between border-b border-zinc-900">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg tracking-tight text-white">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-[#b8f53b] text-black text-xs font-extrabold">
              L
            </span>
            <span>LeeMed</span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Quay lại khám phá</span>
          </Link>
        </div>

        <div className="text-xs text-zinc-400 flex items-center gap-1.5">
          <span>Cần hỗ trợ?</span>
          <Link
            href="/help"
            className="text-zinc-200 hover:text-[#b8f53b] inline-flex items-center gap-0.5 transition"
          >
            <span>Trung tâm trợ giúp</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main 2-Column Content */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 md:p-8 max-w-7xl w-full mx-auto items-center">
        {/* Left Banner Card */}
        <section className="hidden lg:flex lg:col-span-6 xl:col-span-7 relative h-[680px] rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-950 flex-col justify-between p-8">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-45"
            style={{
              backgroundImage:
                "linear-gradient(180deg, rgba(9,9,11,0.35) 0%, rgba(9,9,11,0.88) 75%, rgba(9,9,11,0.98) 100%), url('/images/login-banner.jpg')",
            }}
          />

          <div className="relative z-10">
            <span className="inline-block px-2.5 py-1 rounded bg-black/70 border border-zinc-700/70 text-[10px] font-semibold tracking-wider uppercase text-zinc-200">
              CHƯƠNG TIẾP THEO CỦA BẠN
            </span>
          </div>

          <div className="relative z-10 space-y-5">
            <p className="text-[11px] font-semibold tracking-widest uppercase text-[#b8f53b]">
              KẾT NỐI ĐAM MÊ
            </p>
            <h2 className="text-4xl xl:text-5xl font-extrabold leading-[1.08] tracking-tight text-white">
              Game của bạn.
              <br />
              Cộng đồng của bạn.
            </h2>
            <p className="text-sm text-zinc-300 max-w-md leading-relaxed">
              Bắt trọn những khoảnh khắc trực tiếp. Tìm đúng cộng đồng của bạn. Tự xây dựng không gian riêng cho mình.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              <span className="px-3.5 py-1.5 rounded-md bg-zinc-900/90 border border-zinc-700/70 text-xs text-zinc-200">
                Livestream
              </span>
              <span className="px-3.5 py-1.5 rounded-md bg-zinc-900/90 border border-zinc-700/70 text-xs text-zinc-200">
                Video & Clip
              </span>
              <span className="px-3.5 py-1.5 rounded-md bg-zinc-900/90 border border-zinc-700/70 text-xs text-zinc-200">
                Cộng đồng
              </span>
            </div>
          </div>
        </section>

        {/* Right Login Form */}
        <section className="lg:col-span-6 xl:col-span-5 flex justify-center">
          <div className="w-full max-w-md space-y-6 px-2 sm:px-4">
            <div className="space-y-1.5">
              <p className="text-[11px] font-semibold tracking-widest uppercase text-[#b8f53b]">
                CHÀO MỪNG TRỞ LẠI
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                Đăng nhập vào LeeMed
              </h1>
              <p className="text-sm text-zinc-400">
                Tiếp tục hành trình cùng cộng đồng của bạn.
              </p>
            </div>

            <button
              type="button"
              onClick={vm.handleGoogleLogin}
              className="w-full h-11 rounded-lg bg-zinc-900 hover:bg-zinc-800/90 border border-zinc-800 text-sm font-medium text-zinc-100 flex items-center justify-center gap-2.5 transition cursor-pointer"
            >
              <span className="font-bold text-base text-[#ea4335]">G</span>
              <span>Tiếp tục với Google</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-zinc-800 w-full" />
              <span className="px-3 text-xs text-zinc-500 bg-[#09090b] whitespace-nowrap">
                hoặc đăng nhập bằng tài khoản
              </span>
              <div className="border-t border-zinc-800 w-full" />
            </div>

            <form onSubmit={vm.handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-1.5">
                <label
                  htmlFor="identifier"
                  className="block text-xs font-medium text-zinc-300"
                >
                  Email, số điện thoại hoặc tên đăng nhập
                </label>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  autoComplete="username"
                  value={vm.identifier}
                  onChange={(e) => vm.setIdentifier(e.target.value)}
                  placeholder="Nhập email, số điện thoại hoặc username"
                  className="w-full h-11 px-3.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#b8f53b] transition"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="password"
                  className="block text-xs font-medium text-zinc-300"
                >
                  Mật khẩu
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={vm.showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={vm.password}
                    onChange={(e) => vm.setPassword(e.target.value)}
                    placeholder="Nhập mật khẩu của bạn"
                    className="w-full h-11 pl-3.5 pr-10 rounded-lg bg-zinc-900/90 border border-zinc-800 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#b8f53b] transition"
                  />
                  <button
                    type="button"
                    onClick={() => vm.setShowPassword(!vm.showPassword)}
                    aria-label={vm.showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-200 cursor-pointer"
                  >
                    {vm.showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-200 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={vm.rememberMe}
                    onChange={(e) => vm.setRememberMe(e.target.checked)}
                    className="rounded border-zinc-700 bg-zinc-900 text-[#b8f53b] focus:ring-0"
                  />
                  <span>Ghi nhớ đăng nhập</span>
                </label>

                <Link
                  href="/forgot-password"
                  className="text-zinc-400 hover:text-[#b8f53b] transition"
                >
                  Quên mật khẩu?
                </Link>
              </div>

              {vm.errorMessage && (
                <div className="p-3 rounded-lg bg-red-950/60 border border-red-800/70 text-xs text-red-300">
                  {vm.errorMessage}
                </div>
              )}

              {vm.successMessage && (
                <div className="p-3 rounded-lg bg-emerald-950/60 border border-emerald-800/70 text-xs text-emerald-300">
                  {vm.successMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={vm.loading}
                className="w-full h-11 rounded-lg bg-[#b8f53b] hover:bg-[#c6ff4d] disabled:opacity-60 text-zinc-950 font-semibold text-sm flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <span>{vm.loading ? "Đang đăng nhập..." : "Đăng nhập"}</span>
                {!vm.loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <p className="text-center text-xs text-zinc-400 pt-1">
              Chưa có tài khoản LeeMed?{" "}
              <Link
                href="/register"
                className="text-[#b8f53b] hover:underline font-medium"
              >
                Tạo tài khoản mới
              </Link>
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full px-6 py-4 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-500">
        <div>LeeMed — Kết nối cộng đồng game.</div>
        <div className="flex items-center gap-5">
          <span>© 2026 LeeMed</span>
          <Link href="/privacy" className="hover:text-zinc-300 transition">
            Quyền riêng tư
          </Link>
          <Link href="/terms" className="hover:text-zinc-300 transition">
            Điều khoản
          </Link>
          <Link href="/guidelines" className="hover:text-zinc-300 transition">
            Quy tắc cộng đồng
          </Link>
        </div>
      </footer>
    </div>
  );
}