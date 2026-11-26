package com.toandev2505.leemed.video.entity;

public enum VideoStatus {

    UPLOADING,    // Đang tải lên
    PROCESSING,   // Đang xử lý / transcode
    PUBLISHED,    // Đã xuất bản
    HIDDEN,       // Bị ẩn (vi phạm / tạm khóa)
    DELETED
}
