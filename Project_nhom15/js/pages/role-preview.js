App.init('rolePreview',()=>{
 const A=App,client=A.user.role==='Client';
 const names=client?['client-project-overview.html','client-creative-brief.html','client-review-versions.html']:['designer-dashboard.html','designer-moodboard.html','designer-version-management.html'];
 A.$('#main').innerHTML=A.header('KHUNG ĐIỀU HƯỚNG DÙNG CHUNG','Phân hệ '+A.roleName[A.user.role],'Đã chuyển phiên demo sang '+A.user.name)+`<section class="panel"><span class="badge yellow">Chưa tích hợp</span><h2 style="margin-top:16px">Chờ ghép màn hình của ${client?'SV1':'SV2'}</h2><p class="muted" style="margin:16px 0">Đây là trang thông báo thuộc khung điều hướng SV3, không phải giao diện nghiệp vụ đã hoàn thành. Chọn Trưởng nhóm hoặc Quản trị viên ở đầu trang để dùng các màn hình đã có.</p><ul>${names.map(n=>`<li><code>${n}</code></li>`).join('')}</ul><p class="note-small">Khi có file của nhóm, cập nhật Navigation.integrations để điều hướng tới phân hệ thật.</p></section>`;
});
