// frontend/src/modules/videos/models/video.service.ts
import { getJson, postJson } from "@/core/api/http-client";
import {
  SpringPage,
  UploadVideoRequest,
  VideoQueryParams,
  VideoResponse,
} from "./video.types";

const BASE_PATH = "/api/v1/videos";

export const videoService = {
  // 1. Tạo / đăng video
  uploadVideo(payload: UploadVideoRequest): Promise<VideoResponse> {
    return postJson<VideoResponse, UploadVideoRequest>(BASE_PATH, payload);
  },

  // 2. Danh sách video (phân trang + lọc gameCategoryId / creatorId)
  getVideos(params: VideoQueryParams = {}): Promise<SpringPage<VideoResponse>> {
    const searchParams = new URLSearchParams();
    if (params.gameCategoryId != null) {
      searchParams.set("gameCategoryId", String(params.gameCategoryId));
    }
    if (params.creatorId != null) {
      searchParams.set("creatorId", String(params.creatorId));
    }
    searchParams.set("page", String(params.page ?? 0));
    searchParams.set("size", String(params.size ?? 10));

    return getJson<SpringPage<VideoResponse>>(`${BASE_PATH}?${searchParams.toString()}`);
  },

  // 3. Chi tiết 1 video theo id
  getVideoById(id: number | string): Promise<VideoResponse> {
    return getJson<VideoResponse>(`${BASE_PATH}/${id}`);
  },
};