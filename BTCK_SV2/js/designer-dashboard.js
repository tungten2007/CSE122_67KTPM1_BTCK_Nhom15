document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  if (!khoiTaoChung()) return;

  const sapXep = document.getElementById('task-sort');
  // 5. Danh sách công việc: lọc mảng rồi điền từng công việc vào mẫu HTML.
  const timKiem = document.getElementById('task-search');
  const locTrangThai = document.getElementById('status-filter');
  const locUuTien = document.getElementById('priority-filter');
  let cheDo = 'normal';
  function laViecGap(t) {
    const mocHan = Date.now() + Number(duLieu.settings.warningDays || 0) * 86400000;
    return t.status !== 'done' && (t.urgent || t.priority === 'high' || new Date(t.due + 'T23:59:59').getTime() <= mocHan);
  }

  function hienCongViec() {
    const cuaToi = duLieu.tasks.filter(function (t) { return t.projectId === duAn.id && t.assignee === nguoiDung.id; });
    const danhSach = cuaToi.filter(function (t) {
      const dungTen = (t.title + ' ' + t.description).toLowerCase().includes(timKiem.value.trim().toLowerCase());
      return dungTen && (locTrangThai.value === 'all' || t.status === locTrangThai.value) && (locUuTien.value === 'all' || t.priority === locUuTien.value) && (cheDo !== 'urgent' || laViecGap(t));
    });
    if (sapXep.value !== 'default') danhSach.sort(function (a, b) { return a.title.localeCompare(b.title, 'vi') * (sapXep.value === 'name-desc' ? -1 : 1); });
    const vung = document.querySelector('.task-list');
    vung.replaceChildren();
    document.getElementById('task-empty').hidden = cheDo !== 'empty' && danhSach.length > 0 || cheDo === 'loading' || cheDo === 'error';
    document.getElementById('task-loading').hidden = cheDo !== 'loading';
    document.getElementById('task-error').hidden = cheDo !== 'error';
    document.querySelector('.toolbar-count strong').textContent = cheDo === 'empty' || cheDo === 'loading' || cheDo === 'error' ? 0 : danhSach.length;
    if (cheDo !== 'empty' && cheDo !== 'loading' && cheDo !== 'error') danhSach.forEach(function (t) {
      const dong = saoChepMau('task-row');
      dong.classList.toggle('urgent', laViecGap(t));
      const tieuDe = dong.querySelector('[data-task-title]');
      tieuDe.textContent = t.title;
      tieuDe.classList.toggle('task-title-done', t.status === 'done');
      dong.querySelector('.task-item-desc').textContent = t.description || '';
      dong.querySelector('[data-task-priority]').textContent = { high: 'Cao', medium: 'Vừa', low: 'Thấp' }[t.priority];
      dong.querySelector('[data-task-priority]').className = 'badge ' + t.priority;
      dong.querySelector('[data-task-type]').textContent = t.type || 'Thiết kế';
      dong.querySelector('[data-task-urgent]').hidden = !laViecGap(t);
      dong.querySelector('.due-badge').textContent = t.due ? new Date(t.due + 'T00:00:00').toLocaleDateString('vi-VN') : 'Chưa có hạn';
      const trangThai = dong.querySelector('.task-status-select');
      const hoanThanh = dong.querySelector('.task-item-check');
      trangThai.value = t.status;
      hoanThanh.checked = t.status === 'done';
      trangThai.disabled = hoanThanh.disabled = !!duAn.archived;
      function doiTrangThai(giaTri) {
        if (!coTheSuaDuAn()) return;
        t.status = giaTri;
        if (luuDuLieu()) hienCongViec();
      }
      trangThai.onchange = function () { doiTrangThai(trangThai.value); };
      hoanThanh.onchange = function () { doiTrangThai(hoanThanh.checked ? 'done' : 'doing'); };
      vung.append(dong);
    });
    const thongKe = document.querySelectorAll('.kpi-info strong');
    thongKe[0].textContent = cuaToi.filter(function (t) { return t.status === 'todo' || t.status === 'doing'; }).length;
    thongKe[1].textContent = cuaToi.filter(laViecGap).length;
    thongKe[2].textContent = duLieu.versions.filter(function (v) { return v.projectId === duAn.id && ['Internal Review', 'Client Review'].includes(v.status); }).length;
    thongKe[3].textContent = duLieu.projects.filter(function (p) { return !p.archived && duLieu.tasks.some(function (t) { return t.projectId === p.id && t.assignee === nguoiDung.id; }); }).length;
    document.querySelector('.urgent-banner').hidden = Number(thongKe[1].textContent) === 0;
    document.querySelector('.urgent-banner h2').textContent = 'Có ' + thongKe[1].textContent + ' nhiệm vụ cần ưu tiên.';
    document.querySelector('.urgent-banner p').textContent = 'Kiểm tra hạn và tiến độ của dự án ' + duAn.name + '.';
    const viecGap = cuaToi.find(laViecGap);
    document.querySelector('.ai-insight-body').textContent = viecGap ? 'Ưu tiên ' + viecGap.title + ', hạn ' + viecGap.due + '. Xem phong cách tại trang Moodboard AI-3.' : 'Không có nhiệm vụ gấp trong dự án này.';
    document.querySelector('#task-queue .panel-title p').textContent = 'Danh sách công việc của dự án ' + duAn.name;
  }
  sapXep.onchange = hienCongViec;
  timKiem.oninput = hienCongViec;
  locTrangThai.onchange = hienCongViec;
  locUuTien.onchange = hienCongViec;
  document.getElementById('task-reset-btn').onclick = function () {
    sapXep.value = 'default'; timKiem.value = ''; locTrangThai.value = 'all'; locUuTien.value = 'all';
    document.querySelector('[data-mode="normal"]').onclick();
  };
  document.getElementById('task-retry-btn').onclick = function () { document.querySelector('[data-mode="normal"]').onclick(); };
  document.querySelectorAll('.state-btn').forEach(function (nut) {
    nut.onclick = function () {
      cheDo = nut.dataset.mode;
      document.querySelectorAll('.state-btn').forEach(function (b) { b.classList.toggle('active', b === nut); });
      hienCongViec();
    };
  });
  document.getElementById('add-task-btn').onclick = function () {
    if (!coTheSuaDuAn()) return;
    const form = moBieuMau('task-form', 'Thêm nhiệm vụ', function (giaTri) {
      if (!coTheSuaDuAn()) throw new Error('Dự án đã lưu trữ.');
      if (giaTri.title.trim().length < 3) throw loiTruong('title', 'Tên công việc cần ít nhất 3 ký tự.');
      duLieu.tasks.push({ id: 'CS-' + Date.now(), projectId: duAn.id, title: giaTri.title.trim(), description: giaTri.description, priority: giaTri.priority, assignee: giaTri.assignee, due: giaTri.due, status: 'todo', type: 'Thiết kế' });
      if (!luuDuLieu()) throw new Error('Chưa lưu được công việc.');
      hienCongViec(); hienThongBao('Đã thêm nhiệm vụ.');
    });
    duLieu.users.filter(function (u) { return u.active && ['Designer', 'Lead'].includes(u.role); }).forEach(function (u) { form.elements.assignee.add(new Option(u.name, u.id)); });
    form.elements.assignee.value = nguoiDung.id;
    form.elements.due.value = new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10);
  };
  hienCongViec();

});
