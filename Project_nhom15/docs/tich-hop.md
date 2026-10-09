# Ghép với phần SV1 và SV2

1. Giữ `index.html` và `login.html` của SV1. `index.html` trong gói này chỉ mở nhanh bản demo SV3.
2. Giữ 6 tên HTML như bảng kiểm kê. Đối chiếu điều hướng dùng chung trước khi chép đè `css/base.css` hoặc `js/app.js` của nhóm; đây là module độc lập, chưa sửa repo nào.
3. Dữ liệu gói này có khóa riêng `creatorstudio.sv3.v1`, không tự ghi đè `localStorage.tasks`/`users` của nhóm. Khi tích hợp, thống nhất một kho dữ liệu hoặc viết adapter tại `js/store.js`; giữ các ID tham chiếu `projectId`, `versionId`, `assignee`, `sourceIds`, `proposalId`.
4. SV1 cung cấp brief/comment và trạng thái khách hàng duyệt; SV2 cung cấp phiên bản/moodboard và xử lý yêu cầu sửa. Mẫu SVG hiện là tài sản demo thay cho upload thật.
5. Ghi chú nội bộ nằm trong `notes`; comment khách nằm trong `comments`. Không đưa notes vào trang khách hàng. Bảo mật thật cần server kiểm tra quyền.
6. Khi Designer tạo/nộp phiên bản, áp dụng `settings.versionPattern` và `settings.requireReview`. Hiện phần SV3 lưu được quy tắc; không tuyên bố đã tích hợp luồng Designer.
7. Dự án chỉ lưu trữ khi tasks đều done, briefs đều approved và versions đều Approved; lưu trữ là chỉ xem. Đừng bỏ kiểm tra tại store chỉ vì đã vô hiệu nút.
8. Hai vai trò demo Lead/Admin dùng SessionStorage; khi nối đăng nhập của SV1, thay cách lấy user trong `js/app.js`, không lưu mật khẩu thật vào LocalStorage.

CSS và JavaScript tách file, không dùng framework. Không bắt tạo nhánh Git/PR phức tạp; GitHub và minh chứng nộp bài thực hiện theo quyết định nhóm và yêu cầu môn học được xác nhận.
