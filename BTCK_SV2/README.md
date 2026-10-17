# CreatorStudio — Website Phân hệ Sinh viên 2 (SV2)

> **Học phần:** Phát triển Ứng dụng Web Cơ bản — CSE122  
> **Nhóm thực hiện:** 3 sinh viên  
> **Sinh viên 2 (SV2) phụ trách:** Phân hệ Nhà thiết kế (Designer), Quản trị Mẫu Brief & AI-1, Hồ sơ cá nhân và Trung tâm thông báo  
> **Công nghệ:** HTML5 thuần, CSS3 Design Tokens, JavaScript DOM/LocalStorage, Vector SVG cục bộ, không dùng thư viện ngoài/CDN.  

---

## 1. Hướng dẫn Mở và Chạy Website trên Windows / VS Code

### Cách 1: Sử dụng VS Code Live Server (Khuyến nghị)
1. Mở thư mục `c:\BTCK_SV2` bằng VS Code:  
   *File → Open Folder → Chọn thư mục `BTCK_SV2`*.
2. Nhấp chuột phải vào tệp `index.html` hoặc `designer-dashboard.html` → Chọn **Open with Live Server**.
3. Trình duyệt sẽ tự động mở tại địa chỉ `http://127.0.0.1:5500/index.html` hoặc `http://127.0.0.1:5500/designer-dashboard.html`.

### Cách 2: Mở trực tiếp bằng Trình duyệt
- Bạn có thể nhấp đúp trực tiếp vào tệp `index.html` trong Windows File Explorer. Ứng dụng đã được thiết kế bằng JavaScript chuẩn, tải các script nội bộ qua thẻ `<script src="...">`, hoạt động ổn định trên cả giao thức `file:///`.

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
| **16** | **Notifications Center** | `notifications.html` | Dùng chung | Cập nhật các biến động và phản hồi trong dự án: danh sách thông báo thời gian thực (version mới, comment mới, task mới), lọc chưa đọc, đánh dấu đã đọc, xóa. | **R / U / D**<br>*(Unread, Read, Empty State, Cleared)* | Không |

---

## 3. Các Trải nghiệm AI Nổi bật của SV2

### Trải nghiệm AI-3 — Mood Keyword Assistant (`designer-moodboard.html`)
Tuân thủ nghiêm ngặt quy trình trải nghiệm AI bắt buộc theo Mục 6 & 11 của đề tài:
1. **User Input:** Nhập mô tả ý tưởng thẩm mỹ hoặc chọn từ ngữ cảnh brief (có kiểm tra hợp lệ độ dài tối thiểu).
2. **AI Processing:** Trạng thái đang xử lý hiển thị spinner, skeleton và tiến trình từng bước:
   - *Bước 1:* Phân tích ngữ cảnh thương hiệu.
   - *Bước 2:* Trích xuất hệ màu và đối chiếu độ tương phản.
   - *Bước 3:* Sinh bộ từ khóa thẩm mỹ & định hướng chất liệu.
3. **Result:** Hiển thị bộ từ khóa phong cách thẩm mỹ, bộ 4 mã màu HEX tương phản kèm tên màu chuẩn in ấn, gợi ý chất liệu và kiểu chữ.
4. **Explanation (Vì sao có kết quả này?):** Hộp giải thích rõ ràng lý do tại sao bảng màu và từ khóa phù hợp với sản phẩm.
5. **User Control:** Người dùng có toàn quyền:
   - **Chấp nhận & Áp dụng (Accept):** Lưu trực tiếp vào Moodboard và đổi trạng thái sang `Palette Ready`.
   - **Tạo lại (Regenerate):** Yêu cầu AI sinh hướng phong cách khác.
   - **Từ chối (Reject):** Hủy bỏ kết quả gợi ý.
6. **Trạng thái AI thất bại (Fail State / Uncertainty):**
   - Có tùy chọn checkbox kiểm thử: *"Mô phỏng tình huống AI thất bại"*.
   - Khi gặp sự cố (thiếu dữ liệu hoặc AI không chắc chắn), hệ thống hiển thị thông báo lỗi thân thiện, cung cấp hai lối thoát cho người dùng: **Thử lại (Retry)** hoặc **Nhập thủ công (Manual Input)** mã màu.

### Cấu hình System Prompt cho AI-1 (`admin-brief-template-management.html`)
- Cho phép Quản trị viên cấu hình và tinh chỉnh System Prompt dành cho module AI-1 (Brief Structurer).
- Hỗ trợ chèn các biến động: `{raw_input}`, `{category}`, `{deliverables}`, `{tone_voice}`.
- Có công cụ **Thử nghiệm Prompt AI** với mô tả mẫu của khách hàng để xem trước kết quả brief chuẩn hóa trực quan.

---

## 4. Cấu trúc Thư mục Dự án

