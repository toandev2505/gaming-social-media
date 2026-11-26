package com.toandev2505.leemed.video.dto;

import com.toandev2505.leemed.core.dto.BaseDTO;
import com.toandev2505.leemed.video.entity.VideoStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

@EqualsAndHashCode(callSuper = true)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class VideoResponse extends BaseDTO {

    Long creatorId;
    String title;
    String description;
    String videoUrl;
    String thumbnailUrl;
    Long gameCategoryId;
    VideoStatus status;
}
