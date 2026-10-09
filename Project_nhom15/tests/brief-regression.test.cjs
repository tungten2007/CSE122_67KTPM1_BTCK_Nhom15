// Regression dùng DOM giả lập, không thay thế trình duyệt thật.
const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const root=require('node:path').join(__dirname,'..');const nodes=new Map();const $=s=>{if(!nodes.has(s))nodes.set(s,{innerHTML:'',close(){}});return nodes.get(s)};let modal;
const context={window:{},console};context.window=context;vm.createContext(context);vm.runInContext(fs.readFileSync(root+'/js/data.js','utf8'),context);
const d=context.CS_SEED();const A={data:d,project:d.projects[0],user:d.users[1],stateLabel:{todo:'Cần làm',doing:'Đang làm',review:'Chờ duyệt',done:'Hoàn thành'},preserveFocus:fn=>fn(),header:()=>'',banner:()=>'',esc:s=>String(s??''),icon:()=>'',initials:()=>'',date:s=>s,priority:()=>'',people:()=>[['u-an','An']],field:(l,n)=>`<input name="${n}">`,textField:(l,n)=>`<textarea name="${n}"></textarea>`,select:(l,n)=>`<select name="${n}"></select>`,modal:(title,body,submit)=>modal={title,body,submit},init:(k,fn)=>fn(),$,$$:()=>[]};context.App=A;context.Store={};vm.runInContext(fs.readFileSync(root+'/js/pages/lead-task-board.js','utf8'),context);
$('#new-task').onclick();assert(modal.body.includes('name="status"'));
$('#briefs').onclick();$('#approve-brief').onclick();assert.equal(modal.title,'Duyệt brief & giao việc');assert(!modal.body.includes('name="status"'));assert(modal.body.includes('cột Cần làm'));
console.log('PASS task dialog retains status; brief approval states Todo and has no ignored dropdown. Stub DOM only.');
