# Tiến độ CreatorStudio — cập nhật 14/10/2026

Dùng mã đánh số đơn của bảng 29 task đã khôi phục, không dùng bản 24 task cũ. TASK-06 thuộc SV1; TASK-18 Brief Template thuộc SV2 theo inventory 17 màn hình mới. README gốc và hai tài liệu Word của repo còn nội dung phân công/đề tài cũ; giữ nguyên để nhóm đối chiếu, không lấy chúng thay inventory mới.

| Task | Nội dung | Người phụ trách | Trạng thái | File | Ghi chú |
|---|---|---|---|---|---|
| TASK-03 (phần SV3) | Wireframe và UI Kit — phần SV3 | SV3 phối hợp nhóm | 🔴 Có lỗi | figma-canva/README.md; Figma root70:15 | Đã bổ sung kit; chưa QA sau sửa text sizing; chưa có wireframe SV3 riêng |
| TASK-04 (phần SV3) | Thiết kế chi tiết màn hình SV3 | SV3 | 🔴 Có lỗi | figma-canva/README.md; docs/SV3-DESIGN-QA.md | Đã tạo 6 desktop + 6 mobile; mobile còn chồng chữ, desktop chưa QA sau sửa; thiếu AI states/prototype/export |
| TASK-05 / CORE-03 | Khung điều hướng và chuyển vai trò demo | SV3 (phần được giao) | 🟢 Nhóm đồng ý | js/app.js; js/modules/navigation.js | Đã ghép Client/Designer tại TASK-27; nhóm đồng ý theo xác nhận người dùng |
| TASK-15 / SV3-01 | Bảng công việc, duyệt brief | SV3 | 🟢 Hoàn thành | lead-task-board.html; docs/TASK-15-16-QA.md | QA Chromium desktop/mobile PASS; tạo/sửa/lọc, kéo thả, duyệt/trả brief và lưu sau tải lại đạt |
| TASK-16 / SV3-02 | Duyệt nội bộ | SV3 | 🟢 Hoàn thành | lead-internal-review.html; docs/TASK-15-16-QA.md | QA Chromium desktop/mobile PASS; ghim/sửa/xử lý ghi chú, checklist, yêu cầu sửa/chuyển khách đạt |
| TASK-17 / SV3-03 | Tổng hợp phản hồi AI-2 | SV3 | 🟢 Hoàn thành | lead-feedback-summary.html; docs/TASK-17-QA.md | Chromium16 nhóm PASS, 9 file regression PASS; sửa/bỏ/làm rõ/chuyển task và nguồn phiên bản đúng |
| TASK-19 / SV3-04 | Quản lý người dùng | SV3 | 🟢 Hoàn thành | admin-user-management.html; docs/qa-admin-errors/README.md | Chromium CRUD/validation/filter/role/lock và desktop/mobile PASS |
| TASK-20 / SV3-05 | Thiết lập và lưu trữ | SV3 | 🟢 Hoàn thành | admin-project-settings.html; docs/qa-admin-errors/README.md | Quy tắc, nhãn, điều kiện lưu trữ/read-only và desktop/mobile PASS |
| TASK-21 | Responsive + kiểm thử Lead/Admin | SV3 | 🟢 Hoàn thành | tests/browser-responsive-sv3.cjs; docs/qa-responsive-sv3/ | 24/24 lượt Chromium:6 màn ×320/768/1024/1440px, dialog/menu/focus PASS |
| TASK-26 / SV3-06 | Lỗi 403/404 | SV3 | 🟢 Hoàn thành | 404.html; docs/qa-admin-errors/ | 403/404, đường về4vai trò, HTTPURL lạ và desktop/mobile PASS |
| TASK-27 | Tích hợp toàn nhóm | SV3 phối hợp nhóm | 🟢 Nhóm đồng ý | docs/TASK-27-INTEGRATION-v1.md | Ghép ba bản nộp; 10 nhóm dữ liệu, 9 regression và 34 lượt Chromium PASS; nhóm đồng ý theo xác nhận người dùng 14/10/2026 |
| TASK-28 | README, tài liệu, kiểm kê | Nhóm; SV3 tổng hợp | 🟢 Có bản bàn giao | README.md; docs/user-guide.md; screen-list.md; team-assignment.md; ai-usage-report.md | Đồng bộ website 18 trang; thông tin cá nhân/OBS sinh viên tự bổ sung theo thực tế |
| TASK-29 (phần SV3) | OBS, minh chứng, phát hành | SV3 phối hợp nhóm | ⬜ Chưa làm | — | Chưa có OBS/review/phát hành; không giả nhận hoàn thành |

