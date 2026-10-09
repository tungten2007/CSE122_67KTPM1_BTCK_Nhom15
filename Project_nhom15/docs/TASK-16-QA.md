# TASK-16 — kết quả 09/10/2026

SV3 phải làm: duyệt nội bộ phiên bản, ghi chú, checklist, trả sửa/chuyển khách.

Đã làm: thêm chọn phiên bản theo dự án, ưu tiên Internal Review, giữ lựa chọn khi render, bỏ chế độ ghim khi đổi phiên bản; chặn action ngoài pass/rework. Không sửa phần upload của SV2, không đổi schema dữ liệu.

File: js/pages/lead-internal-review.js, js/store.js, tests/task16.test.cjs.

QA: PASS kỹ thuật. Root chạy lại node --test tests/*.test.cjs: 7 file test, 7 pass, 0 fail; python check_bundle.py đạt. Test mới bao phủ phiên bản đã duyệt đứng trước phiên bản chờ, lọc đúng dự án, giữ lựa chọn, chuyển dự án, đích action và không đổi dữ liệu khi action sai. DOM giả lập không chứng minh layout hoặc focus native browser.

Trạng thái: 🟠 Chờ duyệt. Chưa QA trình duyệt và tích hợp nhóm. Ảnh demo chỉ có ở phiên bản mẫu; phiên bản khác báo thiếu ảnh, chờ tài sản thật từ SV2.

Tiếp theo: TASK-17 Tổng hợp phản hồi AI-2 (đã có code, tiếp tục từ bản có sẵn), TASK-21 kiểm thử browser khi có môi trường; TASK-27 chờ mã nguồn SV1/SV2. Không xây lại chức năng đã đạt.
