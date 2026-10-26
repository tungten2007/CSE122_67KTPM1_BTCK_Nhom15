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

function luuDuLieu() {
  const ketQua = CreatorStudioAPI.save(duLieu);
  if (!ketQua.ok) hienThongBao(ketQua.error.message);
  return ketQua.ok;
}

// 3. Một số hàm nhỏ để tránh viết lại cùng thao tác nhiều lần.
function hienThongBao(noiDung) {
  const hop = document.getElementById('toast');
  if (!hop) { alert(noiDung); return; }
  hop.textContent = noiDung;
  hop.classList.add('visible');
  setTimeout(function () { hop.classList.remove('visible'); }, 3500);
}

function trangChu(vaiTro) {
  if (vaiTro === 'Admin') return 'admin-brief-template-management.html';
  if (vaiTro === 'Designer') return 'designer-dashboard.html';
  return 'profile.html';
}

function chonVaiTro(vaiTro) {
  const u = duLieu.users.find(function (u) { return u.active && u.role === vaiTro; });
  if (!u) { hienThongBao('Không có tài khoản hoạt động cho vai trò này.'); return false; }
  const ketQua = CreatorStudioAPI.setCurrentUser(u);
  if (!ketQua.ok) { hienThongBao(ketQua.error.message); return false; }
  sessionStorage.setItem('cs-user', u.id);
  return true;
}
function doiVaiTro(vaiTro) {
  if (chonVaiTro(vaiTro)) location.href = trangChu(vaiTro);
}

function coTheSuaDuAn() {
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
  hop.querySelector('h2').textContent = tieuDe;
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
  document.querySelectorAll('[data-user-name]').forEach(function (e) { e.textContent = nguoiDung.name; });
  document.querySelectorAll('[data-user-role]').forEach(function (e) { e.textContent = (e.dataset.rolePrefix || '') + tenVaiTro[nguoiDung.role]; });
  document.querySelectorAll('[data-avatar]').forEach(function (e) {
    const anh = e.querySelector('img');
    const chu = e.querySelector('span');
    chu.textContent = nguoiDung.avatarText || nguoiDung.name.slice(0, 2).toUpperCase();
    anh.hidden = !nguoiDung.avatarUrl;
    chu.hidden = !!nguoiDung.avatarUrl;
    if (nguoiDung.avatarUrl) anh.src = nguoiDung.avatarUrl;
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
  let maNguoiDung = sessionStorage.getItem('cs-user');
  if (!maNguoiDung) {
    maNguoiDung = CreatorStudioAPI.getCurrentUser().data?.id;
  }
  nguoiDung = duLieu.users.find(function (u) { return u.id === maNguoiDung && u.active; }) || duLieu.users.find(function (u) { return u.active; });
  duAn = duLieu.projects.find(function (p) { return p.id === sessionStorage.getItem('cs-project'); }) || duLieu.projects[0];
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
    location.replace('404.html?code=403');
    return false;
  }

  if (document.getElementById('role-switch')) {
    document.getElementById('role-switch').value = nguoiDung.role;
    document.getElementById('role-switch').onchange = function (e) { doiVaiTro(e.target.value); };
    const chonDuAn = document.getElementById('project-select');
    chonDuAn.replaceChildren();
    duLieu.projects.forEach(function (p) { chonDuAn.add(new Option(p.name, p.id)); });
    chonDuAn.value = duAn.id;
    chonDuAn.onchange = function () { sessionStorage.setItem('cs-project', chonDuAn.value); location.reload(); };
    document.querySelector('.sidebar-project strong').textContent = duAn.name;
    document.querySelector('.sidebar-project small').textContent = duAn.description;
    document.querySelector('.side-tag').textContent = duAn.archived ? 'Đã lưu trữ' : duAn.code;
    document.querySelectorAll('.nav-link[data-role]').forEach(function (link) { link.hidden = link.dataset.role !== nguoiDung.role; });
    document.querySelector('.brand').href = trangChu(nguoiDung.role);
    if (duAn.archived) document.getElementById('archive-notice').hidden = false;

    const menu = document.querySelector('.menu-toggle');
    const manChe = document.querySelector('.sidebar-shade');
    const noiDung = document.querySelector('.workspace');
    function dongMenu() {
      const dangMo = document.body.classList.contains('menu-open');
      document.body.classList.remove('menu-open'); manChe.hidden = true; menu.setAttribute('aria-expanded', 'false');
      noiDung.inert = false;
      if (dangMo) menu.focus();
    }
    menu.onclick = function () {
      document.body.classList.add('menu-open'); manChe.hidden = false; menu.setAttribute('aria-expanded', 'true');
      noiDung.inert = true;
      document.querySelector('.mobile-close').focus();
    };
    document.querySelector('.mobile-close').onclick = dongMenu;
    manChe.onclick = dongMenu;
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') dongMenu(); });
    if (typeof matchMedia === 'function') {
      matchMedia('(max-width: 760px)').addEventListener('change', function (e) { if (!e.matches) dongMenu(); });
    }
    document.getElementById('demo-tools-btn').onclick = function () {
      const form = moBieuMau('tools-form', 'Công cụ dữ liệu demo', function () { });
      form.querySelector('[data-reset]').onclick = function () {
        if (confirm('Khôi phục toàn bộ dữ liệu mẫu?')) { Object.assign(duLieu, CS_SEED()); if (luuDuLieu()) location.reload(); }
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
