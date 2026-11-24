const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export async function postJson<TResponse, TBody>(
  path: string,
  body: TBody
): Promise<TResponse> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });

  const data = await res.json().catch(() => null);

  if (!res.ok) {
    const message =
      data?.message || data?.detail || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.";
    throw new ApiError(message, res.status);
  }

  return data as TResponse;
}