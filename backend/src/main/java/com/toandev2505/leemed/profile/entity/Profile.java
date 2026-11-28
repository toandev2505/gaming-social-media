package com.toandev2505.leemed.profile.entity;

import com.toandev2505.leemed.category.entity.GameCategory;
import com.toandev2505.leemed.core.entity.BaseEntity;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

@Builder
@Entity
@Table(name = "profiles")
@Data
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Profile extends BaseEntity {

    @Column(name = "account_id", nullable = false, unique = true)
    Long accountId;

    @Column(name = "display_name", nullable = false, length = 100)
    String displayName;

    @Column(name = "avatar_url", length = 500)
    String avatarUrl;

    @Column(name = "bio", length = 500)
    String bio;

    @Column(name = "social_links", columnDefinition = "TEXT")
    String socialLinks;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "profile_favorite_games",
            joinColumns = @JoinColumn(name = "profile_id"),
            inverseJoinColumns = @JoinColumn(name = "game_category_id")
    )
    @Builder.Default
    private Set<GameCategory> favoriteGames = new HashSet<>();
}
