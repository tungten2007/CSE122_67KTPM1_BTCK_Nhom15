const {Window}=await import(process.env.CS_HAPPY_DOM_MODULE || 'happy-dom');
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const fileMode=process.argv.includes('--file');
const scripts=['js/shared/data.js','js/shared/store.js','js/shared/modules/navigation.js','js/shared/client-store-adapter.js','js/sv1/shared.js'];
async function open(saved){
 const w=new Window({url:fileMode?'file:///demo/Project_nhom15/html/sv1/client-project-overview.html':'http://localhost:8000/html/sv1/client-project-overview.html',settings:{disableCSSFileLoading:true,disableJavaScriptFileLoading:true,disableJavaScriptEvaluation:true}});
 w.document.write(fs.readFileSync(root+'/html/sv1/client-project-overview.html','utf8').replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,''));
 if(saved)for(const [k,v]of saved)w.localStorage.setItem(k,v);
 for(const file of scripts)w.eval(fs.readFileSync(root+'/'+file,'utf8'));
 Object.defineProperty(w.crypto,'randomUUID',{value:undefined,configurable:true});
 w.Store.load();w.Navigation.activate('Client',w.Store.get().users);
 w.eval(fs.readFileSync(root+'/js/sv1/client-project-overview.js','utf8'));
 await new Promise(r=>setTimeout(r,50));return w;
}
const w=await open();assert.equal(Boolean(w.document.querySelector('#local-file-notice')),fileMode);console.log('PASS protocol-specific notice after shell');const q=s=>w.document.querySelector(s);
q('#new-project').click();assert(q('#project-dialog').open);console.log('PASS nút Tạo dự án mở biểu mẫu');
q('#project-name').value='Dự án chạy thử 25/10';q('#project-description').value='Thiết kế bộ nhận diện cho thương hiệu dùng kiểm thử';q('#project-deadline').value='2026-12-20';q('#project-category').value='UI/UX';
q('#project-form').dispatchEvent(new w.Event('submit',{cancelable:true,bubbles:true}));
const p=w.Store.get().projects.find(p=>p.name==='Dự án chạy thử 25/10');assert(p);assert.equal(p.category,'UI/UX');assert.equal(p.deadline,'2026-12-20');console.log('PASS submit lưu đúng dự án, loại và ngày hạn');
assert(w.location.href.includes('html/sv1/client-creative-brief.html?project='+p.id));console.log('PASS chuyển đúng trang brief kèm mã dự án');
const saved=Array.from({length:w.localStorage.length},(_,i)=>{const k=w.localStorage.key(i);return[k,w.localStorage.getItem(k)]});
const again=await open(saved);assert(again.document.querySelector('#project-list').textContent.includes(p.name));assert.equal(again.Store.get().projects.filter(x=>x.id===p.id).length,1);console.log('PASS mở lại vẫn hiện dự án và không tạo trùng');
const d=again.document;d.querySelector('#new-project').click();d.querySelector('#project-name').value='   ';d.querySelector('#project-description').value='Ý tưởng thử';d.querySelector('#project-form').dispatchEvent(new again.Event('submit',{cancelable:true}));assert(d.querySelector('#project-error').textContent.includes('khoảng trắng'));console.log('PASS tên chỉ có khoảng trắng bị chặn');
await w.happyDOM.abort();await again.happyDOM.abort();await w.close();await again.close();
console.log('5 kiểm tra DOM đạt; chưa xác minh layout bằng trình duyệt thật.');
