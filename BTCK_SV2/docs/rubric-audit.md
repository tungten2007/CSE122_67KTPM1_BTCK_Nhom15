# Đối chiếu barem CSE122 — phần SV2

Ngày kiểm tra: 26/10/2026.

> Cập nhật sau rà soát: đã sửa các lỗi kỹ thuật được ghi trong
> [biên bản sửa lỗi hệ thống](system-fixes.md), gồm responsive, HTML/nhãn,
> Empty/Error, validation và chỉnh sửa gợi ý AI. Các phát hiện bên dưới là
> trạng thái trước khi sửa; minh chứng quy trình/thiết kế/OBS vẫn cần xác minh.

Nguồn: `00_BAREM_CHAM_DIEM_VA_QUY_CHE_VAN_DAP_BTL.pdf` do người dùng cung cấp
(45 trang PDF; số trang in trong tài liệu từ i đến 42).

Phạm vi: mã hiện tại trong `C:\BTCK_SV2`, tài liệu và minh chứng tại đây;
đọc thêm cấu trúc nhánh main, README và trạng thái PR #2 của repository nhóm.
Không chạy kiểm thử đầu-cuối toàn bộ bản nhóm trên main trong lượt này.
Không sửa mã ứng dụng hoặc tự đánh dấu minh chứng chưa có là hoàn thành.

## 1. Kết luận

Bản SV2 có đủ sáu màn hình được phân công, có xử lý dữ liệu, CRUD,
validation, CSS/JS dùng chung và AI-3 mô phỏng có luồng thành công/thất bại.
Tuy nhiên chưa đủ bằng chứng để kết luận đáp ứng toàn bộ điều kiện vào bảo vệ
hoặc đạt tối đa barem. Các thiếu sót dưới đây chia thành lỗi xác nhận được
và hạng mục cần minh chứng, không coi “chưa xác minh” là “chắc chắn chưa làm”.

## 2. Những việc ưu tiên trước khi nộp

| Ưu tiên | Phát hiện | Cần hoàn thiện | Barem, số trang in |
| --- | --- | --- | --- |
| Rất cao | Chưa có link OBS hợp lệ cho sáu màn hình SV2 trong tài liệu cục bộ; bảng minh chứng còn “Chưa cung cấp” | Mỗi màn hình đã duyệt có một video thật: webcam, giải thích code, sửa trực tiếp, chạy thử responsive, commit/push, Task ID/branch/commit | ĐK4 tr.6; 8.1 tr.18; IV.3 tr.21–22 |
| Rất cao | Chưa xác minh bộ thiết kế SV2 được duyệt trước code | Đối chiếu sáu trang với frame Figma/Canva, desktop/mobile, trạng thái AI, Empty/Loading/Error và Component Guide; lưu link và minh chứng duyệt | ĐK1 tr.5; 1.3 tr.10–11 |
| Rất cao | Chưa xác minh live deployment hoạt động và thống nhất bản nộp | Ghi URL công khai thật; kiểm tra tài nguyên, các vai trò, luồng nghiệp vụ và máy điện thoại; localhost không thay thế deploy | ĐK3 tr.6; 7.3 tr.17 |
| Cao | PR #2 vẫn open, merged=false; API reviews trả [] tại thời điểm kiểm tra | Review có nội dung thực tế và xử lý tích hợp theo quy trình nhóm; nếu đã tích hợp bằng PR khác phải ghi PR/commit thay thế | DoD 12–13 tr.5; 7.2 tr.17 |
| Cao | Nhiều sửa đổi cục bộ chưa commit, gồm share.css/share.js và sửa mobile | Đưa đúng bản được nghiệm thu vào nhánh/PR và kiểm thử trên bản nộp; không coi mã đang chạy trên máy là mã đã có trên GitHub | 7.2–7.3 tr.17 |

Không có OBS hợp lệ có thể ảnh hưởng điều kiện vào bảo vệ và quy định điểm
liệt cá nhân; chưa đủ dữ kiện để kết luận người dùng đã vi phạm điều đó.

## 3. Lỗi kỹ thuật xác nhận được

