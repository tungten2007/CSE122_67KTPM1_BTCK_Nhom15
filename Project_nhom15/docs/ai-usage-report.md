# Báo cáo sử dụng AI — Bản nháp do trợ lý tạo

- Yêu cầu: người dùng chọn chuyển từ thiết kế Figma sang làm trực tiếp website, chỉ phần SV3.
- Công cụ: Codex hỗ trợ tạo HTML/CSS/JavaScript thuần, SVG minh họa, dữ liệu mẫu, kiểm thử và tài liệu.
- Nguồn: bộ thiết kế SV3 và UI Kit đã bàn giao, bảng phân công 17 màn hình, TASK-SV3-01 đến TASK-SV3-06 trong kế hoạch hiện hành.
- Phần sinh tự động: toàn bộ bản frontend độc lập trong ZIP này và bộ kiểm thử Node. Chưa có xác nhận sinh viên đã sửa hoặc tự trình bày được.
- AI-2 trong sản phẩm: mô phỏng bằng quy tắc JavaScript, không gọi LLM API, không dùng API key. Có đầu vào, xử lý, kết quả, lý do/nguồn, sửa, bỏ, xác nhận, lỗi và nhập thủ công.
- Lỗi/rủi ro đã xử lý: bỏ trống hoặc trùng email; tự khóa Admin; lưu khi LocalStorage đầy; chuyển việc từ phản hồi mơ hồ; tạo lặp cùng đề xuất; dự án lưu trữ vẫn bị gọi hàm ghi; kiểm tra lại dữ liệu lưu trước giao dịch.
- Kiểm chứng: 12 nhóm nghiệp vụ bằng Node, cú pháp JS, tham chiếu file và máy chủ HTTP. Trình duyệt kiểm thử chưa khả dụng; chưa có bằng chứng chạy responsive hoặc kéo thả trực tiếp.
- Sinh viên bổ sung sau khi học/chạy: phần tự chỉnh sửa, lỗi thực tế trên máy, ảnh/video minh chứng và điều đã hiểu.

Gợi ý học để trình bày: đọc `data.js` trước, theo hành động Tạo công việc ở page JS đến `Store.saveTask`, xem `localStorage.setItem`, rồi theo luồng AI-2 đến `Store.convert`.

Cập nhật Task 5: Codex tách module navigation, thêm phiên 4 vai trò, trang chờ ghép, chuông, xử lý menu và 5 nhóm kiểm thử. Chưa xác nhận sinh viên đã tự chỉnh sửa hoặc kiểm tra UI.


## Đợt rà soát ngày 06/10/2026

Theo yêu cầu người dùng, trợ lý phân công các agent Planning, UI/UX, Frontend, QA và Progress. Đã đọc bộ ZIP, bảng kiểm kê 17 màn hình và yêu cầu môn học truy cập được; file kế hoạch chi tiết 29 task tìm thấy nhưng không tải được. Các agent kiểm tra và sửa lỗi của bản hiện có, không xây màn hình SV1/SV2. Bằng chứng và giới hạn kiểm thử được ghi trong `QA-SV3-2026-10-06.md`; trạng thái thực tế nằm ở `TIEN-DO-SV3.md`. Chưa có xác nhận sinh viên đã tự sửa, hiểu toàn bộ code, quay OBS hoặc được duyệt. AI-2 vẫn là mô phỏng theo quy tắc.

## 09/10/2026 — TASK-16 và GitHub
Trợ lý đọc đề cùng ba ảnh hướng dẫn, kiểm tra repo hiện có; AI bổ sung bộ chọn phiên bản và validation review action. Có kiểm thử độc lập bằng Node/DOM giả lập, chưa browser. Mã được chuẩn bị trên nhánh riêng; không giả lịch sử sinh viên hay video OBS. Phần sinh viên tự sửa/hiểu vẫn chờ xác nhận.
