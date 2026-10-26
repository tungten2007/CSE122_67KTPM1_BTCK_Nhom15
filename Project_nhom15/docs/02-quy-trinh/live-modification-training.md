> Khôi phục từ bản sao lưu ngày 25/10/2026. Nội dung dự thảo/lịch sử cần đối chiếu; số liệu hiện hành ưu tiên README gốc và evidence-index. Chưa xác nhận link Figma/Trello/deploy hoặc kết quả chưa chạy lại.

# Luyện live modification — 24 đề A–F

Giảng viên bốc ngẫu nhiên, mỗi nhóm sửa trực tiếp trong **10 phút** trên máy đã mở code. Được xem code sẵn và tra MDN/Bootstrap docs; **không được dán đề cho AI**. Mục tiêu là sửa nhỏ, đúng, giải thích được — không phải làm lại tính năng.

> Một số đề dưới đây trùng với gói P1 đang hoàn thiện (sort/reset/Cancelled/xóa). Khi code đã có, giảng viên có thể yêu cầu biến thể; nhóm vẫn phải hiểu code hiện tại, không chỉ nhớ đáp án.

## 1. Quy trình 10 phút

1. **0:00–0:01** — Nghe đề, nhắc lại yêu cầu, xác định file/hàm.
2. **0:01–0:03** — Mở file, đọc đoạn liên quan, nêu cách sửa.
3. **0:03–0:06** — Sửa, lưu, reload, kiểm tra.
4. **0:06–0:08** — Thử edge case; sửa lỗi phát sinh.
5. **0:08–0:09** — `git diff`, giải thích thay đổi.
6. **0:09–0:10** — Nêu tác động/kiểm thử; không lan sang file khác nếu không cần.

## 2. Tiêu chí nghiệm thu

- Đúng yêu cầu, không phá chức năng hiện có.
- Không lỗi Console; dữ liệu vẫn lưu qua F5 (nếu có ghi dữ liệu).
- Có kiểm tra ít nhất một edge case.
- Giải thích được dòng đã sửa và lý do.
- Không dùng AI/chat trong 10 phút.

## 3. Danh sách 24 đề

### A. HTML/CSS, responsive

| Mã | Đề | File gợi ý | Gợi ý 10 phút | Nghiệm thu |
|---|---|---|---|---|
| A1 | Ở 768px, danh sách dự án hiển thị 2 cột thay vì 1 | `css/pages/client.css` hoặc CSS của Project Overview | Thêm media query `@media (min-width:768px)` cho `.project-grid`/`.project-list` | 768px thấy 2 cột; 320px 1 cột; không tràn |
| A2 | Thêm skip link “Bỏ qua tới nội dung” | `html/sv1/client-project-overview.html` + CSS chung | Thêm `<a href="#main" class="skip-link">`, CSS ẩn đến khi focus | Tab lần đầu thấy link; Enter tới `main` |
| A3 | Header bảng công việc dính trên cùng khi cuộn | `css/sv3/base.css`/`pages/lead.css` | `position: sticky; top: 0; z-index` hợp lý | Cuộn 500px vẫn thấy header; không che dialog |
| A4 | Bảng người dùng không tràn ngang ở 375px | `html/sv3/admin-user-management.html` + `pages/admin.css` | Chuyển bảng sang card hoặc `overflow-x:auto` có nhãn | 375px không cuộn ngang toàn trang; vẫn đọc được cột |

### B. DOM/JavaScript

| Mã | Đề | File gợi ý | Gợi ý 10 phút | Nghiệm thu |
|---|---|---|---|---|
| B1 | Debounce 250ms cho ô tìm kiếm bảng công việc | `js/sv3/pages/lead-task-board.js` | Viết `debounce(fn,250)`, bọc `oninput`; giữ con trỏ | Gõ nhanh chỉ render sau 250ms; focus không mất |
| B2 | Sắp xếp task theo hạn gần nhất | `js/sv3/pages/lead-task-board.js` | Thêm select sort; `tasks.sort((a,b)=>new Date(a.due)-new Date(b.due))` | Đổi sort thấy thứ tự đúng; F5 giữ hoặc reset rõ ràng |
| B3 | Nút “Xóa bộ lọc” trên bảng công việc | `js/sv3/pages/lead-task-board.js` + HTML | Reset `query/person/priority`, render, focus ô tìm kiếm | Bấm xóa thấy đủ task; URL/ô tìm kiếm sạch |
| B4 | Đếm ký tự còn lại cho mô tả brief | `html/sv1/client-creative-brief.html` + `js/client-creative-brief.js` | Thêm `maxlength`, span đếm, cập nhật `oninput` | Nhập 100 ký tự thấy đúng số; không lỗi |

### C. Biểu mẫu/validation

