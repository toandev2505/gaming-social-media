package com.toandev2505.leemed.video.internal.service.impl;

import com.toandev2505.leemed.core.security.CustomUserDetails;
import com.toandev2505.leemed.video.dto.UploadVideoRequest;
import com.toandev2505.leemed.video.dto.VideoResponse;
import com.toandev2505.leemed.video.entity.Video;
import com.toandev2505.leemed.video.entity.VideoStatus;
import com.toandev2505.leemed.video.internal.repository.VideoRepository;
import com.toandev2505.leemed.video.internal.service.VideoService;
import com.toandev2505.leemed.video.mapper.VideoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VideoServiceImpl implements VideoService {

    private final VideoRepository videoRepository;

    private final VideoMapper videoMapper;

    @Override
    @Transactional
    public VideoResponse uploadVideo(UploadVideoRequest request) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        CustomUserDetails currentUser = (auth != null && auth.getPrincipal() instanceof CustomUserDetails user)
                ? user
                : null;

        Long effectiveCreatorId = request.getCreatorId();
        if (currentUser != null) {
            if (effectiveCreatorId == null) {
                // Frontend không gửi creatorId -> tự lấy ID tài khoản đang đăng nhập
                effectiveCreatorId = currentUser.getId();
            } else {
                boolean isAdmin = "ADMIN".equalsIgnoreCase(currentUser.getRole());
                if (!isAdmin && !currentUser.getId().equals(effectiveCreatorId)) {
                    throw new AccessDeniedException("Bạn không thể đăng video với creatorId của tài khoản khác");
                }
            }
        }

        if (effectiveCreatorId == null) {
            throw new IllegalArgumentException("Không xác định được creatorId");
        }

        Video video = Video.builder()
                .creatorId(effectiveCreatorId)
                .title(request.getTitle().trim())
                .description(request.getDescription() != null ? request.getDescription().trim() : null)
                .videoUrl(request.getVideoUrl().trim())
                .thumbnailUrl(request.getThumbnailUrl() != null ? request.getThumbnailUrl().trim() : null)
                .gameCategoryId(request.getGameCategoryId())
                .status(VideoStatus.PUBLISHED)
                .build();

        return videoMapper.toResponse(videoRepository.save(video));
    }

    @Override
    public Page<VideoResponse> getVideos(Long gameCategoryId, Long creatorId, Pageable pageable) {
        Page<Video> page;
        if (creatorId != null) {
            page = videoRepository.findAllByCreatorIdAndStatusNotOrderByCreatedAtDesc(
                    creatorId, VideoStatus.DELETED, pageable
            );
        } else if (gameCategoryId != null) {
            page = videoRepository.findAllByStatusAndGameCategoryIdOrderByCreatedAtDesc(
                    VideoStatus.PUBLISHED, gameCategoryId, pageable
            );
        } else {
            page = videoRepository.findAllByStatusOrderByCreatedAtDesc(VideoStatus.PUBLISHED, pageable);
        }
        return page.map(videoMapper::toResponse);
    }

    @Override
    public VideoResponse getVideoById(Long id) {
        Video video = videoRepository.findByIdAndStatus(id, VideoStatus.PUBLISHED)
                .orElseThrow(() -> new IllegalArgumentException("Không tìm thấy video với id: " + id));
        return videoMapper.toResponse(video);
    }
}
