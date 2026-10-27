> Khôi phục từ bản sao lưu ngày 25/10/2026. Nội dung dự thảo/lịch sử cần đối chiếu; số liệu hiện hành ưu tiên README gốc và evidence-index. Chưa xác nhận link Figma/Trello/deploy hoặc kết quả chưa chạy lại.

# Design System — CreatorStudio

Tài liệu trích token và quy tắc component **từ code hiện tại** để dùng làm component guide khi hoàn thiện Figma, khi code màn mới và khi đối chiếu lúc bảo vệ. Không mô tả component chưa tồn tại.

- Nguồn chính: [css/tokens.css](../../css/shared/tokens.css), [css/typography.css](../../css/shared/typography.css), [css/base.css](../../css/sv3/base.css), [css/sv2-base.css](../../css/sv2/sv2-base.css), [css/team-shell.css](../../css/sv3/team-shell.css), [css/shared.css](../../css/shared/shared.css).
- Ngày rà soát: 2026-10-25.

## 1. Hai họ giao diện và cách hợp nhất

Dự án có hai họ CSS do hai nhánh phát triển độc lập, cùng dùng tông xanh rừng nhưng khác tên class:

| Họ | Trang dùng | File gốc | Class tiêu biểu |
|---|---|---|---|
| Client / Public | `index`, `login`, `register`, 3 trang Client | `shared.css` (import `tokens.css`, `typography.css`) | `.btn`, `.pill`, `.field`, `.toast`, `.empty`, `dialog` |
| Team shell | Designer, Lead, Admin, shared | `base.css` hoặc `sv2-base.css` + `team-shell.css` | `.button`, `.badge`, `.panel`, `.toolbar`, `.field`, `#toast` |

**Điểm cần nói đúng khi bảo vệ:** `base.css` khai báo `--primary:#635bff` (tím), nhưng `team-shell.css` nạp sau và override thành `--primary:#39765a` (xanh). Vì vậy giao diện team cuối cùng dùng xanh, không phải tím. Đây là kỹ thuật override có chủ đích, không phải hai theme song song.

## 2. Token

### 2.1. Màu thương hiệu (nguồn: `tokens.css`)

| Token | Giá trị | Dùng cho |
|---|---|---|
| `--ink` | `#183c32` | Chữ chính, nền sidebar tối |
| `--green` | `#39765a` | Accent chính, focus, trạng thái active |
| `--lime` | `#c5e78b` | Điểm nhấn trên nền tối, brand mark |
| `--paper` | `#f6f7f2` | Nền trang Client/Public |
| `--muted` | `#7a857b` | Chữ phụ |
| `--line` | `#e2e7dc` | Viền, divider |
| `--cream` | `#f3ecd9` | Nền phụ ấm |

### 2.2. Token UI Kit (nguồn: `base.css`, `sv2-base.css`)

| Token | Giá trị gốc | Giá trị sau `team-shell.css` | Dùng cho |
|---|---|---|---|
| `--primary` | `#635bff` | `#39765a` | Nút chính, link, trạng thái active |
| `--primary-dark` | `#4338ca` | `#183c32` | Hover/nhấn mạnh |
| `--primary-light` | `#eeecff` (sv2) | giữ nguyên | Nền chip/nút soft (một số trang team còn tím nhạt) |
| `--ink` | `#172033` | `#183c32` | Chữ chính |
| `--muted` | `#64748b` / `#68748a` | `#7a857b` | Chữ phụ |
| `--line` | `#cbd5e1` / `#e5e9f1` | `#e2e7dc` | Viền |
| `--bg` | `#f8fafc` / `#f6f7fb` | `#f6f7f2` | Nền trang |
| `--surface`, `--white` | `#fff` | `#fff` | Nền card/panel |
| `--success` | `#22c55e` | giữ nguyên | Trạng thái thành công |
| `--warning` | `#f59e0b` | giữ nguyên | Cảnh báo |
| `--danger` | `#ef4444` | giữ nguyên | Lỗi, xóa |
| `--info` | `#0ea5e9` | giữ nguyên | Thông tin |
| `--side` | `#111827` | giữ nguyên (sidebar team dùng nền sáng) | Nền tối dự phòng |
| `--radius` | `14px` | giữ nguyên | Bo góc panel/dialog |
| `--radius-sm` | `8px` (sv2) | giữ nguyên | Bo góc input/nút nhỏ |
| `--shadow` | `0 6px 24px rgba(37,49,75,.06)` | giữ nguyên | Đổ bóng panel |
| `--shadow-lg` | `0 20px 40px rgba(17,24,39,.12)` | giữ nguyên | Dialog/nổi |

### 2.3. Typography

