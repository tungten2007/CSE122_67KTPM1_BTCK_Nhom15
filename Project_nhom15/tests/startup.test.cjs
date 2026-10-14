const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const html = fs.readFileSync(path.join(__dirname, '../index.html'), 'utf8');
const code = html.match(/<!-- CS-STARTUP-GUARD -->\s*<script>([\s\S]*?)<\/script>/)[1];
function run(missing) {
  const listeners = {}, inserted = [];
  const window = {addEventListener: (name, fn) => listeners[name] = fn};
  const document = {
    createElement: tag => ({tag, style:{}, children:[], setAttribute(){}, appendChild(el){this.children.push(el);}}),
    body: {firstChild:null, insertBefore: box => inserted.push(box)}
  };
  vm.runInNewContext(code, {window, document});
  for (const src of missing) listeners.error({target:{tagName:'SCRIPT', getAttribute:key => key==='src'?src:null}});
  listeners.load();
  return inserted;
}
assert.equal(run([]).length, 0);
const result = run(['js/app.js', 'js/app.js', '<unsafe>']);
assert.equal(result.length, 1);
assert.deepEqual(result[0].children[2].children.map(x=>x.textContent), ['js/app.js', '<unsafe>']);
console.log('PASS: healthy startup has no warning; missing files are deduplicated and rendered as text.');
