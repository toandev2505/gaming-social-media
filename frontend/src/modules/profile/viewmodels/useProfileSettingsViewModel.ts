"use client";

import { useCallback, useEffect, useState } from "react";
import { ApiError } from "@/core/api/http-client";
import { AuthSessionUser } from "@/modules/auth/models/auth.types";
import { AUTH_USER_KEY } from "@/modules/auth/viewmodels/useLoginViewModel";
import { profileService } from "../models/profile.service";
import {
  GameCategorySummary,
  ProfileResponse,
  UpdateProfileRequest,
} from "../models/profile.types";

export type SettingsTab = "general" | "security" | "bank";

function readSessionUser(): AuthSessionUser | null {
  if (typeof window === "undefined") return null;
  const raw =
    window.localStorage.getItem(AUTH_USER_KEY) ||
    window.sessionStorage.getItem(AUTH_USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthSessionUser;
  } catch {
    return null;
  }
}

export function useProfileSettingsViewModel() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const [sessionUser, setSessionUser] = useState<AuthSessionUser | null>(null);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [availableGames, setAvailableGames] = useState<GameCategorySummary[]>([]);

  // Form states khớp UpdateProfileRequest
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [bio, setBio] = useState("");
  const [socialLinks, setSocialLinks] = useState("");
  const [favoriteGames, setFavoriteGames] = useState<GameCategorySummary[]>([]);
  const [selectingGame, setSelectingGame] = useState(false);

  // Local UI preferences (hiển thị trên giao diện)
  const [country, setCountry] = useState("Vietnam");
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("UTC +07:00");
  const [showFollowingList, setShowFollowingList] = useState(true);
  const [emailCreatorUpdates, setEmailCreatorUpdates] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(false);

  // Status states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const applyProfileToForm = useCallback(
    (data: ProfileResponse, userFallback: AuthSessionUser | null) => {
      setProfile(data);
      setDisplayName(data.displayName ?? userFallback?.username ?? "");
      setAvatarUrl(data.avatarUrl ?? "");
      setBio(data.bio ?? "");
      setSocialLinks(data.socialLinks ?? "");
      setFavoriteGames(data.favoriteGames ?? []);
    },
    []
  );

  const fetchInitialData = useCallback(async () => {
    const currentSession = readSessionUser();
    setSessionUser(currentSession);

    try {
      setLoading(true);
      setErrorMessage(null);

      const [profileData, categories] = await Promise.all([
        profileService.getMyProfile(),
        profileService.getAllGameCategories().catch(() => []),
      ]);

      setAvailableGames(categories);
      applyProfileToForm(profileData, currentSession);
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Không thể tải thông tin hồ sơ.");
      }
    } finally {
      setLoading(false);
    }
  }, [applyProfileToForm]);

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  const handleAddGameById = (gameId: number) => {
    const found = availableGames.find((g) => g.id === gameId);
    if (!found) return;
    if (!favoriteGames.some((g) => g.id === gameId)) {
      setFavoriteGames((prev) => [...prev, found]);
    }
    setSelectingGame(false);
  };

  const handleRemoveGame = (gameId: number) => {
    setFavoriteGames((prev) => prev.filter((item) => item.id !== gameId));
  };

  const handleCancel = () => {
    if (profile) {
      applyProfileToForm(profile, sessionUser);
    }
    setSelectingGame(false);
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  const handleSave = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    const trimmedName = displayName.trim();
    if (!trimmedName) {
      setErrorMessage("Tên hiển thị không được để trống.");
      return;
    }
    if (trimmedName.length > 100) {
      setErrorMessage("Tên hiển thị tối đa 100 ký tự.");
      return;
    }
    if (avatarUrl.trim().length > 500) {
      setErrorMessage("Link avatar tối đa 500 ký tự.");
      return;
    }
    if (bio.trim().length > 500) {
      setErrorMessage("Tiểu sử tối đa 500 ký tự.");
      return;
    }

    const payload: UpdateProfileRequest = {
      displayName: trimmedName,
      avatarUrl: avatarUrl.trim() || null,
      bio: bio.trim() || null,
      socialLinks: socialLinks.trim() || null,
      favoriteGameIds: favoriteGames.map((g) => g.id),
    };

    try {
      setSaving(true);
      const updated = await profileService.updateMyProfile(payload);
      applyProfileToForm(updated, sessionUser);
      setSuccessMessage("Đã lưu thay đổi hồ sơ thành công.");
    } catch (err) {
      if (err instanceof ApiError) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Không thể lưu thay đổi hồ sơ. Vui lòng thử lại.");
      }
    } finally {
      setSaving(false);
    }
  };

  const unselectedGames = availableGames.filter(
    (g) => !favoriteGames.some((selected) => selected.id === g.id)
  );

  return {
    activeTab,
    setActiveTab,
    sessionUser,
    profile,
    displayName,
    setDisplayName,
    avatarUrl,
    setAvatarUrl,
    bio,
    setBio,
    socialLinks,
    setSocialLinks,
    favoriteGames,
    unselectedGames,
    selectingGame,
    setSelectingGame,
    handleAddGameById,
    handleRemoveGame,
    country,
    setCountry,
    language,
    setLanguage,
    timezone,
    setTimezone,
    showFollowingList,
    setShowFollowingList,
    emailCreatorUpdates,
    setEmailCreatorUpdates,
    showOnlineStatus,
    setShowOnlineStatus,
    loading,
    saving,
    errorMessage,
    successMessage,
    handleCancel,
    handleSave,
  };
}