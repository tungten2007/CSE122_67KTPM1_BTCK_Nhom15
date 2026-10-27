// Test qua đúng adapter mà sáu trang SV2 đang gọi; không thay thế browser QA.
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..'), memory = new Map(), session = new Map();
let quota = false;
const c = { console, Date, Math, JSON, URL, URLSearchParams,
  location: { search: '' },
  document: { baseURI: 'http://localhost/' },
  localStorage: { getItem: k => memory.get(k) ?? null, setItem: (k, v) => { if (quota) throw Error('quota'); memory.set(k, v); }, removeItem: k => memory.delete(k) },
  sessionStorage: { getItem: k => session.get(k) ?? null, setItem: (k, v) => session.set(k, v), removeItem: k => session.delete(k) }
};
c.window = c; vm.createContext(c);
for (const file of ['js/shared/data.js', 'js/shared/store.js', 'js/shared/modules/navigation.js', 'js/shared/client-store-adapter.js', 'js/sv2/api.js']) {
  vm.runInContext(fs.readFileSync(path.join(root, file), 'utf8'), c);
}
const api = vm.runInContext('CreatorStudioAPI', c), S = c.Store, N = c.Navigation;
let count = 0;
function test(name, fn) { fn(); count++; console.log('PASS ' + name); }
function as(role, id) { N.activate(role, S.get().users, id); assert(api.load().ok); }
function command(name, ...args) { const r = api.run(name, ...args); assert(r.ok, r.error?.message); return r; }
assert(api.load().ok);
let vid;
test('SV2 and SV3 share one canonical data key', () => {
  assert.equal(api.keys[0], S.KEY); assert.equal(api.keys.length, 1);
  assert(!memory.has('creatorstudio.v1')); assert(!memory.has('creatorstudio.sv3.v1'));
});
test('Designer creates Draft; Client cannot see unsubmitted version', () => {
  as('Designer', 'u-an');
  vid = command('saveVersion', { projectId: 'p-lua', name: 'SV2 integration version', changelog: 'Test canonical version submission', assetType: 'Logo', image: 'assets/coffee.svg' }).value;
  assert.equal(S.get().versions.find(v => v.id === vid).status, 'Draft');
  c.TeamClient.login('Client'); assert.notEqual(c.TeamClient.read().projects.find(p => p.id === 'p-lua').versionId, vid);
});
test('Checklist blocks submission and leaves persisted data unchanged', () => {
  as('Designer', 'u-an'); const before = memory.get(S.KEY);
  assert(!api.run('submitVersionForReview', vid).ok); assert.equal(memory.get(S.KEY), before);
});
test('Submission reaches every active Lead, with exact project/version URL', () => {
  const v = S.get().versions.find(v => v.id === vid);
  command('saveVersion', { ...v, checkFeedback: true, checkSpec: true, checkExport: true });
  command('submitVersionForReview', vid);
  S.load(); assert.equal(S.get().versions.find(v => v.id === vid).status, 'Internal Review');
  for (const lead of S.get().users.filter(u => u.active && u.role === 'Lead')) {
    const notification = S.get().notifications.find(n => n.userId === lead.id && n.link?.includes(vid));
    assert(notification); assert.equal(notification.read, false);
    const url = new URL(notification.link, 'http://localhost/');
    assert.equal(url.pathname, '/html/sv3/lead-internal-review.html');
    assert.equal(url.searchParams.get('project'), 'p-lua'); assert.equal(url.searchParams.get('version'), vid);
  }
  assert(!api.run('submitVersionForReview', vid).ok, 'Double submit must be rejected');
});
test('Lead receives after reload, resolves deep-link project, requests changes back to author', () => {
  as('Lead', 'u-lead'); c.location.search = '?project=p-lua&version=' + vid;
  N.applyContext(S.get()); assert.equal(session.get('cs-project'), 'p-lua');
  S.review('u-lead', vid, 'rework', 'Please increase product name font size');
  S.load(); assert.equal(S.get().versions.find(v => v.id === vid).status, 'Changes Requested');
  assert(S.get().notifications.some(n => n.userId === 'u-an' && n.link?.includes(vid) && n.title.includes('Lead')));
});
test('Different Designer cannot edit or submit another author version', () => {
  as('Designer', 'u-ngoc'); const before = memory.get(S.KEY);
  assert(!api.run('saveVersion', { ...S.get().versions.find(v => v.id === vid), name: 'Hijack version' }).ok);
  assert(!api.run('submitVersionForReview', vid).ok); assert.equal(memory.get(S.KEY), before);
});
test('Author resubmits, Lead passes, Client sees same version', () => {
  as('Designer', 'u-an'); command('submitVersionForReview', vid);
  S.reviewChecks('u-lead', vid, true, true); S.review('u-lead', vid, 'pass');
  c.TeamClient.login('Client'); assert.equal(c.TeamClient.read().projects.find(p => p.id === 'p-lua').versionId, vid);
});
test('Moodboard preserves cards and full existing AI details through reload', () => {
  as('Designer', 'u-an'); const mb = S.get().moodboards.find(m => m.projectId === 'p-moc');
  const details = { ...mb, lastAIReason: 'Coffee palette', lastAIMaterials: ['Kraft'], lastAITypography: 'Sans Serif', lastAITheme: 'Natural' };
  details.cards.push({ id: 'qa-card', title: 'QA image', image: 'assets/moodboard.svg' });
  command('saveMoodboard', details); S.load(); const saved = S.get().moodboards.find(m => m.id === mb.id);
  assert(saved.cards.some(x => x.id === 'qa-card')); assert.equal(saved.lastAITheme, 'Natural');
  assert.equal(saved.lastAIReason, 'Coffee palette'); assert.equal(saved.lastAITypography, 'Sans Serif');
});
test('Stale page refuses to erase data saved by another role', () => {
  as('Designer', 'u-an'); const task = S.get().tasks.find(t => t.assignee === 'u-an');
  S.saveTask('u-lead', { projectId: 'p-moc', title: 'New task in another tab', assignee: 'u-an', priority: 'low', status: 'todo', due: '2026-12-20' });
  assert.equal(api.run('moveTask', task.id, 'done').error.code, 'STALE_DATA');
  assert(S.get().tasks.some(t => t.title === 'New task in another tab'));
});
test('Notification actions are scoped to the current account', () => {
  as('Designer', 'u-an'); const other = S.get().notifications.find(n => n.userId === 'u-lead');
  const before = memory.get(S.KEY); assert(!api.run('deleteNotification', other.id).ok); assert.equal(memory.get(S.KEY), before);
});
test('Write failure and corrupt data do not produce success or reset data', () => {
  as('Designer', 'u-an'); const before = memory.get(S.KEY); quota = true;
  assert(!api.run('saveVersion', { projectId: 'p-moc', name: 'Quota test', changelog: 'Should not persist' }).ok);
  quota = false; assert.equal(memory.get(S.KEY), before);
  memory.set(S.KEY, '{broken'); assert(!api.load().ok); assert(!api.run('reset').ok); assert.equal(memory.get(S.KEY), '{broken');
  memory.set(S.KEY, before); assert(api.load().ok);
});
test('Six pages load external JS after shared data and link to existing files', () => {
  for (const page of ['designer-dashboard', 'designer-moodboard', 'designer-version-management', 'admin-brief-template-management', 'profile', 'notifications']) {
    const html = fs.readFileSync(path.join(root, 'html/sv2/' + page + '.html'), 'utf8');
    assert(!/<script(?![^>]*\bsrc=)[^>]*>\s*\S/i.test(html));
    assert(!/\sstyle\s*=|\son(click|change|submit)\s*=/i.test(html));
    const scripts = [...html.matchAll(/<script[^>]*src="([^"]+)"/g)].map(m => m[1]);
    assert.deepEqual(scripts.slice(0, 4), ['js/shared/data.js', 'js/shared/store.js', 'js/shared/modules/navigation.js', 'js/sv2/api.js']);
    assert(scripts.includes('js/sv2/share.js')); assert.equal(scripts.at(-1), 'js/sv2/' + page + '.js');
    for (const src of scripts) assert(fs.existsSync(path.join(root, src)), src);
  }
});
console.log(count + ' SV2 linked groups passed');
