> Khôi phục từ bản sao lưu ngày 25/10/2026. Nội dung dự thảo/lịch sử cần đối chiếu; số liệu hiện hành ưu tiên README gốc và evidence-index. Chưa xác nhận link Figma/Trello/deploy hoặc kết quả chưa chạy lại.

# Luyện vấn đáp — 4 câu × 3 SV

Giảng viên có thể hỏi bất kỳ dòng code nào trong phần SV phụ trách. Tài liệu này là **khung trả lời kỹ thuật** dựa trên code hiện tại; mỗi SV phải mở file, đọc lại và viết lại theo lời mình. Không học thuộc lòng, không nhận bài học cá nhân chưa trải qua.

Thang điểm gợi ý: giải thích code 0.30; debug/edge case 0.25; lựa chọn kỹ thuật 0.25; bài học/quy trình 0.20.

---

## SV1 — Client, Landing, Auth

### Câu 1 (0.30) — Giải thích `client-store-adapter.js`

**Hỏi:** “Vì sao có `client-store-adapter.js`? `read()` và `write()` làm gì?”

**Trả lời dựa trên code:**

- Màn Client của SV1 dùng cấu trúc dữ liệu riêng (`projectView`), còn toàn nhóm dùng Store chung. Adapter chuyển đổi hai chiều, **không tạo database thứ hai**.
- `read()` gọi `Store.load()`, lấy dữ liệu, lọc project/comment/notification theo user đang đăng nhập; `baseline = clone(value)` để phát hiện thay đổi.
- `projectView()` chỉ đưa các phiên bản có trạng thái public (`Client Review`, `Approved`, `Changes Requested`, `Rejected`), sắp xếp theo `createdAt`/`versionNum`, chọn phiên bản từ query `?version=` hoặc mới nhất; tính `progress` từ task done; gắn `comments` đúng `versionId`.
- `write(value)` kiểm tra session là Client, so `baseline` với dữ liệu mới, rồi chạy **một** `Store.transaction`: tạo/sửa project, ghi brief, thêm/sửa comment, đổi trạng thái version và gửi notification. Nếu vi phạm (xóa project còn dữ liệu, sửa project archived, comment < 3 ký tự), transaction ném lỗi và không ghi.
- Nhờ vậy dữ liệu Client và Lead/Designer gặp nhau qua ID (`projectId`, `versionId`), không copy.

**Dòng nên chỉ:** `publicStates`, `projectView()` phần `versions.filter`, `write()` phần `Store.transaction`, `versionId` check.

**Lỗi thường gặp:** nói adapter là “API backend” hoặc “database riêng” — sai.

### Câu 2 (0.25) — Debug tìm kiếm tiếng Việt

**Hỏi:** “Vì sao gõ `moc` không tìm thấy `Mộc Coffee`, nhưng gõ `Mộc` lại thấy? Sửa thế nào?”

**Trả lời:**

- `client-project-overview.js` dùng `toLocaleLowerCase("vi")` trên `name + category + description`, nhưng **không bỏ dấu**. `"mộc"` khác `"moc"`, nên `includes("moc")` trả false.
- Cách sửa: chuẩn hóa cả hai chuỗi bằng `normalize("NFD").replace(/[\u0300-\u036f]/g, "")` (và `đ → d`) trước khi so sánh; giữ nguyên chuỗi hiển thị.
- Cần kiểm thêm: từ khóa rỗng, khoảng trắng đầu/cuối, nhiều dấu cách; không dùng `innerHTML` với từ khóa người dùng.

**Nếu bị yêu cầu sửa live:** thêm hàm `normalizeText`, áp dụng cho `query` và chuỗi project; thử `moc`, `Mộc`, `mộc coffee`.

### Câu 3 (0.25) — Lựa chọn kỹ thuật

**Hỏi:** “Vì sao dùng `dialog.showModal()` thay vì `div` ẩn/hiện? Vì sao dữ liệu để LocalStorage?”

**Trả lời:**

- `showModal()` cho phép trình duyệt xử lý focus, lớp nền, `Esc` và ngữ nghĩa dialog; ít code hơn tự làm overlay. Vẫn phải kiểm tra focus trả về và nội dung cuộn được trên mobile.
- LocalStorage phù hợp bài frontend demo: không cần backend, dữ liệu bền qua F5, dễ reset/export. Giới hạn: chỉ trên một trình duyệt/origin, không đồng bộ nhiều máy, không bảo mật — không dùng cho dữ liệu thật.
- Chọn adapter thay vì sửa toàn bộ màn Client để giữ mã SV1 và vẫn dùng Store chung; đổi lại phải kiểm tra mapping kỹ.

### Câu 4 (0.20) — Quy trình và bài học

