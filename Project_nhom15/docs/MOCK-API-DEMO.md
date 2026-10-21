# Demo REST API dự án — CreatorStudio

Bổ sung trên bản tích hợp nhóm `cb8bff2ae7ca0103f2f7b33ad88e506ceb4595b5` (nhánh `release/creatorstudio-v5`). Thay đổi được đưa vào nhánh riêng để nhóm xem xét; không tự merge vào main/dev hoặc thay phần SV1 độc lập.

## Chạy và trình diễn

1. Giải nén toàn bộ mã nguồn, mở thư mục `Project_nhom15`.
2. Chạy `CHAY-WINDOWS.bat` hoặc `python server.py 8000 --open`.
3. Chọn **Demo REST API** ở trang Dự án của tôi hoặc liên kết cuối trang chủ. Có thể mở trực tiếp `http://127.0.0.1:8000/api-demo.html`.
4. Tải danh sách (GET/200), tạo dự án (POST/201), sửa (PATCH/200), xóa sau xác nhận (DELETE/204). Mở F12 → Network để xem request thật.
5. Trong biểu mẫu, tích **Thử lỗi 503 ở lần lưu này**, gửi và thử lại. Nội dung được giữ; không báo đã lưu khi request thất bại. Điều khiển thử lỗi tự bỏ chọn sau một request.
6. Mở hai tab, cùng mở sửa một dự án trước khi tab nào lưu. Tab A lưu trước, tab B gửi revision cũ sẽ nhận 412. Tab B cần đóng biểu mẫu và tải lại danh sách trước khi sửa tiếp.
7. Bật độ trễ 600 ms để nhìn trạng thái đang tải/đang lưu và việc nút gửi được khóa chống bấm lặp.

Live Server hoặc `python -m http.server` vẫn mở được frontend cũ, nhưng không cung cấp các API route này. Màn demo sẽ báo cần chạy `server.py`, không giả lưu thành công qua LocalStorage.

## Phạm vi chính xác

- Request HTTP thật giữa trình duyệt và Python, dữ liệu demo lưu SQLite ở máy chạy server.
- Đây là **mock API cục bộ**, không phải dịch vụ MockAPI.io; không cần tài khoản dịch vụ hoặc khóa API.
- Màn `api-demo.html` là nơi demo CRUD dự án qua API. Các trang Client/Designer/Lead/Admin cũ tiếp tục dùng `Store`/`creatorstudio.team.v1`. Chưa chuyển toàn bộ nghiệp vụ nhóm sang API.
- Dữ liệu hai khu riêng biệt. Không tự nhập dữ liệu cá nhân, tài khoản hoặc mật khẩu từ Store lên API; không có thao tác đồng bộ ngầm.
- Server lắng nghe trên `127.0.0.1`; tab cùng máy và cùng cổng nhìn thấy cùng dữ liệu API. Đây không phải đồng bộ qua Internet hoặc xác thực đa người dùng.
- Chưa có backend phân quyền, đăng nhập thật hay LLM API. Không triển khai công khai server demo này.

## Các endpoint

| Phương thức | Route | Kết quả |
| --- | --- | --- |
| GET | `/api/health` | 200; nhận diện mock API |
| GET | `/api/projects` | 200; mảng dự án, có thể rỗng |
| GET | `/api/projects/{id}` | 200; một dự án và header ETag; 404 nếu không có |
| POST | `/api/projects` | 201; ID do server tạo, revision=1, header Location/ETag |
| PATCH | `/api/projects/{id}` | 200; tăng revision; cần `If-Match: "1"` tương ứng bản vừa đọc |
| DELETE | `/api/projects/{id}` | 204; body rỗng; cũng cần If-Match |

Body POST/PATCH là JSON, `Content-Type: application/json`. Trường cho phép: `name`, `description`, `category`, `deadline`, `status`, `progress`. ID/revision/thời gian do server quản lý. POST bắt buộc tên 3–100 ký tự và ngày ISO `YYYY-MM-DD`. Loại: Branding/UI/UX/Campaign; trạng thái: Active/In Review/Completed/Archived; tiến độ nguyên 0–100. Completed đặt tiến độ 100.

