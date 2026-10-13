

**NGUỒN: [SƠ ĐỒ FHD](https://shorturl.at/MJ0n2)**

**Code**

@startuml
left to right direction
skinparam packageStyle rectangle

actor "Public (Guest)" as Public
actor "Viewer" as Viewer
actor "Creator" as Creator
actor "Admin" as Admin
actor "Hệ thống AI" as AI

' Quan hệ kế thừa (Inheritance)
Viewer -up-|> Public
Creator -up-|> Viewer

rectangle "Hệ thống Mạng xã hội & Sáng tạo Nội dung Game thủ" {

  package "Phân hệ Public" {
    usecase "Đăng ký & Đăng nhập" as UC_Auth
    usecase "Xem nội dung public\n(Bao gồm Livestream)" as UC_ViewPublic
  }

  package "Phân hệ Viewer" {
    usecase "Quản lý hồ sơ cá nhân" as UC_Profile
    usecase "Đăng ký Creator" as UC_RegCreator
    usecase "Tương tác livestream / video" as UC_Interact
    usecase "Nạp xu & Donate" as UC_Donate
    usecase "Mua hàng affiliate" as UC_BuyAff
    usecase "Đăng, sửa, xóa bài viết" as UC_Post
    usecase "Báo cáo vi phạm" as UC_Report
    usecase "Liên hệ hợp tác với creator" as UC_Contact
  }

  package "Phân hệ Creator" {
    usecase "Tạo & cấu hình phòng live" as UC_CreateLive
    usecase "Quản lý phòng live" as UC_ManageLive
    usecase "Đăng & quản lý video" as UC_ManageVideo
    usecase "Tùy chỉnh thông báo donate" as UC_CustomDonate
    usecase "Rút tiền doanh thu" as UC_Withdraw
    usecase "Thêm, xóa sản phẩm affiliate" as UC_ManageAff
  }

  package "Phân hệ Admin" {
    usecase "Duyệt Creator" as UC_ApproveCreator
    usecase "Khóa / mở tài khoản" as UC_LockUser
    usecase "Duyệt & xử lý nội dung vi phạm" as UC_HandleViolation
    usecase "Quản lý danh mục game" as UC_ManageGame
    usecase "Xem báo cáo thống kê\n(Doanh thu & Lưu lượng)" as UC_ReportAdmin
  }

  package "Phân hệ Dịch vụ AI" {
    usecase "Lọc chat toxic" as UC_AIToxic
    usecase "Quét nội dung vi phạm\n(ảnh/video & comment)" as UC_AIScan
    usecase "Gợi ý bài viết, video,\nlivestream" as UC_AIRecommend
    usecase "Tạo phụ đề tự động" as UC_AISubtitle
  }
}

' Liên kết Actor với Use Case chính
Public --> UC_Auth
Public --> UC_ViewPublic

Viewer --> UC_Profile
Viewer --> UC_RegCreator
Viewer --> UC_Interact
Viewer --> UC_Donate
Viewer --> UC_BuyAff
Viewer --> UC_Post
Viewer --> UC_Report
Viewer --> UC_Contact

Creator --> UC_CreateLive
Creator --> UC_ManageLive
Creator --> UC_ManageVideo
Creator --> UC_CustomDonate
Creator --> UC_Withdraw
Creator --> UC_ManageAff

Admin --> UC_ApproveCreator
Admin --> UC_LockUser
Admin --> UC_HandleViolation
Admin --> UC_ManageGame
Admin --> UC_ReportAdmin

AI --> UC_AIToxic
AI --> UC_AIScan
AI --> UC_AIRecommend
AI --> UC_AISubtitle

@enduml