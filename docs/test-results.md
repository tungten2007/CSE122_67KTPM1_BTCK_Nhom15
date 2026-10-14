# Kết quả kiểm tra phần SV1

Bản bàn giao ngày 11/10/2026.

- Trình duyệt: Chromium headless, chạy website qua máy chủ HTTP.
- Kết quả: **75 kiểm tra đạt, 0 kiểm tra thất bại**.
- Kiểm tra bố cục cả 5 trang ở 360px, 768px và 1440px; không tràn ngang.
- Có kiểm tra lỗi tải JSON và Retry, state qua reload, vai trò, biểu mẫu, CRUD, AI-1, review và menu mobile.
- Không phát hiện lỗi JavaScript trong các luồng được chạy.
- Ảnh thiết kế tham chiếu gồm 10 ảnh desktop/mobile và 4 ảnh trạng thái được chụp từ giao diện thực tế.
- Firefox/Safari, Figma được nhóm duyệt, video OBS và review PR của sinh viên chưa được kiểm chứng trong lần chạy này.

Mã kiểm tra: `tests/sv1.e2e.cjs`. Hướng dẫn chạy: `docs/SV1.md`.

## Các kiểm tra đã thực thi

1. PASS — Client pages require a demo session
2. PASS — Email validation
3. PASS — Password validation
4. PASS — Valid login loads four JSON projects
5. PASS — Current navigation is marked
6. PASS — Activity bell opens
7. PASS — Notifications can be marked read
8. PASS — Escape closes activity panel
9. PASS — Search empty state
10. PASS — Status filter
11. PASS — Create project and open its brief
12. PASS — Insufficient AI input can fail
13. PASS — AI processing state
14. PASS — Five editable structured brief sections
15. PASS — Budget extracted from explicit description
16. PASS — Uncertain suggestions need user confirmation
17. PASS — Unaccepted result cannot be submitted
18. PASS — Invalid budget rejected
19. PASS — Accept result persists immediately
20. PASS — Accepted brief restored after reload
21. PASS — Editing invalidates acceptance
22. PASS — Draft persists edits
23. PASS — Submit changes brief state
24. PASS — Submitted brief has next-step navigation
25. PASS — Submitted brief visible in Project Overview
26. PASS — New projects show no-version state
27. PASS — Reject AI result
28. PASS — Manual brief works without AI
29. PASS — Edit project
30. PASS — Archive project
31. PASS — Archived brief read-only
32. PASS — Archived project retains navigation to other projects
33. PASS — Restore prior state
34. PASS — Delete archived project
35. PASS — Changes require feedback
36. PASS — Coordinate comment persists
37. PASS — Edit comment and reload
38. PASS — Comparison slider
39. PASS — Side view restores full image
40. PASS — Moodboard reference
41. PASS — Changes Requested state
42. PASS — Resolve feedback and filter
43. PASS — Approve completes project
44. PASS — Approved version read-only
45. PASS — Rejection requires specific reason
46. PASS — Reject version state
47. PASS — Rejection reason visible
48. PASS — Rejected version remains locked after reload
49. PASS — Non-client access gate
50. PASS — Role preference survives logout
51. PASS — No overflow: index.html at 360px
52. PASS — No overflow: login.html at 360px
53. PASS — No overflow: client-project-overview.html at 360px
54. PASS — No overflow: client-creative-brief.html?project=p3 at 360px
55. PASS — No overflow: client-review-versions.html?project=p3 at 360px
56. PASS — No overflow: index.html at 768px
57. PASS — No overflow: login.html at 768px
58. PASS — No overflow: client-project-overview.html at 768px
59. PASS — No overflow: client-creative-brief.html?project=p3 at 768px
60. PASS — No overflow: client-review-versions.html?project=p3 at 768px
61. PASS — No overflow: index.html at 1440px
62. PASS — No overflow: login.html at 1440px
63. PASS — No overflow: client-project-overview.html at 1440px
64. PASS — No overflow: client-creative-brief.html?project=p3 at 1440px
65. PASS — No overflow: client-review-versions.html?project=p3 at 1440px
66. PASS — Mobile menu backdrop
67. PASS — Escape closes menu
68. PASS — Menu restores keyboard focus
69. PASS — Click backdrop closes menu
70. PASS — Mobile activity panel fits
71. PASS — Deleted/missing project state
72. PASS — JSON loading failure has retry
73. PASS — Retry recovers JSON loading
74. PASS — JSON loading skeleton is visible
75. PASS — No browser JavaScript errors

## Kiểm tra lại sau sửa phông chữ — 14/10/2026

- 75 kiểm tra chức năng Chromium tiếp tục đạt.
- 67 kiểm tra typography đạt: 5 trang ở 360/390/768/1440px, font tiếng Việt thường/nghiêng (NFC và NFD), cỡ chữ tối thiểu, không có tải tài nguyên bên ngoài và fallback khi WOFF2 bị chặn.
- Đã chụp lại ảnh desktop/mobile và các trạng thái trong `design/mockups/` bằng font mới.
- Chi tiết và lệnh chạy: `docs/typography.md`.
