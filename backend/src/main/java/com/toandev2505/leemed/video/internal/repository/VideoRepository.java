package com.toandev2505.leemed.video.internal.repository;

import com.toandev2505.leemed.video.entity.Video;
import com.toandev2505.leemed.video.entity.VideoStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VideoRepository extends JpaRepository<Video, Long> {

    Page<Video> findAllByStatusOrderByCreatedAtDesc(VideoStatus status, Pageable pageable);

    Page<Video> findAllByStatusAndGameCategoryIdOrderByCreatedAtDesc(
            VideoStatus status, Long gameCategoryId, Pageable pageable
    );

    Page<Video> findAllByCreatorIdAndStatusNotOrderByCreatedAtDesc(
            Long creatorId, VideoStatus excludedStatus, Pageable pageable
    );

    Optional<Video> findByIdAndStatus(Long id, VideoStatus status);
}
