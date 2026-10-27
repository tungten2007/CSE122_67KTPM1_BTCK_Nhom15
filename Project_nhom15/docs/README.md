# Tài liệu CreatorStudio — Nhóm 15

**Bắt đầu tại [Screen Inventory chung của cả 3 sinh viên](screen-inventory.md).** Bảng được chia theo SV1/SV2/SV3, đủ 12 cột và dùng tên nhánh hiện tại.

## Tài liệu được sắp theo mục đích

| Nhóm | Nơi lưu / tài liệu | Nội dung |
|---|---|---|
| Kiểm kê màn hình | [screen-inventory.md](screen-inventory.md) | Bản chính duy nhất: role, mục tiêu, thao tác, màn hình, file, CRUD, trạng thái, AI, phân công, task, nhánh, OBS |
| Phân tích và thiết kế | [01-gatekeeper](01-gatekeeper/README.md) | Luồng người dùng, design system, Figma và chỉ mục minh chứng |
| Hướng dẫn và quy trình | [02-quy-trinh](02-quy-trinh/) | Demo, bảo vệ, triển khai, Trello; kịch bản OBS chỉ để chuẩn bị, chưa quay |
| Khai báo AI | [03-ai](03-ai/) | Báo cáo và nhật ký dùng AI; từng sinh viên xác nhận phần sử dụng thật |
| Phân công và tiến độ | [team-assignment](team-assignment.md), [TIEN-DO-SV3](TIEN-DO-SV3.md) | Phần việc của nhóm và tiến độ ghi nhận |
| Hồ sơ sinh viên | [submission-sv1](submission-sv1/), [submission-sv2](submission-sv2/) | Tài liệu bàn giao riêng; phần SV3 xem tiến độ và tài liệu nhiệm vụ tại docs |
| Cấu trúc / cách chạy | [FILE-STRUCTURE](FILE-STRUCTURE.md), [README gốc](../../README.md) | Tổ chức mã nguồn và chạy website |
| Nhật ký thay đổi | [THAY-DOI-V2](THAY-DOI-V2.md) | Ghi chú theo từng đợt cập nhật |
| Nguồn yêu cầu | [reference](reference/) | Tài liệu tham khảo gốc |

## Báo cáo và ảnh QA

| Bộ minh chứng | Đường dẫn |
|---|---|
| Audit giao diện và bộ ảnh web | [qa-web-current](qa-web-current/README.md) |
| Accessibility bằng axe | [qa-axe-current](qa-axe-current/README.md) |
| Tài khoản / hồ sơ | [Kết quả](qa-integration-current/accounts/result.json) |
| Luồng vai trò / bố cục | [Kết quả](qa-integration-current/roles/result.json) |
| SV3: danh sách, tìm kiếm, hủy/xóa | [Kết quả](qa-sv3-p1/result.json) |
| Mẫu brief / AI-1 | [Kết quả](qa-ai1-template/result.json) |

Giữ nguyên vị trí các thư mục qa-* và các báo cáo TASK-*.md để không làm hỏng đường dẫn trong ảnh, script hoặc tài liệu lịch sử. Mỗi báo cáo chỉ có giá trị trong phạm vi và phiên bản được ghi tại đó; không đồng nghĩa bản mới nhất đã chạy lại.

## Quy tắc cập nhật

- Chỉ sửa bảng màn hình ở **screen-inventory.md**. Các tệp screen-list.md và 01-gatekeeper/screen-inventory.md giữ liên kết về bản chính để tránh lệch số liệu.
- Phản hồi khách hàng dùng cùng HTML với Duyệt phiên bản qua view=feedback; không đếm thành một tệp HTML mới.
- Nhánh hiện tại: feature/sv1-client, feature/sv2-designer, feature/sv3-admin. Tên nhánh trong báo cáo lịch sử có thể là tên cũ.
- Tài liệu dự thảo/lịch sử không thay thế link Figma, phê duyệt hoặc video thật. OBS tiếp tục hoãn theo yêu cầu.
