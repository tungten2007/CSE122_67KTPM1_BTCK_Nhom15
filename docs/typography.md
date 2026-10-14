# Sửa hiển thị phông chữ — SV1

Cập nhật ngày 14/10/2026.

## Vấn đề và thay đổi

Giao diện trước khai báo Inter nhưng không có tệp font để tải, nên trình duyệt dùng phông dự phòng tùy máy. Nhiều nhãn dùng 8–11px và nội dung phụ có màu nhạt. Khi thử font chia theo unicode-range, một số dấu tiếng Việt dạng Unicode tách dấu tiếp tục dùng phông dự phòng.

- Dùng hai tệp **Inter Variable v4.1 đầy đủ**, thường và nghiêng, được lưu cùng website trong `assets/fonts/`. Nguồn là commit release cố định của repository chính thức `rsms/inter`; giữ nguyên tệp và giấy phép OFL.
- `css/fonts.css` khai báo dải độ đậm 100–900. `--font-sans` trong `css/tokens.css` dùng chung cho các trang; phần nhấn nghiêng ở Landing/Login cũng dùng đúng Inter.
- Preload font thường trên 5 trang, font nghiêng trên Landing/Login. Không gọi Google Fonts/CDN khi mở giao diện.
- Nội dung nền 16px, các nhãn nhỏ tối thiểu 13px; trường nhập liệu 16px. Giảm việc chữ quá nhỏ và tránh cỡ chữ thấp ở các trường nhập trên điện thoại.
- Chỉnh giãn dòng tiêu đề/nội dung, giảm khoảng cách chữ âm và tăng độ đậm của màu nội dung phụ từ `#7a857b` sang `#5f6d63`.
- Card dự án dùng giới hạn 2 dòng thay cho chiều cao cố định 36px, để nội dung không bị cắt giữa dòng khi chữ lớn hơn.
- Các thanh điều khiển và nhãn tự xuống dòng khi cần, giữ bố cục ở màn hình nhỏ.

Hai tệp đầy đủ hỗ trợ cả ký tự tiếng Việt dựng sẵn (NFC) và dấu Unicode tách rời (NFD); các ký tự trong cùng đoạn dùng cùng phông. Font-display swap và Segoe UI/Arial dự phòng giữ nội dung hiển thị nếu tải font gặp lỗi.

## Kiểm chứng

`tests/typography.e2e.cjs` đã đạt **67 kiểm tra trên Chromium**:

- 5 trang tại 360, 390, 768 và 1440px: không tràn ngang, chữ hiển thị không dưới 13px, các trường biểu mẫu không dưới 16px.
- Dùng dữ liệu render của Chromium để kiểm tra cả kiểu thường/nghiêng với toàn bộ chữ tiếng Việt đặc trưng và dạng tách dấu. Chữ được render bằng Inter lưu trong dự án, không dùng font khác cho dấu tiếng Việt.
- Không có yêu cầu font thất bại khi chạy bình thường; không tải tài nguyên ngoài website; không có lỗi JavaScript trong luồng kiểm tra.
- Khi chặn WOFF2 có chủ ý, nội dung vẫn hiển thị bằng font dự phòng.

Các kiểm tra trên không thay thế kiểm thử trực tiếp Firefox/Safari hoặc thiết bị thật. SVG minh họa sản phẩm vẫn giữ chữ trang trí riêng; font giao diện lấy từ CSS. UI Kit SVG cũ là bản tham chiếu, còn typography hiện hành nằm ở CSS và các ảnh chụp mới trong `design/mockups/`.

Để chạy lại, giữ máy chủ HTTP ở terminal khác rồi chạy:

```bash
node tests/typography.e2e.cjs
```

Có thể đặt `CS_BASE_URL` hoặc `CS_CHROMIUM_PATH` như với bài kiểm tra chức năng. Hướng dẫn cài Playwright tùy chọn ở `docs/SV1.md`.
