# Kế hoạch & Kịch bản Kiểm thử (Test Cases) — Phân hệ SV2

## Rà soát sau khi tách file từng trang (25/10/2026)

- Cả 8 trang dùng file HTML, CSS và JavaScript riêng cùng tên; bộ kiểm tra xác nhận đường dẫn, không còn style/script/event nhúng trong HTML, và kiểm tra cú pháp cả `js/pages/`.
- Kiểm tra trình duyệt localhost: hồ sơ trước/sau có cùng kích thước bố cục, padding và display của các thành phần chính; nút chỉnh sửa/hủy vẫn hoạt động.
- Dashboard hiển thị trạng thái Loading; Moodboard hiển thị đúng màu HEX, modal AI ẩn/hiện đúng bước và trả kết quả với bảng màu dạng grid; Version Management, Notifications, Error, Portal và Admin Template đều hiển thị nội dung.
- Bộ kiểm tra nghiệp vụ trong `tests/verify.cjs` và mục lục README đều đạt. Chưa chạy lại toàn bộ E2E hoặc mọi kích thước mobile; các kết quả cũ phía dưới là lịch sử/kịch bản kiểm thử.

## Kết quả rà soát mã hiện tại

`node tests/verify.cjs` đạt: sinh mã phiên bản sau khi xóa draft, phân tách assetType, nộp duyệt và thông báo Lead, archive read-only, avatar URL, mật khẩu demo có kiểm tra hiện tại/lưu lại, thông báo theo user, tài khoản khóa, home 4 role, phân quyền, liên kết cục bộ, cú pháp JS và luồng AI success/error/apply.

Các kịch bản phía dưới là hướng dẫn kiểm thử và kết quả kỳ vọng, chưa phải nhật ký PASS. Trình duyệt thử nghiệm không kết nối được localhost trong phiên rà soát. Cần tự kiểm thử desktop/mobile, modal, drawer, FileReader upload, clipboard và tích hợp SV1/SV3. Đổi mật khẩu chỉ là demo với mật khẩu ban đầu `demo123`, không có backend xác thực.

> **Học phần:** Phát triển Ứng dụng Web Cơ bản – CSE122  
> **Dự án:** CreatorStudio  
> **Sinh viên:** SV2 (Nhà thiết kế & Màn hình dùng chung)  

---

## 1. Mục tiêu kiểm thử

Xác minh tính đúng đắn của 6 màn hình thuộc phạm vi phân công SV2:
1. `designer-dashboard.html` (Designer Dashboard)
2. `designer-moodboard.html` (Moodboard & AI-3)
3. `designer-version-management.html` (Version Management)
4. `admin-brief-template-management.html` (Brief Template Management)
5. `profile.html` (Profile Management)
6. `notifications.html` (Notifications Center)

---

## 2. Kịch bản kiểm thử chi tiết

### Kịch bản 1: Kiểm thử Designer Dashboard (`designer-dashboard.html`)
- **TC-01 (Chuyển đổi trạng thái hiển thị):**
  - *Thao tác:* Nhấp vào các nút `Bình thường`, `Đang tải`, `Rỗng`, `Cảnh báo gấp`.
  - *Kỳ vọng:* 
    - `Đang tải`: Hiển thị các khối Skeleton hiệu ứng shimmer.
    - `Rỗng`: Hiển thị Empty State thông báo không có nhiệm vụ.
    - `Cảnh báo gấp`: Chỉ lọc ra các nhiệm vụ có hạn gấp hoặc độ ưu tiên cao.
- **TC-02 (Cập nhật tiến độ nhiệm vụ):**
  - *Thao tác:* Tích chọn checkbox hoặc đổi trạng thái dropdown của một task (ví dụ: CS-103) sang `done`.
  - *Kỳ vọng:* Tên task chuyển sang gạch ngang, thông báo Toast xuất hiện, dữ liệu được ghi vào LocalStorage và giữ nguyên sau khi F5 tải lại trang.

### Kịch bản 2: Kiểm thử Moodboard & AI-3 (`designer-moodboard.html`)
- **TC-03 (Bảng mã màu tương tác):**
  - *Thao tác:* Nhấp nút "Copy HEX" trên ô màu `#24473B`.
  - *Kỳ vọng:* Mã màu được sao chép vào Clipboard, toast thông báo hiển thị "Đã sao chép mã màu #24473B".