Các task thiết lập và thiết kế trước đó có tài sản trong lịch sử; chưa có xác nhận duyệt mới. Bảng tập trung phần triển khai và bàn giao đang xử lý, không coi checkbox kế hoạch là bằng chứng hoàn thành.

## Nguồn và phạm vi

- Yêu cầu BTL-30 và 3 ảnh hướng dẫn người dùng gửi lại đã đọc. Ảnh tư vấn tâm lý là ví dụ tổ chức bài; không thay chủ đề CreatorStudio.
- Repo xác định: tungten2007/CSE122_67KTPM1_BTCK_Nhom15. Bản SV3 được đưa vào Project_nhom15, giữ đường dẫn nội bộ và các file cũ.
- Bản tích hợp TASK-27 dùng Landing/Login của SV1; Client/Designer đã ghép vào cùng thư mục chạy.
- Sáu màn SV3 đã QA Chromium153: Task15/16 đạt14nhóm; Task17 đạt16nhóm; Task19/20/26 đạt12nhóm; responsive6màn×4widths đạt24/24. 9file regression PASS. Minh chứng trong docs/qa-*. Không suy kết quả SV3 thành toàn website hoặc duyệt Figma.
- Trello chưa được chỉnh trực tiếp. Dùng TASK-15-TRELLO.txt và TASK-16-TRELLO.txt để cập nhật hai thẻ hoàn thành phần triển khai/QA. Review nhóm, merge và OBS vẫn chưa được xác nhận.

## Cập nhật thiết kế ngày 12/10/2026

- Đã bổ sung UI Kit và 12 frame SV3 (6 desktop, 6 mobile), giữ tài sản chung cũ. Node/link thật nằm ở `figma-canva/README.md`.
- QA ảnh ban đầu phát hiện chồng chữ. Đã sửa text sizing desktop và kit, chưa kiểm tra ảnh sau sửa. Mobile chưa sửa được vì Figma MCP đạt giới hạn.
- TASK-03/TASK-04 phần SV3 **🔴 Có lỗi**, không Done; thiếu wireframe SV3 riêng, trạng thái AI đầy đủ, prototype, export và phê duyệt.
- Đồng bộ token CSS và Inter local; giữ bố cục/chức năng website. 7 bộ test kỹ thuật frontend đạt; chưa QA trực quan website.
- Không thay trạng thái phần SV1/SV2; Figma không thay QA browser hoặc bằng chứng OBS.

Cập nhật 12/10/2026: đọc Figma hoạt động nhưng lệnh chỉnh sửa vẫn bị rate limit. Chưa có sửa Figma mới hoặc export; các lỗi/giới hạn QA nêu trên vẫn còn.

## Hoàn thành TASK-15/16 ngày12/10/2026

Đã thực hiện QA Chromium và review độc lập đủ chức năng, ảnh desktop/mobile. Đánh dấu hoàn thành hai task triển khai; giữ TASK03/04 Figma có lỗi, TASK27 tích hợp và TASK29 OBS/release chưa hoàn thành. Tiếp theo TASK17. Báo cáo: docs/TASK-15-16-QA.md.

Ngày12/10/2026: sau TASK17, QA độc lập chốt TASK19/20/26 PASS; tiếp tục TASK21, 24 lượt responsive PASS. Tất cả sáu màn SV3 đã QA chức năng và giao diện trong phạm vi Chromium. Figma03/04 và tích hợp/OBS27–29 vẫn theo task riêng.

## 14/10/2026 — TASK-27 tích hợp v1

Đã đọc ba PR và ghép các phân hệ vào `Project_nhom15`, thay trang mở demo SV3 bằng Landing/Login của SV1. Dùng Store chung `creatorstudio.team.v1`; nối brief, task, ảnh phiên bản, duyệt và feedback theo ID. Giữ khóa dữ liệu cũ, chưa di chuyển dữ liệu thực hành cũ. Chín file regression, mười nhóm dữ liệu tích hợp và 34 lượt Chromium đạt; đã sửa lỗi responsive SV2 tìm được. Chi tiết và checklist ở `TASK-27-INTEGRATION-v1.md`, kết quả ở `qa-task27-v1/result.json`.

TASK-27: chờ review nhóm, chưa merge. TASK-28/29 và phần Figma03/04 chưa hoàn thành. Trello không chỉnh trực tiếp theo yêu cầu mới nhất. Không suy kết quả kiểm thử bản tích hợp thành duyệt thiết kế hoặc OBS.

