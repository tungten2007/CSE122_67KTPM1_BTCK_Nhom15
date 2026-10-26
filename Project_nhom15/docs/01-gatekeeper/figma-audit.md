> Khôi phục từ bản sao lưu ngày 25/10/2026. Nội dung dự thảo/lịch sử cần đối chiếu; số liệu hiện hành ưu tiên README gốc và evidence-index. Chưa xác nhận link Figma/Trello/deploy hoặc kết quả chưa chạy lại.

# Đối chiếu Figma — CreatorStudio

Tài liệu kiểm tra mức độ hoàn thiện thiết kế so với 18 màn hình bắt buộc. Chỉ ghi link **có thật trong repo**; màn chưa có frame được ghi nhận rõ ràng, không suy đoán.

- File Figma chung: [CreatorStudio UI/UX](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=1-2) (file key `fQMvcuxxBcwUYAUv1D4YlT`).
- UI Kit SV3: [node 70-15](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=70-15) (root `70:15`, các component `70:32`, `70:36`, `70:40`, `70:44`, `70:48`, `70:52`, `70:56`).
- Wireframe dùng chung: [desktop 3-109](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=3-109), [mobile 3-157](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=3-157).
- Nguồn trạng thái gốc: [figma-canva/README.md](../../figma-canva/README.md), [docs/04-qa/lich-su/SV3-DESIGN-QA.md](../SV3-DESIGN-QA.md).
- Ngày rà soát: 2026-10-25.

## 1. Tổng quan trung thực

| Hạng mục | Hiện trạng |
|---|---|
| Màn có frame desktop + mobile được ghi nhận | **6/18** (Task Board, Internal Review, Feedback Summary AI-2, User Management, Project Settings, 403/404) |
| Màn chưa có frame được ghi nhận | **12/18** |
| Bộ trạng thái đầy đủ (Normal/Loading/Empty/Error/Success) | **0/18** |
| Prototype luồng chính | **Chưa có** |
| Ảnh export SVG/PNG | **Chưa có** |
| Duyệt thiết kế bởi nhóm/giảng viên | **Chưa có** |
| Trạng thái 6 màn SV3 | 🔴 **Có lỗi / chưa QA lại**: mobile còn chồng chữ; desktop đã sửa text sizing nhưng chưa chụp kiểm tra; Figma MCP từng bị rate limit |

**Không tuyên bố “Figma đủ 18 màn”** cho đến khi nhóm bổ sung frame, link và ảnh kiểm chứng.

## 2. Bảng đối chiếu 18 màn

Quy ước: `Có` = có frame được ghi nhận kèm link; `Chưa có` = chưa có link/frame trong repo. Cột States/AI/Prototype chỉ ghi những gì đã được tạo, không suy từ frame chuẩn.

| # | Màn hình | File code | Desktop | Mobile | States | AI | Prototype | Link | Trạng thái | Owner |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | Tổng quan dự án | `client-project-overview.html` | Chưa có | Chưa có | Chưa có | — | Chưa có | — | 🔴 Thiếu thiết kế | SV1 |
| 2 | Creative Brief | `client-creative-brief.html` | Chưa có | Chưa có | Chưa có | AI-1 chưa có frame | Chưa có | — | 🔴 Thiếu thiết kế | SV1 |
| 3 | Duyệt phiên bản | `client-review-versions.html` | Chưa có | Chưa có | Chưa có | — | Chưa có | — | 🔴 Thiếu thiết kế | SV1 |
| 4 | Dashboard Designer | `designer-dashboard.html` | Chưa có | Chưa có | Chưa có | — | Chưa có | — | 🔴 Thiếu thiết kế | SV2 |
| 5 | Moodboard | `designer-moodboard.html` | Chưa có | Chưa có | Chưa có | AI-3 chưa có frame | Chưa có | — | 🔴 Thiếu thiết kế | SV2 |
| 6 | Quản lý phiên bản | `designer-version-management.html` | Chưa có | Chưa có | Chưa có | — | Chưa có | — | 🔴 Thiếu thiết kế | SV2 |
| 7 | Bảng công việc | `lead-task-board.html` | Có | Có | Frame chuẩn; chưa có bộ trạng thái | — | Chưa có | [Desktop 71-10](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-10) · [Mobile 71-397](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-397) | 🔴 Mobile còn lỗi chồng chữ; chưa QA lại | SV3 |
| 8 | Duyệt nội bộ | `lead-internal-review.html` | Có | Có | Frame chuẩn; chưa có bộ trạng thái | — | Chưa có | [Desktop 71-102](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-102) · [Mobile 71-446](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-446) | 🔴 Mobile còn lỗi; chưa QA lại | SV3 |
| 9 | Tổng hợp phản hồi | `lead-feedback-summary.html` | Có | Có | Frame chuẩn; chưa đủ 6 bước AI | Có frame AI-2 nhưng chưa có bộ trạng thái AI | Chưa có | [Desktop 71-179](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-179) · [Mobile 71-511](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-511) | 🔴 Thiếu trạng thái AI; chưa QA lại | SV3 |
| 10 | Quản lý mẫu Brief | `admin-brief-template-management.html` | Chưa có | Chưa có | Chưa có | AI-1 template chưa có frame | Chưa có | — | 🔴 Thiếu thiết kế | SV2 |
| 11 | Quản lý người dùng | `admin-user-management.html` | Có | Có | Frame chuẩn; chưa có bộ trạng thái | — | Chưa có | [Desktop 71-232](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-232) · [Mobile 71-552](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-552) | 🔴 Mobile còn lỗi; chưa QA lại | SV3 |
| 12 | Cài đặt dự án | `admin-project-settings.html` | Có | Có | Frame chuẩn; chưa có bộ trạng thái | — | Chưa có | [Desktop 71-308](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-308) · [Mobile 71-617](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-617) | 🔴 Mobile còn lỗi; chưa QA lại | SV3 |
| 13 | Landing | `index.html` | Chưa có | Chưa có | Chưa có | — | Chưa có | — | 🔴 Thiếu thiết kế | SV1 |
| 14 | Đăng nhập | `login.html` | Chưa có | Chưa có | Chưa có | — | Chưa có | — | 🔴 Thiếu thiết kế | SV1 |
| 15 | Đăng ký | `register.html` | Chưa có | Chưa có | Chưa có | — | Chưa có | — | 🔴 Thiếu thiết kế | Nhóm |
| 16 | Hồ sơ | `profile.html` | Chưa có | Chưa có | Chưa có | — | Chưa có | — | 🔴 Thiếu thiết kế | SV2 |
| 17 | Thông báo | `notifications.html` | Chưa có | Chưa có | Chưa có | — | Chưa có | — | 🔴 Thiếu thiết kế | SV2 |
| 18 | 403/404 | `404.html` | Có | Có | Frame chuẩn; chưa có bộ trạng thái | — | Chưa có | [Desktop 71-365](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-365) · [Mobile 71-664](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-664) | 🔴 Chưa QA lại | SV3 |

