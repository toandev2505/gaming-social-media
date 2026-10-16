![IMG_256](https://github.com/user-attachments/assets/c5b0ff54-b6d7-432d-a006-1366bd676936)

**NGUỒN: [SƠ ĐỒ FHD](https://shorturl.at/agFD3)**

|**Tên Use case**|Quên / Khôi phục mật khẩu|
|---|---|
|**Mô tả**|<br>Chức năng giúp người dùng chưa có tài<br>khoản thực hiện đăng ký tài khoản mới trên<br>hệ thống bằng Email/Số điện thoại hoặc<br>Google SSO và xác thực OTP để sử dụng<br>các dịch vụ.|
|**Actor chính**|Public|
|**Actor phụ**|Không có|
|**Điều kiện tiên quyết**|Người dùng không nhớ mật khẩu và ở màn<br>hình Quên mật khẩu.|
|**Điều kiện sau**|Mật khẩu mới được cập nhật thành công vào<br>CSDL.|
|**Luồng sự kiện chính**||
|Actor: Public|Hệ thống|
|1. Chọn "Quên mật khẩu?" tại màn hình<br>Đăng nhập.chọn "Quên mật khẩu?" tại màn<br>hình Đăng nhập.<br>|2. Hiển thị biểu mẫu yêu cầu nhập<br>Email/SĐT đã đăng ký.<br>|
|3. Nhập thông tin Email/SĐT và nhấn "Gửi<br>mã xác minh".|4. Kiểm tra thông tin Email/SĐT có tồn tại<br>trong hệ thống không.|
||<br>5. Phát sinh yêu cầu tạo mã OTP, gửi đến<br>Email/SĐT của người dùng và xác minh<br>OTP.<br>|
||6. Xác minh thành công, hiển thị màn hình<br>"Đặt lại mật khẩu mới".<br>|
|7. Nhập mật khẩu mới và xác nhận lại mật<br>khẩu mới, nhấn"Lưu mật khẩu".|8. Kiểm tra độ mạnh của mật khẩu.|
||9. Cập nhật mật khẩu mới vào CSDL.<br>|
||10. Hiển thị thông báo "Đặt lại mật khẩu<br>thành công" và chuyển người dùng đến trang<br>Đăng nhập.|
|**Luồng sự kiện thay thế**||
||4.1. Hiển thị thông báo lỗi Email/SĐT chưa<br>tồn tại. Yêu cầu người dùng kiểm tra lại.|
||5.1. Thông báo mã OTP hết hạn và cho phép<br>người dùng yêu cầu gửi lại OTP hoặc hủy<br>thao tác.|
||6.1. Thông báo mật khẩu chưa đủ mạnh, yêu<br>cầu nhập lại.|

**Code**

@startuml
left to right direction
skinparam packageStyle rectangle

actor "Public" as Guest

rectangle "Quên / Khôi phục mật khẩu" {
  usecase "Quên / Khôi phục mật khẩu" as UC_ForgotPwd
  usecase "Xác nhận OTP" as UC_OTP
}

Guest --> UC_ForgotPwd

' Thể hiện sự phân rã / cụ thể hóa phương thức đăng ký
UC_ForgotPwd ..> UC_OTP : <<include>>

@enduml
