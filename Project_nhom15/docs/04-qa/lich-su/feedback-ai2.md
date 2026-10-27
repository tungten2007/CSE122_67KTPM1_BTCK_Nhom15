> Minh chứng lịch sử theo ngày trong tài liệu; không xác nhận bản hiện tại đã chạy lại.

# TASK-17 — Tổng hợp phản hồi và AI-2

Ngày12/10/2026 · Phụ trách SV3 · QA chức năng Chromium153: **16 nhóm PASS**, desktop1440×1000/mobile390×844. Không có lỗi Console/pageerror/tài nguyên HTTP. AI là mô phỏng bằng quy tắc, không gọi LLM/API hoặc gửi nội dung ra ngoài.

## Đã thực hiện

- Giữ luồng nhập/chọn phản hồi → loading → đề xuất có nguồn/lý do → sửa/bỏ → xác nhận tạo task.
- Sửa form người phụ trách không hợp lệ: yêu cầu chọn lại rõ ràng, không tự đổi người.
- Phản hồi hiển thị đúng phiên bản nguồn; khi có nhiều phiên bản, nhập phản hồi yêu cầu chọn phiên bản.
- Đổi dự án sẽ đặt lại lựa chọn; không giữ nhầm số lượng hoặc ID cũ.

## Checklist và QA

- [x] Đầu vào/empty và chặn tổng hợp khi không chọn phản hồi.
- [x] Loading khóa thao tác; lỗi mô phỏng, thử lại và nhập thủ công hoạt động.
- [x] Đề xuất giữ nguyên nguồn/lý do; phản hồi mơ hồ cần làm rõ trước khi tạo task.
- [x] Sửa đề xuất giữ title/description/assignee/due/source khi chuyển Kanban.
- [x] Bỏ riêng/bỏ toàn bộ giữ nguồn; cho phép tổng hợp lại phù hợp.
- [x] Chặn tạo task trùng và tái xử lý nguồn đã có task.
- [x] Lưu sau reload, link tới bảng công việc đúng.
- [x] Các phiên bản được gắn đúng; dự án rỗng và đã lưu trữ được xử lý.
- [x] Vai trò khác không được truy cập.
- [x] Desktop/mobile: bố cục, button, form, card, font, spacing và không tràn ngang đã xem.

Minh chứng: [result.json](feedback-ai2/result.json), desktop (tài liệu cũ đã bỏ; xem [chỉ mục hiện hành](../README.md)), mobile (tài liệu cũ đã bỏ; xem [chỉ mục hiện hành](../README.md)), [AI error](feedback-ai2/task17-ai-error.png). Script: `tests/browser-task17.cjs`; cần Playwright/Chromium, máy chủ nội bộ tự mở và đóng. Regression nguồn: `tests/task17-page.test.cjs`.

Không thay QA Figma TASK03/04, tích hợp SV1/SV2 TASK27 hoặc OBS/review/merge TASK29. Ảnh là screenshot website, không phải export Figma.

QA độc lập: source/kết quả và đủ3ảnh đã review, PASS. Trạng thái triển khai: 🟢 Hoàn thành. Tiếp theo TASK19.
