
**NGUỒN: [SƠ ĐỒ FHD](https://shorturl.at/V5J3e)**

|**Tên Use case**|Đăng nhập|
|---|---|
|**Mô tả**|Chức năng giúp người dùng chưa đăng nhập<br>thực hiện xác thực danh tính để truy cập vào<br>các tính năng bảo mật của hệ thống.|
|**Actor chính**|Public|
|**Actor phụ**|Không có|
|**Điều kiện tiên quyết**|Người dùng chưa đăng nhập vào hệ thống.|
|**Điều kiện sau**<br>|Hệ thống cấp token xác thực (JWT/Session),<br>người dùng đăng nhập thành công.|
|**Luồng sự kiện chính**||
|Actor: Public|Hệ thống<br>|
|1. Chọn chức năng "Đăng nhập" trên giao<br>diện.|2. Hiển thị màn hình Đăng nhập cùng các lựa<br>chọn phương thức (SĐT/Email hoặc Google<br>SSO).<br>|
|3. Lựa chọn đăng nhập một trong các<br>phương thức đăng nhập (SĐT/Email hoặc<br>Google SSO).|4. Kiểm tra tài khoản người dùng còn hoạt<br>động hay không.|
||5. Xác thực thông tin người dùng, khởi tạo<br>phiên làm việc (Session/JWT).<br>|
||6. Điều hướng người dùng vào trang chủ với<br>quyền hạn tương ứng.|
|**Luồng sự kiện thay thế**||
||4.1. Chặn truy cập và thông báo "Tài khoản<br>của bạn đã bị khóa. Vui lòng liên hệ bộ phận<br>hỗ trợ".|
|4.2. Quay lại bước 3.||

**Code**

@startuml
left to right direction
skinparam packageStyle rectangle

actor "Public" as Guest

rectangle "Đăng nhập" {
  usecase "Đăng nhập" as UC_Login
  usecase "Đăng nhập bằng SĐT / Email" as UC_SDT
  usecase "Đăng nhập bằng Google SSO" as UC_SSO
}

Guest --> UC_Login

' Thể hiện sự phân rã / cụ thể hóa phương thức đăng nhập
UC_Login <.. UC_SDT : <<extend>>
UC_Login <.. UC_SSO : <<extend>>

@enduml