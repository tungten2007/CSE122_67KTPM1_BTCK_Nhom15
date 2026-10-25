# Cấu trúc mã nguồn CreatorStudio

Các màn hình được nhóm theo phần việc của từng sinh viên. Trang dùng chung nằm trong `shared`.

```text
Project_nhom15/
  index.html                 Lối vào chính, chuyển đến landing SV1
  html/
    sv1/                     Landing, đăng nhập/đăng ký, màn khách hàng
    sv2/                     Dashboard Designer, moodboard, phiên bản, mẫu brief,
                             hồ sơ và thông báo (theo bảng kiểm kê)
    sv3/                     Màn Lead/Admin và trang lỗi 403/404
    shared/                  Demo API và hướng dẫn bắt đầu
  css/
    sv1/                     Giao diện riêng SV1
    sv2/                     Giao diện riêng SV2
    sv3/                     Giao diện riêng SV3
    shared/                  Token, kiểu chữ, giao diện chung và API demo
  js/
    sv1/                     Điều khiển landing, login và các trang Client
    sv2/                     Điều khiển màn Designer và mẫu brief
    sv3/                     Điều khiển màn Lead/Admin
    shared/                  Store, dữ liệu, điều hướng và API demo dùng chung
  assets/                    Ảnh, icon, font và dữ liệu mẫu
  docs/                      Hướng dẫn, phân công, kiểm kê và QA
  tests/                     Kiểm tra logic và trình duyệt
```

## Entry point và đường dẫn

Mở `index.html` ở thư mục `Project_nhom15` bằng Live Server. Tệp này chuyển đến `html/sv1/index.html`. Các trang con khai báo `<base href="../../">`, vì vậy các đường dẫn CSS, JavaScript, ảnh và liên kết nội bộ đều tính từ thư mục `Project_nhom15`.

Không mở trực tiếp một HTML con bằng `file://`; hãy mở qua Live Server hoặc chạy `CHAY-WINDOWS.bat`. Có thể chạy `python check_bundle.py` để kiểm tra các tệp cần thiết và liên kết trong toàn bộ HTML.

## Phân công trang

- **SV1:** landing, đăng nhập, đăng ký, brief khách hàng, tổng quan dự án, duyệt phiên bản.
- **SV2:** dashboard Designer, moodboard, quản lý phiên bản, quản lý mẫu brief; hồ sơ và thông báo dùng chung theo kiểm kê.
- **SV3:** bảng công việc, duyệt nội bộ, tổng hợp phản hồi, quản lý người dùng, thiết lập dự án, trang 403/404.
- **Shared:** demo REST API và trang bắt đầu; logic, dữ liệu và kiểu giao diện dùng chung được đặt trong các thư mục `shared` tương ứng.
