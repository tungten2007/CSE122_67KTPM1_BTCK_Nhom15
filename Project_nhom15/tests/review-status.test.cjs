// Regression dùng DOM giả lập, không thay thế trình duyệt thật.
const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const root=require('node:path').join(__dirname,'..');
function render(status){
 const nodes=new Map();const $=s=>{if(!nodes.has(s))nodes.set(s,{innerHTML:'',checked:false});return nodes.get(s)};
 const A={data:{versions:[{id:'v',projectId:'p',status,name:'Phiên bản QA',author:'u',history:[],checkBrand:false,checkInfo:false}],notes:[],users:[{id:'u',name:'QA'}]},project:{id:'p',name:'QA Project',archived:false},preserveFocus:fn=>fn(),header:()=>'',banner:()=>'',empty:()=>'',esc:s=>String(s??''),icon:()=>'',initials:()=>'',init:(key,fn)=>fn(),$, $$:()=>[]};
 const c={App:A,Store:{},console};vm.createContext(c);vm.runInContext(fs.readFileSync(root+'/js/pages/lead-internal-review.js','utf8'),c);return $('#main').innerHTML;
}
for(const status of ['Internal Review','Client Review','Changes Requested','Approved']){
 const html=render(status);assert(html.includes(status));
 if(status==='Approved'){assert(!html.includes('Đã yêu cầu chỉnh sửa'));assert(!html.includes('Lý do:'));}
 if(status==='Client Review')assert(html.includes('Đã chuyển sang bước khách hàng duyệt'));
 if(status==='Changes Requested')assert(html.includes('Đã yêu cầu chỉnh sửa'));
}
console.log('PASS review HTML render states: Internal Review, Client Review, Changes Requested, Approved. Stub DOM only, not browser.');
