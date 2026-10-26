document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  if (!khoiTaoChung()) return;

  const sapXep = document.getElementById('template-sort');
  // 5. Quản lý mẫu Brief và thử nghiệm AI bằng các quy tắc đơn giản.
  let maDangChon = duLieu.briefTemplates[0]?.id;
  const timKiem = document.getElementById('tpl-search');
  const locTrangThai = document.getElementById('status-filter');
  const locNganh = document.getElementById('cat-filter');
  const soanPrompt = document.getElementById('prompt-editor');
  function kiemTraPrompt() {
    const loi = document.getElementById('prompt-error');
    const dung = soanPrompt.value.trim().length >= 10 && soanPrompt.value.includes('{raw_input}');
    loi.textContent = dung ? '' : 'Prompt cần ít nhất 10 ký tự và biến {raw_input}.';
    soanPrompt.setAttribute('aria-invalid', String(!dung));
    if (!dung) soanPrompt.focus();
    return dung;
  }
  soanPrompt.oninput = function () { document.getElementById('prompt-error').textContent = ''; soanPrompt.setAttribute('aria-invalid', 'false'); };
  function mauDangChon() { return duLieu.briefTemplates.find(function (m) { return m.id === maDangChon; }); }
  function hienMau() {
    const danhSach = duLieu.briefTemplates.filter(function (m) {
      return (m.name + ' ' + m.description).toLowerCase().includes(timKiem.value.toLowerCase()) && (locTrangThai.value === 'all' || m.status === locTrangThai.value) && (locNganh.value === 'all' || m.category === locNganh.value);
    });
    if (sapXep.value !== 'default') danhSach.sort(function (a, b) { return a.name.localeCompare(b.name, 'vi') * (sapXep.value === 'name-desc' ? -1 : 1); });
    const vung = document.querySelector('.template-grid');
    vung.replaceChildren();
    document.querySelector('.toolbar-count strong').textContent = danhSach.length;
    document.getElementById('template-empty').hidden = danhSach.length > 0;
    danhSach.forEach(function (m) {
      const dong = saoChepMau('brief-row');
      dong.classList.toggle('selected-card', m.id === maDangChon);
      dong.classList.toggle('active-card', m.status === 'Active Template');
      dong.classList.toggle('inactive-card', m.status === 'Inactive');
      dong.classList.toggle('custom-card', m.status === 'Custom');
      dong.querySelector('h2').textContent = m.name;
      dong.querySelector('.template-category-badge').textContent = m.category;
      dong.querySelector('.badge').textContent = m.status;
      dong.querySelector('.template-desc').textContent = m.description;
      const cacMuc = dong.querySelector('.template-sections-list'); cacMuc.replaceChildren();
      (m.sections || []).forEach(function (ten) {
        const nhan = document.createElement('span'); nhan.className = 'section-pill'; nhan.textContent = ten; cacMuc.append(nhan);
      });
      const nutChon = dong.querySelector('.select-template-btn');
      nutChon.textContent = m.id === maDangChon ? 'Đang cấu hình AI' : 'Xem cấu hình Prompt';
      nutChon.classList.toggle('primary', m.id === maDangChon);
      nutChon.onclick = function () { maDangChon = m.id; hienMau(); };
      const nutBatTat = dong.querySelector('.toggle-status-btn');
      nutBatTat.textContent = m.status === 'Active Template' ? 'Tắt mẫu' : 'Bật mẫu';
      nutBatTat.onclick = function () { thuThaoTac(function () { thucHienDuLieu('toggleBriefTemplate', m.id); hienMau(); }); };
      vung.append(dong);
    });
    const mau = mauDangChon();
    document.querySelector('#ai-prompt-config-section .panel-title strong').textContent = mau?.name || 'Chưa có mẫu';
    document.querySelector('#ai-prompt-config-section .panel-title .badge').textContent = mau?.category || '';
    soanPrompt.value = mau?.promptTemplate || '';
  }
  sapXep.onchange = hienMau;
  timKiem.oninput = hienMau; locTrangThai.onchange = hienMau; locNganh.onchange = hienMau;
  document.getElementById('template-reset-btn').onclick = function () {
    sapXep.value = 'default'; timKiem.value = ''; locTrangThai.value = 'all'; locNganh.value = 'all'; hienMau();
  };
  document.querySelectorAll('.token-pill').forEach(function (nut) {
    nut.onclick = function () { soanPrompt.value += ' ' + nut.dataset.token; };
  });
  document.getElementById('save-prompt-btn').onclick = function () {
    if (!kiemTraPrompt()) return;
    if (!mauDangChon()) return;
    thuThaoTac(function () { thucHienDuLieu('saveBriefTemplate', { ...mauDangChon(), promptTemplate: soanPrompt.value.trim() }); hienThongBao('Đã lưu cấu hình Prompt.'); });
  };
  document.getElementById('reset-prompt-btn').onclick = function () {
    const mauGoc = CS_SEED().briefTemplates.find(function (m) { return m.id === maDangChon; });
    soanPrompt.value = mauGoc?.promptTemplate || 'Phân tích yêu cầu thành mục tiêu, sản phẩm bàn giao, phong cách và rủi ro: {raw_input}';
    hienThongBao('Đã điền Prompt mặc định. Bấm Lưu để áp dụng.');
  };
  document.getElementById('run-test-ai-btn').onclick = function () {
    const noiDung = document.getElementById('test-raw-input').value.trim();
    const ketQua = document.getElementById('test-output-box');
    if (!kiemTraPrompt()) return;
    const loiMoTa = document.getElementById('test-input-error');
    loiMoTa.textContent = noiDung.length < 5 ? 'Mô tả cần ít nhất 5 ký tự.' : '';
    document.getElementById('test-raw-input').setAttribute('aria-invalid', String(noiDung.length < 5));
    if (noiDung.length < 5) { document.getElementById('test-raw-input').focus(); return; }
    ketQua.classList.remove('is-hidden'); ketQua.textContent = 'Đang xử lý mô phỏng…';
    document.getElementById('run-test-ai-btn').disabled = true;
    setTimeout(function () {
      const mau = mauDangChon();
      ketQua.textContent = 'AI mô phỏng theo quy tắc (không gọi API):\nMẫu: ' + (mau?.name || '') + '\nMô tả: ' + noiDung + '\nCác mục cần hoàn thiện: ' + (mau?.sections || []).join(', ') + '\nPrompt thử nghiệm: ' + soanPrompt.value.replace('{raw_input}', noiDung);
      document.getElementById('run-test-ai-btn').disabled = false;
    }, 700);
  };
  document.getElementById('add-template-btn').onclick = function () {
    moBieuMau('brief-form', 'Thêm mẫu Brief', function (giaTri) {
      if (giaTri.name.trim().length < 3) throw loiTruong('name', 'Tên mẫu cần ít nhất 3 ký tự.');
      if (giaTri.promptTemplate.trim().length < 10) throw loiTruong('promptTemplate', 'Prompt cần ít nhất 10 ký tự và biến {raw_input}.');
      const ma = thucHienDuLieu('saveBriefTemplate', { ...giaTri, sections: ['Mục tiêu', 'Sản phẩm bàn giao', 'Phong cách', 'Thời hạn'] });
      maDangChon = ma; hienMau();
    });
  };
  hienMau();

});
