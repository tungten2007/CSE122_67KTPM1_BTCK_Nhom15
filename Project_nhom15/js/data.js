/* Dữ liệu minh họa độc lập. Không chứa tài khoản hay mật khẩu thật. */
window.CS_SEED = () => ({
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
