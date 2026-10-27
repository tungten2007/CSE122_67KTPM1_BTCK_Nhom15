> Khôi phục từ bản sao lưu ngày 25/10/2026. Nội dung dự thảo/lịch sử cần đối chiếu; số liệu hiện hành ưu tiên README gốc và evidence-index. Chưa xác nhận link Figma/Trello/deploy hoặc kết quả chưa chạy lại.

# Kịch bản OBS — SV3 (Lead, Admin, lỗi)

Mỗi mục là một video 2–4 phút, quay đúng người phụ trách. Đọc kèm [quy trình 8 bước](../obs-plan.md#4-cấu-trúc-8-bước-cho-mỗi-video). Trước khi quay: đăng nhập Lead/Admin, chọn dự án có brief/task/phiên bản; mở Figma frame tương ứng (6 màn SV3 đã có frame desktop/mobile nhưng còn lỗi QA).

> **Nhánh/commit:** phải ghi theo lần quay thật. Kịch bản hiện tham chiếu `feature/task29-final-evidence` tại `efd67fb`; nếu nhánh hoặc commit thay đổi trước khi quay, cập nhật lại và đọc đúng trong video.

---

## 1. Task Board — TASK-15

**Thời lượng:** 4 phút. **Nhánh:** `feature/task29-final-evidence`. **Tệp:** `html/sv3/lead-task-board.html`, `js/sv3/pages/lead-task-board.js`.

1. Giới thiệu: họ tên, MSSV, SV3, TASK-15.
2. Figma: mở frame `71-10` (desktop) và `71-397` (mobile); nói rõ lỗi mobile đã ghi trong [figma-audit.md](../../01-gatekeeper/figma-audit.md).
3. HTML: chỉ `main`, thanh công cụ, `.kanban`, các cột theo `stateLabel`, dialog công việc.
4. JS: `fields()` tạo input có `required minlength="3" maxlength="120"`; `edit()` gọi `Store.saveTask`; `renderContent()` lọc theo `title + description`, người phụ trách, ưu tiên; `Store.moveTask` cho select và drag/drop; `openBrief()` gọi `Store.brief` approve/return.
5. Sửa live: đổi `maxlength="120"` → `"80"`, thử tiêu đề dài, chỉ giới hạn mới; hoàn lại.
6. Chạy: tạo task, sửa, kéo thả, đổi trạng thái bằng bàn phím, duyệt brief, F5; thu 375px.
7. Commit/push + hash.
8. Kết: TASK-15, nhánh, commit; chỉ QA `docs/04-qa/lich-su/TASK-15-16-QA.md`.

**Câu hỏi gợi ý:** Vì sao mobile dùng select thay kéo thả? Nếu `Store.moveTask` báo lỗi thì UI khôi phục thế nào?

---

## 2. Internal Review — TASK-16

**Thời lượng:** 4 phút. **Nhánh:** `feature/task29-final-evidence`. **Tệp:** `html/sv3/lead-internal-review.html`, `js/sv3/pages/lead-internal-review.js`.

1. Giới thiệu: TASK-16, duyệt nội bộ.
2. Figma: frame `71-102` / `71-446`; nêu lỗi đã biết.
3. HTML: chỉ vùng ảnh, ghim ghi chú, checklist, nút yêu cầu sửa/chuyển khách.
4. JS: `noteForm()` tạo ghi chú tối thiểu 3 ký tự, tọa độ `x/y`; `Store.note` lưu; `Store.reviewChecks` lưu 2 checkbox; `Store.review` chặn chuyển khách nếu còn ghi chú chưa xử lý hoặc thiếu checklist; trạng thái read-only theo phiên bản.
5. Sửa live: đổi ghi chú tối thiểu 3 → 5 ký tự, thử 4 ký tự, chỉ lỗi; hoàn lại.
6. Chạy: ghim ghi chú, sửa, đánh dấu xử lý, tick checklist, thử chuyển khách khi thiếu, chuyển khi đủ; F5.
7. Commit/push + hash.
8. Kết: TASK-16, nhánh, commit; chỉ QA `docs/04-qa/lich-su/TASK-15-16-QA.md`.

**Câu hỏi gợi ý:** Vì sao ghi chú nội bộ không lẫn với comment khách? Điều kiện chuyển khách nằm ở đâu?

---

## 3. Feedback Summary + AI-2 — TASK-17

**Thời lượng:** 4 phút. **Nhánh:** `feature/task29-final-evidence`. **Tệp:** `html/sv3/lead-feedback-summary.html`, `js/sv3/pages/lead-feedback-summary.js`, `js/sv3/modules/ai-feedback-summarizer.js`.

1. Giới thiệu: TASK-17, AI-2.
2. Figma: frame `71-179` / `71-511`; nêu lỗi đã biết.
3. HTML: chỉ danh sách phản hồi, nút tổng hợp, danh sách proposal, nút tạo việc.
4. JS: `generate()` yêu cầu chọn ít nhất một phản hồi, chặn nếu còn proposal chưa xử lý; gọi `FeedbackAI.generate(comments, designers, simulateFailure)` chờ 1100 ms; `Store.proposals` lưu; proposal có `reason`, `sourceIds`, `ambiguous`; `Store.convert` tạo task.
5. Sửa live: đổi ngưỡng “mơ hồ” hoặc nhãn ưu tiên trong module, tạo lại và quan sát; hoàn lại.
6. Chạy: chọn 2 phản hồi, tổng hợp, xem lý do/nguồn, sửa, bỏ, làm rõ phản hồi mơ hồ, tạo task, mở bảng; bật “AI thất bại”, thử lại; F5.
7. Commit/push + hash.
8. Kết: TASK-17, nhánh, commit; nói rõ AI-2 mô phỏng bằng quy tắc.

**Câu hỏi gợi ý:** Vì sao phải giữ `sourceIds`? Nếu AI thất bại thì người dùng có đường lui nào?

---

## 4. User Management — TASK-19

**Thời lượng:** 3 phút. **Nhánh:** `feature/task29-final-evidence`. **Tệp:** `html/sv3/admin-user-management.html`, `js/sv3/pages/admin-user-management.js`.

1. Giới thiệu: TASK-19, quản lý người dùng.
2. Figma: frame `71-232` / `71-552`.
3. HTML: chỉ bảng người dùng, tìm kiếm, 2 bộ lọc, phân trang, dialog.
4. JS: `edit()` dùng `Store.saveUser`, chặn đổi vai trò chính mình; `renderContent()` lọc `name + email`, `role`, `active`, phân trang `pageSize`; `Store.toggleUser` chặn tự khóa và Admin cuối.
5. Sửa live: đổi `pageSize` 6 → 4, quan sát số trang; hoàn lại.
6. Chạy: thêm user, sửa, khóa/mở, thử khóa Admin cuối, tìm/lọc, phân trang; thu 375px.
7. Commit/push + hash.
8. Kết: TASK-19, nhánh, commit; chỉ QA `docs/04-qa/ket-qua/qa-admin-errors`.

**Câu hỏi gợi ý:** Vì sao không cho tự khóa? Nếu xóa user đang có task thì cần kiểm tra gì?

---

## 5. Project Settings — TASK-20

**Thời lượng:** 4 phút. **Nhánh:** `feature/task29-final-evidence`. **Tệp:** `html/sv3/admin-project-settings.html`, `js/sv3/pages/admin-project-settings.js`.

1. Giới thiệu: TASK-20, thiết lập dự án.
2. Figma: frame `71-308` / `71-617`.
3. HTML: chỉ form quy tắc, danh sách nhãn, vùng lưu trữ.
4. JS: submit kiểm tra `warningDays` 0–30, `versionPattern` có `{project}`, `{asset}`, `{number}`; `Store.settings` lưu; `Store.tag` add/edit/delete, chặn xóa nhãn đang dùng; `Store.archive` kiểm tra task/brief/version và yêu cầu nhập đúng tên dự án.
5. Sửa live: đổi `max="30"` → `max="60"` cho `warningDays`, thử 45, chỉ hành vi mới; hoàn lại.
6. Chạy: lưu quy tắc, thêm/sửa/xóa nhãn, thử lưu trữ khi còn task, lưu trữ đúng điều kiện, mở lại xem read-only; F5.
7. Commit/push + hash.
8. Kết: TASK-20, nhánh, commit; chỉ QA `docs/04-qa/ket-qua/qa-admin-errors`.

**Câu hỏi gợi ý:** Vì sao phải nhập tên dự án khi lưu trữ? `versionPattern` được dùng ở đâu?

---

## 6. Lỗi 403/404 — TASK-26

**Thời lượng:** 2–3 phút. **Nhánh:** `feature/task29-final-evidence`. **Tệp:** `html/sv3/404.html`, `js/sv3/pages/error.js`.

1. Giới thiệu: TASK-26, trang lỗi dùng chung.
2. Figma: frame `71-365` / `71-664`.
3. HTML: chỉ `main`, `.error-page`, nút quay lại.
4. JS: `new URLSearchParams(location.search).get('code') === '403'`; đổi tiêu đề/mô tả/icon; `A.home()` chọn trang theo vai trò; không đọc dữ liệu dự án.
5. Sửa live: đổi thông điệp 404 hoặc thêm mã lỗi vào `document.title`, reload; hoàn lại.
6. Chạy: mở URL lạ, mở `?code=403`, đổi vai trò rồi quay lại; thu 375px.
7. Commit/push + hash.
8. Kết: TASK-26, nhánh, commit; chỉ QA `docs/04-qa/ket-qua/qa-admin-errors`.

**Câu hỏi gợi ý:** Vì sao 403 không được lộ dữ liệu? Nếu chưa đăng nhập thì `A.home()` đi đâu?
