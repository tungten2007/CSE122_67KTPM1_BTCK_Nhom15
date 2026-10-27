# Liên kết các phân hệ SV1 – SV2 – SV3

Cập nhật: **27/10/2026**. Bản website chạy trong `Project_nhom15`.

## Thay đổi

- Cập nhật 6 trang SV2 theo giao diện mới nhất; HTML, CSS và JavaScript tách riêng tại `html/sv2`, `css/sv2`, `js/sv2`.
- `js/sv2/api.js` là adapter tới Store của nhóm. Cả ba phân hệ dùng khóa `creatorstudio.team.v1`; không tạo thêm kho dữ liệu SV2 độc lập.
- Menu hiển thị đúng Client, Designer, Lead hoặc Admin. Chuyển tài khoản cụ thể, giữ dự án đang chọn và đăng xuất dùng cùng mô-đun Navigation.
- SV2 dùng điều hướng trang thông thường để mã DOMContentLoaded chạy đúng một lần; các trang SV1/SV3 giữ cơ chế chuyển trang nội bộ có sẵn.
- Nộp phiên bản qua `Store.submitVersionForReview`: kiểm tra quyền sở hữu, checklist, trạng thái, dự án lưu trữ; lưu lịch sử và tạo thông báo cho từng Lead đang hoạt động.
- Thông báo mở đúng dự án và phiên bản bằng `?project=...&version=...`. Trang Lead ưu tiên phiên bản được chỉ định trong liên kết.
- Lead yêu cầu sửa tạo thông báo ngược cho Designer. Designer được sửa và nộp lại bản `Changes Requested`; trang phiên bản hiển thị lý do phản hồi.
- Giữ toàn bộ chi tiết AI-3 hiện có khi lưu Moodboard: bảng màu, từ khóa, giải thích, chất liệu, Typography, chủ đề và thẻ ảnh. AI vẫn là mô phỏng JavaScript.
- Sửa link neo nội trang khi có thẻ base, trạng thái ARIA/menu mobile, chuyển dự án từ link thông báo và lỗi hiệu ứng chuyển trang.
- Trang SV2 phát hiện dữ liệu bị thay đổi ở tab khác trước khi ghi, yêu cầu tải lại; lỗi lưu không được báo thành công.
- Thiết kế SV2 mới nhất nằm trong `figma-canva/sv2/`.

## Luồng SV2 gửi phiên bản cho SV3 — đã thử trên trình duyệt

| Bước | Thao tác | Kết quả |
| --- | --- | --- |
| 1 | Designer An Nguyễn tạo “Kiểm tra SV2 gửi SV3 · 27-10” | Tạo bản nháp `MC26-BaoBi-v4` |
| 2 | Nộp khi chưa tích checklist | Bị chặn, giữ Draft |
| 3 | Sửa nháp, tích 3 mục checklist, lưu và nộp | Chuyển `Internal Review` |
| 4 | Chuyển sang Lead Linh Hà, mở Thông báo | Có thông báo mới cho đúng phiên bản |
| 5 | Bấm Xem chi tiết | Mở đúng Mộc Coffee và phiên bản vừa nộp tại Duyệt nội bộ |
| 6 | Tải lại trang Lead | Phiên bản vẫn tồn tại, giữ trạng thái và đúng người gửi |
| 7 | Lead yêu cầu sửa kèm lý do | Chuyển `Changes Requested`, Designer nhận thông báo và link về đúng phiên bản |

Ảnh: [SV2 đã nộp](../../04-qa/sv2-integration/sv2-submitted.jpg), [thông báo Lead](../../04-qa/sv2-integration/sv3-notification.jpg), [SV3 sau tải lại](../../04-qa/sv2-integration/sv3-received-after-reload.jpg), [phản hồi về Designer](../../04-qa/sv2-integration/sv2-returned.jpg).

## Kiểm tra

- Toàn bộ 12 bộ `tests/*.test.cjs`: PASS, gồm 12 nhóm mới trong `sv2-linked.test.cjs`.
- `node tests/task27-integration.cjs`: 11 nhóm PASS, gồm Client gửi brief → Lead giao việc → Designer nộp → Lead chuyển khách → Client phản hồi/duyệt và tải lại.
- `python -m unittest discover -s tests -p "test_*.py"`: 13 kiểm thử REST API cục bộ PASS.
- `python check_bundle.py`: kiểm tra file/tài nguyên và đường dẫn HTML.
- Trình duyệt: mở các trang của cả 4 vai trò; kiểm tra menu, đổi tài khoản, giữ dự án, trang hồ sơ/thông báo dùng chung và chặn Client mở Dashboard Designer bằng trang 403.
- Thử AI-3 sinh → áp dụng → tải lại vẫn giữ kết quả; email sai bị chặn cạnh trường nhập.
- Kiểm tra 19 trang ở viewport rộng 320px (14 trang nghiệp vụ, trang chủ, đăng nhập, đăng ký, trang lỗi và demo API): không ghi nhận tràn ngang toàn trang. Đây là kiểm tra viewport, không phải điện thoại thật.
- Hai ảnh chưa có src trong Client Review nằm trong vùng ẩn khi chưa chọn phiên bản; không phải lỗi tải ảnh hiển thị.
- Các lỗi ViewTransition ghi nhận đầu lượt kiểm tra đã được sửa; các lượt chuyển vai trò/trang sau đó không phát sinh lỗi này.

Kết quả DOM/đơn vị không thay thế kiểm thử trình duyệt; các mô tả trên phân biệt rõ hai loại. Chưa kiểm thử Safari/Firefox hoặc mọi thao tác trên thiết bị thật.

## Cách mở và điều kiện dữ liệu

Chạy `CHAY-WINDOWS.bat` trong thư mục `Project_nhom15`, hoặc `python server.py 8000`, rồi mở `http://127.0.0.1:8000/html/sv1/login.html`. Chọn tài khoản demo cụ thể; mật khẩu mẫu là `demo123`.

Các vai trò phải chạy trên **cùng trình duyệt và cùng địa chỉ/cổng** để đọc chung LocalStorage. Đây là bản demo lưu tại trình duyệt; chưa có backend đồng bộ phiên bản giữa hai máy khác nhau. REST API dự án cục bộ vẫn giữ nguyên tại trang Demo API.

Các báo cáo cũ phản ánh thời điểm lập báo cáo. Tài liệu này ghi nhận đợt tích hợp mới; không tự xác nhận review PR, duyệt Figma, OBS hoặc đã upload GitHub.
