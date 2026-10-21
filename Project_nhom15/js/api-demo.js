/* Isolated classroom API screen. Does not read or modify the team's LocalStorage. */
(() => {
  const $ = (selector) => document.querySelector(selector);
  const editor = $('#editor'), deletion = $('#delete-dialog');
  const labels = { Active: 'Đang thực hiện', 'In Review': 'Chờ phản hồi', Completed: 'Hoàn thành', Archived: 'Lưu trữ' };
  let projects = [], editing = null, deleting = null, busy = false, hasLoaded = false;
  const options = (failSave = false) => {
    const value = { delay: $('#delay').checked ? 600 : 0, fail: failSave || $('#fail').checked };
    $('#fail').checked = false;
    return value;
  };
  function element(tag, text, className) {
    const item = document.createElement(tag);
    if (text !== undefined) item.textContent = text;
    if (className) item.className = className;
    return item;
  }
  function lock(value, message) {
    busy = value;
    $('#project-panel').setAttribute('aria-busy', String(value));
    for (const item of document.querySelectorAll('#create, #refresh, [data-edit], [data-delete], #save, #confirm-delete, #close-editor, #cancel-editor, #cancel-delete')) item.disabled = value;
    for (const item of editor.querySelectorAll('input, select, textarea')) item.disabled = value;
    if (message) feedback(message);
  }
  function feedback(message, failed = false) {
    $('#feedback').textContent = message;
    $('#feedback').classList.toggle('failed', failed);
  }
  function connection(ok) {
    $('#connection').className = 'pill ' + (ok ? 'connected' : 'failed');
    $('#connection').textContent = ok ? 'HTTP · Đã kết nối API' : 'Chưa nhận được phản hồi thành công';
  }
  function render() {
    const list = $('#project-list');
    list.replaceChildren();
    $('#count').textContent = projects.length;
    $('#empty').hidden = !hasLoaded || !!projects.length;
    for (const project of projects) {
      const card = element('article', undefined, 'api-project');
      card.append(element('h3', project.name), element('span', project.category, 'pill'), element('span', labels[project.status] || project.status, 'pill'), element('p', project.description || 'Chưa có mô tả.'));
      const meta = element('div', undefined, 'api-meta');
      meta.append(element('span', 'Hạn: ' + project.deadline), element('span', 'Tiến độ: ' + project.progress + '%'), element('span', 'Revision: ' + project.revision));
      const actions = element('div', undefined, 'actions');
      const edit = element('button', 'Sửa qua API', 'btn small');
      edit.dataset.edit = project.id;
      const remove = element('button', 'Xóa dự án thử', 'btn small danger');
      remove.dataset.delete = project.id;
      actions.append(edit, remove);
      card.append(meta, actions);
      list.append(card);
    }
  }
  async function refresh() {
    if (busy) return;
    lock(true, 'Đang gửi GET để tải danh sách…');
    try {
      const result = await ProjectAPI.list(options());
      if (!Array.isArray(result)) throw new Error('API trả về danh sách không hợp lệ.');
      projects = result;
      hasLoaded = true;
      render(); connection(true);
      feedback('Đã nhận ' + projects.length + ' dự án từ máy chủ.');
    } catch (error) {
      connection(false);
      feedback(error.message + (hasLoaded ? ' Danh sách đang hiển thị là kết quả tải trước đó.' : ''), true);
    } finally { lock(false); }
  }
  function openEditor(project = null) {
    editing = project;
    $('#project-form').reset();
    $('#editor-error').textContent = '';
    $('#editor-title').textContent = project ? 'Sửa dự án trên API' : 'Tạo dự án trên API';
    $('#save').textContent = project ? 'Gửi PATCH →' : 'Gửi POST →';
    for (const key of ['name', 'category', 'deadline', 'status', 'progress', 'description']) {
      if (project) $('#' + key).value = project[key];
    }
    editor.showModal(); $('#name').focus();
  }
  $('#refresh').onclick = refresh;
  $('#create').onclick = () => openEditor();
  $('#close-editor').onclick = $('#cancel-editor').onclick = () => editor.close();
  $('#cancel-delete').onclick = () => deletion.close();
  // Keep request state observable if a user presses Escape while saving.
  for (const dialog of [editor, deletion]) dialog.addEventListener('cancel', (event) => { if (busy) event.preventDefault(); });
  $('#status').onchange = () => { if ($('#status').value === 'Completed') $('#progress').value = '100'; };
  $('#project-list').onclick = async (event) => {
    const edit = event.target.closest('[data-edit]');
    const remove = event.target.closest('[data-delete]');
    if (busy || (!edit && !remove)) return;
    if (edit) {
      lock(true, 'Đang lấy bản mới nhất của dự án…');
      let project;
      try { project = await ProjectAPI.get(edit.dataset.edit, options()); connection(true); }
      catch (error) { feedback(error.message, true); }
      finally { lock(false); }
      if (project) { openEditor(project); feedback('Đã lấy dự án. Chỉnh nội dung rồi gửi PATCH.'); }
    } else {
      deleting = projects.find((project) => project.id === remove.dataset.delete);
      $('#delete-description').textContent = 'Bạn sắp xóa “' + deleting.name + '” trên máy chủ mock API.';
      $('#delete-error').textContent = '';
      deletion.showModal(); $('#cancel-delete').focus();
    }
  };
  $('#project-form').onsubmit = async (event) => {
    event.preventDefault();
    if (busy || !$('#project-form').reportValidity()) return;
    const data = Object.fromEntries(['name', 'category', 'deadline', 'status', 'description'].map((key) => [key, $('#' + key).value.trim()]));
    data.progress = Number($('#progress').value);
    $('#editor-error').textContent = '';
    const requestOptions = options($('#fail-save').checked);
    $('#fail-save').checked = false;
    lock(true, editing ? 'Đang gửi PATCH…' : 'Đang gửi POST…');
    try {
      const project = editing
        ? await ProjectAPI.update(editing.id, data, editing.revision, requestOptions)
        : await ProjectAPI.create(data, requestOptions);
      if (editing) projects = projects.map((item) => item.id === project.id ? project : item);
      else projects.unshift(project);
      hasLoaded = true;
      render(); connection(true); editor.close();
      feedback(editing ? 'Đã cập nhật dự án trên máy chủ.' : 'Đã tạo dự án trên máy chủ. Tải lại trang vẫn giữ dữ liệu.');
    } catch (error) {
      $('#editor-error').textContent = error.message;
      feedback('API chưa xác nhận lưu. Nội dung biểu mẫu được giữ nguyên để bạn thử lại.', true);
    } finally { lock(false); }
  };
  $('#confirm-delete').onclick = async () => {
    if (busy || !deleting) return;
    $('#delete-error').textContent = '';
    lock(true, 'Đang gửi DELETE…');
    try {
      await ProjectAPI.remove(deleting.id, deleting.revision, options());
      projects = projects.filter((project) => project.id !== deleting.id);
      render(); connection(true); deletion.close();
      feedback('Máy chủ trả 204: đã xóa dự án thử.');
    } catch (error) {
      $('#delete-error').textContent = error.message;
      feedback('Chưa xóa được dự án. Hãy kiểm tra thông báo trong hộp thoại.', true);
    } finally { lock(false); }
  };
  $('#clear-log').onclick = () => $('#request-log').replaceChildren();
  window.addEventListener('project-api:request', (event) => {
    const record = event.detail, item = element('li');
    const summary = element('div', undefined, 'request-summary');
    summary.append(element('strong', record.method), element('code', record.path), element('span', record.status || 'Mạng lỗi', 'http-status' + (record.error ? ' failed' : '')), element('span', record.duration + ' ms'));
    const details = element('details');
    details.append(element('summary', 'Xem request và response JSON'), element('pre', JSON.stringify({ request: record.request, response: record.response ?? null, error: record.error ?? null, requestId: record.requestId ?? null }, null, 2)));
    item.append(summary, details);
    $('#request-log').prepend(item);
    while ($('#request-log').children.length > 8) $('#request-log').lastElementChild.remove();
  });
  refresh();
})();
