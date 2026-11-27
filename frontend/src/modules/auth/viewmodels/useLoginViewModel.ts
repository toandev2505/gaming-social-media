"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authService } from "../models/auth.service";
import { AuthSessionUser } from "../models/auth.types";
import { normalizeRole } from "../models/auth.session";
import { ApiError } from "@/core/api/http-client";

export const AUTH_TOKEN_KEY = "leemed_access_token";
export const AUTH_USER_KEY = "leemed_user";

export function useLoginViewModel() {
  const router = useRouter();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const validate = (): string | null => {
    const trimmed = identifier.trim();
    if (!trimmed) {
      return "Username hoặc email/sđt không được để trống.";
    }
    if (trimmed.length > 150) {
      return "Username hoặc email/sđt tối đa 150 ký tự.";
    }
    if (!password) {
      return "Mật khẩu không được để trống.";
    }
    if (password.length < 6 || password.length > 100) {
      return "Mật khẩu phải từ 6 đến 100 ký tự.";
    }
    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const validationError = validate();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      setLoading(true);
      const res = await authService.login({
        identifier: identifier.trim(),
        password,
      });

      const payload = res.data ?? res;
      const token = payload.accessToken;

      const userInfo: AuthSessionUser = {
        username: payload.username,
        email: payload.email,
        phone: payload.phone,
        role: payload.role,
        status: payload.status,
        loginMethod: payload.loginMethod,
        expiresAt: payload.expiresAt,
      };

      const role = normalizeRole(userInfo.role);
      setSuccessMessage("Đăng nhập thành công! Đang chuyển hướng...");

      if (role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/videos");
      }
      router.refresh();
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Không thể kết nối tới máy chủ. Vui lòng thử lại sau.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setErrorMessage("Đăng nhập Google sẽ được kết nối sau khi hoàn tất luồng OAuth2.");
  };

  return {
    identifier,
    setIdentifier,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    showPassword,
    setShowPassword,
    loading,
    errorMessage,
    successMessage,
    handleSubmit,
    handleGoogleLogin,
  };
}