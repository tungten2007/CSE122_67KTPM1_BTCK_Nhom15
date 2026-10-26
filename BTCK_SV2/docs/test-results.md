# Kết quả kiểm tra phần SV2

Ngày cập nhật: **26/10/2026**. Dự án: **CreatorStudio — CSE122**.

> Kết quả mới nhất sau sửa lỗi theo barem: [biên bản sửa lỗi hệ thống](system-fixes.md). Bộ test hiện có 4 nhóm PASS; các biên bản cũ bên dưới phản ánh thời điểm kiểm tra tương ứng.

## Phạm vi bàn giao

SV2 phụ trách 6 màn hình theo phân công:

| STT đề tài | Màn hình | File | Vai trò |
|---|---|---|---|
| 4 | Designer Dashboard | [designer-dashboard.html](../designer-dashboard.html) | Designer |
| 5 | Moodboard & AI-3 | [designer-moodboard.html](../designer-moodboard.html) | Designer |
| 6 | Version Management | [designer-version-management.html](../designer-version-management.html) | Designer |
| 10 | Brief Template Management & Prompt AI-1 | [admin-brief-template-management.html](../admin-brief-template-management.html) | Admin |
| 15 | Profile Management | [profile.html](../profile.html) | Dùng chung |
| 16 | Notifications Center | [notifications.html](../notifications.html) | Dùng chung |

Cổng điều hướng `index.html` và trang `404.html` là trang hỗ trợ của bản chạy độc lập; được kiểm tra khởi tạo cùng các trang trên. Các chức năng Client của SV1 và chức năng Lead/Admin khác của SV3 không thuộc kết quả kiểm thử SV2 này.

## Môi trường và cách kiểm tra

- Kiểm tra tự động: Node.js, dùng [tests/verify.cjs](../tests/verify.cjs) và [tests/dom.cjs](../tests/dom.cjs).
- DOM và LocalStorage được mô phỏng trong bộ nhớ tạm; bộ kiểm tra không thay đổi dữ liệu trong trình duyệt của người dùng.
- Xem giao diện và chụp minh chứng: trình duyệt tích hợp, mở website qua HTTP localhost; có ảnh desktop và mobile với viewport đặt ở 390 × 844.
- AI-3 và phần thử nghiệm Prompt AI-1 là mô phỏng JavaScript; không gọi API AI thật.

Chạy từ thư mục gốc dự án:

```bash
node tests/verify.cjs
```

## Tổng hợp kết quả thực thi

- **Bộ kiểm tra chức năng tự động chạy đạt, mã thoát 0.**
- Chương trình xuất **3 nhóm kết quả PASS**: cấu trúc/khởi tạo 8 trang, luồng AI-3 theo video và các chức năng còn lại được liệt kê bên dưới.
- Không có assertion thất bại trong lần chạy bộ kiểm tra này. Chương trình chưa xuất tổng số test case riêng lẻ, vì vậy không ghi con số 75 hoặc số liệu của bản SV1.
- Kết quả PASS trong bảng là kết quả **DOM mô phỏng**, không đồng nghĩa toàn bộ thao tác đã đạt trên trình duyệt thật.

### Các nội dung đã được bộ kiểm tra xác nhận

