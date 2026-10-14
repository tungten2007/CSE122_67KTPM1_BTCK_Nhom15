# Biên bản kiểm tra — 02/10/2026

## Đã chạy

| Nhóm | Kết quả |
|---|---|
| Thêm/sửa task, đổi trạng thái, đọc lại LocalStorage | Đạt |
| Validation task, vai trò không phù hợp, trạng thái không hợp lệ | Đạt |
| Duyệt brief tạo đúng một task và chặn duyệt lặp | Đạt |
| Trả brief cần lý do, không tạo task | Đạt |
| Checklist và ghi chú chặn Pass; đủ điều kiện → Client Review | Đạt |
| Tạo/sửa/giải quyết note; yêu cầu sửa phiên bản | Đạt |
| Tạo/sửa user, trùng email, khóa/mở khóa, chặn tự khóa/đổi vai trò | Đạt |
| Thiết lập studio, thêm/sửa/xóa nhãn, chặn xóa nhãn đang dùng | Đạt |
| Điều kiện lưu trữ, chặn sửa dự án lưu trữ | Đạt |
| LocalStorage lỗi: không báo lưu thành công hoặc áp dụng thay đổi | Đạt |
| AI → sửa → task, chặn mơ hồ/lặp cùng đề xuất, bỏ gợi ý giữ nguồn | Đạt |
| AI thiếu dữ liệu và lỗi mô phỏng | Đạt |
| Cú pháp toàn bộ JavaScript, tham chiếu file tĩnh, 7 HTML entrypoint | Đạt |
| Chạy máy chủ Python, mở các HTML bằng HTTP, URL lạ → trang 404 | Đạt |

Kiểm thử nghiệp vụ dùng Node VM với bộ lưu trữ giả lập theo API LocalStorage. Không thay thế kiểm thử hành vi trên trình duyệt. Hai hình SVG là tài sản minh họa, không phải ảnh chụp website chạy thật.

## Chưa kiểm tra trực tiếp bằng trình duyệt

Môi trường không tải được Chromium và trình duyệt từ xa không mở được máy chủ local. Không có ảnh chụp website hoặc kết quả kiểm tra console/viewport được xác nhận. Không đánh dấu những mục dưới đây đã xong.

- [ ] Chrome desktop 1440×900: 4 cột Kanban, không chồng chữ; kéo thả đúng cột.
- [ ] Điện thoại 390×844 và 360×800: không tràn ngang; menu đóng/mở; chọn cột Kanban và đổi trạng thái.
- [ ] Tablet 768×1024: bố cục thích ứng, form/dialog không bị che.
- [ ] Mọi dialog: Hủy/Escape không ghi thay đổi, Tab chuyển focus trong dialog.
- [ ] Form: lỗi required, email sai, email trùng, ghi chú/lý do quá ngắn được hiển thị.
- [ ] Duyệt nội bộ: ghim đúng vị trí, chuyển tab ảnh/moodboard, bật/tắt ghi chú đã xử lý.
- [ ] AI: loading, lỗi và thử lại, sửa trước khi tạo task, F5 giữ dữ liệu.
- [ ] Hai vai trò: mở URL trái quyền → 403; về đúng trang theo vai trò.
- [ ] Dự án Lúa Tea đã lưu trữ: xem được, các thao tác ghi bị chặn.
- [ ] Không lỗi đỏ trong Console; hình/stylesheet/script không thiếu.
- [ ] Tích hợp dữ liệu và luồng SV1/SV2; rà soát yêu cầu đề với giảng viên.

## Lưu ý tích hợp

- Không có xác thực hoặc bảo mật backend. Role Switcher chỉ dành cho demo.
- Trang 404 custom cho URL lạ hoạt động với `server.py`. Live Server hoặc hosting khác cần tự cấu hình trang lỗi; luôn có thể mở `404.html` trực tiếp.
- Dữ liệu chỉ trong trình duyệt; chưa đồng bộ giữa máy/tài khoản thật.
- Chưa kiểm chứng phê duyệt thiết kế, video OBS, GitHub hoặc bản nộp chính thức.

## Bổ sung Task 5 ngày 02/10/2026

5 nhóm kiểm thử điều hướng bằng Node VM đạt: 4 vai trò/URL tồn tại, khôi phục phiên mới, chặn sai quyền/tài khoản khóa, trang chờ ghép và cấu hình tích hợp. 12 nhóm dữ liệu cũ vẫn đạt. Đã kiểm tra cú pháp và đường dẫn file sau cập nhật. Chưa kiểm thử DOM thực: focus/Tab/Escape/backdrop/resize/chuông cần chạy trên máy người dùng theo TASK-05-SV3.md.


## Kiểm tra bộ bàn giao — 05/10/2026

BỔ SUNG SAU TASK 5 — KIỂM TRA VÀ BÀN GIAO PHẦN SV3

MÔ TẢ
Đóng gói đầy đủ HTML, CSS, JavaScript và ảnh để chuyển sang máy khác. Thêm trang BAT-DAU.html hướng dẫn giải nén/mở web, thông báo khi tài nguyên thiếu và công cụ kiểm tra bộ file. Máy chủ kiểm tra phụ thuộc trước khi mở; tài nguyên thiếu trả HTTP 404 đúng loại.

CHECKLIST ĐÃ KIỂM TRA
[x] Bộ file đầy đủ vượt qua check_bundle.py.
[x] Cố tình bỏ js/app.js: phát hiện đúng file thiếu.
[x] Các trang và tài nguyên mẫu trả HTTP 200.
[x] URL trang không tồn tại chuyển tới 404.html.
[x] JavaScript không tồn tại trả HTTP 404, không chuyển sang trang HTML.
[x] Cú pháp JavaScript hợp lệ.
[x] Kiểm thử Node: không báo lỗi khi đủ file; thông báo gộp đường dẫn trùng và hiển thị bằng textContent.
[x] Có hướng dẫn gửi nguyên ZIP và giới hạn dữ liệu LocalStorage.

CHECKLIST CẦN KIỂM TRA THỰC TẾ
[ ] Người nhận giải nén và mở index.html bằng Live Server.
[ ] Kiểm tra các luồng SV3, Console, desktop/mobile và kéo thả.
[ ] Kiểm tra CHAY-WINDOWS.bat trên Windows có Python 3.9+.
[ ] Nhóm review và ghép phần SV1/SV2.

Không coi kiểm thử Node/HTTP là kiểm thử giao diện. Chưa xuất bản website hoặc xác nhận duyệt bài.

