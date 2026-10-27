> Khôi phục từ bản sao lưu ngày 25/10/2026. Nội dung dự thảo/lịch sử cần đối chiếu; số liệu hiện hành ưu tiên README gốc và evidence-index. Chưa xác nhận link Figma/Trello/deploy hoặc kết quả chưa chạy lại.

# 20 mục tự kiểm trước giờ chấm

Đánh dấu `☑` chỉ khi đã kiểm tra thật và minh chứng mở được. Cột “Hiện trạng” phản ánh ngày **25/10/2026**; cập nhật lại sau mỗi đợt.

| # | Mục | Cách kiểm | Minh chứng | Người | Hiện trạng |
|---|---|---|---|---|---|
| 1 | 5 gatekeeper đã ánh xạ | Mở [evidence-index.md](../01-gatekeeper/evidence-index.md), đối chiếu từng dòng | Evidence index + link thật | Nhóm | 🟡 2 mục ❌ (deploy, OBS), 3 mục 🟡 (Figma, Git, prompt log) |
| 2 | Kiểm kê 18 màn đủ 12 cột + user flow | Mở [screen-inventory.md](../screen-inventory.md), [user-flow.md](../01-gatekeeper/user-flow.md); đếm 18 dòng | Hai tài liệu + sitemap Mermaid | Nhóm | ✅ tài liệu có; chờ nhóm duyệt |
| 3 | Figma đủ 18 màn desktop/mobile + trạng thái + prototype + export | Mở file Figma; đếm frame; xem prototype; mở thư mục export | [figma-audit.md](../01-gatekeeper/figma-audit.md) + link public | Nhóm (SV3 6 màn) | ❌ 6/18, 0 prototype/export |
| 4 | Git: `main`, `dev`, nhánh feature; commit/PR cả 3 SV; review/merge/tag | `git ls-remote`, GitHub PR/Insights; kiểm tra tác giả | Repo + PR #1–#8 | SV1/SV2/SV3 | 🟡 #2/#3/#8 còn mở, chưa tag |
| 5 | Deploy public, mở ẩn danh | Mở URL trên điện thoại/ẩn danh; hard reload | URL + ảnh có thanh địa chỉ | Nhóm | ❌ chưa bật Pages |
| 6 | 18 video OBS có webcam + thuyết minh + code + live + commit | Mở từng video; đếm 18; kiểm tra tiếng/hình | [obs-plan.md](obs-plan.md) + thư mục video | SV1/SV2/SV3 | ❌ 0/18 |
| 7 | Trello public đủ 29 thẻ, thẻ Done có minh chứng | Mở board ẩn danh; đếm thẻ; mở attachment | [trello-setup.md](trello-setup.md) + link board | Nhóm | ❌ chưa có board public |
| 8 | README đủ 15 mục, không còn thông tin cũ | Đếm mục 1–15; tìm `creatorstudio.sv3.v1`, “login chưa tích hợp” | [README.md](../../../README.md) | Nhóm | ✅ 15 mục; rà lại trước nộp |
| 9 | AI report trung thực + prompt log từng SV | Đọc 3 AI; kiểm tra prompt thật, không có prompt bịa | [ai-usage-report.md](../03-ai/ai-usage-report.md), [ai-prompt-log.md](../03-ai/ai-prompt-log.md) | Cả nhóm | 🟡 log SV còn trống |
| 10 | Task ID/nhánh/OBS khớp giữa inventory, OBS plan, Trello | Đối chiếu 18 dòng 3 tài liệu | Inventory, OBS plan, CSV | Nhóm | ✅ khớp; cập nhật nếu đổi nhánh |
| 11 | Danh sách có search debounce + ≥2 lọc + sort + reset + đếm + phân trang | Thử bảng công việc và người dùng | `tests/list-tools.test.cjs`, `browser-task27`, `browser-admin-errors` | SV3 | ✅ task board + admin users: debounce 280 ms, 2 lọc, sort, reset, đếm X/Y, phân trang/tải thêm |
| 12 | CRUD đủ: tạo/đọc/sửa/xóa/hủy/khóa/lưu trữ hợp lý | Thử từng entity; kiểm tra chặn xóa dữ liệu liên kết | `tests/store.test.cjs` 19 nhóm, `browser-admin-errors` | SV1/SV2/SV3 | ✅ Cancelled + hủy/xóa task; xóa user/mẫu brief có guard; khóa/mở khóa; lưu trữ dự án |
| 13 | 3 AI đủ 6 bước + failure UX + lưu kết quả | Thử AI-1/2/3; bật failure; F5 | [ai-usage-report.md](../03-ai/ai-usage-report.md), `browser-ai1-template` 5/5 | SV1/SV2/SV3 | ✅ AI-1 đọc mẫu Active, failure &lt; 21 ký tự; AI-2/3 có failure + thử lại; lưu vào Store |
| 14 | Validation inline + disable submit + escape XSS | Gửi form thiếu/sai; nhập `<script>`; bấm đúp | Test browser + ảnh | SV1/SV2/SV3 | ✅ form chính đã thống nhất lỗi inline/`aria-describedby`, chặn submit lặp; còn form phụ cần rà tay |
| 15 | A11y: alt/label/focus/Esc/contrast ≥ 4.5:1 | Tab 5–6 lần; Esc; axe/Lighthouse; đo contrast | QA-WEB-AUDIT-2026-10-25.md (nguồn chưa có trong bản hiện hành: ../04-qa/bao-cao/QA-WEB-AUDIT-2026-10-25.md), `qa-web-audit/report.json` | Nhóm | 🟡 0 vi phạm đo được, nhưng 28 node nền gradient chưa đo và chưa chạy axe/Lighthouse |
| 16 | 403/404 đúng vai trò, không lộ dữ liệu | Mở URL lạ, `?code=403`, 4 vai trò | `browser-admin-errors` 12/12 | SV3 | ✅ đã kiểm 25/10/2026 |
| 17 | Test Node + browser + W3C | Chạy 12 test Node, 8 browser; validator 20 HTML | `tests/*`, `docs/04-qa/ket-qua/qa-web-audit/report.json` | Nhóm | 🟡 Node 12/12 + browser 8/8; **W3C Validator chưa chạy** |
| 18 | Responsive 320–1440 + zoom 200% không tràn | DevTools từng width; zoom 200%; ảnh | `qa-web-audit/report.json`, `docs/04-qa/anh-web/` | SV1/SV2/SV3 | ✅ 18 màn × 320/375/720/768/1024/1280/1440: 0 tràn ngang; 720px là proxy cho zoom 200% |
| 19 | 18 ảnh web thật + ảnh Figma tách thư mục | Đếm ảnh; kiểm tra tên file/ngày | `docs/04-qa/anh-web` (76 ảnh), `.../figma` | Nhóm | 🟡 web ✅ 76 ảnh/19 màn × 4 kích thước; Figma ❌ chưa export |
| 20 | Demo 6 phút + live modification + vấn đáp + đóng băng + backup | Bấm giờ 3 lần; bốc 6 đề; hỏi 4 câu/SV; tag bản đóng băng | [demo-script.md](demo-script.md), [live-modification-training.md](live-modification-training.md), [viva-qa.md](viva-qa.md) | Cả nhóm | ❌ chưa tập đủ |

## Quy tắc

- Mục nào chưa có link thật thì giữ 🟡/❌; không đổi thành ✅ để “cho đủ”.
- Mỗi lần cập nhật, ghi ngày và người kiểm vào [evidence-index.md](../01-gatekeeper/evidence-index.md).
- Trước giờ chấm 24–48 giờ: đóng băng code; chỉ sửa lỗi chặn demo.
- Mục 1–7 là gatekeeper; thiếu một mục có thể không được bảo vệ dù code chạy tốt.