| Mã | Nội dung kiểm tra | Kết quả |
|---|---|---|
| AT-01 | Khởi tạo đủ 8 trang HTML ở thư mục gốc trong DOM mô phỏng | PASS |
| AT-02 | Cú pháp JavaScript của từng trang hợp lệ | PASS |
| AT-03 | HTML nạp `css/share.css`, `js/share.js` trước CSS/JS riêng; các liên kết tài nguyên cục bộ được kiểm tra đều tồn tại | PASS |
| AT-04 | HTML không còn thẻ style, thuộc tính style hoặc sự kiện inline theo kiểm tra hiện có | PASS |
| AT-05 | JS riêng khởi tạo trong `DOMContentLoaded`, tiện ích được khai báo một lần ở `share.js`; không còn App/View/Store, `innerHTML` hoặc gán `.style`; CSS không dùng `@import` | PASS |
| AT-06 | Form hồ sơ ban đầu bị khóa; bấm chỉnh sửa thì mở các trường | PASS |
| AT-07 | Avatar URL dạng `javascript:` bị từ chối và không được lưu | PASS |
| AT-08 | Lưu tên hồ sơ hợp lệ; khởi tạo lại trang với cùng dữ liệu vẫn đọc đúng tên đã lưu | PASS |
| AT-09 | Mật khẩu hiện tại sai hiển thị thông báo lỗi trong luồng demo | PASS |
| AT-10 | Mật khẩu hiện tại đúng, mật khẩu mới và xác nhận khớp thì lưu được mật khẩu demo | PASS |
| AT-11 | Tìm công việc bằng chuỗi không khớp trả danh sách rỗng | PASS |
| AT-12 | Tích checkbox hoàn thành cập nhật trạng thái nhiệm vụ thành `done` trong dữ liệu | PASS |
| AT-13 | Mở biểu mẫu và thêm nhiệm vụ mới vào dữ liệu | PASS |
| AT-14 | Designer mở trang quản lý mẫu Brief được chuyển tới `404.html?code=403` | PASS |
| AT-15 | Tạo phiên bản từ dữ liệu mẫu sinh mã `MC26-BaoBi-v4` | PASS |
| AT-16 | Nộp duyệt khi chưa hoàn thành checklist giữ phiên bản ở `Draft` | PASS |
| AT-17 | Sửa bản nháp, tích đủ 3 mục checklist và nộp duyệt chuyển sang `Internal Review` | PASS |
| AT-18 | Nộp phiên bản tạo thông báo cần duyệt cho tài khoản Lead | PASS |
| AT-19 | Đánh dấu tất cả đã đọc chỉ cập nhật hộp thư người dùng hiện tại; thông báo chưa đọc của Lead vẫn được giữ | PASS |
| AT-20 | AI-3 trả gợi ý hợp lệ; áp dụng lưu 4 màu và chuyển Moodboard sang `Palette Ready` | PASS |
| AT-21 | AI-3 mô phỏng lỗi có thông báo; bấm thử lại bỏ chọn checkbox mô phỏng lỗi | PASS |
| AT-22 | Admin lưu Prompt; công cụ thử nghiệm hiển thị kết quả mô phỏng | PASS |
| AT-23 | Dự án đã lưu trữ không mở được form thêm nhiệm vụ | PASS |
| AT-24 | AI-3 có chủ đề, chất liệu, Typography và nhãn từ khóa; kiểm tra đầu vào, Từ chối không lưu, Tạo lại, nhóm trà/cao cấp, chuyển nhập thủ công và hủy tiến trình cũ | PASS |

## Giao diện và minh chứng hiện có

Đã mở và chụp giao diện của các trang bằng trình duyệt. Việc chụp ảnh xác nhận trang hiển thị, không thay thế kiểm thử đầy đủ CRUD, validation, bàn phím hoặc hành vi responsive.

| Minh chứng | Vị trí hiện tại | Ghi chú |
|---|---|---|
| Ảnh desktop | [design/mockups](../design/mockups/) | 8 trang, trong đó có 6 màn hình SV2 và 2 trang hỗ trợ |
| Ảnh mobile | [design/mockups](../design/mockups/) | Tên file bắt đầu bằng `mobile-`; viewport đặt ở 390 × 844 |
| Admin mobile | [Ảnh đầu trang](../design/mockups/mobile-05-quan-ly-mau-brief.jpg), [ảnh phần Prompt](../design/mockups/mobile-05b-cau-hinh-prompt.jpg) | Chụp thành hai khung nhìn do công cụ chụp toàn trang gặp lỗi |
| Wireframe | [design/wireframes](../design/wireframes/) | 6 file SVG cho 6 màn hình SV2, không gồm cổng điều hướng và 404 |