**Hỏi:** “Phần nào em tự làm? Em kiểm chứng AI-1 thế nào? Bài học lớn nhất?”

**Khung trả lời:**

- Nêu đúng màn/tệp/commit của mình; không nhận phần người khác.
- AI-1: mô tả ngắn → cảnh báo; mô tả đủ → 5 phần; sửa → accept → lưu → F5; thử reject/regenerate. Kiểm chứng bằng thao tác trình duyệt + `tests/brief-regression.test.cjs`/QA.
- Bài học: **tự điền** — ví dụ “em học được cách kiểm tra dữ liệu trước khi ghi”, “em từng bỏ quên trạng thái read-only”, chỉ ghi điều thật.

---

## SV2 — Designer, Moodboard, Template, Profile, Notifications

### Câu 1 (0.30) — Giải thích AI-3

**Hỏi:** “`AIMoodAssistant.generateSuggestion()` chạy thế nào? Vì sao gọi là AI mô phỏng?”

**Trả lời:**

- Hàm trả `Promise`, dùng `setTimeout` 1400 ms để mô phỏng xử lý; nếu `simulateFailure` thì `reject` với lỗi thiếu dữ liệu.
- Chuỗi input được `toLowerCase().trim()`; nếu < 5 ký tự thì reject. Sau đó so khớp từ khóa với `KNOWLEDGE_BASE` (4 chủ đề: mộc, trà, sang trọng, trẻ trung); không khớp thì trả theme mặc định/ghi rõ chưa đủ tin cậy.
- Kết quả gồm `themeName`, `keywords`, `palette` (hex/name/role), `materials`, `typography`, `explanation`.
- UI hiển thị processing → result → explanation; người dùng Accept (gọi `Store.applyAIPalette`), Reject, hoặc nhập tay. Không gọi LLM/API, không gửi dữ liệu ra ngoài.

**Dòng nên chỉ:** `generateSuggestion`, `KNOWLEDGE_BASE`, `setTimeout(..., 1400)`, `Store.applyAIPalette`.

### Câu 2 (0.25) — Debug upload phiên bản

**Hỏi:** “Tải ảnh 2 MB hoặc file PDF thì chuyện gì xảy ra? Nếu `FileReader` lỗi thì sao?”

**Trả lời:**

- Trong `html/sv2/designer-version-management.html`, trước khi đọc file có kiểm tra `['image/png','image/jpeg','image/webp'].includes(file.type)` và `file.size <= 1024*1024`; sai thì `throw new Error('Chọn ảnh PNG/JPEG/WebP tối đa 1 MB.')`.
- `FileReader.readAsDataURL` là async; `reader.onerror` reject với “Không đọc được ảnh…”, form hiển thị lỗi và không gọi `Store.saveVersion`.
- Nếu ảnh quá lớn sau khi mã hóa base64, `Store` có thể lỗi quota LocalStorage; `tx()` bắt lỗi `setItem` và báo “Không lưu được dữ liệu…”, thay đổi không được áp dụng.
- Cách kiểm: thử PDF, ảnh > 1 MB, ảnh hợp lệ; xem Console/Network; F5.

### Câu 3 (0.25) — Lựa chọn kỹ thuật

**Hỏi:** “Vì sao Dashboard có nút Normal/Loading/Empty/Urgent? Vì sao dùng `App.preserveFocus`?”

**Trả lời:**

- Nút chế độ giúp trình diễn và kiểm thử các trạng thái giao diện mà không cần chờ dữ liệu thật; đây là **mô phỏng trạng thái**, không phải loading backend.
- `renderDashboardContent()` đổi `currentStateMode`, lọc `displayTasks`; Loading hiển thị skeleton, Empty hiển thị `App.empty`, Urgent lọc task gần hạn/ưu tiên cao.
- `App.preserveFocus` giữ focus của phần tử đang thao tác sau khi render lại `innerHTML`; nếu không, người dùng bàn phím sẽ mất vị trí.
- Chọn một Store chung thay vì dữ liệu riêng để Designer thấy đúng task/version do Lead tạo.

### Câu 4 (0.20) — Quy trình và bài học

**Hỏi:** “Em kiểm chứng AI-3 và upload thế nào? Bài học?”

**Khung trả lời:**

- AI-3: thử prompt mộc/trà/sang trọng/trẻ trung; prompt < 5 ký tự; bật failure; accept/reject/nhập tay; F5 xem palette đã lưu.
- Upload: thử PDF, > 1 MB, ảnh hợp lệ; kiểm tra status Draft → Internal Review; thử xóa phiên bản không phải Draft.
- Bài học: tự điền, chỉ nêu điều đã thực sự làm.

---

## SV3 — Lead, Admin, Store, AI-2

