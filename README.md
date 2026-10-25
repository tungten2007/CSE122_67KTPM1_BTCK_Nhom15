# CreatorStudio – Quản lý dự án sáng tạo và phản hồi phiên bản

> **Học phần:** Phát triển ứng dụng Web cơ bản – CSE122
> **Đề tài:** BTL-30
> **Nhóm:** 3 sinh viên
> **Loại sản phẩm:** Web Frontend (nguyên mẫu) – nhiều vai trò, CRUD mô phỏng, responsive, tương tác JavaScript, trải nghiệm AI
> **Repo gợi ý:** `cse122-creatorstudio-teamXX`

---

## Mục lục

1. [Giới thiệu](#1-giới-thiệu)
2. [Vấn đề và mục tiêu](#2-vấn-đề-và-mục-tiêu)
3. [Vai trò người dùng](#3-vai-trò-người-dùng)
4. [Hành trình người dùng](#4-hành-trình-người-dùng)
5. [Bảng kiểm kê màn hình](#5-bảng-kiểm-kê-màn-hình)
6. [Bao phủ trạng thái giao diện](#6-bao-phủ-trạng-thái-giao-diện)
7. [Tính năng AI](#7-tính-năng-ai)
8. [Dữ liệu giả lập](#8-dữ-liệu-giả-lập)
9. [Công nghệ sử dụng](#9-công-nghệ-sử-dụng)
10. [Cấu trúc thư mục](#10-cấu-trúc-thư-mục)
11. [Phân công nhóm](#11-phân-công-nhóm)
12. [Quy trình Git/GitHub](#12-quy-trình-gitgithub)
13. [Quản lý công việc (Trello/Jira/Notion)](#13-quản-lý-công-việc-trellojiranotion)
14. [Figma / Canva](#14-figma--canva)
15. [Video OBS minh chứng](#15-video-obs-minh-chứng)
16. [Định nghĩa hoàn thành (DoD)](#16-định-nghĩa-hoàn-thành-dod)
17. [Phạm vi MVP](#17-phạm-vi-mvp)
18. [Khai báo sử dụng AI](#18-khai-báo-sử-dụng-ai)
19. [Kế hoạch thực hiện gợi ý](#19-kế-hoạch-thực-hiện-gợi-ý)
20. [Chuẩn bị bảo vệ](#20-chuẩn-bị-bảo-vệ)
21. [Cách chạy dự án](#21-cách-chạy-dự-án)
22. [Thành viên và liên kết](#22-thành-viên-và-liên-kết)

---

## 1. Giới thiệu

**CreatorStudio** là sản phẩm Frontend cho lĩnh vực **Nghệ thuật & sáng tạo / CreativeTech**. Sản phẩm giúp nhóm sáng tạo quản lý dự án, brief, moodboard, các phiên bản thiết kế và phản hồi của khách hàng ở cùng một nơi.

**Ngữ cảnh:** Nhóm sáng tạo thường gửi file và phản hồi qua chat, nên dễ nhầm phiên bản và bỏ sót thay đổi.

> Sản phẩm không cần máy chủ thật. Dữ liệu dùng JSON / LocalStorage / MockAPI, còn AI được mô phỏng ở phía Frontend (hoặc gọi LLM API nếu nhóm đủ khả năng).

---

## 2. Vấn đề và mục tiêu

### Vấn đề cần giải quyết

| Mã | Vấn đề | Hướng giải quyết trong sản phẩm |
|---|---|---|
| P1 | Brief không có cấu trúc | Form brief chuẩn + AI-1 Brief Structurer |
| P2 | Feedback phân tán | Gom comment theo phiên bản + AI-2 Feedback Summarizer |
| P3 | Khó biết phiên bản mới nhất | Quản lý version, gắn nhãn "Mới nhất", timeline phiên bản |
| P4 | Client khó duyệt thay đổi | Màn hình Review Versions: so sánh, duyệt / yêu cầu sửa / từ chối |

### Mục tiêu

| Mã | Mục tiêu |
|---|---|
| O1 | Biến bài toán thực tế thành sản phẩm Frontend có hành trình người dùng rõ ràng |
| O2 | Thiết kế đủ giao diện cho từng vai trò (mỗi vai trò **tối thiểu 3 màn hình**) |
| O3 | Thể hiện CRUD hoặc trạng thái nghiệp vụ có ý nghĩa, không làm CRUD hình thức |
| O4 | Dùng JavaScript/DOM cho tìm kiếm, lọc, kiểm tra hợp lệ, modal, card, trạng thái, render dữ liệu |
| O5 | Dùng JSON giả lập / LocalStorage / MockAPI / API công khai khi phù hợp |
| O6 | Thiết kế **ít nhất 3 trải nghiệm AI** mô phỏng được ở Frontend |
| O7 | Làm việc nhóm bằng Trello/Jira/Notion và Git/GitHub (nhánh + Pull Request) |

---

## 3. Vai trò người dùng

| Vai trò | Trách nhiệm chính |
|---|---|
| **Khách hàng (Client)** | Tạo brief và duyệt phiên bản |
| **Nhà thiết kế (Designer)** | Làm moodboard và quản lý phiên bản |
| **Creative Lead** | Phân công công việc và tổng hợp feedback |
| **Quản trị viên (Admin)** | Quản lý template, người dùng, cài đặt dự án |

---

## 4. Hành trình người dùng

```text
Khám phá / đăng nhập
↓
Thực hiện nghiệp vụ chính theo vai trò
↓
Xem trạng thái / dữ liệu / phản hồi
↓
AI hỗ trợ phân tích hoặc gợi ý
↓
Người dùng Chấp nhận / Sửa / Từ chối / Lưu
↓
Vai trò vận hành duyệt / xử lý
↓
Bảng điều khiển / báo cáo / hoàn tất
```

### Luồng nghiệp vụ chính (gợi ý để vẽ sơ đồ luồng)

```text
Client tạo brief (AI-1 hỗ trợ cấu trúc hóa)
   ↓
Creative Lead nhận brief, tạo task, giao cho Designer
   ↓
Designer làm moodboard (AI-3 gợi ý từ khóa phong cách)
   ↓
Designer upload phiên bản (v1, v2, ...)
   ↓
Creative Lead review nội bộ, gom feedback (AI-2 tóm tắt action items)
   ↓
Client duyệt phiên bản: Duyệt / Yêu cầu sửa / Từ chối
   ↓
Designer sửa → phiên bản mới (quay lại vòng review)
   ↓
Dự án hoàn thành → Client xem tổng quan, Admin xem thống kê
```

---

## 5. Bảng kiểm kê màn hình

> **Lưu ý quan trọng:** Con số "tối thiểu 3 giao diện mỗi vai trò" chỉ là **ngưỡng tối thiểu**, không phải mục tiêu. Tiêu chí đánh giá là **độ đầy đủ của nghiệp vụ > số lượng giao diện**. Bảng này phải được giảng viên **duyệt trước khi viết code chính thức** (cùng với luồng người dùng và Figma/Canva).

### 5.1. Danh sách nền tảng (bắt buộc)

#### Khách hàng

| # | Tệp | Giao diện | CRUD | Chức năng chính |
|---:|---|---|---|---|
| 1 | `client-creative-brief.html` | Creative Brief | R | Tạo brief và duyệt phiên bản |
| 2 | `client-review-versions.html` | Review Versions | C/R/U | Tạo brief và duyệt phiên bản |
| 3 | `client-project-overview.html` | Project Overview | C/R/U/D | Tạo brief và duyệt phiên bản |

#### Nhà thiết kế

| # | Tệp | Giao diện | CRUD | Chức năng chính |
|---:|---|---|---|---|
| 4 | `designer-dashboard.html` | Designer Dashboard | R | Moodboard và phiên bản |
| 5 | `designer-moodboard.html` | Moodboard | C/R/U | Moodboard và phiên bản |
| 6 | `designer-version-management.html` | Version Management | C/R/U/D | Moodboard và phiên bản |

#### Creative Lead

| # | Tệp | Giao diện | CRUD | Chức năng chính |
|---:|---|---|---|---|
| 7 | `lead-task-board.html` | Task Board | R | Phân công và tổng hợp feedback |
| 8 | `lead-internal-review.html` | Internal Review | C/R/U | Phân công và tổng hợp feedback |
| 9 | `lead-feedback-summary.html` | Feedback Summary | C/R/U/D | Phân công và tổng hợp feedback |

#### Quản trị viên

| # | Tệp | Giao diện | CRUD | Chức năng chính |
|---:|---|---|---|---|
| 10 | `admin-brief-template-management.html` | Brief Template Management | R | Template, user, project settings |
| 11 | `admin-user-management.html` | User Management | C/R/U | Template, user, project settings |
| 12 | `admin-project-settings.html` | Project Settings | C/R/U/D | Template, user, project settings |

### 5.2. Màn hình dùng chung (cần xem xét, không bắt buộc máy móc)

| Tệp | Có làm không? | Ghi chú gợi ý |
|---|---|---|
| `index.html` | Nên có | Trang giới thiệu, dẫn tới đăng nhập / chọn vai trò |
| `login.html` | Nên có | Đăng nhập giả lập, chuyển hướng theo vai trò |
| `register.html` | Tùy chọn | Có thể bỏ nếu Admin tạo tài khoản |
| `forgot-password.html` | Tùy chọn | Chỉ cần nếu có login |
| `profile.html` | Nên có | Thông tin cá nhân, đổi mật khẩu |
| `settings.html` | Tùy chọn | Giao diện sáng/tối, ngôn ngữ |
| `notifications.html` | Nên có | Thông báo phiên bản mới, feedback mới |
| `403.html` | Nên có | Truy cập sai vai trò |
| `404.html` | Nên có | Không tìm thấy trang |

> Nhóm cần **ghi lý do** cho những trang không làm trong bảng kiểm kê cuối cùng.

### 5.3. Bảng kiểm kê đầy đủ (mẫu để nhóm điền và nộp duyệt)

| Vai trò | Mục tiêu người dùng | Nhiệm vụ người dùng | Màn hình | Tệp | CRUD/Trạng thái | AI | Người phụ trách |
|---|---|---|---|---|---|---|---|
| Khách hàng | Gửi yêu cầu rõ ràng cho team | Nhập mô tả, xem brief có cấu trúc, lưu brief | Creative Brief | `client-creative-brief.html` | R (+ tạo brief bằng form) | AI-1 | SV1 |
| Khách hàng | Duyệt phiên bản nhanh | Xem/so sánh phiên bản, duyệt / yêu cầu sửa / từ chối, để lại comment | Review Versions | `client-review-versions.html` | C/R/U | – | SV1 |
| Khách hàng | Nắm tiến độ dự án | Xem danh sách dự án, tạo/sửa/hủy dự án | Project Overview | `client-project-overview.html` | C/R/U/D(Archive) | – | SV1 |
| Nhà thiết kế | Biết việc cần làm | Xem task, phiên bản mới nhất, feedback chờ xử lý | Designer Dashboard | `designer-dashboard.html` | R | – | SV2 |
| Nhà thiết kế | Định hướng phong cách | Thêm ảnh/màu/từ khóa vào moodboard | Moodboard | `designer-moodboard.html` | C/R/U | AI-3 | SV2 |
| Nhà thiết kế | Kiểm soát phiên bản | Upload, đặt nhãn, so sánh, lưu trữ phiên bản | Version Management | `designer-version-management.html` | C/R/U/D(Archive) | – | SV2 |
| Creative Lead | Phân công hợp lý | Xem bảng task, kéo/đổi trạng thái, giao người | Task Board | `lead-task-board.html` | R (+ đổi trạng thái) | – | SV3 |
| Creative Lead | Kiểm soát chất lượng trước khi gửi client | Xem phiên bản, thêm nhận xét nội bộ | Internal Review | `lead-internal-review.html` | C/R/U | – | SV3 |
| Creative Lead | Gom feedback thành việc cần làm | Tóm tắt feedback, tạo action items | Feedback Summary | `lead-feedback-summary.html` | C/R/U/D | AI-2 | SV3 |
| Quản trị viên | Chuẩn hóa brief | Xem mẫu brief | Brief Template Management | `admin-brief-template-management.html` | R | – | SV3 |
| Quản trị viên | Quản lý người dùng | Thêm/sửa/khóa tài khoản, phân vai trò | User Management | `admin-user-management.html` | C/R/U | – | SV3 |
| Quản trị viên | Cấu hình dự án | Tạo/sửa/đóng cấu hình dự án | Project Settings | `admin-project-settings.html` | C/R/U/D | – | SV3 |

> Bảng trên là **bản nháp khởi đầu**. Khi phân tích kỹ luồng nghiệp vụ, nhóm có thể cần thêm màn hình (ví dụ: chi tiết dự án, chi tiết phiên bản, lịch sử comment, báo cáo thống kê...). Chỉ thêm khi **thật sự cần cho luồng nghiệp vụ**, không tách trang vô nghĩa để tăng số lượng.

---

## 6. Bao phủ trạng thái giao diện

Mỗi chức năng quan trọng phải xem xét các trạng thái phù hợp:

| Trạng thái | Ví dụ áp dụng trong CreatorStudio |
|---|---|
| Bình thường | Danh sách dự án / phiên bản hiển thị đầy đủ |
| Đang tải | Skeleton khi load JSON, spinner khi AI xử lý |
| Rỗng | "Chưa có brief nào", "Chưa có phiên bản nào" |
| Thành công | Toast "Đã lưu brief", "Đã duyệt phiên bản v2" |
| Lỗi | Form sai định dạng, load dữ liệu thất bại, AI lỗi |
| Vô hiệu hóa | Nút "Duyệt" bị khóa khi chưa chọn phiên bản |
| Đang chờ | Phiên bản "Chờ client duyệt" |
| Bị từ chối | Phiên bản bị client từ chối kèm lý do |
| Hoàn thành | Dự án đã hoàn tất |
| Đã hủy / Lưu trữ | Dự án, phiên bản, task đã archive |

Không cần mọi trang đủ mọi trạng thái, nhưng phải **chứng minh đã phân tích** trạng thái phù hợp (ghi vào bảng kiểm kê hoặc `docs/screen-list.md`).

### Trạng thái nghiệp vụ gợi ý

```text
Project : Nháp → Đang thực hiện → Chờ duyệt → Hoàn thành → Lưu trữ
Version : Bản nháp → Chờ duyệt → Đã duyệt / Yêu cầu sửa / Bị từ chối → Lưu trữ
Task    : Tồn đọng → Cần làm → Đang làm → Chờ duyệt → Hoàn thành
```

---

## 7. Tính năng AI

Bắt buộc **ít nhất 3 tính năng AI**. AI không được chỉ là ô chat trang trí, kết quả AI phải tác động vào luồng nghiệp vụ.

| Mã | Tính năng | Trang gợi ý | Đầu vào | Đầu ra |
|---|---|---|---|---|
| AI-1 | **Brief Structurer** | `client-creative-brief.html` | Mô tả tự do của khách hàng | Brief có cấu trúc (mục tiêu, đối tượng, phong cách, ngân sách, deadline, yêu cầu...) |
| AI-2 | **Feedback Summarizer** | `lead-feedback-summary.html` | Nhiều comment/feedback rời rạc | Danh sách action items, phân nhóm, mức ưu tiên |
| AI-3 | **Mood Keyword Assistant** | `designer-moodboard.html` | Mô tả dự án / ảnh / màu chủ đạo | Từ khóa phong cách gợi ý (minimal, retro, pastel...) |

### Trải nghiệm bắt buộc cho mỗi AI

```text
NGƯỜI DÙNG NHẬP
↓
KIỂM TRA HỢP LỆ
↓
AI ĐANG XỬ LÝ (đang tải / khung xương / tiến độ)
↓
KẾT QUẢ AI
↓
VÌ SAO CÓ KẾT QUẢ NÀY? (giải thích)
↓
CHẤP NHẬN / SỬA / TỪ CHỐI / TẠO LẠI
↓
LƯU VÀO TRẠNG THÁI ỨNG DỤNG
```

### Trạng thái AI thất bại / không chắc chắn (bắt buộc có)

Mỗi AI quan trọng cần ít nhất một trạng thái như:

- "Không đủ dữ liệu để đưa ra đề xuất."
- "AI chưa chắc chắn về kết quả này."
- "Không thể xử lý yêu cầu lúc này."

Kèm thao tác phù hợp: **Chỉnh sửa / Thử lại / Bỏ qua / Báo cáo / Dùng thủ công**.

### Checklist cho từng AI feature

- [ ] Có kiểm tra đầu vào (không cho gửi khi rỗng / quá ngắn)
- [ ] Có trạng thái đang xử lý (loading/skeleton)
- [ ] Có kết quả hiển thị rõ ràng
- [ ] Có phần giải thích "vì sao có kết quả này"
- [ ] Có nút Chấp nhận / Sửa / Từ chối / Tạo lại / Lưu
- [ ] Có trạng thái thất bại hoặc không chắc chắn
- [ ] Kết quả sau khi chấp nhận được **lưu vào state/LocalStorage** và ảnh hưởng luồng nghiệp vụ
- [ ] Ghi rõ trong báo cáo: mock hay gọi API thật

### Cách mô phỏng

- JSON phản hồi định sẵn + `setTimeout` giả lập độ trễ
- JavaScript theo quy tắc (tách câu, nhận diện từ khóa: "deadline", "ngân sách", "màu"...)
- (Tùy chọn) gọi LLM API thật nếu nhóm đủ khả năng

---

## 8. Dữ liệu giả lập

### Thực thể tối thiểu

```text
projects | briefs | moodboards | versions | comments | tasks
```

(Có thể thêm `users`, `templates` để phục vụ vai trò Admin.)

### Ma trận thực thể & CRUD

| Thực thể | Tạo | Đọc | Sửa | Xóa / Lưu trữ | Vai trò chính thao tác |
|---|:-:|:-:|:-:|:-:|---|
| `projects` | ✓ | ✓ | ✓ | ✓ / Archive | Client, Admin |
| `briefs` | ✓ | ✓ | ✓ | ✓ / Archive | Client, Admin (template) |
| `moodboards` | ✓ | ✓ | ✓ | ✓ / Archive | Designer |
| `versions` | ✓ | ✓ | ✓ | ✓ / Archive | Designer, Client (duyệt) |
| `comments` | ✓ | ✓ | ✓ | ✓ / Archive | Client, Lead |
| `tasks` | ✓ | ✓ | ✓ | ✓ / Archive | Lead, Designer |

> Với dữ liệu nghiệp vụ, có thể thay **Xóa** bằng **Hủy / Lưu trữ / Vô hiệu hóa / Đóng** khi hợp lý.

### Cách triển khai (chọn một hoặc kết hợp)

- File JSON cục bộ trong `assets/data/`
- LocalStorage / SessionStorage (lưu thay đổi CRUD)
- JSON Server / MockAPI / public API

### Nguyên tắc

- **Không viết cứng dữ liệu rải rác** trong HTML. Tập trung vào JSON hoặc module dữ liệu (`js/api.js`, `js/modules/`).
- Một lớp truy cập dữ liệu chung (ví dụ `getProjects()`, `saveVersion()`, `updateTaskStatus()`) để cả 3 sinh viên dùng thống nhất.

---

## 9. Công nghệ sử dụng

| Nhóm | Công nghệ |
|---|---|
| Giao diện | HTML5 semantic, CSS3 (có thể dùng Bootstrap), Flexbox/Grid |
| Tương tác | JavaScript (DOM, sự kiện, biểu mẫu, module) |
| Dữ liệu | JSON, LocalStorage, (tùy chọn) MockAPI / JSON Server |
| Thiết kế | Figma hoặc Canva |
| Quản lý mã nguồn | Git, GitHub |
| Quản lý công việc | Trello / Jira / Notion |
| Quay minh chứng | OBS Studio |

---

## 10. Cấu trúc thư mục

```text
cse122-creatorstudio-teamXX/
├── README.md
├── index.html
├── docs/
│   ├── project-proposal.md
│   ├── roles-and-features.md
│   ├── screen-list.md
│   ├── team-assignment.md
│   └── ai-usage-report.md
├── design/
│   ├── figma-link.txt
│   └── mockups/
├── pages/
│   ├── client-creative-brief.html
│   ├── client-review-versions.html
│   ├── client-project-overview.html
│   ├── designer-dashboard.html
│   ├── designer-moodboard.html
│   ├── designer-version-management.html
│   ├── lead-task-board.html
│   ├── lead-internal-review.html
│   ├── lead-feedback-summary.html
│   ├── admin-brief-template-management.html
│   ├── admin-user-management.html
│   ├── admin-project-settings.html
│   ├── login.html
│   ├── profile.html
│   ├── notifications.html
│   ├── 403.html
│   └── 404.html
├── assets/
│   ├── images/
│   ├── icons/
│   └── data/
│       ├── projects.json
│       ├── briefs.json
│       ├── moodboards.json
│       ├── versions.json
│       ├── comments.json
│       └── tasks.json
├── css/
│   ├── style.css          # biến màu, font, component dùng chung
│   └── responsive.css     # media queries
└── js/
    ├── main.js            # khởi tạo, điều hướng, kiểm tra vai trò
    ├── api.js             # đọc/ghi dữ liệu (JSON / LocalStorage)
    └── modules/
        ├── ai-brief.js
        ├── ai-feedback.js
        ├── ai-mood.js
        ├── toast.js
        ├── modal.js
        └── validation.js
```

> Cấu trúc trên là gợi ý, nhóm có thể điều chỉnh nhưng nên giữ đúng tên tệp HTML theo đề.

---

## 11. Phân công nhóm

> Nhóm có thể chia lại, nhưng mỗi thành viên phải có **HTML + CSS + JavaScript + Git + OBS** và khối lượng tương đối cân bằng. **Không chấp nhận** kiểu một người chỉ làm Figma/tài liệu, một người chỉ HTML, một người chỉ JS.

| Thành viên | Phụ trách chính | Trách nhiệm chéo bắt buộc | Vai trò review |
|---|---|---|---|
| **SV1** | Khách hàng (màn 1–3) + một phần giao diện dùng chung | Hệ thống thiết kế / Điều hướng / Khả năng tiếp cận, Responsive và kiểm tra giao diện phần mình | Review PR của SV2 hoặc SV3 |
| **SV2** | Nhà thiết kế (màn 4–6) | JavaScript / Dữ liệu giả lập / Tương tác AI | Review PR của SV1 hoặc SV3 |
| **SV3** | Creative Lead + Quản trị viên (màn 7–12) | Tích hợp bố cục, điều hướng, dashboard/quản trị, phát hành, QA | Đánh giá tính nhất quán toàn dự án |

### Lát cắt dọc bắt buộc cho từng sinh viên

Mỗi sinh viên tự hoàn thành **ít nhất một luồng end-to-end**:

```text
Bản mô phỏng → HTML → CSS → JavaScript → Dữ liệu → Responsive
→ Nhánh Git → Commit → Pull Request → OBS
```

### Gợi ý lát cắt dọc

| SV | Luồng end-to-end gợi ý |
|---|---|
| SV1 | Tạo brief (AI-1) → lưu → xem trong Project Overview → Review Versions |
| SV2 | Tạo moodboard (AI-3) → upload phiên bản → quản lý phiên bản |
| SV3 | Nhận feedback → tóm tắt (AI-2) → tạo action items → giao task trên Task Board |

### Bảng tổng hợp phân công AI

| AI | Người làm chính | Người review |
|---|---|---|
| AI-1 Brief Structurer | SV1 | SV2 |
| AI-2 Feedback Summarizer | SV3 | SV1 |
| AI-3 Mood Keyword Assistant | SV2 | SV3 |

---

## 12. Quy trình Git/GitHub

### Chiến lược nhánh

```text
main                      # bản ổn định, chỉ merge từ dev sau khi test tích hợp
dev                       # nhánh tích hợp
feature/<feature-name>    # tính năng mới
fix/<bug-name>            # sửa lỗi
docs/<document-name>      # tài liệu
```

Ví dụ:

```text
feature/client-creative-brief
feature/designer-dashboard
feature/lead-task-board
feature/ai-brief-structurer
fix/validate-empty-form
docs/update-screen-list
```

### Quy trình bắt buộc

```text
Công việc trên Trello
↓
Tạo nhánh
↓
Viết mã
↓
Commit
↓
Push
↓
Pull Request
↓
Đánh giá chéo (review)
↓
Merge vào dev
↓
Test tích hợp
↓
Merge vào main
```

### Quy ước commit

```text
feat: add responsive dashboard layout
feat: render data from mock json
feat: add ai recommendation state
fix: validate empty form inputs
style: improve mobile navigation
refactor: split reusable ui modules
docs: update screen list and obs links
```

- **Không chấp nhận** commit kiểu `update`, `done`, `final`, `fix code`.
- **Không spam commit**. Mỗi commit nên là một thay đổi có ý nghĩa.
- Lịch sử phải thể hiện được chuỗi:

```text
Công việc ↔ Nhánh ↔ Commit ↔ PR ↔ Review ↔ Màn hình ↔ OBS
```

### Lệnh Git cơ bản

```bash
git checkout dev
git pull origin dev
git checkout -b feature/client-creative-brief

# ... code ...

git add .
git commit -m "feat: add creative brief form with validation"
git push origin feature/client-creative-brief
# -> tạo Pull Request vào dev trên GitHub, nhờ thành viên khác review
```

---

## 13. Quản lý công việc (Trello/Jira/Notion)

### Các cột tối thiểu

```text
TỒN ĐỌNG → CẦN LÀM → ĐANG LÀM → CHỜ DUYỆT → HOÀN THÀNH
```

### Mỗi task phải có

- Mã công việc
- Giao diện / tệp liên quan
- Người thực hiện
- Hạn hoàn thành
- Nhánh Git
- Link PR / commit
- Link video OBS (sau khi hoàn thành)

### Task mẫu

| Mã | Nội dung |
|---|---|
| `TASK-01` | Khung dây + bản mô phỏng màn hình đầu tiên |
| `TASK-02` | HTML semantic cho vai trò 1 |
| `TASK-03` | Responsive CSS |
| `TASK-04` | JavaScript tìm kiếm / lọc / biểu mẫu |
| `TASK-05` | Tích hợp dữ liệu giả lập / API |
| `TASK-06` | Nguyên mẫu trải nghiệm AI |
| `TASK-07` | Kiểm thử đa trình duyệt / di động |
| `TASK-08` | Minh chứng OBS + commit + README |

> Nên tạo task riêng **theo từng màn hình** (ví dụ `TASK-CL-01: client-creative-brief`) để dễ đối chiếu với PR và video OBS.

---

## 14. Figma / Canva

Trước khi code chính thức, nhóm phải có và được duyệt:

- [ ] Sơ đồ trang (sitemap)
- [ ] Luồng người dùng
- [ ] **Bảng kiểm kê màn hình đầy đủ**
- [ ] Khung dây (wireframe)
- [ ] Bản mô phỏng desktop
- [ ] Phiên bản responsive chính (tablet/mobile)
- [ ] Hướng dẫn thành phần tối thiểu (màu, font, nút, card, form, modal...)
- [ ] Trạng thái đang tải / rỗng / lỗi
- [ ] Bản mô phỏng tương tác AI

> Không được chỉ dùng ảnh do AI sinh ra rồi code theo ảnh mà không phân tích bố cục và thành phần.

Đặt link Figma/Canva trong `design/figma-link.txt` và ảnh xuất trong `design/mockups/`.

---

## 15. Video OBS minh chứng

**Mỗi trang giao diện đã được duyệt = 1 video.** Số video bằng số giao diện trong bảng kiểm kê cuối cùng (12, 16, 20... tùy nghiệp vụ, không lấy 12 làm mục tiêu cố định).

### Mỗi video phải

1. Có mặt sinh viên thực hiện
2. Hiển thị bản mô phỏng Figma/Canva
3. Mở đúng tệp HTML/CSS/JS
4. Giải thích bố cục và logic
5. Thực hiện ít nhất một chỉnh sửa trực tiếp
6. Chạy thử tương tác
7. Commit lên GitHub
8. Nói rõ mã công việc / nhánh / commit

### Quy tắc đặt tên

```text
SV1-01-client-creative-brief.mp4
SV1-02-client-review-versions.mp4
SV2-01-designer-dashboard.mp4
SV3-01-lead-task-board.mp4
```

### Bảng theo dõi video (điền dần)

| Video | Màn hình | Người thực hiện | Task | Nhánh | Commit/PR | Link video |
|---|---|---|---|---|---|---|
| SV1-01 | client-creative-brief | SV1 | | | | |
| SV1-02 | client-review-versions | SV1 | | | | |
| SV1-03 | client-project-overview | SV1 | | | | |
| SV2-01 | designer-dashboard | SV2 | | | | |
| SV2-02 | designer-moodboard | SV2 | | | | |
| SV2-03 | designer-version-management | SV2 | | | | |
| SV3-01 | lead-task-board | SV3 | | | | |
| SV3-02 | lead-internal-review | SV3 | | | | |
| SV3-03 | lead-feedback-summary | SV3 | | | | |
| SV3-04 | admin-brief-template-management | SV3 | | | | |
| SV3-05 | admin-user-management | SV3 | | | | |
| SV3-06 | admin-project-settings | SV3 | | | | |

---

## 16. Định nghĩa hoàn thành (DoD)

Một màn hình chỉ được tính **DONE** khi các mục phù hợp đã xong:

- [ ] Bản mô phỏng Figma/Canva
- [ ] HTML ngữ nghĩa
- [ ] CSS hoàn chỉnh
- [ ] Responsive
- [ ] Tương tác JavaScript
- [ ] Kiểm tra hợp lệ nếu có biểu mẫu
- [ ] Dữ liệu giả lập / API nếu cần
- [ ] Trạng thái rỗng
- [ ] Trạng thái đang tải / lỗi khi phù hợp
- [ ] Khả năng tiếp cận cơ bản
- [ ] Pull Request đã được duyệt
- [ ] Đã merge vào `dev`
- [ ] Video OBS
- [ ] README / bảng kiểm kê màn hình đã cập nhật

### Chuẩn chi tiết cho từng giao diện

| Hạng mục | Yêu cầu |
|---|---|
| Tệp HTML | Đúng tên quy định |
| Header / Điều hướng | Nhất quán trong toàn bộ vai trò |
| Nội dung chính | Card, list, table, form hoặc dashboard phù hợp |
| Trạng thái | Đang tải, rỗng, thành công, lỗi khi hợp lý |
| Responsive | Desktop + tablet/mobile |
| JavaScript | Tối thiểu một tương tác có ý nghĩa |
| Kiểm tra hợp lệ | Với **mọi** biểu mẫu |
| Dữ liệu giả lập | Không viết cứng rải rác, ưu tiên JSON/module |
| Giao diện AI | Nhập → Đang xử lý → Kết quả → Giải thích → Người dùng kiểm soát |

### Tiến độ màn hình (cập nhật dần)

| # | Màn hình | Figma | HTML | CSS | Responsive | JS | Data | PR | OBS | DONE |
|---:|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| 1 | client-creative-brief | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 2 | client-review-versions | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 3 | client-project-overview | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 4 | designer-dashboard | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 5 | designer-moodboard | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 6 | designer-version-management | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 7 | lead-task-board | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 8 | lead-internal-review | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 9 | lead-feedback-summary | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 10 | admin-brief-template-management | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 11 | admin-user-management | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| 12 | admin-project-settings | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

---

## 17. Phạm vi MVP

### Bắt buộc phải có

- Đủ vai trò và **toàn bộ màn hình cần thiết** theo bảng kiểm kê đã duyệt
- Điều hướng xuyên suốt
- Responsive
- CRUD mô phỏng có ý nghĩa
- Search / filter / form validation
- Dữ liệu giả lập hoặc API
- Tối thiểu 3 AI feature (có trạng thái thất bại)
- Minh chứng Trello/Jira/Notion
- Lịch sử Git + nhánh + PR
- OBS cho từng trang

### Nên có

- Biểu đồ / dashboard
- Thông báo nổi (toast)
- Trạng thái rỗng / đang tải / lỗi
- Thành phần và design token tái sử dụng
- Chế độ tối/sáng hoặc cải thiện accessibility

### Có thì tốt

- LLM API thật
- Hoạt ảnh / micro-interaction
- PWA / cache cục bộ
- Cá nhân hóa giao diện
- Biểu đồ nâng cao

### Ý tưởng tính năng theo màn hình (tham khảo)

| Màn hình | Tương tác JS gợi ý |
|---|---|
| Creative Brief | Form validation, AI-1, lưu brief, xem trước brief |
| Review Versions | So sánh 2 phiên bản, duyệt / yêu cầu sửa / từ chối (modal nhập lý do), thêm comment |
| Project Overview | Tìm kiếm + lọc theo trạng thái, thêm/sửa dự án qua modal, archive |
| Designer Dashboard | Thống kê task, danh sách phiên bản mới nhất, lọc theo dự án |
| Moodboard | Thêm/xóa ảnh & màu, chọn từ khóa AI-3, sắp xếp |
| Version Management | Upload giả lập, đặt nhãn "Mới nhất", đổi trạng thái, archive |
| Task Board | Cột Kanban, đổi trạng thái task, lọc theo người |
| Internal Review | Form nhận xét nội bộ, checklist chất lượng |
| Feedback Summary | AI-2, chỉnh sửa action item, chuyển thành task |
| Template Management | Xem/lọc template, xem trước |
| User Management | Bảng người dùng, tìm kiếm, thêm/sửa/khóa, phân vai trò |
| Project Settings | Form cấu hình, đóng dự án, xác nhận trước khi thao tác |

---

## 18. Khai báo sử dụng AI

Trong `docs/ai-usage-report.md`, nhóm phải khai báo:

- Công cụ AI đã dùng
- Prompt chính
- Phần AI sinh ra
- Phần sinh viên chỉnh sửa
- Lỗi AI gặp phải
- Cách sinh viên kiểm chứng
- Điều sinh viên học được
- Tính năng nào chỉ **mock**, tính năng nào **gọi API thật**

---

## 19. Kế hoạch thực hiện gợi ý

| Giai đoạn | Việc cần làm | Kết quả |
|---|---|---|
| 1. Phân tích | Ngữ cảnh → vấn đề → vai trò → nhiệm vụ → luồng người dùng | `docs/project-proposal.md`, `docs/roles-and-features.md` |
| 2. Kiểm kê màn hình | Lập bảng kiểm kê + trạng thái + AI + người phụ trách | `docs/screen-list.md` |
| 3. Thiết kế | Sitemap, wireframe, mockup desktop/responsive, trạng thái, AI | Figma/Canva |
| 4. **Nộp duyệt** | Giảng viên duyệt bảng kiểm kê + luồng + Figma/Canva | Được phép code chính thức |
| 5. Khởi tạo | Tạo repo, nhánh `dev`, board Trello, cấu trúc thư mục, CSS chung, JSON mẫu | Bộ khung dự án |
| 6. Triển khai | Mỗi SV làm lát cắt dọc, sau đó hoàn thiện các màn còn lại | Các PR merge vào `dev` |
| 7. Tích hợp | Điều hướng chung, đồng bộ dữ liệu giữa các vai trò, responsive | Bản tích hợp |
| 8. Kiểm thử | Đa trình duyệt, mobile, validation, trạng thái rỗng/lỗi | Danh sách lỗi đã xử lý |
| 9. Minh chứng | Quay OBS từng màn, cập nhật README + bảng theo dõi | Video + link |
| 10. Hoàn tất | Merge `main`, kiểm tra README, ai-usage-report | Nộp bài |

> Không nên dồn hết vào cuối kỳ: mỗi màn hình xong nên quay OBS và cập nhật README ngay.

---

## 20. Chuẩn bị bảo vệ

Khi bảo vệ, giảng viên có thể yêu cầu **sửa ngẫu nhiên trong 5–10 phút**, ví dụ:

- Thêm bộ lọc (filter)
- Đổi table thành card (hoặc ngược lại)
- Thêm field + validation
- Xử lý trường hợp API trả về rỗng
- Thay đổi layout responsive
- Thêm một trạng thái mới

### Cần chuẩn bị

- Mỗi thành viên **hiểu toàn bộ sản phẩm**, không chỉ phần mình làm
- Biết chỉ ra file HTML/CSS/JS của từng chức năng
- Biết dữ liệu nằm ở đâu, được đọc/ghi thế nào
- Giải thích được logic AI (mock hay thật, xử lý ra sao)
- Chứng minh được chuỗi:

```text
Ngữ cảnh → Vấn đề → Mục tiêu → Vai trò → Màn hình → Bản mô phỏng
→ Công việc → Nhánh → Commit → PR → OBS → Sản phẩm
```

---

## 21. Cách chạy dự án

Dự án là Frontend thuần, không cần backend.

```bash
# Cách 1: mở trực tiếp
# Mở index.html bằng trình duyệt

# Cách 2 (khuyến nghị, tránh lỗi fetch JSON): dùng local server
# VS Code: cài extension "Live Server" -> chuột phải index.html -> Open with Live Server

# Hoặc dùng Python
python -m http.server 5500
# Truy cập: http://localhost:5500

# (Tùy chọn) JSON Server
npm install -g json-server
json-server --watch assets/data/db.json --port 3000
```

> Khi dùng `fetch()` đọc file JSON, cần chạy qua local server. Mở file trực tiếp bằng `file://` thường bị chặn.

### Tài khoản demo (điền theo dữ liệu mẫu của nhóm)

| Vai trò | Tài khoản | Mật khẩu |
|---|---|---|
| Khách hàng | client@demo.com | |
| Nhà thiết kế | designer@demo.com | |
| Creative Lead | lead@demo.com | |
| Quản trị viên | admin@demo.com | |

---

## 22. Thành viên và liên kết

| Thành viên | MSSV | Vai trò chính | GitHub |
|---|---|---|---|
| SV1 | | Khách hàng | |
| SV2 | | Nhà thiết kế | |
| SV3 | | Creative Lead + Quản trị viên | |

| Tài nguyên | Liên kết |
|---|---|
| GitHub repo | |
| Figma / Canva | |
| Trello / Jira / Notion | |
| Thư mục video OBS | |
| Demo (GitHub Pages, nếu có) | |

---

## Tiêu chí đánh giá tóm tắt

- **Độ đầy đủ của nghiệp vụ > số lượng giao diện.**
- Có nhiều vai trò tương tác, trạng thái nghiệp vụ rõ ràng.
- AI có giải thích, người dùng kiểm soát được kết quả.
- Dữ liệu thể hiện bằng dashboard, danh sách, card, bộ lọc hoặc timeline.
- Có bằng chứng làm việc nhóm: Trello + Git + PR + review + OBS.
- Chỉ đạt ngưỡng số lượng tối thiểu **không** đồng nghĩa với hoàn thành tốt.
