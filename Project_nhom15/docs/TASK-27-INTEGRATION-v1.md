# TASK-27 — Tích hợp toàn nhóm, bản v1

Người phụ trách: SV3 tích hợp; SV1/SV2 review phần mình. Cập nhật: 14/10/2026.
Trạng thái bản dùng chung v5: đã triển khai/kiểm tra và nhóm đồng ý theo xác nhận người dùng 14/10/2026. Trạng thái merge/phát hành đối chiếu PR #4 trên GitHub; các ghi chú v1–v4 bên dưới là lịch sử.

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

## Bổ sung bản v3 — giới thiệu chức năng và chân trang (14/10/2026)

Theo yêu cầu người dùng, thêm mục “CreatorStudio có thể làm gì?” sau phần quy trình, gồm sáu thẻ: dự án/brief, giao công việc, moodboard, quản lý/duyệt phiên bản, tổng hợp phản hồi, quản lý nhóm/dự án. Thêm chân trang nền xanh nhạt với giới thiệu thương hiệu và bốn nhóm liên kết: Sản phẩm, Dành cho, Khám phá, Dự án; các liên kết nội bộ dẫn tới phần thật trên trang và các vai trò dùng trang đăng nhập demo.

- [x] Nội dung phản ánh các chức năng đang có của CreatorStudio.
- [x] Có liên kết GitHub/PR thật; không tạo liên kết mạng xã hội hoặc trang chính sách chưa tồn tại.
- [x] Sáu thẻ bố cục 3/2/1 cột tùy màn hình; chân trang thu gọn trên mobile.
- [x] Kiểm tra 320/390/768/1440px không tràn ngang.
- [x] Kiểm tra liên kết nội bộ chân trang và điều hướng tới thẻ phiên bản.
- [x] Đã xem ảnh desktop/màn hình 320px; năm nhóm kiểm tra bố cục/liên kết Chromium PASS, không lỗi JavaScript.

File thay đổi: index.html và css/index.css. Bản ZIP mới: CreatorStudio-Task27-Integration-v3-Landing.zip. QA này dành cho nội dung Landing mới; không thay các kết quả tích hợp v1 hoặc menu v2.

## Bổ sung bản v4 — kiểu chữ và màu Landing (14/10/2026)

Theo ảnh mẫu mới, làm nổi bật phần giới thiệu chức năng bằng nền xanh đen, tiêu đề lớn màu trắng với dòng nhấn xanh sáng, thẻ nội dung xanh tối và mô tả sáng dễ đọc. Trang chủ dùng Inter variable cục bộ; tiêu đề hero chuyển từ chữ nghiêng serif sang chữ đậm, các tiêu đề phần có kích thước/phân cấp rõ hơn và chân trang dùng xanh sáng hơn. Nội dung vẫn mô tả các chức năng CreatorStudio đang có.

- [x] Font Inter được tải cục bộ, không phụ thuộc font trên máy người xem.
- [x] Tiêu đề, mô tả, nền và nút có phân cấp rõ ràng.
- [x] Kiểm tra 320/390/768/1440px không tràn ngang.
- [x] Đã xem ảnh phần chức năng desktop và menu mobile.
- [x] Năm nhóm bố cục/liên kết và 17 lượt menu Chromium PASS sau đổi font; không lỗi JavaScript.

File thay đổi: index.html và css/index.css. Bản ZIP mới: CreatorStudio-Task27-Integration-v4-Typography.zip. Đây là chỉnh sửa Landing; các kết quả dữ liệu/luồng nghiệp vụ trước đó vẫn giữ riêng.


## Hoàn thiện bản v5 — nhóm đồng ý (14/10/2026)

Người dùng xác nhận cả nhóm đồng ý, yêu cầu hoàn thiện website để dùng và sửa tiếp khi có phản hồi. Bổ sung đăng ký Client/đăng nhập đúng tài khoản/đăng xuất, nối đổi mật khẩu với đăng nhập; sửa quyền cập nhật hồ sơ, giữ focus tìm kiếm, mở thông báo đúng dự án, tên người phản hồi và lý do từ chối sau tải lại. Khi chưa có bản trước để so sánh, màn review giải thích rõ thay vì lặp ảnh hiện tại.

- [x] Đăng ký/đăng nhập/đăng xuất, email trùng, mật khẩu sai, tài khoản khóa.
- [x] Hồ sơ/mật khẩu có tác dụng qua tải lại và đăng nhập lại.
- [x] Sửa các lỗi trải nghiệm tìm được trong khi kiểm thử cuối.
- [x] 23 kiểm tra sử dụng mới, 34 lượt tích hợp, 9 file regression và 11 nhóm dữ liệu tích hợp đạt.
- [x] Hướng dẫn, kiểm kê18trang, phân công và báo cáoAI đã đồng bộ trong README và docs.
- [x] Đồng ý nhóm được ghi theo xác nhận người dùng; không tạo review cá nhân giả.

Minh chứng cuối: docs/qa-final-v5/result.json và integration/result.json. Gói: CreatorStudio-Task27-Integration-v5-Complete.zip. Figma/OBS/nộp học phần tiếp tục theo hồ sơ riêng; đây là frontend demo lưu dữ liệu trên trình duyệt.

## Điều hướng Landing v6 — 14/10/2026

Mô tả: liên kết đến nội dung trong index cuộn mượt theo cả hai chiều; navbar giữ ở đầu màn hình khi cuộn. Khoảng cách tại điểm đến tự tính theo chiều cao navbar để không che tiêu đề trên desktop và mobile.

