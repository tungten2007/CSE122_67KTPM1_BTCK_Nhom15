# Đối chiếu công việc SV2

Excel chốt người phụ trách từng màn hình. Bảng này đối chiếu phần việc SV2 với mã nguồn hiện có. Không thay đổi trạng thái Trello của nhóm.

| Thẻ Trello | Phần được bàn giao | Minh chứng trong repository |
| --- | --- | --- |
| Designer Dashboard | Thống kê, tìm/lọc/sắp xếp, thêm và hoàn thành công việc | `designer-dashboard.html`, CSS/JS cùng tên |
| Moodboard + AI-3 | Bảng màu, ảnh tham khảo, từ khóa; AI mô phỏng, sửa/áp dụng/từ chối, lỗi/thử lại | `designer-moodboard.html`, CSS/JS cùng tên |
| Version Management | Tạo/sửa phiên bản, mã tự tăng, checklist, nộp duyệt và lưu trữ | `designer-version-management.html`, CSS/JS cùng tên |
| Brief Template Management + Prompt AI-1 | Quản lý mẫu Brief, cấu hình Prompt và thử kết quả mô phỏng | `admin-brief-template-management.html`, CSS/JS cùng tên |
| Profile Management | Xem/sửa hồ sơ, avatar, validation và đổi mật khẩu demo | `profile.html`, CSS/JS cùng tên |
| Notifications Center | Lọc thông báo, đánh dấu đã đọc, xóa và mở liên kết | `notifications.html`, CSS/JS cùng tên |
| Kiến trúc JavaScript + Data/API | Tách dữ liệu giả lập, đọc/lưu LocalStorage và xử lý lỗi | `js/api.js`, `js/share.js`, `tests/shared-modules.cjs` |
| Responsive + Test SV2 | Responsive, validation, phân quyền và kiểm tra chức năng SV2 | `tests/verify.cjs`, `docs/test-client.md`, `docs/test-results.md` |
| [TASK-05 – Giao diện dùng chung](https://trello.com/c/Pri7hCRL) | Header/sidebar, role switcher, menu mobile và tiện ích form của bản SV2 | `js/share.js`, `css/share.css`; ghép SV1/SV3 ở bước tích hợp |
| [TASK-04 – High-Fidelity Mockup + Figma](https://trello.com/c/iWPjJUbG) | Desktop/mobile cho 6 trang SV2 và 2 trang hỗ trợ | `design/mockups/`, `design/figma-source/`; cần nhóm duyệt |
| [TASK-03 – Wireframe + UI Kit](https://trello.com/c/2glMZ7yV) | Wireframe 6 trang SV2 và ảnh UI Kit tham chiếu | `design/wireframes/`, `design/ui-kit-preview.jpg` |

Mã/link thẻ riêng SV2 chưa xác minh vì [Trello](https://trello.com/b/lYefCZHz) yêu cầu đăng nhập. Link TASK-03/04/05 lấy từ file mẫu SV1, thể hiện phần SV2 tham gia. `js/api.js` hiện dùng LocalStorage; chưa có endpoint MockAPI.io được xác minh.

## Các việc cần nhóm/sinh viên thực hiện

- Bổ sung mã TASK và link thẻ thật cho các phần việc SV2.
- Hoàn tất API MockAPI.io, tích hợp và kiểm tra thao tác đọc/ghi, xử lý lỗi.
- Xin nhóm duyệt Figma; thiết kế hiện có chưa chứng minh đã được duyệt.
- Ghép giao diện/dữ liệu với SV1/SV3; kiểm tra luồng Brief → Designer → Lead → Client.
- Review PR, merge theo quy trình nhóm; cập nhật Task ↔ Branch ↔ Commit/PR ↔ OBS.
- Quay 6 video OBS theo 6 màn hình SV2, có mặt sinh viên và chỉnh sửa trực tiếp.
- Chạy bổ sung Firefox/Safari và điện thoại thật khi có điều kiện.

Các công việc này cần sự tham gia thực tế của sinh viên/nhóm; chưa được đánh dấu hoàn thành bằng mã nguồn sinh tự động.
