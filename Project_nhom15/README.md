# CreatorStudio — Website thực hành phần SV3

Bản frontend HTML5 + CSS3 + JavaScript thuần cho 6 màn hình SV3. Không cần npm, không có framework hoặc backend. Toàn bộ CSS, JavaScript và hình SVG đều có sẵn trong thư mục, không tải CDN. Màu tím và thanh bên tối tiếp nối UI Kit đã làm.

## Mở website trên Windows / VS Code

1. Giải nén ZIP thành một thư mục thật. Không mở file khi còn nằm trong ZIP.
2. Mở `BAT-DAU.html` để đọc hướng dẫn. Mở VS Code → File → Open Folder → chọn thư mục `CreatorStudio-SV3-Website`.
3. Nếu đã có Live Server: bấm phải `index.html` → **Open with Live Server**. Nếu chưa có, mở Extensions và cài **Live Server** của **Ritwick Dey**, rồi thực hiện lại.
4. Trình duyệt mở Bảng công việc. Dùng ô **Demo: Trưởng nhóm** ở đầu trang để chuyển sang **Quản trị viên**.

Cách khác, nếu máy đã có Python 3.9 trở lên: bấm `CHAY-WINDOWS.bat`, hoặc mở Terminal trong thư mục và chạy `python server.py`. Truy cập `http://127.0.0.1:8000/index.html`. Giữ cửa sổ Terminal mở. Dừng bằng Ctrl+C. Nếu cổng bận: `python server.py 8001` rồi mở địa chỉ cổng 8001.

Có thể mở HTML trực tiếp để xem nhanh, nhưng nên dùng Live Server hoặc máy chủ Python để các trang dùng chung LocalStorage ổn định. Dữ liệu gắn với địa chỉ/cổng/trình duyệt: đổi từ localhost sang 127.0.0.1 hoặc đổi cổng sẽ có vùng dữ liệu khác.

## Thử luồng chính trong 5 phút

1. **Bảng công việc:** tạo một việc, sửa tiêu đề, đổi trạng thái bằng ô trên thẻ hoặc kéo thả trên desktop. Tải lại để kiểm tra dữ liệu. Bấm **Xem brief** → duyệt và tạo việc, hoặc yêu cầu bổ sung có lý do.
2. **Duyệt nội bộ:** xem bản thiết kế/moodboard. Bấm **Ghim ghi chú lên ảnh** rồi chọn vị trí, nhập ghi chú. Đánh dấu mọi ghi chú đã xử lý, tích đủ checklist → **Chuyển khách hàng** → xác nhận. Nhánh yêu cầu sửa cần lý do. Sau khi chuyển trạng thái, không thể duyệt lặp; đặt lại dữ liệu demo nếu muốn thử lại từ đầu.
3. **Tổng hợp phản hồi:** chọn phản hồi → **Tổng hợp bằng AI**. Xem lý do và nguồn từng gợi ý → sửa → chọn → tạo công việc → mở bảng Kanban. Ý kiến “chưa cao cấp” phải làm rõ trước khi tạo việc. Tích **Thử tình huống AI thất bại** để thử nhánh lỗi, bỏ tích để thử lại. Có nút nhập việc thủ công.
4. **Quản trị viên / Người dùng:** thêm thành viên, thử email trùng, đổi vai trò, khóa/mở khóa. Tự khóa và tự đổi vai trò tài khoản đang dùng bị chặn.
5. **Thiết lập dự án:** đổi ngưỡng cảnh báo, mẫu phiên bản, thêm/sửa/xóa nhãn. Lưu trữ **Lúa Tea**, nhập đúng tên xác nhận. Chọn Lúa Tea và quay về Trưởng nhóm: chỉ được xem, không thêm/sửa/chuyển việc.

**Công cụ demo** ở cuối thanh bên có Xuất dữ liệu JSON, trang 404/403 và Đặt lại dữ liệu mẫu. Reset chỉ xóa khóa dữ liệu của ứng dụng này sau xác nhận. Không xóa dữ liệu website khác.

## File chính

| Màn hình | HTML | Logic riêng |
|---|---|---|
| Bảng công việc | lead-task-board.html | js/pages/lead-task-board.js |
| Duyệt nội bộ | lead-internal-review.html | js/pages/lead-internal-review.js |
| Tổng hợp phản hồi AI-2 | lead-feedback-summary.html | js/pages/lead-feedback-summary.js |
| Quản lý người dùng | admin-user-management.html | js/pages/admin-user-management.js |
| Thiết lập dự án | admin-project-settings.html | js/pages/admin-project-settings.js |
| Lỗi 404/403 | 404.html | js/pages/error.js |

`index.html` chỉ là lối mở nhanh vào phần SV3, không phải Landing của SV1. Khi ghép với nhóm, giữ index.html của SV1.

