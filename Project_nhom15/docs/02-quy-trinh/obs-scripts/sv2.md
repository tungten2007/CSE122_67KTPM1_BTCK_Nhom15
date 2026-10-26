> Khôi phục từ bản sao lưu ngày 25/10/2026. Nội dung dự thảo/lịch sử cần đối chiếu; số liệu hiện hành ưu tiên README gốc và evidence-index. Chưa xác nhận link Figma/Trello/deploy hoặc kết quả chưa chạy lại.

# Kịch bản OBS — SV2 (Designer, Template, Profile, Notifications)

Mỗi mục là một video 2–4 phút, quay đúng người phụ trách. Đọc kèm [quy trình 8 bước](../obs-plan.md#4-cấu-trúc-8-bước-cho-mỗi-video). Trước khi quay: đăng nhập đúng vai trò, chọn dự án có task/phiên bản, reset dữ liệu nếu cần.

---

## 1. Designer Dashboard — TASK-10

**Thời lượng:** 3 phút. **Nhánh:** `feature/sv2-creatorstudio-review`. **Tệp:** `html/sv2/designer-dashboard.html`, `js/sv2/app-sv2.js`.

1. Giới thiệu: họ tên, MSSV, SV2, TASK-10.
2. Figma: chưa có frame riêng cho màn này; chỉ UI Kit và dashboard hiện tại.
3. HTML: chỉ sidebar, `#main`, vùng KPI, danh sách task, các nút chế độ trạng thái.
4. JS: `App.init('dashboard', renderDashboard)`; `renderDashboardContent()` lọc task theo `projectId`, `assignee === user.id`; tính `totalPending`, `totalUrgent`, `inReviewVersionsCount`; `currentStateMode` đổi Normal/Loading/Empty/Urgent; select trạng thái gọi `Store.moveTask`.
5. Sửa live: đổi ngưỡng “gấp” từ `warningDays` sang `warningDays + 1`, quan sát badge; hoàn lại.
6. Chạy: đổi trạng thái một task, F5; bật Loading/Empty/Urgent; thu 375px.
7. Commit/push + hash.
8. Kết: TASK-10, nhánh, commit; chỉ QA `docs/04-qa/ket-qua/qa-task27-v1`.

**Câu hỏi gợi ý:** Vì sao phải `App.preserveFocus`? Task của người khác có hiện không?

---

## 2. Moodboard + AI-3 — TASK-11

**Thời lượng:** 4 phút. **Nhánh:** `feature/sv2-creatorstudio-review`. **Tệp:** `html/sv2/designer-moodboard.html`, `js/sv2/modules/ai-mood-assistant.js`.

1. Giới thiệu: TASK-11, AI-3, vai trò Designer.
2. Figma: chưa có frame riêng; chỉ ra màn moodboard hiện tại.
3. HTML: chỉ khu moodboard, nút mở AI, dialog `#dialog`.
4. JS: `openAIMoodAssistantModal()` tạo form input + checkbox “mô phỏng thất bại”; `AIMoodAssistant.generateSuggestion(prompt, shouldFail)` chờ 1400 ms, so khớp `KNOWLEDGE_BASE`; kết quả có theme, palette HEX, keywords, explanation; Accept gọi `Store.applyAIPalette`; Reject đóng; nhập tay vẫn dùng được.
5. Sửa live: đổi ngưỡng mô tả tối thiểu 5 → 8 ký tự trong module, thử mô tả 6 ký tự, chỉ lỗi; hoàn lại.
6. Chạy: tạo gợi ý thành công, áp dụng palette; bật checkbox thất bại, thử lại; thêm/xóa thẻ moodboard; F5.
7. Commit/push + hash.
8. Kết: TASK-11, nhánh, commit; nói rõ AI-3 là mô phỏng, không gọi API.

**Câu hỏi gợi ý:** Vì sao palette phải có `role`? Nếu không khớp `KNOWLEDGE_BASE` thì chuyện gì xảy ra?

---

## 3. Version Management — TASK-12

**Thời lượng:** 4 phút. **Nhánh:** `feature/sv2-creatorstudio-review`. **Tệp:** `html/sv2/designer-version-management.html`, `js/shared/store.js`.

1. Giới thiệu: TASK-12, vòng đời phiên bản.
2. Figma: chưa có frame riêng; đối chiếu UI hiện tại.
3. HTML: chỉ timeline phiên bản, bộ lọc trạng thái, dialog tạo phiên bản, vùng ảnh.
4. JS: submit kiểm tra `file.type` PNG/JPEG/WebP và `file.size <= 1 MB`; `FileReader.readAsDataURL()`; `Store.computeVersionCode()`; `Store.saveVersion()`, `submitVersionForReview()`, `deleteVersion()` chỉ Draft, `archiveVersion()`.
5. Sửa live: đổi giới hạn 1 MB → 2 MB trong điều kiện upload, thử ảnh 1.5 MB; hoàn lại.
6. Chạy: tạo Draft có ảnh, nộp duyệt, thử xóa phiên bản không phải Draft, lọc trạng thái; F5.
7. Commit/push + hash.
8. Kết: TASK-12, nhánh, commit; chỉ QA `docs/05-nhom/nhiem-vu/TASK-27-INTEGRATION-v1.md`.

**Câu hỏi gợi ý:** Vì sao chỉ xóa Draft? `FileReader` trả về dữ liệu gì và lưu ở đâu?

---

## 4. Brief Template Management — TASK-18

**Thời lượng:** 3 phút. **Nhánh:** `feature/sv2-creatorstudio-review`. **Tệp:** `html/sv2/admin-brief-template-management.html`, `js/sv2/app-sv2.js`, `js/shared/store.js`.

1. Giới thiệu: TASK-18, Admin quản lý mẫu brief.
2. Figma: chưa có frame riêng.
3. HTML: chỉ danh sách mẫu, form thêm/sửa, nút bật/tắt.
4. JS: `renderTemplateManagementContent()` đọc `data.briefTemplates`; `Store.saveBriefTemplate()` kiểm tra tên ≥ 3, prompt ≥ 10; `Store.toggleBriefTemplate()` đổi trạng thái; `Store.deleteBriefTemplate()` chỉ xóa mẫu `Inactive` và chặn mẫu đang dùng; có empty state và confirm xóa.
5. Sửa live: đổi tên tối thiểu 3 → 5 ký tự trong Store/HTML, thử tên 4 ký tự, chỉ lỗi; hoàn lại.
6. Chạy: thêm mẫu, sửa prompt, lọc/tìm, tắt mẫu rồi xóa; mở Client Brief để thấy AI-1 dùng mẫu Active; thu 375px.
7. Commit/push + hash.
8. Kết: TASK-18, nhánh, commit; nói rõ AI-1 đọc mẫu Active và minh chứng bằng `tests/browser-ai1-template.cjs` (5/5 check).

**Câu hỏi gợi ý:** Vì sao mẫu brief phải có prompt? Nếu xóa mẫu đang được dùng thì cần chặn gì?

---

## 5. Profile — TASK-24

**Thời lượng:** 3 phút. **Nhánh:** `feature/sv2-creatorstudio-review`. **Tệp:** `html/sv2/profile.html`, `js/sv2/app-sv2.js`, `js/shared/store.js`.

1. Giới thiệu: TASK-24, hồ sơ người dùng.
2. Figma: chưa có frame riêng.
3. HTML: chỉ form thông tin, form đổi mật khẩu, thống kê cá nhân.
4. JS: `renderProfileContent()` tính task/phiên bản/dự án của user; submit gọi `Store.updateProfile`; đổi mật khẩu kiểm tra mật khẩu hiện tại và xác nhận; tài khoản bị khóa chỉ đọc.
5. Sửa live: đổi mật khẩu tối thiểu 6 → 8 ký tự trong form và Store, thử 7 ký tự, chỉ lỗi; hoàn lại.
6. Chạy: sửa tên, đổi mật khẩu, đăng xuất/đăng nhập lại; thử tài khoản bị khóa; thu 375px.
7. Commit/push + hash.
8. Kết: TASK-24, nhánh, commit; chỉ QA `docs/04-qa/ket-qua/qa-final-v5`.

**Câu hỏi gợi ý:** Vì sao phải nhập mật khẩu hiện tại? Dữ liệu hồ sơ lưu ở đâu?

---

## 6. Notifications — TASK-25

**Thời lượng:** 3 phút. **Nhánh:** `feature/sv2-creatorstudio-review`. **Tệp:** `html/sv2/notifications.html`, `js/sv2/app-sv2.js`, `js/shared/store.js`.

1. Giới thiệu: TASK-25, thông báo.
2. Figma: chưa có frame riêng.
3. HTML: chỉ tab lọc, danh sách thẻ, nút đánh dấu tất cả, empty state.
4. JS: `renderNotificationsContent()` lọc theo `userId` và tab All/Unread/loại; `Store.markNotification`, `Store.markAllNotifications`, `Store.deleteNotification`, `Store.clearAllNotifications`; badge chưa đọc.
5. Sửa live: đổi số lượng thông báo hiển thị hoặc nhãn tab, reload; kiểm tra badge.
6. Chạy: mở một thông báo, đánh dấu đã đọc/chưa đọc, xóa, mark all, lọc; thu 375px.
7. Commit/push + hash.
8. Kết: TASK-25, nhánh, commit; chỉ QA `docs/04-qa/ket-qua/qa-final-v5`.

**Câu hỏi gợi ý:** Vì sao thông báo phải lọc theo `userId`? Xóa thông báo có ảnh hưởng dữ liệu dự án không?
