document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  if (!khoiTaoChung()) return;

  // Các nút riêng của cổng điều hướng.
  document.getElementById('reset-data-btn').onclick = function () {
    if (confirm('Khôi phục toàn bộ dữ liệu mẫu?')) { Object.assign(duLieu, CS_SEED()); if (luuDuLieu()) hienThongBao('Đã khôi phục dữ liệu mẫu.'); }
  };
  document.querySelectorAll('.screen-card a').forEach(function (link) {
    link.onclick = function (e) { if (!chonVaiTro(link.getAttribute('href').startsWith('admin-') ? 'Admin' : 'Designer')) e.preventDefault(); };
  });
  document.querySelectorAll('.role-btn').forEach(function (nut) {
    nut.onclick = function () {
      const vaiTro = nut.dataset.role;
      if (chonVaiTro(vaiTro)) location.href = trangChu(vaiTro);
    };
  });

});
