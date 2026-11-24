"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "@/modules/auth/viewmodels/useLoginViewModel";
import { AuthSessionUser } from "@/modules/auth/models/auth.types";

export default function HomePage() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthSessionUser | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const savedToken =
      localStorage.getItem(AUTH_TOKEN_KEY) || sessionStorage.getItem(AUTH_TOKEN_KEY);
    const savedUserRaw =
      localStorage.getItem(AUTH_USER_KEY) || sessionStorage.getItem(AUTH_USER_KEY);

    setToken(savedToken);
    if (savedUserRaw) {
      try {
        setUser(JSON.parse(savedUserRaw) as AuthSessionUser);
      } catch {
        setUser(null);
      }
    }
    setChecked(true);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem(AUTH_USER_KEY);
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  if (!checked) return null;

  return (
    <main className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full rounded-2xl border border-zinc-800 bg-zinc-950 p-6 space-y-5">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#b8f53b] text-black font-extrabold">
            L
          </div>
          <div>
            <h1 className="text-xl font-bold">LeeMed</h1>
            <p className="text-xs text-zinc-400">Trạng thái phiên đăng nhập</p>
          </div>
        </div>

        {token || user ? (
          <>
            <p className="text-sm text-emerald-400 font-medium">
              Đăng nhập thành công!
            </p>

            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5 text-xs">
              <div><span className="text-zinc-400">Username:</span> {user?.username || "—"}</div>
              <div><span className="text-zinc-400">Email:</span> {user?.email || "—"}</div>
              <div><span className="text-zinc-400">SĐT:</span> {user?.phone || "—"}</div>
              <div><span className="text-zinc-400">Role:</span> {user?.role || "—"}</div>
              <div><span className="text-zinc-400">Trạng thái:</span> {user?.status || "—"}</div>
              <div><span className="text-zinc-400">Phương thức:</span> {user?.loginMethod || "—"}</div>
              <div><span className="text-zinc-400">Hết hạn lúc:</span> {user?.expiresAt || "—"}</div>
              {token && (
                <div className="pt-1.5 border-t border-zinc-800">
                  <span className="text-zinc-400 block mb-0.5">Access Token:</span>
                  <span className="text-zinc-300 break-all line-clamp-2">{token}</span>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="w-full h-10 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm font-medium text-white transition cursor-pointer"
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <p className="text-sm text-zinc-400">
              Bạn chưa đăng nhập vào hệ thống.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center w-full h-10 rounded-lg bg-[#b8f53b] hover:bg-[#c6ff4d] text-zinc-950 font-semibold text-sm transition"
            >
              Đi tới trang Đăng nhập
            </Link>
          </>
        )}
      </div>
    </main>
  );
}