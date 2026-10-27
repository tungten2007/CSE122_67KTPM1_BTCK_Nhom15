# CreatorStudio — CSE122, Nhóm 15

Frontend quản lý dự án sáng tạo, từ brief đến bàn giao phiên bản. Tài liệu cập nhật theo bản dev ngày 26/10/2026.

## 1. Giới thiệu

CreatorStudio tập trung yêu cầu khách hàng, công việc, moodboard, phiên bản và phản hồi vào một website. Đây là bài tập frontend dùng dữ liệu mô phỏng trên trình duyệt.

## 2. Vai trò

| Vai trò | Công việc chính | Trang vào |
|---|---|---|
| Client | Tạo dự án, gửi brief, nhận xét/duyệt phiên bản | [Dự án](Project_nhom15/html/sv1/client-project-overview.html) |
| Designer | Quản lý việc được giao, moodboard, phiên bản | [Dashboard](Project_nhom15/html/sv2/designer-dashboard.html) |
| Lead | Duyệt brief, giao việc, duyệt nội bộ, tổng hợp phản hồi | [Bảng công việc](Project_nhom15/html/sv3/lead-task-board.html) |
| Admin | Người dùng, mẫu brief, quy tắc và lưu trữ | [Người dùng](Project_nhom15/html/sv3/admin-user-management.html) |

## 3. Luồng nghiệp vụ

Client tạo dự án và gửi brief → Lead duyệt, giao việc → Designer làm moodboard và nộp phiên bản → Lead duyệt nội bộ → Client nhận xét, yêu cầu sửa hoặc phê duyệt → hoàn thiện và lưu trữ.

Chi tiết: [user-flow](Project_nhom15/docs/01-gatekeeper/user-flow.md).

## 4. Màn hình

Có **21 tệp HTML: 18 màn chính và 3 trang tiện ích** (BAT-DAU, api-demo, role-preview). Trang 404 dùng cho cả 403 và 404.

[Bảng kiểm kê](Project_nhom15/docs/screen-inventory.md) gồm 12 cột nghiệp vụ, phân công theo SV1/SV2/SV3. Giao diện đã chạy được không thay thế bằng chứng thiết kế Figma được duyệt.

## 5. Chức năng

- Quản lý dự án/brief, nhận xét và quyết định phiên bản.
- Designer quản lý moodboard, bảng màu và phiên bản theo quyền sở hữu.
- Lead tạo/sửa/chuyển/hủy công việc có lý do; chỉ xóa việc đã hủy theo guard dữ liệu.
- Admin quản lý user, khóa/mở khóa, xóa user chưa có dữ liệu liên kết; mẫu brief Active/Inactive và xóa có xác nhận.
- Hồ sơ, mật khẩu demo, thông báo, điều hướng trong cùng document và trang lỗi.

## 6. Ba AI mô phỏng

| Tính năng | Đầu vào/kết quả | Người dùng quyết định |
|---|---|---|
| AI-1 Brief Structurer | Mô tả → 5 phần brief theo mẫu Active | Sửa, tạo lại, bỏ, chấp nhận và lưu/gửi |
| AI-2 Feedback Summarizer | Phản hồi được chọn → đề xuất công việc có nguồn | Làm rõ, sửa, bỏ và chuyển thành task |
| AI-3 Mood Assistant | Định hướng → từ khóa/bảng màu | Sửa, chấp nhận hoặc tự nhập |

Các tính năng dùng quy tắc JavaScript; không gọi LLM ngoài. Với AI-1, cấu hình mẫu cung cấp ngành hàng/các mục; prompt không được thực thi như lệnh cho mô hình ngôn ngữ.

## 7. Công nghệ và lưu trữ

HTML5, CSS3, JavaScript thuần; dữ liệu dùng chung qua Store và LocalStorage. Khóa dữ liệu hiện tại là creatorstudio.team.v1. Có bộ demo REST API riêng chạy local bằng Python.

Dữ liệu gắn với origin/cổng/trình duyệt; không đồng bộ giữa các máy. Đăng nhập, mật khẩu và phân quyền là mô phỏng phía frontend.

## 8. Cấu trúc thư mục

    Project_nhom15/
      html/sv1|sv2|sv3|shared/
      css/sv1|sv2|sv3|shared/
      js/sv1|sv2|sv3|shared/
      assets/
      docs/
      tests/
      server.py

Code dùng chung ở js/shared. Tài liệu gatekeeper ở docs/01-gatekeeper, quy trình ở docs/02-quy-trinh, khai báo AI ở docs/03-ai. Báo cáo QA hiện hành nằm cạnh mã trong docs/qa-*; tài liệu lịch sử được giữ để đối chiếu.

## 9. Chạy local

Mở Project_nhom15 trong VS Code, chạy html/sv1/index.html bằng Live Server. Cách dùng Python:

    cd Project_nhom15
    python server.py 8000

