> Khôi phục từ bản sao lưu ngày 25/10/2026. Nội dung dự thảo/lịch sử cần đối chiếu; số liệu hiện hành ưu tiên README gốc và evidence-index. Chưa xác nhận link Figma/Trello/deploy hoặc kết quả chưa chạy lại.

# AI Prompt Log — mẫu ghi theo từng sinh viên

Tài liệu này để **từng sinh viên tự điền** những prompt thật đã dùng trong quá trình làm bài. Không điền thay, không bịa prompt, không chép prompt từ người khác. Mục đích là minh chứng trung thực cho gatekeeper 5 và phần vấn đáp.

## Quy tắc ghi

1. Chỉ ghi prompt **thực tế đã dùng**; nếu prompt dài, tóm tắt ý chính và ghi rõ “tóm tắt”.
2. Ghi công cụ (Codex, Qoder, ChatGPT, Copilot…), ngày, mục tiêu.
3. Ghi AI đã trả về gì và **sinh viên đã sửa gì**; không chỉ chép output.
4. Ghi cách kiểm chứng (test, trình duyệt, ảnh, `git diff`) và bài học.
5. Không đưa khóa API, mật khẩu thật, dữ liệu cá nhân hoặc thông tin của người khác vào prompt/log.
6. Không ghi prompt của thành viên khác khi chưa được họ xác nhận.
7. Nếu không dùng AI cho phần nào, ghi “Không dùng AI” — cũng là khai báo hợp lệ.

## Định dạng một mục

```text
### [Ngày] — [Công cụ] — [Mục tiêu ngắn]
- Prompt (nguyên văn hoặc tóm tắt): ...
- AI trả về: ...
- Phần sinh viên tự sửa/viết: ...
- Cách kiểm chứng: ...
- Kết quả: ...
- Bài học: ...
```

## SV1 — Nguyễn … (chờ điền tên thật/MSSV)

| # | Ngày | Công cụ | Mục tiêu | Prompt (tóm tắt/nguyên văn) | AI đã làm | SV tự sửa/viết | Kiểm chứng | Bài học |
|---|---|---|---|---|---|---|---|---|
| 1 |  |  |  |  |  |  |  |  |
| 2 |  |  |  |  |  |  |  |  |

**Phần không dùng AI:** …

**Ghi chú:** SV1 phụ trách Client, Landing/Login, khung Client (task 06–09, 22–23). Cần ghi prompt liên quan đến các phần này, không ghi thay SV2/SV3.

## SV2 — … (chờ điền tên thật/MSSV)

| # | Ngày | Công cụ | Mục tiêu | Prompt (tóm tắt/nguyên văn) | AI đã làm | SV tự sửa/viết | Kiểm chứng | Bài học |
|---|---|---|---|---|---|---|---|---|
| 1 |  |  |  |  |  |  |  |  |
| 2 |  |  |  |  |  |  |  |  |

**Phần không dùng AI:** …

**Ghi chú:** SV2 phụ trách Designer, dữ liệu, Moodboard/AI-3, Template, Profile/Notifications (task 10–14, 18, 24–25).

## SV3 — … (chờ điền tên thật/MSSV)

| # | Ngày | Công cụ | Mục tiêu | Prompt (tóm tắt/nguyên văn) | AI đã làm | SV tự sửa/viết | Kiểm chứng | Bài học |
|---|---|---|---|---|---|---|---|---|
| 1 |  |  |  |  |  |  |  |  |
| 2 |  |  |  |  |  |  |  |  |

**Phần không dùng AI:** …

**Ghi chú:** SV3 phụ trách Lead, Admin User/Settings, AI-2, lỗi và QA (task 15–17, 19–21, 26).

## Nhóm — phiên hỗ trợ ngày 2026-10-25 (Qoder)

Đây là log của **phiên làm việc nhóm với agent**, không phải log cá nhân của SV1/SV2/SV3. Ghi lại để minh bạch phần tài liệu/code được hỗ trợ.

| # | Ngày | Công cụ | Mục tiêu | Prompt thật (tóm tắt) | AI đã làm | Nhóm đã/Phải kiểm tra | Kiểm chứng |
|---|---|---|---|---|---|---|---|
| 1 | 2026-10-25 | Qoder | Tóm tắt barem và lập kế hoạch hoàn thiện BTL | “theo như yêu cầu trong bài thì cần những gì, hãy tóm tắt những ý chính và xây dựng kế hoạch để tôi hoàn thành những yêu cầu trong file trên” (kèm PDF barem) | Đọc PDF, tóm tắt 8 tiêu chí/5 gatekeeper, lập kế hoạch P0–P3, chỉ ra khoảng trống minh chứng | Nhóm đọc lại, chọn phạm vi “cả nhóm 3 SV”, chọn “làm luôn phần thiếu” | Kế hoạch được duyệt; file kế hoạch trong công cụ lập kế hoạch |
| 2 | 2026-10-25 | Qoder | Đồng bộ repo và baseline | Yêu cầu tiếp tục theo kế hoạch đã duyệt | Clone/so sánh remote `dev`, backup local, tạo nhánh `feature/task29-final-evidence`, chạy 11 test Node baseline | Nhóm cần tự review diff, commit/push theo quy trình | Baseline 11 tệp Node đạt; sau P1 chạy lại **12/12 Node + 8/8 browser** ngày 25/10/2026 |
| 3 | 2026-10-25 | Qoder | Tạo bộ tài liệu P0 | Tiếp tục kế hoạch P0 | Viết `screen-inventory.md`, `user-flow.md`, `design-system.md`, `figma-audit.md`; cập nhật `screen-list.md`; README 15 mục; workflow deploy; AI report/prompt log | Nhóm phải kiểm tra số liệu, bổ sung link thật, không dùng nguyên văn nếu không đúng | Đối chiếu code; các mục chưa có ghi rõ “chưa có” |

**Không ghi vào log này:** suy nghĩ nội bộ của agent, prompt hệ thống, nội dung không do người dùng gửi, hoặc prompt giả định.

## Tổng hợp trạng thái (nhóm cập nhật)

| SV | Đã điền log | Đã đối chiếu code | Đã có ảnh/test | Ghi chú |
|---|---|---|---|---|
| SV1 | ❌ | ❌ | ❌ | Chờ SV1 |
| SV2 | ❌ | ❌ | ❌ | Chờ SV2 |
| SV3 | ❌ | ❌ | ❌ | Chờ SV3 |

Chỉ đánh dấu ✅ khi từng SV đã tự điền và có ít nhất một minh chứng kiểm chứng (test, ảnh, hoặc `git diff`).

## Liên kết

- [Báo cáo AI](ai-usage-report.md)
- [Minh chứng/gatekeeper](../01-gatekeeper/evidence-index.md)
- [Phân công](../team-assignment.md)
