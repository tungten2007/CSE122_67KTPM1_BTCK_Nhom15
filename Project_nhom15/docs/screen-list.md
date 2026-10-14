# Kiểm kê màn hình — bản dùng chung

18 trang: 17 trang trong phạm vi ban đầu, bổ sung register.html theo yêu cầu người dùng. 403/404 dùng chung một trang lỗi và tham số `code=403`. Bảng này ghi bản triển khai; không xác nhận thay giảng viên việc phê duyệt thiết kế.

| Vai trò | Trang | Chức năng/thao tác | AI | Người phụ trách gốc | Task |
|---|---|---|---|---|---|
| Client | client-project-overview.html | Tạo/sửa/tìm/lọc/lưu trữ dự án; xem tiến độ | — | SV1 | 08 |
| Client | client-creative-brief.html | Viết brief, lưu nháp/chấp nhận/gửi | AI-1 | SV1 | 06 |
| Client | client-review-versions.html | So sánh ảnh, ghim/sửa phản hồi, duyệt/yêu cầu sửa/từ chối | — | SV1 | 07 |
| Designer | designer-dashboard.html | Xem/tìm/lọc công việc; đổi trạng thái việc được giao | — | SV2 | 10 |
| Designer | designer-moodboard.html | Thêm/xóa thẻ, màu/từ khóa, cập nhật moodboard | AI-3 | SV2 | 11 |
| Designer | designer-version-management.html | Tạo/tải ảnh, sửa nháp, nộp duyệt/lưu trữ | — | SV2 | 12 |
| Lead | lead-task-board.html | Xem/duyệt brief; tạo/giao/sửa/chuyển việc | — | SV3 | 15 |
| Lead | lead-internal-review.html | Ghi chú/checklist; yêu cầu sửa/chuyển Client | — | SV3 | 16 |
| Lead | lead-feedback-summary.html | Chọn feedback, sửa/bỏ gợi ý, tạo công việc | AI-2 | SV3 | 17 |
| Admin | admin-brief-template-management.html | Xem/lọc/thêm/sửa/bật-tắt mẫu brief | — | SV2 | 18 |
| Admin | admin-user-management.html | Tìm/thêm/sửa/khóa người dùng, phân vai trò | — | SV3 | 19 |
| Admin | admin-project-settings.html | Quy tắc, nhãn, lưu trữ dự án | — | SV3 | 20 |
| Chung | index.html | Giới thiệu, menu mục con, chọn vai trò | — | SV1; chỉnh theo yêu cầu trong bản tích hợp | 22/27 |
| Chung | login.html | Đăng nhập tài khoản demo, chọn nhanh vai trò | — | SV1; hoàn thiện tích hợp | 23/27 |
| Chung | register.html | Đăng ký tài khoản Client, kiểm tra email/mật khẩu | — | Bổ sung khi hoàn thiện tích hợp | 23/27 |
| Chung | profile.html | Xem/sửa hồ sơ, đổi mật khẩu demo | — | SV2 | 24 |
| Chung | notifications.html | Lọc/đọc/xóa thông báo, mở đúng dự án | — | SV2 | 25 |
| Chung | 404.html | Lỗi trang không tồn tại/sai vai trò và đường quay lại | — | SV3 | 26 |

Trạng thái được dùng theo nghiệp vụ: dữ liệu bình thường/rỗng; lỗi form/lưu; thông báo thành công; loading/lỗi AI; nút khóa khi không có quyền hoặc phiên bản đã qua bước; dự án lưu trữ chỉ đọc. Không yêu cầu mọi trang có mọi trạng thái.

`forgot-password.html` chưa triển khai: bản thử nghiệm có nút chọn vai trò và tài khoản mẫu. Cài đặt dự án nằm trong Admin; không tách trang settings dùng chung. Không có backend đăng nhập thật.
