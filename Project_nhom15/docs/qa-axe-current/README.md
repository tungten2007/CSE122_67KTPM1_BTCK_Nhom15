# Kiểm tra axe — 26/10/2026

[Kết quả JSON đầy đủ](report.json), axe-core 4.14.0, Edge 156.0.4314.42. Bản mã cơ sở 963fc6c cộng thay đổi accessibility trong đợt này; kết quả giữ SHA256 engine để đối chiếu. Dùng LocalStorage demo riêng.

44 lượt: 19 trang/lượt (18 màn chính và 403 riêng) × 1440/375px, cộng 3 modal tạo task/user/mẫu brief × hai độ rộng. Không loại vùng DOM hay tắt quy tắc. Sau sửa có **0 vi phạm tự động, 0 lỗi trang/HTTP**. Còn **118 lượt phần tử incomplete** cần kiểm tra thủ công, gồm 109 color-contrast, 5 label-content-name-mismatch, 2 aria-prohibited-attr, 2 link-in-text-block. Đây không phải chứng nhận toàn bộ WCAG.

Đã sửa: cấp tiêu đề, checkbox có tên riêng, tên hai landmark, tên avatar chứa chữ hiển thị, màu chữ select task, bỏ opacity toàn thẻ Inactive để giữ chữ và nút đọc được. CSS theo cấp tiêu đề được cập nhật để giữ bố cục.

## Phạm vi và hạn chế của engine

Tùy chọn preload=false chỉ tắt tải bổ sung CSSOM của engine, không tắt quy tắc axe. Lượt chạy preload mặc định phát sinh các yêu cầu @import sai gốc dù trình duyệt tải CSS đúng. Giữ kết quả incomplete để xem thủ công; không đổi đường dẫn CSS hợp lệ của website nhằm chiều theo scanner. Tham khảo [báo lỗi upstream #5268](https://github.com/dequelabs/axe-core/issues/5268) và [API preload](https://github.com/dequelabs/axe-core/blob/develop/doc/API.md).

Chưa bao phủ mọi modal/trạng thái, bàn phím/screen reader thực tế, zoom, W3C hay Lighthouse. Các bộ hồi quy bổ sung: 11/11 tệp Node, check_bundle.py và 57 lượt browser-task27 đạt. Luồng tạo phiên bản trong browser-task27 vẫn có bước dựng dữ liệu qua Store.

## Chạy lại

Từ Project_nhom15 chạy `node tests/browser-axe.cjs`, cần Playwright và axe-core 4.14.0. Có thể dùng NODE_PATH cho runtime có sẵn; AXE_SOURCE_PATH trỏ tới axe.min.js nếu không cài axe-core trong module path; CHROMIUM_EXECUTABLE_PATH trỏ Edge/Chromium. QA_OUTPUT_DIR chọn nơi xuất, mặc định thư mục tạm creatorstudio-axe-audit. QA_SCREENSHOTS=1 chụp ba trạng thái mobile minh họa. Thư viện chỉ dùng lúc kiểm thử, không tải vào website khi sử dụng.

Ảnh đã xem sau sửa: [mẫu brief/Inactive](admin-brief-template-management-375.png), [modal tạo user](create-user-dialog-375.png). [Creative Brief](client-creative-brief-375.png).
