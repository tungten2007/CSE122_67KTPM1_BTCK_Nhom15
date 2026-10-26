'use strict';

// Trục chéo SV2: dữ liệu và lưu trữ độc lập với DOM/giao diện.
// Tất cả vai trò phải dùng cùng API này và cùng địa chỉ/cổng trình duyệt.
function taoKhoDuLieu(khoLuuTru) {
  const keys = ['creatorstudio.v1', 'creatorstudio.sv3.v1'];
  let snapshot = null;
  let readError = null;

  function fail(code, message, data) {
    return { ok: false, data: data || null, error: { code: code, message: message } };
  }
  function storage() { return khoLuuTru || localStorage; }
  function normalise(data) {
    if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Dữ liệu phải là một đối tượng.');
    if (data.schema !== undefined && data.schema !== 1) throw new Error('Phiên bản dữ liệu chưa được hỗ trợ.');
    const seed = CS_SEED();
    const result = { ...data, schema: 1 };
    Object.keys(seed).forEach(function (key) {
      if (!Array.isArray(seed[key])) return;
      if (result[key] === undefined) result[key] = seed[key];
      else if (!Array.isArray(result[key])) throw new Error('Danh sách ' + key + ' không đúng cấu trúc.');
    });
    if (result.settings !== undefined && (!result.settings || typeof result.settings !== 'object' || Array.isArray(result.settings))) throw new Error('Cài đặt không đúng cấu trúc.');
    result.settings = { ...seed.settings, ...result.settings };
    return result;
  }

  function load() {
    const fallback = CS_SEED();
    try {
      const store = storage();
      snapshot = keys.map(function (key) { return store.getItem(key); });
      if (snapshot[0] && snapshot[1] && snapshot[0] !== snapshot[1]) {
        readError = { code: 'ALIAS_CONFLICT', message: 'Hai nguồn dữ liệu chưa đồng bộ. Giữ nguyên dữ liệu cũ; cần đối chiếu trước khi lưu.' };
        return { ok: false, data: fallback, error: readError };
      }
      const raw = snapshot[0] || snapshot[1];
      const data = raw === null ? fallback : normalise(JSON.parse(raw));
      readError = null;
      return { ok: true, data: data, error: null };
    } catch (error) {
      readError = { code: 'READ_ERROR', message: 'Không đọc được dữ liệu đã lưu. Dữ liệu cũ được giữ nguyên; hãy thử đọc lại.' };
      return { ok: false, data: fallback, error: readError };
    }
  }

  function save(data) {
    if (readError) return { ok: false, data: null, error: readError };
    if (!snapshot) return fail('LOAD_REQUIRED', 'Hãy đọc dữ liệu trước khi lưu.');
    let store, previous;
    const written = [];
    try {
      store = storage();
      previous = keys.map(function (key) { return store.getItem(key); });
      if (previous.some(function (raw, i) { return raw !== snapshot[i]; })) return fail('STALE_DATA', 'Dữ liệu đã thay đổi ở trang khác. Hãy tải lại trước khi lưu để tránh ghi đè.');
      const clean = normalise(data);
      const raw = JSON.stringify(clean);
      keys.forEach(function (key) { store.setItem(key, raw); written.push(key); });
      snapshot = [raw, raw];
      return { ok: true, data: clean, error: null };
    } catch (error) {
      // Nếu ghi khóa thứ hai thất bại, cố gắng khôi phục khóa đã ghi trước đó.
      try {
        written.reverse().forEach(function (key) {
          const old = previous[keys.indexOf(key)];
          if (old === null) store.removeItem(key); else store.setItem(key, old);
        });
      } catch (rollbackError) {
        readError = { code: 'ROLLBACK_ERROR', message: 'Chưa khôi phục được dữ liệu sau lỗi lưu. Hãy giữ trang hiện tại và kiểm tra bộ nhớ trước khi thử lại.' };
        return { ok: false, data: null, error: readError };
      }
      return fail('WRITE_ERROR', 'Không lưu được dữ liệu. Hãy kiểm tra cấu trúc dữ liệu hoặc dung lượng trình duyệt.');
    }
  }

  function getCurrentUser() {
    try {
      const user = JSON.parse(storage().getItem('currentUser') || 'null');
      return { ok: true, data: user && typeof user === 'object' ? user : null, error: null };
    } catch (error) { return fail('IDENTITY_READ_ERROR', 'Chưa đọc được tài khoản demo.'); }
  }
  function setCurrentUser(user) {
    try {
      const data = { id: user.id, name: user.name, role: user.role };
      storage().setItem('currentUser', JSON.stringify(data));
      return { ok: true, data: data, error: null };
    } catch (error) { return fail('IDENTITY_WRITE_ERROR', 'Chưa lưu được tài khoản demo. Hãy kiểm tra bộ nhớ trình duyệt.'); }
  }

  return { keys: keys, load: load, save: save, seed: CS_SEED,
    getCurrentUser: getCurrentUser, setCurrentUser: setCurrentUser };
}

const CreatorStudioAPI = taoKhoDuLieu();

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

