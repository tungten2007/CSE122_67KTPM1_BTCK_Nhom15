'use strict';

// Dùng chung cho các trang: dữ liệu mẫu, lưu trữ, điều hướng và biểu mẫu.
// File riêng của trang gọi khoiTaoChung() sau DOMContentLoaded rồi xử lý phần của mình.
let duLieu, nguoiDung, duAn;
let loiDocDuLieu = '';
const tenVaiTro = { Designer: 'Nhà thiết kế', Admin: 'Quản trị viên', Lead: 'Trưởng nhóm', Client: 'Khách hàng' };

// Adapter giao diện: nghiệp vụ của trang dùng chung API dữ liệu.
function docDuLieu() {
  const ketQua = CreatorStudioAPI.load();
  loiDocDuLieu = ketQua.ok ? '' : ketQua.error.message;
  return ketQua.data;
}

// Giao diện gọi lệnh của Store; không ghi đè toàn bộ kho bằng bản chụp cũ.
function thucHienDuLieu(tenLenh, ...thamSo) {
  const ketQua = CreatorStudioAPI.run(tenLenh, ...thamSo);
  if (!ketQua.ok) {
    const canhBao = document.getElementById('data-sync-notice');
    if (canhBao && ketQua.error.code === 'STALE_DATA') canhBao.hidden = false;
    throw new Error(ketQua.error.message);
  }
  duLieu = ketQua.data;
  nguoiDung = duLieu.users.find(u => u.id === nguoiDung.id) || Navigation.current(duLieu.users);
  duAn = duLieu.projects.find(p => p.id === duAn.id) || duLieu.projects[0] || duAn;
  capNhatTaiKhoan(); capNhatThongBao();
  return ketQua.value;
}

function thuThaoTac(khiThucHien) {
  try { khiThucHien(); return true; }
  catch (loi) { hienThongBao(loi.message); return false; }
}

// Giữ vị trí bàn phím khi danh sách được vẽ lại sau một thao tác.
function giuTieuDiem(veLai) {
  const truoc = document.activeElement;
  const khoa = truoc?.getAttribute('data-focus-key');
  veLai();
  if (!khoa || truoc.isConnected) return;
  const thayThe = Array.from(document.querySelectorAll('[data-focus-key]')).find(function (nut) {
    return nut.getAttribute('data-focus-key') === khoa && !nut.disabled && nut.getClientRects().length;
  });
  (thayThe || document.getElementById('main')).focus();
}

// 3. Một số hàm nhỏ để tránh viết lại cùng thao tác nhiều lần.
function hienThongBao(noiDung) {
  const hop = document.getElementById('toast');
  if (!hop) { alert(noiDung); return; }
  hop.textContent = noiDung;
  hop.classList.add('visible');
  setTimeout(function () { hop.classList.remove('visible'); }, 3500);
}

function trangChu(vaiTro) { return Navigation.home(vaiTro); }

function doiTaiKhoan(ma) {
  thuThaoTac(function () { location.href = Navigation.switchAccount(ma); });
}

function lienKetThongBao(thongBao) {
  const duongDan = thongBao.link || '';
  const choPhep = new Set(Object.values(Navigation.routes).map(r => r[0]));
  let lienKet;
  try {
    const ten = duongDan.split('?')[0];
    const daChuan = ten.startsWith('html/') ? duongDan :
      (Object.values(Navigation.routes).find(r => r[0].endsWith('/' + ten))?.[0] || '') + (duongDan.includes('?') ? '?' + duongDan.split('?').slice(1).join('?') : '');
    lienKet = new URL(daChuan, document.baseURI);
    if (!choPhep.has(daChuan.split('?')[0]) || lienKet.origin !== location.origin) return 'html/sv3/404.html';
    if (thongBao.projectId) lienKet.searchParams.set('project', thongBao.projectId);
    return lienKet.href;
  } catch { return 'html/sv3/404.html'; }
}