Mở http://127.0.0.1:8000/html/sv1/index.html và giữ terminal chạy. Dùng HTTP thay vì mở file trực tiếp để điều hướng và lưu trữ hoạt động ổn định.

## 10. Tài khoản demo

Ở trang đăng nhập, chọn vai trò rồi **chọn tài khoản cụ thể**, sau đó mở demo. Tài khoản mẫu dùng mật khẩu demo123 nếu chưa đổi; tài khoản đăng ký dùng mật khẩu đã tạo.

Seed hiện có 15 user và 15 task, gồm 2 task đã hủy; giữ 3 version, 5 thông báo và 4 mẫu brief. Seed mới không tự thay LocalStorage cũ. Xuất JSON trước nếu cần đặt lại dữ liệu mẫu.

## 11. Kiểm thử hiện hành

Đã chạy local trên Edge/Node ngày 26/10/2026:

- 11/11 tệp kiểm thử Node; store có 17 nhóm nghiệp vụ.
- check_bundle.py đạt.
- 24 kiểm tra tài khoản; 57 kiểm tra tích hợp/hiển thị ở 320/390/1440px.
- 6 nhóm SV3 P1; 6 nhóm mẫu brief/AI-1.

    node tests/store.test.cjs
    node tests/brief-template.test.cjs
    python check_bundle.py

Browser test cần Playwright; có thể chỉ định CHROMIUM_EXECUTABLE_PATH. Bộ hiện hành: browser-final-v5.cjs, browser-task27.cjs, browser-sv3-p1.cjs, browser-ai1-template.cjs. Chi tiết phạm vi và kết quả: [evidence-index](Project_nhom15/docs/01-gatekeeper/evidence-index.md).

## 12. Quy trình Git

Quy trình người dùng đã chốt: **sửa thư mục local → cập nhật feature/sv3 → chạy kiểm tra, sửa lỗi → nhập dev → đồng bộ local**. Mỗi lần sửa ghi trong [THAY-DOI-V2](Project_nhom15/docs/THAY-DOI-V2.md).

Không giả commit, review hay đóng góp của sinh viên khác. main/PR/review của cả nhóm cần được đối chiếu riêng trước khi chốt bản nộp.

## 13. Thiết kế và quản lý công việc

[Design system](Project_nhom15/docs/01-gatekeeper/design-system.md) hỗ trợ đối chiếu code. [Figma audit](Project_nhom15/docs/01-gatekeeper/figma-audit.md) là bản ghi lịch sử được khôi phục, chưa xác minh lại file Figma hiện tại.

Trello/Figma và danh tính/MSSV cần nhóm cung cấp link và thông tin thật. [Phân công hiện có](Project_nhom15/docs/05-nhom/team-assignment.md); [hướng dẫn Trello](Project_nhom15/docs/02-quy-trinh/trello-setup.md).

## 14. Deploy và minh chứng

Chưa xác nhận URL deploy public hiện hành trong đợt kiểm tra này. [Hướng dẫn deploy](Project_nhom15/docs/02-quy-trinh/deploy.md) là checklist chuẩn bị, không phải bằng chứng đã xuất bản.

Kết quả kiểm thử và [39 ảnh web hiện hành](Project_nhom15/docs/04-qa/web/README.md) có trong repo. Các ảnh QA cũ khác có thể chỉ lưu local. Figma, Trello, phê duyệt và link public chỉ đánh dấu hoàn thành khi có nguồn thật. OBS đang hoãn theo yêu cầu người dùng; các kịch bản khôi phục chỉ là tài liệu chuẩn bị.

## 15. Giới hạn và việc tiếp theo

Còn cần kiểm tra các mục chưa đủ bằng chứng: module danh sách dùng chung và kiểm thử theo kế hoạch, W3C/axe/Lighthouse và tương phản vùng nền ảnh/gradient, bộ ảnh theo URL mới, link Figma/Trello, quy trình review và deploy. Chưa coi toàn bộ bài tập lớn hoàn tất.

Đọc [chỉ mục tài liệu](Project_nhom15/docs/README.md), [tiến độ](Project_nhom15/docs/05-nhom/sv3/progress.md) và [khai báo AI](Project_nhom15/docs/03-ai/ai-usage-report.md). Sinh viên tự bổ sung phần đã tự làm, cách hiểu code và thông tin thật; không tạo bằng chứng thay người khác.

Audit tự viết hiện hành: [19 lượt/8 độ rộng](Project_nhom15/docs/04-qa/web/README.md); 0 phát hiện trong phạm vi đo được, còn 26 lượt phần tử nền ảnh/gradient chưa đo.

Axe-core 4.14.0 đã chạy [44 lượt trang/modal](Project_nhom15/docs/04-qa/accessibility/README.md): 0 vi phạm tự động, 118 lượt phần tử incomplete cần xem thủ công.
