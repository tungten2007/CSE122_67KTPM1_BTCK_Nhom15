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
    navigator:{clipboard:{writeText:async()=>{}}}, setTimeout(fn){timers.push(fn);return fn;}, clearTimeout(fn){const i=timers.indexOf(fn);if(i>=0) timers.splice(i,1);},
  });
  const scripts=[...fs.readFileSync(path.join(root,name+'.html'),'utf8').matchAll(/<script\b[^>]*src="([^"]+)"[^>]*><\/script>/g)].map(m=>m[1]);
  for(const script of scripts) vm.runInContext(fs.readFileSync(path.join(root,script),'utf8'),context,{filename:script});
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
    const styles=[...html.matchAll(/<link\b[^>]*rel="stylesheet"[^>]*href="([^"]+)"/g)].map(m=>m[1]);
    const scripts=[...html.matchAll(/<script\b[^>]*src="([^"]+)"/g)].map(m=>m[1]);
    assert.deepEqual(styles,['css/share.css',`css/${name}.css`]);
    assert.deepEqual(scripts,['js/api.js','js/share.js',`js/${name}.js`]);
    assert.ok(!/function (CS_SEED|docDuLieu|luuDuLieu|saoChepMau|moBieuMau|doiVaiTro)\b/.test(js));
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
  for (const shared of ['api.js','share.js']) new vm.Script(fs.readFileSync(path.join(root,'js',shared),'utf8'),{filename:shared});
  console.log('PASS: 8 trang khởi tạo; api.js → share.js → phần riêng; cú pháp hợp lệ.');
  const portal=open('index');
  portal.document.querySelector('[data-role="Admin"]').click();
  assert.equal(portal.location.href,'admin-brief-template-management.html');
  assert.equal(JSON.parse(portal.storage.getItem('currentUser')).role,'Admin');
  const forbidden=open('404',{storage:portal.storage,search:'?code=403'});
  assert.equal(forbidden.document.getElementById('err-code').textContent,'403');
  assert.equal(forbidden.document.getElementById('safe-home-btn').href,'admin-brief-template-management.html');
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
  // AI dialog restored from the reference video: details, decisions and cancellation.
  md.getElementById('open-ai-modal-btn').click();
  md.getElementById('ai-prompt-input').value='abc'; md.getElementById('ai-generate-btn').click();
  assert.ok(md.getElementById('ai-input-error').textContent);
  md.getElementById('ai-prompt-input').value='Cà phê kraft mộc'; md.getElementById('ai-generate-btn').click();
  assert.equal(md.querySelector('[data-ai-step="processing"]').hidden,false);
  mood.timers.splice(0).forEach(fn=>fn());
  assert.ok(md.getElementById('ai-res-theme').textContent.includes('Earthy Organic'));
  assert.ok(md.getElementById('ai-res-materials').textContent.includes('kraft'));
  assert.ok(md.getElementById('ai-res-typography').textContent.includes('Serif'));
  assert.equal(md.getElementById('ai-res-keywords').children.length,5);
  const paletteBeforeReject=JSON.stringify(mood.data.moodboards[0].palette);
  md.getElementById('ai-reject-btn').click();
  assert.equal(JSON.stringify(mood.data.moodboards[0].palette),paletteBeforeReject);
  md.getElementById('open-ai-modal-btn').click(); md.getElementById('ai-generate-btn').click();
  mood.timers.splice(0).forEach(fn=>fn()); md.getElementById('ai-regen-btn').click();
  md.getElementById('ai-prompt-input').value='Trà xanh thảo mộc'; md.getElementById('ai-generate-btn').click();
  mood.timers.splice(0).forEach(fn=>fn());
  assert.ok(md.getElementById('ai-res-theme').textContent.includes('Fresh Botanical'));
  md.getElementById('ai-accept-btn').click();
  assert.equal(mood.data.moodboards[0].palette[0].hex,'#315b45');
  assert.ok(mood.data.moodboards[0].lastAITypography);
  md.getElementById('open-ai-modal-btn').click();
  md.getElementById('ai-prompt-input').value='Sang trọng cao cấp đen vàng'; md.getElementById('ai-generate-btn').click();
  mood.timers.splice(0).forEach(fn=>fn()); assert.ok(md.getElementById('ai-res-theme').textContent.includes('Minimal Luxury'));
  md.getElementById('ai-regen-btn').click(); md.getElementById('ai-prompt-input').value='không rõ ý tưởng'; md.getElementById('ai-generate-btn').click();
  mood.timers.splice(0).forEach(fn=>fn()); assert.equal(md.querySelector('[data-ai-step="error"]').hidden,false);
  md.getElementById('ai-manual-btn').click(); assert.equal(md.getElementById('ai-dialog').open,false); assert.equal(md.getElementById('dialog').open,true);
  md.getElementById('dialog').close(); md.getElementById('open-ai-modal-btn').click(); md.getElementById('ai-generate-btn').click();
  const obsoleteTimers=[...mood.timers]; md.getElementById('ai-dialog').querySelector('[data-ai-close]').click();
  md.getElementById('open-ai-modal-btn').click(); obsoleteTimers.forEach(fn=>fn());
  assert.equal(md.querySelector('[data-ai-step="input"]').hidden,false);
  assert.equal(md.querySelector('[data-ai-step="result"]').hidden,true);
  console.log('PASS: AI theme/materials/typography, keyword pills, validation, reject, regenerate, tea/luxury, manual fallback and stale request cancellation.');
  const admin=open('admin-brief-template-management'); const ad=admin.document;
  ad.getElementById('prompt-editor').value='Prompt thử nghiệm {raw_input}'; ad.getElementById('save-prompt-btn').click();
  assert.equal(admin.data.briefTemplates[0].promptTemplate,'Prompt thử nghiệm {raw_input}');
  ad.getElementById('run-test-ai-btn').click(); admin.timers.splice(0).forEach(fn=>fn()); assert.ok(ad.getElementById('test-output-box').textContent.includes('AI mô phỏng'));
  const archiveData=versions.data; archiveData.projects[0].archived=true;
  const storage=memory(); storage.setItem('creatorstudio.v1',JSON.stringify(archiveData));
  const archived=open('designer-dashboard',{storage}); archived.document.getElementById('add-task-btn').click(); assert.ok(!archived.document.getElementById('dialog').open);
  console.log('PASS: hồ sơ/mật khẩu, tìm kiếm/thêm/đổi trạng thái công việc, phân quyền, mã phiên bản/checklist/nộp duyệt, thông báo theo user, AI success/error/retry, Prompt Admin và dự án lưu trữ.');
  // Regression: lỗi dữ liệu phải giữ nguyên dữ liệu cũ, không ghi đè bằng seed.
  const brokenStorage=memory(); brokenStorage.setItem('creatorstudio.v1','{broken-json');
  const broken=open('designer-dashboard',{storage:brokenStorage});
  assert.equal(broken.document.getElementById('data-error').hidden,false);
  broken.document.getElementById('add-task-btn').click();
  const brokenForm=broken.document.getElementById('dialog').querySelector('form');
  field(brokenForm,'title','Không được ghi đè'); await submit(brokenForm);
  assert.equal(brokenStorage.getItem('creatorstudio.v1'),'{broken-json');
  assert.equal(broken.document.getElementById('dialog').open,true);

  const states=open('designer-dashboard'); const sd=states.document;
  sd.querySelector('[data-mode="error"]').click();
  assert.equal(sd.getElementById('task-error').hidden,false);
  assert.equal(sd.getElementById('task-empty').hidden,true);
  assert.equal(sd.querySelector('.task-list').children.length,0);
  sd.getElementById('task-retry-btn').click();
  assert.equal(sd.getElementById('task-error').hidden,true);
  assert.ok(sd.querySelector('.task-list').children.length>0);
  sd.getElementById('task-search').value='Không tồn tại';sd.getElementById('task-search').oninput();
  sd.getElementById('task-reset-btn').click();
  assert.equal(sd.getElementById('task-search').value,'');
  assert.ok(sd.querySelector('.task-list').children.length>0);
  sd.getElementById('task-sort').value='name-asc';sd.getElementById('task-sort').onchange();
  const names=sd.querySelectorAll('[data-task-title]').map(e=>e.textContent);
  assert.deepEqual(names,[...names].sort((a,b)=>a.localeCompare(b,'vi')));

  const edited=open('designer-moodboard');const ed=edited.document;
  ed.getElementById('open-ai-modal-btn').click();ed.getElementById('ai-generate-btn').click();
  edited.timers.splice(0).forEach(fn=>fn());ed.getElementById('ai-edit-btn').click();
  const editForm=ed.getElementById('ai-edit-form');
  field(editForm,'hex0','#NOPE');ed.getElementById('ai-accept-btn').click();
  assert.equal(editForm.elements.hex0.getAttribute('aria-invalid'),'true');
  assert.equal(edited.storage.getItem('creatorstudio.v1'),null);
  field(editForm,'hex0','#123456');field(editForm,'keywords','Từ khóa đã sửa\nGiấy thủ công');
  field(editForm,'reason','Giải thích đã được người dùng điều chỉnh.');ed.getElementById('ai-accept-btn').click();
  assert.equal(edited.data.moodboards[0].palette[0].hex,'#123456');
  assert.deepEqual(edited.data.moodboards[0].keywords,['Từ khóa đã sửa','Giấy thủ công']);
  const reloaded=open('designer-moodboard',{storage:edited.storage});
  assert.ok(reloaded.document.querySelector('.palette-container').textContent.includes('#123456'));
  assert.ok(reloaded.document.getElementById('ai-reason').textContent.includes('điều chỉnh'));
  console.log('PASS: data-error preserves storage; error/retry/reset, sorting and edited AI validation/apply/reload.');

}
main().catch(e=>{console.error(e);process.exitCode=1;});