Trong quá trình xem mobile đã chỉnh CSS cho thanh đầu trang, hàng công việc, tiến trình Moodboard, thẻ phiên bản, phần Prompt Admin, thông báo và trang lỗi. Chưa có kết quả kiểm thử đầy đủ toàn bộ trang ở 360/768/1440 px hoặc trên nhiều trình duyệt.

## Vấn đề còn ghi nhận

- Đã sửa script mục lục để đọc [hướng dẫn SV2](sv2.md.md) khi README gốc không có; kiểm tra `--check` hiện PASS.
- DOM mô phỏng không xác nhận được CSS thực tế, validation mặc định của trình duyệt, focus/bàn phím, FileReader, clipboard hay hành vi hộp thoại gốc.
- Chưa thực thi đầy đủ thao tác xóa/lưu trữ phiên bản, thay loại tài sản, upload ảnh thật và các trường hợp hết dung lượng LocalStorage trong lần kiểm tra hiện tại.
- Chưa chạy đầy đủ luồng liên vai trò giữa SV1 → SV2 → SV3 trên mã đã tích hợp.
- Firefox/Safari, kiểm thử trên điện thoại thật, phê duyệt Figma, video OBS và trạng thái review/merge PR chưa được xác minh trong báo cáo này.

## Checklist tiếp theo

Dùng [test-client.md](test-client.md) để chạy thủ công phần SV2. Tên file được giữ theo mẫu đầu vào; nội dung bên trong đã đổi sang Designer, Admin Template và các trang dùng chung của SV2.

Chỉ cập nhật trạng thái đạt khi đã thực hiện thao tác và có kết quả thực tế tương ứng.

## Kiểm tra lại AI-3 theo video tham chiếu — 26/10/2026

- Đã khôi phục hộp thoại nhập mô tả, spinner/skeleton và các bước xử lý; kết quả có chủ đề, 4 màu HEX, nhãn từ khóa, giải thích, gợi ý chất liệu và Typography.
- Trình duyệt thực tế: đã thử sinh gợi ý cà phê, Tạo lại với trà, Từ chối giữ nguyên bảng màu, mô phỏng lỗi, Thử lại, chuyển sang form nhập màu thủ công, Áp dụng rồi tải lại vẫn giữ từ khóa và giải thích. Không ghi nhận lỗi JavaScript trong các luồng được kiểm tra.
- Mobile 390 × 844: hộp thoại nằm trong màn hình, nội dung cuộn riêng; bảng màu chuyển 2 cột, chân hộp thoại có các nút thao tác. Đo vùng nội dung không bị tràn ngang.
- Ảnh minh chứng: [nhập mô tả](../design/mockups/ai-3-input.jpg), [kết quả](../design/mockups/ai-3-result.jpg), [giải thích/chất liệu/Typography](../design/mockups/ai-3-result-details.jpg), [lỗi](../design/mockups/ai-3-error.jpg), [kết quả mobile](../design/mockups/mobile-ai-3-result.jpg).
- AI vẫn là mô phỏng JavaScript theo các nhóm từ khóa; chưa gọi API hoặc xác nhận độ chính xác của một mô hình AI thật.

## Tách file dùng chung share.css / share.js — 26/10/2026

- Dữ liệu mẫu, LocalStorage, menu, vai trò và tiện ích form dùng chung được tập trung trong `js/share.js`; CSS nền tảng và thành phần chung ở `css/share.css`.
- Các file riêng giữ xử lý và định dạng riêng, gồm toàn bộ luồng AI-3 mới của Moodboard.
- Bộ kiểm tra tự động đạt sau khi nạp script đúng thứ tự từ HTML; có kiểm tra thêm chọn vai trò ở cổng điều hướng và liên kết quay về của 403.
- Đã đối chiếu trên trình duyệt cả 8 trang trước/sau bằng kích thước, display, màu, nền, cỡ chữ và padding của các khối chính được chọn; không ghi nhận khác biệt. Không ghi nhận lỗi JavaScript trong lượt mở trang này.
