# CreatorStudio — bàn giao phần SV1

Phần này được đối chiếu với `README (2).md`, bảng kiểm kê Excel và bản xuất Trello người dùng cung cấp. Bảng Excel chốt 5 màn hình cho SV1; Trello có nhiều bản thẻ trùng mã nên đối chiếu theo tên công việc.

## Chạy website

Mở thư mục dự án trong VS Code, nhấn chuột phải `index.html` → **Open with Live Server**. Hoặc tại thư mục chứa `index.html`, chạy:

```bash
python3 -m http.server 8000
```

Website không cần npm hoặc backend để chạy. Dùng HTTP vì dữ liệu mẫu được đọc bằng `fetch()` từ `assets/data/projects.json`.

## 5 bộ file riêng

| Trang                 | HTML                           | CSS                               | JavaScript                      |
| --------------------- | ------------------------------ | --------------------------------- | ------------------------------- |
| Landing Portal        | `index.html`                   | `css/index.css`                   | `js/index.js`                   |
| Login & Demo Switcher | `login.html`                   | `css/login.css`                   | `js/login.js`                   |
| Project Overview      | `client-project-overview.html` | `css/client-project-overview.css` | `js/client-project-overview.js` |
| Creative Brief        | `client-creative-brief.html`   | `css/client-creative-brief.css`   | `js/client-creative-brief.js`   |
| Review Versions       | `client-review-versions.html`  | `css/client-review-versions.css`  | `js/client-review-versions.js`  |

`css/tokens.css` và `css/shared.css` chứa các thành phần dùng chung. `js/shared.js` quản lý khởi tạo JSON, LocalStorage, vai trò, sidebar, toast, hoạt động và hộp xác nhận. Các hình SVG nằm trong `assets/images/`.

## Luồng trình diễn Client

1. Landing → **Khám phá bản demo**, hoặc Login → **Khách hàng**. Biểu mẫu login kiểm tra email/mật khẩu demo; có 4 vai trò và ghi nhớ vai trò đã chọn.
2. Project Overview: tìm kiếm, lọc trạng thái, tạo/sửa dự án, lưu trữ/khôi phục, xóa dự án đã lưu trữ. Mỗi card hiển thị tiến độ, trạng thái brief và phiên bản.
3. Dùng **Mộc** để trình diễn toàn bộ luồng có sẵn phiên bản: chọn **Viết brief**, nhập mô tả trên 20 ký tự, ngân sách và deadline, tạo gợi ý 5 phần. Rà soát/sửa, chấp nhận, lưu hoặc gửi brief. Kết quả được chấp nhận sẽ được lưu ngay. Nội dung sửa cần xác nhận lại. Brief đã gửi hiện trong trang dự án.
4. **Review Versions**: so sánh v1.0/v2.0 song song hoặc thanh trượt; nhấn ảnh v2.0 để ghim phản hồi. Nút **＋ Phản hồi** hỗ trợ bàn phím bằng pin giữa ảnh. Có sửa/xóa, đánh dấu đã xử lý và lọc phản hồi.
5. **Yêu cầu chỉnh sửa** cần có phản hồi chưa xử lý. **Phê duyệt** chuyển dự án sang Completed/100%. **Từ chối phiên bản** mở modal nhập lý do tối thiểu 10 ký tự; lưu Rejected, lý do và ngày review. Phiên bản đã duyệt hoặc bị từ chối chuyển sang chỉ đọc. Phiên bản mới cần được SV2 bổ sung khi tích hợp.
6. Chuông hoạt động ghi nhận gửi brief, phản hồi và quyết định review. Có trạng thái chưa đọc, đánh dấu đã đọc, đóng bằng Escape hoặc bấm ngoài.
7. Menu mobile có nền che, nút đóng, Escape, giữ focus trong menu và trả focus về nút mở. Vai trò ngoài Client hiện trạng thái 403 trong bộ SV1, có nút quay về Client.

Dự án mới có brief nhưng chưa có thiết kế. Trạng thái rỗng ở trang review là đúng nghiệp vụ; không tự tạo bản upload của Designer. Các dự án mẫu Mộc/Forma/Sunday có thiết kế để kiểm tra phần Client.

## Dữ liệu và tích hợp nhóm

