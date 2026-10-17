# CreatorStudio SV1 — cập nhật giao diện

## Phạm vi

Nâng cấp năm trang trên nhánh `feature/sv1-creatorstudio`:

- Trang chủ: tiêu đề lớn, khung minh họa dự án, các bước làm việc và thẻ tính năng.
- Đăng nhập: khối giới thiệu xanh đậm, biểu mẫu trên nền trắng và các lựa chọn vai trò rõ hơn.
- Dự án: banner giới thiệu, thống kê, thanh lọc và bộ thẻ dự án được thiết kế lại.
- Creative Brief: phân biệt khu nhập ý tưởng và khu chỉnh sửa kết quả; thêm điều hướng các bước.
- Duyệt phiên bản: nền so sánh trung tính, khu phản hồi và phần phê duyệt riêng biệt; thêm điều hướng các bước.

Giữ thương hiệu xanh lá, font Inter tiếng Việt đóng gói sẵn, dữ liệu demo và các thao tác hiện có. Điều hướng các bước giữ lại mã dự án đang chọn. Không thêm phụ thuộc, font hoặc dịch vụ bên ngoài.

CSS bố cục có các điều chỉnh cho điện thoại, máy tính bảng và desktop. Các hiệu ứng hover tuân thủ `prefers-reduced-motion`. Minh họa trang dự án chỉ để trang trí và có `aria-hidden`.

## Kiểm tra đã thực hiện

- `node --check` cho cả sáu tệp JavaScript.
- Kiểm tra cân bằng khối và dấu ngoặc cho tám tệp CSS.
- Năm trang HTML: không trùng ID; một tiêu đề H1; tài nguyên và liên kết nội bộ tồn tại; các ID gắn với hành vi cũ được giữ lại.
- Hai thanh điều hướng bước: mỗi thanh có ba liên kết và đúng một bước hiện tại.
- `git diff --check`.

Tổng cộng 38 kiểm tra tĩnh đã qua. Phiên chỉnh sửa không có công cụ xem thử trình duyệt, vì vậy chưa chạy lại hai bộ E2E, chưa kiểm chứng tương tác và tràn ngang thực tế. Kết quả kiểm thử cũ trong các tài liệu khác không phải kết quả cho bản cập nhật giao diện này.

## Xem và kiểm tra trực tiếp

Mở thư mục dự án bằng Live Server, truy cập `index.html`, chọn bản demo Client. Có thể chạy lại các bộ kiểm thử sẵn có với môi trường Playwright/Chromium của dự án:

```sh
node tests/sv1.e2e.cjs
node tests/typography.e2e.cjs
```

Kiểm tra thêm tại các chiều rộng 360, 390, 768 và 1440 px: menu điện thoại, hộp thoại tạo/sửa dự án, tìm kiếm/lọc, tạo và gửi brief, ghim phản hồi, thanh trượt so sánh và phê duyệt phiên bản.
