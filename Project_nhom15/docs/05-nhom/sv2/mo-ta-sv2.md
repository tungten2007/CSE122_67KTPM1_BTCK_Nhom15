# Mô tả Nhiệm vụ & Checklist Definition of Done — Sinh viên 2 (SV2)

> **Học phần:** Phát triển Ứng dụng Web Cơ bản – CSE122  
> **Dự án:** CreatorStudio – Quản lý dự án sáng tạo và phản hồi phiên bản  
> **Phân công chính:** Sinh viên 2 (SV2)  

---

## 1. Trách nhiệm của Sinh viên 2 trong Nhóm 3 người

Theo tài liệu phân công đề bài (Mục 11 & 14) và Bảng kiểm kê màn hình Excel:
- **Phụ trách chính phân hệ:** Nhà thiết kế (Designer)
- **Phụ trách chức năng Quản trị:** Brief Template Management & Cấu hình Prompt AI-1
- **Phụ trách màn hình Dùng chung:** Profile Management (Hồ sơ cá nhân) & Notifications Center (Trung tâm thông báo)
- **Trách nhiệm chéo xuyên suốt:** Tầng JavaScript, mô hình dữ liệu tập trung (`data.js` & `store.js`), lưu trữ `LocalStorage`, tương tác trải nghiệm AI-3 (`ai-mood-assistant.js`).

---

## 2. Bảng đối chiếu 6 Màn hình SV2 theo Bảng Kiểm kê Excel

| # | Màn hình | Tệp HTML | Vai trò | Mục tiêu & Nhiệm vụ nghiệp vụ | CRUD / Trạng thái | AI |
|---|---|---|---|---|---|---|
| **4** | Designer Dashboard | `designer-dashboard.html` | Nhà thiết kế | Quản lý khối lượng công việc, KPI thống kê dự án/task, việc cần làm theo hạn chót, cảnh báo gấp. | **R**<br>(Normal, Loading, Empty, Urgent) | Tham chiếu AI-3 |
| **5** | Moodboard | `designer-moodboard.html` | Nhà thiết kế | Xây dựng phong cách thị giác, bảng mã màu HEX, thẻ ảnh cảm hứng, nhận gợi ý từ khóa thẩm mỹ. | **C / R / U**<br>(Draft, Palette Ready, Shared) | **AI-3**<br>(Mood Keyword Assistant) |
| **6** | Version Management | `designer-version-management.html` | Nhà thiết kế | Tải lên version v1/v2, tự động sinh mã theo quy tắc studio, viết changelog, tích chọn checklist nghiệm thu, nộp duyệt nội bộ. | **C / R / U / D**<br>(Draft, Internal Review, Approved, Archived) | Không |
| **10** | Brief Template Management | `admin-brief-template-management.html` | Quản trị viên | Chuẩn hóa biểu mẫu brief theo ngành hàng (Branding, Packaging, UI/UX...), cấu hình System Prompt gợi ý cho AI-1. | **R / C / U**<br>(Active Template, Inactive, Custom) | Prompt Template cho AI-1 |
| **15** | Profile Management | `profile.html` | Dùng chung | Cập nhật họ tên, avatar URL, đổi mật khẩu, xem vai trò và thống kê dự án cá nhân. | **R / U**<br>(View Profile, Edit Profile, Password Changed) | Không |
| **16** | Notifications Center | `notifications.html` | Dùng chung | Danh sách thông báo thời gian thực (version mới, comment mới, task mới), lọc chưa đọc, đánh dấu đã đọc, xóa. | **R / U / D**<br>(Unread, Read, Empty State, Cleared) | Không |

---

## 3. Lát cắt dọc (Vertical Slice) của SV2

Sinh viên 2 chứng minh quy trình hoàn thiện end-to-end theo chuẩn môn học:
```text
Bản mô phỏng Figma
↓
Cấu trúc HTML5 ngữ nghĩa
↓
CSS3 Design Tokens đồng bộ UI Kit
↓
Tương tác JavaScript thuần & DOM
↓
Lưu trữ LocalStorage & Đồng bộ trạng thái
↓
Responsive Desktop & Mobile
↓
Kiểm thử chức năng & Trạng thái AI
↓
Video OBS thuyết minh từng màn hình
```

---

## 4. Checklist triển khai (cần xác minh trước khi DONE)

- [x] Đúng tên tệp HTML theo bảng kiểm kê.
- [ ] Xác minh Header, Sidebar và Role Switcher khi tích hợp mã SV1/SV3.
- [ ] Kiểm thử trực quan desktop và tablet/mobile; hiện có media queries và drawer trong mã.
- [x] CRUD mô phỏng nghiệp vụ có ý nghĩa (không phải CRUD hình thức).
- [x] Dữ liệu tập trung tại `js/data.js` và `js/store.js`, đọc/ghi LocalStorage bền vững.
- [ ] Kiểm thử tương tác toàn bộ trạng thái: Normal, Loading, Empty, Urgent, Draft, In Review, Approved, Archived, Fail State.
- [x] Trải nghiệm AI-3 hoàn chỉnh: Nhập -> Kiểm tra -> Tiến trình mô phỏng -> Kết quả -> Giải thích lý do -> Kiểm soát người dùng (Chấp nhận / Sửa / Từ chối / Tạo lại / Lưu).
- [x] Trạng thái AI thất bại (Uncertainty / Fail state) kèm lối thoát cho người dùng (Thử lại / Nhập thủ công).
- [x] Kiểm tra hợp lệ (validation) trên tất cả biểu mẫu.
- [x] Không phụ thuộc thư viện CDN bên ngoài, chạy mượt mà ngay trên máy cục bộ hoặc VS Code Live Server.

- [ ] Mockup được duyệt và link minh chứng.
- [ ] Feature branch, commit thật, PR và review chéo.
- [ ] Merge dev, test tích hợp và release main.
- [ ] 6 video OBS cho 6 màn hình SV2.

Xem `docs/doi-chieu-yeu-cau.md` cho kết quả kiểm tra mã và `docs/05-nhom/team-assignment.md` cho bảng minh chứng. Những dấu kiểm triển khai không chứng minh đã được duyệt/nộp bài.
