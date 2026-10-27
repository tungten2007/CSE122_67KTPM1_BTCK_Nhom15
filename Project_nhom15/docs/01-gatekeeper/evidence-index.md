# Chỉ mục minh chứng hiện hành

Đối chiếu ngày 26/10/2026, mã nguồn cơ sở cc9a38d trên dev và feature/sv3. Tài liệu được cập nhật sau các lượt chạy dưới đây. Không dùng báo cáo lịch sử để kết luận toàn bộ bài đã đạt.

## Kiểm thử đã chạy

| Phạm vi | Chương trình | Kết quả | Bằng chứng |
|---|---|---|---|
| Tài khoản, hồ sơ, mật khẩu, điều hướng; 320/390/1440px | browser-final-v5.cjs | 24 kiểm tra | [JSON](../qa-integration-current/accounts/result.json) |
| Vai trò, duyệt phiên bản, bố cục; 320/390/1440px | browser-task27.cjs | 57 kiểm tra | [JSON](../qa-integration-current/roles/result.json) |
| Người dùng, tìm kiếm @, vị trí con trỏ, phân trang, hủy/xóa task, responsive | browser-sv3-p1.cjs | 6 nhóm | [JSON](../qa-sv3-p1/result.json) |
| Mẫu brief và AI-1, xóa/guard, empty, mobile | browser-ai1-template.cjs | 6 nhóm | [JSON](../qa-ai1-template/result.json) |
| Nghiệp vụ và hồi quy Node | 11 tệp *.test.cjs | 11/11 tệp đạt; store 17 nhóm | [Bộ tests](../../tests/) và [ghi chú lần chạy](../THAY-DOI-V2.md) |
| Tài nguyên gói | check_bundle.py | Đạt | [Mã kiểm tra](../../check_bundle.py) |

Trình duyệt Edge dùng phiên LocalStorage riêng; không đặt lại dữ liệu của người dùng. Lượt chạy lại SV3 P1 ngày 26/10 cũng đạt 6 nhóm, ảnh/kết quả tạm nằm ngoài repo trong creatorstudio-sv3-p1.

Giới hạn: browser-task27 tạo/nộp phiên bản qua Store để dựng dữ liệu Designer, rồi duyệt Lead/Client qua UI. Chưa phải bằng chứng tạo/nộp phiên bản hoàn toàn bằng UI Designer. Kiểm tra bố cục ở các độ rộng trên không thay thế audit accessibility hoặc thử trên mọi thiết bị. Bộ ảnh mới 39 PNG đã lưu trong [qa-web-current](../qa-web-current/README.md); các ảnh QA cũ khác vẫn có thể chỉ lưu local.

## Gatekeeper và phần còn thiếu

| Hạng mục | Hiện có | Chưa đủ bằng chứng |
|---|---|---|
| Kiểm kê, luồng, thiết kế | [18 màn/12 cột](screen-inventory.md), [user flow](user-flow.md), [design system](design-system.md) | Figma hiện hành, prototype, trạng thái, xuất ảnh và phê duyệt; [audit khôi phục](figma-audit.md) chỉ là lịch sử |
| Git | dev và feature/sv3 là quy trình đang dùng; ghi chú thay đổi theo từng đợt | Review/PR, đóng góp cả ba SV và bản main phải đối chiếu riêng; không suy từ branch hiện tại |
| Website public | [Checklist deploy](../02-quy-trinh/deploy.md) | Chưa xác minh URL public hay workflow deploy |
| Video | [Kịch bản chuẩn bị](../02-quy-trinh/obs-plan.md) | Hoãn quay theo yêu cầu người dùng; chưa đánh dấu hoàn thành |
| Khai báo AI | [Báo cáo khôi phục](../03-ai/ai-usage-report.md), [nhật ký](../03-ai/ai-prompt-log.md) | Mỗi SV tự xác nhận prompt, phần tự làm và cách kiểm chứng thật |
| Quy trình nhóm | [Hướng dẫn Trello](../02-quy-trinh/trello-setup.md) | Board/thẻ, người phụ trách, link review và bằng chứng thật |
| Chất lượng | Các bộ kiểm tra cụ thể phía trên | W3C/axe/Lighthouse, module danh sách dùng chung và ảnh đủ phạm vi theo kế hoạch |

Không đánh dấu toàn bộ tiêu chí hoặc gatekeeper đạt chỉ dựa vào các bộ kiểm thử này. Các báo cáo QA cũ trong docs giữ giá trị lịch sử theo ngày ghi trong từng file.

## Audit bổ sung sau a2da7b3

[19 lượt xem/8 độ rộng và 39 ảnh](../qa-web-current/README.md): không còn phát hiện trong phạm vi DOM/tràn ngang/tương phản nền đơn sắc. Còn 26 lượt phần tử nền ảnh/gradient chưa đo; chưa thay thế axe/W3C/Lighthouse.

## Axe bổ sung sau 963fc6c

[44 lượt trang/modal](../qa-axe-current/README.md): 0 vi phạm tự động, 118 lượt phần tử incomplete. Giới hạn preload và kiểm tra thủ công ghi trong báo cáo; chưa xác nhận toàn bộ WCAG.
