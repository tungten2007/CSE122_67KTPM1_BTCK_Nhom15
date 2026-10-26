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
      return (tab === 'all' || tab === 'unread' && !n.read || n.type === tab) && (locDuAn.value === 'all' || n.projectId === locDuAn.value);
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
      dong.querySelector('.notification-icon-wrap').className = 'notification-icon-wrap ' + (n.type || 'system');
      const nutDoc = dong.querySelector('.toggle-read-btn');
      nutDoc.textContent = n.read ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc';
      nutDoc.onclick = function () { n.read = !n.read; if (luuDuLieu()) hienDanhSach(); };
      dong.querySelector('.delete-notif-btn').onclick = function () {
        duLieu.notifications = duLieu.notifications.filter(function (m) { return m.id !== n.id; });
        if (luuDuLieu()) hienDanhSach();
      };
      const lienKet = dong.querySelector('.view-notif-link');
      lienKet.hidden = !n.link;
      // Chỉ điều hướng đến các trang đã có trong bài tập.
      lienKet.href = ['designer-dashboard.html', 'designer-moodboard.html', 'designer-version-management.html', 'profile.html', 'admin-brief-template-management.html'].includes(n.link) ? n.link : '404.html';
      lienKet.onclick = function () { n.read = true; luuDuLieu(); };
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
    duLieu.notifications.forEach(function (n) { if (n.userId === nguoiDung.id) n.read = true; });
    if (luuDuLieu()) hienDanhSach();
  };
  document.getElementById('clear-all-btn').onclick = function () {
    if (!confirm('Xóa tất cả thông báo của bạn?')) return;
    duLieu.notifications = duLieu.notifications.filter(function (n) { return n.userId !== nguoiDung.id; });
    if (luuDuLieu()) hienDanhSach();
  };
  hienDanhSach();

});