## Đối chiếu 29 task toàn nhóm sau tích hợp

“Đã triển khai” ghi nhận mã nguồn hiện có; không thay cho review PR, duyệt Figma hay OBS. Bảng này được cập nhật trong repo, không ghi lên Trello. Giữ nguyên phân công theo bảng 29 task đã khôi phục.

| Task | Nội dung | Phụ trách | Tiến độ có bằng chứng |
|---|---|---|---|
| 01 | Repo, Trello, tài liệu ban đầu | Nhóm | Repo đã có; Trello có link, chưa đọc/đổi bảng trực tiếp |
| 02 | Sitemap, user flow, inventory | Nhóm | Có sản phẩm trong lịch sử; chưa xác minh lại phê duyệt |
| 03 | Wireframe, UI Kit | Nhóm | Có tài sản; phần SV3 còn lỗi/thiếu theo QA thiết kế |
| 04 | Hi-fi 17 màn, duyệt Figma | Nhóm | Có mockup; chưa xác nhận duyệt toàn nhóm; SV3 còn lỗi |
| 05 | Navbar/sidebar/role/CSS-JS chung | SV1 + nhóm | Đã tích hợp route/session; chờ review tính nhất quán |
| 06 | Creative Brief + AI-1 | SV1 | Đã triển khai; gửi brief qua giao diện tích hợp đạt |
| 07 | Review Versions | SV1 | Đã triển khai; phiên bản/ảnh/duyệt Client tích hợp đạt |
| 08 | Project Overview | SV1 | Đã triển khai; tạo dự án qua giao diện tích hợp đạt |
| 09 | Responsive/Test Client | SV1 | Có QA trong PR #3; màn Client 390/1440px tích hợp đạt |
| 10 | Designer Dashboard | SV2 | Đã triển khai, đọc task chung; sửa mobile khi ghép |
| 11 | Moodboard + AI-3 | SV2 | Đã triển khai; render tích hợp và responsive đạt; AI có test SV2 gốc |
| 12 | Version Management | SV2 | Đã triển khai; luồng nộp version/Lead/Client tích hợp đạt |
| 13 | Mock Data/LocalStorage | SV2 + nhóm | Store chung và test lưu/atomic/concurrent đạt |
| 14 | Responsive/Test Designer | SV2 | QA tích hợp ba màn 390/1440px đạt; chưa Firefox/Safari |
| 15 | Lead Task Board | SV3 | QA SV3 hoàn thành; nhận brief tích hợp và giao việc đạt |
| 16 | Internal Review | SV3 | QA SV3 hoàn thành; ảnh version và chuyển Client tích hợp đạt |
| 17 | Feedback Summary + AI-2 | SV3 | QA SV3 hoàn thành; dùng comments/versionId chung |
| 18 | Brief Template Management | SV2 | Đã triển khai; giao diện tích hợp đạt, chờ review |
| 19 | User Management | SV3 | QA SV3 hoàn thành; trang tích hợp đạt |
| 20 | Project Settings | SV3 | QA SV3 hoàn thành; dùng settings chung |
| 21 | Responsive/Test Lead/Admin | SV3 | QA SV3 hoàn thành; kiểm tra tích hợp 390/1440px đạt |
| 22 | Landing | SV1 | Đã ghép bản SV1; mở trang trong kiểm tra tích hợp đạt |
| 23 | Login + Demo Role Switcher | SV1 | Đã bổ sung đăng ký, đăng nhập đúng tài khoản, đổi mật khẩu/đăng xuất và kiểm thử trong bản v5 |
| 24 | Profile | SV2 | Đã ghép; sửa mobile; chờ review/QA nghiệp vụ bổ sung |
| 25 | Notifications | SV2 | Đã ghép, dùng thông báo chung; chờ review/QA nghiệp vụ bổ sung |
| 26 | 403/404 | SV3 | QA SV3 hoàn thành; giữ server handler và trang lỗi chung |
| 27 | Tích hợp toàn nhóm | Nhóm, SV3 tích hợp | Đã triển khai/QA kỹ thuật; nhóm đồng ý theo xác nhận người dùng 14/10/2026 |
| 28 | Tài liệu toàn nhóm | Nhóm | Đã tổng hợp hướng dẫn, kiểm kê 18 trang, phân công và báo cáo AI; còn thông tin cá nhân/OBS nhóm điền theo thực tế |
| 29 | OBS/Git/PR/release | Nhóm | PR các thành viên có; chưa xác nhận OBS, review chéo, merge/release |

