# Screen Inventory — CreatorStudio, Nhóm 15

Cập nhật: **27/10/2026**. Đây là **bảng kiểm kê màn hình chung của cả 3 sinh viên**; không phải bảng xác nhận đã kiểm thử hoặc đã được duyệt thiết kế.

## Phạm vi và cách đọc

- Có **18 tệp HTML nghiệp vụ chính** và **3 tệp tiện ích**, tổng cộng **21 tệp HTML** trong html/sv1, html/sv2, html/sv3 và html/shared.
- Bảng nghiệp vụ có **19 dòng**: Phản hồi khách hàng là chế độ `view=feedback` của tệp Duyệt phiên bản, không phải tệp HTML thứ 19.
- Mỗi bảng giữ đúng **12 cột**: Role, User Goal, User Task, Screen, File, CRUD, States, AI, Assignee, Task ID, Branch, OBS.
- C/R/U/D tương ứng thêm/xem/sửa/xóa; các điều kiện khóa và thao tác nghiệp vụ ghi riêng. AI-1/2/3 đều là mô phỏng bằng quy tắc JavaScript.
- Assignee là phân công màn hình, không đồng nghĩa mọi màn trong thư mục chỉ cho một vai trò truy cập. SV2 còn làm mẫu Brief của Admin và trang dùng chung; SV3 còn làm nghiệp vụ Lead.
- Task ID kế thừa tài liệu phân công của nhóm; không tạo thêm Task ID cho chế độ Phản hồi. OBS đang hoãn, chưa điền link video.

## Tổng hợp phân công

| Sinh viên | Nhánh hiện tại | HTML chính | Phần việc |
|---|---|---:|---|
| SV1 | feature/sv1-client | 6 | Client, giới thiệu, đăng nhập/đăng ký; thêm chế độ Phản hồi trên trang phiên bản |
| SV2 | feature/sv2-designer | 6 | Designer, mẫu Brief của Admin, hồ sơ và thông báo |
| SV3 | feature/sv3-admin | 6 | Admin, Lead, trang lỗi 403/404; tiện ích role-preview tính riêng |

## SV1 — Khách hàng và các trang truy cập

| Role | User Goal | User Task | Screen | File | CRUD | States | AI | Assignee | Task ID | Branch | OBS |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Khách / Chung | Hiểu sản phẩm và chọn không gian phù hợp | Xem giới thiệu, menu nghiệp vụ và chọn vai trò | Trang chủ | [index.html](../html/sv1/index.html) | R | Normal; menu mở/đóng; responsive | — | SV1 | 22 | feature/sv1-client | Chưa quay |
| Client / Designer / Lead / Admin | Đăng nhập đúng tài khoản và vai trò | Chọn tài khoản demo hoặc nhập email/mật khẩu; vào trang theo vai trò | Đăng nhập | [login.html](../html/sv1/login.html) | R / Auth | Validation; sai thông tin; tài khoản khóa; đăng nhập thành công | — | SV1 | 23 | feature/sv1-client | Chưa quay |
| Khách | Tạo tài khoản khách hàng | Nhập thông tin, xác nhận mật khẩu và đăng ký | Đăng ký | [register.html](../html/sv1/register.html) | C user | Validation; email trùng; tạo tài khoản thành công | — | SV1 | 23/27 | feature/sv1-client | Chưa quay |
| Client | Quản lý các dự án của mình | Tạo, sửa, tìm, lọc, lưu trữ, khôi phục và xóa dự án đủ điều kiện | Tổng quan dự án | [client-project-overview.html](../html/sv1/client-project-overview.html) | C R U D + Archive / Restore | Normal; Empty; Validation; Success; Archived | — | SV1 | 08 | feature/sv1-client | Chưa quay |
| Client | Chuyển yêu cầu thành brief rõ ràng | Nhập mô tả, tạo gợi ý, sửa nội dung, chấp nhận/bỏ/tạo lại; lưu nháp và gửi brief | Creative Brief | [client-creative-brief.html](../html/sv1/client-creative-brief.html) | C R U + Submit | Draft; Submitted; AI Processing / Error / Result; Validation; Read-only | AI-1: Brief Structurer mô phỏng | SV1 | 06 | feature/sv1-client | Chưa quay |
| Client | Xem thiết kế và quyết định phiên bản | Chọn phiên bản; so sánh; ghim phản hồi; duyệt, yêu cầu sửa hoặc từ chối | Duyệt phiên bản | [client-review-versions.html](../html/sv1/client-review-versions.html) | R + C/U/D comment + Approve / Request Changes / Reject | Normal; Empty; Client Review; Approved; Changes Requested; Rejected; Archived | — | SV1 | 07 | feature/sv1-client | Chưa quay |
| Client | Gửi ý kiến để trưởng nhóm tiếp nhận | Chọn dự án/phiên bản đã chia sẻ, gửi phản hồi chung và xem lịch sử; trưởng nhóm nhận thông báo | Phản hồi khách hàng | [client-review-versions.html?view=feedback](../html/sv1/client-review-versions.html?view=feedback) | C R feedback | Normal; Empty; Validation; Success; dự án lưu trữ chỉ đọc; quyết định duyệt được giữ nguyên | — | SV1 | 07 | feature/sv1-client | Chưa quay |

