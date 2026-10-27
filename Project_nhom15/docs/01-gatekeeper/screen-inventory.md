# Kiểm kê màn hình — CreatorStudio (Nhóm 15)

Tài liệu này là bảng kiểm kê chuẩn cho 18 màn hình chính, dùng để đối chiếu với barem mục 1 (kiểm kê màn hình 12 cột + user flow + Figma). Bảng chỉ ghi những gì **đã có trong code hiện tại**; ô nào chưa có ghi rõ `Chưa quay`, `Chưa có` hoặc `—`, không suy đoán.

- Phiên bản code đối chiếu: dev/feature/sv3 tại cc9a38d. Cột Branch ghi nhánh phân công lịch sử; không chứng minh trạng thái remote hiện hành.
- Ngày rà soát: 2026-10-26.
- Quy ước CRUD: **C** Create, **R** Read, **U** Update, **D** Delete. Các thao tác nghiệp vụ khác ghi rõ (Archive, Lock, Submit, Cancel…).
- Cột **OBS** ghi trạng thái quay video thực tế. Toàn bộ đang là `Chưa quay` — nhóm cập nhật link sau khi quay, không điền trước.

## Bảng kiểm kê 12 cột

| Role | User Goal | User Task | Screen | File | CRUD | States | AI | Assignee | Task ID | Branch | OBS |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Client | Nắm toàn bộ dự án và tiến độ để quyết định bước tiếp theo | Tạo/sửa/lưu trữ/khôi phục/xóa dự án; tìm kiếm; lọc theo trạng thái | Tổng quan dự án | [client-project-overview.html](../../html/sv1/client-project-overview.html) | C R U D + Archive/Restore | Normal; Empty (không có dự án hoặc bộ lọc không khớp, có nút xóa lọc); Validation (tên/mô tả trống); Success (toast); Archived (chỉ đọc); không có Loading | — | SV1 | 08 | `feature/sv1-creatorstudio` | Chưa quay |
| Client | Chuyển ý tưởng thô thành brief đủ 5 phần để đội ngũ hiểu đúng | Nhập mô tả; tạo gợi ý AI-1; sửa 5 phần; chấp nhận; lưu nháp; gửi brief | Creative Brief | [client-creative-brief.html](../../html/sv1/client-creative-brief.html) | C R U + Submit (không có D) | Normal; AI Processing (700 ms); AI Failure/Uncertainty (mô tả ≤ 20 ký tự, cảnh báo đối tượng/ngân sách chưa rõ); Result + Explanation; Accept/Edit/Reject/Regenerate; Validation (5 phần, ngân sách, hạn); Draft/Submitted; Archived (chỉ đọc); Empty (dự án không tồn tại) | AI-1 (dùng cấu trúc mẫu Brief Active) | SV1 | 06 | `feature/sv1-creatorstudio` | Chưa quay |
| Client | Xem thiết kế và phản hồi đúng vị trí trước khi duyệt | So sánh phiên bản; ghim/sửa/xóa/đánh dấu phản hồi; duyệt; yêu cầu sửa; từ chối kèm lý do | Duyệt phiên bản | [client-review-versions.html](../../html/sv1/client-review-versions.html) | R + C/U/D comment + Resolve + Approve/Request Changes/Reject | Normal; Empty (chưa có phiên bản, có link sang brief); Locked/Read-only (Archived hoặc không phải Client Review); Compare side-by-side/slider; Validation (lý do từ chối ≥ 10 ký tự); Success (toast); dự án không tồn tại | — | SV1 | 07 | `feature/sv1-creatorstudio` | Chưa quay |
| Designer | Biết việc được giao, mức ưu tiên và hạn để xử lý đúng thứ tự | Tìm/lọc công việc; đổi trạng thái việc được giao; mở chi tiết | Dashboard Designer | [designer-dashboard.html](../../html/sv2/designer-dashboard.html) | R U (trạng thái công việc) | Normal; Loading (skeleton); Empty (không có việc hoặc bộ lọc không khớp); Urgent (việc gần hạn); Success (toast); chưa có Error state riêng | — | SV2 | 10 | `feature/sv2-creatorstudio-review` | Chưa quay |
| Designer | Khám phá hướng hình ảnh và chốt palette/từ khóa cho dự án | Thêm/xóa thẻ moodboard; thêm/xóa màu, từ khóa; dùng AI-3 gợi ý palette; áp dụng hoặc tự nhập | Moodboard | [designer-moodboard.html](../../html/sv2/designer-moodboard.html) | C R U D (thẻ, màu, từ khóa) + AI Apply | Normal; AI Processing (skeleton); AI Failure (giả lập + thử lại); Result + Explanation; Accept/Reject; Validation; Empty; Manual fallback; Draft/Palette Ready/Shared | AI-3 | SV2 | 11 | `feature/sv2-creatorstudio-review` | Chưa quay |
| Designer | Quản lý vòng đời phiên bản thiết kế và gửi duyệt đúng quy trình | Tạo/tải ảnh; sửa nháp; nộp duyệt; lưu trữ; xóa nháp | Quản lý phiên bản | [designer-version-management.html](../../html/sv2/designer-version-management.html) | C R U D (chỉ Draft) + Submit + Archive | Normal; Empty (chưa có phiên bản); Validation (ảnh/trường bắt buộc); Loading ảnh; Error đọc ảnh; Success (toast); Draft/Internal Review/Client Review/Changes Requested/Approved/Archived | — | SV2 | 12 | `feature/sv2-creatorstudio-review` | Chưa quay |
| Lead | Điều phối công việc theo cột và theo người phụ trách | Tạo/sửa công việc; kéo thả hoặc đổi trạng thái; hủy/xóa việc đã hủy; duyệt/trả brief; xem hoạt động | Bảng công việc | [lead-task-board.html](../../html/sv3/lead-task-board.html) | C R U + Move + Cancel + D (chỉ việc đã hủy) | Normal; Empty (cột trống hoặc bộ lọc không khớp); Cancelled (cột riêng, lý do không rỗng, tối đa 500 ký tự trên form); Validation (tên 3–120, người phụ trách, hạn); Success (toast); Archived (chỉ đọc); Mobile tabs; Sort 3 kiểu; Reset; đếm X/Y; Phân trang chung 6 việc/trang; chưa có Loading | — | SV3 | 15 | `feature/sv3` | Chưa quay |
| Lead | Kiểm soát chất lượng nội bộ trước khi gửi khách | Xem phiên bản; ghim/sửa/đánh dấu ghi chú; tick checklist; yêu cầu sửa; chuyển khách hàng | Duyệt nội bộ | [lead-internal-review.html](../../html/sv3/lead-internal-review.html) | R + C/U note + Resolve + Pass/Rework (chưa có D note) | Normal; Empty (chưa có phiên bản/ghi chú); Validation (ghi chú ≥ 3, lý do sửa ≥ 8); Success; Read-only khi phiên bản không còn editable; Empty artwork; checklist chặn chuyển khách | — | SV3 | 16 | `feature/sv3` | Chưa quay |
| Lead | Biến phản hồi khách hàng thành công việc cụ thể, có người chịu trách nhiệm | Chọn phản hồi; tổng hợp AI-2; sửa/bỏ đề xuất; làm rõ phản hồi mơ hồ; tạo công việc | Tổng hợp phản hồi | [lead-feedback-summary.html](../../html/sv3/lead-feedback-summary.html) | R + C/U/D proposal + Convert + Discard + C comment | Normal; Processing (spinner); Error (chưa chọn phản hồi, còn đề xuất chưa xử lý, AI thất bại giả lập); Empty; Ambiguous (bắt buộc làm rõ); Success; Read-only khi dự án lưu trữ | AI-2 | SV3 | 17 | `feature/sv3` | Chưa quay |
| Admin | Chuẩn hóa brief và prompt AI-1 theo loại dự án | Xem/lọc/tìm mẫu; chọn mẫu; thêm mẫu; sửa prompt; bật/tắt mẫu; xóa mẫu đã tắt | Quản lý mẫu Brief | [admin-brief-template-management.html](../../html/sv2/admin-brief-template-management.html) | C R U + Enable/Disable + D (chỉ mẫu Inactive) | Normal; Filter/Search cập nhật khi nhập; Empty (lọc không khớp); Validation (tên ≥ 3, prompt ≥ 10); Success (toast); confirm khi xóa mẫu; có confirm khi tắt mẫu | — | SV2 | 18 | `feature/sv2-creatorstudio-review` | Chưa quay |
| Admin | Quản lý thành viên, vai trò và quyền truy cập | Tìm/lọc; thêm/sửa người dùng; khóa/mở khóa; xóa khi không còn dữ liệu liên kết; phân trang | Quản lý người dùng | [admin-user-management.html](../../html/sv3/admin-user-management.html) | C R U + Lock/Unlock + D (chặn tự xóa, Admin cuối, dữ liệu liên kết) | Normal; Empty (tìm không thấy); Validation (tên 2–80, email, vai trò); Success (toast); Sort 3 kiểu; Reset; Debounce; phân trang 6/trang; chặn tự khóa và khóa Admin cuối | — | SV3 | 19 | `feature/sv3` | Chưa quay |
| Admin | Cấu hình quy tắc studio, nhãn dự án và lưu trữ dự án | Sửa cảnh báo hạn/version pattern/require review; thêm/sửa/xóa nhãn; lưu trữ dự án có xác nhận tên | Cài đặt dự án | [admin-project-settings.html](../../html/sv3/admin-project-settings.html) | R U + C/U/D tag + Archive | Normal; Validation (pattern/số ngày); Error inline; Success (`Đã lưu thành công` + toast); Archived read-only; confirm nhập tên dự án | — | SV3 | 20 | `feature/sv3` | Chưa quay |
| Khách/Chung | Hiểu sản phẩm và vào đúng vai trò | Đọc giới thiệu; mở menu; chọn vai trò demo | Landing | [index.html](../../html/sv1/index.html) | R | Normal; Responsive menu; role cards; không có form/CRUD | — | SV1 | 22 | `feature/sv1-creatorstudio` | Chưa quay |
| Chung | Vào đúng tài khoản demo để sử dụng hệ thống | Chọn tài khoản/vai trò; đăng nhập; đăng xuất | Đăng nhập | [login.html](../../html/sv1/login.html) | R/Auth | Normal; Validation (email/mật khẩu); Error (sai tài khoản, tài khoản bị khóa); Success (chuyển trang theo vai trò); không có backend thật | — | SV1 | 23 | `feature/sv1-creatorstudio` | Chưa quay |
| Khách | Tự tạo tài khoản Client mới | Nhập tên/email/mật khẩu; xác nhận mật khẩu; đăng ký | Đăng ký | [register.html](../../html/sv1/register.html) | C user | Normal; Validation (email, mật khẩu ≥ 6, xác nhận khớp); Error (email trùng); Success (tạo tài khoản + chuyển trang); không gửi email thật | — | Nhóm (tích hợp) | 23/27 | `feature/task27-integration-v1` | Chưa quay |
| Chung | Cập nhật thông tin cá nhân và mật khẩu demo | Xem/sửa hồ sơ; đổi mật khẩu demo | Hồ sơ | [profile.html](../../html/sv2/profile.html) | R U | Normal; Validation (mật khẩu hiện tại/mới/xác nhận); Error inline; Success notice; Read-only khi tài khoản bị khóa | — | SV2 | 24 | `feature/sv2-creatorstudio-review` | Chưa quay |
| Chung | Nắm thay đổi liên quan và xử lý nhanh | Lọc tất cả/chưa đọc/loại; lọc theo dự án; đọc; đánh dấu tất cả đã đọc; xóa | Thông báo | [notifications.html](../../html/sv2/notifications.html) | R U (read) D + Mark all | Normal; Empty (hộp thư trống); Filters; Unread badge; Success (toast); không có phân trang | — | SV2 | 25 | `feature/sv2-creatorstudio-review` | Chưa quay |
| Chung | Hiểu vì sao bị chặn và quay lại đúng nơi | Xem thông điệp 403/404; quay lại trang phù hợp vai trò | Lỗi 403/404 | [404.html](../../html/sv3/404.html) | R/Error | 404 (không tồn tại); 403 (`?code=403`, sai vai trò); nút quay lại theo phiên; không lộ dữ liệu | — | SV3 | 26 | `feature/sv3` | Chưa quay |

