/* Dữ liệu minh họa độc lập. Không chứa tài khoản hay mật khẩu thật. */
const seedSV3 = () => ({
  schema: 1,
  users: [
    {id:'u-admin',name:'Minh Anh',email:'minhanh@example.com',role:'Admin',active:true},
    {id:'u-lead',name:'Linh Hà',email:'linhha@example.com',role:'Lead',active:true},
    {id:'u-an',name:'An Nguyễn',email:'annguyen@example.com',role:'Designer',active:true},
    {id:'u-ngoc',name:'Bảo Ngọc',email:'baongoc@example.com',role:'Designer',active:true},
    {id:'u-chi',name:'Khánh Chi',email:'khanhchi@example.com',role:'Client',active:true},
    {id:'u-binh',name:'Bình Trần',email:'binhtran@example.com',role:'Designer',active:false},
    {id:'u-admin2',name:'Hồng Phúc',email:'hongphuc@example.com',role:'Admin',active:true},
    {id:'u-lead2',name:'Thùy Dương',email:'thuyduong@example.com',role:'Lead',active:true},
    {id:'u-minh',name:'Minh Khoa',email:'minhkhoa@example.com',role:'Designer',active:true},
    {id:'u-lan',name:'Lan Anh',email:'lananh@example.com',role:'Designer',active:true},
    {id:'u-dat',name:'Gia Đạt',email:'giadat@example.com',role:'Designer',active:true},
    {id:'u-trang',name:'Bảo Trang',email:'baotrang@example.com',role:'Designer',active:true},
    {id:'u-kiet',name:'Quốc Kiệt',email:'quockiet@example.com',role:'Designer',active:true},
    {id:'u-ha',name:'Hà My',email:'hamy@example.com',role:'Client',active:true},
    {id:'u-nam',name:'Anh Nam',email:'anhnam@example.com',role:'Client',active:true}
  ],
  projects:[
    {id:'p-moc',name:'Mộc Coffee',code:'MC26',description:'Nhận diện & bao bì cà phê',archived:false,tags:['Branding','Packaging']},
    {id:'p-lua',name:'Lúa Tea',code:'LT26',description:'Bộ nhận diện trà thủ công',archived:false,tags:['Branding']}
  ],
  tasks:[
    {id:'CS-101',projectId:'p-moc',title:'Phác thảo nhãn cà phê',description:'Phát triển 3 hướng nhãn dựa trên brief đã duyệt.',assignee:'u-an',priority:'high',status:'todo',due:'2026-10-06',type:'Thiết kế'},
    {id:'CS-102',projectId:'p-moc',title:'Chuẩn hóa thông tin bao bì',description:'Kiểm tra thành phần, trọng lượng và nguồn gốc.',assignee:'u-ngoc',priority:'medium',status:'todo',due:'2026-10-07',type:'Nội dung'},
    {id:'CS-103',projectId:'p-moc',title:'Hoàn thiện mặt trước túi',description:'Tối ưu khoảng trắng và phân cấp chữ.',assignee:'u-an',priority:'high',status:'doing',due:'2026-10-05',type:'Thiết kế'},
    {id:'CS-104',projectId:'p-moc',title:'Bổ sung bảng màu',description:'So sánh màu in thực tế với moodboard.',assignee:'u-ngoc',priority:'medium',status:'doing',due:'2026-10-06',type:'Moodboard'},
    {id:'CS-105',projectId:'p-moc',title:'Duyệt phiên bản v3',description:'Đánh giá thiết kế trước khi gửi khách hàng.',assignee:'u-lead',priority:'high',status:'review',due:'2026-10-07',type:'Duyệt nội bộ'},
    {id:'CS-106',projectId:'p-moc',title:'Chốt hướng hình ảnh',description:'Thống nhất chất liệu và định hướng hình ảnh.',assignee:'u-lead',priority:'low',status:'done',due:'2026-10-02',type:'Định hướng'},
    {id:'CS-107',projectId:'p-lua',title:'Bàn giao logo Lúa Tea',description:'Đã xác nhận bàn giao với khách hàng.',assignee:'u-an',priority:'medium',status:'done',due:'2026-10-01',type:'Bàn giao'},
    {id:'CS-108',projectId:'p-moc',title:'Rà soát nhãn mặt sau',description:'Đối chiếu thông tin thành phần và hướng dẫn sử dụng.',assignee:'u-dat',priority:'high',status:'todo',due:'2026-10-30',type:'Nội dung'},
    {id:'CS-109',projectId:'p-moc',title:'Hoàn thiện bộ màu in',description:'So sánh phương án màu in trên giấy kraft.',assignee:'u-trang',priority:'medium',status:'doing',due:'2026-10-31',type:'Thiết kế'},
    {id:'CS-110',projectId:'p-moc',title:'Kiểm tra mockup hộp quà',description:'Rà soát kích thước hộp và vị trí nhãn.',assignee:'u-lead2',priority:'high',status:'review',due:'2026-11-01',type:'Duyệt'},
    {id:'CS-111',projectId:'p-moc',title:'Chuẩn bị file bàn giao',description:'Sắp xếp file nguồn và phiên bản xuất cuối.',assignee:'u-minh',priority:'low',status:'done',due:'2026-10-25',type:'Bàn giao'},
    {id:'CS-112',projectId:'p-moc',title:'Chụp ảnh sản phẩm',description:'Chuẩn bị danh sách góc chụp cho bộ bao bì.',assignee:'u-kiet',priority:'medium',status:'todo',due:'2026-11-02',type:'Nội dung'},
    {id:'CS-113',projectId:'p-lua',title:'Duyệt biến thể màu',description:'So sánh bảng màu theo hướng mới của khách hàng.',assignee:'u-lan',priority:'low',status:'cancelled',cancelReason:'Khách hàng thay đổi hướng màu sắc.',due:'2026-10-29',type:'Thiết kế'},
    {id:'CS-114',projectId:'p-lua',title:'Hoàn thiện guideline thương hiệu',description:'Tổng hợp quy chuẩn sử dụng logo và màu sắc.',assignee:'u-lead2',priority:'medium',status:'cancelled',cancelReason:'Dự án tạm dừng theo yêu cầu khách hàng.',due:'2026-10-28',type:'Tài liệu'},
    {id:'CS-115',projectId:'p-lua',title:'Xuất file logo',description:'Xuất định dạng SVG, PNG và PDF.',assignee:'u-minh',priority:'high',status:'review',due:'2026-11-03',type:'Bàn giao'}
  ],
  briefs:[{id:'b-01',projectId:'p-moc',title:'Bộ quà tặng mùa lễ hội',client:'Khánh Chi',summary:'Thiết kế hộp quà 2 túi cà phê, phong cách tự nhiên, tinh tế; dùng giấy kraft và màu xanh rừng.',audience:'Người yêu cà phê 25–40 tuổi',deliverables:'01 hộp quà, 02 nhãn túi và 01 thiệp',deadline:'2026-10-20',status:'submitted',reason:''}],
  versions:[{id:'v-moc-3',projectId:'p-moc',name:'Túi cà phê · Phiên bản 3',status:'Internal Review',author:'u-an',checkBrand:false,checkInfo:false,history:[]}],
  notes:[{id:'n-1',versionId:'v-moc-3',text:'Tên sản phẩm hơi nhỏ. Tăng độ rõ khi thu nhỏ.',x:54,y:38,resolved:false}],
  comments:[
    {id:'C-01',projectId:'p-moc',versionId:'v-moc-3',author:'Khánh Chi',text:'Tên sản phẩm hơi nhỏ. Tăng cỡ chữ để dễ đọc.'},
    {id:'C-02',projectId:'p-moc',versionId:'v-moc-3',author:'Khánh Chi',text:'Bổ sung hướng dẫn pha trên mặt sau của túi.'},
    {id:'C-03',projectId:'p-moc',versionId:'v-moc-3',author:'Khánh Chi',text:'Màu này trông chưa thật sự cao cấp.'}
  ],
  proposals:[],
  tags:['Branding','Packaging','Mùa hè'],
  settings:{warningDays:2,versionPattern:'{project}-{asset}-v{number}',requireReview:true},
  activity:[{id:'a-seed',text:'An Nguyễn đã gửi phiên bản v3 để duyệt nội bộ.',time:'2026-10-02T08:30:00+07:00'}]
});

