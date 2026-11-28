const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function getAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token =
    localStorage.getItem("leemed_access_token") ||
    sessionStorage.getItem("leemed_access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getJson<TResponse>(path: string): Promise<TResponse> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    credentials: "include",
    cache: "no-store",
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      data?.message || data?.detail || "Không thể tải dữ liệu từ máy chủ.";
    throw new ApiError(message, res.status);
  }

  return data as TResponse;
}

export async function postJson<TResponse, TBody>(
  path: string,
  body: TBody
): Promise<TResponse> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      data?.message ||
      data?.detail ||
      `Yêu cầu thất bại (mã ${res.status}). Vui lòng thử lại.`;
    throw new ApiError(message, res.status);
  }

  return data as TResponse;
}

export async function putJson<TResponse, TBody>(
  path: string,
  body: TBody
): Promise<TResponse> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      data?.message ||
      data?.detail ||
      `Cập nhật thất bại (mã ${res.status}). Vui lòng thử lại.`;
    throw new ApiError(message, res.status);
  }

  return data as TResponse;
}