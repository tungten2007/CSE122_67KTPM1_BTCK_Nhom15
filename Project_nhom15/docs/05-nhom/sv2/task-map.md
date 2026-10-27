# Đối chiếu công việc SV2

Excel chốt người phụ trách từng màn hình. Không thay đổi trạng thái Trello của nhóm. Mã/link thẻ riêng SV2 chưa được xác minh.

| Thẻ Trello | Phần được bàn giao | Minh chứng trong repository |
| --- | --- | --- |
| Designer Dashboard | Thống kê, tìm/lọc/sắp xếp, thêm và hoàn thành công việc | `html/sv2/designer-dashboard.html`, CSS/JS cùng tên trong `css/sv2`, `js/sv2` |
| Moodboard + AI-3 | Màu, ảnh, từ khóa; AI mô phỏng, sửa/áp dụng/từ chối, lỗi/thử lại | `html/sv2/designer-moodboard.html`, CSS/JS cùng tên |
| Version Management | Tạo/sửa, mã tự tăng, checklist, nộp duyệt cho Lead và nhận phản hồi | `html/sv2/designer-version-management.html`, CSS/JS cùng tên |
| Brief Template Management | Mẫu Brief và cấu hình Prompt dùng chung với Client | `html/sv2/admin-brief-template-management.html`, CSS/JS cùng tên |
| Profile Management | Hồ sơ, avatar, validation và mật khẩu demo | `html/sv2/profile.html`, CSS/JS cùng tên |
| Notifications Center | Hộp thư riêng, đọc/xóa và link đúng dự án/phiên bản | `html/sv2/notifications.html`, CSS/JS cùng tên |
| Kiến trúc JavaScript + Data/API | Adapter SV2 dùng Store của nhóm và một khóa LocalStorage | `js/sv2/api.js`, `js/sv2/share.js`, `js/shared/store.js` |
| Responsive + Test SV2 | Kiểm tra tự động và trên trình duyệt; luồng SV2 → SV3 | `tests/sv2-linked.test.cjs`, `docs/05-nhom/sv2/integration.md` |
| [TASK-05 – Giao diện dùng chung](https://trello.com/c/Pri7hCRL) | Menu theo vai trò, tài khoản, dự án, hồ sơ/thông báo dùng chung | `js/shared/modules/navigation.js`, `js/sv2/share.js`, `css/sv2/share.css` |
| [TASK-04 – Mockup + Figma](https://trello.com/c/iWPjJUbG) | Thiết kế desktop/mobile; cần nhóm duyệt | `figma-canva/sv2/figma-source/`, `figma-canva/sv2/mockups/` |
| [TASK-03 – Wireframe + UI Kit](https://trello.com/c/2glMZ7yV) | Wireframe 6 trang và ảnh UI Kit | `figma-canva/sv2/wireframes/`, `figma-canva/sv2/ui-kit-preview.jpg` |

## Các việc cần nhóm/sinh viên thực hiện

- Xác minh mã/link thẻ, duyệt thiết kế, review PR và quay 6 video OBS cho 6 màn hình SV2.
- Kiểm tra thêm trên Firefox/Safari và điện thoại thật.
- LocalStorage dùng chung trên cùng origin; nếu cần nhiều máy cùng làm việc phải bổ sung backend đồng bộ dữ liệu.

Link TASK-03/04/05 lấy từ mẫu SV1, ghi phần tham gia của SV2. Minh chứng mã nguồn không tự xác nhận Trello DONE hoặc PR đã merge.
