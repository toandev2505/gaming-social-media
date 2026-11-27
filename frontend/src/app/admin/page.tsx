"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getStoredSession } from "@/modules/auth/models/auth.session";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "@/modules/auth/viewmodels/useLoginViewModel";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const session = getStoredSession();
    setRole(session.role);
    setUsername(session.user?.username || session.user?.email || "Admin");
    setChecked(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem(AUTH_USER_KEY);
    router.push("/login");
  };

  if (!checked) return null;

  if (role !== "ADMIN") {
    return (
      <main className="min-h-screen bg-[#09090b] text-zinc-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-4 text-center">
          <h1 className="text-xl font-bold text-red-400">Không có quyền truy cập</h1>
          <p className="text-xs text-zinc-400">
            Khu vực này chỉ dành cho tài khoản có quyền ADMIN.
          </p>
          <Link
            href="/videos"
            className="inline-flex items-center justify-center w-full h-10 rounded-lg bg-[#b8f53b] text-zinc-950 font-semibold text-xs"
          >
            Quay lại trang Video
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-[#b8f53b]">
            QUẢN TRỊ HỆ THỐNG
          </p>
          <h1 className="text-2xl font-bold text-white">Trang quản trị Admin</h1>
          <p className="text-xs text-zinc-400 mt-0.5">Xin chào, {username}</p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            href="/videos"
            className="h-9 px-3.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs inline-flex items-center"
          >
            Xem trang Video
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="h-9 px-3.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-medium cursor-pointer"
          >
            Đăng xuất
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 text-sm text-zinc-300">
        Khu vực quản trị LeeMed — bạn có thể thêm các module quản lý người dùng, kiểm duyệt video hoặc danh mục game tại đây.
      </div>
    </main>
  );
}