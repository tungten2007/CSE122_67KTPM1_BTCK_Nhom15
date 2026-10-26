# Báo cáo sử dụng AI — phần SV1

## Công cụ và yêu cầu

Sử dụng ChatGPT/Codex để sinh và chỉnh sửa phần frontend dựa trên các tài liệu người dùng cung cấp: README, bảng phân công Excel, sitemap/user flow trước đó và bản xuất Trello mới.

Yêu cầu chính: “từ các yêu cầu và mô tả được đưa ra trong các tệp được đính kèm hãy gen cho tôi các giao diện và phần việc được giao của sv1”. Yêu cầu trước đó có tách HTML, CSS và JavaScript.

## Phần AI sinh

- 5 bộ HTML/CSS/JS, các design token và thành phần dùng chung.
- Bộ minh họa SVG, JSON mẫu và quy trình lưu state.
- Brief Structurer theo quy tắc, CRUD dự án, review phiên bản/pin comment.
- Kiểm tra Playwright, tài liệu đối chiếu và SVG wireframe/UI Kit.

Không ghi các file sinh tự động này là công sức chỉnh sửa đã được sinh viên thực hiện. Sinh viên cần điền thông tin dưới đây sau khi tự kiểm tra và chỉnh sửa.

| Mục cần sinh viên khai báo   | Nội dung                                  |
| ---------------------------- | ----------------------------------------- |
| Họ tên/người thực hiện       | Chưa được cung cấp                        |
| File và đoạn đã tự chỉnh sửa | Chưa được xác nhận                        |
| Kiến thức đã học được        | Sinh viên tự điền sau khi đọc và chạy thử |
| Commit/PR do sinh viên tạo   | Sinh viên bổ sung                         |
| Video OBS có mặt sinh viên   | Sinh viên bổ sung                         |

## Tính năng mock và API

- AI-1 Brief Structurer là mock dùng từ khóa và loại dự án. Không có LLM API thật.
- Đầu vào trên 20 ký tự; có thời gian processing, kết quả 5 phần và phần giải thích. Thông tin thiếu như đối tượng/ngân sách được cảnh báo.
- Người dùng có thể sửa, chấp nhận, từ chối, tạo lại hoặc tự viết. Chấp nhận lưu brief vào LocalStorage; gửi brief ảnh hưởng tiến độ và hiển thị ở Project Overview.
- Ngân sách từ câu mô tả rõ như “ngân sách 20 triệu” được nhận diện theo quy tắc, cần kiểm tra lại con số.
- Login, thông báo, phiên bản, moodboard và dữ liệu CRUD đều là prototype cục bộ. API thật, đa người dùng và luồng SV2/SV3 chưa có trong bộ SV1.

README mới và Excel dùng AI-2 cho Feedback Summarizer, AI-3 cho Mood Keyword Assistant. Bộ SV1 chỉ triển khai AI-1.

## Kiểm chứng và giới hạn

Đã kiểm tra trình duyệt các luồng Client qua `tests/sv1.e2e.cjs`: đầu vào hợp lệ/không hợp lệ, state lưu sau reload, kết quả cần người dùng xác nhận, CRUD, review và responsive. Có kiểm tra JSON bị lỗi và phục hồi bằng Retry.

Kết quả mô phỏng không hiểu đầy đủ ngữ nghĩa, không tự xác minh yêu cầu kinh doanh và không đảm bảo mọi cách viết ngân sách đều được nhận diện. Dữ liệu mẫu và artwork chỉ để trình diễn. Sinh viên phải đọc lại mã, sửa theo mockup được nhóm duyệt và trình bày được logic trong OBS/bảo vệ.