| Thuộc tính | Giá trị |
|---|---|
| Font | Inter Variable, file nội bộ `assets/fonts/Inter-Variable.ttf`, weight 100–900, `font-display: swap`, license OFL |
| Body | 14px / 1.55 (team) hoặc 1.6 (client) |
| H1 | Client 38px/1.18, letter-spacing −1.5px; team 30px/1.25, −0.8px; mobile 26–27px |
| H2 | 20px (team) / 24px (client) |
| H3 | 15–17px |
| Small | 12px; note nhỏ 11px; nhãn eyebrow 10–11px, uppercase, letter-spacing 1.8–2px |
| Fallback | `sans-serif`; không gọi Google Fonts, không phụ thuộc mạng |

### 2.4. Spacing, radius, elevation

| Nhóm | Giá trị dùng trong code |
|---|---|
| Page padding | 34–38px desktop; 26–27px tablet; 16–18px mobile |
| Panel padding | 24px desktop; 18–20px mobile |
| Grid gap | 12–24px; form grid 2 cột, mobile 1 cột |
| Radius nút/input | 7px (base), 8–9px (client/sv2) |
| Radius panel/card | 10–14px |
| Radius dialog | 16px |
| Shadow panel | `0 6px 24px` rất nhẹ, ưu tiên viền hơn bóng |
| Dialog | `0 24px 100px #11182733` + backdrop blur 3px |

### 2.5. Breakpoint

| Breakpoint | Hành vi |
|---|---|
| `min-width:1750px` | Giới hạn nội dung 1550px, căn giữa |
| `max-width:1250px` | Kanban thu gọn, ẩn assignee name, summary team |
| `max-width:1150–1180px` | Ẩn breadcrumb, settings 1 cột, bảng admin co padding |
| `max-width:1100px` | Sidebar 212px, main padding 22–26px |
| `max-width:1050px` | Sidebar team 195px |
| `max-width:1000px` | Kanban 2 cột (khi vẫn >760px) |
| `max-width:760px` | Mobile: sidebar drawer, kanban 1 cột theo tab, bảng user thành card, form 1 cột |
| `max-width:360px` | Topbar và select co thêm, không tràn |
| `prefers-reduced-motion` | Tắt transition/animation |

## 3. Component guide

### 3.1. Button

| Thuộc tính | Client `.btn` | Team `.button` |
|---|---|---|
| Cơ bản | Viền `--line`, nền trắng, radius 9px | Viền `--line`, nền trắng, radius 7px, min-height 40px |
| Primary | `.btn.primary` nền `--green` | `.button.primary` nền `--primary` (xanh sau override) |
| Soft | `.btn.accent` | `.button.soft` nền `#efedff` |
| Danger | `.btn.danger` | `.button.danger` nền `#fff0f0`, viền đỏ |
| Small | `.btn.small` | `.button.small` min-height 32px |
| Disabled | opacity thấp, `cursor:not-allowed` | opacity .5, `cursor:not-allowed` |
| Focus | outline 3px `--green`, offset 4 | outline 3px `#4338ca`, offset 3 |
| Mobile | min-height 42px (base) | min-height 42px |

Quy tắc: một hành động chính mỗi vùng; nút nguy hiểm phải có xác nhận; nút đang xử lý phải disable và đổi nhãn (gap P1: chưa đồng nhất toàn bộ form).

### 3.2. Field / Input / Select / Textarea

- Cấu trúc chuẩn: `<label class="field">` bao text + control, hoặc `App.field(label, name, value, type, attrs)`.
- Label luôn hiển thị; placeholder chỉ là gợi ý, không thay label.
- Input/select/textarea: viền `--line`, radius 7px, padding 10–12px, min-height 42px; disabled nền xám.
- Lỗi: `.form-error` màu `#b42332`, đặt dưới control; form dài có thể dùng `role="alert"`.
- `aria-describedby` cho note/lỗi là gap P1 cần chuẩn hóa.
- Checkbox: `.check`, accent `--primary`, vùng chạm đủ lớn.

### 3.3. Badge / Pill

| Loại | Class | Trạng thái |
|---|---|---|
| Ưu tiên | `.badge.high`, `.medium`, `.low` | Đỏ nhạt / xám / xanh nhạt |
| Vai trò, AI | `.badge.purple` | Tím nhạt |
| Thành công/hoạt động | `.badge.green` | Xanh nhạt |
| Cảnh báo | `.badge.yellow` | Vàng nhạt |
| Trạng thái dự án Client | `.pill.Active`, `.InReview`, `.Completed`, `.Approved`, `.Archived`, `.ChangesRequested`, `.ClientReview`, `.Rejected` | Ánh xạ theo trạng thái |

Badge không thay thế mô tả; luôn có text, không chỉ màu.

