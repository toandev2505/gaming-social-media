package com.toandev2505.leemed.profile.entity;

import com.toandev2505.leemed.core.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Entity
@Table(name = "channels")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreatorChannel extends BaseEntity {

    @Column(name = "account_id", nullable = false, unique = true)
    Long accountId;

    @Column(name = "channel_name", nullable = false, length = 120)
    String channelName;

    @Column(name = "handle", nullable = false, unique = true, length = 60)
    String handle; // Ví dụ: @leechienthan

    @Column(name = "banner_url", length = 500)
    String bannerUrl;

    @Column(name = "description", length = 1000)
    String description;

    @Column(name = "follower_count", nullable = false)
    @Builder.Default
    Long followerCount = 0L;

    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status", nullable = false, length = 30)
    @Builder.Default
    private ChannelStatus verificationStatus = ChannelStatus.PENDING;
}
