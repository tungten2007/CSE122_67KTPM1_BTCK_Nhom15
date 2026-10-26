document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  if (!khoiTaoChung()) return;

  // 5. Moodboard gồm bảng màu, từ khóa và các thẻ ảnh của dự án.
  let bangCamHung = duLieu.moodboards.find(function (m) { return m.projectId === duAn.id; });
  if (!bangCamHung) {
    bangCamHung = { id: 'mb-' + duAn.id, projectId: duAn.id, title: 'Bảng cảm hứng ' + duAn.name, description: 'Định hướng phong cách thiết kế.', status: 'Draft', palette: [], keywords: [], cards: [] };
    duLieu.moodboards.push(bangCamHung);
  }
  function luuBangCamHung() {
    bangCamHung.updatedAt = new Date().toISOString();
    if (luuDuLieu()) hienMoodboard();
  }
  function hienMoodboard() {
    document.querySelector('h1').textContent = bangCamHung.title;
    document.querySelector('.page-heading .muted').textContent = bangCamHung.description;
    document.querySelector('.moodboard-header-bar .badge').textContent = 'Trạng thái: ' + bangCamHung.status;
    document.querySelector('.designer-moodboard-palette-panel .panel-title p').textContent = 'Bảng màu của dự án ' + duAn.name + '. Nhấp để sao chép HEX.';
    const buoc = ['Draft', 'Palette Ready', 'Shared'].indexOf(bangCamHung.status);
    document.querySelectorAll('.status-step').forEach(function (e, i) { e.classList.toggle('active', i === buoc); e.classList.toggle('completed', i < buoc); });
    const vungMau = document.querySelector('.palette-container'); vungMau.replaceChildren();
    bangCamHung.palette.forEach(function (mau, i) {
      const oMau = saoChepMau('color-row');
      // fill là dữ liệu của hình SVG, các định dạng bố cục vẫn nằm trong CSS.
      oMau.querySelector('rect').setAttribute('fill', mau.hex);
      oMau.querySelector('.swatch-hex').textContent = mau.hex.toUpperCase();
      oMau.querySelector('.swatch-name').textContent = mau.name;
      oMau.querySelector('.swatch-role').textContent = mau.role || 'Màu phối';
      oMau.querySelector('.copy-hex-btn').title = 'Sao chép ' + mau.hex.toUpperCase();
      oMau.querySelector('.copy-hex-btn').onclick = function () {
        navigator.clipboard.writeText(mau.hex).then(function () { hienThongBao('Đã sao chép ' + mau.hex); }).catch(function () { hienThongBao('Mã màu: ' + mau.hex); });
      };
      oMau.querySelector('.remove-color-btn').onclick = function () { if (coTheSuaDuAn()) { bangCamHung.palette.splice(i, 1); luuBangCamHung(); } };
      vungMau.append(oMau);
    });
    const vungTuKhoa = document.querySelector('.keyword-cloud'); vungTuKhoa.replaceChildren();
    bangCamHung.keywords.forEach(function (tu, i) {
      const nhan = saoChepMau('keyword-row'); nhan.querySelector('span').textContent = tu;
      nhan.querySelector('button').onclick = function () { if (coTheSuaDuAn()) { bangCamHung.keywords.splice(i, 1); luuBangCamHung(); } };
      vungTuKhoa.append(nhan);
    });
    const vungAnh = document.querySelector('.canvas-grid'); vungAnh.replaceChildren();
    (bangCamHung.cards || []).forEach(function (the, i) {
      const dong = saoChepMau('image-row');
      const anh = dong.querySelector('img'); anh.src = the.image; anh.alt = the.title;
      anh.onerror = function () { anh.onerror = null; anh.src = 'assets/moodboard.svg'; };
      dong.querySelector('.badge').textContent = the.category;
      dong.querySelector('h3').textContent = the.title; dong.querySelector('p').textContent = the.notes;
      dong.querySelector('.remove-card-btn').onclick = function () { if (coTheSuaDuAn()) { bangCamHung.cards.splice(i, 1); luuBangCamHung(); } };
      vungAnh.append(dong);
    });
    document.querySelector('.designer-moodboard-card-count strong').textContent = bangCamHung.cards.length;
    document.getElementById('ai-reason').textContent = bangCamHung.lastAIReason || '';
    document.getElementById('ai-reason').hidden = !bangCamHung.lastAIReason;
    document.getElementById('share-moodboard-btn').textContent = bangCamHung.status === 'Shared' ? 'Đã chia sẻ' : 'Chia sẻ Moodboard';
  }
  document.getElementById('add-color-btn').onclick = function () {
    if (!coTheSuaDuAn()) return;
    const form = moBieuMau('color-form', 'Thêm màu', function (giaTri) {
      if (!coTheSuaDuAn()) throw new Error('Dự án đã lưu trữ.');
      if (!/^#[0-9a-f]{6}$/i.test(giaTri.hex)) throw loiTruong('hex', 'Mã màu cần đúng dạng #RRGGBB.');
      bangCamHung.palette.push({ hex: giaTri.hex, name: giaTri.name.trim(), role: giaTri.role });
      bangCamHung.status = 'Palette Ready'; luuBangCamHung();
    });
    form.elements.colorPicker.oninput = function () { form.elements.hex.value = form.elements.colorPicker.value; };
  };
  document.getElementById('add-keyword-btn').onclick = function () {
    if (!coTheSuaDuAn()) return;
    const tu = prompt('Nhập từ khóa thẩm mỹ:');
    if (tu && tu.trim() && !bangCamHung.keywords.includes(tu.trim())) { bangCamHung.keywords.push(tu.trim()); luuBangCamHung(); }
  };
  document.getElementById('edit-mb-title-btn').onclick = function () {
    if (!coTheSuaDuAn()) return;
    const ten = prompt('Tên bảng cảm hứng:', bangCamHung.title);
    if (ten && ten.trim()) { bangCamHung.title = ten.trim(); luuBangCamHung(); }
  };
  document.getElementById('add-card-btn').onclick = function () {
    if (!coTheSuaDuAn()) return;
    moBieuMau('image-form', 'Thêm thẻ ảnh', function (giaTri) {
      if (!coTheSuaDuAn()) throw new Error('Dự án đã lưu trữ.');
      bangCamHung.cards.push({ id: 'card-' + Date.now(), title: giaTri.title.trim(), category: giaTri.category, image: giaTri.image, notes: giaTri.notes.trim() });
      luuBangCamHung();
    });
  };
  document.getElementById('share-moodboard-btn').onclick = function () {
    if (coTheSuaDuAn()) { bangCamHung.status = 'Shared'; luuBangCamHung(); hienThongBao('Đã chia sẻ Moodboard.'); }
  };

  // 6. AI-3 mô phỏng theo từ khóa. Kết quả có chủ đề, màu, giải thích và gợi ý thiết kế.
  // Không gọi API AI thật; dữ liệu gợi ý được khai báo rõ ràng để dễ học và chỉnh sửa.
  function goiYPhongCach(moTa) {
    const chuoi = moTa.toLowerCase();
    if (['sang trọng', 'cao cấp', 'luxury', 'đen vàng'].some(function (tu) { return chuoi.includes(tu); })) {
      return {
        theme: 'Sang trọng Tối giản (Minimal Luxury)',
        palette: [{ hex: '#1c1c1c', name: 'Đen than', role: 'Màu chủ đạo' }, { hex: '#c6a667', name: 'Vàng champagne', role: 'Điểm nhấn' }, { hex: '#f5f1e9', name: 'Trắng ngà', role: 'Màu nền' }, { hex: '#77736d', name: 'Xám ấm', role: 'Màu chữ phụ' }],
        keywords: ['Tinh tế', 'Cao cấp', 'Tối giản', 'Tương phản', 'Sang trọng'],
        reason: 'Từ khóa sang trọng và cao cấp phù hợp với nền đen trầm, điểm nhấn vàng champagne và khoảng trắng thoáng. Bảng màu gợi ý cảm giác tinh tế, dễ tạo điểm nhấn cho sản phẩm.',
        materials: 'Giấy mỹ thuật mịn hoặc giấy đen, kết hợp ép kim vàng ở chi tiết cần nhấn.',
        typography: 'Serif thanh lịch cho tiêu đề, kết hợp Sans-serif đơn giản và khoảng cách chữ thoáng.'
      };
    }
    if (['trà', 'tea', 'thảo mộc'].some(function (tu) { return chuoi.includes(tu); }) && !['cà phê', 'coffee'].some(function (tu) { return chuoi.includes(tu); })) {
      return {
        theme: 'Thanh mát Tự nhiên (Fresh Botanical)',
        palette: [{ hex: '#315b45', name: 'Xanh lá trà', role: 'Màu chủ đạo' }, { hex: '#bdd3a4', name: 'Xanh non', role: 'Màu phối' }, { hex: '#f7f4e8', name: 'Kem', role: 'Màu nền' }, { hex: '#a67c52', name: 'Nâu gỗ', role: 'Điểm nhấn' }],
        keywords: ['Thanh mát', 'Tự nhiên', 'Nhẹ nhàng', 'Thảo mộc', 'Trong lành'],
        reason: 'Từ khóa về trà và thảo mộc phù hợp với xanh lá, xanh non và nền kem sáng. Nhóm màu gợi cảm giác nhẹ nhàng, gần gũi với lá trà và nguyên liệu thiên nhiên.',
        materials: 'Giấy có bề mặt tự nhiên, nhãn giấy sáng và hình minh họa thực vật nét mảnh.',
        typography: 'Sans-serif dễ đọc, kết hợp Serif mềm mại cho tên thương hiệu.'
      };
    }
    if (['cà phê', 'coffee', 'kraft', 'mộc', 'organic'].some(function (tu) { return chuoi.includes(tu); })) {
      return {
        theme: 'Mộc Mạc Hữu Cơ (Earthy Organic)',
        palette: [{ hex: '#24473b', name: 'Xanh rừng già (Forest)', role: 'Màu chủ đạo' }, { hex: '#cbbb97', name: 'Giấy Kraft Tự Nhiên (Raw Kraft)', role: 'Màu nền / Bao bì' }, { hex: '#f6f1e5', name: 'Trắng Kem Mộc (Cream Linen)', role: 'Màu tương phản phụ' }, { hex: '#5a4434', name: 'Nâu hạt rang', role: 'Màu chữ & Nhấn' }],
        keywords: ['Nguyên bản & Thô mộc', 'Chất liệu Kraft tự nhiên', 'Thủ công tinh tế', 'Tối giản Bắc Âu', 'Ấm áp & Tin cậy'],
        reason: 'Sắc xanh rừng sẫm #24473B gợi nhớ cao nguyên và nguồn gốc đồi chè, kết hợp cùng tông kraft #CBBB97 tạo cảm giác thô mộc, thân thiện với môi trường. Nền kem và nâu hạt rang giúp truyền tải thông điệp “từ những điều nguyên bản”.',
        materials: 'Giấy kraft tái chế sần nhẹ, in lụa 2 màu đơn sắc, ép nhũ mờ hạt cát.',
        typography: 'Serif cổ điển có chân vững chãi kết hợp Sans-serif thoáng đãng.'
      };
    }
    throw new Error('Chưa nhận diện được phong cách. Hãy thêm từ khóa như cà phê, giấy kraft, trà hoặc sang trọng.');
  }

  const hopAI = document.getElementById('ai-dialog');
  const nhapAI = document.getElementById('ai-prompt-input');
  let ketQuaAI = null;
  let lanXuLyAI = 0;
  const henGioAI = [];
  const formSuaAI = document.getElementById('ai-edit-form');

  // Hủy tiến trình cũ khi đóng hoặc mở lại để kết quả cũ không xuất hiện muộn.
  function huyXuLyAI() {
    lanXuLyAI++;
    henGioAI.forEach(function (maHen) { clearTimeout(maHen); });
    henGioAI.length = 0;
  }
  function chuyenBuocAI(ten) {
    formSuaAI.hidden = true;
    document.getElementById('ai-edit-btn').textContent = 'Chỉnh sửa gợi ý';
    hopAI.querySelectorAll('[data-ai-step]').forEach(function (e) { e.hidden = e.dataset.aiStep !== ten; });
    hopAI.querySelectorAll('[data-ai-footer]').forEach(function (e) { e.hidden = e.dataset.aiFooter !== ten; });
    hopAI.querySelector('.ai-dialog-body').scrollTop = 0;
  }
  hopAI.onclose = huyXuLyAI;
  hopAI.oncancel = huyXuLyAI;
  hopAI.querySelectorAll('[data-ai-close]').forEach(function (nut) { nut.onclick = function () { huyXuLyAI(); hopAI.close(); }; });

  document.getElementById('open-ai-modal-btn').onclick = function () {
    huyXuLyAI();
    ketQuaAI = null;
    nhapAI.value = 'Dự án ' + duAn.name + ': Cà phê mộc nguyên bản, bao bì giấy kraft tự nhiên, phong cách Bắc Âu tối giản, tinh tế, gần gũi thiên nhiên.';
    document.getElementById('ai-fail-checkbox').checked = false;
    document.getElementById('ai-input-error').textContent = '';
    document.getElementById('ai-save-error').textContent = '';
    chuyenBuocAI('input');
    hopAI.showModal();
  };

  document.getElementById('ai-generate-btn').onclick = function () {
    if (nhapAI.value.trim().length < 5) {
      document.getElementById('ai-input-error').textContent = 'Vui lòng nhập mô tả ít nhất 5 ký tự.';
      nhapAI.focus();
      return;
    }
    huyXuLyAI();
    ketQuaAI = null;
    const lanHienTai = lanXuLyAI;
    const moTa = nhapAI.value.trim();
    const giaLapLoi = document.getElementById('ai-fail-checkbox').checked;
    document.getElementById('ai-input-error').textContent = '';
    document.getElementById('ai-save-error').textContent = '';
    document.getElementById('ai-progress-text').textContent = 'Đang phân tích ngữ cảnh thương hiệu…';
    chuyenBuocAI('processing');
    henGioAI.push(setTimeout(function () {
      if (lanHienTai === lanXuLyAI && hopAI.open) document.getElementById('ai-progress-text').textContent = 'Đang trích xuất mã màu HEX tương phản…';
    }, 550));
    henGioAI.push(setTimeout(function () {
      if (lanHienTai === lanXuLyAI && hopAI.open) document.getElementById('ai-progress-text').textContent = 'Đang cấu trúc từ khóa, chất liệu và kiểu chữ…';
    }, 1100));
    henGioAI.push(setTimeout(function () {
      if (lanHienTai !== lanXuLyAI || !hopAI.open) return;
      try {
        if (giaLapLoi) throw new Error('AI mô phỏng chưa đủ thông tin để tạo gợi ý. Hãy thử lại hoặc nhập bảng màu thủ công.');
        ketQuaAI = goiYPhongCach(moTa);
        document.getElementById('ai-res-theme').textContent = ketQuaAI.theme;
        document.getElementById('ai-res-explanation').textContent = ketQuaAI.reason;
        document.getElementById('ai-res-materials').textContent = ketQuaAI.materials;
        document.getElementById('ai-res-typography').textContent = ketQuaAI.typography;
        const vungMau = document.getElementById('ai-res-palette');
        vungMau.replaceChildren();
        ketQuaAI.palette.forEach(function (mau) {
          const o = saoChepMau('ai-color-row');
          o.querySelector('rect').setAttribute('fill', mau.hex);
          o.querySelector('span').textContent = mau.hex.toUpperCase();
          vungMau.append(o);
        });
        const vungTuKhoa = document.getElementById('ai-res-keywords');
        vungTuKhoa.replaceChildren();
        ketQuaAI.keywords.forEach(function (tu) {
          const nhan = saoChepMau('ai-keyword-row');
          nhan.textContent = tu;
          vungTuKhoa.append(nhan);
        });
        chuyenBuocAI('result');
      } catch (loi) {
        document.getElementById('ai-error-message-text').textContent = loi.message;
        chuyenBuocAI('error');
      }
    }, 1800));
  };

  document.getElementById('ai-edit-btn').onclick = function () {
    if (!ketQuaAI) return;
    if (!formSuaAI.hidden) {
      formSuaAI.hidden = true;
      this.textContent = 'Chỉnh sửa gợi ý';
      return;
    }
    const vung = document.getElementById('ai-edit-colors');
    vung.replaceChildren();
    ketQuaAI.palette.forEach(function (mau, i) {
      const nhan = document.createElement('label'); nhan.className = 'field';
      const ten = document.createElement('span'); ten.textContent = 'Mã HEX ' + (i + 1) + ' — ' + mau.name;
      const nhap = document.createElement('input');
      nhap.setAttribute('name', 'hex' + i); nhap.setAttribute('required', '');
      nhap.setAttribute('pattern', '#[0-9a-fA-F]{6}'); nhap.setAttribute('maxlength', '7');
      nhap.value = mau.hex.toUpperCase(); nhan.append(ten, nhap); vung.append(nhan);
    });
    formSuaAI.elements.keywords.value = ketQuaAI.keywords.join('\n');
    formSuaAI.elements.reason.value = ketQuaAI.reason;
    khoiTaoKiemTraForm(formSuaAI);
    xoaLoiForm(formSuaAI);
    formSuaAI.onsubmit = function (e) { e.preventDefault(); document.getElementById('ai-accept-btn').click(); };
    formSuaAI.hidden = false; this.textContent = 'Hủy chỉnh sửa';
    vung.querySelector('input').focus();
  };

  document.getElementById('ai-accept-btn').onclick = function () {
    if (!ketQuaAI || !coTheSuaDuAn()) return;
    if (!formSuaAI.hidden) {
      if (!kiemTraBieuMau(formSuaAI)) return;
      const tuKhoa = formSuaAI.elements.keywords.value.split('\n').map(function (s) { return s.trim(); }).filter(Boolean);
      if (!tuKhoa.length || tuKhoa.length > 10) { baoLoiTruong(formSuaAI, 'keywords', 'Nhập từ 1 đến 10 từ khóa, mỗi dòng một từ khóa.'); return; }
      if (!formSuaAI.elements.reason.value.trim()) { baoLoiTruong(formSuaAI, 'reason', 'Nhập giải thích phong cách.'); return; }
      for (let i = 0; i < ketQuaAI.palette.length; i++) {
        if (!/^#[0-9a-f]{6}$/i.test(formSuaAI.elements['hex' + i].value)) { baoLoiTruong(formSuaAI, 'hex' + i, 'Mã HEX cần dấu # và 6 ký tự 0–9, A–F.'); return; }
      }
      ketQuaAI = { ...ketQuaAI, palette: ketQuaAI.palette.map(function (mau, i) { return { ...mau, hex: formSuaAI.elements['hex' + i].value.toUpperCase() }; }), keywords: tuKhoa, reason: formSuaAI.elements.reason.value.trim() };
    }
    // Giữ dữ liệu cũ để khôi phục nếu trình duyệt không lưu được.
    const cu = { palette: bangCamHung.palette, keywords: bangCamHung.keywords, lastAIReason: bangCamHung.lastAIReason, lastAIMaterials: bangCamHung.lastAIMaterials, lastAITypography: bangCamHung.lastAITypography, lastAITheme: bangCamHung.lastAITheme, status: bangCamHung.status, updatedAt: bangCamHung.updatedAt };
    bangCamHung.palette = ketQuaAI.palette;
    bangCamHung.keywords = ketQuaAI.keywords;
    bangCamHung.lastAIReason = ketQuaAI.reason;
    bangCamHung.lastAIMaterials = ketQuaAI.materials;
    bangCamHung.lastAITypography = ketQuaAI.typography;
    bangCamHung.lastAITheme = ketQuaAI.theme;
    bangCamHung.status = 'Palette Ready';
    bangCamHung.updatedAt = new Date().toISOString();
    if (!luuDuLieu()) {
      Object.assign(bangCamHung, cu);
      document.getElementById('ai-save-error').textContent = 'Chưa lưu được gợi ý. Hãy kiểm tra dung lượng trình duyệt rồi thử lại.';
      return;
    }
    hienMoodboard();
    hopAI.close();
    hienThongBao('Đã áp dụng bảng màu và từ khóa AI vào Moodboard!');
  };
  document.getElementById('ai-regen-btn').onclick = function () {
    huyXuLyAI(); ketQuaAI = null;
    document.getElementById('ai-input-error').textContent = '';
    chuyenBuocAI('input'); nhapAI.focus();
  };
  document.getElementById('ai-retry-btn').onclick = function () {
    huyXuLyAI(); ketQuaAI = null;
    document.getElementById('ai-fail-checkbox').checked = false;
    chuyenBuocAI('input'); nhapAI.focus();
  };
  document.getElementById('ai-reject-btn').onclick = function () { huyXuLyAI(); ketQuaAI = null; hopAI.close(); };
  document.getElementById('ai-manual-btn').onclick = function () { huyXuLyAI(); ketQuaAI = null; hopAI.close(); document.getElementById('add-color-btn').click(); };
  hienMoodboard();

});
