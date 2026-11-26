package com.toandev2505.leemed.video.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UploadVideoRequest {

    @NotNull(message = "creatorId không được để trống")
    Long creatorId;

    @NotBlank(message = "Tiêu đề không được để trống")
    @Size(max = 200, message = "Tiêu đề tối đa 200 ký tự")
    String title;

    @Size(max = 5000, message = "Mô tả tối đa 5000 ký tự")
    String description;

    @NotBlank(message = "videoUrl không được để trống")
    @Size(max = 500, message = "videoUrl tối đa 500 ký tự")
    String videoUrl;

    @Size(max = 500, message = "thumbnailUrl tối đa 500 ký tự")
    String thumbnailUrl;

    Long gameCategoryId;
}