### Responsive — tiêu chí 3.2

Đã mở tám trang ở 320, 375, 768 và 1280 px, tổng cộng 32 phép đo bố cục:

- `index.html`, viewport 320 px: clientWidth=305, scrollWidth=331.
  Hàng đầu trang `.row` và nút `#reset-data-btn` gây tràn ngang.
- `designer-moodboard.html`, viewport 768 px: clientWidth=753,
  scrollWidth=924. `.heading-actions`, các nút thêm/chia sẻ và hàng trạng thái
  vượt vùng nội dung. Sidebar desktop vẫn chiếm chỗ ở breakpoint này.
- 30 phép đo còn lại không có tràn ngang toàn tài liệu trong trạng thái dữ
  liệu mẫu đã mở. Kết quả không thay thế kiểm thử mọi nội dung/modal/dữ liệu dài.
- Lượt trước 360/390/430 px đạt 24/24 sau sửa, nhưng chưa bao phủ 320/768 px.
- Chưa kiểm tra zoom trình duyệt 200% và chưa xác nhận trên thiết bị thật.

Minh chứng ảnh tạm: `../tmp/pdfs/rubric-index-320.jpg`,
`../tmp/pdfs/rubric-moodboard-768.jpg`.
Barem nêu nguy cơ trừ 0.25 điểm cho tràn ngang ở 320–375 px và 0.25 điểm
cho menu/bảng vỡ trên mobile; đây là mức quy định, không tự cộng thành điểm phạt.

### Nhãn biểu mẫu và HTML — tiêu chí 3.3, 4.1

- Dashboard: `#task-search`, `#status-filter`, `#priority-filter` không có
  label hoặc aria-label. Đã xác nhận trên DOM trình duyệt; placeholder không
  thay cho nhãn.
- Admin Template: tương tự `#tpl-search`, `#status-filter`, `#cat-filter`.
- Version Management: `#status-filter` không có nhãn.
- Nhiều biểu mẫu khác bọc input trong `<label>` nên đã có nhãn hợp lệ;
  không cần gắn lỗi cho tất cả input không có id.
- `index.html` và `404.html` chưa có thẻ `<main>`; đều đã có một `<h1>`.
- Có nhảy cấp heading: Dashboard h1 → h3 ở cảnh báo; Admin h1 → h3 ở
  thẻ mẫu; Version h1 → h3 ở thẻ phiên bản. Cần rà lại cả thứ tự DOM thực tế.
- Có focus-visible và Escape đóng modal/menu trong các luồng đã kiểm tra.
  Chưa kiểm định toàn bộ thứ tự Tab, focus Drawer, tương phản 4.5:1 hoặc W3C.

### Empty/Error và form — tiêu chí 2.3, 5.2

- Dashboard `#task-empty`, Template `#template-empty`, Version `#version-empty`
  và Notifications `#notification-empty` chỉ có thông báo, chưa có CTA tại
  trạng thái rỗng như “Xóa bộ lọc” hoặc “Tạo bản ghi đầu tiên”. Nút thêm ở
  đầu trang chưa tạo thành khối hướng dẫn rõ ràng trong Empty State.
- Dashboard có Normal/Loading/Empty/Urgent, nhưng Urgent là trạng thái nghiệp
  vụ, không phải Error State. Chưa có cách demo lỗi tải dữ liệu với nút Thử lại.
- `docDuLieu()` bắt lỗi đọc dữ liệu rồi ghi console.warn và dùng seed; chưa
  có thông báo lỗi đọc/khôi phục dữ liệu riêng trên UI. AI Error đã có xử lý riêng.
- Form modal khóa submit và dùng try/catch/finally, nhưng lỗi thường được
  đưa vào một `.form-error` chung. Profile báo lỗi tên/avatar/email bằng toast;
  chưa đạt yêu cầu lỗi cụ thể ngay dưới từng trường ở mức điểm tối đa.

### Tìm kiếm và dữ liệu — tiêu chí 5.1, 5.3

