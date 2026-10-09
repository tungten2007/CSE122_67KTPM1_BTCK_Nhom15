const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const storage=()=>{const m=new Map();return {getItem:k=>m.get(k)||null,setItem:(k,v)=>m.set(k,v),clear:()=>m.clear()}};
const ctx={window:{},localStorage:storage(),sessionStorage:storage()};ctx.window=ctx;vm.createContext(ctx);
for(const f of ['js/data.js','js/modules/navigation.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',f),'utf8'),ctx);
const N=ctx.Navigation,users=ctx.CS_SEED().users;
for(const [role,file] of Object.entries({Lead:'lead-task-board.html',Admin:'admin-user-management.html',Client:'role-preview.html',Designer:'role-preview.html'})){
 assert.equal(N.activate(role,users),file);assert.equal(N.current(users).role,role);assert.equal(JSON.parse(ctx.localStorage.getItem('currentUser')).role,role);assert(fs.existsSync(path.join(__dirname,'..',file)));
}console.log('PASS 4 vai trò: chọn tài khoản hoạt động, lưu currentUser và URL đích tồn tại');
ctx.sessionStorage.clear();assert.equal(N.current(users).role,'Designer');console.log('PASS khôi phục vai trò qua phiên mới');
assert(N.canOpen('board',users.find(u=>u.role==='Lead')));assert(!N.canOpen('users',users.find(u=>u.role==='Lead')));assert(N.canOpen('users',users.find(u=>u.role==='Admin')));assert(!N.canOpen('board',users.find(u=>u.role==='Admin')));assert(!N.canOpen('board',{role:'Lead',active:false}));assert(!N.canOpen('missing',users[0]));assert(N.canOpen('error',null));console.log('PASS bảo vệ điều hướng đúng vai trò và tài khoản hoạt động');
assert(N.canOpen('rolePreview',users.find(u=>u.role==='Client')));assert(!N.canOpen('rolePreview',users.find(u=>u.role==='Lead')));assert.throws(()=>N.activate('unknown',users));assert.throws(()=>N.activate('Admin',users.map(u=>({...u,active:false}))));console.log('PASS vai trò thiếu/tài khoản bị khóa và trang chờ ghép');
N.integrations.Client.ready=true;assert.equal(N.home('Client'),'client-project-overview.html');N.integrations.Client.ready=false;console.log('PASS cấu hình ghép phân hệ (URL thật chỉ bật khi ready)');
console.log('5 nhóm kiểm thử điều hướng đạt. Không thay thế test DOM/trình duyệt.');
