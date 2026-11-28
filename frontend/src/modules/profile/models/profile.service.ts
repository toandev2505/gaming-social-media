import { getJson, putJson } from "@/core/api/http-client";
import {
  GameCategorySummary,
  ProfileResponse,
  UpdateProfileRequest,
} from "./profile.types";

export const profileService = {
  getMyProfile(): Promise<ProfileResponse> {
    return getJson<ProfileResponse>("/api/v1/profiles/me");
  },

  updateMyProfile(payload: UpdateProfileRequest): Promise<ProfileResponse> {
    return putJson<ProfileResponse, UpdateProfileRequest>(
      "/api/v1/profiles/me",
      payload
    );
  },

  async getAllGameCategories(): Promise<GameCategorySummary[]> {
    const res = await getJson<
      GameCategorySummary[] | { content?: GameCategorySummary[]; data?: GameCategorySummary[] }
    >("/api/v1/game-categories");

    if (Array.isArray(res)) return res;
    if (Array.isArray(res?.content)) return res.content;
    if (Array.isArray(res?.data)) return res.data;
    return [];
  },
};