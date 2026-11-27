// frontend/src/modules/videos/models/video.types.ts
export interface UploadVideoRequest {
    title: string;
    description?: string;
    videoUrl: string;
    thumbnailUrl?: string;
    gameCategoryId?: number | null;
  }
  
  export interface VideoResponse {
    id: number | string;
    title: string;
    description?: string;
    videoUrl: string;
    thumbnailUrl?: string;
    durationSeconds?: number;
    durationLabel?: string;
    views?: number;
    createdAt?: string;
    gameCategoryId?: number | string;
    gameCategoryName?: string;
    creatorId?: number | string;
    creatorName?: string;
  }
  
  export interface SpringPage<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number; // trang hiện tại (0-based)
    first: boolean;
    last: boolean;
  }
  
  export interface VideoQueryParams {
    gameCategoryId?: number | null;
    creatorId?: number | null;
    page?: number;
    size?: number;
  }