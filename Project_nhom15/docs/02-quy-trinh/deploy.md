# Chuẩn bị triển khai website

Chưa xác minh URL public hiện hành. Chưa có bằng chứng workflow deploy hay .nojekyll trong bản đang đối chiếu. Tài liệu này là việc cần làm, không phải biên bản đã triển khai.

1. Chốt commit đã QA trên dev; thống nhất với nhóm cách đưa bản nộp lên main. Không tự thay main trong đợt tài liệu này.
2. Chọn host tĩnh và cấu hình thư mục xuất bản Project_nhom15. Kiểm tra cách host ánh xạ thư mục gốc trước khi ghi URL.
3. Điểm vào hiện tại là html/sv1/index.html, không có index.html ở gốc Project_nhom15. Cần dùng URL có đường dẫn đó hoặc tạo trang vào gốc khi triển khai.
4. Sau khi xuất bản, mở cửa sổ riêng: trang chủ, html/sv1/login.html, html/sv3/lead-task-board.html và html/sv3/404.html?code=403; thử tải lại link sâu, CSS/JS/font, bốn vai trò, dữ liệu sau F5, 320px/1440px và console/network.
5. Ghi URL thật, commit, ngày và kết quả vào [chỉ mục minh chứng](../01-gatekeeper/evidence-index.md), rồi mới xác nhận deploy đạt.

Host tĩnh không chạy Python, SQLite hoặc REST API local. api-demo.html chỉ sử dụng đầy đủ cùng máy chủ Python. LocalStorage ở URL public tách khỏi localhost; xác thực vẫn là frontend demo.

Dự phòng local: từ Project_nhom15 chạy `python server.py 8000`, mở http://127.0.0.1:8000/html/sv1/index.html. Giữ terminal chạy và dùng dữ liệu demo.