### 3.4. Panel / Card

- Team: `.panel` nền trắng, viền, radius 14px, padding 24px; `.panel-title` gồm tiêu đề + mô tả + badge/action.
- Client: `.project-card` gồm ảnh, pill trạng thái, category label, tiêu đề, mô tả, progress, footer action.
- Danh sách dài: card trong grid `repeat(auto-fill, minmax(280–320px, 1fr))`.
- Empty state dùng `App.empty(title, description)` với icon, tiêu đề, mô tả; có hành động nếu hợp lý.

### 3.5. Dialog / Modal

- Dùng native `<dialog>` + `showModal()`, đóng bằng nút X, Hủy, phím Esc (mặc định của dialog + handler).
- Cấu trúc: `.dialog-head` (tiêu đề + nút đóng), `.dialog-body` (nội dung/form), `.dialog-foot` (Hủy + xác nhận).
- Modal xác nhận hành động nguy hiểm dùng `App.modal(title, body, onConfirm, confirmLabel, danger)`; nút xác nhận nằm cuối luồng tab.
- Backdrop `#17203365` + blur; dialog rộng tối đa 570px, cao tối đa `calc(100dvh - 40px)`.
- Focus trap/trả focus: có trong `bindMenu` cho drawer; modal dựa vào native dialog — cần audit lại toàn bộ (P1).

### 3.6. Table

- `.users-table`: header nền `#f6f7fb`, chữ uppercase 9px; hàng có divider; action cùng hàng.
- Mobile ≤760px: `thead` ẩn, mỗi `tr` thành card, `td[data-label]` hiện nhãn bằng `::before`.
- Không dùng table cho Kanban; Kanban là grid.

### 3.7. Tabs / Filter

- `.tabs` (team và Client overview): nền xám nhạt, nút active nền trắng + shadow; `role="group"` hoặc `aria-pressed`.
- Mobile: tab cuộn ngang hoặc wrap; Kanban dùng `.mobile-tabs` riêng, mỗi tab kèm số lượng.

### 3.8. Toast / Notice

- Toast: `#toast` cố định đáy giữa, nền `#172033`, chữ trắng, tự ẩn; dùng `role="status"`/`aria-live` (kiểm tra từng trang).
- Notice: `.notice` xanh nhạt cho thông tin, `.notice.warning` vàng, `.notice.success` xanh lá; có icon, tiêu đề, mô tả, action tùy chọn.
- Không dùng toast thay lỗi validation tại chỗ.

### 3.9. Loading / Skeleton / Spinner

- Designer Dashboard: `.skeleton`, `.skeleton-text`, `.skeleton-box`.
- AI-2: `.processing` + `.spinner` (32px, viền xoay).
- AI-3: skeleton + `.ai-progress-spinner`.
- AI-1: trạng thái “Đang tạo…” trong 700ms, disable toàn bộ control.
- Quy tắc: loading phải nói đang làm gì; không để nút bấm được lần hai; có `aria-busy`.

### 3.10. Empty / Error

- Empty: `App.empty(title, description)` — icon, tiêu đề, mô tả, có thể kèm action.
- Error form: inline dưới field hoặc `.form-error`; lỗi toàn trang dùng `.notice.warning` / `.error-page`.
- Trang 403/404: `404.html` đọc `?code=403`, hiển thị mã lỗi, thông điệp, nút về trang chủ theo vai trò.
- AI failure: thông điệp rõ + nút thử lại + phương án nhập thủ công. AI-1 khi mô tả &lt; 21 ký tự sẽ báo “Chưa đủ dữ liệu”, giữ nguyên nội dung đã nhập, gợi ý prompt chip và cho chọn “Tự viết brief”; lỗi mô phỏng cũng có nút thử lại.

## 4. Accessibility

### 4.1. Quy tắc đang áp dụng

- Skip link có ở shell; `.sr-only` cho nhãn ẩn.
- `:focus-visible` toàn cục; không xóa outline.
- Mọi input/select/textarea cần label; icon-only button cần `aria-label`.
- Ảnh nội dung có `alt` mô tả; ảnh trang trí `alt=""`.
- Dialog dùng native `<dialog>`; Esc đóng; nút đóng có nhãn.
- Menu mobile: `aria-expanded`, focus trap, Esc, trả focus (trong `bindMenu`).
- Trạng thái động dùng `aria-live`/`role="status"`/`role="alert"` ở nhiều màn; audit 25/10/2026 không phát hiện control thiếu tên hoặc ảnh thiếu `alt`.
- Tôn trọng `prefers-reduced-motion`.
- Vùng chạm: nút team 40–42px, nav 44px, icon button 38–40px.

### 4.2. Tương phản đo được (token hiện tại)

