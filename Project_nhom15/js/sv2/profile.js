document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  if (!khoiTaoChung()) return;

  // 5. Hồ sơ: điền dữ liệu vào form, bật chế độ sửa rồi lưu.
  const formHoSo = document.getElementById('profile-info-form');
  const nutSua = document.getElementById('toggle-edit-btn');
  const nutHuy = document.getElementById('cancel-edit-btn');
  const nutLuu = document.getElementById('save-profile-btn');
  khoiTaoKiemTraForm(formHoSo);
  khoiTaoKiemTraForm(document.getElementById('change-password-form'));

  function hienHoSo(dangSua) {
    xoaLoiForm(formHoSo);
    for (const ten of ['name', 'email', 'title', 'avatarText', 'bio', 'avatarUrl']) {
      formHoSo.elements[ten].value = nguoiDung[ten] || '';
      formHoSo.elements[ten].disabled = !dangSua;
    }
    nutSua.textContent = dangSua ? 'Hủy chỉnh sửa' : 'Chỉnh sửa hồ sơ';
    nutLuu.hidden = !dangSua;
    nutHuy.hidden = !dangSua;
    document.querySelector('.profile-contact').textContent = nguoiDung.email + ' · ' + (nguoiDung.title || 'Chưa có chức danh');
    document.querySelector('.profile-bio').textContent = nguoiDung.bio || 'Chưa có giới thiệu.';
    document.getElementById('profile-user-id').textContent = nguoiDung.id;
    const congViec = duLieu.tasks.filter(function (t) { return t.assignee === nguoiDung.id; });
    const phienBan = duLieu.versions.filter(function (v) { return v.author === nguoiDung.id; });
    const thongKe = document.querySelectorAll('.profile-stat-box strong');
    thongKe[0].textContent = duLieu.projects.filter(function (p) {
      return !p.archived && (congViec.some(function (t) { return t.projectId === p.id; }) || phienBan.some(function (v) { return v.projectId === p.id; }));
    }).length;
    thongKe[1].textContent = congViec.filter(function (t) { return t.status === 'done'; }).length;
    thongKe[2].textContent = phienBan.length;
    capNhatTaiKhoan();
  }

  nutSua.onclick = function () { hienHoSo(formHoSo.elements.name.disabled); };
  nutHuy.onclick = function () { hienHoSo(false); };
  formHoSo.onsubmit = function (e) {
    e.preventDefault();
    if (!kiemTraBieuMau(formHoSo)) return;
    const ten = formHoSo.elements.name.value.trim();
    const email = formHoSo.elements.email.value.trim();
    const anh = formHoSo.elements.avatarUrl.value.trim();
    if (ten.length < 2) { baoLoiTruong(formHoSo, 'name', 'Họ tên cần ít nhất 2 ký tự.'); return; }
    if (anh && !/^https?:\/\//i.test(anh)) { baoLoiTruong(formHoSo, 'avatarUrl', 'Ảnh đại diện phải là đường dẫn http hoặc https.'); return; }
    if (duLieu.users.some(function (u) { return u.id !== nguoiDung.id && u.email.toLowerCase() === email.toLowerCase(); })) {
      baoLoiTruong(formHoSo, 'email', 'Email đã được tài khoản khác sử dụng.'); return;
    }
    thuThaoTac(function () {
      const thayDoi = { name: ten, email: email };
      for (const tenTruong of ['title', 'avatarText', 'bio', 'avatarUrl']) thayDoi[tenTruong] = formHoSo.elements[tenTruong].value.trim();
      thucHienDuLieu('updateProfile', thayDoi);
      hienHoSo(false); hienThongBao('Đã lưu hồ sơ.');
    });
  };

  // Đổi mật khẩu chỉ là mô phỏng cho bài tập frontend.
  document.getElementById('change-password-form').onsubmit = function (e) {
    e.preventDefault();
    const form = e.target;
    if (!kiemTraBieuMau(form)) return;
    const loi = document.getElementById('password-error');
    const hienTai = form.elements.currentPassword.value;
    const moi = form.elements.newPassword.value;
    if (hienTai !== (nguoiDung.demoPassword || 'demo123')) { loi.textContent = 'Mật khẩu hiện tại không đúng.'; baoLoiTruong(form, 'currentPassword', loi.textContent); return; }
    if (moi.length < 6) { loi.textContent = 'Mật khẩu mới cần ít nhất 6 ký tự.'; baoLoiTruong(form, 'newPassword', loi.textContent); return; }
    if (moi !== form.elements.confirmPassword.value) { loi.textContent = 'Mật khẩu xác nhận không khớp.'; baoLoiTruong(form, 'confirmPassword', loi.textContent); return; }
    thuThaoTac(function () { thucHienDuLieu('updateProfile', { ...nguoiDung, currentPassword: hienTai, newPassword: moi, confirmPassword: form.elements.confirmPassword.value }); loi.textContent = ''; form.reset(); hienThongBao('Đã đổi mật khẩu demo.'); });
  };
  hienHoSo(false);

});
