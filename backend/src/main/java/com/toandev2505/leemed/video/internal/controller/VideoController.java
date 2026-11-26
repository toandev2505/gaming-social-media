package com.toandev2505.leemed.video.internal.controller;

import com.toandev2505.leemed.video.dto.UploadVideoRequest;
import com.toandev2505.leemed.video.dto.VideoResponse;
import com.toandev2505.leemed.video.internal.service.VideoService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/videos")
@RequiredArgsConstructor
public class VideoController {

    private final VideoService videoService;

    // 1. Tạo / đăng video (nhận metadata + videoUrl / thumbnailUrl)
    @PostMapping
    public ResponseEntity<VideoResponse> uploadVideo(@Valid @RequestBody UploadVideoRequest request) {
        VideoResponse response = videoService.uploadVideo(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // 2. Hiển thị danh sách video (có phân trang + lọc theo gameCategoryId hoặc creatorId)
    @GetMapping
    public ResponseEntity<Page<VideoResponse>> getVideos(
            @RequestParam(required = false) Long gameCategoryId,
            @RequestParam(required = false) Long creatorId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(Math.max(page, 0), Math.min(Math.max(size, 1), 50));
        return ResponseEntity.ok(videoService.getVideos(gameCategoryId, creatorId, pageable));
    }

    // 3. Hiển thị chi tiết 1 video theo id
    @GetMapping("/{id}")
    public ResponseEntity<VideoResponse> getVideoById(@PathVariable Long id) {
        return ResponseEntity.ok(videoService.getVideoById(id));
    }
}
