import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from "../viewmodels/useLoginViewModel";
import { AuthSessionUser } from "./auth.types";

export function normalizeRole(role?: unknown): string {
  if (!role) return "";
  const raw =
    typeof role === "string"
      ? role
      : typeof role === "object" && role !== null && "name" in role
        ? String((role as { name?: unknown }).name ?? "")
        : String(role);
  return raw.trim().toUpperCase().replace(/^ROLE_/, "");
}

export function getStoredSession(): {
  token: string | null;
  user: AuthSessionUser | null;
  role: string;
} {
  if (typeof window === "undefined") {
    return { token: null, user: null, role: "" };
  }

  const token =
    localStorage.getItem(AUTH_TOKEN_KEY) ?? sessionStorage.getItem(AUTH_TOKEN_KEY);
  const rawUser =
    localStorage.getItem(AUTH_USER_KEY) ?? sessionStorage.getItem(AUTH_USER_KEY);

  let user: AuthSessionUser | null = null;
  if (rawUser) {
    try {
      user = JSON.parse(rawUser) as AuthSessionUser;
    } catch {
      user = null;
    }
  }

  return {
    token,
    user,
    role: normalizeRole(user?.role),
  };
}

export function canUploadVideoByRole(role?: unknown): boolean {
  const normalized = normalizeRole(role);
  return normalized === "CREATOR" || normalized === "ADMIN";
}