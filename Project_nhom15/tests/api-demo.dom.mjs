// Happy DOM UI logic + real local HTTP. This does NOT verify visual rendering.
import {Window} from 'happy-dom';
import {spawn} from 'node:child_process';
import {readFileSync} from 'node:fs';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root = new URL('../', import.meta.url);
const read = (path) => readFileSync(new URL(path, root), 'utf8');
const server = spawn(process.env.CS_PYTHON || 'python3', [fileURLToPath(new URL('run_mock_api_fixture.py', import.meta.url))]);
let window, checks = 0;
const check = (value, name) => { assert.ok(value, name); checks++; console.log('PASS', name); };
const wait = async (condition) => {
  const until = Date.now() + 5000;
  while (!condition()) {
    if (Date.now() > until) throw Error('Timed out waiting for UI state');
    await new Promise((resolve) => setTimeout(resolve, 10));
  }
};
try {
  const base = await new Promise((resolve, reject) => {
    let output = '';
    const timer = setTimeout(() => reject(Error('Fixture timeout')), 15000);
    server.on('error', reject);
    server.stdout.on('data', (chunk) => { output += chunk; if (output.includes('\n')) { clearTimeout(timer); resolve(output.trim()); } });
    server.on('exit', (code) => { clearTimeout(timer); reject(Error('Fixture exited ' + code)); });
  });
  window = new Window({url:base + '/html/shared/api-demo.html',settings:{enableJavaScriptEvaluation:true,disableJavaScriptFileLoading:true,disableCSSFileLoading:true,suppressInsecureJavaScriptEnvironmentWarning:true}});
  window.fetch = (url, options) => fetch(url, options);
  window.AbortController = AbortController;
  window.document.write(read('html/shared/api-demo.html'));
  const $ = (selector) => window.document.querySelector(selector);
  const fill = (id, value) => { $(id).value = value; };
  const submit = () => $('#project-form').dispatchEvent(new window.Event('submit', {cancelable:true}));
  const done = () => wait(() => !$('#create').disabled);
  window.localStorage.setItem('creatorstudio.team.v1', 'untouched');
  window.eval(read('js/shared/project-api.js'));
  window.eval(read('js/shared/api-demo.js'));
  check($('#create').disabled && $('#project-panel').getAttribute('aria-busy') === 'true', 'Initial GET exposes loading and disables mutations');
  await done();
  const initial = window.document.querySelectorAll('.api-project').length;
  check(initial >= 2 && $('#connection').textContent.includes('Đã kết nối'), 'Real GET response populates the screen');
  $('#delay').checked = false;
  $('#create').click();
  fill('#name', 'Dự án kiểm thử giao diện'); fill('#deadline', '2026-12-20');
  $('#fail-save').checked = true;
  submit();
  check($('#save').disabled, 'Saving locks the submit button');
  await done();
  check($('#editor').open && $('#editor-error').textContent.includes('503') && $('#name').value === 'Dự án kiểm thử giao diện', 'HTTP 503 preserves open form and user input');
  check(!$('#fail-save').checked && window.document.querySelectorAll('.api-project').length === initial, 'One-shot failure resets and does not fake a new card');
  submit(); await done();
  check(!$('#editor').open && window.document.querySelectorAll('.api-project').length === initial + 1, 'Retry creates card only after HTTP 201');
  const list = await (await fetch(base + '/api/projects')).json();
  const created = list.find((project) => project.name === 'Dự án kiểm thử giao diện');
  check(!!created && created.revision === 1, 'Created UI data exists in server storage');
  $(`[data-edit="${created.id}"]`).click(); await wait(() => $('#editor').open);
  const patch = await fetch(base + '/api/projects/' + created.id, {method:'PATCH',headers:{'Content-Type':'application/json','If-Match':'"1"'},body:JSON.stringify({name:'Đã sửa ở tab khác'})});
  assert.equal(patch.status, 200);
  fill('#name','Bản sửa cần giữ lại'); submit(); await done();
  check($('#editor').open && $('#editor-error').textContent.includes('tab khác') && $('#name').value === 'Bản sửa cần giữ lại', 'Stale edit shows 412 and preserves form');
  $('#cancel-editor').click(); $('#refresh').click(); await done();
  check($('#project-list').textContent.includes('Đã sửa ở tab khác'), 'Refresh obtains the latest server revision');
  $(`[data-delete="${created.id}"]`).click(); $('#confirm-delete').click(); await done();
  check(!$(`[data-edit="${created.id}"]`) && !$('#delete-dialog').open, 'DELETE 204 removes the acknowledged card and closes dialog');
  check(window.localStorage.getItem('creatorstudio.team.v1') === 'untouched', 'API demo leaves the canonical team Store untouched');
  $('#fail').checked = true; $('#refresh').click(); await done();
  check($('#feedback').textContent.includes('tải trước đó') && window.document.querySelectorAll('.api-project').length === initial, 'Failed GET retains and labels stale data');
  $('#refresh').click(); await done();
  check($('#connection').textContent.includes('Đã kết nối'), 'GET retry recovers connection state');
  check($('#request-log').children.length <= 8 && $('#request-log').textContent.includes('200'), 'HTTP request log is bounded and records real response codes');
  $('#clear-log').click();
  check(!$('#request-log').children.length, 'Clear log affects only the on-screen trace');
  console.log('TOTAL', checks, 'DOM/HTTP logic checks passed; no visual-browser claim.');
} finally {
  if (window) await window.happyDOM.abort();
  server.kill('SIGTERM');
}
