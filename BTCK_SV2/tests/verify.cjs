// Chạy: node tests/verify.cjs. Chỉ dùng bộ nhớ tạm, không sửa dữ liệu người dùng.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { parse, Element } = require('./dom.cjs');
const root = path.join(__dirname, '..');
const files = fs.readdirSync(root).filter(f => f.endsWith('.html'));
function memory() { const map = new Map(); return { getItem: k => map.get(k) || null, setItem: (k,v) => map.set(k,String(v)) }; }
function open(name, options = {}) {
  const document = parse(fs.readFileSync(path.join(root, name+'.html'),'utf8'));
  let ready;
  document.addEventListener = (type,fn) => { if(type === 'DOMContentLoaded') ready = fn; };
  const localStorage = options.storage || memory(); const sessionStorage = memory();
  sessionStorage.setItem('cs-user', options.user || (name.startsWith('admin') ? 'u-admin' : 'u-an'));
  if (options.project) sessionStorage.setItem('cs-project', options.project);
  const timers = [];
  const location = { pathname: '/'+name+'.html', search: options.search || '', replace(url) { this.redirect = url; }, reload() {} };
  const context = vm.createContext({ document, localStorage, sessionStorage, location, console, URL, URLSearchParams, Blob,
    Option: function(text,value){ const e=new Element('option',{value}); e.textContent=text; return e; },
    FormData: function(form){ return Object.entries(form.elements).filter(([,e]) => !e.disabled && (e.attrs.type !== 'checkbox' || e.checked)).map(([k,e]) => [k, e.attrs.type === 'checkbox' ? 'on' : e.value]); },
    alert(){}, confirm(){return true;}, prompt(){return null;},
    navigator:{clipboard:{writeText:async()=>{}}}, setTimeout(fn){timers.push(fn);},
  });
  vm.runInContext(fs.readFileSync(path.join(root,'js',name+'.js'),'utf8'),context);
  ready();
  return { document, storage:localStorage, location, timers, get data(){return JSON.parse(localStorage.getItem('creatorstudio.v1'));} };
}
function submit(form){ return form.onsubmit({target:form,preventDefault(){}}); }
function field(form,name,value){ form.elements[name].value = value; }
async function main() {
  assert.equal(files.length,8);
  for (const file of files) {
    const name = path.basename(file,'.html'); const html = fs.readFileSync(path.join(root,file),'utf8');
    const js = fs.readFileSync(path.join(root,'js',name+'.js'),'utf8');
    const css = fs.readFileSync(path.join(root,'css',name+'.css'),'utf8');
    new vm.Script(js, {filename:name+'.js'});
    assert.ok(html.includes(`href="css/${name}.css"`) && html.includes(`src="js/${name}.js"`));
    assert.ok(!/<style\b|\sstyle=|\son\w+=/i.test(html));
    assert.ok(!/\{\{\d+\}\}|data-view-attrs/.test(html));
    assert.ok(!/\.style\b|innerHTML|insertAdjacentHTML|const (App|View|Store)\b/.test(js));
    assert.ok(!/@import\b/.test(css));
    assert.ok(js.startsWith("document.addEventListener('DOMContentLoaded'"));
    for (const m of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
      const target = m[1].split(/[?#]/)[0];
      if (!target || /^https?:|^data:/.test(target)) continue;
      assert.ok(fs.existsSync(path.join(root,target)),`${file}: missing ${target}`);
    }
    open(name);
  }
  console.log('PASS: 8 trang khởi tạo trong DOM mô phỏng; đường dẫn, HTML/CSS/JS riêng và cú pháp hợp lệ.');
  const p = open('profile'); const d=p.document; const form=d.getElementById('profile-info-form');
  assert.equal(form.elements.name.disabled,true);
  d.getElementById('toggle-edit-btn').click(); assert.equal(form.elements.name.disabled,false);
  field(form,'name','Tên kiểm thử'); field(form,'avatarUrl','javascript:alert(1)'); await submit(form); assert.equal(p.data,null);
  field(form,'avatarUrl',''); await submit(form); assert.equal(p.data.users[0].name,'Tên kiểm thử');
  const pass=d.getElementById('change-password-form'); field(pass,'currentPassword','sai'); field(pass,'newPassword','test123'); field(pass,'confirmPassword','test123');
  await submit(pass); assert.ok(d.getElementById('password-error').textContent);
  field(pass,'currentPassword','demo123'); await submit(pass); assert.equal(p.data.users[0].demoPassword,'test123');
  assert.equal(open('profile',{storage:p.storage}).document.getElementById('profile-info-form').elements.name.value,'Tên kiểm thử');
  const board=open('designer-dashboard'); const bd=board.document;
  const search=bd.getElementById('task-search'); search.value='không tồn tại'; search.oninput(); assert.equal(bd.querySelector('.task-list').children.length,0);
  search.value=''; search.oninput(); bd.querySelector('.task-item-check').checked=true; bd.querySelector('.task-item-check').onchange();
  assert.equal(board.data.tasks[0].status,'done');
  bd.getElementById('add-task-btn').click(); const task=bd.getElementById('dialog').querySelector('form');
  field(task,'title','Nhiệm vụ mới'); await submit(task); assert.ok(board.data.tasks.some(t=>t.title==='Nhiệm vụ mới'));
  const blocked=open('admin-brief-template-management',{user:'u-an'}); assert.equal(blocked.location.redirect,'404.html?code=403');
  const versions=open('designer-version-management'); const vd=versions.document;
  vd.getElementById('upload-version-btn').click(); let vf=vd.getElementById('dialog').querySelector('form');
  field(vf,'name','Bản kiểm thử'); field(vf,'changelog','Đổi bố cục mới'); await submit(vf);
  assert.equal(versions.data.versions.at(-1).code,'MC26-BaoBi-v4');
  let current=vd.querySelector('.version-card'); current.querySelector('.submit-review-btn').click();
  assert.equal(versions.data.versions.at(-1).status,'Draft');
  current.querySelector('.edit-version-btn').click(); vf=vd.getElementById('dialog').querySelector('form');
  for(const k of ['checkFeedback','checkSpec','checkExport']) vf.elements[k].checked=true;
  await submit(vf); vd.querySelector('.version-card').querySelector('.submit-review-btn').click();
  assert.equal(versions.data.versions.at(-1).status,'Internal Review');
  assert.ok(versions.data.notifications.some(n=>n.userId==='u-lead'&&n.title==='Phiên bản mới cần duyệt'));
  const notifs=open('notifications',{storage:versions.storage}); notifs.document.getElementById('mark-all-read-btn').click();
  assert.ok(notifs.data.notifications.filter(n=>n.userId==='u-an').every(n=>n.read));
  assert.ok(notifs.data.notifications.some(n=>n.userId==='u-lead'&&!n.read));
  const mood=open('designer-moodboard'); const md=mood.document;
  md.getElementById('open-ai-modal-btn').click(); md.getElementById('ai-generate-btn').click();
  mood.timers.splice(0).forEach(fn=>fn()); md.getElementById('ai-accept-btn').click();
  assert.equal(mood.data.moodboards[0].palette.length,4); assert.equal(mood.data.moodboards[0].status,'Palette Ready');
  md.getElementById('open-ai-modal-btn').click(); md.getElementById('ai-fail-checkbox').checked=true; md.getElementById('ai-generate-btn').click();
  mood.timers.splice(0).forEach(fn=>fn()); assert.ok(md.getElementById('ai-error-message-text').textContent);
  md.getElementById('ai-retry-btn').click(); assert.equal(md.getElementById('ai-fail-checkbox').checked,false);
  const admin=open('admin-brief-template-management'); const ad=admin.document;
  ad.getElementById('prompt-editor').value='Prompt thử nghiệm {raw_input}'; ad.getElementById('save-prompt-btn').click();
  assert.equal(admin.data.briefTemplates[0].promptTemplate,'Prompt thử nghiệm {raw_input}');
  ad.getElementById('run-test-ai-btn').click(); admin.timers.splice(0).forEach(fn=>fn()); assert.ok(ad.getElementById('test-output-box').textContent.includes('AI mô phỏng'));
  const archiveData=versions.data; archiveData.projects[0].archived=true;
  const storage=memory(); storage.setItem('creatorstudio.v1',JSON.stringify(archiveData));
  const archived=open('designer-dashboard',{storage}); archived.document.getElementById('add-task-btn').click(); assert.ok(!archived.document.getElementById('dialog').open);
  console.log('PASS: hồ sơ/mật khẩu, tìm kiếm/thêm/đổi trạng thái công việc, phân quyền, mã phiên bản/checklist/nộp duyệt, thông báo theo user, AI success/error/retry, Prompt Admin và dự án lưu trữ.');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
