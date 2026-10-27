> Khôi phục từ bản sao lưu ngày 25/10/2026. Nội dung dự thảo/lịch sử cần đối chiếu; số liệu hiện hành ưu tiên README gốc và evidence-index. Chưa xác nhận link Figma/Trello/deploy hoặc kết quả chưa chạy lại.

# Khai báo sử dụng AI — CreatorStudio dùng chung

## AI trong website

| Tính năng | Đầu vào | Kết quả | Người dùng kiểm soát | Cách triển khai |
|---|---|---|---|---|
| AI-1 Brief Structurer | Mô tả, ngân sách, hạn | Brief năm phần | Sửa/chấp nhận/bỏ/tạo lại, lưu/gửi | JavaScript theo quy tắc |
| AI-2 Feedback Summarizer | Các comment được chọn | Gợi ý việc cần làm, ưu tiên/lý do/nguồn | Làm rõ/sửa/bỏ, chọn người/hạn rồi tạo task | Module JavaScript mô phỏng |
| AI-3 Mood Keyword Assistant | Mô tả định hướng | Từ khóa và bảng màu | Sửa/chấp nhận/bỏ/tạo lại, áp dụng moodboard | Module JavaScript mô phỏng |

Cả ba là AI mô phỏng, không gọi LLM/API bên ngoài, không dùng khóa API và không gửi mô tả dự án ra dịch vụ AI. Loading dùng độ trễ giả lập. Cảnh báo thiếu dữ liệu/không chắc chắn giúp người dùng kiểm tra kết quả; không diễn giải nó là độ tin cậy của mô hình thật.

## AI hỗ trợ phát triển bài

Codex hỗ trợ theo yêu cầu người dùng: kiểm tra nguồn SV1/SV2/SV3 trên GitHub; ghép điều hướng và dữ liệu; viết/chỉnh HTML, CSS, JavaScript; sửa lỗi, chạy kiểm thử, tạo tài liệu và đóng gói phiên bản. Các yêu cầu thiết kế Landing gồm menu theo ảnh mẫu, giới thiệu chức năng, chân trang và kiểu chữ/màu phù hợp CreatorStudio.

Ví dụ yêu cầu chính: “làm tiếp phần SV3”, “xem sản phẩm SV1 và2 rồi tích hợp”, “menu bấm mở mục con như ảnh”, “thêm website có thể làm gì”, “cả nhóm đồng ý, hoàn thiện website”. Đây là mô tả yêu cầu thật trong cuộc trò chuyện, không phải prompt đã được sinh viên tự ghi trong báo cáo riêng.

Lỗi được phát hiện và sửa khi kiểm chứng: phân công người bị khóa, feedback nhầm phiên bản, route/Store riêng không liên thông, ảnh review cố định, responsive tràn ngang, mất focus khi tìm kiếm, cập nhật hồ sơ bị chặn do kiểm tra vai trò và thông báo mở sai dự án.

Kiểm chứng: đối chiếu mã nguồn, test Store/DOM, Chromium qua giao diện, ảnh desktop/mobile và kiểm tra phụ thuộc file. Kết quả trong docs/04-qa/ket-qua/qa-task27-v1, qa-final-v5; lịch sử yêu cầu/checklist trong TASK-27-INTEGRATION-v1.md.

Nhóm cần tự bổ sung phần thay đổi đã tự làm, điều từng sinh viên học được và video giải thích theo thực tế. Không coi code/tài liệu do AI hỗ trợ là bằng chứng sinh viên đã tự hiểu hoặc đã được giảng viên duyệt.
