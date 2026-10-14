# TASK-15 và TASK-16 — QA ngày 12/10/2026

## Phạm vi và kết quả

Hai task thuộc SV3: Task Board/duyệt brief và Internal Review. Bản frontend độc lập đã thực hiện yêu cầu chức năng, sửa lỗi phát hiện và kiểm tra trên Chromium 153.0.8010.0 ở desktop 1440×1000 và mobile 390×844. QA chức năng tự động trên trình duyệt: **14 nhóm PASS**, không có lỗi Console, pageerror hoặc tài nguyên HTTP. QA Node/DOM giả lập: **8 file test PASS**, gồm 15 nhóm nghiệp vụ Store. Kiểm tra đường dẫn/bộ file PASS.

Kết quả này chỉ áp dụng hai màn hình triển khai. Không thay kết quả duyệt Figma ở TASK-03/04, tích hợp các thành viên ở TASK-27 hoặc OBS/review/nộp bài ở TASK-29. Chưa merge PR hoặc xác nhận thay giảng viên/thành viên nhóm.

## Lỗi đã sửa

- Task có người phụ trách bị khóa/không còn vai trò hợp lệ: form bắt buộc chọn người mới; không âm thầm chọn người đầu danh sách.
- Đổi trạng thái trên mobile: chuyển sang cột đích để giữ thẻ và focus; lưu thất bại khôi phục trạng thái chọn.
- Ghim ghi chú tại tọa độ 0: giữ tọa độ biên rồi giới hạn trong 2–98%; không nhảy về giữa ảnh.
- Action brief không hợp lệ: từ chối trước khi thay dữ liệu; không mặc định coi là duyệt.

## TASK-15 — Bảng công việc và duyệt brief

- [x] Bốn cột Kanban, số lượng và tiến độ.
- [x] Tạo/sửa/phân công công việc và lưu sau tải lại.
- [x] Tìm kiếm/lọc, giữ focus khi render lại.
- [x] Kéo thả HTML5 trên desktop.
- [x] Đổi trạng thái bằng select trên mobile, giữ cột đích và focus.
- [x] Duyệt brief tạo đúng một công việc; chặn duyệt lặp.
- [x] Yêu cầu bổ sung có lý do, không tạo công việc.
- [x] Form người phụ trách không hợp lệ yêu cầu chọn lại.
- [x] Menu mobile, Escape, dự án lưu trữ và quyền truy cập.
- [x] Rà ảnh desktop/mobile: header, navigation, nội dung, button, card, font, khoảng cách, không tràn ngang.

## TASK-16 — Duyệt nội bộ

- [x] Chọn đúng phiên bản theo dự án, giữ lựa chọn; trạng thái rỗng.
- [x] Chuyển tab thiết kế/moodboard; giữ đúng tỷ lệ ảnh.
- [x] Ghim đúng vị trí, thêm/sửa ghi chú và giữ sau tải lại.
- [x] Đánh dấu ghi chú đã xử lý và lưu checklist.
- [x] Chặn chuyển khách khi thiếu checklist/còn ghi chú.
- [x] Chuyển sang Client Review có xác nhận; thao tác trở thành chỉ xem.
- [x] Yêu cầu sửa có lý do; trạng thái Changes Requested.
- [x] Phiên bản Approved chỉ xem, dự án lưu trữ và sai vai trò bị chặn.
- [x] Mobile thêm ghi chú bằng form, dialog hoạt động, không tràn ngang.
- [x] Rà ảnh desktop/mobile: header, navigation, nội dung, button, form, card, font và khoảng cách.

## Minh chứng

- [Kết quả chạy Chromium](qa-task15-16/result.json)
- [Task 15 desktop](qa-task15-16/task15-desktop.png)
- [Task 15 mobile](qa-task15-16/task15-mobile.png)
- [Task 16 desktop](qa-task15-16/task16-desktop.png)
- [Task 16 mobile](qa-task15-16/task16-mobile.png)

Script tái chạy: `tests/browser-task15-16.cjs`. Cần Playwright và Chromium trên máy kiểm thử; đây là công cụ QA, không phải thư viện website. Script tự mở máy chủ HTTP nội bộ, dùng dữ liệu demo trong browser context riêng và đóng khi xong. Chạy `node tests/browser-task15-16.cjs`; có thể đặt `CHROMIUM_EXECUTABLE_PATH` khi dùng Chromium cài ngoài Playwright.

Các PNG là ảnh chụp website Chromium, không phải bản xuất Figma. Figma mobile vẫn có lỗi độc lập đã ghi trong `SV3-DESIGN-QA.md`.

Review QA độc lập: đã đọc script/kết quả và xem đủ4 PNG; TASK15 PASS, TASK16 PASS, không thấy lỗi quan trọng. Chưa tuyên bố kiểm tra mọi trình duyệt, mọi thao tác Tab/Shift+Tab hoặc toàn bộ breakpoint; rà tổng thể tiếp tục ở TASK21.