Lỗi trả JSON `{ "error": { "code": "...", "message": "..." } }`. Có 400 (JSON sai), 404, 405, 413 (body quá lớn), 415 (sai Content-Type), 422 (trường không hợp lệ), 428 (thiếu If-Match), 412 (revision cũ), 503 (lỗi mô phỏng hoặc lưu trữ). Truy vấn `?delay=600` tạo độ trễ (giới hạn 1.500 ms); `?fail=1` trả lỗi 503 trước khi ghi. Frontend timeout 8 giây; nếu timeout khi tạo, cần tải lại danh sách kiểm tra trước khi gửi lại.

## Lưu trữ và mã nguồn

- `server.py`: giữ cách mở website cũ, thêm route API; chặn truy cập trực tiếp thư mục dữ liệu riêng.
- `mock_api.py`: validation, HTTP response và giao dịch SQLite; thay đổi kèm revision được kiểm tra trong transaction.
- `assets/data/mock-projects.json`: dữ liệu khởi tạo, lấy tên/mô tả dự án mẫu của bản tích hợp; không chứa tài khoản.
- `.demo-data/mock-api.sqlite3`: chỉ tạo tại máy chạy server, được Git bỏ qua. Không bị mất khi tải lại trang hoặc khởi động lại server. Nếu xóa hết dự án qua API, server không tự nạp lại mẫu khi khởi động.
- `api-demo.html`, `css/api-demo.css`, `js/api-demo.js`: màn demo, giữ HTML/CSS/JS riêng và dùng font Inter có sẵn.
- `js/project-api.js`: lớp fetch có timeout, lỗi và sự kiện nhật ký request; không fallback giả ghi thành công.
- Không đổi schema, khóa dữ liệu hoặc logic nghiệp vụ Store nhóm. Không thêm dependency npm vào mã website; chỉ cần Python tiêu chuẩn.

Nếu muốn bắt đầu lại dữ liệu API, dừng server, sao lưu rồi đổi tên `.demo-data/mock-api.sqlite3` và mở server lại. Việc này chỉ tác động API demo; không xóa LocalStorage của nhóm.

## Kết quả kiểm tra lần bổ sung

- **13 bài kiểm tra Python qua HTTP loopback thật đạt**: CRUD, validation, body JSON/Content-Type, revision, lưu bền, không tự seed lại danh sách rỗng, lỗi/độ trễ, host/origin, bảo vệ dữ liệu riêng và metadata response.
- **15 kiểm tra UI bằng Happy DOM kết hợp HTTP thật đạt**: loading, khóa nút, lỗi 503 giữ nội dung, thử lại, conflict 412, tải lại, xóa, giữ nguyên Store nhóm và nhật ký request. Đây là mô phỏng DOM, không phải kiểm tra layout.
- **11 nhóm kiểm tra tích hợp hiện có đạt** (`tests/task27-integration.cjs`); cả 9 tệp `tests/*.test.cjs` hiện có chạy thành công.
- `python check_bundle.py`, kiểm tra cú pháp Python/JS và `git diff --check` đạt.
- Đã chuẩn bị `tests/browser-mock-api.cjs`, nhưng Chrome bị môi trường chặn khi tạo socket. **Chưa có kết quả PASS trình duyệt thật, ảnh chụp hoặc xác minh viewport cho thay đổi mới.** Không sử dụng các kết quả Chromium cũ làm bằng chứng cho bản này.

Các bài kiểm tra API dùng SQLite tạm, không thay dữ liệu `.demo-data` của người dùng.

## Chạy lại kiểm tra

```sh
python tests/test_mock_api.py
node tests/task27-integration.cjs
python check_bundle.py
```

Tùy chọn kiểm tra DOM (dependency chỉ phục vụ test, theo yêu cầu phiên bản Node của Happy DOM):

```sh
npm install --no-save --package-lock=false happy-dom
node tests/api-demo.dom.mjs
```

Tùy chọn kiểm tra trình duyệt với Playwright/Chromium:

```sh
npm install --no-save --package-lock=false playwright
npx playwright install chromium
node tests/browser-mock-api.cjs
```

Test tự mở server tạm. Hỗ trợ `CS_PYTHON`, `CS_CHROMIUM_PATH`, `CS_TEST_REPORT` và `CS_QA_SCREENSHOTS`. Trước khi nộp, nhóm cần kiểm tra bằng Chrome thật, các chiều rộng 360/390/768/1440 px, xem nội dung thông báo và quay OBS với request thực trong Network. Figma/PR/OBS chưa được coi là đã duyệt hoặc đã thực hiện.