- Dashboard và Admin có search kết hợp hai bộ lọc, đây là phần đã có.
- Chưa có điều khiển sắp xếp/phân trang trên hai danh sách đó. Version có
  sort theo ngày mới nhất trong code, chưa có bộ chọn sắp xếp cho người dùng.
- Seed nằm trong `CS_SEED()` của `js/share.js`, không phải JSON riêng/fetch.
  LocalStorage có lưu bền vững, nên không kết luận ứng dụng thiếu dữ liệu/API.
  Tuy nhiên chưa đáp ứng đầy đủ cách tổ chức dữ liệu để đạt tối đa mục 5.3.
- Dữ liệu chính còn ít: 7 tasks, 3 versions, 4 briefTemplates, 2 projects,
  1 brief. Tổng tất cả thực thể hơn 25 bản ghi; yêu cầu 15–25 bản ghi không
  nói rõ cho từng bảng, vì vậy đây là điểm cần làm phong phú, không kết luận
  chắc chắn vi phạm ngưỡng số lượng.

### AI — tiêu chí 6

- AI-3 Moodboard có input, processing, output, giải thích, reject/regenerate,
  accept/apply lưu dữ liệu và failure/retry/manual. Đây là phần mạnh của SV2.
- Chưa có bước sửa trực tiếp kết quả AI trước khi áp dụng. Tạo lại cho phép
  sửa mô tả; cùng mô tả có thể cho cùng kết quả theo quy tắc.
- AI-1 trên Admin là trình thử Prompt: hiển thị mô tả + các mục + Prompt sau
  thay `{raw_input}`. Nó không phải tính năng sinh Brief đầy đủ có bước
  Accept/Edit/Save. Không nên đếm riêng nó thành một AI hoàn chỉnh thứ hai.
- Khối ưu tiên trên Dashboard là quy tắc tìm nhiệm vụ gấp/tham chiếu AI-3,
  không nên tính thành một tính năng AI độc lập có đủ sáu bước.
- Yêu cầu ít nhất ba AI áp dụng cho cả nhóm. Main đã có file Client và Lead;
  chưa chạy luồng AI-1/AI-2 của bản nhóm trong lượt này nên không kết luận
  cả nhóm thiếu hai AI. Cần nghiệm thu đủ ba luồng trên đúng bản nộp.
- API AI thật thuộc bonus; không dùng API thật không tự động là lỗi.

## 4. Tài liệu, thiết kế và chuỗi minh chứng

### Cục bộ SV2

- Không có README.md ở gốc; hướng dẫn hiện là `docs/sv2.md.md`.
  Script `scripts/update_readme_toc.py` vẫn tìm README.md nên không chạy
  đúng với cấu trúc này.
- Các link cuối `docs/sv2.md.md` như `docs/kiem-thu.md`,
  `docs/roles-and-features.md`, `docs/project-proposal.md` không trỏ đến file
  hiện có khi tính tương đối từ thư mục docs. Cần kiểm tra lại link thật.
- `docs/screen-list.md` chỉ có bốn cột, thiếu bảng kiểm kê 12 cột của mục 1.2:
  Role, User Goal, User Task, Screen, File, CRUD, States, AI, Assignee,
  Task ID, Branch, OBS. Phần README có thêm nghiệp vụ nhưng vẫn thiếu chuỗi
  truy vết đầy đủ. Không chỉ đổi tên file là đủ.
- Chưa có sơ đồ Sitemap/User Flow riêng và ma trận thực thể–trạng thái đầy
  đủ trong thư mục này.
- Có UI kit, wireframe SVG và screenshot desktop/mobile. Ảnh chụp code đã
  chạy không chứng minh được mockup Figma/Canva được duyệt trước code.
- `docs/team-assignment.md` còn thiếu Task ID, deadline, link review và OBS
  từng màn hình. Cần đồng bộ với bảng công việc thật của nhóm.
- `docs/ai-usage-report.md` có phần cập nhật Codex nhưng vẫn giữ các khẳng
  định lịch sử về Gemini/Antigravity, Store/App/Navigation, KNOWLEDGE_BASE
  và `js/modules/ai-mood-assistant.js` không còn trong bản hiện tại.
  Một số phần gán “sinh viên tự sửa” chưa có minh chứng. Cần viết lại trung
  thực theo phiên bản hiện tại, giữ lịch sử ở phụ lục nếu có bằng chứng.
