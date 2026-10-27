> Minh chứng lịch sử theo ngày trong tài liệu; không xác nhận bản hiện tại đã chạy lại.

# TASK19/20/21/26 — SV3, ngày12/10/2026

Trạng thái phần triển khai và QA: 🟢 Hoàn thành. Không sửa lại chức năng đã có vì QA không phát hiện lỗi quan trọng.

| Task | Đã thực hiện/kiểm tra | QA | Minh chứng |
|---|---|---|---|
|19|CRUDuser, form/required/email/trùng, lọc/phân trang, vai trò/khóa, giữ dữ liệu|PASS|qa-admin-errors/README.md|
|20|quy tắc/preview, CRUDnhãn, chặn nhãnđang dùng, điều kiện/xác nhận lưu trữ/chỉ xem|PASS|qa-admin-errors/README.md|
|21|6màn ×4widths320/768/1024/1440, menu/dialog/Tab/Escape/focus và ảnhtablet|24/24PASS|qa-responsive-sv3/README.md|
|26|403/404, sai quyền,4rolehome, HTTPHandler thật URLlạ vàJSthiếu|PASS|qa-admin-errors/server-routing.json|

Chromium153: 12nhóm nghiệp vụ19/20/26, 8ảnhdesktop/mobile và 6ảnhtablet đã review độc lập. Không Console/pageerror/tải tài nguyên lỗi ngoài HTTP404 được chủ động thử. Không chứng nhận mọi trình duyệt hoặc thiết bị vật lý.

Tiếp theo TASK27 tích hợp: cần mã SV1/SV2; chưa thể kiểm tra toàn website khi chỉ có demoSV3. FigmaTASK03/04 chưa sửa xong do giới hạnMCP. OBS/duyệt/mergeTASK29 chưa thực hiện.