## 3. Checklist sửa lỗi mobile (6 frame SV3)

- [ ] Container text không còn chiều cao cố định 40px gây chồng chữ.
- [ ] Text dài (tên công việc, email, tên dự án) wrap hoặc truncate có chủ đích.
- [ ] Nút hành động không tràn khỏi frame 375px; kiểm thêm 320px.
- [ ] Kanban mobile: 1 cột + tab trạng thái, không hiển thị 4 cột chồng.
- [ ] Bảng user mobile: chuyển card, nhãn `data-label` hiển thị đúng.
- [ ] Toolbar/filter wrap, không cắt chữ.
- [ ] Dialog/modal mobile không vượt chiều cao màn hình.
- [ ] Khoảng cách chạm tối thiểu 40–44px.
- [ ] Ảnh export PNG ở 1x/2x, đặt tại `docs/04-qa/anh-web/figma/` (thư mục sẽ tạo khi export).
- [ ] Chụp ảnh sau sửa và ghi link vào bảng trên.

## 4. Checklist Figma còn thiếu (theo barem)

- [ ] Đủ **18 màn** desktop + mobile, không chỉ 6 màn SV3.
- [ ] Bộ trạng thái cho từng màn phù hợp: Normal, Loading (AI/designer), Empty, Error/Validation, Success; trạng thái Pending/Cancelled cho task và version.
- [ ] 3 màn AI có đủ 6 bước: Input → Processing → Output → Explain → Control → Save, kèm nhánh thất bại/không chắc chắn.
- [ ] Component guide/UI Kit có button, input, select, textarea, badge, card, modal, table, tabs, toast, empty/loading.
- [ ] Prototype luồng chính: Client brief → Lead duyệt → Designer nộp → Lead review → Client duyệt.
- [ ] Link public ở chế độ “Anyone with the link can view”; dán vào cột Link và `evidence-index.md`.
- [ ] Ảnh export đặt đúng thư mục, tên file theo số màn (ví dụ `01-client-project-overview-desktop.png`).
- [ ] Ghi rõ khác biệt có chủ đích giữa Figma và code (nếu có), tránh bị trừ vì “giao diện sai khác hoàn toàn”.

## 5. Quy tắc cập nhật

1. Chỉ đánh dấu `Có` khi link mở được và đúng frame; không dán link trang chính thay cho frame.
2. Không dùng ảnh AI/placeholder thay cho thiết kế màn hình.
3. Không ghi “đã duyệt” khi chưa có xác nhận của nhóm/giảng viên.
4. Mỗi lần sửa frame, cập nhật ngày và trạng thái; nếu chưa QA lại thì giữ 🔴.
5. Việc hoàn thiện Figma là **việc nhóm** (SV1/SV2/SV3 theo màn); agent chỉ hỗ trợ checklist và đối chiếu, không tạo link giả.

## 6. Liên kết

- [Kiểm kê màn hình](screen-inventory.md)
- [Design system](design-system.md)
- [Báo cáo QA thiết kế SV3](../SV3-DESIGN-QA.md)
- [Tiến độ SV3](../TIEN-DO-SV3.md)
