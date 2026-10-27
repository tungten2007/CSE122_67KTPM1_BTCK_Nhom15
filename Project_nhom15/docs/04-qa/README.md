# Báo cáo và ảnh QA

## Bộ minh chứng được giữ

| Phạm vi | Báo cáo |
|---|---|
| Giao diện, tương phản nền đơn sắc, bố cục và bộ ảnh web | [web](web/README.md) |
| Accessibility bằng axe | [accessibility](accessibility/README.md) |
| Tài khoản/hồ sơ | [integration/accounts/result.json](integration/accounts/result.json) |
| Tích hợp vai trò/bố cục | [integration/roles/result.json](integration/roles/result.json) |
| Danh sách người dùng, tìm kiếm, hủy/xóa task SV3 | [sv3/result.json](sv3/result.json) |
| Mẫu brief và AI-1 | [ai1/result.json](ai1/result.json) |
| Tích hợp SV2 ngày 27/10 | [sv2-integration](sv2-integration/) |
| Giao diện và accessibility SV2 ngày 27/10 | [sv2-theme](sv2-theme/README.md) |

Mỗi bộ thuộc mã nguồn/ngày chạy của riêng nó; các báo cáo ngày 26/10 không tự xác nhận thay đổi sau đó đã được kiểm thử. Các phát hiện incomplete và giới hạn giữ nguyên trong JSON/README.

## Minh chứng lịch sử có phạm vi riêng

- [Lead và duyệt nội bộ](lich-su/lead-review.md), [kết quả](lich-su/lead-review/result.json).
- [Tổng hợp phản hồi AI-2](lich-su/feedback-ai2.md), [kết quả](lich-su/feedback-ai2/result.json), [tình huống AI lỗi](lich-su/feedback-ai2/task17-ai-error.png).
- [Admin và trang lỗi](lich-su/admin-errors.md), [kết quả](lich-su/admin-errors/result.json), [routing](lich-su/admin-errors/server-routing.json).
- [Nhiều tài khoản](lich-su/multi-user/result.json), [điều hướng](lich-su/navigation/result.json).

Các báo cáo này giữ thông tin chức năng riêng; ảnh mặc định trùng phạm vi bộ web mới đã bỏ. Các bộ qa-final-v5, qa-task27-v1, qa-responsive-sv3 và qa-navigation-v10 đã được loại khỏi cây tài liệu.

Quay lại [docs](../README.md).
