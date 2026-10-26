> Khôi phục từ bản sao lưu ngày 25/10/2026. Nội dung dự thảo/lịch sử cần đối chiếu; số liệu hiện hành ưu tiên README gốc và evidence-index. Chưa xác nhận link Figma/Trello/deploy hoặc kết quả chưa chạy lại.

# Kế hoạch quay OBS — 18 màn hình

Gatekeeper 4 yêu cầu **mỗi màn hình một video**, có webcam + thuyết minh, giải thích code, sửa live, responsive, commit/push và đọc Task ID/nhánh/commit. Tài liệu này là kế hoạch; **trạng thái hiện tại: 0/18 video**.

## 1. Nguyên tắc

- Một video = một màn hình. Không gộp 2 màn vào một video để “cho đủ số”.
- Thời lượng 2–4 phút; dài hơn chỉ khi giảng viên yêu cầu.
- Webcam bật suốt video (góc nhỏ), giọng nói rõ; không dùng nhạc nền át giọng.
- Quay đúng người phụ trách màn đó; mỗi SV giải thích phần mình làm. Nếu phần code do người khác tích hợp, ghi rõ và chỉ ra phần mình đã kiểm tra.
- Không hiện mật khẩu thật, khóa API, thông tin cá nhân, tab riêng tư.
- Video phải quay trên bản code đã commit; cuối video đọc Task ID, tên nhánh, commit hash.
- Figma: chỉ mở frame có thật. Màn chưa có frame thì nói rõ “Figma chưa có frame cho màn này” và ghi vào [figma-audit.md](../01-gatekeeper/figma-audit.md); không giả vờ đã thiết kế.

## 2. Phân công và trạng thái

| # | SV | Màn hình | Tệp chính | Task ID | Nhánh | Figma | OBS | Tên video gợi ý |
|---|---|---|---|---|---|---|---|---|
| 1 | SV1 | Project Overview | html/sv1/client-project-overview.html; js/sv1/client-project-overview.js | 08 | feature/sv1-creatorstudio | Chưa có frame | Chưa quay | `SV1_TASK-08_project-overview.mp4` |
| 2 | SV1 | Creative Brief + AI-1 | html/sv1/client-creative-brief.html; js/sv1/client-creative-brief.js | 06 | feature/sv1-creatorstudio | Chưa có frame | Chưa quay | `SV1_TASK-06_creative-brief-ai1.mp4` |
| 3 | SV1 | Review Versions | html/sv1/client-review-versions.html; js/sv1/client-review-versions.js | 07 | feature/sv1-creatorstudio | Chưa có frame | Chưa quay | `SV1_TASK-07_review-versions.mp4` |
| 4 | SV1 | Landing | index.html; js/sv1/index.js; css/sv1/index.css | 22 | feature/sv1-creatorstudio | Chưa có frame | Chưa quay | `SV1_TASK-22_landing.mp4` |
| 5 | SV1 | Login | html/sv1/login.html; js/sv1/login.js | 23 | feature/sv1-creatorstudio | Chưa có frame | Chưa quay | `SV1_TASK-23_login.mp4` |
| 6 | SV1 | Register | html/sv1/register.html; js/sv1/register.js | 23/27 | feature/task27-integration-v1 | Chưa có frame | Chưa quay | `SV1_TASK-27_register.mp4` |
| 7 | SV2 | Designer Dashboard | html/sv2/designer-dashboard.html; js/sv2/app-sv2.js | 10 | feature/sv2-creatorstudio-review | Chưa có frame | Chưa quay | `SV2_TASK-10_designer-dashboard.mp4` |
| 8 | SV2 | Moodboard + AI-3 | html/sv2/designer-moodboard.html; js/sv2/modules/ai-mood-assistant.js | 11 | feature/sv2-creatorstudio-review | Chưa có frame | Chưa quay | `SV2_TASK-11_moodboard-ai3.mp4` |
| 9 | SV2 | Version Management | html/sv2/designer-version-management.html; js/shared/store.js | 12 | feature/sv2-creatorstudio-review | Chưa có frame | Chưa quay | `SV2_TASK-12_version-management.mp4` |
| 10 | SV2 | Brief Template Management | html/sv2/admin-brief-template-management.html; js/sv2/app-sv2.js | 18 | feature/sv2-creatorstudio-review | Chưa có frame | Chưa quay | `SV2_TASK-18_brief-template.mp4` |
| 11 | SV2 | Profile | html/sv2/profile.html; js/sv2/app-sv2.js | 24 | feature/sv2-creatorstudio-review | Chưa có frame | Chưa quay | `SV2_TASK-24_profile.mp4` |
| 12 | SV2 | Notifications | html/sv2/notifications.html; js/sv2/app-sv2.js | 25 | feature/sv2-creatorstudio-review | Chưa có frame | Chưa quay | `SV2_TASK-25_notifications.mp4` |
| 13 | SV3 | Task Board | html/sv3/lead-task-board.html; js/sv3/pages/lead-task-board.js | 15 | feature/task29-final-evidence | Có frame, QA 🔴 | Chưa quay | `SV3_TASK-15_task-board.mp4` |
| 14 | SV3 | Internal Review | html/sv3/lead-internal-review.html; js/sv3/pages/lead-internal-review.js | 16 | feature/task29-final-evidence | Có frame, QA 🔴 | Chưa quay | `SV3_TASK-16_internal-review.mp4` |
| 15 | SV3 | Feedback Summary + AI-2 | html/sv3/lead-feedback-summary.html; js/sv3/pages/lead-feedback-summary.js | 17 | feature/task29-final-evidence | Có frame, QA 🔴 | Chưa quay | `SV3_TASK-17_feedback-ai2.mp4` |
| 16 | SV3 | User Management | html/sv3/admin-user-management.html; js/sv3/pages/admin-user-management.js | 19 | feature/task29-final-evidence | Có frame, QA 🔴 | Chưa quay | `SV3_TASK-19_user-management.mp4` |
| 17 | SV3 | Project Settings | html/sv3/admin-project-settings.html; js/sv3/pages/admin-project-settings.js | 20 | feature/task29-final-evidence | Có frame, QA 🔴 | Chưa quay | `SV3_TASK-20_project-settings.mp4` |
| 18 | SV3 | Lỗi 403/404 | html/sv3/404.html; js/sv3/pages/error.js | 26 | feature/task29-final-evidence | Có frame, QA 🔴 | Chưa quay | `SV3_TASK-26_error-403-404.mp4` |

