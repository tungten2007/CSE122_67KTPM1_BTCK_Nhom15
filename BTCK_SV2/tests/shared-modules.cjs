// Chạy: node tests/shared-modules.cjs. API được kiểm tra không cần DOM.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
function memory() {
  const map = new Map();
  return { getItem: k => map.has(k) ? map.get(k) : null,
    setItem: (k,v) => map.set(k,String(v)), removeItem: k => map.delete(k) };
}
const context = vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root,'js/api.js'),'utf8'),context);
const make = vm.runInContext('taoKhoDuLieu',context);
const seed = vm.runInContext('CS_SEED',context);
function test(name, fn) { fn(); console.log('PASS:', name); }

test('API seed, mirror, unknown fields and reload without DOM', () => {
  const storage=memory(), api=make(storage), first=api.load();
  assert.equal(first.ok,true);assert.equal(first.data.tasks.length,7);
  first.data.users[0].name='Tên đã sửa';first.data.integrationNote='Giữ trường bổ sung';
  assert.equal(api.save(first.data).ok,true);
  assert.equal(storage.getItem(api.keys[0]),storage.getItem(api.keys[1]));
  const reloaded=make(storage).load();
  assert.equal(reloaded.data.users[0].name,'Tên đã sửa');
  assert.equal(reloaded.data.integrationNote,'Giữ trường bổ sung');
});
test('Legacy-only data migrates on the next successful save', () => {
  const storage=memory(), data=seed();data.users[0].name='Dữ liệu SV3';
  storage.setItem('creatorstudio.sv3.v1',JSON.stringify(data));
  const api=make(storage), loaded=api.load();
  assert.equal(loaded.data.users[0].name,'Dữ liệu SV3');
  assert.equal(storage.getItem('creatorstudio.v1'),null);
  assert.equal(api.save(loaded.data).ok,true);
  assert.equal(storage.getItem(api.keys[0]),storage.getItem(api.keys[1]));
});
test('Corrupt/schema-invalid data is never overwritten by seed', () => {
  for(const raw of ['{broken-json','[]','null','{"schema":2}','{"users":"wrong"}']) {
    const storage=memory();storage.setItem('creatorstudio.v1',raw);
    const api=make(storage), loaded=api.load();
    assert.equal(loaded.ok,false,raw);assert.equal(api.save(loaded.data).ok,false);
    assert.equal(storage.getItem('creatorstudio.v1'),raw);
  }
});
test('Conflicting aliases stop writes and preserve both snapshots', () => {
  const storage=memory(), a=seed(), b=seed();b.users[0].name='Khác';
  storage.setItem('creatorstudio.v1',JSON.stringify(a));
  storage.setItem('creatorstudio.sv3.v1',JSON.stringify(b));
  const api=make(storage), loaded=api.load();
  assert.equal(loaded.error.code,'ALIAS_CONFLICT');assert.equal(api.save(a).ok,false);
  assert.equal(JSON.parse(storage.getItem(api.keys[1])).users[0].name,'Khác');
});
test('Two tabs cannot silently overwrite newer data', () => {
  const storage=memory(), a=make(storage), b=make(storage);
  const da=a.load().data, db=b.load().data;
  da.tasks[0].title='Công việc do tab A cập nhật';assert.equal(a.save(da).ok,true);
  db.users[0].name='Tab B';assert.equal(b.save(db).error.code,'STALE_DATA');
  const fresh=b.load().data;fresh.users[0].name='Tab B';assert.equal(b.save(fresh).ok,true);
  const final=make(storage).load().data;
  assert.equal(final.tasks[0].title,'Công việc do tab A cập nhật');
  assert.equal(final.users[0].name,'Tab B');
});
test('Failed mirror write rolls back the first key, then allows retry', () => {
  for(const existing of [false,true]) {
    const storage=memory();
    if(existing) { const raw=JSON.stringify(seed());storage.setItem('creatorstudio.v1',raw);storage.setItem('creatorstudio.sv3.v1',raw); }
    const old=storage.getItem('creatorstudio.v1'), set=storage.setItem;
    let fail=true;storage.setItem=(k,v)=>{if(fail&&k==='creatorstudio.sv3.v1')throw Error('Quota');set(k,v);};
    const api=make(storage), data=api.load().data;data.users[0].name='Chưa được lưu';
    assert.equal(api.save(data).ok,false);assert.equal(storage.getItem(api.keys[0]),old);
    assert.equal(storage.getItem(api.keys[1]),old);
    fail=false;assert.equal(api.save(data).ok,true);
  }
});
test('Storage access failure and save-before-load return structured errors', () => {
  const denied=make({getItem(){throw Error('Blocked');}});
  assert.equal(denied.load().ok,false);assert.equal(denied.save(seed()).ok,false);
  assert.equal(make(memory()).save(seed()).error.code,'LOAD_REQUIRED');
});
test('Demo identity uses the same API without storing unrelated user fields', () => {
  const api=make(memory());api.setCurrentUser({id:'u-an',name:'An',role:'Designer',demoPassword:'do-not-copy'});
  assert.equal(api.getCurrentUser().data.role,'Designer');
  assert.equal(api.getCurrentUser().data.demoPassword,undefined);
});

