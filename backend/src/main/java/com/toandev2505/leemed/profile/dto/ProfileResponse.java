package com.toandev2505.leemed.profile.dto;

import com.toandev2505.leemed.core.dto.BaseDTO;
import com.toandev2505.leemed.core.entity.BaseEntity;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProfileResponse extends BaseDTO {

    Long accountId;
    String displayName;
    String avatarUrl;
    String bio;
    String socialLinks;
    List<GameCategorySummary> favoriteGames;

    @EqualsAndHashCode(callSuper = true)
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class GameCategorySummary extends BaseEntity {

        String name;
        String slug;
        String iconUrl;
    }
}