Tổng: SV1 6, SV2 6, SV3 6. Trạng thái Figma lấy từ [figma-audit.md](../01-gatekeeper/figma-audit.md): 6/18 màn có frame desktop + mobile, tất cả đang có lỗi QA; 12/18 chưa có.

## 3. Chuẩn bị kỹ thuật

- OBS Studio: Scene gồm **Display Capture** + **Video Capture Device** (webcam), canvas 1920×1080, 30 fps.
- Micro: kiểm tra bằng bản ghi 20 giây; tránh tiếng quạt/micro chạm.
- Trình duyệt: cửa sổ riêng, zoom 100%, ẩn bookmark bar; tắt thông báo.
- VS Code: mở đúng thư mục `Project_nhom15`, đúng nhánh; font chữ đủ lớn (14–16px).
- Terminal: `git status`, `git log --oneline -3`, sẵn sàng `git diff`.
- Máy chủ: `python server.py 8000 --open` hoặc Live Server; đóng các tab không liên quan.
- Dữ liệu: reset mẫu trước khi quay; chuẩn bị dự án/brief/version cần dùng để không mất thời gian tạo.
- Mỗi video quay 2 lần: lần 1 nháp, lần 2 chính thức; giữ bản nháp trong thư mục riêng.

## 4. Cấu trúc 8 bước cho mỗi video

1. **Giới thiệu (15–20 giây):** họ tên, MSSV, vai trò trong nhóm, Task ID, tên màn hình, nhánh đang dùng.
2. **Figma (20–30 giây):** mở frame desktop/mobile nếu có; đối chiếu 1–2 điểm; nếu chưa có frame, nói rõ và chỉ sang [figma-audit.md](../01-gatekeeper/figma-audit.md).
3. **HTML (20–30 giây):** mở tệp, chỉ `header/nav/main/section/footer`, 1 `main`, 1 `h1`, các vùng form/bảng.
4. **CSS/JS (40–60 giây):** giải thích 1 hàm hoặc luồng dữ liệu quan trọng; chỉ dòng cụ thể, không đọc toàn bộ tệp.
5. **Sửa live (30–45 giây):** đổi một chi tiết nhỏ (chữ, màu, validation, thứ tự cột), lưu, reload, nêu trước/sau.
6. **Chạy + responsive + lỗi (30–45 giây):** thao tác chính; thu về 375px; mở Console kiểm tra không lỗi; thử một trường hợp lỗi/empty.
7. **Commit/push (20–30 giây):** `git status`, `git diff`, commit có message rõ; push lên nhánh cá nhân (nếu được phép) và chỉ commit hash.
8. **Kết (10–15 giây):** đọc lại Task ID, tên nhánh, commit hash; nêu minh chứng QA liên quan.

Tổng 2–4 phút. Không cần đọc từng dòng CSS.

## 5. Câu hỏi giảng viên có thể hỏi khi xem video

- Vì sao chọn cấu trúc HTML này? Phần nào là `main`?
- Dữ liệu từ đâu tới? Hàm nào ghi vào Store/LocalStorage?
- Nếu xóa một phần tử thì giao diện cập nhật thế nào?
- Trạng thái lỗi/empty được xử lý ở đâu?
- Thay đổi live có ảnh hưởng dữ liệu đã lưu không?
- Làm sao biết thay đổi này là của bạn? (commit/PR)

## 6. Nơi lưu và chia sẻ

- Thư mục gợi ý: `CreatorStudio-OBS-2026/` với 3 thư mục con `SV1`, `SV2`, `SV3`.
- Tên tệp theo bảng trên; không dùng tên `video1.mp4`.
- Tải lên Google Drive/YouTube Unlisted; đặt quyền **“Bất kỳ ai có liên kết đều xem được”** hoặc thêm email giảng viên.
- Dán link thư mục + từng video vào [evidence-index.md](../01-gatekeeper/evidence-index.md) sau khi kiểm tra bằng cửa sổ ẩn danh.
- Không đưa link OBS vào README khi chưa quay; không dùng video của người khác.

## 7. Thứ tự ưu tiên khi thời gian gấp

1. Login → Project Overview → Creative Brief (SV1).
2. Designer Dashboard → Moodboard → Version Management (SV2).
3. Task Board → Internal Review → Feedback AI-2 (SV3).
4. Các màn còn lại.

Vẫn phải đủ 18 video trước khi kết luận gatekeeper 4 đạt; thứ tự chỉ giúp có minh chứng cho luồng demo trước.
