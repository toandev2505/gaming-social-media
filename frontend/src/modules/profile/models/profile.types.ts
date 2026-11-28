export interface GameCategorySummary {
  id: number;
  name: string;
  slug?: string;
  iconUrl?: string | null;
}

export interface ProfileResponse {
  id?: number;
  accountId: number;
  displayName?: string | null;
  avatarUrl?: string | null;
  bio?: string | null;
  socialLinks?: string | null;
  favoriteGames?: GameCategorySummary[];
  createdAt?: string;
  updatedAt?: string;
}

export interface UpdateProfileRequest {
  displayName: string;
  avatarUrl?: string | null;
  bio?: string | null;
  socialLinks?: string | null;
  /** Truyền danh sách ID game yêu thích (null = giữ nguyên, [] = xóa hết) */
  favoriteGameIds: number[];
}