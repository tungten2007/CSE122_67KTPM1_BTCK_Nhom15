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
      dong.querySelector('.designer-version-management-feedback').hidden = !gopY.children.length;
      const nutSua = dong.querySelector('.edit-version-btn');
      const nutXoa = dong.querySelector('.delete-version-btn');
      const nutNop = dong.querySelector('.submit-review-btn');
      const nutLuuTru = dong.querySelector('.archive-version-btn');
      nutSua.hidden = nutXoa.hidden = v.status !== 'Draft' || v.author !== nguoiDung.id;
      nutNop.hidden = !['Draft', 'Changes Requested'].includes(v.status) || v.author !== nguoiDung.id;
      nutLuuTru.hidden = v.status === 'Archived' || v.author !== nguoiDung.id;
      [nutSua, nutXoa, nutNop, nutLuuTru].forEach(function (b) { b.disabled = !!duAn.archived; });
      nutSua.onclick = function () { suaPhienBan(v); };
      nutXoa.onclick = function () {
        if (!coTheSuaDuAn() || !confirm('Xóa bản nháp này?')) return;
        duLieu.versions = duLieu.versions.filter(function (m) { return m.id !== v.id; });
        if (luuDuLieu()) hienPhienBan();
      };
      nutLuuTru.onclick = function () {
        if (!coTheSuaDuAn() || !confirm('Lưu trữ phiên bản này?')) return;
        v.status = 'Archived'; if (luuDuLieu()) hienPhienBan();
      };
      nutNop.onclick = function () {
        if (!coTheSuaDuAn()) return;
        if (!v.checkFeedback || !v.checkSpec || !v.checkExport) { hienThongBao('Hoàn thành cả 3 mục checklist trước khi nộp duyệt.'); return; }
        v.status = 'Internal Review';
        duLieu.users.filter(function (u) { return u.active && u.role === 'Lead'; }).forEach(function (u) {
          duLieu.notifications.unshift({ id: 'notif-' + Date.now() + '-' + u.id, userId: u.id, projectId: duAn.id, type: 'version', title: 'Phiên bản mới cần duyệt', message: v.name, time: new Date().toISOString(), read: false, link: 'profile.html' });
        });
        if (luuDuLieu()) { hienPhienBan(); hienThongBao('Đã nộp duyệt nội bộ.'); }
      };
      vung.append(dong);
    });
  }
  function suaPhienBan(v) {
    if (!coTheSuaDuAn()) return;
    const form = moBieuMau('edit-version-form', 'Chỉnh sửa bản nháp', function (giaTri, form) {
      if (!coTheSuaDuAn()) throw new Error('Dự án đã lưu trữ.');
      v.name = giaTri.name.trim(); v.changelog = giaTri.changelog.trim();
      for (const ten of ['checkFeedback', 'checkSpec', 'checkExport']) v[ten] = form.elements[ten].checked;
      if (!luuDuLieu()) throw new Error('Chưa lưu được phiên bản.');
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
      const so = soTiepTheo(giaTri.assetType);
      duLieu.versions.push({ id: 'v-' + Date.now(), projectId: duAn.id, name: giaTri.name.trim(), assetType: giaTri.assetType, versionNum: so, code: taoMa(giaTri.assetType, so), image: anh, changelog: giaTri.changelog.trim(), author: nguoiDung.id, createdAt: new Date().toISOString(), status: 'Draft', checkFeedback: false, checkSpec: false, checkExport: false, history: [] });
      if (!luuDuLieu()) throw new Error('Chưa lưu được phiên bản.');
      hienPhienBan();
    });
    function xemMa() { form.querySelector('#version-code-preview').textContent = taoMa(form.elements.assetType.value, soTiepTheo(form.elements.assetType.value)); }
    form.elements.name.value = duAn.name + ' · Phiên bản ' + soTiepTheo('BaoBi');
    form.elements.assetType.onchange = xemMa;
    xemMa();
  };
  boLoc.onchange = hienPhienBan;
  hienPhienBan();

});
