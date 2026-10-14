# CreatorStudio SV3 — bản v2, bàn giao 07/10/2026

Bản gốc giữ nguyên trong ZIP người dùng cung cấp. Tên HTML nội bộ được giữ để không làm hỏng điều hướng. Không cần đổi tên từng HTML vì phiên bản được tách bằng ZIP/thư mục bàn giao mới.

## Sửa đổi

- Khung chung: thêm `App.preserveFocus`, giữ phần tử đang thao tác và vùng chọn văn bản khi dựng lại nội dung. Áp dụng ở 5 màn hình nghiệp vụ SV3.
- Bảng công việc: form duyệt brief ghi rõ việc mới ở cột Cần làm, bỏ lựa chọn trạng thái bị bỏ qua; tăng tương phản mã/mô tả thẻ.
- Duyệt nội bộ: thông báo riêng cho Approved, Client Review, Changes Requested; giữ tỷ lệ tự nhiên của ảnh để ghim phần trăm không bị lệch do crop; hiển thị đúng dự án/phiên bản và trạng thái thiếu hình cho phiên bản chưa có tài sản demo.
- Thêm kiểm thử hồi quy và cập nhật bảng tiến độ, biên bản QA, báo cáo AI.

Không thay đổi schema dữ liệu, không thêm framework hoặc backend. AI-2 vẫn mô phỏng.

## Dùng bản mới

1. Giải nén sang thư mục riêng, giữ bản cũ nếu đã tự sửa.
2. Mở thư mục bằng VS Code, dùng Live Server với `index.html`, hoặc chạy `python server.py`.
3. Đọc `TIEN-DO-SV3.md` và `QA-SV3-2026-10-06.md` trong docs.
4. Kiểm tra các bước còn trống trên Chrome desktop/mobile trước khi đánh dấu hoàn thành.

Dữ liệu LocalStorage không đi cùng ZIP. Cùng origin vẫn dùng khóa dữ liệu hiện có; đổi địa chỉ/cổng có thể thấy dữ liệu mẫu mới.

## Danh sách file thay đổi so với ZIP gốc

- Sửa: `README.md`
- Sửa: `css/pages/lead.css`
- Thêm: `docs/QA-SV3-2026-10-06.md`
- Thêm: `docs/TIEN-DO-SV3.md`
- Sửa: `docs/ai-usage-report.md`
- Sửa: `js/app.js`
- Sửa: `js/pages/admin-project-settings.js`
- Sửa: `js/pages/admin-user-management.js`
- Sửa: `js/pages/lead-feedback-summary.js`
- Sửa: `js/pages/lead-internal-review.js`
- Sửa: `js/pages/lead-task-board.js`
- Thêm: `tests/brief-regression.test.cjs`
- Thêm: `tests/focus-regression.test.cjs`
- Thêm: `tests/review-status.test.cjs`
