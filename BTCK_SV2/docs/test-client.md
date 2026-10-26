# Checklist kiểm thử phần SV2

Dự án **CreatorStudio — CSE122**. Cập nhật: **26/10/2026**.

File giữ tên `test-client.md` theo mẫu được cung cấp; nội dung là checklist dành cho **SV2**, gồm Designer Dashboard, Moodboard, Version Management, Admin Brief Template, Profile và Notifications.

Đây là **kịch bản và kết quả mong đợi**, không phải danh sách đã kiểm thử đạt. Kết quả đã thực thi được ghi riêng trong [test-results.md](test-results.md).

## Chuẩn bị

1. Mở thư mục dự án bằng VS Code và chạy Live Server, hoặc chạy `python server.py 8000` từ thư mục gốc rồi truy cập `http://localhost:8000/index.html`.
2. Dùng hồ sơ trình duyệt kiểm thử riêng hoặc dữ liệu demo đã sao lưu. Không xóa dữ liệu cá nhân chưa sao lưu.
3. Tại cổng điều hướng, chọn **Nhà thiết kế (An Nguyễn)** để kiểm tra Dashboard, Moodboard và Version Management.
4. Chọn **Quản trị viên (Minh Anh)** để kiểm tra Mẫu Brief & AI-1. Profile và Notifications dùng được với nhiều vai trò.
5. Dữ liệu mẫu: dự án Mộc Coffee và Lúa Tea; mật khẩu demo ban đầu `demo123` nếu chưa thay đổi. Chỉ dùng mật khẩu thử nghiệm.

## Điều hướng và dữ liệu

| Mã | Nhóm | Thao tác | Kết quả mong đợi |
|---|---|---|---|
| TC-01 | Vai trò | Chọn Designer ở cổng điều hướng | Mở Dashboard; hiện đúng tên và vai trò tài khoản demo |
| TC-02 | Phân quyền | Khi đang là Designer, mở trực tiếp `admin-brief-template-management.html` | Chuyển tới trang hỗ trợ với mã 403, không mở trang quản trị |
| TC-03 | Admin | Chọn Admin rồi mở Mẫu Brief & AI | Hiện danh mục mẫu Brief và phần cấu hình Prompt |
| TC-04 | Vai trò dùng chung | Chọn lần lượt Designer, Admin, Lead, Client rồi mở Profile | Hiện thông tin tài khoản đang chọn; Client/Lead dùng Profile làm trang bắt đầu của bản SV2 |
| TC-05 | Dự án | Chọn Mộc Coffee rồi chuyển sang Lúa Tea | Nội dung theo dự án đang chọn; lựa chọn được giữ khi tải lại trong cùng phiên |
| TC-06 | Dữ liệu | Thay đổi một dữ liệu hợp lệ, lưu rồi tải lại trang | Giá trị đã lưu vẫn còn; trang liên quan đọc được dữ liệu theo cùng schema LocalStorage |
| TC-07 | Dự án lưu trữ | Dùng bộ dữ liệu kiểm thử có dự án `archived: true`, thử thêm/sửa dữ liệu thuộc dự án | Có thông báo chỉ xem; chặn thao tác ghi thuộc dự án đã lưu trữ |

## Designer Dashboard — Màn hình 4

| Mã | Nhóm | Thao tác | Kết quả mong đợi |
|---|---|---|---|
| TC-08 | Tìm kiếm | Nhập một phần tên nhiệm vụ, sau đó nhập chuỗi không khớp | Chỉ hiện nhiệm vụ phù hợp; khi không khớp có trạng thái rỗng |
| TC-09 | Bộ lọc | Chọn trạng thái và mức ưu tiên; thử kết hợp với tìm kiếm | Danh sách và số lượng kết quả khớp tất cả điều kiện |
| TC-10 | Trạng thái giao diện | Bấm Bình thường, Đang tải, Rỗng, Cảnh báo gấp | Hiện đúng trạng thái tương ứng; bản cơ bản dùng dòng thông báo khi đang tải |
| TC-11 | Hoàn thành | Tích checkbox công việc, bỏ tích; đổi trạng thái bằng dropdown | Dữ liệu và cách hiển thị cập nhật đúng; tải lại vẫn giữ trạng thái đã lưu |
| TC-12 | Thêm nhiệm vụ | Để trống tên/hạn, thử tên quá ngắn; sau đó nhập hợp lệ và lưu | Dữ liệu sai bị chặn; dữ liệu hợp lệ được lưu đúng dự án/người phụ trách. Nhiệm vụ giao người khác có thể không nằm trong danh sách của tôi |
| TC-13 | Thống kê | Đổi một nhiệm vụ sang hoàn thành | Các chỉ số liên quan và cảnh báo cập nhật; nhiệm vụ đã hoàn thành không còn được tính là việc gấp |

