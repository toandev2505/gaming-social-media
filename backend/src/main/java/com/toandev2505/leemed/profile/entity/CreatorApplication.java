package com.toandev2505.leemed.profile.entity;

import com.toandev2505.leemed.core.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Builder
@Entity
@Table(name = "creator_applications")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreatorApplication extends BaseEntity {

    @Column(name = "account_id", nullable = false)
    Long accountId; // Dùng Long để giữ ranh giới module với Account

    // --- Thông tin kênh dự kiến ---
    @Column(name = "desired_channel_name", nullable = false, length = 120)
    String desiredChannelName;

    @Column(name = "desired_handle", nullable = false, length = 60)
    String desiredHandle; // Ví dụ: @leechienthan

    @Column(name = "channel_description", length = 1000)
    String channelDescription;

    @Column(name = "primary_game_category_id")
    Long primaryGameCategoryId; // Thể loại game chính dự định làm nội dung

    // --- Thông tin xác minh năng lực / danh tính ---
    @Column(name = "full_name", nullable = false, length = 120)
    String fullName;

    @Column(name = "contact_phone", length = 20)
    String contactPhone;

    @Column(name = "portfolio_links", columnDefinition = "TEXT")
    String portfolioLinks; // Link kênh YouTube/TikTok/Facebook cũ để admin đánh giá

    @Column(name = "reason_to_join", length = 1000)
    String reasonToJoin; // Giới thiệu định hướng nội dung / livestream

    @Column(name = "agreed_to_terms", nullable = false)
    @Builder.Default
    boolean agreedToTerms = true;

    // --- Thông tin xét duyệt của Admin ---
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false, length = 20)
    @Builder.Default
    ApplicationStatus status = ApplicationStatus.PENDING;

    @Column(name = "reviewed_at")
    LocalDateTime reviewedAt;

    @Column(name = "rejection_reason", length = 500)
    String rejectionReason;
}
