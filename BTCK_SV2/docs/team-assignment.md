# Phân công và minh chứng nhóm

| Thành viên | Phạm vi theo Excel | Nhánh đề xuất |
|---|---|---|
| SV1 | 1, 2, 3, 13, 14 — Client, Landing, Login | feature/client-portal |
| SV2 | 4, 5, 6, 10, 15, 16 — Designer, Template, Profile, Notifications | feature/designer-sv2 |
| SV3 | 7, 8, 9, 11, 12, 17 — Lead, Admin, Error | feature/lead-admin |

Nhánh trong bảng là gợi ý phân công. Bản SV2 hiện được đưa lên nhánh `feature/sv2-creatorstudio-review` bằng tài khoản `tuantu0211` (Tú). Deadline, task Trello, người review, tên đầy đủ của các thành viên và OBS chưa được cung cấp.

Quy trình: task → nhánh feature → commit có ý nghĩa → push → PR → review chéo → merge dev → test tích hợp → PR lên main. Không sửa trực tiếp main.

- Repository: https://github.com/tungten2007/CSE122_67KTPM1_BTCK_Nhom15
- PR SV2 đã tạo: https://github.com/tungten2007/CSE122_67KTPM1_BTCK_Nhom15/pull/2
- Commit bản tách file đã upload: `1bad5c49f12826539d842c6a9f299b7cc698a29b`.
- Link PR không chứng minh đã được review/merge. Kiểm tra trạng thái thật khi nộp bài.

Mỗi thành viên cần tự thực hiện luồng Mockup → HTML → CSS → JS → Data → Responsive → Branch → Commit → PR → OBS. Không tạo commit/OBS giả để đánh dấu hoàn thành.

| Màn hình SV2 | Task | Mockup | Commit / PR / Review | OBS |
|---|---|---|---|---|
| designer-dashboard.html | Chưa cung cấp | Chưa xác minh | Chưa cung cấp | Chưa cung cấp |
| designer-moodboard.html | Chưa cung cấp | Chưa xác minh | Chưa cung cấp | Chưa cung cấp |
| designer-version-management.html | Chưa cung cấp | Chưa xác minh | Chưa cung cấp | Chưa cung cấp |
| admin-brief-template-management.html | Chưa cung cấp | Chưa xác minh | Chưa cung cấp | Chưa cung cấp |
| profile.html | Chưa cung cấp | Chưa xác minh | Chưa cung cấp | Chưa cung cấp |
| notifications.html | Chưa cung cấp | Chưa xác minh | Chưa cung cấp | Chưa cung cấp |

Một màn hình độc lập = một video OBS theo README gốc. Video có mặt sinh viên, mockup, code, chỉnh sửa trực tiếp, chạy thử, commit và mã task/branch. Lưu link thật vào bảng khi nhóm hoàn thành.

## Trách nhiệm chéo của SV2

Ngoài 6 màn hình được giao, SV2 phụ trách dữ liệu dùng chung (CS_SEED và các hàm LocalStorage trong `js/share.js`), JavaScript/LocalStorage, AI-3 Mood Keyword Assistant và kiểm thử phần Designer. Các trang dùng chung cần thống nhất Header, Sidebar, Role Switcher và UI Kit khi tích hợp SV1/SV3.

## Checklist nghiệm thu

- [x] Có 6 màn hình SV2 đúng tên file kiểm kê và bộ HTML/CSS/JS riêng cho từng trang.
- [x] Dữ liệu mẫu tập trung; có bộ kiểm tra tự động cho dữ liệu, phân quyền và AI mô phỏng.
- [ ] Xác minh mockup được duyệt, giao diện desktop/tablet/mobile và accessibility cơ bản.
- [ ] Chạy đầy đủ validation, điều hướng, CRUD và các trạng thái nghiệp vụ phù hợp trên trình duyệt.
- [ ] Kiểm thử AI: nhập → xử lý → kết quả → giải thích → chấp nhận/sửa/từ chối/tạo lại/lưu; có lỗi, thử lại và nhập thủ công.
- [ ] Tích hợp SV1/SV3 và kiểm thử luồng liên vai trò end-to-end.
- [ ] Bổ sung task, deadline, commit/PR của từng màn hình và xác minh review chéo.
- [ ] Merge dev, kiểm thử tích hợp và phát hành main theo quy trình nhóm.
- [ ] Hoàn thành 6 OBS cho 6 màn hình SV2, cập nhật bảng minh chứng.

Các dấu kiểm triển khai không thay thế minh chứng giảng viên duyệt hoặc trạng thái DONE.
