package com.toandev2505.leemed.video.internal.service;

import com.toandev2505.leemed.video.dto.UploadVideoRequest;
import com.toandev2505.leemed.video.dto.VideoResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface VideoService {

    VideoResponse uploadVideo(UploadVideoRequest request);

    Page<VideoResponse> getVideos(Long gameCategoryId, Long creatorId, Pageable pageable);

    VideoResponse getVideoById(Long id);
}
