# Kiểm kê màn hình SV1

| Màn hình              | File                           | Nghiệp vụ                                                    | Trạng thái đã có                                                                                  | Người phụ trách theo Excel |
| --------------------- | ------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- | -------------------------- |
| Landing Portal        | `index.html`                   | Giới thiệu, module AI, demo 4 vai trò                        | Public View, Interactive Demo                                                                     | SV1                        |
| Login & Demo Switcher | `login.html`                   | Email/password demo, chọn vai trò, ghi nhớ vai trò           | Normal, Validating, Error, Success                                                                | SV1                        |
| Project Overview      | `client-project-overview.html` | Tạo/sửa/xóa, tìm kiếm/lọc, archive/restore, tiến độ và brief | Loading, Load Error/Retry, Empty, Active, In Review, Completed, Archived                          | SV1                        |
| Creative Brief        | `client-creative-brief.html`   | Brief 5 phần, ngân sách/deadline, AI-1, save/submit          | No Project, Draft, Processing, Result, Uncertain, Invalid, Accepted, Submitted, Read-only         | SV1                        |
| Review Versions       | `client-review-versions.html`  | Song song/slider, pin comment, review, lý do từ chối         | No Project, No Version, Client Review, Changes Requested, Approved, Rejected, Archived, Read-only | SV1                        |

HTML/CSS/JS của mỗi trang được tách riêng. Header, sidebar, avatar, role switcher, chuông hoạt động, toast và modal dùng chung. Menu hiện đúng trang đang mở; điều hướng Client giữ mã dự án đang chọn. Các trang có skip link, label biểu mẫu, focus hiển thị, dialog bàn phím và responsive.

Trong phần SV1, lỗi phân quyền 403 được hiển thị trong khung trang hiện tại. Trang lỗi độc lập `404.html`, Profile và Notifications thuộc SV2/SV3 theo Excel. Trang register/forgot-password/settings là tùy chọn của README, không có nhiệm vụ riêng cho SV1 trong bảng phân công và không thuộc bộ này.

Trạng thái `Submitted` là trạng thái brief, không thay thế trạng thái project/version. Dự án mới chưa có version: cần tiếp tục qua luồng Designer/Lead ở bước tích hợp nhóm.
