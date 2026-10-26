# Tiến độ SV3 — cập nhật 12/10/2026

Dùng mã đánh số đơn của bảng 29 task đã khôi phục, không dùng bản 24 task cũ. TASK-06 thuộc SV1; TASK-18 Brief Template thuộc SV2 theo inventory 17 màn hình mới. README gốc và hai tài liệu Word của repo còn nội dung phân công/đề tài cũ; giữ nguyên để nhóm đối chiếu, không lấy chúng thay inventory mới.

| Task | Nội dung | Người phụ trách | Trạng thái | File | Ghi chú |
|---|---|---|---|---|---|
| TASK-03 (phần SV3) | Wireframe và UI Kit — phần SV3 | SV3 phối hợp nhóm | 🔴 Có lỗi | figma-canva/README.md; Figma root70:15 | Đã bổ sung kit; chưa QA sau sửa text sizing; chưa có wireframe SV3 riêng |
| TASK-04 (phần SV3) | Thiết kế chi tiết màn hình SV3 | SV3 | 🔴 Có lỗi | figma-canva/README.md; docs/SV3-DESIGN-QA.md | Đã tạo 6 desktop + 6 mobile; mobile còn chồng chữ, desktop chưa QA sau sửa; thiếu AI states/prototype/export |
| TASK-05 / CORE-03 | Khung điều hướng và chuyển vai trò demo | SV3 (phần được giao) | 🟠 Chờ duyệt | js/app.js; js/modules/navigation.js | Logic đã QA; chưa ghép Client/Designer |
| TASK-15 / SV3-01 | Bảng công việc, duyệt brief | SV3 | 🟢 Hoàn thành | lead-task-board.html; docs/TASK-15-16-QA.md | QA Chromium desktop/mobile PASS; tạo/sửa/lọc, kéo thả, duyệt/trả brief và lưu sau tải lại đạt |
| TASK-16 / SV3-02 | Duyệt nội bộ | SV3 | 🟢 Hoàn thành | lead-internal-review.html; docs/TASK-15-16-QA.md | QA Chromium desktop/mobile PASS; ghim/sửa/xử lý ghi chú, checklist, yêu cầu sửa/chuyển khách đạt |
| TASK-17 / SV3-03 | Tổng hợp phản hồi AI-2 | SV3 | 🟢 Hoàn thành | lead-feedback-summary.html; docs/TASK-17-QA.md | Chromium16 nhóm PASS, 9 file regression PASS; sửa/bỏ/làm rõ/chuyển task và nguồn phiên bản đúng |
| TASK-19 / SV3-04 | Quản lý người dùng | SV3 | 🟢 Hoàn thành | admin-user-management.html; docs/qa-admin-errors/README.md | Chromium CRUD/validation/filter/role/lock và desktop/mobile PASS |
| TASK-20 / SV3-05 | Thiết lập và lưu trữ | SV3 | 🟢 Hoàn thành | admin-project-settings.html; docs/qa-admin-errors/README.md | Quy tắc, nhãn, điều kiện lưu trữ/read-only và desktop/mobile PASS |
| TASK-21 | Responsive + kiểm thử Lead/Admin | SV3 | 🟢 Hoàn thành | tests/browser-responsive-sv3.cjs; docs/qa-responsive-sv3/ | 24/24 lượt Chromium:6 màn ×320/768/1024/1440px, dialog/menu/focus PASS |
| TASK-26 / SV3-06 | Lỗi 403/404 | SV3 | 🟢 Hoàn thành | 404.html; docs/qa-admin-errors/ | 403/404, đường về4vai trò, HTTPURL lạ và desktop/mobile PASS |
| TASK-27 (phần SV3) | Kiểm thử tích hợp | SV3 phối hợp nhóm | ⬜ Chưa làm | docs/tich-hop.md | Chờ code và dữ liệu SV1/SV2 |
| TASK-28 (phần SV3) | README, tài liệu, kiểm kê | SV3 phối hợp nhóm | 🟡 Đang làm | README.md; docs/ | Có tài liệu SV3; chưa đồng bộ toàn nhóm |
| TASK-29 (phần SV3) | OBS, minh chứng, phát hành | SV3 phối hợp nhóm | ⬜ Chưa làm | — | Chưa có OBS/review/phát hành; không giả nhận hoàn thành |

Các task thiết lập và thiết kế trước đó có tài sản trong lịch sử; chưa có xác nhận duyệt mới. Bảng tập trung phần triển khai và bàn giao đang xử lý, không coi checkbox kế hoạch là bằng chứng hoàn thành.

## Nguồn và phạm vi

- Yêu cầu BTL-30 và 3 ảnh hướng dẫn người dùng gửi lại đã đọc. Ảnh tư vấn tâm lý là ví dụ tổ chức bài; không thay chủ đề CreatorStudio.
- Repo xác định: tungten2007/CSE122_67KTPM1_BTCK_Nhom15. Bản SV3 được đưa vào Project_nhom15, giữ đường dẫn nội bộ và các file cũ.
- index.html tại đây chỉ mở demo SV3, không thay Landing/Login của SV1. Client/Designer có trang chờ ghép.
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
