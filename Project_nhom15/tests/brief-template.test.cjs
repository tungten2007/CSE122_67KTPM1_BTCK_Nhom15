const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),memory=new Map(),c={Date,Math,JSON,localStorage:{getItem:k=>memory.get(k)||null,setItem:(k,v)=>memory.set(k,v)}};c.window=c;vm.createContext(c);
for(const p of ['js/shared/data.js','js/shared/store.js'])vm.runInContext(fs.readFileSync(path.join(root,p),'utf8'),c);
const S=c.Store;S.load();const before=JSON.stringify(S.get());
assert.throws(()=>S.deleteBriefTemplate('u-lead','bt-04'),/quyền/);
assert.throws(()=>S.deleteBriefTemplate('u-admin','bt-01'),/tạm ngừng/);
assert.throws(()=>S.deleteBriefTemplate('u-admin','bt-03'),/tạm ngừng/);
assert.throws(()=>S.deleteBriefTemplate('u-admin','missing'),/Không tìm/);
assert.equal(JSON.stringify(S.get()),before);
S.deleteBriefTemplate('u-admin','bt-04');S.load();assert(!S.get().briefTemplates.some(t=>t.id==='bt-04'));
const template={name:'Mẫu kiểm thử',category:'Branding',status:'Inactive',description:'Mẫu dùng để kiểm tra',promptTemplate:'Chuẩn hóa ý tưởng sau: {raw_input}'};
for(const data of [{...template,status:'Unknown'},{...template,name:'  '},{...template,promptTemplate:'Không có chỗ nhận mô tả'}])assert.throws(()=>S.saveBriefTemplate('u-admin',data));
const id=S.saveBriefTemplate('u-admin',template);
S.transaction(d=>{d.briefs[0].clientData={templateId:id,templateName:template.name}});
const referenced=JSON.stringify(S.get());assert.throws(()=>S.deleteBriefTemplate('u-admin',id),/brief sử dụng/);assert.equal(JSON.stringify(S.get()),referenced);
console.log('PASS template permissions, Inactive-only deletion, invalid data rollback, persistence and referenced brief preservation.');

