document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Dữ liệu mẫu. Dùng chung cấu trúc để các trang đọc được dữ liệu của nhau.
  function CS_SEED() {
    return {
      schema: 1,
      users: [
        { id: 'u-an', name: 'An Nguyễn', email: 'annguyen@example.com', role: 'Designer', active: true, title: 'Senior Packaging Designer', bio: 'Chuyên sâu về bao bì, visual branding và hệ màu in ấn tự nhiên.', avatarText: 'AN' },
        { id: 'u-ngoc', name: 'Bảo Ngọc', email: 'baongoc@example.com', role: 'Designer', active: true, title: 'Visual Designer', bio: 'Thiết kế moodboard, minh họa và nhận diện thương hiệu.', avatarText: 'BN' },
        { id: 'u-lead', name: 'Linh Hà', email: 'linhha@example.com', role: 'Lead', active: true, title: 'Creative Director', bio: 'Điều phối dự án sáng tạo và kiểm soát chất lượng thiết kế.', avatarText: 'LH' },
        { id: 'u-admin', name: 'Minh Anh', email: 'minhanh@example.com', role: 'Admin', active: true, title: 'Studio Administrator', bio: 'Quản trị hệ thống, chuẩn hóa template brief và cấu hình AI.', avatarText: 'MA' },
        { id: 'u-chi', name: 'Khánh Chi', email: 'khanhchi@example.com', role: 'Client', active: true, title: 'Đại diện Mộc Coffee', bio: 'Khách hàng đại diện thương hiệu Mộc Coffee.', avatarText: 'KC' },
        { id: 'u-binh', name: 'Bình Trần', email: 'binhtran@example.com', role: 'Designer', active: false, title: 'Freelance Designer', bio: 'Tài khoản tạm ngừng hoạt động.', avatarText: 'BT' }
      ],
      projects: [
        { id: 'p-moc', name: 'Mộc Coffee', code: 'MC26', description: 'Nhận diện & bao bì cà phê nguyên bản', archived: false, tags: ['Branding', 'Packaging'] },
        { id: 'p-lua', name: 'Lúa Tea', code: 'LT26', description: 'Bộ nhận diện trà thủ công truyền thống', archived: false, tags: ['Branding'] }
      ],
      tasks: [
        { id: 'CS-101', projectId: 'p-moc', title: 'Phác thảo nhãn cà phê', description: 'Phát triển 3 hướng nhãn dựa trên brief đã duyệt.', assignee: 'u-an', priority: 'high', status: 'todo', due: '2026-10-06', type: 'Thiết kế' },
        { id: 'CS-102', projectId: 'p-moc', title: 'Chuẩn hóa thông tin bao bì', description: 'Kiểm tra thành phần, trọng lượng và nguồn gốc.', assignee: 'u-ngoc', priority: 'medium', status: 'todo', due: '2026-10-07', type: 'Nội dung' },
        { id: 'CS-103', projectId: 'p-moc', title: 'Hoàn thiện mặt trước túi', description: 'Tối ưu khoảng trắng và phân cấp chữ, tăng cỡ font chữ MỘC theo yêu cầu.', assignee: 'u-an', priority: 'high', status: 'doing', due: '2026-10-05', type: 'Thiết kế', urgent: true },
        { id: 'CS-104', projectId: 'p-moc', title: 'Bổ sung bảng màu', description: 'So sánh màu in thực tế với moodboard.', assignee: 'u-ngoc', priority: 'medium', status: 'doing', due: '2026-10-06', type: 'Moodboard' },
        { id: 'CS-105', projectId: 'p-moc', title: 'Duyệt phiên bản v3', description: 'Đánh giá thiết kế trước khi gửi khách hàng.', assignee: 'u-lead', priority: 'high', status: 'review', due: '2026-10-07', type: 'Duyệt nội bộ' },
        { id: 'CS-106', projectId: 'p-moc', title: 'Chốt hướng hình ảnh', description: 'Thống nhất chất liệu và định hướng hình ảnh.', assignee: 'u-lead', priority: 'low', status: 'done', due: '2026-10-02', type: 'Định hướng' },
        { id: 'CS-107', projectId: 'p-lua', title: 'Bàn giao logo Lúa Tea', description: 'Đã xác nhận bàn giao với khách hàng.', assignee: 'u-an', priority: 'medium', status: 'done', due: '2026-10-01', type: 'Bàn giao' }
      ],
      briefs: [
        { id: 'b-01', projectId: 'p-moc', title: 'Bộ quà tặng mùa lễ hội', client: 'Khánh Chi', summary: 'Thiết kế hộp quà 2 túi cà phê, phong cách tự nhiên, tinh tế; dùng giấy kraft và màu xanh rừng.', audience: 'Người yêu cà phê 25–40 tuổi', deliverables: '01 hộp quà, 02 nhãn túi và 01 thiệp', deadline: '2026-10-20', status: 'submitted', reason: '' }
      ],
      versions: [
        {
          id: 'v-moc-1',
          projectId: 'p-moc',
          name: 'Túi cà phê · Phiên bản 1',
          code: 'MC26-BaoBi-v1',
          assetType: 'BaoBi',
          versionNum: 1,
          status: 'Archived',
          author: 'u-an',
          createdAt: '2026-09-20T10:00:00+07:00',
          changelog: 'Bản phác thảo ban đầu layout 1 cột, thử nghiệm logo chữ Mộc.',
          image: 'assets/coffee.svg',
          checkFeedback: true,
          checkSpec: true,
          checkExport: true,
          history: [{ action: 'created', time: '2026-09-20T10:00:00+07:00' }, { action: 'archived', time: '2026-09-27T09:00:00+07:00' }]
        },
        {
          id: 'v-moc-2',
          projectId: 'p-moc',
          name: 'Túi cà phê · Phiên bản 2',
          code: 'MC26-BaoBi-v2',
          assetType: 'BaoBi',
          versionNum: 2,
          status: 'Changes Requested',
          author: 'u-an',
          createdAt: '2026-09-28T14:30:00+07:00',
          changelog: 'Cải tiến bố cục nhãn chính, áp dụng màu kraft và xanh lá sẫm từ moodboard.',
          image: 'assets/coffee.svg',
          checkFeedback: true,
          checkSpec: true,
          checkExport: true,
          history: [
            { action: 'submitted', time: '2026-09-28T14:30:00+07:00' },
            { action: 'changes_requested', reason: 'Tên sản phẩm hơi nhỏ. Bổ sung hướng dẫn pha trên mặt sau của túi.', time: '2026-09-30T16:00:00+07:00' }
          ]
        },
        {
          id: 'v-moc-3',
          projectId: 'p-moc',
          name: 'Túi cà phê · Phiên bản 3',
          code: 'MC26-BaoBi-v3',
          assetType: 'BaoBi',
          versionNum: 3,
          status: 'Internal Review',
          author: 'u-an',
          createdAt: '2026-10-02T08:30:00+07:00',
          changelog: 'Đã tăng cỡ chữ MỘC lên 77pt, hoàn thiện nét line-art lá chè & hạt cà phê, bố sung hướng dẫn pha 3 bước.',
          image: 'assets/coffee.svg',
          checkBrand: false,
          checkInfo: false,
          checkFeedback: true,
          checkSpec: true,
          checkExport: true,
          history: [{ action: 'submitted_internal', time: '2026-10-02T08:30:00+07:00' }]
        }
      ],
      notes: [
        { id: 'n-1', versionId: 'v-moc-3', text: 'Tên sản phẩm hơi nhỏ. Tăng độ rõ khi thu nhỏ.', x: 54, y: 38, resolved: false }
      ],
      comments: [
        { id: 'C-01', projectId: 'p-moc', versionId: 'v-moc-3', author: 'Khánh Chi', text: 'Tên sản phẩm hơi nhỏ. Tăng cỡ chữ để dễ đọc.' },
        { id: 'C-02', projectId: 'p-moc', versionId: 'v-moc-3', author: 'Khánh Chi', text: 'Bổ sung hướng dẫn pha trên mặt sau của túi.' },
        { id: 'C-03', projectId: 'p-moc', versionId: 'v-moc-3', author: 'Khánh Chi', text: 'Màu này trông chưa thật sự cao cấp.' }
      ],
      moodboards: [
        {
          id: 'mb-moc',
          projectId: 'p-moc',
          title: 'Định hướng Thẩm mỹ Bao bì Mộc Coffee 2026',
          status: 'Palette Ready',
          updatedAt: '2026-10-04T15:30:00+07:00',
          description: 'Phong cách hữu cơ, mộc mạc, tôn vinh chất liệu kraft và sắc xanh trầm của cao nguyên.',
          palette: [
            { hex: '#24473b', name: 'Xanh rừng già (Forest)', role: 'Màu chủ đạo' },
            { hex: '#cbbb97', name: 'Giấy Kraft (Warm Kraft)', role: 'Màu nền / Bao bì' },
            { hex: '#f6f1e5', name: 'Trắng kem mộc (Cream)', role: 'Màu tương phản phụ' },
            { hex: '#5a4434', name: 'Nâu hạt rang (Espresso Roast)', role: 'Màu chữ & Nhấn' }
          ],
          keywords: ['Nguyên bản', 'Organic / Tự nhiên', 'Thủ công mỹ nghệ', 'Tối giản Bắc Âu', 'Ấm áp & Tin cậy'],
          cards: [
            { id: 'card-1', title: 'Chất liệu túi giấy Kraft có vân sần', category: 'Chất liệu', image: 'assets/moodboard.svg', notes: 'Bề mặt sần nhẹ tạo cảm giác mộc mạc, thân thiện với môi trường.' },
            { id: 'card-2', title: 'Typography Serif cổ điển vững chãi', category: 'Typography', image: 'assets/coffee.svg', notes: 'Font chữ MỘC với đường nét dày dặn, sang trọng nhưng gần gũi.' },
            { id: 'card-3', title: 'Họa tiết lá chè & hạt cà phê cách điệu', category: 'Graphic Motif', image: 'assets/moodboard.svg', notes: 'Nét vẽ line-art màu vàng cát trên nền xanh sẫm tối giản.' }
          ]
        },
        {
          id: 'mb-lua',
          projectId: 'p-lua',
          title: 'Bảng cảm hứng Trà Thủ công Lúa Tea',
          status: 'Draft',
          updatedAt: '2026-09-28T11:00:00+07:00',
          description: 'Định hướng màu vàng lúa chín kết hợp xanh non lá trà tươi, thanh mát và truyền thống.',
          palette: [
            { hex: '#d4af37', name: 'Vàng lúa chín', role: 'Màu chủ đạo' },
            { hex: '#4a7c59', name: 'Xanh búp trà', role: 'Màu điểm nhấn' },
            { hex: '#fbf9f1', name: 'Trắng mây nhẹ', role: 'Màu nền' }
          ],
          keywords: ['Mùa vàng', 'Trà thủ công', 'Thanh tao', 'Việt Nam'],
          cards: [
            { id: 'card-lua-1', title: 'Họa tiết bông lúa uốn cong', category: 'Biểu trưng', image: 'assets/moodboard.svg', notes: 'Đường cong biểu trưng cho sự trù phú và vụ mùa bội thu.' }
          ]
        }
      ],
      briefTemplates: [
        {
          id: 'bt-01',
          name: 'Nhận diện thương hiệu (Branding Identity)',
          category: 'Branding',
          status: 'Active Template',
          description: 'Mẫu brief chuẩn hóa dự án thiết kế logo, định vị thương hiệu, hệ màu và quy chuẩn ấn phẩm.',
          sections: ['Mục tiêu thương hiệu', 'Khách hàng mục tiêu', 'Sản phẩm bàn giao (Deliverables)', 'Định hướng thẩm mỹ & Tone of Voice', 'Ngân sách & Timeline'],
          promptTemplate: 'Bạn là Giám đốc Sáng tạo AI của CreatorStudio. Hãy phân tích yêu cầu sau và cấu trúc thành brief Branding: 1. Mục tiêu cốt lõi; 2. Giá trị định vị; 3. Deliverables thiết yếu; 4. Tone of Voice; 5. Rủi ro sáng tạo. Dữ liệu: {raw_input}'
        },
        {
          id: 'bt-02',
          name: 'Thiết kế bao bì sản phẩm (Packaging Design)',
          category: 'Packaging',
          status: 'Active Template',
          description: 'Quy chuẩn brief cho bao bì hộp quà, túi cà phê, nhãn chai, quy cách in ấn và kích thước.',
          sections: ['Quy cách & Kích thước bao bì', 'Chất liệu in ấn dự kiến', 'Thông tin bắt buộc trên nhãn', 'Phong cách thị giác mong muốn', 'Hạn nộp market'],
          promptTemplate: 'Bạn là Chuyên gia Bao bì AI. Hãy phân tích mô tả khách hàng sau và cấu trúc thành brief Packaging: 1. Thông số kỹ thuật & quy cách; 2. Chất liệu gợi ý; 3. Cấu trúc mặt trước & mặt sau; 4. Yêu cầu nhãn hàng; 5. Bảng màu khuyến nghị. Dữ liệu: {raw_input}'
        },
        {
          id: 'bt-03',
          name: 'Giao diện Web / App (UI/UX Digital Product)',
          category: 'UI/UX',
          status: 'Custom',
          description: 'Mẫu brief cho website doanh nghiệp, ứng dụng di động, landing page sáng tạo.',
          sections: ['User Persona & Hành vi', 'Tính năng chính & User Flow', 'Phong cách UI mong muốn', 'Deliverables (Figma, Prototype)', 'Thời gian bàn giao'],
          promptTemplate: 'Bạn là Lead Product Designer AI. Hãy phân tích mô tả của khách hàng và chuẩn hóa thành brief UI/UX: 1. User Journey cốt lõi; 2. Danh sách màn hình then chốt; 3. Hệ màu & design token gợi ý; 4. Yêu cầu responsive. Dữ liệu: {raw_input}'
        },
        {
          id: 'bt-04',
          name: 'Chiến dịch truyền thông (Creative Campaign)',
          category: 'Campaign',
          status: 'Inactive',
          description: 'Mẫu brief cho bộ ấn phẩm social media, banner quảng cáo, sự kiện ra mắt sản phẩm.',
          sections: ['Thông điệp chiến dịch', 'Kênh phát hành (Facebook, TikTok...)', 'Kích thước & định dạng ấn phẩm', 'Key Visual ý tưởng', 'Deadline từng giai đoạn'],
          promptTemplate: 'Bạn là Creative Strategist AI. Hãy biến ý tưởng truyền thông thô thành brief chiến dịch: 1. Key Message; 2. Concept Key Visual; 3. Danh mục ấn phẩm đa kênh; 4. Tone & Mood. Dữ liệu: {raw_input}'
        }
      ],
      notifications: [
        { id: 'notif-1', userId: 'u-an', projectId: 'p-moc', type: 'comment', title: 'Khánh Chi đã nhận xét trên Phiên bản 2', message: 'Tên sản phẩm hơi nhỏ. Tăng cỡ chữ để dễ đọc hơn.', time: '2026-10-05T09:15:00+07:00', read: false, link: 'designer-version-management.html' },
        { id: 'notif-2', userId: 'u-an', projectId: 'p-moc', type: 'task', title: 'Nhiệm vụ gấp: Hoàn thiện mặt trước túi', message: 'Hạn hoàn thành hôm nay (05/10). Vui lòng cập nhật tiến độ.', time: '2026-10-05T08:00:00+07:00', read: false, link: 'designer-dashboard.html' },
        { id: 'notif-3', userId: 'u-an', projectId: 'p-moc', type: 'version', title: 'Linh Hà (Lead) đang duyệt Phiên bản 3', message: 'Phiên bản v3 đã được gửi vào hàng đợi duyệt nội bộ.', time: '2026-10-02T08:35:00+07:00', read: true, link: 'designer-version-management.html' },
        { id: 'notif-4', userId: 'u-an', projectId: 'p-moc', type: 'system', title: 'Cập nhật quy tắc phiên bản studio', message: 'Quy tắc đặt tên {project}-{asset}-v{number} đã được áp dụng.', time: '2026-10-01T14:20:00+07:00', read: true, link: 'designer-version-management.html' },
        { id: 'notif-5', userId: 'u-an', projectId: 'p-moc', type: 'task', title: 'CS-101 Phác thảo nhãn cà phê', message: 'Bạn được phân công phụ trách nhiệm vụ này bởi Linh Hà.', time: '2026-10-01T09:00:00+07:00', read: true, link: 'designer-dashboard.html' }
      ],
      proposals: [],
      tags: ['Branding', 'Packaging', 'Mùa hè'],
      settings: {
        warningDays: 2,
        versionPattern: '{project}-{asset}-v{number}',
        requireReview: true
      },
      activity: [
        { id: 'a-1', text: 'An Nguyễn đã gửi phiên bản v3 để duyệt nội bộ.', time: '2026-10-02T08:30:00+07:00' },
        { id: 'a-2', text: 'Khánh Chi đã gửi phản hồi cho phiên bản v2.', time: '2026-09-30T16:00:00+07:00' },
        { id: 'a-3', text: 'An Nguyễn đã cập nhật Moodboard Mộc Coffee sang Palette Ready.', time: '2026-10-04T15:30:00+07:00' }
      ]
    };
  }

  // 2. Đọc và lưu dữ liệu demo. Các trang dùng cùng một khóa LocalStorage.
  function docDuLieu() {
    const mau = CS_SEED();
    try {
      const daLuu = JSON.parse(localStorage.getItem('creatorstudio.v1') || localStorage.getItem('creatorstudio.sv3.v1') || 'null');
      if (daLuu && typeof daLuu === 'object') {
        for (const ten in mau) {
          if (Array.isArray(mau[ten]) && !Array.isArray(daLuu[ten])) daLuu[ten] = mau[ten];
        }
        if (!daLuu.settings) daLuu.settings = mau.settings;
        return daLuu;
      }
    } catch (loi) {
      console.warn('Không đọc được dữ liệu cũ, dùng dữ liệu mẫu.');
    }
    return mau;
  }

  function luuDuLieu() {
    try {
      const chuoi = JSON.stringify(duLieu);
      localStorage.setItem('creatorstudio.v1', chuoi);
      localStorage.setItem('creatorstudio.sv3.v1', chuoi);
      return true;
    } catch (loi) {
      hienThongBao('Không lưu được dữ liệu. Hãy kiểm tra dung lượng trình duyệt.');
      return false;
    }
  }

  const duLieu = docDuLieu();
  let maNguoiDung = sessionStorage.getItem('cs-user');
  if (!maNguoiDung) {
    try { maNguoiDung = JSON.parse(localStorage.getItem('currentUser') || 'null')?.id; } catch (loi) { /* Dùng tài khoản mẫu bên dưới. */ }
  }
  const nguoiDung = duLieu.users.find(function (u) { return u.id === maNguoiDung && u.active; }) || duLieu.users.find(function (u) { return u.active; });
  const duAn = duLieu.projects.find(function (p) { return p.id === sessionStorage.getItem('cs-project'); }) || duLieu.projects[0];
  const tenVaiTro = { Designer: 'Nhà thiết kế', Admin: 'Quản trị viên', Lead: 'Trưởng nhóm', Client: 'Khách hàng' };

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

  function doiVaiTro(vaiTro) {
    const taiKhoan = duLieu.users.find(function (u) { return u.active && u.role === vaiTro; });
    if (!taiKhoan) { hienThongBao('Không có tài khoản mẫu cho vai trò này.'); return; }
    sessionStorage.setItem('cs-user', taiKhoan.id);
    localStorage.setItem('currentUser', JSON.stringify({ id: taiKhoan.id, name: taiKhoan.name, role: taiKhoan.role }));
    location.href = trangChu(vaiTro);
  }

  function coTheSuaDuAn() {
    if (duAn.archived) { hienThongBao('Dự án đã lưu trữ, chỉ được xem.'); return false; }
    return true;
  }

  // Mỗi danh sách có một mẫu HTML riêng, chỉ sao chép mẫu và điền textContent.
  function saoChepMau(id) {
    return document.getElementById(id).content.firstElementChild.cloneNode(true);
  }

  function moBieuMau(idMau, tieuDe, khiLuu) {
    const hop = document.getElementById('dialog');
    hop.querySelector('h2').textContent = tieuDe;
    const form = saoChepMau(idMau);
    hop.querySelector('.modal-body').replaceChildren(form);
    hop.querySelector('[data-close]').onclick = function () { hop.close(); };
    form.onsubmit = async function (suKien) {
      suKien.preventDefault();
      const nutLuu = form.querySelector('[type="submit"]');
      nutLuu.disabled = true;
      try {
        const thongTin = Object.fromEntries(new FormData(form));
        await khiLuu(thongTin, form);
        hop.close();
      } catch (loi) {
        form.querySelector('.form-error').textContent = loi.message;
      } finally { nutLuu.disabled = false; }
    };
    hop.showModal();
    return form;
  }

  // 4. Menu, vai trò, dự án và thông tin người dùng ở đầu trang.
  const tenTrang = location.pathname.split('/').pop();
  const canDesigner = tenTrang.startsWith('designer-');
  const canAdmin = tenTrang.startsWith('admin-');
  if ((canDesigner && nguoiDung.role !== 'Designer') || (canAdmin && nguoiDung.role !== 'Admin')) {
    location.replace('404.html?code=403');
    return;
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
    function dongMenu() {
      document.body.classList.remove('menu-open'); manChe.hidden = true; menu.setAttribute('aria-expanded', 'false');
    }
    menu.onclick = function () {
      document.body.classList.add('menu-open'); manChe.hidden = false; menu.setAttribute('aria-expanded', 'true');
    };
    document.querySelector('.mobile-close').onclick = dongMenu;
    manChe.onclick = dongMenu;
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') dongMenu(); });
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
