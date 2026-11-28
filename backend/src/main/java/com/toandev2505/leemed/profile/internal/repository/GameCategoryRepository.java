package com.toandev2505.leemed.profile.internal.repository;

import com.toandev2505.leemed.category.entity.GameCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameCategoryRepository extends JpaRepository<GameCategory, Long> {
}
