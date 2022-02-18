# Kinh nghiệm Claims authorization

    Lê Thành Nhân
    Sinh viên ngành Kỹ thuật phần mềm
    Trường đại học Cần Thơ
    	nahn.thanhnhan@gmail.com
    		fb.com/nahndev

    Niên luận ngành Kỹ thuật phần mềm
    Thành viên:

---

## Vấn đề về authorization

Hệ thống cho phép người dùng tùy chỉnh các quyền của người dùng trên từng đối tượng (ở đây project) thông qua vai trò của người dùng đó. Vai trò được tạo trong quá trình xử dụng ứng. Từ đó yêu cầu một cơ chế ủy quyền với dựa trên phạm vi truy cập.

Các tài liệu, nguồn tham khảo thường dựa trên việc phân quyền trên toàn hệ thống. Khi chuyển đổi thành cơ chế phần quyền dựa trên phạm vi truy cập thì gặp nhiều khó khăn, đặc biệt với việc quyền của người dùng thay đổi liên tục dựa trên phạm vi. Việc sử dụng các dịch vụ để truy xuất quyền thường dẫn đến phụ thuộc vòng.

### Xác thực người dùng dựa trên quyền sở hữu (Claims-base authorization)

Hệ thống xây dưng cơ chế claimsbase dựa trên thư viện casl/ability nhưng chỉ thực hiện trên **guard** thay vì trực tiếp trong **service** dẫn tới nhiều vấn đề.

- Hệ thống khó mở rộng khi cần có nhiều đối tượng cần phân quyền hơn (ví dụ khí có thêm phòng chat, cuộc họp video, ....).
- Người dùng từ service yêu cầu quyền thấp gọi sang yêu cầu quyền cao hơn nhưng không bị chặn.
- Tích hợp socket với authorization xảy ra vấn đề lớn, khó khắn và tốn kém thời gian để tích hợp hoàn toàn.
- Không sử dụng được các thuộc tính của đối tượng được sử dụng trong quá trình xác thực.
- Không tích hợp việc lọc fields dựa trên permission thông qua casl. (Đã thiết lập cơ chế tích hợp thông qua permission dựa trên group của class-transformer với intercepter nhưng chưa cấu hình trên schema)

### Giải pháp cho dự án sau

- Tích hợp claimns-base authorization ở cả hai mức **guard** và **service**
- Nên xây dựng một module quản lý tất cả các quyền (**permission**) của user. Cung cấp các dịch vụ cho **CaslFactory** truy cập các quyền này và các module quản lý vai trò (role) của các module khác thêm **quyền** vào dựa trên scope được cấp.
- Xây dựng permission thành các PermissionSet thay vì các permission độc lập, các **role** và các **permission** của user được nối kết với permission này.

### Kinh nghiệm thu được.

- Cách vận và tích hợp claims-base authorization
- Hướng xây dựng tránh phụ thuộc vòng với authorization
