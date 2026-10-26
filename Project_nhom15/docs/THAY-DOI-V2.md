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

## Tích hợp phần hủy công việc — 26/10/2026

- Đưa luồng hủy công việc từ `feature/sv3` vào cấu trúc đã sắp xếp của `dev`: `js/shared/store.js`, `js/sv3/app.js`, `js/sv3/pages/lead-task-board.js`, `css/sv3/pages/lead.css`.
- Yêu cầu lý do, hiển thị cột Đã hủy, chặn chuyển/chỉnh sửa công việc đã hủy và tính trạng thái hủy là trạng thái kết thúc khi lưu trữ dự án.
- Không chạy kiểm thử; người dùng sẽ kiểm tra thủ công.

## Bổ sung ngày 26/10/2026 — hủy công việc

- Thêm trạng thái `Đã hủy` cho bảng công việc SV3 và thao tác hủy riêng yêu cầu nhập lý do.
- Chặn chuyển công việc thường sang trạng thái hủy, chặn chuyển lại hoặc sửa công việc đã hủy; cho phép lưu trữ dự án khi các việc còn lại đều đã hoàn thành hoặc đã hủy.
- Cập nhật các tệp `js/store.js`, `js/app.js`, `js/pages/lead-task-board.js` và `css/pages/lead.css`.
- Chưa chạy ứng dụng/kiểm thử; để người dùng kiểm tra theo yêu cầu.

- Sửa bộ chọn sự kiện cho nút hủy để gắn đúng trên mọi thẻ công việc.

## Bổ sung ngày 26/10/2026 — xóa có kiểm soát

- Thêm thao tác xóa công việc đã hủy; chặn xóa task chưa hủy hoặc còn liên kết đề xuất.
- Thêm thao tác xóa người dùng; chặn tự xóa, xóa Admin hoạt động cuối cùng và xóa người dùng còn liên kết với task, phiên bản, phản hồi, brief hoặc dự án.
- Ghi nhận thao tác vào activity log; cập nhật `js/store.js`, `js/pages/lead-task-board.js` và `js/pages/admin-user-management.js`.
- Chưa chạy kiểm thử; chờ người dùng kiểm tra trước khi gộp vào `dev`.

- Điều chỉnh thẻ đã hủy: giữ chỉ đọc, tắt kéo thả, đồng thời hiện nút xóa khi dự án còn mở.

## Bổ sung ngày 26/10/2026 — lọc và phân trang bảng công việc

- Thêm sắp xếp theo hạn, tên hoặc ưu tiên; xóa bộ lọc; tìm kiếm debounce; đếm kết quả và phân trang.
- Tiến độ không tính các công việc đã hủy.
- Sửa selector gắn sự kiện chỉnh sửa để áp dụng cho mọi thẻ công việc.
- Chưa chạy kiểm thử.

## Bổ sung ngày 26/10/2026 — quản lý danh sách người dùng

- Thêm sắp xếp theo tên, vai trò, trạng thái; tìm kiếm debounce; nút xóa bộ lọc; bộ đếm có thông báo cập nhật; giữ phân trang.
- Chưa chạy kiểm thử.

## Bổ sung ngày 26/10/2026 — dữ liệu demo SV3

- Mở rộng seed từ 6 lên 15 người dùng và từ 7 lên 15 công việc; có 2 công việc đã hủy để trình bày các trạng thái, lọc và phân trang.
- Dữ liệu là tài khoản demo giả lập; không chứa thông tin đăng nhập thật.
- Chưa chạy ứng dụng/kiểm thử.

## Bổ sung ngày 26/10/2026 — trạng thái gửi và focus của modal

- Đưa focus vào trường đầu tiên khi mở form; modal chỉ xem đưa focus vào nút đóng.
- Khóa nút gửi, hiển thị Đang lưu và ngăn gửi lặp trong lúc xử lý; hỗ trợ callback trả Promise.
- Khi lưu thất bại, giữ nội dung form, đưa focus đến thông báo lỗi và bật lại nút gửi để thử lại.
- Tệp sửa: `js/app.js`. Chỉ đối chiếu mã đã lưu trên GitHub; chưa chạy trình duyệt/kiểm thử, theo yêu cầu người dùng tự kiểm tra.

## Tích hợp SV3 vào dev — 26/10/2026

- Hợp nhất feature/sv3: xóa công việc đã hủy, xóa người dùng có guard và hộp xác nhận; lọc/sắp xếp/phân trang; seed 15 người dùng và 15 công việc (2 việc đã hủy); trạng thái gửi và focus modal.
- Chuyển mã sang js/shared, js/sv3 và css/sv3; giữ cấu trúc HTML, điều hướng, khóa dữ liệu dùng chung và API SV1/SV2 trên dev.
- Nút Xóa người dùng nằm tại html/sv3/admin-user-management.html sau khi tải bản dev mới. File JavaScript tương ứng: js/sv3/pages/admin-user-management.js.
- Chưa chạy trình duyệt hoặc bộ kiểm thử, theo yêu cầu người dùng tự kiểm tra. Seed mới áp dụng khi nạp dữ liệu mẫu mới; không tự đặt lại LocalStorage hiện có.
