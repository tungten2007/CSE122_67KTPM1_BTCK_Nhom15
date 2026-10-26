# QA web hiện hành — 26/10/2026

Được chạy trên mã nguồn sau a2da7b3 với thay đổi tương phản/nhãn/moodboard của đợt này. [Kết quả JSON](report.json). Edge 156.0.4314.42, ngữ cảnh LocalStorage riêng, dữ liệu demo mới.

- 18 màn chính và một lượt 403 riêng: 19 lượt xem.
- Tràn ngang: 19 × 8 độ rộng (320, 375, 390, 720, 768, 1024, 1280, 1440), không phát hiện tràn.
- Tương phản chữ trên nền đơn sắc: 19 × 2 độ rộng (1440, 375), không còn trường hợp dưới ngưỡng tính được. Còn 26 lượt phần tử có nền ảnh/gradient chưa đo được; không kết luận toàn bộ tương phản đạt.
- DOM ở 1440px: mỗi trang một main/h1, có lang/title; không ID trùng, ô nhập thiếu tên, ảnh thiếu alt hoặc nút/link hiển thị không có tên.
- Không pageerror, console error hoặc HTTP lỗi trong các lượt đã chạy.
- Hồi quy sau sửa: Node 11/11 tệp, kiểm tra bundle, browser-final-v5 24 kiểm tra, browser-task27 57 kiểm tra đều đạt. Phạm vi luồng phiên bản vẫn có bước dựng dữ liệu qua Store, chưa chứng minh thao tác Designer hoàn toàn bằng UI.

Đây là bộ kiểm tra tự viết, chưa phải axe/W3C/Lighthouse hay chứng nhận WCAG. Chỉ kiểm tra trạng thái trang đã tải, chưa bao phủ mọi modal, trạng thái lỗi, zoom hoặc thiết bị thật.

## Chạy lại

Từ Project_nhom15: `node tests/audit-web.cjs` với Playwright đã có trong NODE_PATH; đặt CHROMIUM_EXECUTABLE_PATH tới Edge/Chromium nếu cần. QA_OUTPUT_DIR chọn nơi ghi report; mặc định thư mục tạm creatorstudio-web-audit. QA_SCREENSHOTS=1 bật chụp ảnh. Mã thoát khác 0 khi có phát hiện được kiểm tra.

## Ảnh từ lượt kiểm tra

39 PNG: 19 lượt × desktop/mobile, thêm Moodboard 768px. Đây là ảnh trang chạy, không thay thế bản thiết kế Figma được duyệt.

| Màn/lượt | Desktop | Mobile |
|---|---|---|
| landing | [1440px](screenshots/landing-1440.png) | [375px](screenshots/landing-375.png) |
| login | [1440px](screenshots/login-1440.png) | [375px](screenshots/login-375.png) |
| register | [1440px](screenshots/register-1440.png) | [375px](screenshots/register-375.png) |
| error-404 | [1440px](screenshots/error-404-1440.png) | [375px](screenshots/error-404-375.png) |
| profile | [1440px](screenshots/profile-1440.png) | [375px](screenshots/profile-375.png) |
| notifications | [1440px](screenshots/notifications-1440.png) | [375px](screenshots/notifications-375.png) |
| client-project-overview | [1440px](screenshots/client-project-overview-1440.png) | [375px](screenshots/client-project-overview-375.png) |
| client-creative-brief | [1440px](screenshots/client-creative-brief-1440.png) | [375px](screenshots/client-creative-brief-375.png) |
| client-review-versions | [1440px](screenshots/client-review-versions-1440.png) | [375px](screenshots/client-review-versions-375.png) |
| designer-dashboard | [1440px](screenshots/designer-dashboard-1440.png) | [375px](screenshots/designer-dashboard-375.png) |
| designer-moodboard | [1440px](screenshots/designer-moodboard-1440.png) | [375px](screenshots/designer-moodboard-375.png) |
| designer-version-management | [1440px](screenshots/designer-version-management-1440.png) | [375px](screenshots/designer-version-management-375.png) |
| lead-task-board | [1440px](screenshots/lead-task-board-1440.png) | [375px](screenshots/lead-task-board-375.png) |
| lead-internal-review | [1440px](screenshots/lead-internal-review-1440.png) | [375px](screenshots/lead-internal-review-375.png) |
| lead-feedback-summary | [1440px](screenshots/lead-feedback-summary-1440.png) | [375px](screenshots/lead-feedback-summary-375.png) |
| admin-brief-template-management | [1440px](screenshots/admin-brief-template-management-1440.png) | [375px](screenshots/admin-brief-template-management-375.png) |
| admin-user-management | [1440px](screenshots/admin-user-management-1440.png) | [375px](screenshots/admin-user-management-375.png) |
| admin-project-settings | [1440px](screenshots/admin-project-settings-1440.png) | [375px](screenshots/admin-project-settings-375.png) |
| error-403 | [1440px](screenshots/error-403-1440.png) | [375px](screenshots/error-403-375.png) |

[Ảnh hồi quy Moodboard 768px](screenshots/designer-moodboard-768.png).
