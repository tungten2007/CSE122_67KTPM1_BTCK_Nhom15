> Khôi phục từ bản sao lưu ngày 25/10/2026. Nội dung dự thảo/lịch sử cần đối chiếu; số liệu hiện hành ưu tiên README gốc và evidence-index. Chưa xác nhận link Figma/Trello/deploy hoặc kết quả chưa chạy lại.

# Kịch bản demo 6 phút

Mục tiêu: trong **6 phút**, chứng minh 4 vai trò, luồng dữ liệu liên thông, 3 AI mô phỏng, trạng thái lỗi/empty, responsive/A11y và dữ liệu bền qua F5. Không cố trình diễn mọi chức năng.

## 1. Chuẩn bị trước giờ chấm (10 phút)

1. Mở website bằng một trong hai cách:
   - Deploy: URL public trong [evidence-index.md](../01-gatekeeper/evidence-index.md) (nếu đã có).
   - Local: `python server.py 8000 --open` → `http://127.0.0.1:8000/index.html`.
2. Vào **Công cụ demo → Đặt lại dữ liệu mẫu** để có trạng thái chuẩn: dự án **Mộc Coffee**, brief `submitted`, phiên bản v3 `Internal Review`, 3 phản hồi của Khánh Chi (một phản hồi mơ hồ).
3. Đóng tab/thông báo không liên quan; zoom 100%; bật loa; tắt tiếng thông báo hệ điều hành.
4. Mở sẵn 4 thứ trong 4 tab: website, Figma frame Task Board, GitHub PR, thư mục OBS. Chỉ chuyển tab khi được nhắc.
5. Bấm giờ thử 1 lần; nếu quá 6:15, cắt phần Admin Settings.

Tài khoản nhanh (mật khẩu `demo123`):

| Vai trò | Email | Dùng cho |
|---|---|---|
| Khách hàng | khanhchi@example.com | Brief, review versions |
| Nhà thiết kế | annguyen@example.com | Dashboard, moodboard, version |
| Trưởng nhóm | linhha@example.com | Board, internal review, AI-2 |
| Quản trị viên | minhanh@example.com | User management, settings |

## 2. Timeline 6 phút

| Thời gian | Mốc | Nội dung | Người nói |
|---|---|---|---|
| 0:00–0:25 | 1. Định vị | Vấn đề, 4 vai trò, 3 AI mô phỏng, stack | SV bất kỳ |
| 0:25–1:35 | 2. Client (SV1) | Tìm/lọc/empty, validation, brief AI-1 | SV1 |
| 1:35–2:45 | 3. Designer (SV2) | Task, AI-3, version | SV2 |
| 2:45–4:15 | 4. Lead/Admin (SV3) | Duyệt brief → task, internal review, client approve, AI-2, admin | SV3 |
| 4:15–5:15 | 5. Chất lượng | 375px, bàn phím, 403/404, F5 | SV3 + SV1 |
| 5:15–5:45 | Kết | Tóm tắt minh chứng, không đọc lại toàn bộ | Cả nhóm |
| 5:45–6:00 | Dự phòng | Trả lời câu hỏi ngắn hoặc dừng | — |

## 3. Chi tiết thao tác

### Mốc 1 — Định vị (0:00–0:25)

- Mở Landing.
- Nói: “CreatorStudio quản lý một dự án sáng tạo từ brief → moodboard → phiên bản → duyệt nội bộ → khách duyệt → phản hồi thành công việc. Bốn vai trò dùng chung một Store; ba AI đều là mô phỏng bằng quy tắc, không gọi API.”
- Chỉ nhanh 4 thẻ vai trò; không bấm vào từng màn.

### Mốc 2 — Client (0:25–1:35)

1. Đăng nhập **Khánh Chi** bằng nút chọn nhanh vai trò.
2. **Dự án của tôi**: gõ `Mộc` → còn 1 dự án; gõ `xyz` → empty state + nút xóa lọc; bấm xóa lọc.
3. Bấm **Tạo dự án mới**, để trống tên, bấm tạo → lỗi validation; đóng dialog.
4. Mở **Xem brief** của Mộc Coffee → bấm **Tạo gợi ý AI-1**:
   - Trong 700 ms, nói “AI đang xử lý”.
   - Chỉ 5 phần, dòng giải thích và cảnh báo “đối tượng chưa rõ”.
   - Sửa nhanh một từ, bấm **Chấp nhận và lưu**, rồi **Gửi brief**.
5. Không mở review versions ở đây (để dành mốc 4).

**Câu nói chốt:** “Brief vừa gửi nằm trong Store chung, không phải dữ liệu trang trí.”

### Mốc 3 — Designer (1:35–2:45)

