# Vai trò và phạm vi tích hợp

Excel là nguồn phân công chi tiết; README gốc là mô tả toàn nhóm. Ảnh là hướng dẫn tổ chức BTL, ví dụ tư vấn tâm lý không phải nghiệp vụ của CreatorStudio.

| Vai trò | Màn hình | Người phụ trách |
|---|---|---|
| Client | Creative Brief, Review Versions, Project Overview | SV1 |
| Designer | Dashboard, Moodboard, Version Management | SV2 |
| Lead | Task Board, Internal Review, Feedback Summary | SV3 |
| Admin | Brief Template Management | SV2 |
| Admin | User Management, Project Settings | SV3 |
| Dùng chung | Landing, Login | SV1 |
| Dùng chung | Profile, Notifications | SV2 |
| Dùng chung | Error 403/404 | SV3; có trang hỗ trợ tạm trong bản SV2 |

Trong bản SV2, Client/Lead chọn demo sẽ mở Profile để kiểm thử màn hình dùng chung. Menu chỉ hiển thị các màn hình đã có. Khi tích hợp mã SV1/SV3, khôi phục home và menu tương ứng trong js/modules/navigation.js và js/app.js.

Theo Excel: AI-1 Brief Structurer, AI-2 Feedback Summarizer, AI-3 Mood Keyword Assistant. README gốc đảo số AI-2/AI-3; thống nhất theo Excel trong bản này.

Mẫu Brief: yêu cầu tối thiểu R; bản này bổ sung C/U. Không đổi yêu cầu R trong kiểm kê vì có chức năng bổ sung.