/* Dữ liệu mẫu tập trung cho CreatorStudio - Phân hệ SV2 & Dùng chung */
const seedSV2 = () => ({
  schema: 1,
  users: [
    {id: 'u-an', name: 'An Nguyễn', email: 'annguyen@example.com', role: 'Designer', active: true, title: 'Senior Packaging Designer', bio: 'Chuyên sâu về bao bì, visual branding và hệ màu in ấn tự nhiên.', avatarText: 'AN'},
    {id: 'u-ngoc', name: 'Bảo Ngọc', email: 'baongoc@example.com', role: 'Designer', active: true, title: 'Visual Designer', bio: 'Thiết kế moodboard, minh họa và nhận diện thương hiệu.', avatarText: 'BN'},
    {id: 'u-lead', name: 'Linh Hà', email: 'linhha@example.com', role: 'Lead', active: true, title: 'Creative Director', bio: 'Điều phối dự án sáng tạo và kiểm soát chất lượng thiết kế.', avatarText: 'LH'},
    {id: 'u-admin', name: 'Minh Anh', email: 'minhanh@example.com', role: 'Admin', active: true, title: 'Studio Administrator', bio: 'Quản trị hệ thống, chuẩn hóa template brief và cấu hình AI.', avatarText: 'MA'},
    {id: 'u-chi', name: 'Khánh Chi', email: 'khanhchi@example.com', role: 'Client', active: true, title: 'Đại diện Mộc Coffee', bio: 'Khách hàng đại diện thương hiệu Mộc Coffee.', avatarText: 'KC'},
    {id: 'u-binh', name: 'Bình Trần', email: 'binhtran@example.com', role: 'Designer', active: false, title: 'Freelance Designer', bio: 'Tài khoản tạm ngừng hoạt động.', avatarText: 'BT'}
  ],
  projects: [
    {id: 'p-moc', name: 'Mộc Coffee', code: 'MC26', description: 'Nhận diện & bao bì cà phê nguyên bản', archived: false, tags: ['Branding', 'Packaging']},
    {id: 'p-lua', name: 'Lúa Tea', code: 'LT26', description: 'Bộ nhận diện trà thủ công truyền thống', archived: false, tags: ['Branding']}
  ],
  tasks: [
    {id: 'CS-101', projectId: 'p-moc', title: 'Phác thảo nhãn cà phê', description: 'Phát triển 3 hướng nhãn dựa trên brief đã duyệt.', assignee: 'u-an', priority: 'high', status: 'todo', due: '2026-10-06', type: 'Thiết kế'},
    {id: 'CS-102', projectId: 'p-moc', title: 'Chuẩn hóa thông tin bao bì', description: 'Kiểm tra thành phần, trọng lượng và nguồn gốc.', assignee: 'u-ngoc', priority: 'medium', status: 'todo', due: '2026-10-07', type: 'Nội dung'},
    {id: 'CS-103', projectId: 'p-moc', title: 'Hoàn thiện mặt trước túi', description: 'Tối ưu khoảng trắng và phân cấp chữ, tăng cỡ font chữ MỘC theo yêu cầu.', assignee: 'u-an', priority: 'high', status: 'doing', due: '2026-10-05', type: 'Thiết kế', urgent: true},
    {id: 'CS-104', projectId: 'p-moc', title: 'Bổ sung bảng màu', description: 'So sánh màu in thực tế với moodboard.', assignee: 'u-ngoc', priority: 'medium', status: 'doing', due: '2026-10-06', type: 'Moodboard'},
    {id: 'CS-105', projectId: 'p-moc', title: 'Duyệt phiên bản v3', description: 'Đánh giá thiết kế trước khi gửi khách hàng.', assignee: 'u-lead', priority: 'high', status: 'review', due: '2026-10-07', type: 'Duyệt nội bộ'},
    {id: 'CS-106', projectId: 'p-moc', title: 'Chốt hướng hình ảnh', description: 'Thống nhất chất liệu và định hướng hình ảnh.', assignee: 'u-lead', priority: 'low', status: 'done', due: '2026-10-02', type: 'Định hướng'},
    {id: 'CS-107', projectId: 'p-lua', title: 'Bàn giao logo Lúa Tea', description: 'Đã xác nhận bàn giao với khách hàng.', assignee: 'u-an', priority: 'medium', status: 'done', due: '2026-10-01', type: 'Bàn giao'}
  ],
  briefs: [
    {id: 'b-01', projectId: 'p-moc', title: 'Bộ quà tặng mùa lễ hội', client: 'Khánh Chi', summary: 'Thiết kế hộp quà 2 túi cà phê, phong cách tự nhiên, tinh tế; dùng giấy kraft và màu xanh rừng.', audience: 'Người yêu cà phê 25–40 tuổi', deliverables: '01 hộp quà, 02 nhãn túi và 01 thiệp', deadline: '2026-10-20', status: 'submitted', reason: ''}
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
      history: [{action: 'created', time: '2026-09-20T10:00:00+07:00'}, {action: 'archived', time: '2026-09-27T09:00:00+07:00'}]
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
        {action: 'submitted', time: '2026-09-28T14:30:00+07:00'},
        {action: 'changes_requested', reason: 'Tên sản phẩm hơi nhỏ. Bổ sung hướng dẫn pha trên mặt sau của túi.', time: '2026-09-30T16:00:00+07:00'}
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
      history: [{action: 'submitted_internal', time: '2026-10-02T08:30:00+07:00'}]
    }
  ],
  notes: [
    {id: 'n-1', versionId: 'v-moc-3', text: 'Tên sản phẩm hơi nhỏ. Tăng độ rõ khi thu nhỏ.', x: 54, y: 38, resolved: false}
  ],
  comments: [
    {id: 'C-01', projectId: 'p-moc', versionId: 'v-moc-3', author: 'Khánh Chi', text: 'Tên sản phẩm hơi nhỏ. Tăng cỡ chữ để dễ đọc.'},
    {id: 'C-02', projectId: 'p-moc', versionId: 'v-moc-3', author: 'Khánh Chi', text: 'Bổ sung hướng dẫn pha trên mặt sau của túi.'},
    {id: 'C-03', projectId: 'p-moc', versionId: 'v-moc-3', author: 'Khánh Chi', text: 'Màu này trông chưa thật sự cao cấp.'}
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
        {hex: '#24473b', name: 'Xanh rừng già (Forest)', role: 'Màu chủ đạo'},
        {hex: '#cbbb97', name: 'Giấy Kraft (Warm Kraft)', role: 'Màu nền / Bao bì'},
        {hex: '#f6f1e5', name: 'Trắng kem mộc (Cream)', role: 'Màu tương phản phụ'},
        {hex: '#5a4434', name: 'Nâu hạt rang (Espresso Roast)', role: 'Màu chữ & Nhấn'}
      ],
      keywords: ['Nguyên bản', 'Organic / Tự nhiên', 'Thủ công mỹ nghệ', 'Tối giản Bắc Âu', 'Ấm áp & Tin cậy'],
      cards: [
        {id: 'card-1', title: 'Chất liệu túi giấy Kraft có vân sần', category: 'Chất liệu', image: 'assets/moodboard.svg', notes: 'Bề mặt sần nhẹ tạo cảm giác mộc mạc, thân thiện với môi trường.'},
        {id: 'card-2', title: 'Typography Serif cổ điển vững chãi', category: 'Typography', image: 'assets/coffee.svg', notes: 'Font chữ MỘC với đường nét dày dặn, sang trọng nhưng gần gũi.'},
        {id: 'card-3', title: 'Họa tiết lá chè & hạt cà phê cách điệu', category: 'Graphic Motif', image: 'assets/moodboard.svg', notes: 'Nét vẽ line-art màu vàng cát trên nền xanh sẫm tối giản.'}
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
        {hex: '#d4af37', name: 'Vàng lúa chín', role: 'Màu chủ đạo'},
        {hex: '#4a7c59', name: 'Xanh búp trà', role: 'Màu điểm nhấn'},
        {hex: '#fbf9f1', name: 'Trắng mây nhẹ', role: 'Màu nền'}
      ],
      keywords: ['Mùa vàng', 'Trà thủ công', 'Thanh tao', 'Việt Nam'],
      cards: [
        {id: 'card-lua-1', title: 'Họa tiết bông lúa uốn cong', category: 'Biểu trưng', image: 'assets/moodboard.svg', notes: 'Đường cong biểu trưng cho sự trù phú và vụ mùa bội thu.'}
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
    {id: 'notif-1', userId: 'u-an', projectId: 'p-moc', type: 'comment', title: 'Khánh Chi đã nhận xét trên Phiên bản 2', message: 'Tên sản phẩm hơi nhỏ. Tăng cỡ chữ để dễ đọc hơn.', time: '2026-10-05T09:15:00+07:00', read: false, link: 'html/sv2/designer-version-management.html'},
    {id: 'notif-2', userId: 'u-an', projectId: 'p-moc', type: 'task', title: 'Nhiệm vụ gấp: Hoàn thiện mặt trước túi', message: 'Hạn hoàn thành hôm nay (05/10). Vui lòng cập nhật tiến độ.', time: '2026-10-05T08:00:00+07:00', read: false, link: 'html/sv2/designer-dashboard.html'},
    {id: 'notif-3', userId: 'u-an', projectId: 'p-moc', type: 'version', title: 'Linh Hà (Lead) đang duyệt Phiên bản 3', message: 'Phiên bản v3 đã được gửi vào hàng đợi duyệt nội bộ.', time: '2026-10-02T08:35:00+07:00', read: true, link: 'html/sv2/designer-version-management.html'},
    {id: 'notif-4', userId: 'u-an', projectId: 'p-moc', type: 'system', title: 'Cập nhật quy tắc phiên bản studio', message: 'Quy tắc đặt tên {project}-{asset}-v{number} đã được áp dụng.', time: '2026-10-01T14:20:00+07:00', read: true, link: 'html/sv2/designer-version-management.html'},
    {id: 'notif-5', userId: 'u-an', projectId: 'p-moc', type: 'task', title: 'CS-101 Phác thảo nhãn cà phê', message: 'Bạn được phân công phụ trách nhiệm vụ này bởi Linh Hà.', time: '2026-10-01T09:00:00+07:00', read: true, link: 'html/sv2/designer-dashboard.html'}
  ],
  proposals: [],
  tags: ['Branding', 'Packaging', 'Mùa hè'],
  settings: {
    warningDays: 2,
    versionPattern: '{project}-{asset}-v{number}',
    requireReview: true
  },
  activity: [
    {id: 'a-1', text: 'An Nguyễn đã gửi phiên bản v3 để duyệt nội bộ.', time: '2026-10-02T08:30:00+07:00'},
    {id: 'a-2', text: 'Khánh Chi đã gửi phản hồi cho phiên bản v2.', time: '2026-09-30T16:00:00+07:00'},
    {id: 'a-3', text: 'An Nguyễn đã cập nhật Moodboard Mộc Coffee sang Palette Ready.', time: '2026-10-04T15:30:00+07:00'}
  ]
});

window.CS_SEED=()=>{const a=seedSV3(),b=seedSV2();for(const [k,v] of Object.entries(b)){if(Array.isArray(v)&&k!=='tags'){const old=a[k]||[];a[k]=old.map(x=>({...v.find(y=>y.id===x.id),...x}));for(const x of v)if(!a[k].some(y=>y.id===x.id))a[k].push(x)}}return a};