- Các tài liệu kiểm thử/phân công có đoạn checklist cũ chưa cập nhật theo
  kết quả mới. Không dùng chúng làm kết luận toàn bộ bài chưa test.

### GitHub nhóm — đọc trực tiếp ngày kiểm tra

Repository: https://github.com/tungten2007/CSE122_67KTPM1_BTCK_Nhom15

- Repo public, có main, dev và các feature branches. Không kết luận thiếu nhánh.
- Main có `Project_nhom15/html/sv1`, `html/sv2`, `html/sv3`, các màn Client,
  Designer, Lead/Admin và Login/Register. Không dùng bản riêng tám trang
  để kết luận toàn bộ nhóm chỉ có hai vai trò.
- PR #2: base=dev, head=feature/sv2-creatorstudio-review, state=open,
  merged=false, API reviews=[]. Main vẫn có thể đã nhận bản SV2 qua luồng
  tích hợp khác; cần dẫn PR/commit thực tế đó để đóng chuỗi minh chứng.
- `Project_nhom15/docs/team-assignment.md` đã có ánh xạ tài khoản/task/PR
  của cả ba người; ghi nhận OBS/tên thật/MSSV còn cần điền. Vì vậy thiếu
  Task trong bản riêng không đồng nghĩa nhóm chưa từng có Task.
- README gốc còn bảng thành viên và tài nguyên trống; README trong
  Project_nhom15 vẫn giới thiệu bản SV3, chứa nhiều mô tả trước tích hợp.
  Cần một hướng dẫn nộp bài hiện hành, bỏ các khai báo mâu thuẫn.
- Link Figma chung trên main khác link Figma Make ở bản SV2. File
  `Project_nhom15/figma-canva/link.txt` còn ghi thiết kế chưa hoàn thành/duyệt,
  thiếu wireframe/trạng thái AI của SV3 và lỗi QA. Đây là ghi chú ngày
  12/10, không chứng minh trạng thái Figma hiện tại; cần xác minh và cập nhật.
- Chưa xác minh live URL hoạt động, quyền xem Figma, bảng task, video OBS,
  lịch sử đóng góp theo tuần và toàn bộ luồng liên vai trò bản main.
- Log cục bộ có một commit `feat:` và ba commit gần nhất chưa theo
  Conventional Commits. Không suy từ bốn commit này ra lịch sử toàn nhóm;
  nên dùng feat:/fix:/refactor:/docs: cho commit mới, không tạo lại lịch sử giả.

## 5. Kế hoạch hoàn thiện đề xuất

1. Chốt bản nộp nhóm, live URL, màn hình và bảng screen inventory 12 cột.
2. Sửa hai lỗi responsive đã đo, nhãn form, main/heading, CTA Empty,
   Error/Retry và lỗi dưới từng trường; kiểm tra zoom 200%, Tab và tương phản.
3. Hoàn thiện Edit AI suggestion, kiểm thử đủ ba AI và luồng liên vai trò
   trên bản tích hợp; thống nhất schema/khóa LocalStorage với SV1/SV3.
4. Chuẩn hóa README, báo cáo AI và các link tài liệu theo mã hiện tại;
   đối chiếu thiết kế thật và minh chứng duyệt.
5. Review/PR/merge đúng thực tế, cập nhật task và quay OBS cho sáu màn SV2.
6. Tự luyện vấn đáp bốn nhóm câu hỏi và ít nhất ba đề sửa trực tiếp.
   Theo quy chế, phần thi Live Modification 5–10 phút không được dùng AI
   viết hộ; việc đọc thuộc bài giới thiệu không thay thế khả năng sửa mã.

Không ước lượng một điểm số cuối cùng: điểm nhóm và hệ số cá nhân còn phụ
thuộc sản phẩm tích hợp, minh chứng thật và buổi vấn đáp. Không tự cộng
chồng các mức trừ ví dụ trong tài liệu.