## Moodboard & AI-3 — Màn hình 5

| Mã | Nhóm | Thao tác | Kết quả mong đợi |
|---|---|---|---|
| TC-14 | Bảng màu | Thêm màu HEX hợp lệ; thử mã sai định dạng; xóa một ô màu | Chấp nhận dạng `#RRGGBB`, báo lỗi mã sai, cập nhật bảng màu và dữ liệu đã lưu |
| TC-15 | Clipboard | Di chuột/chạm vào ô màu, bấm Copy HEX rồi dán vào ô văn bản thử | Sao chép đúng mã HEX; nếu trình duyệt không hỗ trợ/cho phép clipboard thì hiển thị mã màu để người dùng biết |
| TC-16 | Từ khóa | Thêm từ khóa, thử khoảng trắng hoặc từ đã có; xóa từ khóa | Chỉ thêm từ có nội dung và không trùng; xóa đúng mục; tải lại còn dữ liệu đã lưu |
| TC-17 | Thẻ ảnh | Thêm thẻ gồm tên, loại, ảnh mẫu và ghi chú; sau đó xóa | Hiện đúng thẻ và số lượng; dữ liệu được lưu đúng Moodboard |
| TC-18 | Tiêu đề/trạng thái | Đổi tiêu đề, chia sẻ Moodboard, tải lại | Giữ tiêu đề mới; trạng thái `Shared` được hiển thị và lưu. Đây là mô phỏng, không gửi dữ liệu lên dịch vụ chia sẻ thật |
| TC-19 | AI đầu vào | Mở AI-3, nhập dưới 5 ký tự rồi bấm sinh gợi ý | Báo lỗi đầu vào, chưa chuyển sang kết quả |
| TC-20 | AI thành công | Nhập “Cà phê giấy kraft tự nhiên”, sinh gợi ý | Có spinner/skeleton và các bước xử lý; hiện chủ đề, 4 màu, nhãn từ khóa, giải thích, gợi ý chất liệu và Typography. Kết quả lấy từ quy tắc có sẵn, không phải API AI thật |
| TC-21 | AI nhóm phong cách | Thử mô tả “Trà xanh thanh mát”, “Sang trọng cao cấp đen vàng”, sau đó mô tả không thuộc nhóm hỗ trợ | Nhóm trà và nhóm cao cấp có gợi ý tương ứng; mô tả không nhận diện được có hướng dẫn bổ sung từ khóa |
| TC-22 | AI quyền quyết định | Sau khi có kết quả, thử Từ chối (Reject); mở lại, Tạo lại (Regenerate); cuối cùng Chấp nhận & Áp dụng | Từ chối không thay bảng màu; sửa mở lại đầu vào; Áp dụng lưu màu/từ khóa, giải thích và trạng thái `Palette Ready`. Cùng mô tả có thể cho cùng kết quả |
| TC-23 | AI lỗi | Bật mô phỏng lỗi, sinh gợi ý; thử Thử lại và Chọn màu thủ công | Có thông báo lỗi; thử lại bỏ tùy chọn giả lập lỗi; chọn thủ công mở form thêm màu |

## Quản lý phiên bản — Màn hình 6