| Mã | Đề | File gợi ý | Gợi ý 10 phút | Nghiệm thu |
|---|---|---|---|---|
| C1 | Tên công việc tối thiểu 5 ký tự | `js/sv3/pages/lead-task-board.js` | Đổi `minlength="3"` → `5`; thêm thông báo | Nhập 4 ký tự bị chặn, focus đúng trường |
| C2 | Kiểm tra email đăng ký theo `type=email` và báo lỗi cạnh trường | `html/sv1/register.html`/`js/register.js` | Dùng `validity.valid`, thêm span lỗi + `aria-describedby` | Email sai báo lỗi; email đúng qua |
| C3 | Chặn bấm gửi brief hai lần khi đang lưu | `js/client-creative-brief.js` | Thêm biến `saving`, disable nút, `finally` mở lại | Bấm nhanh 2 lần chỉ tạo 1 bản ghi |
| C4 | Lỗi inline dưới ô tên dự án thay vì chỉ toast | `html/sv1/client-project-overview.html`/JS | Thêm `<p id="name-error">`, `aria-invalid` | Submit rỗng thấy lỗi dưới ô; đọc được bằng screen reader |

### D. Store/dữ liệu/trạng thái

| Mã | Đề | File gợi ý | Gợi ý 10 phút | Nghiệm thu |
|---|---|---|---|---|
| D1 | Thêm trạng thái `Cancelled` cho task và badge | `js/shared/store.js`, `js/sv3/app.js` (`stateLabel`), CSS | Thêm status vào mảng + label + transition; cập nhật UI select | Chọn Cancelled; F5 giữ; báo cáo không tính là done |
| D2 | Xác nhận trước khi xóa nhãn đang dùng | `js/sv3/pages/admin-project-settings.js` | Nút đã disable; thêm `confirmAction`/thông báo rõ | Nhãn đang dùng không xóa; nhãn trống xóa được |
| D3 | Ghi activity khi di chuyển task | `js/shared/store.js` (`moveTask`) | `d.activity.unshift({id,text,time})` trong `tx` | Chuyển task, mở Hoạt động thấy dòng mới |
| D4 | Chặn xóa Admin cuối cùng | `js/shared/store.js` (`deleteUser` nếu có) | Đếm admin active; nếu còn 1 thì ném lỗi | Xóa admin cuối bị chặn; còn admin khác thì được |

### E. AI UX

| Mã | Đề | File gợi ý | Gợi ý 10 phút | Nghiệm thu |
|---|---|---|---|---|
| E1 | Thêm nút “Thử lại” sau khi AI-2 thất bại | `js/sv3/pages/lead-feedback-summary.js` | Giữ `error`, hiện nút gọi lại `generate()` | Bật failure → thấy nút; bấm → chạy lại |
| E2 | Hiển thị lý do AI-1 trong khối thu gọn | `html/sv1/client-creative-brief.html`/JS | Dùng `<details><summary>Vì sao?</summary>` | Mở/đóng được; nội dung đúng |
| E3 | Thêm 3 prompt gợi ý cho AI-3 | `html/sv2/designer-moodboard.html` | Nút chip điền `#ai-prompt-input` | Bấm chip điền đúng; vẫn sửa được |
| E4 | Chặn Accept khi AI chưa trả kết quả | `js/client-creative-brief.js` | `disabled` theo `busy`/`structured-form.hidden` | Trong 700ms không bấm được; xong mới bật |

### F. A11y/lỗi

| Mã | Đề | File gợi ý | Gợi ý 10 phút | Nghiệm thu |
|---|---|---|---|---|
| F1 | Toast đọc được bằng screen reader | `js/sv3/app.js`/`js/sv2/app-sv2.js` | Thêm `role="status"`/`aria-live="polite"` | Toast xuất hiện không cần focus |
| F2 | Giữ focus trong dialog khi Tab | `js/sv3/app.js` (dialog helper) hoặc HTML | Lấy danh sách focusable, chặn vòng ngoài | Tab không thoát dialog; Esc đóng |
| F3 | Esc đóng dialog ghim ghi chú | `html/sv3/lead-internal-review.html`/JS | `keydown` trên dialog, `close()`, trả focus | Esc đóng; focus về nút mở |
| F4 | Nút 403 quay đúng trang theo vai trò | `js/sv3/pages/error.js` | `A.home()` đã có; kiểm tra 4 vai trò; sửa nếu sai | Mỗi vai trò về đúng trang; không lộ dữ liệu |

## 4. Lịch tập 3 vòng

| Vòng | Cách làm | Mục tiêu |
|---|---|---|
| 1 | Mỗi SV bốc 2 đề thuộc phần mình, làm không giới hạn thời gian | Hiểu code, biết file/hàm |
| 2 | Bốc ngẫu nhiên 1 đề bất kỳ, bấm 10 phút, có người quay | Quen áp lực, biết cắt phạm vi |
| 3 | 3 máy cùng lúc, mỗi máy 1 đề khác nhau, đổi máy | Phối hợp, không phụ thuộc một người |

## 5. Lỗi cần tránh

- Sửa quá nhiều file/viết lại cả hàm khi đề chỉ yêu cầu một chi tiết.
- Quên reload/không kiểm tra edge case.
- Dùng `innerHTML` với input người dùng mà không `escape`.
- Xóa/đổi dữ liệu mẫu để “chạy được” thay vì sửa logic.
- Dùng AI/chat trong 10 phút; giảng viên có thể yêu cầu giải thích từng dòng.
- Nói “em biết rồi” nhưng không mở đúng file.
