
**NGUỒN: [SƠ ĐỒ FHD](https://shorturl.at/3liJR)**

|**Tên Use case**|Đăng ký|
|---|---|
|**Mô tả**|Chức năng giúp người dùng chưa có tài<br>khoản thực hiện đăng ký tài khoản mới trên<br>hệ thống bằng Email/Số điện thoại hoặc<br>Google SSO và xác thực OTP để sử dụng<br>các dịch vụ.|
|**Actor chính**|Public|
|**Actor phụ**<br>|Không có|
|**Điều kiện tiên quyết**<br>|Người dùng chưa đăng nhập và đang ở trang<br>Đăng ký.|
|**Điều kiện sau**<br>|Tài khoản mới được khởi tạo ở trạng thái<br>"Hoạt động".|
|**Luồng sự kiện chính**||
|Actor: Public|Hệ thống<br>|
|1. Chọn chức năng "Đăng ký" trên giao diện.<br>|2. Hiển thị biểu mẫu đăng ký (nhập<br>Email/SĐT, Mật khẩu) và phương thức đăng<br>ký bằng tài khoản Google.<br>|
|3. Nhập đầy đủ thông tin bắt buộc và nhấn<br>nút"Đăng ký"|4. Kiểm tra tính hợp lệ của dữ liệu đầu vào<br>và độ mạnh của mật khẩu.<br>|
||5. Phát sinh yêu cầu tạo mã OTP, gửi đến<br>Email/SĐT của người dùng và xác minh<br>OTP.|
||6. Xác minh thành công, tạo tài khoản mới và<br>lưu thông tin vào CSDL.<br>|
||7. Hiển thị thông báo "Đăng ký tài khoản<br>thành công" và chuyển người dùng đến trang<br>Đăng nhập.|
|**Luồng sự kiện thay thế**||
||4.1. Hiển thị thông báo lỗi ngay tại các<br>trường tương ứng và yêu cầu người dùng<br>nhập lại.|
||5.1. Thông báo mã OTP hết hạn và cho phép<br>người dùng yêu cầu gửi lại OTP hoặc hủy<br>thao tác.|

**Code**

@startuml
left to right direction
skinparam packageStyle rectangle

actor "Public" as Guest

rectangle "Đăng ký" {
  usecase "Đăng ký tài khoản" as UC_Register
  usecase "Đăng ký Email / SĐT" as UC_SDT
  usecase "Đăng ký Google SSO" as UC_SSO
  usecase "Xác nhận OTP" as UC_OTP
}

Guest --> UC_Register

' Thể hiện sự phân rã / cụ thể hóa phương thức đăng ký
UC_Register <.. UC_SDT : <<extend>>
UC_Register <.. UC_SSO : <<extend>>
UC_SDT ..> UC_OTP : <<include>>

@enduml