# Thiết kế CreatorStudio — phần SV3

Figma chung: [CreatorStudio UI/UX](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=1-2).

## Tài sản chung đang có

| Tài sản | Page | Frame | Liên kết |
|---|---|---|---|
| UI Kit | `0:1` | `5:208` | [Mở UI Kit](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=5-208) |
| Wireframe desktop | `1:2` | `3:109` | [Mở wireframe desktop](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=3-109) |
| Wireframe mobile | `3:2` | `3:157` | [Mở wireframe mobile](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=3-157) |

Các tài sản trên thuộc file chung. Không coi việc có UI Kit/wireframe dùng chung là bằng chứng đã thiết kế đầy đủ sáu màn hình SV3.

## Phạm vi đang thực hiện

- **TASK-03 — phần SV3:** wireframe và UI Kit; sử dụng tài sản chung để giữ thống nhất.
- **TASK-04 — phần SV3:** thiết kế chi tiết Task Board, Internal Review, Feedback Summary AI-2, User Management, Project Settings và lỗi 403/404.
- Không thực hiện Client, Designer hoặc Brief Template Management của SV1/SV2.

## Thiết kế SV3 đã tạo ngày 12/10/2026

Đã thêm [UI Kit SV3](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=70-15) trong page `0:1`, root `70:15`; các component có ID `70:32`, `70:36`, `70:40`, `70:44`, `70:48`, `70:52`, `70:56`. Giữ nguyên tài sản chung cũ.

| Màn hình SV3 | Desktop | Mobile |
|---|---|---|
| Task Board | [Frame 71-10](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-10) | [Frame 71-397](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-397) |
| Internal Review | [Frame 71-102](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-102) | [Frame 71-446](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-446) |
| Feedback Summary AI-2 | [Frame 71-179](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-179) | [Frame 71-511](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-511) |
| User Management | [Frame 71-232](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-232) | [Frame 71-552](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-552) |
| Project Settings | [Frame 71-308](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-308) | [Frame 71-617](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-617) |
| Lỗi 403/404 | [Frame 71-365](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-365) | [Frame 71-664](https://www.figma.com/design/fQMvcuxxBcwUYAUv1D4YlT/CreatorStudio-UI-UX?node-id=71-664) |

Các frame có text chỉnh sửa được, SVG native và instance component. Đây là tài sản thiết kế đã tạo, chưa phải thiết kế đạt QA.

## Bằng chứng và trạng thái

**TASK-03/TASK-04 phần SV3: 🔴 Có lỗi / chưa hoàn thành.** Ảnh QA ban đầu desktop Task Board/Internal Review cho thấy chồng chữ do chiều cao container 40px và text sizing. Đã sửa desktop và kit; chưa chụp kiểm tra sau sửa. Mobile còn lỗi: lệnh sửa bị Figma MCP từ chối do giới hạn lượt gọi. Không gọi đây là lỗi đã sửa.

Chưa tạo wireframe SV3 riêng, trạng thái AI đầy đủ, prototype hay bản xuất SVG/PNG. Không có tệp export để dẫn link. Chưa có nhóm/giảng viên duyệt.

Xem `../docs/SV3-DESIGN-QA.md` và `../docs/TIEN-DO-SV3.md`. QA Figma không thay kiểm thử website bằng trình duyệt.

Cập nhật 12/10/2026: đọc Figma hoạt động nhưng lệnh chỉnh sửa vẫn bị rate limit. Chưa có sửa Figma mới hoặc export; các lỗi/giới hạn QA nêu trên vẫn còn.