- [x] Cuộn mượt các liên kết trong trang, gồm menu Cách hoạt động và footer.
- [x] Navbar sticky có nền kín; menu vẫn mở/đóng bình thường.
- [x] Chừa khoảng cách theo chiều cao navbar khi đổi kích thước màn hình.
- [x] Tôn trọng cài đặt giảm chuyển động của thiết bị.

File: css/index.css, js/index.js. Bản giao: CreatorStudio-Task27-Integration-v6-SmoothNavigation.zip.

## Navbar toàn chiều ngang v7 — 14/10/2026

Mô tả: nền, đường viền và vùng navbar phủ hết chiều ngang màn hình; logo/menu căn theo nội dung trang. Giữ sticky và cuộn mượt của v6.

- [x] Bỏ giới hạn chiều rộng 1260px của header.
- [x] Giữ logo/menu và dropdown căn theo khối nội dung desktop.
- [x] Kiểm tra navbar toàn chiều ngang và không tràn trên desktop/mobile.

File: css/index.css. Gói: CreatorStudio-Task27-Integration-v7-FullWidthNavbar.zip.

## Yêu cầu đăng nhập từ menu tính năng v8 — 16/10/2026

Mô tả: bốn mục trong “Khả năng sáng tạo” dẫn đến trang đăng nhập, không tự mở phiên hoặc chuyển vai trò. Sau khi đăng nhập thành công, mở đúng tính năng nếu tài khoản có vai trò tương ứng; nếu không, mở tổng quan của tài khoản. Đây vẫn là xác thực mô phỏng phía trình duyệt.

- [x] Bỏ đăng nhập demo tự động khi bấm mục tính năng.
- [x] Giữ trang đích qua tham số next trong URL đăng nhập.
- [x] Chỉ chấp nhận bốn trang nội bộ cho phép, kiểm tra theo vai trò tài khoản thực tế.
- [x] Mật khẩu sai không mở trang đích; vai trò khác không bị tự chuyển sang Client.
- [x] Kiểm tra bốn liên kết, đăng nhập thường/demo, đích không hợp lệ và responsive.
- [x] Chỉ cập nhật dev; main chờ nhóm thống nhất.

File: index.html, js/index.js, js/login.js. Gói: CreatorStudio-Task27-Integration-v8-FeatureLogin.zip.

## Đồng bộ Hồ sơ/Thông báo trong không gian Khách hàng v9 — 16/10/2026

Mô tả: khi tài khoản Client mở Hồ sơ hoặc Thông báo, dùng lại CS.shell của ba màn Client thay vì shell tối SV2. Giữ cùng thứ tự menu, chiều rộng, logo, topbar, menu mobile; đổi các thành phần hai trang sang bảng màu xanh/kem của Client. Các vai trò khác giữ shell hiện có.

- [x] Dùng chung khung Client, đánh dấu đúng mục đang xem và giữ dự án khi quay lại.
- [x] Đồng bộ nền, nút, avatar, tab và thẻ thông báo với bảng màu Client.
- [x] Giữ chức năng lưu hồ sơ, đổi mật khẩu, đánh dấu đã đọc và xóa thông báo.
- [x] Header cập nhật tên tài khoản và số thông báo sau thao tác.
- [x] 16 kiểm tra Chromium đạt: ba trang ở 320/390/1024/1440px, so sánh sidebar, menu mobile, hồ sơ/mật khẩu/thông báo và shell Designer.
- [x] Chỉ đưa lên dev; main chờ nhóm thống nhất.

File: profile.html, notifications.html, js/app-sv2.js, js/shared.js, css/client-account.css. Gói: CreatorStudio-Task27-Integration-v9-ClientAccountStyle.zip.

## Điều hướng đồng nhất mọi vai trò v10 — 16/10/2026

Mô tả: Designer, Lead, Admin cùng dùng Navigation.renderShell thay vì hai bản shell riêng. Hồ sơ/Thông báo tiếp tục hiển thị menu và dự án của vai trò hiện tại. Sidebar nền sáng xanh/kem, độ rộng 230px desktop, 195px tablet, 240px drawer mobile; menu theo đúng quyền. Client giữ khung đã đồng bộ ở v9.

- [x] Một khung DOM/CSS dùng chung cho 3 vai trò và trang dùng chung.
- [x] Cố định kích thước sidebar/topbar, đồng bộ Inter cục bộ và preload.
- [x] Giữ chỗ thanh cuộn bằng scrollbar-gutter để hạn chế dịch ngang khi đổi trang dài/ngắn.
- [x] Giữ vị trí cuộn sidebar; hỗ trợ chuyển tài liệu bằng View Transitions nếu trình duyệt hỗ trợ, giảm chuyển động theo cài đặt thiết bị.
- [x] Sửa tràn ở Moodboard, hàng nút Phiên bản và lưới Mẫu Brief tại 320px.
- [x] 69 kiểm tra trình duyệt đạt: 3 vai trò × 5 trang × 4 kích thước, chuyển vai trò, bấm menu thực và công cụ demo.
- [x] Kiểm tra lại 16 trường hợp Client/hồ sơ/mật khẩu/thông báo; 9 file regression đạt.
- [x] Chỉ cập nhật dev; main chờ nhóm thống nhất.

Minh chứng: docs/qa-navigation-v10/result.json. Gói: CreatorStudio-Task27-Integration-v10-UnifiedNavigation.zip. Kiểm tra Chromium, không suy thành xác nhận trên mọi trình duyệt; hiệu ứng chuyển tài liệu phụ thuộc trình duyệt và nên chạy qua Live Server.