## SV2 — Nhà thiết kế và các chức năng dùng chung

| Role | User Goal | User Task | Screen | File | CRUD | States | AI | Assignee | Task ID | Branch | OBS |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Designer | Theo dõi công việc được phân công | Xem tổng quan; tìm/lọc công việc; cập nhật trạng thái theo quyền | Bảng điều khiển nhà thiết kế | [designer-dashboard.html](../html/sv2/designer-dashboard.html) | R U task | Normal; Empty; Loading; Validation; Success; Read-only | — | SV2 | 10 | feature/sv2-designer | Chưa quay |
| Designer | Xây dựng định hướng hình ảnh | Tạo/sửa Moodboard, thêm/xóa thẻ ảnh, bảng màu và từ khóa; nhận gợi ý và chia sẻ | Moodboard | [designer-moodboard.html](../html/sv2/designer-moodboard.html) | C R U D thành phần + Share | Draft; Palette Ready; Shared; AI Processing / Error / Result; Empty; Read-only | AI-3: Mood Assistant mô phỏng | SV2 | 11 | feature/sv2-designer | Chưa quay |
| Designer | Quản lý các bản thiết kế và nộp duyệt | Tạo phiên bản, sửa/xóa bản nháp, nhập ảnh, kiểm tra nội dung, gửi duyệt và lưu trữ | Quản lý phiên bản | [designer-version-management.html](../html/sv2/designer-version-management.html) | C R U D draft + Submit / Archive | Draft; Internal Review; Client Review; Changes Requested; Approved; Archived; Validation | — | SV2 | 12 | feature/sv2-designer | Chưa quay |
| Admin | Quản lý mẫu brief và cấu hình gợi ý | Thêm/sửa mẫu; lọc; bật/tắt; xóa mẫu đủ điều kiện; sửa cấu hình prompt và xem gợi ý mô phỏng | Quản lý mẫu Brief và AI | [admin-brief-template-management.html](../html/sv2/admin-brief-template-management.html) | C R U D + Enable / Disable | Active Template; Inactive; Custom; Empty; Validation; xác nhận thao tác; Success | Cấu hình cho AI-1; không gọi LLM thật | SV2 | 18 | feature/sv2-designer | Chưa quay |
| Client / Designer / Lead / Admin | Cập nhật thông tin tài khoản | Xem/sửa hồ sơ và đổi mật khẩu demo | Hồ sơ cá nhân | [profile.html](../html/sv2/profile.html) | R U | Normal; Validation; Error; Success | — | SV2 | 24 | feature/sv2-designer | Chưa quay |
| Client / Designer / Lead / Admin | Biết các cập nhật cần xử lý | Xem/lọc thông báo; mở đúng nghiệp vụ; đánh dấu đã đọc và xóa thông báo | Thông báo | [notifications.html](../html/sv2/notifications.html) | R U D + Mark all read | Unread; Read; Empty; Filtered; Success | — | SV2 | 25 | feature/sv2-designer | Chưa quay |

## SV3 — Quản trị viên, trưởng nhóm và xử lý lỗi

