# QA responsive SV3 — 12/10/2026

PASS: Chromium 153.0.8010.0, 6 màn SV3 × 4 chiều rộng (320, 768, 1024, 1440 px), chiều cao viewport 1000 px. Chi tiết 24 nhóm ở result.json; script tests/browser-responsive-sv3.cjs.

- Không tràn ngang ở trang và hộp thoại của 5 màn nghiệp vụ.
- Dialog mở, nằm trong viewport; Tab giữ focus bên trong và Escape đóng.
- Menu mobile 320px mở/đóng; nền inert khi mở, Tab vào sidebar, Escape trả về trạng thái đóng.
- 6 ảnh tablet 768px đã được QA xem độc lập: Kanban 2 cột; review/AI/settings xếp dọc; bảng users thu gọn; trang lỗi giữ bố cục. Không thấy lỗi chồng chữ hoặc che thao tác quan trọng.
- Sidebar được chờ kết thúc transition trước kiểm tra/chụp; ảnh tablet cuộn về đầu trang sau kiểm tra dialog.
- Không lỗi Console, JavaScript hoặc HTTP trong sweep.

Kết hợp QA nghiệp vụ ở qa-task15-16, qa-task17 và qa-admin-errors để đánh giá TASK-21 phần SV3. Đây không phải kiểm thử trên thiết bị vật lý hay chứng nhận mọi trình duyệt. Không bao gồm màn SV1/SV2 hoặc tích hợp toàn nhóm.
