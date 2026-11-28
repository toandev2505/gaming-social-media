package com.toandev2505.leemed.profile.entity;

public enum ApplicationStatus {
    PENDING,      // Chờ admin duyệt
    APPROVED,     // Đã duyệt -> tạo CreatorChannel & nâng role
    REJECTED,     // Từ chối (kèm lý do để user sửa và nộp lại)
    CANCELLED     // User tự hủy đơn khi đang chờ duyệt
}