| Cặp màu | Tỷ lệ | Kết luận |
|---|---|---|
| `#183c32` trên `#f6f7f2` | 11.27:1 | Đạt AA/AAA cho chữ thường |
| `#5b665c` trên `#f6f7f2` | 5.57:1 | Đạt AA (`--muted` trên paper) |
| `#5b665c` trên `#ffffff` | 6.00:1 | Đạt AA |
| `#39765a` trên `#ffffff` | 5.37:1 | Đạt AA |
| `#ffffff` trên `#39765a` | 5.37:1 | Đạt AA cho nút primary |
| `#b42332` trên `#ffffff` | 6.51:1 | Đạt AA (badge ưu tiên cao trong team shell) |
| `#b91c1c` trên `#fee2e2` | 5.30:1 | Đạt AA (badge `.high`/`.urgent`) |
| `#64748b` trên `#ffffff` | 4.76:1 | Đạt AA |
| `#172033` trên `#f8fafc` | 15.55:1 | Đạt AAA |
| `#ffffff` trên `#635bff` | 4.70:1 | Đạt AA |
| `#4338ca` trên `#eeecff` | 6.80:1 | Đạt AA |

Hai cặp từng bị ghi “chưa đạt” (`#7a857b`/`#c64050`) không còn là token đang dùng; `--muted` hiện là `#5b665c` và badge dùng `#b91c1c`/`#b42332`, đều đạt AA theo công thức.

Audit tự động ngày **25/10/2026** đo 18 màn × 1440/375: **0 vi phạm tương phản**. Giới hạn: **28 cặp node có nền gradient/ảnh bị bỏ qua** (Designer Dashboard 6×2, Feedback Summary 2×2, Mẫu Brief 6×2), nên chưa thể tuyên bố “toàn bộ trang đạt AA”.

### 4.3. Việc cần làm

1. ✅ Audit `alt`, label, `aria-*` trên 18 màn ngày 25/10/2026: 0 control thiếu tên, 0 ảnh thiếu `alt`, 0 link/nút rỗng.
2. ✅ Đo lại `--muted` và badge; các cặp đang dùng đạt AA.
3. 🟡 `focus-regression` và audit bàn phím đã chạy cho luồng chính; vẫn cần kiểm thủ công focus trap/trả focus từng modal.
4. ⏳ Kiểm thứ tự tab thủ công, đặc biệt Kanban và bảng admin mobile.
5. ⏳ Chạy axe/Lighthouse và đo 28 node nền gradient còn lại; lưu kết quả vào `docs/04-qa/ket-qua/qa-*`.

## 5. Responsive

| Khu vực | Desktop | Mobile ≤760px |
|---|---|---|
| Sidebar | Cố định 230–236px | Drawer trượt, có overlay, nút đóng |
| Topbar | 74–78px, breadcrumb + role/project switch | 66–68px, ẩn breadcrumb/avatar, select co lại |
| Kanban | 4 cột | 1 cột theo tab trạng thái, có số lượng |
| Bảng user | Bảng 4 cột | Mỗi hàng thành card có nhãn |
| Form | 2 cột | 1 cột |
| Toolbar | Ngang | Search full dòng, filter chia đôi |
| Dialog | 570px | `calc(100% - 32px)` |
| Nút | 40px | 42px |

Đã có test responsive cho một số màn (`tests/browser-responsive-sv3.cjs`, `docs/04-qa/ket-qua/qa-responsive-sv3`). Chưa chụp đủ 18 màn ở 320/375/768/1024/1440 — thuộc P2.

## 6. Quy tắc khi thêm component/màn mới

1. Dùng token, không hardcode màu mới nếu không có lý do; nếu cần màu mới, thêm token và ghi vào tài liệu này.
2. Tái dùng class hiện có; không tạo bảng màu thứ ba.
3. Mọi trạng thái phải có: bình thường, rỗng, lỗi (nếu có form/AI), đang xử lý (nếu có tác vụ), thành công.
4. Mobile-first cho layout mới; kiểm tra 320px trước khi kiểm 1440px.
5. Không dùng `innerHTML` với dữ liệu người dùng nếu chưa `esc()`.
6. Ảnh/icon có alt hoặc aria-hidden đúng mục đích.
7. Ghi minh chứng (ảnh/test) vào `docs/04-qa/ket-qua/qa-*` và `evidence-index.md`.

## 7. Liên kết

- [Kiểm kê màn hình](../screen-inventory.md)
- [User flow](user-flow.md)
- [Đối chiếu Figma](figma-audit.md)
- Báo cáo QA responsive (nguồn chưa có trong bản hiện hành: ../04-qa/ket-qua/qa-responsive-sv3) (thư mục ảnh hiện có)
