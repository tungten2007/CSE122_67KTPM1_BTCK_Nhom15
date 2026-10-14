# TASK-05 — Hiện thực giao diện dùng chung: phần SV3

Theo cách đánh số đã thống nhất trong cuộc trò chuyện, Task 5 là hiện thực giao diện dùng chung. Trong kế hoạch chi tiết, trách nhiệm tương ứng của SV3 là **TASK-CORE-03 — Global Navigation Shell & Demo Role Switcher**. Không nhầm Task 5 với TASK-CORE-05 (module JS của SV2).

## Mục đích, giải thích dễ hiểu

Header là thanh phía trên; sidebar là menu bên trái. Viết một bộ dùng chung để 6 màn hình không phải sao chép và sửa riêng từng menu. Mở trang nào thì menu đánh dấu trang đó. Role Switcher là ô đổi vai trò demo, không phải đăng nhập bảo mật.

## Đã làm trên bộ website hiện có

- Header/sidebar/footer nhất quán; trạng thái menu hiện hành có aria-current.
- Tách bản đồ điều hướng, kiểm tra vai trò, phiên demo và điều khiển menu vào `js/modules/navigation.js`.
- Thêm `css/navigation.css` cho hành vi menu/chuông; kiểu khung cơ bản vẫn nằm trong `css/base.css` để không phá giao diện cũ.
- Role Switcher đủ Lead, Admin, Client và Designer. Chỉ chọn tài khoản đang hoạt động, ghi hồ sơ demo tối thiểu vào `localStorage.currentUser` và ID vào SessionStorage.
- Lead/Admin đến các màn hình hiện có. Client/Designer đến `role-preview.html`, có thông báo chưa ghép; không giả tạo trang của SV1/SV2.
- `index.html` trở về đúng phân hệ demo đã chọn khi mở lại; không phải Landing của SV1.
- Chuông mở danh sách hoạt động demo. Với Client/Designer chưa ghép, không hiện hoạt động nội bộ. Không thay thế Notifications Center của SV2.
- Menu mobile có backdrop, đóng bằng Escape, trả focus, hạn chế Tab trong menu đang mở và vô hiệu vùng nền bằng inert. Khi đóng, menu ngoài màn hình không nhận focus.
- Dialog dùng chung đóng được bằng Escape và click bên ngoài. Đây là bổ sung cho bản demo; không tuyên bố hoàn tất bộ 4 module của SV2.

## Bạn làm theo thứ tự này

1. Tải lại ZIP mới, giải nén sang thư mục riêng. Nếu bản cũ đã được bạn tự sửa, giữ lại bản đó để đối chiếu trước khi chép đè.
2. VS Code → Open Folder → mở thư mục vừa giải nén → bấm phải `index.html` → Open with Live Server.
3. Ở Trưởng nhóm: mở lần lượt Bảng công việc, Duyệt nội bộ, Tổng hợp phản hồi; menu phải đánh dấu đúng mục.
4. Đổi Quản trị viên: phải đến Quản lý người dùng. Mở Thiết lập dự án, bấm chuông hoạt động.
5. Đổi Khách hàng và Nhà thiết kế: thấy thông báo chưa tích hợp. Đây là kết quả dự kiến, không phải lỗi 404.
6. Đổi về Trưởng nhóm, mở trực tiếp `admin-user-management.html`: phải chuyển sang 403. Nút về đưa về bảng công việc.
7. Thu cửa sổ hoặc dùng chế độ thiết bị trong DevTools: thử hamburger, Tab, Shift+Tab, Escape và click nền. Kiểm tra ở 390px và 360px.
8. Tải lại trang rồi mở `index.html`: kiểm tra vai trò/dự án và dữ liệu không mất.
9. Đính kèm ZIP mới và nội dung `TASK-05-TRELLO.txt` vào thẻ Task 5; ghi phần đã kiểm tra trên máy bạn. Chưa tự đánh dấu kiểm tra trình duyệt đã đạt.

## Khi nhận phần SV1/SV2

Bản đồ `Navigation.integrations` trong navigation.js đang có `ready:false` cho hai phân hệ. Chỉ chuyển từng mục thành `ready:true` sau khi đã ghép file thật và thống nhất dữ liệu/phiên với nhóm. Không bật trước vì sẽ dẫn tới file chưa có. Header/sidebar của các trang mới cũng cần dùng cùng module; chưa thể kiểm thử tích hợp khi thiếu nguồn của hai bạn.

Danh mục sidebar hiện chứa 5 trang Lead/Admin của SV3; trang lỗi dùng chung không cần mục menu riêng. Các mục sidebar Client/Designer phải bổ sung theo file thật khi ghép, không tự kết luận điều hướng toàn bộ 17 màn hình đã xong.

`localStorage.currentUser` là alias phục vụ demo/tích hợp; dữ liệu nghiệp vụ vẫn ở `creatorstudio.sv3.v1`. Role Switcher không lưu mật khẩu. Khi ghép hệ thống nhóm, thống nhất schema currentUser và bỏ cơ chế phiên trùng lặp nếu nhóm đã có module đăng nhập.

## Mức hoàn thành

Đã lập trình phần khung của SV3 và chạy 5 nhóm kiểm thử điều hướng cùng 12 nhóm nghiệp vụ cũ. Chưa xác minh render/console/menu bằng trình duyệt thật trong môi trường này, chưa ghép SV1/SV2, chưa review nhóm hoặc duyệt giảng viên. Đề xuất trạng thái: **Chờ kiểm tra trên trình duyệt và tích hợp**, sau đó Chờ duyệt. Không gọi toàn bộ Task 5 của nhóm đã hoàn thành.