1. Đăng xuất → đăng nhập **An Nguyễn**.
2. **Dashboard**: chỉ task `CS-103` màu gấp; đổi trạng thái sang **Chờ duyệt**.
3. **Moodboard** → mở **AI-3**:
   - Giữ prompt mẫu; bấm tạo, chờ 1,4 giây.
   - Chỉ theme, 4 mã HEX, lý do, từ khóa.
   - Bấm **Chấp nhận & Áp dụng**.
   - (Nếu còn 10 giây) bật “mô phỏng thất bại”, bấm tạo, chỉ thông báo lỗi và nút thử lại; tắt checkbox.
4. **Quản lý phiên bản**: chỉ phiên bản v3 đang `Internal Review`, bộ lọc trạng thái; không cần upload mới.

**Câu nói chốt:** “Task và phiên bản lấy đúng dự án đang chọn; AI chỉ gợi ý, Designer quyết định áp dụng.”

### Mốc 4 — Lead/Admin (2:45–4:15)

1. Đăng nhập **Linh Hà**.
2. **Bảng công việc**: thấy brief mới của Khánh Chi trong thông báo brief → **Xem brief** → **Duyệt & tạo công việc** → giao An, hạn +7 ngày → lưu. Chỉ thẻ mới ở cột **Cần làm**.
3. **Duyệt nội bộ**: chọn phiên bản v3, ghim một ghi chú, tick 2 checklist, bấm **Chuyển khách hàng**; nói “chỉ chuyển được khi đủ điều kiện”.
4. Đăng nhập **Khánh Chi** → **Duyệt phiên bản** → chọn v3 → **Phê duyệt**. (Nếu thời gian gấp, bỏ bước này và nói đây là nhánh đã QA.)
5. Đăng nhập **Linh Hà** → **Tổng hợp phản hồi**:
   - Chọn 3 phản hồi → **Tổng hợp bằng AI-2** → chờ 1,1 giây.
   - Chỉ gợi ý có lý do + nguồn; phản hồi “chưa cao cấp” bị đánh dấu **Cần làm rõ**.
   - Bấm **Làm rõ & chỉnh sửa**, nhập “Tăng tương phản và dùng chất liệu nhám”, lưu.
   - Chọn 1 đề xuất → **Tạo công việc** → mở bảng, chỉ thẻ mới.
6. (Nếu còn 20 giây) Đăng nhập **Minh Anh** → **Người dùng**: khóa rồi mở khóa Bình Trần; **Thiết lập dự án**: chỉ quy tắc `{project}-{asset}-v{number}`.

**Câu nói chốt:** “Brief → task → version → duyệt → phản hồi → task mới dùng cùng ID, không copy dữ liệu.”

### Mốc 5 — Chất lượng (4:15–5:15)

1. Trên bảng công việc, thu về **375px**: chỉ tab trạng thái, không tràn ngang; mở một thẻ bằng bàn phím.
2. Mở menu/ dialog, bấm **Esc** để đóng; chỉ focus quay lại nút.
3. Mở `/404.html` và `/404.html?code=403`; chỉ nút quay lại theo vai trò.
4. Nhấn **F5** trên bảng công việc: thẻ vừa tạo vẫn còn.
5. Nếu có Console: mở nhanh, không có lỗi đỏ.

### Kết (5:15–5:45)

- “18 màn hình, 4 vai trò, 3 AI mô phỏng, một Store LocalStorage, test Node và Chromium.”
- Chỉ [evidence-index.md](../01-gatekeeper/evidence-index.md): Figma 6/18, PR đang mở, deploy/OBS đang chờ — nói đúng trạng thái, không nhận đã xong.
- Cảm ơn và mời đặt câu hỏi.

## 4. Phương án dự phòng

| Sự cố | Xử lý ngay | Nói với giảng viên |
|---|---|---|
| Deploy không mở | Chuyển tab localhost đã chuẩn bị | “Bản deploy đang lỗi mạng, em demo bản local cùng commit.” |
| LocalStorage hỏng/thiếu dữ liệu | Công cụ demo → Đặt lại dữ liệu mẫu | “Dữ liệu mẫu được khôi phục, không ảnh hưởng mã nguồn.” |
| Đăng nhập sai | Dùng nút chọn nhanh vai trò | Không nhập lại nhiều lần |
| AI “treo” 1–2 giây | Nói “đang mô phỏng xử lý 700/1100/1400 ms” | Không bấm lặp |
| Quá giờ | Bỏ Admin Settings và bước client approve | Ưu tiên brief → task → AI-2 → F5 |
| Trình duyệt crash | Mở profile dự phòng đã đăng nhập sẵn | Không cài đặt lại phần mềm |

## 5. Những điều không được làm khi demo

- Không đọc lại toàn bộ code hoặc slide.
- Không nói “AI thật”, “đã deploy”, “Figma đủ 18 màn”, “đã quay OBS” khi chưa có.
- Không xóa dữ liệu trình duyệt của người khác; chỉ dùng công cụ reset của app.
- Không mở tab cá nhân, email, mạng xã hội.
- Không tranh nhau nói; mỗi mốc một người phụ trách.
