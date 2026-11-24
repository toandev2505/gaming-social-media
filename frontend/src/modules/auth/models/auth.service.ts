import { postJson } from "@/core/api/http-client";
import { LoginRequest, LoginResponse } from "./auth.types";

export const authService = {
  login(payload: LoginRequest): Promise<LoginResponse> {
    return postJson<LoginResponse, LoginRequest>("/api/v1/auth/login", payload);
  },
};