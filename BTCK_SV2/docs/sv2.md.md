# CreatorStudio — Website Phân hệ Sinh viên 2 (SV2)

> **Học phần:** Phát triển Ứng dụng Web Cơ bản — CSE122  
> **Nhóm thực hiện:** 3 sinh viên  
> **Sinh viên 2 (SV2) phụ trách:** Phân hệ Nhà thiết kế (Designer), Quản trị Mẫu Brief & AI-1, Hồ sơ cá nhân và Trung tâm thông báo  
> **Công nghệ:** HTML, CSS (Flexbox/Grid), JavaScript cơ bản (DOM, sự kiện, mảng, LocalStorage), SVG cục bộ; không dùng framework hoặc CDN.

---

**Mục lục**

<!-- AUTO-TOC:START -->

- [1. Hướng dẫn Mở và Chạy Website trên Windows / VS Code](#1-hướng-dẫn-mở-và-chạy-website-trên-windows--vs-code)
  - [Cách 1: Sử dụng VS Code Live Server (Khuyến nghị)](#cách-1-sử-dụng-vs-code-live-server-khuyến-nghị)
  - [Cách 2: Mở trực tiếp bằng Trình duyệt](#cách-2-mở-trực-tiếp-bằng-trình-duyệt)
- [2. Bảng Kiểm kê Màn hình SV2 Phụ trách](#2-bảng-kiểm-kê-màn-hình-sv2-phụ-trách)
- [3. Các Trải nghiệm AI Nổi bật của SV2](#3-các-trải-nghiệm-ai-nổi-bật-của-sv2)
  - [Trải nghiệm AI-3 — Mood Keyword Assistant (designer-moodboard.html)](#trải-nghiệm-ai-3--mood-keyword-assistant-designer-moodboardhtml)
  - [Cấu hình System Prompt cho AI-1 (admin-brief-template-management.html)](#cấu-hình-system-prompt-cho-ai-1-admin-brief-template-managementhtml)
- [4. Cấu trúc Thư mục Dự án](#4-cấu-trúc-thư-mục-dự-án)
- [5. Dữ liệu & Lưu trữ LocalStorage](#5-dữ-liệu--lưu-trữ-localstorage)
- [6. Kết quả rà soát với tài liệu nhóm](#6-kết-quả-rà-soát-với-tài-liệu-nhóm)

<!-- AUTO-TOC:END -->

Mục lục được sinh từ các tiêu đề cấp 2 và 3. Sau khi thêm, đổi tên hoặc sắp xếp tiêu đề, chạy `python scripts/update_readme_toc.py` để cập nhật liên kết; chạy thêm `--check` để kiểm tra mà không sửa file.

---

## 1. Hướng dẫn Mở và Chạy Website trên Windows / VS Code

### Cách 1: Sử dụng VS Code Live Server (Khuyến nghị)
1. Mở thư mục `c:\BTCK_SV2` bằng VS Code:  
   *File → Open Folder → Chọn thư mục `BTCK_SV2`*.
2. Nhấp chuột phải vào tệp `index.html` hoặc `designer-dashboard.html` → Chọn **Open with Live Server**.
3. Trình duyệt sẽ tự động mở tại địa chỉ `http://127.0.0.1:5500/index.html` hoặc `http://127.0.0.1:5500/designer-dashboard.html`.

### Cách 2: Mở trực tiếp bằng Trình duyệt
- Bạn có thể nhấp đúp trực tiếp vào tệp `index.html` trong Windows File Explorer. Ứng dụng đã được thiết kế bằng JavaScript chuẩn, tải các script nội bộ qua thẻ `<script src="...">`, hoạt động ổn định trên cả giao thức `file:///`.

Để kiểm thử trang lỗi 404 và các tính năng trình duyệt trên localhost, dùng máy chủ tùy chọn: `python server.py 8000`, sau đó mở `http://127.0.0.1:8000/`. Mở HTML trực tiếp hoặc dùng Live Server là đủ cho các thao tác demo thông thường.

---

## 2. Bảng Kiểm kê Màn hình SV2 Phụ trách

Dựa trên **Bảng kiểm kê màn hình dự án CreatorStudio** (file `Bang_kiem_ke_Createstudio.xlsx`), Sinh viên 2 chịu trách nhiệm hoàn thiện 6 màn hình sau:

| STT | Màn hình | Tệp HTML | Vai trò | Mục tiêu & Nhiệm vụ người dùng | CRUD / Trạng thái | AI |
|:---:|---|---|---|---|---|:---:|
| **4** | **Designer Dashboard** | `designer-dashboard.html` | Nhà thiết kế | Quản lý khối lượng công việc và ưu tiên dự án hàng ngày: xem thống kê số dự án/task, việc cần làm theo deadline, cảnh báo gấp. | **R**<br>*(Normal, Loading, Empty, Urgent)* | Tham chiếu AI-3 |
| **5** | **Moodboard** | `designer-moodboard.html` | Nhà thiết kế | Xây dựng phong cách thị giác và định hướng màu sắc: tạo bảng cảm hứng, thêm thẻ ảnh, chọn bảng mã màu HEX, nhận gợi ý từ khóa thẩm mỹ. | **C / R / U**<br>*(Draft, Palette Ready, Shared)* | **AI-3**<br>*(Mood Keyword Assistant)* |
| **6** | **Version Management** | `designer-version-management.html` | Nhà thiết kế | Kiểm soát lịch sử phiên bản và sửa đổi theo góp ý: upload version v1/v2, sinh mã theo quy tắc studio, viết changelog, tích chọn checklist hoàn thành feedback, nộp duyệt nội bộ. | **C / R / U / D**<br>*(Draft, Internal Review, Approved, Archived)* | Không |
| **10** | **Brief Template Management** | `admin-brief-template-management.html` | Quản trị viên | Chuẩn hóa các biểu mẫu brief theo ngành hàng: xem danh mục các mẫu brief định sẵn (Branding, Packaging, UI/UX, Campaign...), xem cấu hình prompt gợi ý cho AI-1. | **R / C / U**<br>*(Active Template, Inactive, Custom)* | Prompt Template cho AI-1 |
| **15** | **Profile Management** | `profile.html` | Dùng chung | Quản lý thông tin tài khoản cá nhân: cập nhật họ tên, avatar, đổi mật khẩu, xem vai trò và thống kê dự án cá nhân. | **R / U**<br>*(View Profile, Edit Profile, Password Changed)* | Không |
| **16** | **Notifications Center** | `notifications.html` | Dùng chung | Xem các biến động và phản hồi trong dự án: danh sách thông báo (version mới, comment mới, task mới), lọc chưa đọc, đánh dấu đã đọc, xóa. | **R / U / D**<br>*(Unread, Read, Empty State, Cleared)* | Không |

---

## 3. Các Trải nghiệm AI Nổi bật của SV2

### Trải nghiệm AI-3 — Mood Keyword Assistant (`designer-moodboard.html`)
Bản dễ học dùng JavaScript mô phỏng theo từ khóa, không gọi API thật:

1. Nhập mô tả (ít nhất 5 ký tự).
2. Hiển thị spinner, skeleton và các bước xử lý trong khoảng 1,8 giây.
3. Dùng `includes()` để nhận diện nhóm cà phê/kraft, trà hoặc sang trọng/cao cấp; hiển thị chủ đề, 4 mã HEX, các nhãn từ khóa, gợi ý chất liệu và Typography.
4. Giải thích ngắn vì sao chọn nhóm màu đó.
5. Người dùng có thể chỉnh sửa 4 mã HEX, từ khóa và giải thích trước khi Chấp nhận & Áp dụng, Từ chối hoặc Tạo lại để sửa mô tả và sinh gợi ý mới. Cùng mô tả có thể cho cùng kết quả.
6. Mô tả không khớp từ khóa hoặc bật checkbox mô phỏng lỗi sẽ hiện hướng dẫn thử lại/nhập thủ công.

### Cấu hình System Prompt cho AI-1 (`admin-brief-template-management.html`)

- Xem, thêm, bật/tắt mẫu Brief; sửa và lưu Prompt.
- Các nút token chèn văn bản vào ô Prompt; bản thử nghiệm chỉ thay `{raw_input}` bằng mô tả người dùng.
- Nút thử nghiệm hiển thị mô tả, các mục của mẫu và Prompt sau khi thay biến để người học kiểm tra. Không sinh brief bằng mô hình AI thật.

---

## 4. Cấu trúc Thư mục Dự án

HTML ở thư mục gốc, CSS trong `css/`, JavaScript trong `js/`. Các trang nạp `css/share.css` và `js/share.js` trước phần riêng cùng tên:

| Trang | HTML | CSS riêng | JavaScript riêng |
|---|---|---|---|
| Cổng điều hướng | `index.html` | `css/index.css` | `js/index.js` |
| Dashboard | `designer-dashboard.html` | `css/designer-dashboard.css` | `js/designer-dashboard.js` |
| Moodboard | `designer-moodboard.html` | `css/designer-moodboard.css` | `js/designer-moodboard.js` |
| Phiên bản | `designer-version-management.html` | `css/designer-version-management.css` | `js/designer-version-management.js` |
| Mẫu Brief | `admin-brief-template-management.html` | `css/admin-brief-template-management.css` | `js/admin-brief-template-management.js` |
| Hồ sơ | `profile.html` | `css/profile.css` | `js/profile.js` |
| Thông báo | `notifications.html` | `css/notifications.css` | `js/notifications.js` |
| Lỗi 403/404 | `404.html` | `css/404.css` | `js/404.js` |

- **HTML:** khung trang, thành phần tĩnh và `<template>`; nạp CSS/JS dùng chung trước, CSS/JS riêng sau; không nhúng style hoặc JavaScript.
- **CSS:** `share.css` chứa định dạng và responsive dùng chung; CSS riêng chỉ giữ các thành phần của trang. Không dùng `@import`. Các lớp trạng thái và thuộc tính `hidden` điều khiển hiển thị.
- **JavaScript:** `share.js` khai báo dữ liệu và tiện ích chung; JavaScript từng trang gọi `khoiTaoChung()` trong `DOMContentLoaded` rồi xử lý sự kiện, validation và dữ liệu riêng. Dùng `cloneNode`, `textContent`, thuộc tính DOM và `classList`; không `innerHTML`, không chuỗi HTML, không gán `.style`. Màu HEX của Moodboard được gán vào dữ liệu `fill` của hình SVG trong template.

Khung trang được viết trực tiếp trong HTML để đọc được ngay. Chỉ các dòng danh sách và biểu mẫu dùng `<template>` có tên rõ nghĩa như `task-row`, `task-form`. JavaScript sao chép mẫu bằng `cloneNode(true)`, điền `textContent`/`value` và gắn sự kiện. Không còn bộ dựng giao diện App/View/Store hoặc các ký hiệu `{{0}}`.

Dữ liệu mẫu, hàm đọc/lưu LocalStorage, tiện ích form và sự kiện menu được tập trung trong `js/share.js`; file JS từng trang chỉ giữ phần xử lý riêng. Tên hàm tiếng Việt như `docDuLieu`, `luuDuLieu`, `hienHoSo` giúp dễ đọc và thuyết trình. Dữ liệu giữ schema/khóa cũ để các trang sử dụng được thông tin của nhau. Trang 404 dùng hàm chọn trang chủ từ file chung nhưng không gọi khởi tạo dữ liệu/menu.

Xem [Hướng dẫn file dùng chung và file riêng](share-files.md).

Tài nguyên bổ trợ được giữ trong `assets/`, tài liệu trong `docs/`, link Figma trong `design/`; `scripts/update_readme_toc.py` cập nhật mục lục, `tests/verify.cjs` kiểm thử, `server.py` chạy localhost tùy chọn.

## 5. Dữ liệu & Lưu trữ LocalStorage

- **Khóa lưu trữ:** `creatorstudio.v1` (tương thích hai chiều với `creatorstudio.sv3.v1`).
- Toàn bộ thao tác CRUD (tạo task, đổi trạng thái, cập nhật moodboard, nộp phiên bản, sửa hồ sơ, xóa thông báo) đều được lưu trữ bền vững vào `localStorage` của trình duyệt.
- Nút **"Đặt lại dữ liệu mẫu"** trong menu Công cụ demo hoặc tại `index.html` cho phép nhanh chóng khôi phục dữ liệu ban đầu khi cần thuyết trình hoặc kiểm thử lại từ đầu.

## 6. Kết quả rà soát với tài liệu nhóm

Đây là bản SV2, có đủ 6 file được giao trong Excel: số 4, 5, 6, 10, 15, 16. Landing và 404 đang là trang hỗ trợ chạy độc lập. Bản này chưa phải website đủ 17 màn hình của cả nhóm. Client/Lead demo mở Profile; menu chỉ hiển thị trang đã có để không dẫn tới file thiếu.

Excel ghi AI-3 = Mood Keyword Assistant, AI-2 = Feedback Summarizer; README nhóm đảo hai số này. Bản SV2 theo cách đánh số của Excel. Mẫu Brief có yêu cầu tối thiểu **R**; C/U là chức năng bổ sung của bản này.

Hồ sơ hỗ trợ avatar URL http/https và ký tự thay thế khi ảnh lỗi. Đổi mật khẩu là mô phỏng LocalStorage, mật khẩu mặc định `demo123`, chỉ dùng dữ liệu thử nghiệm. Upload phiên bản nhận PNG/JPEG/WebP tối đa 1 MB hoặc chọn ảnh mockup có sẵn. AI là mô phỏng bằng quy tắc JavaScript, không gọi API thật.

Cấu trúc hiện tại gồm 8 trang có CSS/JS riêng và hai file dùng chung `css/share.css`, `js/share.js`: HTML ở thư mục gốc, CSS trong `css/`, JS trong `js/`. Dữ liệu dùng cùng schema/LocalStorage để hỗ trợ tích hợp các vai trò.

- [Kết quả kiểm thử và các lỗi đã sửa](test-results.md)
- [Danh sách màn hình](screen-list.md)
- [Hướng dẫn file dùng chung](share-files.md)
- [Phân công, Git workflow và minh chứng](team-assignment.md)
- [Đối chiếu barem và các việc còn thiếu](rubric-audit.md)
- [Link Figma do README nhóm cung cấp](../design/figma-link.txt)

Kiểm tra tự động: chạy `node tests/verify.cjs` nếu máy có Node.js. Bộ kiểm tra dùng DOM mô phỏng bằng Node.js để khởi tạo 8 trang và chạy các thao tác chính. Chưa thay thế kiểm thử bố cục hoặc thao tác trên trình duyệt desktop/mobile.

Repository và PR SV2 đã được ghi tại [Phân công và minh chứng](team-assignment.md). Còn cần xác minh review/merge, mockup được duyệt, 6 video OBS và kiểm thử tích hợp SV1/SV3 trước khi đánh dấu DONE.