| Mã | Nhóm | Thao tác | Kết quả mong đợi |
|---|---|---|---|
| TC-24 | Danh sách | Chọn từng trạng thái, gồm trạng thái chưa có phiên bản | Chỉ hiện bản phù hợp; số lượng và trạng thái rỗng đúng |
| TC-25 | Sinh mã | Mở form thêm mới; chuyển BaoBi → Logo → AnPham | Mã xem trước tính theo dự án và loại tài sản. Từ dữ liệu Mộc Coffee ban đầu, BaoBi mới là `MC26-BaoBi-v4` |
| TC-26 | Thêm mới | Nhập tên/changelog hợp lệ, chọn ảnh mẫu rồi lưu | Tạo `Draft` với mã đúng; ảnh, tác giả và thông tin phiên bản hiển thị; tải lại vẫn còn |
| TC-27 | Upload thật | Chọn PNG/JPEG/WebP hợp lệ ≤ 1 MB; thử file khác loại hoặc > 1 MB | Ảnh hợp lệ được đọc và lưu; file sai bị từ chối với thông báo cụ thể |
| TC-28 | Sửa bản nháp | Sửa tên, changelog và checklist của bản nháp do tài khoản hiện tại tạo | Lưu đúng thay đổi; chỉ hiện nút sửa/xóa đối với bản nháp thuộc người dùng |
| TC-29 | Nộp duyệt | Nộp khi checklist thiếu, sau đó tích đủ 3 mục và nộp lại | Khi thiếu giữ `Draft`; khi đủ chuyển `Internal Review` và tạo thông báo cho Lead |
| TC-30 | Xóa bản nháp | Tạo bản nháp dùng thử, xác nhận xóa, tải lại | Chỉ xóa bản nháp được phép; bản đã nộp duyệt không có nút xóa nháp |
| TC-31 | Lưu trữ | Lưu trữ một phiên bản dùng thử của tài khoản hiện tại | Chuyển `Archived`, giữ thông tin phiên bản và hiển thị đúng khi lọc |

## Mẫu Brief & Prompt AI-1 — Màn hình 10

| Mã | Nhóm | Thao tác | Kết quả mong đợi |
|---|---|---|---|
| TC-32 | Danh mục | Tìm kiếm theo tên/mô tả; kết hợp lọc ngành hàng và trạng thái | Danh sách, số lượng và trạng thái rỗng đúng |
| TC-33 | Chọn mẫu | Chọn từng mẫu Branding, Packaging, UI/UX, Campaign | Khung cấu hình hiện tên, ngành hàng và Prompt tương ứng mẫu đang chọn |
| TC-34 | Bật/tắt | Bật hoặc tắt một mẫu, tải lại | Trạng thái áp dụng được lưu và hiển thị đúng |
| TC-35 | Thêm mẫu | Nhập thiếu/tên quá ngắn/Prompt quá ngắn, rồi nhập hợp lệ | Dữ liệu sai bị chặn; mẫu hợp lệ được thêm và có thể chọn để cấu hình |
| TC-36 | Prompt | Chèn token, sửa và lưu Prompt; tải lại | Token được chèn vào ô soạn; Prompt đã lưu được khôi phục đúng mẫu |
| TC-37 | Khôi phục Prompt | Bấm khôi phục, chưa lưu; sau đó thử lưu | Điền nội dung mặc định vào ô soạn; chỉ ghi dữ liệu sau khi bấm lưu |
| TC-38 | Thử AI-1 | Nhập mô tả quá ngắn rồi hợp lệ và bấm chạy thử | Đầu vào sai có thông báo; hợp lệ có trạng thái xử lý và kết quả mô phỏng chứa mô tả, các mục mẫu và Prompt sau khi thay `{raw_input}` |

## Hồ sơ cá nhân — Màn hình 15

| Mã | Nhóm | Thao tác | Kết quả mong đợi |
|---|---|---|---|
| TC-39 | Xem/sửa | Mở trang, bấm chỉnh sửa rồi hủy | Ban đầu các trường bị khóa; sửa mở trường; hủy khôi phục dữ liệu đã lưu |
| TC-40 | Thông tin | Thử tên chỉ có khoảng trắng, email sai/trùng, sau đó lưu dữ liệu hợp lệ | Báo lỗi dữ liệu không hợp lệ; dữ liệu hợp lệ được lưu, tên/avatar liên quan cập nhật |
| TC-41 | Avatar | Thử URL sai giao thức; URL http/https hợp lệ nhưng ảnh lỗi; để trống URL | Chặn giao thức không hỗ trợ; ảnh lỗi hoặc URL rỗng dùng ký tự thay thế |
| TC-42 | Mật khẩu demo | Sai mật khẩu hiện tại; mới dưới 6 ký tự; xác nhận không khớp; cuối cùng nhập hợp lệ | Báo lỗi tương ứng; chỉ lưu khi đủ điều kiện. Tải lại rồi xác minh mật khẩu demo mới |
| TC-43 | Thống kê | Đổi người dùng hoặc hoàn thành công việc rồi mở lại hồ sơ | Số dự án, nhiệm vụ hoàn thành, phiên bản tương ứng đúng tài khoản |