- `css/base.css`: UI Kit, thanh bên, header, form, dialog và responsive.
- `css/pages/`: phong cách riêng của Lead, Admin và trang lỗi.
- `js/data.js`: dữ liệu mẫu tập trung. Có thể sửa tên dự án/việc ở đây; sau đó đặt lại dữ liệu để nạp mẫu mới.
- `js/store.js`: validation, quyền demo, CRUD và lưu LocalStorage. Mọi ghi dữ liệu đi qua lớp này.
- `js/app.js`: điều hướng, thông báo, biểu mẫu, dialog, chọn dự án và vai trò demo.
- `js/modules/ai-feedback-summarizer.js`: AI mô phỏng bằng quy tắc, có loading và lỗi.
- `assets/`: hình bao bì, moodboard, favicon SVG tự tạo.
- `docs/`: mô tả/checklist từng task, tích hợp, kiểm thử và báo cáo sử dụng AI.

## Dữ liệu và phạm vi

LocalStorage dùng khóa `creatorstudio.sv3.v1`, chứa users, projects, briefs, versions, notes, comments, tasks, proposals, tags, settings và activity. SessionStorage nhớ người dùng demo và dự án đang chọn. Nhấn F5 không xóa dữ liệu; xóa dữ liệu trình duyệt hoặc Reset sẽ xóa các thay đổi.

Đây là frontend mô phỏng dùng học tập, chưa có đăng nhập bảo mật, máy chủ, cơ sở dữ liệu chung hay AI API thật. Quyền frontend là để trình diễn luồng; không dùng cho dữ liệu thật. Ghi chú được tách khỏi comment khách trong mô hình dữ liệu, chưa có cơ chế bảo mật backend.

Chỉ gồm phần SV3; đăng nhập/đăng ký và Landing thuộc phần khác, chưa tích hợp ở đây. Quy tắc `requireReview` và `versionPattern` được lưu, cần SV2 áp dụng vào luồng tạo/nộp phiên bản khi ghép nhóm. Mộc Coffee chưa được lưu trữ vì còn công việc/brief/phiên bản chưa hoàn tất; không tự giả lập khách hàng duyệt để vượt điều kiện.

## Kiểm tra

Đã chạy 12 nhóm kiểm thử dữ liệu/AI bằng Node; kiểm tra cú pháp JS, file tham chiếu và máy chủ HTTP. Chạy lại bằng `node tests/store.test.cjs` nếu máy có Node.js.

Chưa xác minh giao diện, kéo thả và responsive bằng trình duyệt thật trong môi trường bàn giao. CSS đã có bố cục desktop/mobile; xem `docs/kiem-thu.md` để kiểm tra trên Chrome. Chưa xuất bản, tích hợp toàn nhóm, quay OBS hoặc được giảng viên duyệt.

## Cập nhật Task 5 — phần SV3

Xem `docs/TASK-05-SV3.md` để làm theo từng bước; nội dung thẻ và checklist nằm ở `docs/TASK-05-TRELLO.txt`. Đã thêm module điều hướng, chuông hoạt động, menu mobile có điều khiển bàn phím và 4 vai trò demo. Client/Designer có trang chờ ghép, chưa có màn hình nghiệp vụ của SV1/SV2. Mở `index.html` để vào đúng vai trò đã chọn. Chạy thêm `node tests/navigation.test.cjs`: 5 nhóm điều hướng.

Phiên mới dùng thêm alias `localStorage.currentUser` cho hồ sơ demo tối thiểu; SessionStorage giữ phiên theo tab. Cần thống nhất alias này với nhóm khi tích hợp.

## Gửi bài sang máy khác

Gửi nguyên `CreatorStudio-SV3-Website.zip`, không gửi riêng HTML. Người nhận giải nén toàn bộ rồi mở `BAT-DAU.html`. Có thể chạy `python check_bundle.py` để kiểm tra đủ file trước khi mở. Máy chủ Python cũng tự kiểm tra trước khi chạy.

Thay đổi trong LocalStorage nằm ở trình duyệt máy đang dùng, không tự đi theo ZIP. Người nhận bắt đầu bằng dữ liệu mẫu. Có thể xuất JSON làm bản sao lưu/minh chứng; bản này chưa có chức năng nhập JSON.


## Phiên bản rà soát SV3 — 06–07/10/2026 (v2)

Bản này tiếp nối bộ ZIP ngày 05/10, giữ nguyên tên 6 HTML để bảo toàn đường dẫn; bản ZIP bàn giao có tên mới để giữ bản cũ.

- Bảng trạng thái hiện hành: `docs/TIEN-DO-SV3.md`.
- Kết quả kiểm thử đợt này: `docs/QA-SV3-2026-10-06.md`.
- Các biên bản 02/10 và 05/10 bên trên là lịch sử; không phải bằng chứng QA trình duyệt của bản mới.
- Chỉ chỉnh phần SV3. Chưa ghép các màn hình SV1/SV2, chưa thay thế Landing của SV1.
- Còn cần bản phân công 29 task đọc được để xác định đầy đủ task chung tiếp theo. Không tự gán mã TASK-06 từ danh sách cũ.

## Tiếp nối GitHub — 09/10/2026

Bản hiện hành trên nhánh SV3; xem docs/TIEN-DO-SV3.md và docs/TASK-16-TRELLO.txt. Mã TASK-16 là Internal Review; TASK-17 là Feedback Summary. Không còn yêu cầu gửi lại bảng 29 task đã khôi phục. Các ghi chú thiếu bảng ở biên bản cũ là lịch sử.
