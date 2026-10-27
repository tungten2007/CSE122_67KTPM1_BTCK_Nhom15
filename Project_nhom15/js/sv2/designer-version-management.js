document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  if (!khoiTaoChung()) return;

  // 5. Phiên bản thiết kế: thêm, sửa bản nháp, nộp duyệt và lưu trữ.
  const boLoc = document.getElementById('status-filter');
  document.getElementById('version-reset-btn').onclick = function () { boLoc.value = 'all'; hienPhienBan(); };
  function soTiepTheo(loai) {
    let soLonNhat = 0;
    duLieu.versions.forEach(function (v) {
      if (v.projectId === duAn.id && v.assetType === loai) soLonNhat = Math.max(soLonNhat, Number(v.versionNum) || 0);
    });
    return soLonNhat + 1;
  }
  function taoMa(loai, so) {
    return (duLieu.settings.versionPattern || '{project}-{asset}-v{number}').replace('{project}', duAn.code).replace('{asset}', loai).replace('{number}', so);
  }

  function hienPhienBan() {
    giuTieuDiem(vePhienBan);
  }
  function vePhienBan() {
    const tatCa = duLieu.versions.filter(function (v) { return v.projectId === duAn.id; });
    tatCa.sort(function (a, b) { return new Date(b.createdAt) - new Date(a.createdAt); });
    const danhSach = tatCa.filter(function (v) { return boLoc.value === 'all' || v.status === boLoc.value; });
    const vung = document.querySelector('.version-timeline');
    vung.replaceChildren();
    document.getElementById('version-empty').hidden = danhSach.length > 0;
    document.querySelector('.toolbar-count strong').textContent = danhSach.length;
    document.querySelector('.designer-version-management-intro code').textContent = duLieu.settings.versionPattern;
    document.querySelector('.designer-version-management-intro p strong').textContent = duAn.code;
    danhSach.forEach(function (v) {
      const dong = saoChepMau('version-row');
      dong.classList.toggle('current', v.id === tatCa[0].id);
      const anh = dong.querySelector('img');
      anh.src = v.image || 'assets/coffee.svg'; anh.alt = v.name;
      anh.onerror = function () { anh.onerror = null; anh.src = 'assets/coffee.svg'; };
      dong.querySelector('h2').textContent = v.name;
      dong.querySelector('.version-name-tag').textContent = v.code;
      dong.querySelector('[data-version-status]').textContent = v.status;
      dong.querySelector('[data-version-latest]').hidden = v.id !== tatCa[0].id;
      dong.querySelector('.designer-version-management-metadata').textContent = 'Tạo ngày: ' + new Date(v.createdAt).toLocaleString('vi-VN') + ' · ' + (duLieu.users.find(function (u) { return u.id === v.author; })?.name || 'Người thiết kế');
      dong.querySelector('.designer-version-management-changelog-text').textContent = v.changelog;
      const danhDau = dong.querySelectorAll('.checklist-badge');
      ['checkFeedback', 'checkSpec', 'checkExport'].forEach(function (ten, i) {
        danhDau[i].classList.toggle('done', !!v[ten]); danhDau[i].classList.toggle('pending', !v[ten]);
      });
      const gopY = dong.querySelector('.designer-version-management-feedback-list');
      gopY.replaceChildren();
      duLieu.comments.filter(function (c) { return c.versionId === v.id; }).forEach(function (c) {
        const li = document.createElement('li'); li.textContent = c.author + ': ' + c.text; gopY.append(li);
      });
      duLieu.notes.filter(function (n) { return n.versionId === v.id; }).forEach(function (n) {
        const li = document.createElement('li'); li.textContent = 'Ghi chú: ' + n.text + (n.resolved ? ' (Đã xử lý)' : ' (Chưa xử lý)'); gopY.append(li);
      });
      (v.history || []).filter(function (h) { return h.reason; }).forEach(function (h) {
        const li = document.createElement('li'); li.textContent = 'Yêu cầu phản hồi: ' + h.reason; gopY.append(li);
      });
      dong.querySelector('.designer-version-management-feedback').hidden = !gopY.children.length;
      const nutSua = dong.querySelector('.edit-version-btn');
      const nutXoa = dong.querySelector('.delete-version-btn');
      const nutNop = dong.querySelector('.submit-review-btn');
      const nutLuuTru = dong.querySelector('.archive-version-btn');
      [nutSua, nutXoa, nutNop, nutLuuTru].forEach(function (nut, i) { nut.dataset.focusKey = 'version-' + v.id + '-' + i; });
      nutSua.hidden = !['Draft', 'Changes Requested'].includes(v.status) || v.author !== nguoiDung.id;
      nutXoa.hidden = v.status !== 'Draft' || v.author !== nguoiDung.id;
      nutNop.hidden = !['Draft', 'Changes Requested'].includes(v.status) || v.author !== nguoiDung.id;
      nutLuuTru.hidden = v.status === 'Archived' || v.author !== nguoiDung.id;
      [nutSua, nutXoa, nutNop, nutLuuTru].forEach(function (b) { b.disabled = !!duAn.archived; });
      nutSua.onclick = function () { suaPhienBan(v); };
      nutXoa.onclick = function () {
        if (!coTheSuaDuAn() || !confirm('Xóa bản nháp này?')) return;
        thuThaoTac(function () { thucHienDuLieu('deleteVersion', v.id); hienPhienBan(); });
      };
      nutLuuTru.onclick = function () {
        if (!coTheSuaDuAn() || !confirm('Lưu trữ phiên bản này?')) return;
        thuThaoTac(function () { thucHienDuLieu('archiveVersion', v.id); hienPhienBan(); });
      };
      nutNop.onclick = function () {
        if (!coTheSuaDuAn()) return;
        thuThaoTac(function () { thucHienDuLieu('submitVersionForReview', v.id); hienPhienBan(); hienThongBao('Đã nộp phiên bản cho Lead duyệt nội bộ.'); });
      };
      dong.id = 'version-' + v.id;
      vung.append(dong);
    });
  }
  function suaPhienBan(v) {
    if (!coTheSuaDuAn()) return;
    const form = moBieuMau('edit-version-form', 'Chỉnh sửa bản nháp', function (giaTri, form) {
      if (!coTheSuaDuAn()) throw new Error('Dự án đã lưu trữ.');
      const thayDoi = { ...v, name: giaTri.name.trim(), changelog: giaTri.changelog.trim() };
      for (const ten of ['checkFeedback', 'checkSpec', 'checkExport']) thayDoi[ten] = form.elements[ten].checked;
      thucHienDuLieu('saveVersion', thayDoi);
      hienPhienBan();
    });
    form.elements.name.value = v.name; form.elements.changelog.value = v.changelog;
    for (const ten of ['checkFeedback', 'checkSpec', 'checkExport']) form.elements[ten].checked = !!v[ten];
  }
  document.getElementById('upload-version-btn').onclick = function () {
    if (!coTheSuaDuAn()) return;
    const form = moBieuMau('version-form', 'Thêm phiên bản mới', async function (giaTri, form) {
      if (!coTheSuaDuAn()) throw new Error('Dự án đã lưu trữ.');
      let anh = giaTri.image;
      const tep = form.elements.designFile.files[0];
      if (tep) {
        if (!['image/png', 'image/jpeg', 'image/webp'].includes(tep.type) || tep.size > 1024 * 1024) throw loiTruong('designFile', 'Chọn PNG/JPEG/WebP tối đa 1 MB.');
        anh = await new Promise(function (thanhCong, thatBai) {
          const docTep = new FileReader();
          docTep.onload = function () { thanhCong(docTep.result); };
          docTep.onerror = function () { thatBai(new Error('Không đọc được ảnh.')); };
          docTep.readAsDataURL(tep);
        });
      }
      thucHienDuLieu('saveVersion', { projectId: duAn.id, name: giaTri.name.trim(), assetType: giaTri.assetType, image: anh, changelog: giaTri.changelog.trim() });
      hienPhienBan();
    });
    function xemMa() { form.querySelector('#version-code-preview').textContent = taoMa(form.elements.assetType.value, soTiepTheo(form.elements.assetType.value)); }
    form.elements.name.value = duAn.name + ' · Phiên bản ' + soTiepTheo('BaoBi');
    form.elements.assetType.onchange = xemMa;
    xemMa();
  };
  boLoc.onchange = hienPhienBan;
  hienPhienBan();
  const maPhienBan = new URLSearchParams(location.search).get('version');
  if (maPhienBan) document.getElementById('version-' + maPhienBan)?.scrollIntoView({ block: 'center' });

});