| Role | User Goal | User Task | Screen | File | CRUD | States | AI | Assignee | Task ID | Branch | OBS |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Lead | Điều phối công việc trong dự án | Tạo/sửa, phân công, lọc/sắp xếp/phân trang; chuyển trạng thái; hủy có lý do, xóa việc đã hủy; duyệt/trả brief | Bảng công việc | [lead-task-board.html](../html/sv3/lead-task-board.html) | C R U + Move / Cancel + D cancelled | Todo; Doing; Review; Done; Cancelled; Empty; Validation; Success; Archived | — | SV3 | 15 | feature/sv3-admin | Chưa quay |
| Lead | Kiểm tra thiết kế trước khi gửi khách hàng | Chọn phiên bản; xem thiết kế/Moodboard; thêm/sửa/xử lý ghi chú; checklist; yêu cầu sửa hoặc chuyển khách | Duyệt nội bộ | [lead-internal-review.html](../html/sv3/lead-internal-review.html) | R + C/U note + Resolve + Pass / Rework | Internal Review; Changes Requested; Client Review; Empty; Validation; Read-only | — | SV3 | 16 | feature/sv3-admin | Chưa quay |
| Lead | Tiếp nhận phản hồi và chuyển thành việc cụ thể | Xem phản hồi khách hàng theo dự án/phiên bản; chọn phản hồi, tổng hợp, làm rõ/sửa/bỏ đề xuất và tạo công việc | Tổng hợp phản hồi | [lead-feedback-summary.html](../html/sv3/lead-feedback-summary.html) | R feedback + C/U/D proposal + Convert | Empty; Processing; Error; Ambiguous; Success; đề xuất đã chuyển task; Archived | AI-2: Feedback Summarizer mô phỏng | SV3 | 17 | feature/sv3-admin | Chưa quay |
| Admin | Quản lý thành viên và quyền truy cập | Tìm/lọc/sắp xếp/phân trang; thêm/sửa vai trò; khóa/mở khóa và xóa tài khoản đủ điều kiện | Quản lý người dùng | [admin-user-management.html](../html/sv3/admin-user-management.html) | C R U D + Lock / Unlock | Active; Locked; Empty; Validation; Confirm; Success; chặn tự khóa/xóa và dữ liệu liên kết | — | SV3 | 19 | feature/sv3-admin | Chưa quay |
| Admin | Thiết lập quy tắc và quản lý dự án | Sửa cảnh báo hạn/quy tắc phiên bản; thêm/sửa/xóa nhãn; lưu trữ dự án đủ điều kiện | Thiết lập dự án | [admin-project-settings.html](../html/sv3/admin-project-settings.html) | R U settings + C/U/D tag + Archive | Normal; Validation; Error; Confirm; Success; Archived / Read-only | — | SV3 | 20 | feature/sv3-admin | Chưa quay |
| Chung | Hiểu lỗi truy cập và quay lại đúng trang | Hiển thị 403/404; cung cấp đường quay lại theo vai trò | Trang lỗi 403/404 | [404.html](../html/sv3/404.html) | R / Error | 404; 403 qua code=403; sai vai trò; nút quay lại | — | SV3 | 26 | feature/sv3-admin | Chưa quay |

## Trang tiện ích — không cộng vào 18 tệp chính

| Tệp | Nơi lưu | Mục đích | Phụ trách |
|---|---|---|---|
| [role-preview.html](../html/sv3/role-preview.html) | html/sv3 | Xem trước không gian vai trò, hỗ trợ demo | SV3 |
| [BAT-DAU.html](../html/shared/BAT-DAU.html) | html/shared | Hướng dẫn mở và điều hướng bản bàn giao | Nhóm |
| [api-demo.html](../html/shared/api-demo.html) | html/shared | Demo REST API riêng với máy chủ Python; không thay Store của luồng nghiệp vụ | Nhóm |

## Luồng phản hồi giữa khách hàng và trưởng nhóm

Client chọn **Phản hồi** → chọn dự án và phiên bản đã chia sẻ → **Gửi phản hồi** → lưu trong Store chung và tạo thông báo cho Lead → Lead mở **Tổng hợp phản hồi** → xem nguồn theo phiên bản → tổng hợp AI-2 → làm rõ/sửa đề xuất → tạo công việc.

Phản hồi chung không đổi quyết định duyệt trước đó. Dự án lưu trữ và phiên bản chưa chia sẻ không nhận phản hồi mới. Quy tắc duyệt/ghim/sửa lịch sử có thể khác quy tắc gửi phản hồi chung.

## Thư mục mã nguồn tương ứng

| Phần việc | HTML | CSS | JavaScript |
|---|---|---|---|
| SV1 | [html/sv1](../html/sv1/) | [css/sv1](../css/sv1/) | [js/sv1](../js/sv1/) |
| SV2 | [html/sv2](../html/sv2/) | [css/sv2](../css/sv2/) | [js/sv2](../js/sv2/) |
| SV3 | [html/sv3](../html/sv3/) | [css/sv3](../css/sv3/) | [js/sv3](../js/sv3/) |
| Dùng chung | [html/shared](../html/shared/) | [css/shared](../css/shared/) | [js/shared](../js/shared/) |

## Tài liệu liên quan

- [Chỉ mục docs](README.md), [phân công](team-assignment.md), [cấu trúc mã nguồn](FILE-STRUCTURE.md).
- [User flow](01-gatekeeper/user-flow.md), [design system](01-gatekeeper/design-system.md), [chỉ mục minh chứng](01-gatekeeper/evidence-index.md).
- [Tài liệu SV1](submission-sv1/), [tài liệu SV2](submission-sv2/), [tiến độ SV3](TIEN-DO-SV3.md).
- [Nhật ký thay đổi](THAY-DOI-V2.md). Link Figma được duyệt và link OBS thật phải cập nhật theo minh chứng của nhóm; không suy ra từ việc có code.
