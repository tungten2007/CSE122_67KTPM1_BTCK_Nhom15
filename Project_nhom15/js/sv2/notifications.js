document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  if (!khoiTaoChung()) return;

  // 5. Mỗi thông báo có nút đọc/chưa đọc và nút xóa riêng.
  let tab = 'all';
  const locDuAn = document.getElementById('project-filter-select');
  locDuAn.replaceChildren(new Option('Tất cả dự án', 'all'));
  duLieu.projects.forEach(function (p) { locDuAn.add(new Option(p.name, p.id)); });
  function hienDanhSach() {
    const cuaToi = duLieu.notifications.filter(function (n) { return n.userId === nguoiDung.id; });
    const danhSach = cuaToi.filter(function (n) {
      return (tab === 'all' || tab === 'unread' && !n.read || n.type === tab || tab === 'comment' && n.type === 'feedback') && (locDuAn.value === 'all' || n.projectId === locDuAn.value);
    });
    const vung = document.querySelector('.notification-list');
    vung.replaceChildren();
    document.getElementById('notification-empty').hidden = danhSach.length > 0;
    document.querySelector('[data-tab="all"]').textContent = 'Tất cả (' + cuaToi.length + ')';
    document.querySelector('[data-tab="unread"]').textContent = 'Chưa đọc (' + cuaToi.filter(function (n) { return !n.read; }).length + ')';
    danhSach.forEach(function (n) {
      const dong = saoChepMau('notification-row');
      dong.classList.toggle('unread', !n.read);
      dong.querySelector('.notification-title').textContent = n.title;
      dong.querySelector('.notification-time').textContent = new Date(n.time).toLocaleString('vi-VN');
      dong.querySelector('.notification-msg').textContent = n.message;
      dong.querySelector('.notification-icon-wrap').className = 'notification-icon-wrap ' + (n.type === 'feedback' ? 'comment' : n.type || 'system');
      const nutDoc = dong.querySelector('.toggle-read-btn');
      nutDoc.textContent = n.read ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc';
      nutDoc.onclick = function () { thuThaoTac(function () { thucHienDuLieu('markNotification', n.id, !n.read); hienDanhSach(); }); };
      dong.querySelector('.delete-notif-btn').onclick = function () {
        thuThaoTac(function () { thucHienDuLieu('deleteNotification', n.id); hienDanhSach(); });
      };
      const lienKet = dong.querySelector('.view-notif-link');
      lienKet.dataset.id = n.id;
      lienKet.hidden = !n.link;
      lienKet.href = lienKetThongBao(n);
      lienKet.onclick = function (e) { if (!thuThaoTac(function () { thucHienDuLieu('markNotification', n.id, true); })) e.preventDefault(); };
      vung.append(dong);
    });
    capNhatThongBao();
  }
  document.querySelectorAll('.filter-tab').forEach(function (nut) {
    nut.onclick = function () {
      tab = nut.dataset.tab;
      document.querySelectorAll('.filter-tab').forEach(function (b) { b.classList.toggle('active', b === nut); });
      hienDanhSach();
    };
  });
  locDuAn.onchange = hienDanhSach;
  document.getElementById('notification-reset-btn').onclick = function () {
    locDuAn.value = 'all'; document.querySelector('[data-tab="all"]').onclick();
  };
  document.getElementById('mark-all-read-btn').onclick = function () {
    thuThaoTac(function () { thucHienDuLieu('markAllNotifications'); hienDanhSach(); });
  };
  document.getElementById('clear-all-btn').onclick = function () {
    if (!confirm('Xóa tất cả thông báo của bạn?')) return;
    thuThaoTac(function () { thucHienDuLieu('clearAllNotifications'); hienDanhSach(); });
  };
  hienDanhSach();

});