```text
c:\BTCK_SV2\
├── index.html                           # Cổng điều hướng chính & Demo Role Switcher
├── designer-dashboard.html              # Màn hình 4: Bảng điều khiển Nhà thiết kế
├── designer-moodboard.html              # Màn hình 5: Moodboard & AI-3
├── designer-version-management.html     # Màn hình 6: Quản lý phiên bản thiết kế
├── admin-brief-template-management.html # Màn hình 10: Quản lý Mẫu Brief & Cấu hình AI-1
├── profile.html                         # Màn hình 15: Quản lý Hồ sơ cá nhân
├── notifications.html                   # Màn hình 16: Trung tâm Thông báo
├── 404.html                             # Trang lỗi hợp nhất 404 & 403 Forbidden
├── assets/
│   ├── favicon.svg                      # Logo biểu trưng CreatorStudio
│   ├── coffee.svg                       # Vector minh họa bao bì cà phê
│   └── moodboard.svg                    # Vector minh họa bảng cảm hứng
├── css/
│   ├── base.css                         # UI Kit, Design Tokens, Sidebar, Topbar, Dialog, Toast
│   ├── navigation.css                   # Menu drawer responsive, huy hiệu chuông thông báo
│   └── pages/
│       ├── designer.css                 # Phong cách riêng của Dashboard, Moodboard, Version
│       ├── admin-template.css           # Phong cách riêng của Brief Template Management
│       └── shared.css                   # Phong cách riêng của Profile, Notifications, Error
├── js/
│   ├── data.js                          # Dữ liệu mẫu tập trung (Seed Data)
│   ├── store.js                         # Lớp dữ liệu CRUD, kiểm tra nghiệp vụ & LocalStorage
│   ├── app.js                           # Khung giao diện dùng chung, modal, toast, render shell
│   └── modules/
│       ├── navigation.js                # Điều hướng đa vai trò (Designer, Admin, Lead, Client)
│       └── ai-mood-assistant.js         # Logic mô phỏng AI-3 Mood Keyword Assistant
└── docs/
    ├── ai-usage-report.md               # Báo cáo sử dụng AI theo Mục 19 Đề bài
    ├── kiem-thu.md                      # Kịch bản kiểm thử (Test Cases)
    └── mo-ta-sv2.md                     # Báo cáo phân công và checklist Definition of Done
```

---

## 5. Dữ liệu & Lưu trữ LocalStorage

- **Khóa lưu trữ:** `creatorstudio.v1` (tương thích hai chiều với `creatorstudio.sv3.v1`).
- Toàn bộ thao tác CRUD (tạo task, đổi trạng thái, cập nhật moodboard, nộp phiên bản, sửa hồ sơ, xóa thông báo) đều được lưu trữ bền vững vào `localStorage` của trình duyệt.
- Nút **"Đặt lại dữ liệu mẫu"** trong menu Công cụ demo hoặc tại `index.html` cho phép nhanh chóng khôi phục dữ liệu ban đầu khi cần thuyết trình hoặc kiểm thử lại từ đầu.

## 6. Kết quả rà soát với tài liệu nhóm

Đây là bản SV2, có đủ 6 file được giao trong Excel: số 4, 5, 6, 10, 15, 16. Landing và 404 đang là trang hỗ trợ chạy độc lập. Bản này chưa phải website đủ 17 màn hình của cả nhóm. Client/Lead demo mở Profile; menu chỉ hiển thị trang đã có để không dẫn tới file thiếu.

Excel ghi AI-3 = Mood Keyword Assistant, AI-2 = Feedback Summarizer; README nhóm đảo hai số này. Bản SV2 theo cách đánh số của Excel. Mẫu Brief có yêu cầu tối thiểu **R**; C/U là chức năng bổ sung của bản này.

Hồ sơ hỗ trợ avatar URL http/https và ký tự thay thế khi ảnh lỗi. Đổi mật khẩu là mô phỏng LocalStorage, mật khẩu mặc định `demo123`, chỉ dùng dữ liệu thử nghiệm. Upload phiên bản nhận PNG/JPEG/WebP tối đa 1 MB hoặc chọn ảnh mockup có sẵn. AI là mô phỏng bằng quy tắc JavaScript, không gọi API thật.

Cấu trúc hiện tại tách `assets/`, `css/`, `js/modules/`, `docs/`, `design/`, `tests/`. HTML giữ ở thư mục gốc để bảo toàn đường dẫn tích hợp với các phân hệ khác; README nhóm cho phép điều chỉnh cấu trúc rõ ràng và tái sử dụng. `css/base.css` tương đương stylesheet/UI Kit chung; `css/navigation.css` và media queries trong CSS các trang xử lý responsive; `js/app.js` tương đương main.js. Không cần tạo stylesheet/API rỗng chỉ để giống tên trong sơ đồ.

- [Đối chiếu và các việc chưa hoàn thành](docs/doi-chieu-yeu-cau.md)
- [Danh sách màn hình](docs/screen-list.md)
- [Vai trò và tính năng](docs/roles-and-features.md)
- [Phân công, Git workflow và minh chứng](docs/team-assignment.md)
- [Mô tả dự án](docs/project-proposal.md)
- [Link Figma do README nhóm cung cấp](design/figma-link.txt)

Kiểm tra tự động: chạy `node tests/verify.cjs` nếu máy có Node.js. Kiểm tra dữ liệu, phân quyền, đường dẫn và cú pháp không thay thế kiểm thử giao diện desktop/mobile.

Chưa có minh chứng repo GitHub, PR/review, mockup được duyệt hoặc 6 video OBS. Chỉ đánh dấu DONE sau khi hoàn thành các mục này và kiểm thử tích hợp với SV1/SV3.
