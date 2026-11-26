package com.toandev2505.leemed.video.entity;

import com.toandev2505.leemed.core.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Entity
@Table(name = "videos")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Video extends BaseEntity {

    @Column(name = "creator_id", nullable = false)
    Long creatorId;

    @Column(nullable = false, length = 200)
    String title;

    @Column(columnDefinition = "TEXT")
    String description;

    @Column(name = "video_url", nullable = false, length = 500)
    String videoUrl;

    @Column(name = "thumbnail_url", length = 500)
    String thumbnailUrl;

    @Column(name = "game_category_id")
    Long gameCategoryId;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 30)
    @Builder.Default
    VideoStatus status = VideoStatus.PUBLISHED;
}
