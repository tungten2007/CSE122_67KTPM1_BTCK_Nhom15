// Page tests with a DOM stub; browser tests cover rendering and interaction separately.
const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.join(__dirname,'..'),nodes=new Map(),memory=new Map();
const $=selector=>{if(!nodes.has(selector))nodes.set(selector,{innerHTML:''});return nodes.get(selector)};
const context={window:{},localStorage:{getItem:key=>memory.get(key)||null,setItem:(key,value)=>memory.set(key,value)}};
context.window=context;vm.createContext(context);
for(const file of ['js/shared/data.js','js/shared/store.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context);
const seed=context.CS_SEED();
seed.versions.push({id:'v-second',projectId:'p-moc',name:'VERSION SECOND'}, {id:'v-foreign',projectId:'p-lua',name:'FOREIGN VERSION'});
seed.comments=[{id:'first-comment',projectId:'p-moc',versionId:'v-moc-3',text:'FIRST COMMENT',author:'Client'},
 {id:'second-comment',projectId:'p-moc',versionId:'v-second',text:'SECOND COMMENT',author:'Client'},
 {id:'invalid-comment',projectId:'p-moc',versionId:'v-foreign',text:'INVALID COMMENT',author:'Client'},
 {id:'foreign-comment',projectId:'p-lua',versionId:'v-foreign',text:'FOREIGN COMMENT',author:'Client'}];
seed.proposals=[{id:'test-proposal',projectId:'p-moc',title:'Sửa thông tin',description:'Bổ sung nội dung',sourceIds:['second-comment'],assignee:'u-binh',priority:'medium',due:'2026-10-20',reason:'Phản hồi khách hàng',ambiguous:false}];
memory.set(context.Store.KEY,JSON.stringify(seed));context.Store.load();
let render,modal;const selects=new Map(),edit={dataset:{editProposal:'test-proposal'}};
const App={data:context.Store.get(),project:seed.projects[0],user:seed.users.find(u=>u.id==='u-lead'),
 $, $$:selector=>selector==='[data-edit-proposal]'?[edit]:[],
 preserveFocus:fn=>fn(),header:(eyebrow,title,description)=>description,banner:()=>'',esc:s=>String(s??''),icon:()=>'',date:s=>s,priority:()=>'',empty:()=>'',toast:()=>'',
 people:()=>App.data.users.filter(u=>u.active&&['Lead','Designer'].includes(u.role)).map(u=>[u.id,u.name]),field:()=>'',textField:()=>'',
 select:(label,name,options,value,extra)=>{selects.set(name,{options,value,extra});return `<select name="${name}"></select>`},
 modal:(title,body,submit)=>modal={title,body,submit},init:(key,fn)=>{render=fn;render()},refresh:()=>{App.data=context.Store.get();render()}
};context.App=App;
vm.runInContext(fs.readFileSync(path.join(root,'js/sv3/pages/lead-feedback-summary.js'),'utf8'),context);
let html=$('#main').innerHTML;
assert.match(html,/Tất cả 4 phiên bản/);
assert.match(html,/SECOND COMMENT<\/p><small>Client · VERSION SECOND/);
assert.match(html,/INVALID COMMENT<\/p><small>Client · Phiên bản không còn khả dụng/);
assert(!html.includes('FOREIGN VERSION'));
edit.onclick();assert.equal(selects.get('assignee').value,'');assert.equal(selects.get('assignee').options[0][0],'');assert.equal(selects.get('assignee').extra,'required');
App.data.proposals[0].assignee='';edit.onclick();assert.equal(selects.get('assignee').value,'');
$('#add-comment').onclick();const versions=selects.get('versionId');assert.equal(versions.value,'');assert.equal(versions.extra,'required');assert.deepEqual(Array.from(versions.options,option=>option[0]),['',...App.data.versions.filter(v=>v.projectId==='p-moc').map(v=>v.id)]);
const before=JSON.stringify(context.Store.get());
assert.throws(()=>modal.submit({versionId:'',text:'Nội dung hợp lệ'}));
assert.throws(()=>modal.submit({versionId:'v-foreign',text:'Nội dung hợp lệ'}));assert.equal(JSON.stringify(context.Store.get()),before);
modal.submit({versionId:'v-second',text:'Nhận xét cho phiên bản thứ hai'});
assert.equal(context.Store.get().comments.at(-1).versionId,'v-second');
App.refresh();App.project=App.data.projects.find(p=>p.id==='p-lua');render();html=$('#main').innerHTML;
assert.match(html,/1 phản hồi · 1 đã chọn/);assert(html.includes('FOREIGN COMMENT'));assert(!html.includes('FIRST COMMENT'));
selects.clear();$('#add-comment').onclick();assert(!selects.has('versionId'));
modal.submit({text:'Nhận xét cho dự án trà'});assert.equal(context.Store.get().comments.at(-1).versionId,'v-foreign');
console.log('PASS TASK17 page: scoped version labels/header/options, required explicit assignee, correct saved version, invalid version rollback, project selection reset, single-version fallback (DOM stub).');
