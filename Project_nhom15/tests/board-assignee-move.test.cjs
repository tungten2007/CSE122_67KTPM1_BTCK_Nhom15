// Page regression with a DOM stub; real visibility/focus is checked separately in a browser.
const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict'),path=require('node:path');
const root=path.join(__dirname,'..'),nodes=new Map();
const $=selector=>{if(!nodes.has(selector))nodes.set(selector,{innerHTML:''});return nodes.get(selector)};
const context={window:{}};context.window=context;vm.createContext(context);
vm.runInContext(fs.readFileSync(path.join(root,'js/data.js'),'utf8'),context);
const data=context.CS_SEED(),task=data.tasks[0];task.assignee='u-binh';
const edit={dataset:{edit:task.id}},move={dataset:{move:task.id},value:task.status};
let render,modal,assigneeField,failMove=false;
const App={data,project:data.projects[0],user:data.users.find(u=>u.id==='u-lead'),
 stateLabel:{todo:'Cần làm',doing:'Đang làm',review:'Chờ duyệt',done:'Hoàn thành'},
 $, $$:selector=>selector==='[data-edit]'?[edit]:selector==='[data-move]'?[move]:[],
 preserveFocus:fn=>fn(),header:()=>'',banner:()=>'',esc:s=>String(s??''),icon:()=>'',initials:()=>'',date:s=>s,priority:()=>'',
 people:()=>data.users.filter(u=>u.active&&['Lead','Designer'].includes(u.role)).map(u=>[u.id,u.name]),
 field:()=>'',textField:()=>'',select:(label,name,options,value,extra)=>{
  if(name==='assignee')assigneeField={options,value,extra};return '';
 },toast:()=>{},modal:(title,body,submit)=>modal={title,body,submit},
 action:fn=>{try{fn();render();return true}catch{return false}},init:(key,fn)=>{render=fn;render()}
};
context.App=App;context.Store={moveTask:(uid,id,status)=>{if(failMove)throw Error('save failed');task.status=status}};
vm.runInContext(fs.readFileSync(path.join(root,'js/pages/lead-task-board.js'),'utf8'),context);
edit.onclick();assert.equal(assigneeField.value,'');assert.equal(assigneeField.options[0][0],'');
assert.match(assigneeField.options[0][1],/Chọn lại/);assert.equal(assigneeField.extra,'required');
assert(!assigneeField.options.some(([id])=>id==='u-binh'));
task.assignee='u-an';edit.onclick();assert.equal(assigneeField.value,'u-an');
move.value='doing';move.onchange();assert.equal(task.status,'doing');
assert.match($('#main').innerHTML, /kanban-column mobile-selected" data-status="doing"/);
assert.match($('#main').innerHTML, /data-tab="doing" aria-pressed="true"/);
failMove=true;move.value='done';move.onchange();assert.equal(move.value,'doing');assert.equal(task.status,'doing');
assert.match($('#main').innerHTML, /kanban-column mobile-selected" data-status="doing"/);
console.log('PASS inactive assignee requires explicit selection; mobile column follows successful move and retains previous state after failed save (DOM stub).');
