# QA thiết kế SV3 — 12/10/2026

## Kết quả

**Chưa đạt. TASK-03/TASK-04 phần SV3: 🔴 Có lỗi.** Chưa có phê duyệt nhóm/giảng viên.

Đã tạo UI Kit root `70:15` trên page `0:1` và 6 frame desktop + 6 mobile có text editable, SVG native và component instance. Tài sản chung cũ được giữ nguyên. Link tại `../figma-canva/README.md`.

## Lỗi và sửa

| Hạng mục | Bằng chứng | Kết quả |
|---|---|---|
| Desktop Task Board/Internal Review | Screenshot ban đầu có chồng chữ do container ngang height40 và text sizing NONE | Đã áp dụng sửa auto-size/font load; chưa chụp ảnh QA lại |
| Text UI Kit bổ sung | Cùng nhóm text sizing cần điều chỉnh | Đã sửa; chưa QA ảnh sau sửa |
| Mobile | Lỗi chồng chữ chưa khắc phục | Lệnh sửa bị Figma MCP từ chối vì rate limit; vẫn còn lỗi |
| Figma API | Rate limit gói Starter trong phiên | Không thể hoàn tất sửa/QA/export trong phiên này |

Không ghi PASS khi chỉ có lệnh chỉnh sửa thành công; không tuyên bố mobile đã sửa.

## Còn phải làm

1. Sửa text/container mobile rồi xuất ảnh và kiểm tra cả 12 frame.
2. QA lại desktop và kit sau sửa, kiểm tra tràn/chồng chữ, spacing, font, card/form/button.
3. Bổ sung wireframe SV3 riêng; rà lại phạm vi TASK-03 phần SV3.
4. Bổ sung trạng thái AI input/loading/output/explanation/edit/reject/error và prototype theo checklist.
5. Xuất tài sản cần bàn giao sau QA. Hiện chưa tạo SVG/PNG export.
6. Review phần SV3 cùng nhóm; không thay trạng thái duyệt của toàn task nhóm.

## Đồng bộ website

Đã đồng bộ token màu và bundle Inter variable cục bộ trong `assets/fonts/`, kèm OFL và nguồn. Giữ kích thước bố cục/chức năng website. 7 bộ test kỹ thuật frontend đạt và root đã chạy lại ngày 11/10. Chưa có QA ảnh trình duyệt nên không xác nhận website khớp hoàn toàn Figma. UI Kit yêu cầu desktop 1640/sidebar260/header84/H1 40px line-height48; bản SV3 cần QA lại typography; website giữ sidebar236/header74/H1 30px line-height37.5. Chỉ đồng bộ font và màu, chưa khớp từng pixel. Text SVG minh họa desktop đã sửa WIDTH_AND_HEIGHT; chưa QA ảnh cuối.

Cập nhật 12/10/2026: đọc Figma hoạt động nhưng lệnh chỉnh sửa vẫn bị rate limit. Chưa có sửa Figma mới hoặc export; các lỗi/giới hạn QA nêu trên vẫn còn.

Ngày 12/10/2026: thử tiếp tục sửa mobile và lấy screenshot; Figma MCP vẫn trả rate limit Starter. Không có chỉnh sửa canvas mới trong lần thử này.

## Cập nhật website — 25/10/2026

- Đã đổi viền focus bàn phím trong bộ giao diện SV1/SV3 và SV2 từ tím nhạt `#a8a2ff` sang chàm đậm `#4338ca`, giúp chỉ báo focus dễ nhận ra hơn trên nền sáng.
- Đây là chỉnh sửa CSS mã nguồn; chưa chạy lại sweep Chromium hay kiểm tra 200% zoom trong lần cập nhật này.
- Figma MCP tiếp tục từ chối yêu cầu chụp frame vì đạt giới hạn Starter. Vì vậy lỗi chồng chữ mobile trong các frame Figma, QA ảnh cuối, wireframe và trạng thái/prototype AI vẫn chưa được khắc phục hoặc xác nhận.