- **TC-04 (Luồng AI thành công):**
  - *Thao tác:* Bấm "AI-3 Gợi ý phong cách & Bảng màu", nhập mô tả "Cà phê mộc nguyên bản giấy kraft", bấm "Bắt đầu sinh gợi ý".
  - *Kỳ vọng:* Hiển thị spinner và các bước phân tích, trả về bảng 4 màu HEX, từ khóa cảm xúc, hộp giải thích lý do (Explanation); bấm "Chấp nhận & Áp dụng" cập nhật ngay vào Moodboard.
- **TC-05 (Luồng AI thất bại - Fail State):**
  - *Thao tác:* Mở modal AI, tích chọn "Mô phỏng tình huống AI thất bại (Fail State)", bấm sinh gợi ý.
  - *Kỳ vọng:* Hiển thị thông báo lỗi rõ ràng "AI không đủ dữ liệu tin cậy...", xuất hiện nút "Thử lại (Retry)" và nút "Nhập thủ công".

### Kịch bản 3: Kiểm thử Quản lý Phiên bản (`designer-version-management.html`)
- **TC-06 (Quy tắc sinh mã phiên bản tự động):**
  - *Thao tác:* Bấm "Tải lên phiên bản mới".
  - *Kỳ vọng:* Hệ thống tự tính toán mã phiên bản theo định dạng `{project}-{asset}-v{number}` (ví dụ: `MC26-BaoBi-v4`).
- **TC-07 (Nộp duyệt nội bộ & Kiểm tra Checklist):**
  - *Thao tác:* Bấm nút "Nộp duyệt nội bộ" của phiên bản Draft.
  - *Kỳ vọng:* Kiểm tra điều kiện checklist đã hoàn thành; nếu hợp lệ, trạng thái phiên bản chuyển sang `Internal Review`, ghi lịch sử và tự động sinh thông báo gửi cho Trưởng nhóm (Linh Hà).

### Kịch bản 4: Kiểm thử Brief Template Management (`admin-brief-template-management.html`)
- **TC-08 (Cấu hình Prompt và Thử nghiệm AI-1):**
  - *Thao tác:* Chọn template "Nhận diện thương hiệu", nhấp vào token `{raw_input}` để chèn vào prompt, bấm "Chạy thử nghiệm AI-1".
  - *Kỳ vọng:* Khung kết quả hiển thị bản brief có cấu trúc chuẩn hóa được trích xuất từ mô tả mẫu.
- **TC-09 (Bật / Tắt trạng thái mẫu brief):**
  - *Thao tác:* Nhấp "Tắt mẫu" trên template đang hoạt động.
  - *Kỳ vọng:* Trạng thái chuyển thành `Inactive`, badge màu xám, danh sách cập nhật ngay lập tức.

### Kịch bản 5: Kiểm thử Hồ sơ & Đổi mật khẩu (`profile.html`)
- **TC-10 (Cập nhật thông tin danh tính):**
  - *Thao tác:* Bấm "Chỉnh sửa hồ sơ", đổi tên và bio, bấm "Lưu thay đổi hồ sơ".
  - *Kỳ vọng:* Tên trên thanh topbar và avatar sidebar cập nhật tức thì; dữ liệu người dùng lưu an toàn.
- **TC-11 (Đổi mật khẩu với kiểm tra hợp lệ):**
  - *Thao tác:* Nhập mật khẩu mới ít hơn 6 ký tự hoặc không khớp với xác nhận.
  - *Kỳ vọng:* Hệ thống chặn gửi và báo lỗi đỏ ngay tại form; khi nhập đúng hiển thị thông báo thành công.

### Kịch bản 6: Kiểm thử Trung tâm Thông báo (`notifications.html`)
- **TC-12 (Đánh dấu đã đọc và xóa thông báo):**
  - *Thao tác:* Nhấp "Đánh dấu tất cả đã đọc" và thử xóa 1 thông báo.
  - *Kỳ vọng:* Badge số lượng thông báo đỏ trên chuông ở topbar giảm về 0, thẻ thông báo chuyển từ tím nhạt sang trắng, xóa thành công khỏi danh sách.

---

## 3. Kiểm thử Responsive & Khả năng tiếp cận
- **Mobile (< 760px):**
  - Kiểm tra thanh Sidebar tự động thu gọn thành Drawer.
  - Nút Menu Toggle ở topbar mở menu trượt ra mượt mà; hỗ trợ đóng bằng nút X hoặc phím `Escape`.
- **Desktop (> 1100px):**
  - Bố cục 2 cột (Split layout), các thẻ KPI hiển thị hàng ngang cân đối, không tràn lề.
