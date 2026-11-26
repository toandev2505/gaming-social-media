package com.toandev2505.leemed.video.mapper;

import com.toandev2505.leemed.video.dto.UploadVideoRequest;
import com.toandev2505.leemed.video.dto.VideoResponse;
import com.toandev2505.leemed.video.entity.Video;
import com.toandev2505.leemed.video.entity.VideoStatus;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface VideoMapper {

    @Mapping(target = "status", source = "status")
    @Mapping(target = "title", expression = "java(request.getTitle().trim())")
    @Mapping(target = "description", expression = "java(request.getDescription() != null ? request.getDescription().trim() : null)")
    @Mapping(target = "videoUrl", expression = "java(request.getVideoUrl().trim())")
    @Mapping(target = "thumbnailUrl", expression = "java(request.getThumbnailUrl() != null ? request.getThumbnailUrl().trim() : null)")
    Video toEntity(UploadVideoRequest request, VideoStatus status);

    VideoResponse toResponse(Video video);
}
