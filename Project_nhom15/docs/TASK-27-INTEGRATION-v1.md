# TASK-27 — Tích hợp toàn nhóm, bản v1

Người phụ trách: SV3 tích hợp; SV1/SV2 review phần mình. Cập nhật: 14/10/2026.
Trạng thái: đã triển khai và kiểm tra kỹ thuật; chờ review nhóm. Chưa merge/release.

## Mô tả công việc

Ghép sản phẩm của ba thành viên thành một website chạy trong `Project_nhom15/`. Dùng chung định danh người dùng, dự án, brief, task, phiên bản, phản hồi và thông báo; nối luồng Client → Lead → Designer → Lead → Client. Giữ giao diện và mã đóng góp của từng thành viên; sửa lỗi phát sinh ở ranh giới tích hợp.

Nguồn đã đối chiếu:

- SV1: PR #3, `feature/sv1-creatorstudio`, commit `6bf87c04d3044088c2cd3572cc284c367a4c4892`.
- SV2: PR #2, `feature/sv2-creatorstudio-review`, commit `8881df1714c9cb56aa06e90841c36cc4826c817d`.
- SV3: PR #1, `feature/sv3-task16`, commit `62e6521dece196dcab47275d003b009fe1b9c762`.
- Các PR gốc vẫn giữ nguyên. Bản tích hợp là nhánh `feature/task27-integration-v1` dựa trên SV3, nhập mã SV1/SV2 có ghi nguồn. Không xác nhận review thay tác giả.

## Checklist

- [x] Đọc cả ba bản nộp và tài liệu kiểm thử đi kèm.
- [x] Đưa 17 màn chính vào cùng thư mục chạy; Landing/Login dùng bản SV1.
- [x] Nối chuyển vai trò tới trang thật; menu Hồ sơ/Thông báo quay về đúng phân hệ.
- [x] Dùng một Store giao dịch và một khóa `creatorstudio.team.v1`.
- [x] Client gửi brief → Lead đọc/duyệt và giao Designer.
- [x] Designer nộp phiên bản → Lead kiểm checklist và chuyển Client.
- [x] Client chọn phiên bản thật, xem đúng ảnh, duyệt/yêu cầu sửa; feedback giữ versionId.
- [x] Tải lại giữ dữ liệu; thay đổi tab khác không xóa task vừa tạo.
- [x] Chặn lưu khi quota lỗi, chặn xóa dự án có dữ liệu liên kết.
- [x] Sửa responsive Hồ sơ, Moodboard, thẻ phiên bản và Dashboard của SV2.
- [x] Kiểm tra JavaScript, phụ thuộc file, 9 file regression, 10 nhóm dữ liệu tích hợp.
- [x] Chromium 153: 34 lượt kiểm tra, gồm 14 trang theo vai trò × 390/1440px; hai luồng tích hợp và ba trang dùng chung. Không lỗi JavaScript hoặc HTTP tài nguyên trong các lượt đã chạy.
- [ ] SV1/SV2 review bản tích hợp và xác nhận nghiệp vụ/giao diện.
- [ ] Kiểm tra bổ sung Firefox/Safari và thiết bị thật nếu yêu cầu khi nộp.
- [ ] Merge vào dev/main theo quyết định nhóm.

## Thay đổi đáng chú ý

`js/store.js` giữ kiểm tra nghiệp vụ SV3, bổ sung chức năng Designer/Moodboard/Profile/Template của SV2. `js/client-store-adapter.js` chuyển cấu trúc màn Client của SV1 sang Store chung; không tạo bản sao dữ liệu Client. Phản hồi gắn đúng phiên bản, không hiển thị Draft/Internal Review cho Client, không xóa phản hồi của phiên bản khác. Nộp lại sau yêu cầu sửa phải làm lại checklist Lead.

`js/modules/navigation.js` là bản đồ tuyến chung. `app.js` và `app-sv2.js` giữ khung hiển thị đã nộp, dùng cùng Navigation và Store; CSS SV2 được tách tên để không ghi đè CSS Lead/Admin. Khung Client vẫn có phong cách riêng từ SV1, chưa tuyên bố hoàn tất đồng nhất thiết kế Figma.

