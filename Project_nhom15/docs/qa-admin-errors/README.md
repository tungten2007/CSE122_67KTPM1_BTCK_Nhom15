# QA TASK-19, TASK-20, TASK-26 — 12/10/2026

PASS: 12 nhóm kiểm tra Chromium 153.0.8010.0, desktop 1440×1000 và mobile 390×844. Xem result.json và 8 ảnh PNG. Agent QA đã xem độc lập toàn bộ ảnh; không thấy chồng chữ, tràn ngang hoặc lỗi quan trọng ở các trạng thái được chụp.

- TASK-19: thêm/sửa, email/required/trùng, phân trang, tìm/lọc/empty, đổi vai trò, khóa/mở khóa, chặn tự khóa/đổi vai trò, giữ dữ liệu sau tải lại, form mobile.
- TASK-20: quy tắc và validation, preview mã phiên bản, lưu sau tải lại, thêm/sửa/xóa nhãn, nhãn trùng/đang dùng, điều kiện lưu trữ, xác nhận tên, giữ chỉ xem sau tải lại, chặn sửa nhãn thuộc dự án lưu trữ.
- TASK-26: trang 403/404, sai quyền, nút về đúng 4 vai trò; desktop/mobile. server-routing.json ghi kiểm tra riêng Handler thật trong server.py: URL lạ 302 về /404.html; tài nguyên JS thiếu giữ HTTP404.
- Không lỗi Console, JavaScript hoặc HTTP ngoài tình huống tài nguyên thiếu được chủ động kiểm tra riêng.

Ảnh mobile là trạng thái sau thao tác QA, nên dữ liệu có thể khác seed desktop. Script chờ transition sidebar kết thúc trước khi chụp. Không sửa mã ứng dụng, kho dữ liệu hay phần thành viên khác. Không chứng nhận tích hợp toàn nhóm, Figma, OBS hoặc phê duyệt giảng viên.
