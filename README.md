# CreatorStudio — Nhóm 15, CSE122

Website frontend quản lý dự án sáng tạo, từ brief và moodboard đến phiên bản thiết kế, phản hồi và phê duyệt. Bản dùng chung của SV1/SV2/SV3 đã được nhóm đồng ý theo xác nhận của người dùng ngày 14/10/2026.

## Chạy website

Giải nén toàn bộ ZIP và giữ nguyên các thư mục. Mở thư mục `Project_nhom15`:

- Windows: chạy `CHAY-WINDOWS.bat`. Cần Python; website mở tại `http://localhost:8000/index.html`.
- VS Code: mở thư mục và dùng Live Server với `index.html`.
- Hoặc chạy `python server.py 8000 --open` từ thư mục này.

Nếu cổng 8000 đã được dùng: `python server.py 8001 --open`. Nhấn Ctrl+C để dừng máy chủ.

## Đăng nhập và đăng ký demo

Trang Login có bốn nút chọn nhanh vai trò. Biểu mẫu cũng hỗ trợ đăng nhập bằng email và mật khẩu demo của tài khoản đã tạo.

| Vai trò | Email mẫu | Mật khẩu ban đầu |
|---|---|---|
| Khách hàng | khanhchi@example.com | demo123 |
| Nhà thiết kế | annguyen@example.com | demo123 |
| Trưởng nhóm | linhha@example.com | demo123 |
| Quản trị viên | minhanh@example.com | demo123 |

Đăng ký tạo tài khoản **Khách hàng**; Admin có thể phân vai trò trong Quản lý người dùng. Hồ sơ cho phép sửa thông tin và mật khẩu demo. Tài khoản bị khóa không đăng nhập qua biểu mẫu. Nút chọn nhanh vai trò phục vụ trải nghiệm dữ liệu mẫu.

Đây là bản frontend demo: dữ liệu và tài khoản thử nghiệm lưu trên trình duyệt, không có máy chủ xác thực hoặc đồng bộ dữ liệu qua các máy. Chỉ dùng thông tin và mật khẩu thử nghiệm.

## Luồng sử dụng

1. **Client:** tạo dự án, viết brief, sử dụng AI-1 mô phỏng, kiểm tra/chỉnh sửa và gửi brief.
2. **Lead:** đọc brief, duyệt hoặc yêu cầu bổ sung; tạo công việc, giao Designer và đặt hạn.
3. **Designer:** theo dõi việc được giao, tạo moodboard với AI-3, tải ảnh phiên bản và nộp duyệt nội bộ.
4. **Lead:** xem đúng ảnh phiên bản, ghi chú/checklist, yêu cầu sửa hoặc chuyển Client.
5. **Client:** xem/so sánh phiên bản, ghim phản hồi, duyệt hoặc yêu cầu sửa/từ chối.
6. **Lead:** dùng AI-2 tổng hợp phản hồi; kiểm tra gợi ý và chuyển thành công việc.
7. **Admin:** quản lý người dùng, mẫu brief, quy tắc và lưu trữ dự án. Các vai trò có Hồ sơ/Thông báo.

## Cấu trúc

```text
Project_nhom15/
  index.html, login.html, register.html
  client-*.html, designer-*.html, lead-*.html, admin-*.html
  profile.html, notifications.html, 404.html
  css/                  Giao diện và responsive
  js/data.js            Dữ liệu mẫu
  js/store.js           Dữ liệu chung và kiểm tra nghiệp vụ
  js/modules/           Điều hướng, AI mô phỏng
  js/pages/             Các màn Lead/Admin
  js/client-store-adapter.js  Kết nối màn Client với Store chung
  assets/               Ảnh, icon, font Inter và giấy phép
  docs/                 Hướng dẫn, kiểm kê, phân công và QA
  tests/                Kiểm thử dữ liệu và trình duyệt
```

Công nghệ: HTML/CSS/JavaScript thuần; Python chỉ dùng để mở máy chủ thử nghiệm cục bộ. Store dùng khóa `creatorstudio.team.v1`. Khóa dữ liệu của các bản cũ vẫn giữ nguyên; chưa tự nhập vào bản mới. Công cụ demo có xuất JSON và đặt lại dữ liệu mẫu; đặt lại xóa thay đổi của bản hiện tại.

## Tài liệu và kiểm thử

- [Hướng dẫn sử dụng](Project_nhom15/docs/user-guide.md)
- [Bảng kiểm kê 18 trang](Project_nhom15/docs/screen-list.md): 17 trang ban đầu và một trang đăng ký bổ sung.
- [Phân công nhóm](Project_nhom15/docs/team-assignment.md)
- [Khai báo AI](Project_nhom15/docs/ai-usage-report.md)
- [Mô tả/checklist Task 27](Project_nhom15/docs/TASK-27-INTEGRATION-v1.md)
- [Tiến độ 29 task](Project_nhom15/docs/TIEN-DO-SV3.md)
- [QA cuối: tài khoản, hồ sơ, tìm kiếm, thông báo](Project_nhom15/docs/qa-final-v5/result.json)
- [QA tích hợp được chạy lại](Project_nhom15/docs/qa-final-v5/integration/result.json)
- [Yêu cầu học phần gốc](Project_nhom15/docs/reference/course-requirements-original.md)

Kiểm tra file: `python check_bundle.py`. Kiểm thử dữ liệu: `node tests/task27-integration.cjs` và các file `tests/*.test.cjs`.

Kiểm thử Chromium cần cài Playwright và trình duyệt: `node tests/browser-task27.cjs`, `node tests/browser-final-v5.cjs`. Có thể đặt `CHROMIUM_EXECUTABLE_PATH` nếu đã có Chromium riêng. Các test mở phiên độc lập, không dùng dữ liệu trình duyệt cá nhân.

## Nguồn đóng góp và minh chứng

[SV1 PR #3](https://github.com/tungten2007/CSE122_67KTPM1_BTCK_Nhom15/pull/3), [SV2 PR #2](https://github.com/tungten2007/CSE122_67KTPM1_BTCK_Nhom15/pull/2), [SV3 PR #1](https://github.com/tungten2007/CSE122_67KTPM1_BTCK_Nhom15/pull/1); [bản tích hợp PR #4](https://github.com/tungten2007/CSE122_67KTPM1_BTCK_Nhom15/pull/4). Các tài liệu bản nộp gốc được giữ trong `docs/submission-sv1`, `docs/submission-sv2`.

Code và tài liệu dùng chung đã có. Minh chứng Figma, OBS và yêu cầu nộp học phần theo bảng tiến độ; không xem việc website chạy được là bằng chứng đã quay OBS hay đã được giảng viên duyệt. Nhóm tự quay video và điền link thật ở Task 29.
