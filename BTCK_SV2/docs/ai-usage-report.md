# Báo cáo Sử dụng AI (AI Usage Report) — Phân hệ SV2

> Bản cơ bản theo yêu cầu sinh viên năm 2: Codex đã chuyển khung giao diện sang HTML trực tiếp, thay bộ App/View/Store bằng hàm và sự kiện DOM, thêm chú thích tiếng Việt, giữ HTML/CSS/JS riêng cho 8 trang. AI-3 hiện dùng hai nhóm quy tắc cà phê/kraft và trà; AI-1 hiển thị Prompt sau khi thay mô tả để thử nghiệm. Kiểm tra tự động chạy trong DOM mô phỏng; chưa xác minh giao diện trình duyệt của bản này. Nội dung triển khai trước bên dưới giữ làm lịch sử.

> Cập nhật trước đó 26/10/2026: đã refactor thành 8 bộ HTML/CSS/JS độc lập. Giao diện và template nằm trong HTML; mỗi JS bọc DOMContentLoaded, không dùng innerHTML/.style; mỗi CSS tự chứa đầy đủ và không import. Các đường dẫn thư mục js/css cũ bên dưới là lịch sử triển khai trước refactor. Phần sinh viên tự sửa, review và OBS vẫn cần minh chứng thực tế.

> Ghi chú rà soát: các khai báo Gemini/Antigravity, prompt lịch sử và phần sinh viên chỉnh sửa bên dưới có sẵn trong thư mục; chưa có minh chứng độc lập để xác nhận. Không dùng chúng làm bằng chứng OBS/commit/PR.

## Lần rà soát bằng Codex

- Yêu cầu: đối chiếu thư mục với README, Excel và ảnh hướng dẫn BTL, sửa chỗ sai.
- AI sinh sửa mã Navigation/App/Store, Profile, Dashboard, Version Management, responsive portal; bổ sung tài liệu đối chiếu/phân công và bộ kiểm tra Node.js.
- Kiểm chứng: đọc bảng Excel bằng Python read-only, đối chiếu từng file với 6 màn hình SV2; bộ kiểm tra Node.js đạt cho nghiệp vụ dữ liệu, route, cú pháp và AI mô phỏng. Chưa xác minh giao diện bằng trình duyệt vì localhost timeout.
- Tính năng AI sản phẩm: mock JavaScript theo từ khóa, không gọi API thật. Gỡ con số tin cậy 94% không có cơ sở; mô tả không khớp từ khóa trả lỗi để người dùng bổ sung/nhập tay.
- Phần sinh viên cần làm: tự đọc và chỉnh sửa mã, xác minh giao diện, ghi lại bài học thực tế, quay OBS và tạo commit/PR thật. Chưa ghi nhận các bước này là đã hoàn thành.

> **Học phần:** Phát triển Ứng dụng Web Cơ bản – CSE122  
> **Dự án:** CreatorStudio – Quản lý dự án sáng tạo và phản hồi phiên bản  
> **Sinh viên phụ trách:** Sinh viên 2 (SV2) – Vai trò: Nhà thiết kế (Designer) & Phân hệ chung  

---

## 1. Mục đích báo cáo

Báo cáo này tuân thủ mục 19 trong tài liệu đặc tả bài tập lớn và README của dự án CreatorStudio, ghi nhận trung thực quá trình ứng dụng Trí tuệ Nhân tạo (AI) trong việc thiết kế trải nghiệm, sinh mã nguồn, xây dựng module mô phỏng AI và kiểm thử giao diện frontend.

---

## 2. Công cụ AI đã sử dụng

1. **Google Gemini / Antigravity AI Assistant:**
   - Hỗ trợ xây dựng cấu trúc HTML5 ngữ nghĩa, hoàn thiện CSS Design Tokens đồng bộ với nhóm.
   - Hỗ trợ viết logic JavaScript thuần (Vanilla JS) không phụ thuộc framework cho module Store, Navigation và AI-3 Mood Keyword Assistant.
2. **Kỹ thuật mô phỏng AI ở Frontend (In-browser Simulation):**
   - Mô phỏng hành vi của mô hình ngôn ngữ lớn (LLM) và thuật toán phân tích màu sắc thị giác bằng JavaScript thuần, tạo trải nghiệm tương tác AI trực tiếp trên trình duyệt mà không bắt buộc có máy chủ backend đắt đỏ.

---

## 3. Các Prompt chính đã sử dụng

### Prompt 1: Thiết kế giao diện và trải nghiệm cho module AI-3 (Mood Keyword Assistant)
```text
Thiết kế module AI Mood Keyword Assistant tại màn hình designer-moodboard.html tuân thủ quy chuẩn:
Input -> Validation -> AI Processing (Loading/Skeleton/Progress) -> Result (Keywords + HEX Palette) 
-> Explanation (Vì sao có kết quả này) -> User Control (Chấp nhận / Sửa / Từ chối / Tạo lại / Lưu vào Store).
Đồng thời phải có trạng thái AI thất bại (thiếu dữ liệu, AI không chắc chắn, thử lại, nhập thủ công).
```