Màn Lead hiện ảnh tải lên thực tế thay cho điều kiện cố định một ID mẫu. Màn Client thêm chọn phiên bản và bỏ nhãn v1/v2 cố định. Dữ liệu seed bổ sung metadata SV2 nhưng ưu tiên các trạng thái SV3 khi trùng ID.

## Cách chạy và kiểm tra lại

Từ thư mục `Project_nhom15`:

```bash
python server.py 8000
# Mở http://localhost:8000/index.html
node tests/task27-integration.cjs
node tests/store.test.cjs
# Khi đã cài Playwright và Chromium:
node tests/browser-task27.cjs
```

Có thể đặt `CHROMIUM_EXECUTABLE_PATH` trỏ tới Chromium đã cài. `tests/browser-task27.cjs` tự mở/đóng máy chủ thử và dùng phiên trình duyệt riêng, không chạm dữ liệu trình duyệt cá nhân.

Kết quả máy đọc: `docs/qa-task27-v1/result.json`. Ảnh kiểm tra: cùng thư mục, tên màn hình và chiều rộng. Đã xem ảnh Desktop duyệt nội bộ và Mobile Dashboard; sửa lỗi chữ bị ép thành cột hẹp trên Dashboard trước khi chốt lại.

## Dữ liệu cũ và giới hạn

Bản tích hợp khởi tạo dữ liệu mẫu trong khóa mới; không tự nhập hoặc xóa các khóa `creatorstudio.sv1.v1`, `creatorstudio.sv3.v1`, `creatorstudio.v1`. Các dữ liệu tự nhập ở bản cũ vẫn giữ nguyên nhưng chưa được di chuyển sang bản mới. Xuất bản sao từ bản cũ nếu cần bảo toàn dữ liệu thực hành.

Đây là frontend demo và AI mô phỏng, không phải hệ thống đăng nhập bảo mật/backend thật. Task03/04 Figma vẫn có phần chưa đạt theo hồ sơ cũ; Task28 tài liệu toàn nhóm và Task29 OBS/review/release chưa hoàn thành. Chưa xác minh đăng ký mới theo yêu cầu bổ sung trước đây: bản SV1 nộp hiện có Login + Demo, không có trang đăng ký riêng.

Trello không được cập nhật trực tiếp theo yêu cầu mới nhất của người dùng. Checklist này dùng cho review và cập nhật thẻ khi cần.

## Bổ sung bản v2 — menu Landing theo ảnh mẫu (14/10/2026)

Theo yêu cầu mới của người dùng, thay hai liên kết Cách hoạt động / Khả năng sáng tạo bằng nút mở bảng mục con hai cột, gồm icon màu, tên và mô tả. Cách hoạt động dẫn tới các bước brief, phối hợp, phê duyệt và chọn vai trò; Khả năng sáng tạo mở demo Creative Brief, Moodboard, Quản lý phiên bản và Tổng hợp phản hồi.

- [x] Bấm mở/đóng; chỉ mở một bảng tại một thời điểm.
- [x] Đóng khi bấm bên ngoài; Escape đóng và trả focus về nút.
- [x] ArrowDown mở bảng và chuyển focus tới mục đầu; các liên kết dùng Tab/Enter.
- [x] Bố cục hai cột desktop, một cột mobile; không tràn ngang ở 320/390/768/1440px.
- [x] Bốn mục tính năng đi tới đúng màn demo và giữ dự án đang chọn.
- [x] 17 lượt Chromium dành riêng cho menu PASS; không lỗi JavaScript.

File thay đổi: index.html, css/index.css, js/index.js. Giao diện lấy cách tổ chức từ hai ảnh mẫu người dùng gửi; nội dung được viết cho CreatorStudio. Bản ZIP mới: CreatorStudio-Task27-Integration-v2-Menu.zip. Kết quả Task27 v1 vẫn ghi riêng, không suy test menu thành kiểm thử lại toàn bộ 34 lượt tích hợp.
