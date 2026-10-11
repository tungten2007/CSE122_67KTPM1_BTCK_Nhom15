// Chạy: node tests/verify.cjs. Kiểm thử dữ liệu dùng bộ nhớ tạm, không chạm dữ liệu trình duyệt.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.join(__dirname, '..');
const memory = () => { const m = new Map(); return { getItem: k => m.get(k) ?? null, setItem: (k, v) => m.set(k, String(v)) }; };
const context = vm.createContext({ window: {}, localStorage: memory(), sessionStorage: memory(), URL, setTimeout: fn => fn() });
for (const name of ['js/data.js', 'js/store.js', 'js/modules/navigation.js', 'js/modules/ai-mood-assistant.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, name), 'utf8'), context);
  Object.assign(context, context.window);
}
const { Store, Navigation } = context;
Store.load();
const newVersion = (type = 'BaoBi') => Store.saveVersion('u-an', { projectId: 'p-moc', assetType: type, name: 'Phiên bản mới', changelog: 'Thay đổi bố cục', checkFeedback: true, checkSpec: true, checkExport: true });
const v4 = newVersion(), v5 = newVersion();
Store.deleteVersion('u-an', v4);
const v6 = newVersion();
assert.equal(Store.get().versions.find(v => v.id === v6).code, 'MC26-BaoBi-v6');
const logo = newVersion('Logo');
assert.equal(Store.get().versions.find(v => v.id === logo).code, 'MC26-Logo-v1');
Store.submitVersionForReview('u-an', v5);
assert.equal(Store.get().versions.find(v => v.id === v5).status, 'Internal Review');
assert.ok(Store.get().notifications.some(n => n.userId === 'u-lead' && n.title.includes('Phiên bản mới')));
assert.throws(() => Store.deleteVersion('u-an', v5));
Store.settings('u-admin', { warningDays: 2, versionPattern: '{project}-{asset}-v{number}', requireReview: true });
Store.archive('u-admin', 'p-lua');
assert.throws(() => Store.saveMoodboard('u-an', { projectId: 'p-lua', title: 'Bảng màu mới' }));
const u = Store.get().users.find(u => u.id === 'u-an');
assert.throws(() => Store.updateProfile(u.id, { ...u, avatarUrl: 'javascript:alert(1)' }));
assert.throws(() => Store.updateProfile(u.id, { ...u, currentPassword: 'sai', newPassword: 'test123', confirmPassword: 'test123' }));
Store.updateProfile(u.id, { ...u, name: 'Tên thử nghiệm', avatarUrl: 'https://example.com/avatar.png', currentPassword: 'demo123', newPassword: 'test123', confirmPassword: 'test123' });
Store.load();
assert.equal(Store.get().users.find(u => u.id === 'u-an').demoPassword, 'test123');
Store.markAllNotifications('u-an');
assert.equal(Store.get().notifications.filter(n => n.userId === 'u-an' && !n.read).length, 0);
assert.ok(Store.get().notifications.some(n => n.userId === 'u-lead' && !n.read));
context.sessionStorage.setItem('cs-user', 'u-binh');
assert.notEqual(Navigation.current(Store.get().users).id, 'u-binh');
for (const role of ['Designer', 'Admin', 'Lead', 'Client']) assert.ok(fs.existsSync(path.join(root, Navigation.home(role))));
assert.equal(Navigation.canOpen('briefTemplates', u), false);

let scripts = 0;
for (const file of fs.readdirSync(root).filter(f => f.endsWith('.html'))) {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  for (const match of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) {
    new vm.Script(match[1], { filename: file }); scripts++;
  }
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const target = match[1].split(/[?#]/)[0];
    if (!target || /[{}$]|^https?:|^data:/.test(target)) continue;
    assert.ok(fs.existsSync(path.join(root, target)), `${file}: thiếu ${target}`);
  }
}
for (const dir of ['js', 'js/modules']) for (const file of fs.readdirSync(path.join(root, dir)).filter(f => f.endsWith('.js'))) new vm.Script(fs.readFileSync(path.join(root, dir, file), 'utf8'), { filename: file });
console.log(`PASS: phiên bản, checklist, archive, hồ sơ, mật khẩu demo, thông báo, phân quyền, home 4 role, liên kết cục bộ và ${scripts} script HTML.`);
(async () => {
  const ai = context.AIMoodAssistant;
  const result = await ai.generateSuggestion('Cà phê mộc giấy kraft');
  assert.equal(result.palette.length, 4);
  await assert.rejects(ai.generateSuggestion('Không rõ ý tưởng này'));
  await assert.rejects(ai.generateSuggestion('Cà phê kraft', true));
  Store.applyAIPalette('u-an', 'p-moc', { ...result, reason: result.explanation });
  assert.equal(Store.get().moodboards.find(m => m.projectId === 'p-moc').status, 'Palette Ready');
  console.log('PASS: AI success, thiếu ngữ cảnh, lỗi mô phỏng và áp dụng bảng màu vào Store.');
})().catch(err => { console.error(err); process.exitCode = 1; });
