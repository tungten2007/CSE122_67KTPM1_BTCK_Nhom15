# Đối chiếu công việc SV1

Excel chốt người phụ trách từng màn hình. Trello chứa cả thẻ cũ và thẻ mới trùng mã; bảng này dùng các thẻ có tên chức năng cụ thể. Không thay đổi trạng thái Trello của nhóm.

| Thẻ Trello                                                                                                       | Phần được bàn giao                                                          | Minh chứng trong repository                                                      |
| ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| [TASK-06 – Creative Brief + AI Brief Structurer](https://trello.com/c/QkvbkYkl)                                  | Creative Brief + AI-1, save/submit và quyền sửa/từ chối                     | `client-creative-brief.html`, CSS/JS cùng tên                                    |
| [TASK-07 – Review Versions: Slider + Pin Comment + Approve/Request Changes](https://trello.com/c/KojPH5rk)       | Slider/song song, pin comment, approve/request changes/reject               | `client-review-versions.html`, CSS/JS cùng tên                                   |
| [TASK-08 – Project Overview](https://trello.com/c/qCrUJZcT)                                                      | CRUD/Archive, search/filter, tiến độ và brief                               | `client-project-overview.html`, CSS/JS cùng tên                                  |
| [TASK-09 – Responsive + Test Client](https://trello.com/c/ZUsKm3Sd)                                              | Responsive và kiểm tra Client                                               | `tests/sv1.e2e.cjs`, `docs/test-client.md`                                       |
| [TASK-22 – Landing Page (index.html)](https://trello.com/c/rYu5Zfa6)                                             | Landing và demo vai trò                                                     | `index.html`, `css/index.css`, `js/index.js`                                     |
| [TASK-23 – Login + Demo Role Switcher (login.html)](https://trello.com/c/clyywtWd)                               | Login validation + 4 vai trò demo                                           | `login.html`, `css/login.css`, `js/login.js`                                     |
| [TASK-05 – Giao diện dùng chung: Navbar + Sidebar + Role Switcher + CSS/JS chung](https://trello.com/c/Pri7hCRL) | Header/sidebar/active nav, avatar/bell, role memory, mobile Escape/backdrop | `js/shared.js`, `css/shared.css`; panel 403 cục bộ; ghép SV2/SV3 ở bước tích hợp |
| [TASK-04 – High-Fidelity Mockup 17 màn hình + duyệt Figma](https://trello.com/c/iWPjJUbG)                        | Ảnh desktop/mobile của 5 trang SV1                                          | `design/mockups/`; cần nhập Figma và nhóm duyệt                                  |
| [TASK-03 – Wireframe + UI Kit trên Figma](https://trello.com/c/2glMZ7yV)                                         | Wireframe/UI Kit tham chiếu                                                 | `design/ui-kit.svg`, `design/wireframes/`, `css/tokens.css`                      |

## Các việc cần nhóm/sinh viên thực hiện

- Nhập SVG và ảnh vào Figma, sửa theo bản thiết kế chính thức và xin nhóm duyệt. Các file tham chiếu chưa chứng minh Figma đã được duyệt.
- Ghép header/điều hướng và dữ liệu vào các trang SV2/SV3; kiểm tra gửi brief → Designer/Lead → phiên bản mới → Client.
- Review PR của thành viên khác, tạo/duyệt PR và merge theo quy trình nhóm.
- Quay 5 video OBS theo 5 trang, có mặt sinh viên và chỉnh sửa trực tiếp; cập nhật Task ↔ Branch ↔ Commit/PR ↔ OBS.
- Chạy bổ sung Firefox/Safari khi có thiết bị/trình duyệt phù hợp.

Các công việc này cần sự tham gia thực tế của sinh viên/nhóm; chưa được đánh dấu hoàn thành bằng mã nguồn sinh tự động.
