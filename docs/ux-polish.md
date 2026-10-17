# Nâng cấp trải nghiệm CreatorStudio SV1

Nguồn mã trước khi sửa: nhánh `feature/sv1-creatorstudio`, commit `2c757cba7dc538d00521c28b4d526bd81cefdb25`.

Đã đọc hồ sơ bàn giao do người dùng cung cấp, `README (3).md`, bảng kiểm kê Excel và bản xuất Trello. Phạm vi chỉnh sửa là 5 trang của bộ SV1 độc lập. Không thay schema, khóa dữ liệu, font Inter đóng gói sẵn hoặc mã tích hợp của đồng đội trên dev/main.

## Những gì thay đổi

| Trang           | Cải thiện cho người dùng                                                                                                                                                                                                          |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Trang chủ       | Lối vào demo rõ ràng, nói trước phạm vi các vai trò, FAQ mở bằng bàn phím và giải thích dữ liệu lưu cục bộ.                                                                                                                       |
| Đăng nhập       | Vào nhanh vai trò Khách hàng không cần nhập mật khẩu, hướng dẫn vai trò trước khi vào, xóa thông báo lỗi cũ khi trường đã hợp lệ.                                                                                                 |
| Dự án           | Nhắc thiết kế đang chờ duyệt, tìm kiếm tiếng Việt không dấu, xóa tìm kiếm, sắp xếp theo tên/hạn thực tế; tên dự án không bị cắt một dòng; dự án chưa có thiết kế dẫn đến viết brief.                                              |
| Creative Brief  | Đếm số phần có nội dung, lưu nháp ở thanh cuối trang, Ctrl/Cmd S, trạng thái chưa lưu rõ ràng, xác nhận trước khi tạo lại/đổi sang viết thủ công, cảnh báo rời trang/đổi dự án/đổi vai trò/đăng xuất; không gửi lặp brief đã gửi. |
| Duyệt phiên bản | Mở ảnh lớn và đổi giữa v1/v2, đếm phản hồi chưa xử lý, chỉnh tọa độ ghim bằng bàn phím, giữ tọa độ khi sửa nội dung; bảo toàn khóa của phiên bản Approved/Rejected và dự án lưu trữ.                                              |

Giữ riêng HTML, CSS và JavaScript. Bổ sung điều chỉnh cho màn hình nhỏ, nút cảm ứng, hộp thoại có tên truy cập và font nhập liệu 16 px. Giữ chế độ giảm chuyển động. Những thay đổi bố cục này chưa được xác minh trực quan bằng trình duyệt thật trong lần chỉnh sửa này.

Dự án và thông báo vẫn dùng LocalStorage `creatorstudio.sv1.v1`; phiên demo dùng SessionStorage `cs.session`. Không có API AI, máy chủ xác thực hoặc gửi thông báo cho người dùng khác. Không đưa thêm thư viện vào mã chạy website.

## Kiểm tra cho bản nâng cấp này

- **50 kiểm tra logic DOM** đạt bằng Happy DOM (`tests/ux-dom.mjs`): lối vào demo, validation, tìm kiếm/sắp xếp, CRUD tạo dự án, lưu brief, hủy rời trang/chuyển vai trò/đăng xuất, tạo lại nội dung, trạng thái Submitted, dự án lưu trữ, xem ảnh lớn, tọa độ phản hồi, yêu cầu sửa, phê duyệt và từ chối.
- **38 kiểm tra tĩnh** đạt: cú pháp 6 JavaScript ứng dụng; cân bằng khối của 8 CSS; tài nguyên và liên kết nội bộ; không trùng ID, giữ các ID gắn hành vi cũ; một H1 mỗi trang; điều hướng bước hợp lệ.
- `git diff --check` đạt. Các tệp mới/chỉnh sửa được định dạng bằng Prettier.

Happy DOM chỉ mô phỏng DOM để kiểm tra logic. Nó không chứng minh layout, font render, kích thước nút thực tế, tương tác bàn phím/hộp thoại native hay độ tương thích thiết bị. Môi trường chỉnh sửa không có Chromium, nên **chưa chạy hai bộ E2E Chromium và chưa xác minh viewport cho bản này**. Không dùng lại kết quả 75/67 của snapshot cũ làm bằng chứng cho bản nâng cấp.

Bộ E2E sẵn có được cập nhật để xác nhận hộp thoại thay nội dung trước khi tạo lại brief; cần chạy trên trình duyệt thật trước khi nhóm duyệt.

## Chạy lại kiểm tra

Website chỉ cần Live Server hoặc `python3 -m http.server 8000`. Dependency dưới đây chỉ phục vụ kiểm thử:

```sh
npm install --no-save --package-lock=false happy-dom
node tests/ux-dom.mjs
```

Với Playwright và Chromium đã cài, mở máy chủ HTTP rồi chạy:

```sh
node tests/sv1.e2e.cjs
node tests/typography.e2e.cjs
```

Chú ý kiểm tra desktop và chiều rộng 360/390/768/1440 px: cuộn trang, menu mobile, thanh lưu nháp, tiêu đề dài, lọc/sắp xếp, xác nhận rời trang, đổi vai trò, xem ảnh lớn, ghim tọa độ, focus và phím Escape. Kiểm tra native cảnh báo trước khi đóng/tải lại trang có nội dung chưa lưu; cảnh báo này do trình duyệt quyết định cách hiển thị.

Chưa có minh chứng nhóm duyệt Figma/PR, OBS, kiểm thử Firefox/Safari hoặc triển khai hosting cho bản này.
