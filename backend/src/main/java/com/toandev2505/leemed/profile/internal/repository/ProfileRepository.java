package com.toandev2505.leemed.profile.internal.repository;

import com.toandev2505.leemed.profile.entity.Profile;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    @EntityGraph(attributePaths = "favoriteGames")
    Optional<Profile> findByAccountId(Long accountId);
}
