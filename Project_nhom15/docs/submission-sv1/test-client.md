# Checklist kiểm thử Client

Chạy bằng HTTP/Live Server. Mỗi lần kiểm tra bắt đầu ở trình duyệt riêng hoặc dữ liệu mẫu mới; không xóa dữ liệu cá nhân chưa sao lưu.

| Nhóm             | Thao tác                                                     | Kết quả mong đợi                                                                 |
| ---------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Login            | Email sai, mật khẩu dưới 6 ký tự                             | Hiển thị lỗi và focus vào trường sai                                             |
| Vai trò          | Chọn Designer ở header, thoát, mở Login lại                  | Panel 403 của bộ SV1; Login ghi nhớ Designer                                     |
| Dữ liệu          | Không tải được projects.json, sau đó khôi phục và bấm Retry  | Panel lỗi; tải lại được 4 dự án mẫu                                              |
| Dự án            | Tạo, sửa, tìm kiếm/lọc, archive, restore, xóa sau archive    | State và card cập nhật đúng, reload còn dữ liệu                                  |
| AI               | Mô tả quá ngắn, mô tả hợp lệ, tạo lại, sửa, từ chối          | Lỗi/processing/result đúng; có explanation và user control                       |
| Brief            | Ngân sách âm, deadline rỗng, section chỉ có khoảng trắng     | Không chấp nhận/gửi; báo lỗi cụ thể                                              |
| Brief            | Chấp nhận, reload; sửa và lưu; gửi                           | Accepted được lưu ngay, sửa phải xác nhận lại, Submitted hiện ở Overview         |
| Review           | Song song → slider → song song                               | Slider đáp ứng; trở lại ảnh đầy đủ                                               |
| Pin              | Ghim ở vị trí bất kỳ, sửa nội dung, reload và đổi kích thước | Nội dung/tọa độ tương đối giữ đúng; HTML nhập được hiển thị như văn bản          |
| Feedback         | Đánh dấu đã xử lý, lọc, xóa                                  | Đúng số lượng, pin và card đồng bộ                                               |
| Request Changes  | Chưa có phản hồi, sau đó thêm phản hồi và gửi                | Chặn khi thiếu; lưu Changes Requested khi đủ                                     |
| Approve          | Xác nhận phê duyệt                                           | Project Completed/100%, version Approved/read-only                               |
| Reject           | Lý do trống/ngắn, sau đó lý do hợp lệ                        | Modal validation; lưu Rejected và lý do; version read-only                       |
| Activity         | Mở chuông, đánh dấu đã đọc, đóng Escape/bấm ngoài            | Badge/list và trạng thái đọc đồng bộ                                             |
| Mobile           | 360px, 768px; mở menu, Tab/Shift+Tab, Escape, bấm nền        | Không tràn ngang, focus trong menu và trả về nút mở                              |
| Trình duyệt khác | Chrome/Edge, Firefox, Safari nếu có                          | Chạy lại luồng và ghi kết quả thực tế; không coi trình duyệt chưa chạy là đã đạt |

Kiểm thử tự động được viết cho Chromium. Firefox/Safari và phê duyệt Figma/PR, quay OBS vẫn cần nhóm thực hiện riêng.