### Câu 1 (0.30) — Giải thích `Store.tx()`

**Hỏi:** “Vì sao mọi thao tác ghi đều qua `tx()`? Nó xử lý hai tab cùng sửa thế nào?”

**Trả lời:**

- `tx(fn)` đọc lại `localStorage.getItem(KEY)` **mỗi lần ghi**, kiểm tra `schema === 1`, gán vào `db`; như vậy nếu tab khác vừa ghi, tab này lấy bản mới nhất trước khi áp thay đổi.
- Sao `clone(db)` thành `next`, chạy `fn(next)`, rồi `localStorage.setItem(KEY, JSON.stringify(next))`; nếu `setItem` lỗi (quota/bị chặn), ném thông báo và **không** gán `db = next`, nên thay đổi không được áp dụng.
- Thành công thì `db = next`, trả `get()` (clone) để tránh lộ object nội bộ.
- `actor()` kiểm tra user tồn tại/active/đúng vai trò; `writable()` chặn dự án archived. Đây là quyền phía frontend để demo, không phải bảo mật backend.

**Dòng nên chỉ:** `tx`, `actor`, `writable`, `load` (kiểm tra schema).

### Câu 2 (0.25) — Debug dữ liệu hỏng/quota

**Hỏi:** “Nếu LocalStorage chứa JSON hỏng hoặc đầy dung lượng thì website xử lý thế nào?”

**Trả lời:**

- `load()` parse JSON; nếu sai schema/thiếu mảng/settings thì ném “Dữ liệu lưu không hợp lệ. Hãy xuất bản sao rồi đặt lại dữ liệu mẫu.”
- `tx()` bọc `setItem` trong `try/catch`, báo “Không lưu được dữ liệu. Bộ nhớ trình duyệt có thể đã đầy hoặc bị chặn. Thay đổi chưa được áp dụng.”
- Người dùng có thể xuất JSON (bản hiện tại chưa có nhập) hoặc reset mẫu; reset chỉ xóa khóa `creatorstudio.team.v1` sau xác nhận.
- Cách kiểm: DevTools → Application → LocalStorage sửa key; hoặc thử ảnh lớn; F5.

### Câu 3 (0.25) — Lựa chọn kỹ thuật

**Hỏi:** “Vì sao dùng một Store chung thay vì mỗi màn một LocalStorage? Vì sao task có `Cancelled` thay vì xóa cứng?”

**Trả lời:**

- Một Store + ID chung để brief/task/version/comment liên thông giữa 4 vai trò, tránh copy dữ liệu và lệch trạng thái. Đổi lại mọi màn phải dùng đúng API Store và kiểm tra quyền.
- Task có `cancelled` để giữ lịch sử và lý do hủy thay vì xóa mất dấu; chỉ Lead được hủy, lý do 8–500 ký tự, task đã hủy không chặn lưu trữ dự án. Xóa vĩnh viễn chỉ mở cho task đã hủy.
- Quyền frontend chỉ để demo; backend thật cần xác thực/authorization ở server.

### Câu 4 (0.20) — Quy trình và bài học

**Hỏi:** “Lỗi tích hợp nào em từng sửa? Em kiểm chứng thế nào? Bài học?”

**Khung trả lời (chọn lỗi thật đã làm):**

- Phân công người bị khóa; feedback gắn nhầm phiên bản; route/Store riêng không liên thông; ảnh review cố định; responsive tràn ngang; mất focus khi tìm kiếm; hồ sơ bị chặn do kiểm tra vai trò; thông báo mở sai dự án.
- Kiểm chứng: test Node/Store, Chromium, ảnh desktop/mobile, F5, hai tab.
- Bài học: tự điền — chỉ nêu lỗi mình đã trực tiếp sửa/kiểm tra.

---

## Câu hỏi chung cả nhóm phải trả lời được

1. Khóa LocalStorage là gì? `creatorstudio.team.v1`.
2. Ba AI có gọi API không? Không; mô phỏng bằng quy tắc, độ trễ 700/1100/1400 ms.
3. Vì sao F5 không mất dữ liệu? Ghi vào LocalStorage qua Store, không chỉ giữ trong biến.
4. Vì sao 403/404 khác nhau? 403 = sai vai trò (`?code=403`), 404 = URL không tồn tại.
5. Vì sao chưa có backend? Phạm vi học phần là frontend; LocalStorage đủ demo, có giới hạn bảo mật.
6. Figma đủ chưa? Chưa, 6/18 màn có frame; trả lời đúng, không nhận đủ.
7. PR nào còn mở? Kiểm tra GitHub trước giờ chấm; không đoán.
8. OBS đã quay chưa? Chưa; nếu đã quay, mở link thật.