## Trạng thái dùng chung

Các trạng thái dưới đây đã có trong code và có thể dùng khi demo/đối chiếu; không màn nào được tuyên bố có đủ mọi trạng thái.

| Trạng thái | Nơi có | Cách kiểm chứng |
|---|---|---|
| Normal | Tất cả màn hình | Mở bằng tài khoản demo đúng vai trò |
| Loading | Designer Dashboard (skeleton), AI-1 (700 ms), AI-2 (spinner), AI-3 (skeleton) | Bấm nút AI hoặc chọn chế độ Loading ở Dashboard |
| Empty | Project Overview, Review Versions, Task Board, Internal Review, Feedback Summary, Version Management, Notifications, Admin Users | Xóa bộ lọc/dùng dự án không có dữ liệu |
| Error/Validation | Login, Register, Profile, Brief, Review, Task, Note, User, Settings, Feedback Summary | Gửi form thiếu/sai; chọn AI-2 khi chưa chọn phản hồi; bật “thử AI thất bại” |
| Success | Các form và thao tác ghi dữ liệu | Toast/notice sau khi lưu |
| Pending | Brief (Draft/Submitted), Version (Internal/Client Review/Changes Requested), Task (todo/doing/review) | Đổi trạng thái và F5 |
| Cancelled | Lead Task Board: hủy có lý do, cột Đã hủy, chỉ xóa vĩnh viễn việc đã hủy | Duyệt brief → mở một việc → “Hủy công việc” → nhập lý do không rỗng → kiểm tra cột Đã hủy và nút Xóa |
| Archived/Read-only | Project, Version, Brief, Task Board, Internal Review | Lưu trữ dự án ở Admin Settings rồi mở lại |
| Locked/Disabled | User Management (khóa tài khoản), Review (phiên bản đã kết thúc) | Khóa user; duyệt/từ chối phiên bản rồi mở lại |

