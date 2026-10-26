# Hướng dẫn sử dụng CreatorStudio

## Bắt đầu

Chạy `CHAY-WINDOWS.bat` hoặc Live Server với `index.html`. Trang chủ giới thiệu chức năng, hai menu mở mục con và liên kết tới các vai trò. Login có tài khoản mẫu (mật khẩu ban đầu `demo123`) và nút chọn nhanh vai trò.

Từ v11, các mục trên menu không gian làm việc chuyển nội dung trong cùng tài liệu để tránh tải lại toàn trang. Cần chạy qua địa chỉ `http://localhost...` hoặc Live Server. Nếu mở trực tiếp HTML bằng đường dẫn `file:///...`, trình duyệt vẫn dùng chuyển trang thông thường vì không cho tải file nội bộ bằng fetch. Nút Back/Forward vẫn dùng được; khi đổi vai trò hoặc đăng xuất, ứng dụng mở trang mới như bình thường.

Muốn thử tài khoản riêng: Đăng ký → nhập tên/email/mật khẩu demo → đăng nhập. Tài khoản mới là Khách hàng. Dùng mục Hồ sơ để đổi thông tin/mật khẩu; dùng Đăng xuất để kết thúc phiên. Không dùng thông tin hoặc mật khẩu thật trong bài mô phỏng.

## Nhiều tài khoản cùng vai trò

Ở trang đăng nhập, chọn vai trò rồi chọn tên/email trong “Tài khoản mẫu cụ thể”, hoặc nhập email/mật khẩu riêng. Nếu có nhiều người, nút mở demo yêu cầu chọn tài khoản trước. Bộ chọn góc trên hiển thị từng tài khoản theo nhóm vai trò.

Admin thêm Nhà thiết kế/Trưởng nhóm tại Người dùng → Thêm thành viên, dùng email riêng cho mỗi người. Tài khoản do Admin thêm có mật khẩu demo ban đầu `demo123`, có thể đổi trong Hồ sơ. Dashboard Nhà thiết kế chỉ hiện công việc được giao cho tài khoản đó. Phiên bản của đồng đội được xem nhưng Nhà thiết kế chỉ sửa/nộp/xóa/lưu trữ bản do mình tạo.

Trong không gian dự án chung hiện tại, các Trưởng nhóm cùng phối hợp; khi nộp phiên bản, tất cả Trưởng nhóm đang hoạt động nhận thông báo riêng và trạng thái đã đọc được lưu riêng từng người. Đây vẫn là dữ liệu demo cục bộ trong trình duyệt, chưa đồng bộ giữa các máy.

## Thử một dự án từ đầu

1. Vào Client → Tạo dự án. Nhập tên, mô tả, hạn và phân loại.
2. Viết brief. Tạo gợi ý AI hoặc tự viết đủ năm phần; rà soát rồi Chấp nhận và Gửi brief.
3. Chuyển sang Lead, chọn đúng dự án ở góc trên. Xem brief, duyệt và giao công việc cho Designer.
4. Chuyển sang Designer, chọn dự án. Tạo Moodboard hoặc mở Quản lý phiên bản để tải ảnh. Hoàn tất checklist và Nộp duyệt nội bộ.
5. Chuyển sang Lead → Duyệt nội bộ. Chọn đúng phiên bản, xem ảnh và ghi chú. Xử lý hết ghi chú, đánh dấu checklist rồi Chuyển khách hàng.
6. Chuyển sang Client → Xem phiên bản. Chọn phiên bản, thêm phản hồi vào ảnh; duyệt, yêu cầu sửa hoặc từ chối có lý do.
7. Với phản hồi cần sửa, chuyển Lead → Tổng hợp phản hồi. AI tạo gợi ý; sửa nội dung/người phụ trách/hạn, làm rõ phản hồi mơ hồ rồi tạo công việc.

Các vai trò demo cùng dùng một kho dữ liệu trong trình duyệt này. Chuyển vai trò giúp mô phỏng hoạt động của cả nhóm; dữ liệu không tự đồng bộ sang máy khác.

## Các công cụ khác

- Tìm kiếm và bộ lọc giúp chọn đúng dự án/công việc/phiên bản/người dùng.
- Thông báo: xem chưa đọc, đánh dấu đã đọc hoặc xóa; Xem chi tiết đưa tới đúng dự án.
- Admin: tạo/sửa/khóa tài khoản, đổi vai trò, quản lý mẫu brief, quy tắc phiên bản và nhãn.
- Lưu trữ đưa dữ liệu sang chế độ chỉ đọc. Không xóa dự án đã có dữ liệu liên kết.
- Công cụ demo: xuất JSON để tham khảo/sao lưu; Đặt lại dữ liệu mẫu xóa các thay đổi của bản đang dùng. Chưa có chức năng nhập JSON.

## Khi không thấy dữ liệu

Dự án mới chưa có thiết kế nên trang review có thể rỗng. Kiểm tra vai trò, dự án đang chọn và trạng thái phiên bản: Client chỉ thấy phiên bản đã chuyển qua bước duyệt nội bộ.

Nếu thiếu giao diện/file, giải nén lại toàn bộ ZIP. Nếu dữ liệu trình duyệt bị lỗi, dùng nút tải bản sao trước khi cân nhắc đặt lại. Nếu cổng 8000 bận, chạy `python server.py 8001 --open`.