function hienDieuHuong() {
  document.querySelector('.sidebar .nav-caption').textContent = 'KHÔNG GIAN ' + tenVaiTro[nguoiDung.role].toUpperCase();
  const vung = document.querySelector('.sidebar nav');
  vung.setAttribute('aria-label', 'Điều hướng chính');
  vung.replaceChildren();
  Object.values(Navigation.routes).filter(r => r[3] === '*' || r[3] === nguoiDung.role).forEach(function (r) {
    const a = document.createElement('a'); a.href = r[0]; a.className = 'nav-link';
    const bieuTuong = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    bieuTuong.setAttribute('viewBox', '0 0 24 24'); bieuTuong.setAttribute('fill', 'none');
    bieuTuong.setAttribute('stroke', 'currentColor'); bieuTuong.setAttribute('stroke-width', '1.8');
    bieuTuong.setAttribute('aria-hidden', 'true'); bieuTuong.classList.add('icon');
    const net = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const netVe = { grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
      spark: 'm12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z',
      file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5',
      users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3a4 4 0 0 1 0 8M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
      settings: 'M4 6h16M4 12h16M4 18h16M8 3v6M16 9v6M10 15v6',
      check: 'm5 12 4 4L19 6', bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4' };
    net.setAttribute('d', netVe[r[2]] || netVe.file); bieuTuong.append(net);
    const span = document.createElement('span'); span.textContent = r[1]; a.append(bieuTuong, span);
    if (new URL(r[0], document.baseURI).pathname === location.pathname) {
      a.classList.add('active'); a.setAttribute('aria-current', 'page');
    }
    vung.append(a);
  });
  const chon = document.getElementById('role-switch');
  chon.replaceChildren();
  Object.entries(Navigation.roles).forEach(function ([vaiTro, nhan]) {
    const nhom = document.createElement('optgroup'); nhom.label = nhan;
    duLieu.users.filter(u => u.active && u.role === vaiTro).forEach(function (u) { nhom.append(new Option(u.name + ' · ' + u.email, u.id)); });
    chon.append(nhom);
  });
  chon.value = nguoiDung.id;
  chon.setAttribute('aria-label', 'Chuyển tài khoản demo');
  chon.onchange = function () { doiTaiKhoan(chon.value); };
  const dangXuat = document.createElement('button'); dangXuat.type = 'button';
  dangXuat.className = 'text-light'; dangXuat.id = 'logout'; dangXuat.textContent = 'Đăng xuất';
  dangXuat.onclick = Navigation.logout;
  document.querySelector('.sidebar-bottom').append(dangXuat);
}

function coTheSuaDuAn() {
  if (!duAn.id) { hienThongBao('Hãy tạo dự án ở trang Tổng quan dự án trước.'); return false; }
  if (duAn.archived) { hienThongBao('Dự án đã lưu trữ, chỉ được xem.'); return false; }
  return true;
}

// Mỗi danh sách có một mẫu HTML riêng, chỉ sao chép mẫu và điền textContent.
function saoChepMau(id) {
  return document.getElementById(id).content.firstElementChild.cloneNode(true);
}

// Lỗi HTML5 và lỗi nghiệp vụ đều hiển thị cạnh trường nhập.
function khoiTaoKiemTraForm(form) {
  form.noValidate = true;
  const cacTruong = Array.from(form.querySelectorAll('input')).concat(Array.from(form.querySelectorAll('select')), Array.from(form.querySelectorAll('textarea')));
  cacTruong.forEach(function (truong, i) {
    if (truong.getAttribute('type') === 'hidden' || truong.loiHienThi) return;
    if (!truong.id) truong.id = (form.id || 'modal-form') + '-control-' + i;
    const nhan = truong.closest('label');
    if (nhan) nhan.setAttribute('for', truong.id);
    const loi = document.createElement('span');
    loi.className = 'field-error';
    const ma = (form.getAttribute('id') || 'modal-form') + '-field-error-' + i;
    loi.setAttribute('id', ma); loi.setAttribute('role', 'alert'); loi.hidden = true;
    truong.setAttribute('aria-describedby', ((truong.getAttribute('aria-describedby') || '') + ' ' + ma).trim());
    (truong.parentElement || truong.parent).append(loi);
    truong.loiHienThi = loi;
    truong.addEventListener('input', function () {
      loi.textContent = ''; loi.hidden = true; truong.setAttribute('aria-invalid', 'false');
    });
    truong.addEventListener('invalid', function (e) {
      e.preventDefault();
      const hopLe = truong.validity;
      let thongBao = truong.validationMessage;
      if (hopLe.valueMissing) thongBao = 'Vui lòng điền trường này.';
      else if (hopLe.typeMismatch) thongBao = truong.getAttribute('type') === 'email' ? 'Nhập địa chỉ email hợp lệ.' : 'Nhập đường dẫn hợp lệ.';
      else if (hopLe.tooShort) thongBao = 'Nhập ít nhất ' + truong.getAttribute('minlength') + ' ký tự.';
      else if (hopLe.patternMismatch) thongBao = 'Dữ liệu chưa đúng định dạng yêu cầu.';
      loi.textContent = thongBao; loi.hidden = false;
      truong.setAttribute('aria-invalid', 'true');
    });
  });
}

function xoaLoiForm(form) {
  form.querySelectorAll('.field-error').forEach(function (e) { e.textContent = ''; e.hidden = true; });
  form.querySelectorAll('[aria-invalid]').forEach(function (e) { e.setAttribute('aria-invalid', 'false'); });
  const loiChung = form.querySelector('.form-error');
  if (loiChung) loiChung.textContent = '';
}

function kiemTraBieuMau(form) {
  xoaLoiForm(form);
  if (form.checkValidity && !form.checkValidity()) {
    form.querySelector('[aria-invalid="true"]')?.focus();
    return false;
  }
  const truongTrong = Array.from(form.querySelectorAll('[required]')).find(function (e) { return !e.disabled && !e.value.trim(); });
  if (truongTrong) {
    baoLoiTruong(form, truongTrong.getAttribute('name'), 'Vui lòng điền nội dung, không chỉ khoảng trắng.');
    return false;
  }
  return true;
}

function baoLoiTruong(form, ten, noiDung) {
  const truong = form.elements[ten];
  if (!truong) return;
  if (truong.loiHienThi) {
    truong.loiHienThi.textContent = noiDung; truong.loiHienThi.hidden = false;
  }
  truong.setAttribute('aria-invalid', 'true'); truong.focus();
}

function loiTruong(ten, noiDung) {
  const loi = new Error(noiDung); loi.truong = ten; return loi;
}

function moBieuMau(idMau, tieuDe, khiLuu) {
  const hop = document.getElementById('dialog');
  const nutMo = document.activeElement;
  hop.querySelector('h2').textContent = tieuDe;
  hop.addEventListener('close', function () {
    if (nutMo?.isConnected) nutMo.focus(); else document.getElementById('main').focus();
  }, { once: true });
  const form = saoChepMau(idMau);
  khoiTaoKiemTraForm(form);
  hop.querySelector('.modal-body').replaceChildren(form);
  hop.querySelector('[data-close]').onclick = function () { hop.close(); };
  form.onsubmit = async function (suKien) {
    suKien.preventDefault();
    if (!kiemTraBieuMau(form)) return;
    const nutLuu = form.querySelector('[type="submit"]');
    nutLuu.disabled = true;
    try {
      const thongTin = Object.fromEntries(new FormData(form));
      await khiLuu(thongTin, form);
      hop.close();
    } catch (loi) {
      form.querySelector('.form-error').textContent = loi.message;
      if (loi.truong) baoLoiTruong(form, loi.truong, loi.message);
    } finally { nutLuu.disabled = false; }
  };
  hop.showModal();
  return form;
}

function capNhatThongBao() {
  const soLuong = duLieu.notifications.filter(function (n) { return n.userId === nguoiDung.id && !n.read; }).length;
  const nhan = document.querySelector('.notification-badge');
  if (nhan) { nhan.textContent = soLuong; nhan.hidden = soLuong === 0; }
}

function capNhatTaiKhoan() {
  const luaChon = document.querySelector('#role-switch option:checked');
  if (luaChon && luaChon.value === nguoiDung.id) luaChon.textContent = nguoiDung.name + ' · ' + nguoiDung.email;
  document.querySelectorAll('a[href="html/sv2/profile.html"]').forEach(function (e) { e.title = 'Hồ sơ ' + nguoiDung.name; });
  document.querySelectorAll('[data-user-name]').forEach(function (e) { e.textContent = nguoiDung.name; });
  document.querySelectorAll('[data-user-role]').forEach(function (e) { e.textContent = (e.dataset.rolePrefix || '') + tenVaiTro[nguoiDung.role]; });
  document.querySelectorAll('[data-avatar]').forEach(function (e) {
    const anh = e.querySelector('img');
    const chu = e.querySelector('span');
    chu.textContent = nguoiDung.avatarText || nguoiDung.name.slice(0, 2).toUpperCase();
    anh.hidden = !nguoiDung.avatarUrl;
    chu.hidden = !!nguoiDung.avatarUrl;
    if (nguoiDung.avatarUrl) anh.src = nguoiDung.avatarUrl;
    anh.alt = 'Ảnh đại diện của ' + nguoiDung.name;
    if (e.tagName === 'A') e.setAttribute('aria-label', chu.textContent + ' — Hồ sơ cá nhân ' + nguoiDung.name);
    anh.onerror = function () { anh.hidden = true; chu.hidden = false; };
  });
}


// Khởi tạo dữ liệu và giao diện dùng chung khi HTML đã sẵn sàng.
function khoiTaoChung() {
  duLieu = docDuLieu();
  const canhBaoDuLieu = document.getElementById('data-error');
  if (canhBaoDuLieu) {
    canhBaoDuLieu.hidden = !loiDocDuLieu;
    document.getElementById('data-retry-btn').onclick = function () { location.reload(); };
  }
  nguoiDung = Navigation.current(duLieu.users);
  const maDuAn = new URLSearchParams(location.search).get('project');
  if (maDuAn && duLieu.projects.some(p => p.id === maDuAn)) sessionStorage.setItem('cs-project', maDuAn);
  duAn = duLieu.projects.find(p => p.id === sessionStorage.getItem('cs-project')) || duLieu.projects[0] || { id: '', name: 'Chưa có dự án', description: '', code: '', archived: false };
  if (duAn.id) sessionStorage.setItem('cs-project', duAn.id);
  const thongBaoDongBo = document.getElementById('data-sync-notice');
  if (thongBaoDongBo && typeof window !== 'undefined') {
    document.getElementById('data-sync-reload').onclick = function () { location.reload(); };
    window.addEventListener('storage', function (e) {
      if (CreatorStudioAPI.keys.includes(e.key) && e.oldValue !== e.newValue) thongBaoDongBo.hidden = false;
    });
  }
  // 4. Menu, vai trò, dự án và thông tin người dùng ở đầu trang.
  const tenTrang = location.pathname.split('/').pop();
  const canDesigner = tenTrang.startsWith('designer-');
  const canAdmin = tenTrang.startsWith('admin-');
  if ((canDesigner && nguoiDung.role !== 'Designer') || (canAdmin && nguoiDung.role !== 'Admin')) {
    location.replace(new URL('html/sv3/404.html?code=403', document.baseURI).href);
    return false;
  }

  if (document.getElementById('role-switch')) {
    hienDieuHuong();
    const chonDuAn = document.getElementById('project-select');
    chonDuAn.replaceChildren();
    duLieu.projects.forEach(function (p) { chonDuAn.add(new Option(p.name, p.id)); });
    chonDuAn.value = duAn.id;
    chonDuAn.onchange = function () { sessionStorage.setItem('cs-project', chonDuAn.value); const url = new URL(location.href); url.searchParams.set('project', chonDuAn.value); url.searchParams.delete('version'); location.href = url.href; };
    document.querySelector('.sidebar-project strong').textContent = duAn.name;
    document.querySelector('.sidebar-project small').textContent = duAn.description;
    document.querySelector('.side-tag').textContent = duAn.archived ? 'Đã lưu trữ' : duAn.code;

    document.querySelector('.brand').href = trangChu(nguoiDung.role);
    if (duAn.archived) document.getElementById('archive-notice').hidden = false;

    const menu = document.querySelector('.menu-toggle');
    const manChe = document.querySelector('.sidebar-shade');
    const noiDung = document.querySelector('.workspace');
    const thanhBen = document.querySelector('.sidebar');
    const manHinhNho = matchMedia('(max-width: 760px)');
    thanhBen.inert = manHinhNho.matches;
    thanhBen.setAttribute('aria-hidden', String(manHinhNho.matches));
    thanhBen.id = 'global-sidebar'; menu.setAttribute('aria-controls', 'global-sidebar'); menu.setAttribute('aria-expanded', 'false');
    function dongMenu() {
      const dangMo = document.body.classList.contains('menu-open');
      document.body.classList.remove('menu-open'); manChe.hidden = true; menu.setAttribute('aria-expanded', 'false');
      noiDung.inert = false; thanhBen.inert = manHinhNho.matches;
      thanhBen.setAttribute('aria-hidden', String(manHinhNho.matches));
      if (dangMo) { if (manHinhNho.matches) menu.focus(); else document.getElementById('main').focus(); }
    }
    menu.onclick = function () {
      document.body.classList.add('menu-open'); manChe.hidden = false; menu.setAttribute('aria-expanded', 'true');
      noiDung.inert = true; thanhBen.inert = false; thanhBen.setAttribute('aria-hidden', 'false');
      document.querySelector('.mobile-close').focus();
    };
    document.querySelector('.mobile-close').onclick = dongMenu;
    manChe.onclick = dongMenu;
    document.addEventListener('keydown', function (e) {
      if (!document.body.classList.contains('menu-open') || document.querySelector('dialog[open]')) return;
      if (e.key === 'Escape') { e.preventDefault(); dongMenu(); }
      if (e.key === 'Tab') {
        const nut = Array.from(thanhBen.querySelectorAll('a[href], button:not(:disabled), select')).filter(n => n.getClientRects().length);
        if (e.shiftKey && document.activeElement === nut[0]) { e.preventDefault(); nut.at(-1).focus(); }
        else if (!e.shiftKey && document.activeElement === nut.at(-1)) { e.preventDefault(); nut[0].focus(); }
      }
    });
    if (typeof matchMedia === 'function') {
      manHinhNho.addEventListener('change', dongMenu);
    }
    document.getElementById('demo-tools-btn').onclick = function () {
      const form = moBieuMau('tools-form', 'Công cụ dữ liệu demo', function () { });
      form.querySelector('[data-reset]').onclick = function () {
        if (confirm('Khôi phục toàn bộ dữ liệu mẫu của nhóm?')) thuThaoTac(function () { thucHienDuLieu('reset'); location.reload(); });
      };
      form.querySelector('[data-export]').onclick = function () {
        const link = document.createElement('a');
        const url = URL.createObjectURL(new Blob([JSON.stringify(duLieu, null, 2)], { type: 'application/json' }));
        link.href = url; link.download = 'creatorstudio-data.json'; link.click(); URL.revokeObjectURL(url);
      };
    };
    capNhatTaiKhoan();
    capNhatThongBao();
  }

  return true;
}
