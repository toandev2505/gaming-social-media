package com.toandev2505.leemed.profile.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UpdateProfileRequest {

    @NotBlank(message = "Tên hiển thị không được để trống")
    @Size(max = 100, message = "Tên hiển thị tối đa 100 ký tự")
    String displayName;

    @Size(max = 500, message = "Link avatar tối đa 500 ký tự")
    String avatarUrl;

    @Size(max = 500, message = "Tiểu sử tối đa 500 ký tự")
    String bio;

    String socialLinks;

    // Truyền danh sách ID game yêu thích (null = giữ nguyên, [] = xóa hết)
    Set<Long> favoriteGameIds;
}