### Bổ sung menu Landing, bản v2 (14/10/2026)

Theo ảnh mẫu người dùng gửi, đã đổi Cách hoạt động / Khả năng sáng tạo thành hai bảng mục con có icon, tiêu đề và mô tả. Kiểm tra 17 lượt menu trên Chromium: mở/đóng, chuyển bảng, bấm ngoài, Escape/ArrowDown/Enter, bốn chiều rộng 320–1440px và bốn đường dẫn tính năng đạt. Xuất ZIP riêng CreatorStudio-Task27-Integration-v2-Menu.zip. Checklist bổ sung trong TASK-27-INTEGRATION-v1.md; vẫn chờ review nhóm.

### Bổ sung nội dung Landing, bản v3 (14/10/2026)

Thêm mục “CreatorStudio có thể làm gì?” với sáu chức năng chính và chân trang nhiều cột theo ảnh mẫu mới. Kiểm tra bốn chiều rộng 320/390/768/1440px và liên kết nội bộ đạt; đã xem ảnh desktop/mobile. Xuất riêng CreatorStudio-Task27-Integration-v3-Landing.zip; giữ mô tả/checklist trong TASK-27-INTEGRATION-v1.md. Trạng thái review nhóm vẫn giữ nguyên.

### Bổ sung kiểu chữ và màu Landing, bản v4 (14/10/2026)

Dùng Inter cục bộ cho trang chủ; làm nổi bật mục chức năng bằng nền xanh đen, tiêu đề trắng/xanh sáng và mô tả có tương phản rõ. Đã xem ảnh và kiểm tra bốn chiều rộng, năm nhóm bố cục/liên kết cùng 17 lượt menu PASS sau đổi font. Xuất riêng CreatorStudio-Task27-Integration-v4-Typography.zip; chưa thay trạng thái review nhóm.


## Hoàn thiện bản dùng chung v5 — 14/10/2026

Người dùng xác nhận cả nhóm đồng ý và yêu cầu hoàn thiện website để bắt đầu dùng. Đã bổ sung đăng ký tài khoản Client, đăng nhập bằng tài khoản đã tạo, đăng xuất, đổi mật khẩu có tác dụng khi đăng nhập lại; sửa lỗi kiểm tra vai trò khiến Hồ sơ không lưu, giữ focus ô tìm kiếm và mở đúng dự án từ Thông báo. Nhận xét Client hiển thị đúng tên tác giả.

23 kiểm tra sử dụng cuối và 34 lượt tích hợp chạy lại đạt; 9 file regression và 11 nhóm dữ liệu tích hợp đạt. Kết quả trong qa-final-v5, cùng bài kiểm thử browser-final-v5.cjs. Tài liệu chung đã đồng bộ trong README/user-guide/screen-list/team-assignment/ai-usage-report, giữ bản yêu cầu/bản nộp gốc làm tham chiếu.

Trang web có 18 trang, gồm một trang đăng ký bổ sung. Bản frontend lưu dữ liệu trên trình duyệt; chưa có backend hoặc đồng bộ qua các máy. Duyệt nhóm được ghi theo lời người dùng, không tạo review giả trên GitHub. Phần Figma/OBS/nộp học phần vẫn đối chiếu riêng; không cản việc dùng bản web hiện tại. Gói: CreatorStudio-Task27-Integration-v5-Complete.zip.

## Đợt P1 bổ sung 26/10/2026 — đang chờ kiểm tra

Các kết quả PASS ngày 12/10 ở phía trên thuộc phiên bản cũ. Chúng không xác nhận những thay đổi P1 dưới đây đã hoạt động trên trình duyệt.

| Phần | Trạng thái hiện tại | Vị trí trong nhánh feature/sv3 |
|---|---|---|
| Hủy công việc có lý do | Người dùng xác nhận phần hủy hoạt động; đã nhập vào dev tại 8001af7 | js/store.js; js/app.js; js/pages/lead-task-board.js |
| Xóa công việc đã hủy | Đã viết mã, chưa kiểm tra trình duyệt | js/store.js; js/pages/lead-task-board.js |
| Xóa người dùng có điều kiện | Đã viết mã, chưa kiểm tra trình duyệt | js/store.js; js/pages/admin-user-management.js |
| Sắp xếp, tìm kiếm debounce, xóa bộ lọc và phân trang | Đã viết mã, chưa kiểm tra trình duyệt | Hai trang danh sách ở trên |
| Seed 15 người dùng, 15 công việc, 2 việc đã hủy | Đã đếm trong mã nguồn; chưa kiểm tra trên giao diện | js/data.js |
| Focus và trạng thái gửi modal | Đã viết mã, chưa kiểm tra trình duyệt | js/app.js |