## Thông báo — Màn hình 16

| Mã | Nhóm | Thao tác | Kết quả mong đợi |
|---|---|---|---|
| TC-44 | Bộ lọc | Chọn Tất cả/Chưa đọc/Phiên bản/Nhận xét/Nhiệm vụ; kết hợp lọc dự án | Chỉ hiện thông báo phù hợp và số lượng đúng; có trạng thái rỗng khi không khớp |
| TC-45 | Đã đọc | Đánh dấu một mục rồi tất cả đã đọc; tải lại | Danh sách và số chưa đọc cập nhật, giữ trạng thái sau tải lại; không thay đổi thông báo của tài khoản khác |
| TC-46 | Xóa | Xóa một thông báo dùng thử; xác nhận xóa tất cả của tài khoản hiện tại | Xóa đúng phạm vi; hộp thư rỗng có thông báo; hộp thư người khác được giữ |
| TC-47 | Chi tiết/liên vai trò | Bấm Xem chi tiết; dùng thông báo Lead được tạo từ nộp phiên bản | Mục được đánh dấu đã đọc; chỉ dẫn tới trang hiện có/phù hợp trong bản SV2. Chưa coi đây là hoàn tất luồng duyệt của SV3 |

## Mobile, khả năng sử dụng và tích hợp

| Mã | Nhóm | Thao tác | Kết quả mong đợi |
|---|---|---|---|
| TC-48 | Responsive | Thử 6 trang ở 360, 390, 768 và 1440 px; cuộn hết trang | Không tràn ngang; chữ và nút đọc/bấm được; khối dữ liệu và form không che nhau |
| TC-49 | Menu mobile | Mở menu, chọn liên kết; thử nút đóng, Escape và bấm nền che | Menu mở/đóng đúng, không chặn nội dung sau khi đóng; ghi nhận riêng nếu focus không phù hợp |
| TC-50 | Hộp thoại | Mở form thêm nhiệm vụ/phiên bản/màu/mẫu Brief; đóng bằng nút và Escape | Form vừa màn hình, có thể cuộn tới nút lưu, không mất dữ liệu đã lưu trước đó |
| TC-51 | Bàn phím | Dùng Tab/Shift+Tab/Enter/Escape qua menu, form và modal | Thấy vị trí focus, thứ tự hợp lý, thực hiện được thao tác chính; lỗi phát hiện phải ghi lại |
| TC-52 | Trình duyệt | Chạy lại các luồng trên Chrome/Edge và Firefox/Safari nếu có | Ghi kết quả thực tế theo từng trình duyệt; trình duyệt chưa chạy không được coi là đạt |
| TC-53 | Tích hợp | Dùng bản ghép mã SV1/SV2/SV3, thử brief → thiết kế/phiên bản → duyệt → thông báo | Dữ liệu và phân quyền thống nhất giữa các phân hệ. Chỉ đánh dấu đạt sau khi chạy trên bản tích hợp |

## Nhật ký chạy thủ công

Điền một dòng cho mỗi trường hợp đã chạy; các trường trống bên dưới chưa thể hiện kết quả đạt.

| Ngày | Người kiểm tra | Mã TC | Trình duyệt / kích thước | Kết quả thực tế | Đạt / Lỗi / Chưa chạy | Minh chứng / ghi chú |
|---|---|---|---|---|---|---|
| | | | | | | |

Ảnh minh họa hiện có nằm trong [design/mockups](../design/mockups/); wireframe nằm trong [design/wireframes](../design/wireframes/). Ảnh minh họa không thay thế nhật ký kiểm thử hoặc phê duyệt Figma/PR và video OBS của sinh viên.
