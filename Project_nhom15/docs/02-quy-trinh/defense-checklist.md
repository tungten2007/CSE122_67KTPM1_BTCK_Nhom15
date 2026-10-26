> Khôi phục từ bản sao lưu ngày 25/10/2026. Nội dung dự thảo/lịch sử cần đối chiếu; số liệu hiện hành ưu tiên README gốc và evidence-index. Chưa xác nhận link Figma/Trello/deploy hoặc kết quả chưa chạy lại.

# Checklist trước giờ bảo vệ

Mục tiêu: mở đúng 6 tab, đúng nhánh, đúng tài khoản; không mất thời gian tìm file khi giảng viên hỏi hoặc yêu cầu sửa live.

## 1. Chuẩn bị 6 tab (mở theo thứ tự)

| Tab | Nội dung | Kiểm tra |
|---|---|---|
| 1 | Website public (GitHub Pages) | Mở ẩn danh được, đúng commit mới nhất |
| 2 | Website local `http://127.0.0.1:8000/index.html` | `python server.py 8000 --open` đang chạy; dữ liệu mẫu đã reset |
| 3 | Figma/Canva | Đúng file, frame Task Board + 6 màn SV3, quyền xem public |
| 4 | Trello board | Public, đủ 29 thẻ, thẻ Done có minh chứng |
| 5 | GitHub | Repo, PR #2/#3/#8, tab Insights/commits, đúng tài khoản |
| 6 | Thư mục OBS | 18 video (hoặc danh sách đã quay), mở được bằng link public |

Tab dự phòng: [evidence-index.md](../01-gatekeeper/evidence-index.md), [demo-script.md](demo-script.md), ảnh chụp `docs/04-qa/anh-web/`, file ZIP bàn giao.

## 2. VS Code và Terminal

- Mở đúng thư mục gốc `CreatorStudio-Task27-Integration-v12-MultiUserRoles`, không mở nhầm thư mục ZIP.
- Mở sẵn các tệp sẽ bị hỏi:
  - `Project_nhom15/js/shared/store.js`
  - `Project_nhom15/js/shared/modules/navigation.js`
  - `Project_nhom15/js/sv1/client-creative-brief.js`
  - `Project_nhom15/js/sv3/pages/lead-task-board.js`
  - `Project_nhom15/js/sv3/pages/lead-internal-review.js`
  - `Project_nhom15/js/sv3/pages/lead-feedback-summary.js`
  - `Project_nhom15/js/sv3/pages/admin-user-management.js`
  - `Project_nhom15/js/sv3/modules/ai-feedback-summarizer.js`
  - `Project_nhom15/js/sv2/modules/ai-mood-assistant.js`
  - `Project_nhom15/js/shared/client-store-adapter.js`
- Terminal 1: `git status`, `git branch --show-current`, `git log --oneline -5`.
- Terminal 2: sẵn sàng `node tests/store.test.cjs` và `node tests/task27-integration.cjs`.
- Nếu máy chưa có Node, mở sẵn kết quả test trong `docs/04-qa/lich-su/ket-qua-test.txt` / `docs/04-qa/ket-qua/qa-*/result.json` và nói rõ môi trường.

## 3. Tài khoản và dữ liệu

- [ ] Bốn tài khoản demo đăng nhập được: `khanhchi@example.com`, `annguyen@example.com`, `linhha@example.com`, `minhanh@example.com` / `demo123`.
- [ ] Đã **Đặt lại dữ liệu mẫu**: Mộc Coffee, brief submitted, v3 Internal Review, 3 phản hồi.
- [ ] Đã thử F5: dữ liệu còn; không có tab nào dùng LocalStorage cũ gây lệch.
- [ ] Đã xuất JSON dự phòng (Công cụ demo → Xuất dữ liệu) vào USB/ổ ngoài; biết rằng bản hiện tại **chưa có nhập JSON**.
- [ ] Không có mật khẩu thật/khóa API trong repo hoặc trong ảnh chụp.

## 4. Trước khi vào phòng 30 phút

- [ ] Sạc 3 máy; mang sạc, cáp HDMI/USB-C, chuột.
- [ ] Kiểm tra mạng phòng thi; chuẩn bị hotspot điện thoại.
- [ ] Chạy `git status`: không có thay đổi chưa commit trong phần sẽ demo (hoặc biết rõ thay đổi nào đang có).
- [ ] Chạy lại 2 test nhanh; ghi kết quả.
- [ ] Mở sẵn 6 tab; khóa màn hình máy khi rời chỗ.
- [ ] Đồng hồ/bấm giờ để sẵn; phân công người bấm giờ.
- [ ] Mỗi SV mở sẵn phần code mình phụ trách; không mở tab AI/chat.
- [ ] Tắt thông báo Windows/Mac, email, Discord, Zalo.
- [ ] Kiểm tra webcam/ánh sáng nếu buổi bảo vệ có ghi hình.

## 5. Khi giảng viên yêu cầu live modification

1. Nghe hết đề, nhắc lại 1 câu để xác nhận.
2. Mở đúng file bằng `Ctrl+P`, tìm hàm/khối theo tên.
3. Nêu cách làm trong 15 giây trước khi sửa.
4. Sửa nhỏ nhất có thể; lưu; reload; chỉ kết quả.
5. Chạy `git diff` để chứng minh thay đổi.
6. Nếu lỗi: đọc Console, nêu nguyên nhân, sửa hoặc hoàn lại bằng `Ctrl+Z`; không hoảng.
7. Không dùng AI/chat trong 10 phút live modification; chỉ tra MDN/Bootstrap docs nếu được phép.

## 6. Câu hỏi hậu kiểm

- [ ] Ai phụ trách màn nào? Mở đúng file và chỉ đúng hàm.
- [ ] Dữ liệu đi từ đâu đến đâu? Chỉ `Store`/`client-store-adapter` và khóa `creatorstudio.team.v1`.
- [ ] Vì sao dùng LocalStorage? Nêu giới hạn demo, không có backend.
- [ ] AI nào là thật? Trả lời: cả ba là mô phỏng bằng quy tắc, không gọi LLM/API.
- [ ] Vì sao Figma mới 6/18? Trả lời đúng trạng thái, không nhận đủ.
- [ ] Vì sao PR #2/#3 còn mở? Trả lời theo GitHub thực tế, không đổ lỗi.
- [ ] Đóng góp của bạn là gì? Chỉ commit/PR cụ thể; không đọc thành tích chung.

## 7. Nếu sự cố

| Sự cố | Làm ngay |
|---|---|
| Deploy 404 | Chuyển tab local; nói rõ URL public đang lỗi |
| LocalStorage lỗi | Reset mẫu; nếu vẫn lỗi, mở profile trình duyệt mới |
| Mất mạng | Dùng local; AI mô phỏng vẫn chạy; không cần API |
| Node không chạy | Dùng kết quả test đã lưu; không cài phần mềm mới |
| Quên code | Mở đúng file, đọc tên hàm; thành thật nếu không nhớ |
| Hết giờ demo | Bỏ phần admin, giữ luồng brief → task → AI-2 → F5 |

## 8. Không được làm

- Tạo commit/PR/review giả ngay trước giờ chấm.
- Sửa dữ liệu LocalStorage bằng tay để “che” lỗi.
- Nhận là đã deploy/đã quay/đã duyệt Figma khi chưa có.
- Dùng AI để trả lời vấn đáp hoặc live modification.
- Mở tài liệu cá nhân, email, mạng xã hội trên máy demo.