- JSON mẫu: `assets/data/projects.json`; LocalStorage: `creatorstudio.sv1.v1`. Dữ liệu v1 từ bộ trước được giữ nếu hợp lệ.
- Project: `id`, `name`, `category`, `description`, `deadline`, `budget`, `status`, `progress`, `art`, `brief`, `versionStatus`, `comments`, `rejectionReason`, `reviewedAt`.
- Brief: `raw`, `sections` gồm `goal/audience/message/style/deliverables`, `budget`, `deadline`, `accepted`, `submitted`, `source`, `explanation`, `updatedAt`.
- Comment: `id`, `text`, `x/y` tương đối từ 0 đến 1, `resolved`, `createdAt`. Dùng ảnh có cùng tỉ lệ để giữ tọa độ trên các kích thước màn hình.
- Hoạt động: `notifications` có `id`, `message`, `projectId`, `type`, `read`, `createdAt`.
- Vai trò phiên hiện tại lưu ở SessionStorage `cs.session`; vai trò ưu tiên lưu ở LocalStorage `cs.preferredRole`. Đăng xuất xóa phiên, giữ lựa chọn vai trò.
- Có thể dùng `CS.read()`, `CS.update(id, fn)`, `CS.write(data)` và `CS.notify(...)` làm điểm ghép dữ liệu. SV2 có thể thay JSON/LocalStorage bằng lớp API chung.

SV2/SV3 cần ghép các trang Designer/Lead/Admin và trang lỗi thật, chuyển hướng theo vai trò, lớp dữ liệu và quy trình gửi/nhận phiên bản. Panel 403 hiện tại phục vụ riêng bộ SV1. Hoạt động là dữ liệu cục bộ, chưa phải thông báo đa người dùng.

## AI và đăng nhập

AI Brief Structurer là mô phỏng bằng quy tắc. Có loading, lỗi đầu vào ngắn, cảnh báo chưa chắc chắn, giải thích và các thao tác chấp nhận/sửa/từ chối/tạo lại/viết thủ công. Ngân sách nêu rõ như “20 triệu” có thể được nhận diện; mọi đề xuất đều cần người dùng kiểm tra. Không gọi LLM hay gửi mô tả ra dịch vụ bên ngoài.

Đăng nhập là demo, không lưu mật khẩu và không xác thực với máy chủ. Không dùng mật khẩu thật. Phân quyền trình duyệt chỉ dùng để minh họa frontend.

## Thiết kế và minh chứng

- `design/ui-kit.svg`: bảng màu, typography, spacing và các thành phần tham chiếu.
- `design/wireframes/`: khung bố cục của 5 trang, gồm desktop và mobile.
- `design/mockups/`: ảnh chụp giao diện thực tế trên Chromium, desktop/mobile. Có thể nhập ảnh/SVG vào Figma để nhóm chỉnh sửa và duyệt.
- `design/figma-link.txt`: link Figma lấy từ thẻ UI Kit trong Trello.
- `docs/screen-list.md`: trạng thái của mỗi màn hình.
- `docs/task-map.md`: bảng đối chiếu nhiệm vụ, mã nguồn và công việc còn cần nhóm thực hiện.
- `docs/ai-usage-report.md`: khai báo phần được AI sinh và phần mock.

Ảnh chụp và SVG không chứng minh mockup đã được duyệt trong Figma. Sinh viên cần tự review, chỉnh sửa, quay OBS có mặt và liên kết PR/video theo yêu cầu môn học. Các mục này chưa được đánh dấu hoàn thành thay cho sinh viên.

## Kiểm thử

Đã đạt 75 kiểm tra trên Chromium; xem `docs/test-results.md`. Có kiểm tra trình duyệt trong `tests/sv1.e2e.cjs` và checklist thủ công trong `docs/test-client.md`. Việc chạy website không cần các dependency kiểm thử.

Để chạy tự động khi muốn kiểm tra lại, cài Playwright phục vụ kiểm thử:

```bash
npm install --no-save --package-lock=false playwright
npx playwright install chromium
```

Giữ máy chủ HTTP chạy ở terminal thứ nhất; tại terminal thứ hai chạy:

```bash
node tests/sv1.e2e.cjs
```

Nếu dùng cổng khác, đặt biến `CS_BASE_URL`. Có thể đặt `CS_CHROMIUM_PATH` nếu đã có Chromium cài sẵn. Bài kiểm tra dùng dữ liệu trong phiên trình duyệt riêng, không sửa JSON mẫu.
