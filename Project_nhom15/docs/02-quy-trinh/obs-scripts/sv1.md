> Khôi phục từ bản sao lưu ngày 25/10/2026. Nội dung dự thảo/lịch sử cần đối chiếu; số liệu hiện hành ưu tiên README gốc và evidence-index. Chưa xác nhận link Figma/Trello/deploy hoặc kết quả chưa chạy lại.

# Kịch bản OBS — SV1 (Client, Landing, Auth)

Mỗi mục là một video 2–4 phút, quay đúng người phụ trách. Đọc kèm [quy trình 8 bước](../obs-plan.md#4-cấu-trúc-8-bước-cho-mỗi-video). Trước khi quay: reset dữ liệu mẫu, mở đúng nhánh, chuẩn bị dự án có brief/phiên bản.

---

## 1. Project Overview — TASK-08

**Thời lượng:** 3 phút. **Nhánh:** `feature/sv1-creatorstudio`. **Tệp:** `html/sv1/client-project-overview.html`, `js/client-project-overview.js`.

1. Giới thiệu: họ tên, MSSV, SV1, TASK-08, màn Project Overview.
2. Figma: mở file chung, nói rõ **chưa có frame riêng cho màn này** (đối chiếu [figma-audit.md](../../01-gatekeeper/figma-audit.md)), chỉ UI Kit.
3. HTML: mở `html/sv1/client-project-overview.html`, chỉ `header`, `main`, vùng thống kê, `#project-list`, dialog `#project-dialog`.
4. JS: giải thích `render()` lọc `status !== "Archived"`, tìm kiếm bằng `toLocaleLowerCase("vi")` trên `name + category + description`; `openForm()` dùng `dialog.showModal()`; submit kiểm tra tên/mô tả rỗng rồi ghi qua `write()`.
5. Sửa live: thêm `aria-live="polite"` cho `#result-count` (hoặc đổi thông điệp empty state), lưu, reload, chỉ phần thay đổi.
6. Chạy: tạo dự án mới, thử tên toàn khoảng trắng, tìm kiếm, lọc trạng thái, mở brief; thu về 375px.
7. Commit/push: `git status`, `git diff`, commit `docs/obs: record project overview walkthrough` (hoặc message riêng), đọc hash.
8. Kết: nhắc lại TASK-08, nhánh, commit; chỉ file QA `docs/04-qa/ket-qua/qa-task27-v1`.

**Sửa live thay thế:** đổi nhãn empty state và giải thích vì sao cần thông điệp rõ cho người dùng.
**Câu hỏi gợi ý:** Vì sao lọc cả mô tả? Nếu mảng `projects` rỗng thì giao diện xử lý ở đâu?

---

## 2. Creative Brief + AI-1 — TASK-06

**Thời lượng:** 4 phút. **Nhánh:** `feature/sv1-creatorstudio`. **Tệp:** `html/sv1/client-creative-brief.html`, `js/client-creative-brief.js`.

1. Giới thiệu: TASK-06, AI-1, vai trò Client.
2. Figma: chưa có frame riêng; chỉ UI Kit và màn Lead duyệt brief nếu có.
3. HTML: chỉ vùng `#brief-workspace`, `#raw-idea`, 5 trường `goal/audience/message/style/deliverables`, nút Generate/Accept/Reject.
4. JS: `generate()` kiểm tra mô tả ≤ 20 ký tự, bật `aria-busy`, chờ 700 ms mô phỏng, tách câu, sinh 5 phần; `uncertainty()` cảnh báo đối tượng/ngân sách; `accept` lưu qua `update()`; `reject` xóa 5 phần nhưng giữ mô tả gốc.
5. Sửa live: đổi ngưỡng `raw.length <= 20` thành `<= 30`, nhập mô tả 25 ký tự, chỉ cảnh báo mới; hoàn lại.
6. Chạy: nhập mô tả ngắn → cảnh báo; nhập mô tả đủ → tạo; sửa một phần; chấp nhận; gửi; F5 kiểm tra brief còn.
7. Commit/push: commit thay đổi nhỏ + hash.
8. Kết: TASK-06, nhánh, commit; nói rõ **AI-1 là mô phỏng bằng quy tắc, không gọi LLM**.

**Câu hỏi gợi ý:** Vì sao phải `accepted = true` trước khi gửi? Nếu AI trả kết quả thiếu đối tượng thì UI cảnh báo ở đâu?

---

## 3. Review Versions — TASK-07

**Thời lượng:** 3–4 phút. **Nhánh:** `feature/sv1-creatorstudio`. **Tệp:** `html/sv1/client-review-versions.html`, `js/client-review-versions.js`.

1. Giới thiệu: TASK-07, màn khách duyệt phiên bản.
2. Figma: chưa có frame riêng; đối chiếu UI hiện tại với UI Kit.
3. HTML: chỉ `main`, vùng ảnh, thanh chọn phiên bản, dialog ghim phản hồi `#comment-dialog`, dialog từ chối.
4. JS: `locked()` chặn khi phiên bản đã kết thúc; click ảnh đổi tọa độ `x/y` theo `getBoundingClientRect()`; `openComment()` lưu ghim; approve đặt `versionStatus = "Approved"` và `progress = 100`; request-changes yêu cầu ít nhất một phản hồi chưa xử lý; reject yêu cầu lý do ≥ 10 ký tự.
5. Sửa live: đổi lý do từ chối tối thiểu 10 → 15 ký tự, thử lý do 12 ký tự, chỉ lỗi mới; hoàn lại.
6. Chạy: chọn phiên bản, ghim 2 phản hồi, sửa/xóa một phản hồi, approve; mở lại kiểm tra read-only; thu 375px.
7. Commit/push + hash.
8. Kết: TASK-07, nhánh, commit; chỉ QA `docs/05-nhom/nhiem-vu/TASK-27-INTEGRATION-v1.md`.

**Câu hỏi gợi ý:** Tọa độ ghim được tính thế nào khi ảnh co giãn? Vì sao không cho sửa sau khi approve?

---

## 4. Landing — TASK-22

**Thời lượng:** 2–3 phút. **Nhánh:** `feature/sv1-creatorstudio`. **Tệp:** `index.html`, `js/index.js`, `css/index.css`.

1. Giới thiệu: TASK-22, Landing, người dùng mới.
2. Figma: chưa có frame Landing; nói rõ.
3. HTML: chỉ `header`, `nav`, `main`, các section giới thiệu, footer.
4. JS: `closeLandingMenus()` quản lý `aria-expanded`; click ngoài đóng; `Escape` đóng và trả focus; `ArrowDown` mở panel và focus link đầu; các nút `[data-role]` lưu vai trò rồi chuyển trang.
5. Sửa live: đổi nhãn một mục menu hoặc thêm `aria-label` cho nút mở menu, lưu, reload.
6. Chạy: mở/đóng menu bằng chuột và bàn phím; chọn 4 vai trò; thu 375px và 1440px; kiểm tra không tràn ngang.
7. Commit/push + hash.
8. Kết: TASK-22, nhánh, commit; chỉ QA menu trong `TASK-27-INTEGRATION-v1.md`.

**Câu hỏi gợi ý:** Vì sao phải trả focus về nút sau khi đóng menu? `aria-expanded` dùng để làm gì?

---

## 5. Login — TASK-23

**Thời lượng:** 3 phút. **Nhánh:** `feature/sv1-creatorstudio`. **Tệp:** `html/sv1/login.html`, `js/login.js`.

1. Giới thiệu: TASK-23, đăng nhập demo.
2. Figma: chưa có frame; chỉ UI hiện tại.
3. HTML: chỉ form `#login-form`, `#email`, `#password`, vùng lỗi, nút chọn nhanh vai trò.
4. JS: kiểm tra `email.validity.valid`, mật khẩu ≥ 6; đặt `aria-invalid`, focus trường lỗi; disable nút khi gửi; chờ 450 ms; gọi `TeamClient.authenticate()`; `destinationAfterLogin()` chọn trang theo vai trò.
5. Sửa live: đổi thời gian chờ 450 → 800 ms và thêm chữ “Đang tạo phiên demo…” (đã có) hoặc đổi thông báo lỗi; reload.
6. Chạy: sai email, sai mật khẩu, tài khoản bị khóa, đăng nhập đúng 4 vai trò; thu 375px.
7. Commit/push + hash.
8. Kết: TASK-23, nhánh, commit; nói rõ không có backend xác thực thật.

**Câu hỏi gợi ý:** Vì sao disable nút trước khi chờ? Nếu `TeamClient.authenticate` ném lỗi thì giao diện xử lý thế nào?

---

## 6. Register — TASK-23/27

**Thời lượng:** 2–3 phút. **Nhánh:** `feature/task27-integration-v1` (phần tích hợp). **Tệp:** `html/sv1/register.html`, `js/register.js`.

1. Giới thiệu: TASK-23/27, đăng ký Client; nói rõ phần này được tích hợp ở TASK-27.
2. Figma: chưa có frame.
3. HTML: chỉ form `#register-form`, 4 trường, vùng `#register-status`.
4. JS: kiểm tra tên ≥ 2, email hợp lệ, mật khẩu ≥ 6, xác nhận khớp; `Store.registerClient()`; chuyển sang `html/sv1/login.html?registered=...`.
5. Sửa live: đổi tên tối thiểu 2 → 3 ký tự, thử tên 2 ký tự, chỉ lỗi; hoàn lại.
6. Chạy: đăng ký mới, thử email trùng, đăng nhập tài khoản vừa tạo; thu 375px.
7. Commit/push + hash.
8. Kết: TASK-23/27, nhánh, commit; chỉ QA `docs/04-qa/ket-qua/qa-final-v5/result.json`.

**Câu hỏi gợi ý:** Vì sao đăng ký xong không tự đăng nhập? Mật khẩu demo lưu ở đâu và có an toàn không?
