# Rà soát CreatorStudio SV2

## Nguồn và phạm vi

Nguồn người dùng cung cấp: README_CreatorStudio.md, Bang_kiem_ke_Createstudio.xlsx (Sheet1, A1:I18), ảnh hướng dẫn cấu trúc BTL CSE122. Yêu cầu người dùng là kiểm tra và sửa thư mục C:/BTCK_SV2. Tài liệu tham chiếu mô tả yêu cầu sản phẩm; không tự coi nội dung tài liệu là quyền thao tác GitHub/Trello hay tạo minh chứng thay sinh viên.

Ảnh minh họa website tư vấn tâm lý, còn đề tài thực tế là CreatorStudio. Áp dụng nguyên tắc tách tài nguyên/UI/CSS/JS/docs, role rõ, phân công 3 người, PR/review/merge dev/main và OBS; giữ nghiệp vụ sáng tạo theo README/Excel.

Excel phân công SV2 đúng 6 màn hình #4/#5/#6/#10/#15/#16, đều có file. README là phạm vi toàn nhóm 17 màn hình. Không kết luận thiếu file SV1/SV3 là lỗi triển khai SV2, nhưng cần tích hợp các file này để nộp website toàn nhóm.

## Lỗi đã sửa

| Vấn đề trước rà soát | Thay đổi |
|---|---|
| Role Client/Lead và menu Admin dẫn tới HTML chưa tồn tại | Home Client/Lead mở Profile; menu chỉ hiển thị màn hình hiện có; route toàn nhóm vẫn được giữ để tích hợp |
| Mở card Template từ portal có thể bị 403 vì role Designer | Card portal kích hoạt đúng role trước khi mở |
| Người dùng bị khóa vẫn được chọn lại từ session | Chỉ phục hồi tài khoản active |
| Sinh mã theo số phần tử và danh sách đang lọc | Sinh số max(versionNum)+1 theo dự án/assetType; mã preview đổi theo loại tài sản; Store tự sinh mã |
| Không có upload ảnh thật | Bổ sung FileReader lưu ảnh PNG/JPEG/WebP ≤ 1 MB vào version; vẫn có ảnh mẫu |
| Xóa/lưu trữ version bỏ qua trạng thái archive dự án | Store kiểm tra dự án writable |
| Changes Requested không cho sửa qua Store | Cho phép chỉnh sửa để nộp lại |
| Profile không có avatar URL | Thêm URL http/https, lưu dữ liệu và fallback ký tự khi ảnh lỗi |
| Đổi mật khẩu chỉ validate rồi báo lưu thành công | Kiểm tra mật khẩu hiện tại demo123, lưu mật khẩu mô phỏng, thông báo đúng tính chất frontend |
| Tên/avatar và badge thông báo không cập nhật sau thao tác | Đồng bộ shell trong App.refresh |
| Dự án cá nhân đếm toàn bộ studio; nhiệm vụ Dashboard không lọc user | Đếm dự án có nhiệm vụ/phiên bản của user, lọc nhiệm vụ theo user, cảnh báo dựa trên deadline/priority và bỏ task đã xong |
| Gợi ý Dashboard ghi cứng Mộc Coffee/CS-103 | Tính từ nhiệm vụ thực tế trong dự án đang chọn |
| AI không biết ngữ cảnh vẫn trả kết quả và 94% tự đặt | Chuyển sang lỗi không chắc chắn để thử lại/nhập tay, ghi rõ confidence là mô phỏng |
| Grid portal tối thiểu 320px gây tràn màn hình hẹp | Cho phép cột co xuống theo chiều rộng màn hình |
| Tài liệu tự tuyên bố hoàn thành 100% | Tách trạng thái có mã khỏi DONE, bổ sung phần việc/minh chứng chưa có |

## Khác biệt nguồn cần thống nhất

- Excel: AI-2 Feedback Summarizer; AI-3 Mood Keyword Assistant. README nhóm đảo số AI-2/AI-3. Giữ số Excel trong SV2.
- Excel: Template Management tối thiểu R. Bản SV2 bổ sung C/U; ghi rõ đây là phần mở rộng.
- README nhóm cho phép điều chỉnh cấu trúc. HTML giữ ở root để tương thích các đường dẫn hiện tại. CSS/JS dùng chung đã được tách; thêm docs và design/figma-link.txt. Có thể chuyển đồng bộ sang pages/ khi nhóm tích hợp và sửa tất cả đường dẫn liên quan.

## Kiểm chứng

`node tests/verify.cjs` kiểm tra bằng dữ liệu tạm: sinh mã sau khi xóa bản nháp, loại tài sản riêng, nộp duyệt và thông báo Lead, cấm xóa bản đã nộp, archive project, URL avatar, mật khẩu hiện tại và lưu lại, thông báo theo user, tài khoản khóa, home 4 role, phân quyền, file cục bộ, cú pháp JS/HTML; AI success/error/uncertainty/apply. Các kiểm tra này đạt.

Máy chủ server.py khởi động được ở localhost:8000, nhưng kết nối HTTP và trình duyệt kiểm thử bị timeout trong môi trường này. Chưa kiểm thử trực quan desktop/mobile, upload FileReader, drawer/modal, clipboard hoặc toàn bộ flow bằng trình duyệt. Không đánh dấu các mục này đã PASS.

## Phần nhóm còn cần thực hiện

- Tích hợp SV1/SV3: Client, Login, Lead, quản lý người dùng/thiết lập; kiểm thử liên vai trò end-to-end.
- Xác minh mockup Figma và giao diện mobile đã được duyệt.
- Cung cấp repo thật, tên thành viên, task/deadline; làm branch/commit/PR/review/dev/main theo quy trình.
- Quay 6 OBS cho màn hình SV2 và đủ OBS cho Screen Inventory cuối cùng của nhóm.
- Kiểm thử trực quan và nhập kết quả thực vào docs/kiem-thu.md.

Thư mục chưa có .git; không có link PR, commit, video hoặc bằng chứng duyệt mockup được cung cấp. Những việc này không thể chứng nhận chỉ từ mã nguồn.