### Prompt 2: Xây dựng Store quản lý LocalStorage và kiểm soát quy tắc phiên bản
```text
Viết module Store trong JavaScript thuần quản lý lưu trữ LocalStorage cho các thực thể:
tasks, versions, moodboards, briefTemplates, notifications, users, activity.
Khi tạo phiên bản mới, phải tự động sinh mã theo settings.versionPattern ({project}-{asset}-v{number})
và kiểm tra checklist nghiệm thu trước khi cho phép nộp duyệt nội bộ.
```

### Prompt 3: Cấu hình Prompt gợi ý cho AI-1 trong admin-brief-template-management.html
```text
Xây dựng giao diện danh mục mẫu brief định sẵn theo ngành hàng (Branding, Packaging, UI/UX, Campaign)
kèm bảng điều khiển cấu hình System Prompt cho AI-1 (Brief Structurer), cho phép chèn biến {raw_input},
{category}, {deliverables} và có khung chạy thử nghiệm AI mô phỏng trực tiếp.
```

---

## 4. Nội dung AI sinh ra và Nội dung Sinh viên đã chỉnh sửa

| Thành phần | Nội dung AI gợi ý ban đầu | Nội dung Sinh viên (SV2) đã tinh chỉnh & hoàn thiện |
|---|---|---|
| **Cấu trúc lưu trữ Store** | Chỉ lưu dạng mảng đơn giản không có kiểm tra lỗi | Bổ sung kiểm tra hợp lệ chặt chẽ (`requireValue`), chống trùng email, kiểm tra `settings.requireReview`, bắt buộc hoàn thành checklist mới được nộp duyệt nội bộ. |
| **Giao diện Moodboard** | Danh sách màu tĩnh không có tương tác | Thêm tính năng Click-to-copy mã HEX, hiển thị tương phản, thêm/xóa ô màu, thêm thẻ cảm hứng linh hoạt với ảnh SVG minh họa. |
| **Trải nghiệm AI-3** | Chỉ có nút bấm hiển thị popup kết quả tức thì | Bổ sung đầy đủ luồng: nhập liệu -> kiểm tra độ dài -> thanh tiến độ suy nghĩ có độ trễ -> giải thích lý do thẩm mỹ -> bộ nút kiểm soát của người dùng; đặc biệt xây dựng **trường hợp AI thất bại** với nút thử lại và nhập thủ công. |
| **Dashboard** | Bảng danh sách task thông thường | Thêm 4 trạng thái xem theo Mục 8 đề bài: Bình thường (Normal), Đang tải (Loading), Rỗng (Empty), Cảnh báo gấp (Urgent); thêm AI Priority Assistant. |

---

## 5. Lỗi AI gặp phải và Cách kiểm chứng

1. **Lỗi:** AI ban đầu sử dụng các thư viện ngoài hoặc CDN (như FontAwesome, Tailwind) không phù hợp với tiêu chí bài tập lớn (HTML/CSS thuần, hoạt động offline/local).
   - *Khắc phục:* Chuyển đổi toàn bộ icon sang SVG nội bộ nhúng trực tiếp, viết CSS thuần dùng CSS Variables (`var(--primary)`, `var(--line)`...) đồng bộ với UI Kit của nhóm.
2. **Lỗi:** Bảng màu AI sinh ra ban đầu không có độ tương phản hợp lý hoặc mã màu HEX bị lệch format.
   - *Khắc phục:* Sinh viên xây dựng bộ dữ liệu chuẩn hóa (`KNOWLEDGE_BASE`) phân chia rõ vai trò: Màu chủ đạo, Màu nền bao bì, Màu tương phản phụ, Màu chữ & chi tiết.

---

## 6. Phân định tính năng Mock vs. API Thật

- **Tính năng Mock:**
  - AI-3 Mood Keyword Assistant và AI-1 Prompt Tester được mô phỏng thông minh ở phía Frontend bằng JavaScript theo luật ngữ cảnh kết hợp độ trễ mô phỏng (`setTimeout`). Không gọi API bên ngoài để đảm bảo tính ổn định tuyệt đối khi chấm bài và thuyết trình offline.
  - Dữ liệu dự án, nhiệm vụ, phiên bản và thông báo được lưu trữ bền vững tại `localStorage.getItem('creatorstudio.v1')`.
- **Khả năng mở rộng API thật:**
  - Hàm `generateSuggestion()` trong `js/modules/ai-mood-assistant.js` đã được viết dưới dạng `Promise` bất đồng bộ (`async/await`), hoàn toàn sẵn sàng thay thế phần logic nội bộ bằng lệnh `fetch('/api/gemini')` hoặc OpenAI API khi nhóm triển khai backend thực tế.

---

## 7. Bài học kinh nghiệm của Sinh viên

- Hiểu sâu sắc về kiến trúc ứng dụng Web Frontend hiện đại: Tách biệt rõ ràng tầng Dữ liệu (`Store`), Điều hướng (`Navigation`), Khung ứng dụng (`App`) và Giao diện nghiệp vụ (`Pages`).
- Nắm vững nguyên tắc thiết kế trải nghiệm người dùng đối với các tính năng AI: AI phải minh bạch lý do (Explainability), tôn trọng quyền kiểm soát của con người (Human-in-the-loop) và luôn có kế hoạch dự phòng khi AI không đưa ra kết quả mong muốn (Graceful Fallback).