## Ghi chú phạm vi

- 18 màn hình chính kể trên là phạm vi barem. Ngoài ra có các trang tiện ích **không tính vào 18**:
  - [role-preview.html](../../html/sv3/role-preview.html) — xem nhanh giao diện 4 vai trò (Task 05, hỗ trợ demo).
  - [BAT-DAU.html](../../html/shared/BAT-DAU.html) — trang bắt đầu/điều hướng nội bộ.
  - [api-demo.html](../../html/shared/api-demo.html) — demo REST API độc lập (fetch + mock server), **không** nối vào Store/localStorage và không phải màn hình nghiệp vụ chính.
- `forgot-password.html` chưa triển khai; đăng nhập là demo, không có backend.
- Các khoảng trống P1 đã xử lý trong bản hiện tại: Task có Cancel/Delete; User/Template có Delete; Task Board/User List có Sort/Reset/Debounce; AI-1 đọc mẫu Brief từ Admin; 403/404 trả đúng trang theo vai trò. Ghi chú còn lại: Internal Review chưa có xóa ghi chú (chỉ sửa/đánh dấu xử lý); Admin Template có confirm khi tắt mẫu.
- Seed hiện tại: **15 user** (14 Active/1 Locked) và **15 task** (7 done, 2 cancelled); Admin Users có 3 trang, Task Board có cột Đã hủy. Versions (3) và notifications (5) vẫn ít hơn 15 bản ghi — không tuyên bố mọi entity đều đạt 15–25.
- Kết quả và giới hạn các lượt chạy hiện hành: [evidence-index](evidence-index.md). Ảnh local chưa phải bộ ảnh public đầy đủ.
- Cột OBS chỉ được đổi sang `Đã quay` khi có video thật; link lưu trong `evidence-index.md`, không ghi link giả.

## Liên kết

- [User flow & ma trận trạng thái](user-flow.md)
- [Design system trích từ code](design-system.md)
- [Đối chiếu Figma](figma-audit.md)
- [Danh sách màn hình rút gọn](../screen-list.md)