### Bước tiếp theo: kiểm tra bản feature trước khi tích hợp

1. Dùng bản mới nhất của nhánh feature/sv3. Nhánh này hiện dùng HTML tại gốc Project_nhom15; dev dùng html/sv1, html/sv2, html/sv3. Chạy đúng bản cần kiểm tra bằng Live Server.
2. Nếu cần giữ dữ liệu demo đã nhập, xuất bản sao JSON trong Công cụ demo trước khi đặt lại dữ liệu. Đặt lại dữ liệu mẫu sẽ xóa các thay đổi demo hiện có trên origin đó và nạp seed mới.
3. Mở admin-user-management.html ở vai trò Admin: xác nhận tổng 15 thành viên; với 6 thành viên/trang có 3 trang. Thử tìm tên, lọc vai trò/trạng thái, sắp xếp và Xóa bộ lọc.
4. Thêm một người dùng demo mới không được giao việc, sau đó thử xóa: Hủy trong hộp xác nhận phải giữ tài khoản, xác nhận xóa phải loại tài khoản khỏi bảng. Thử xóa An Nguyễn đang có công việc: phải hiện lỗi và giữ tài khoản. Tài khoản đang dùng không có quyền tự xóa.
5. Mở lead-task-board.html ở vai trò Lead: thử tìm kiếm, sắp xếp, lọc ưu tiên/người phụ trách, chuyển trang và xóa bộ lọc. Tổng kết quả phải theo bộ lọc; không được mất thẻ chỉ vì chuyển trang.
6. Tạo một công việc riêng để kiểm tra; hủy với lý do rồi xóa công việc đó. Hủy ở hộp xác nhận xóa phải giữ thẻ. Dự án đã lưu trữ phải giữ chỉ đọc.
7. Trong modal tạo/sửa, kiểm tra focus ban đầu, nhấn Tab và Esc. Thử dữ liệu sai: form phải giữ dữ liệu và cho phép sửa rồi gửi lại. Sau thao tác thành công, đóng modal và bảng phải cập nhật.
8. Tải lại trang, xác nhận các thao tác đã lưu vẫn còn. Ghi lỗi quan sát được và bước tái hiện trước khi yêu cầu tích hợp vào dev.

### Sau bước kiểm tra

- Chờ người dùng xác nhận các phần xóa, danh sách, seed và modal trước khi nhập các phần này vào dev.
- Khi tích hợp, chuyển từng khối sang đường dẫn đã tái cấu trúc; giữ quyền Lead/Designer và các API chung của dev. Không chép đè toàn bộ store/app từ bản SV3 độc lập.
- Những mục còn lại trong kế hoạch tổng thể vẫn chưa được chứng minh hoàn tất: các thay đổi SV1/SV2, module danh sách dùng chung, tài liệu toàn nhóm, kiểm tra tích hợp, deploy và tài sản Figma/Trello. Chưa quay OBS theo yêu cầu hiện tại.

## Tích hợp SV3 vào dev — 26/10/2026

- Hợp nhất feature/sv3: xóa công việc đã hủy, xóa người dùng có guard và hộp xác nhận; lọc/sắp xếp/phân trang; seed 15 người dùng và 15 công việc (2 việc đã hủy); trạng thái gửi và focus modal.
- Chuyển mã sang js/shared, js/sv3 và css/sv3; giữ cấu trúc HTML, điều hướng, khóa dữ liệu dùng chung và API SV1/SV2 trên dev.
- Nút Xóa người dùng nằm tại html/sv3/admin-user-management.html sau khi tải bản dev mới. File JavaScript tương ứng: js/sv3/pages/admin-user-management.js.
- Chưa chạy trình duyệt hoặc bộ kiểm thử, theo yêu cầu người dùng tự kiểm tra. Seed mới áp dụng khi nạp dữ liệu mẫu mới; không tự đặt lại LocalStorage hiện có.

Cập nhật: các bước chờ nhập dev trong checklist phía trên đã được thay bằng lần tích hợp này theo yêu cầu người dùng; kiểm tra trình duyệt vẫn chưa hoàn tất. Trên dev, mở html/sv3/admin-user-management.html và html/sv3/lead-task-board.html.
