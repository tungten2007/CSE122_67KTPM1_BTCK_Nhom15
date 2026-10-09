# Tiến độ SV3 — cập nhật 09/10/2026

Dùng mã đánh số đơn của bảng 29 task đã khôi phục, không dùng bản 24 task cũ. TASK-06 thuộc SV1; TASK-18 Brief Template thuộc SV2 theo inventory 17 màn hình mới. README gốc và hai tài liệu Word của repo còn nội dung phân công/đề tài cũ; giữ nguyên để nhóm đối chiếu, không lấy chúng thay inventory mới.

| Task | Nội dung | Người phụ trách | Trạng thái | File | Ghi chú |
|---|---|---|---|---|---|
| TASK-05 / CORE-03 | Khung điều hướng và chuyển vai trò demo | SV3 (phần được giao) | 🟠 Chờ duyệt | js/app.js; js/modules/navigation.js | Logic đã QA; chưa ghép Client/Designer |
| TASK-15 / SV3-01 | Bảng công việc, duyệt brief | SV3 | 🟠 Chờ duyệt | lead-task-board.html | Code và QA tự động có; kéo thả/browser chưa xác minh |
| TASK-16 / SV3-02 | Duyệt nội bộ | SV3 | 🟠 Chờ duyệt | lead-internal-review.html | Chọn phiên bản theo dự án, ưu tiên Internal Review; 7 bộ test PASS; chưa QA browser |
| TASK-17 / SV3-03 | Tổng hợp phản hồi AI-2 | SV3 | 🟠 Chờ duyệt | lead-feedback-summary.html | AI mô phỏng, có kiểm thử logic; chưa QA browser |
| TASK-19 / SV3-04 | Quản lý người dùng | SV3 | 🟠 Chờ duyệt | admin-user-management.html | Logic đã kiểm thử; chưa duyệt nhóm |
| TASK-20 / SV3-05 | Thiết lập và lưu trữ | SV3 | 🟠 Chờ duyệt | admin-project-settings.html | Quy tắc cần SV2 áp dụng khi ghép |
| TASK-21 | Responsive + kiểm thử Lead/Admin | SV3 | 🟡 Đang làm | css/; docs/QA-SV3-2026-10-06.md | Có CSS và rà source; thiếu trình duyệt khả dụng để xác nhận |
| TASK-26 / SV3-06 | Lỗi 403/404 | SV3 | 🟠 Chờ duyệt | 404.html | Logic/HTTP đạt; chưa QA browser |
| TASK-27 (phần SV3) | Kiểm thử tích hợp | SV3 phối hợp nhóm | ⬜ Chưa làm | docs/tich-hop.md | Chờ code và dữ liệu SV1/SV2 |
| TASK-28 (phần SV3) | README, tài liệu, kiểm kê | SV3 phối hợp nhóm | 🟡 Đang làm | README.md; docs/ | Có tài liệu SV3; chưa đồng bộ toàn nhóm |
| TASK-29 (phần SV3) | OBS, minh chứng, phát hành | SV3 phối hợp nhóm | ⬜ Chưa làm | — | Chưa có OBS/review/phát hành; không giả nhận hoàn thành |

Các task thiết lập và thiết kế trước đó có tài sản trong lịch sử; chưa có xác nhận duyệt mới. Bảng tập trung phần triển khai và bàn giao đang xử lý, không coi checkbox kế hoạch là bằng chứng hoàn thành.

## Nguồn và phạm vi

- Yêu cầu BTL-30 và 3 ảnh hướng dẫn người dùng gửi lại đã đọc. Ảnh tư vấn tâm lý là ví dụ tổ chức bài; không thay chủ đề CreatorStudio.
- Repo xác định: tungten2007/CSE122_67KTPM1_BTCK_Nhom15. Bản SV3 được đưa vào Project_nhom15, giữ đường dẫn nội bộ và các file cũ.
- index.html tại đây chỉ mở demo SV3, không thay Landing/Login của SV1. Client/Designer có trang chờ ghép.
- QA Node/DOM giả lập không thay browser: native dialog, kéo thả, console và responsive còn cần xác minh. Không coi code hoàn chỉnh là đủ điều kiện nộp.
- Trello chưa được chỉnh trực tiếp. Dùng TASK-16-TRELLO.txt để cập nhật thẻ. GitHub review và OBS vẫn do người thực hiện/nhóm xác nhận.
