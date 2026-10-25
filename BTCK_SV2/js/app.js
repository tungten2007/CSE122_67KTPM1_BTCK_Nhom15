/* App Framework: Giao diện khung dùng chung, topbar, sidebar, modal, toast và đồng bộ */
window.App = (() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  document.addEventListener('error', event => {
    const img = event.target;
    if (!(img instanceof HTMLImageElement)) return;
    if (img.dataset.fallback) {
      const fallback = img.dataset.fallback;
      delete img.dataset.fallback;
      img.src = fallback;
    } else if (img.classList.contains('avatar-image')) {
      img.hidden = true;
      if (img.nextElementSibling) img.nextElementSibling.hidden = false;
    }
  }, true);
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const icons = {
    grid: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
    check: 'm5 12 4 4L19 6',
    spark: 'm12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z',
    users: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3a4 4 0 0 1 0 8M22 21v-2a4 4 0 0 0-3-3.87M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
    settings: 'M4 6h16M4 12h16M4 18h16M8 3v6M16 9v6M10 15v6',
    plus: 'M12 5v14M5 12h14',
    search: 'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
    menu: 'M3 6h18M3 12h18M3 18h18',
    arrow: 'M5 12h14m-6-6 6 6-6 6',
    close: 'm6 6 12 12M6 18 18 6',
    clock: 'M12 8v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
    file: 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5',
    lock: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4',
    bell: 'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4',
    download: 'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',
    trash: 'M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2',
    edit: 'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
    alert: 'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0zM12 9v4M12 17h.01'
  };

  const icon = name => `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="${icons[name] || icons.grid}"/></svg>`;

  let data, user, project, renderPage = () => {}, toastTimer;

  function session(key, value) {
    try {
      if (value !== undefined) sessionStorage.setItem(key, value);
      return sessionStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function sync() {
    data = Store.get();
    user = Navigation.current(data.users);
    if (!user) throw new Error('Không có tài khoản demo hoạt động.');
    project = data.projects.find(p => p.id === session('cs-project')) || data.projects[0];
    session('cs-project', project.id);
  }

  function home() {
    return Navigation.home(user?.role);
  }

  function toast(message) {
    clearTimeout(toastTimer);
    let t = $('#toast');
    if (!t) return;
    t.innerHTML = `${icon('check')} <span>${esc(message)}</span>`;
    t.classList.add('visible');
    toastTimer = setTimeout(() => t.classList.remove('visible'), 3600);
  }

  function banner() {
    return project.archived
      ? `<div class="notice warning">${icon('lock')} <span>Dự án "${esc(project.name)}" đã được lưu trữ (Chỉ xem, không thể sửa đổi).</span></div>`
      : '';
  }

  function initials(name) {
    if (!name) return 'CS';
    return esc(name.split(' ').slice(-2).map(s => s[0]).join(''));
  }

  function shell(currentKey) {
    const routes = Navigation.routes;
    const roleName = Navigation.roles;

    // Lọc menu điều hướng theo vai trò người dùng hiện tại
    const navItems = Object.entries(routes)
      .filter(([k, v]) => ['dashboard', 'moodboard', 'versions', 'briefTemplates', 'profile', 'notifications'].includes(k) && (v[3] === user.role || v[3] === '*'))
      .map(([k, v]) => `
        <a href="${v[0]}" class="nav-link ${k === currentKey ? 'active' : ''}" ${k === currentKey ? 'aria-current="page"' : ''}>
          ${icon(v[2])}
          <span>${esc(v[1])}</span>
        </a>
      `).join('');

    // Đếm số thông báo chưa đọc của user hiện tại
    const unreadCount = data.notifications ? data.notifications.filter(n => n.userId === user.id && !n.read).length : 0;
    const badgeHtml = unreadCount > 0 ? `<span class="notification-badge">${unreadCount}</span>` : '';

    const pageTitle = routes[currentKey]?.[1] || 'CreatorStudio';

    document.body.innerHTML = `
      <a class="skip-link" href="#main">Chuyển đến nội dung chính</a>
      <div class="sidebar-shade" hidden></div>

      <aside class="sidebar" aria-label="Điều hướng chính">
        <a class="brand" href="${home()}">
          <span class="brand-mark">${icon('check')}</span>
          <span>CreatorStudio</span>
          <span class="brand-dot">®</span>
        </a>
        <button class="icon-button mobile-close" aria-label="Đóng menu">${icon('close')}</button>

        <div class="studio">
          <span class="studio-avatar">M</span>
          <div>
            <strong>Studio Mộc</strong>
            <small>Không gian sáng tạo</small>
          </div>
          <span class="studio-arrow">⌄</span>
        </div>

        <p class="nav-caption">KHÔNG GIAN LÀM VIỆC</p>
        <nav>${navItems}</nav>

        <div class="sidebar-project">
          <p class="nav-caption">DỰ ÁN ĐANG CHỌN</p>
          <strong><span class="status-dot"></span>${esc(project.name)}</strong>
          <small>${esc(project.description)}</small>
          <span class="side-tag">${project.archived ? 'Đã lưu trữ' : esc(project.code)}</span>
        </div>

        <div class="sidebar-bottom">
          <button class="text-light" id="demo-tools-btn">${icon('settings')} Công cụ demo & Dữ liệu</button>
          <a class="profile" href="profile.html" title="Xem và sửa hồ sơ cá nhân">
            <span class="avatar">${avatar(user)}</span>
            <div>
              <strong>${esc(user.name)}</strong>
              <small>${esc(roleName[user.role] || user.role)}</small>
            </div>
            <span class="online" title="Đang trực tuyến"></span>
          </a>
          <small class="demo-caption">PHÂN HỆ SV2 · CREATORSTUDIO</small>
        </div>
      </aside>

      <div class="workspace">
        <header class="topbar">
          <button class="icon-button menu-toggle" aria-label="Mở menu">${icon('menu')}</button>
          
          <div class="breadcrumb">
            Studio Mộc <span>/</span> <strong>${esc(pageTitle)}</strong>
          </div>

          <div class="top-actions">
            <label class="sr-only" for="project-select">Dự án</label>
            <select id="project-select" aria-label="Chọn dự án">
              ${data.projects.map(p => `
                <option value="${p.id}" ${p.id === project.id ? 'selected' : ''}>
                  ${esc(p.name)} ${p.archived ? '(Lưu trữ)' : ''}
                </option>
              `).join('')}
            </select>

            <label class="sr-only" for="role-switch">Vai trò demo</label>
            <select id="role-switch" aria-label="Đổi vai trò demo">
              ${Object.keys(roleName).map(r => `
                <option value="${r}" ${user.role === r ? 'selected' : ''}>
                  Demo: ${esc(roleName[r])}
                </option>
              `).join('')}
            </select>

            <a href="notifications.html" class="notification-button" id="activity-bell" title="Trung tâm thông báo" aria-label="Xem thông báo">
              ${icon('bell')}
              ${badgeHtml}
            </a>

            <a href="profile.html" class="avatar small" title="Hồ sơ ${esc(user.name)}">
              ${avatar(user)}
            </a>
          </div>
        </header>

        <main id="main" tabindex="-1"></main>

        <footer class="page-footer">
          <span>CreatorStudio · Nền tảng quản lý dự án sáng tạo và phản hồi phiên bản.</span>
          <span>Bản thực hành Sinh viên 2 (SV2) · Dữ liệu lưu LocalStorage trình duyệt</span>
        </footer>
      </div>

      <dialog id="dialog" aria-labelledby="dialog-title"></dialog>
      <div id="toast" role="status" aria-live="polite"></div>
    `;

    // Sự kiện chuyển đổi vai trò Demo
    $('#role-switch').onchange = e => {
      try {
        const dest = Navigation.activate(e.target.value, Store.get().users);
        location.href = dest;
      } catch (err) {
        e.target.value = user.role;
        toast(err.message);
      }
    };

    // Sự kiện chuyển đổi dự án
    $('#project-select').onchange = e => {
      session('cs-project', e.target.value);
      location.reload();
    };

    // Mở menu mobile và modal công cụ
    Navigation.bindMenu();
    $('#demo-tools-btn').onclick = tools;
  }

  function init(key, fn) {
    try {
      Store.load();
      sync();
    } catch (e) {
      document.body.innerHTML = `
        <main class="panel app-load-error">
          <h1>Không thể nạp dữ liệu</h1>
          <p class="muted">${esc(e.message)}</p>
          <div class="app-load-error-actions">
            <button class="button primary" id="recover-data-btn">Khôi phục dữ liệu mẫu</button>
          </div>
        </main>
      `;
      $('#recover-data-btn').onclick = () => { Store.reset(); location.reload(); };
      return;
    }

    if (!Navigation.canOpen(key, user)) {
      location.replace('404.html?code=403');
      return;
    }

    shell(key);
    renderPage = fn;
    fn();
    window.addEventListener('storage', e => {
      if (e.key !== Store.KEY) return;
      Store.load();
      sync();
      if (!Navigation.canOpen(key, user)) {
        location.replace('404.html?code=403');
        return;
      }
      refresh();
    });
  }

  function refresh() {
    sync();
    const count = data.notifications.filter(n => n.userId === user.id && !n.read).length;
    const bell = $('#activity-bell');
    if (bell) bell.innerHTML = `${icon('bell')}${count ? `<span class="notification-badge">${count}</span>` : ''}`;
    $$('.profile strong').forEach(el => el.textContent = user.name);
    $$('.profile .avatar, .top-actions > .avatar').forEach(el => el.innerHTML = avatar(user));
    renderPage();
  }

  function avatar(u) {
    return u.avatarUrl
      ? `<img class="avatar-image" src="${esc(u.avatarUrl)}" alt=""><span hidden>${initials(u.name)}</span>`
      : esc(u.avatarText || u.name.split(' ').slice(-2).map(s => s[0]).join(''));
  }

  function action(fn, message) {
    try {
      fn();
      refresh();
      if (message) toast(message);
      return true;
    } catch (e) {
      toast(e.message);
      return false;
    }
  }

  function modal(title, body, onSubmit, submitText = 'Lưu thay đổi', isDanger = false) {
    const d = $('#dialog');
    d.innerHTML = `
      <form id="dialog-form">
        <header class="dialog-head">
          <div>
            <p class="eyebrow">CREATORSTUDIO</p>
            <h2 id="dialog-title">${esc(title)}</h2>
          </div>
          <button type="button" class="icon-button" data-close aria-label="Đóng">${icon('close')}</button>
        </header>
        <div class="dialog-body">
          ${body}
          <p id="form-error" class="form-error" role="alert"></p>
        </div>
        <footer class="dialog-foot">
          <button type="button" class="button" data-close>Hủy</button>
          ${onSubmit ? `<button class="button ${isDanger ? 'danger' : 'primary'}" type="submit">${esc(submitText)}</button>` : '<button type="button" class="button primary" data-close>Đóng</button>'}
        </footer>
      </form>
    `;

    $$('[data-close]', d).forEach(b => b.onclick = () => d.close());

    $('#dialog-form').onsubmit = async e => {
      e.preventDefault();
      if (!onSubmit) return;
      try {
        const formData = Object.fromEntries(new FormData(e.target));
        const submit = e.target.querySelector('[type="submit"]');
        if (submit) submit.disabled = true;
        await onSubmit(formData, e.target);
        d.close();
        refresh();
      } catch (err) {
        const errElem = $('#form-error');
        if (errElem) {
          errElem.textContent = err.message;
          errElem.scrollIntoView({ block: 'nearest' });
        }
      } finally {
        const submit = e.target.querySelector('[type="submit"]');
        if (submit) submit.disabled = false;
      }
    };

    d.onclick = e => {
      if (e.target === d) {
        const r = d.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) {
          d.close();
        }
      }
    };

    d.showModal();
    return d;
  }

  const field = (label, name, value = '', type = 'text', extra = '') => `
    <label class="field">
      <span>${label}</span>
      <input name="${name}" type="${type}" value="${esc(value)}" ${extra}>
    </label>
  `;

  const textField = (label, name, value = '', extra = '') => `
    <label class="field">
      <span>${label}</span>
      <textarea name="${name}" rows="4" ${extra}>${esc(value)}</textarea>
    </label>
  `;

  const select = (label, name, options, value, extra = '') => `
    <label class="field">
      <span>${label}</span>
      <select name="${name}" ${extra}>
        ${options.map(([v, l]) => `<option value="${esc(v)}" ${String(v) === String(value) ? 'selected' : ''}>${esc(l)}</option>`).join('')}
      </select>
    </label>
  `;

  const date = d => d ? new Date(d).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Chưa có hạn';

  const priority = p => {
    const map = { high: 'Cao', urgent: 'Khẩn cấp', medium: 'Vừa', low: 'Thấp' };
    return `<span class="badge ${p}">${map[p] || esc(p)}</span>`;
  };

  const empty = (title, desc) => `
    <div class="empty">
      ${icon('file')}
      <h3>${esc(title)}</h3>
      <p>${esc(desc)}</p>
    </div>
  `;

  const header = (eyebrow, title, desc, buttons = '') => `
    <section class="page-heading">
      <div>
        <p class="eyebrow">${esc(eyebrow)}</p>
        <h1>${esc(title)}</h1>
        <p class="muted">${esc(desc)}</p>
      </div>
      <div class="heading-actions">${buttons}</div>
    </section>
  `;

  function download(text, name) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'application/json;charset=utf-8' }));
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }

  function tools() {
    modal(
      'Công cụ Demo & Quản trị Dữ liệu',
      `
        <p>Bạn đang làm việc trong môi trường CreatorStudio (Phân hệ SV2). Dữ liệu được lưu trữ tự động trong LocalStorage của trình duyệt.</p>
        <div class="stack demo-data-actions">
          <button type="button" id="export-data" class="button">${icon('download')} Xuất dữ liệu JSON sao lưu</button>
          <a class="button" href="404.html" target="_blank">Kiểm tra Trang 404 (Không tìm thấy)</a>
          <a class="button" href="404.html?code=403" target="_blank">Kiểm tra Trang 403 (Cấm truy cập)</a>
          <button type="button" id="reset-data" class="button danger">${icon('trash')} Đặt lại dữ liệu mẫu gốc</button>
        </div>
        <small class="muted">Hành động đặt lại sẽ khôi phục dữ liệu ban đầu cho các dự án, moodboard và phiên bản của SV2.</small>
      `,
      null
    );

    $('#export-data').onclick = () => download(JSON.stringify(Store.get(), null, 2), 'creatorstudio-sv2-data.json');
    $('#reset-data').onclick = () => {
      if (confirm('Khôi phục toàn bộ dữ liệu mẫu ban đầu?')) {
        Store.reset();
        Navigation.activate('Designer', Store.get().users);
        location.href = Navigation.routes.dashboard[0];
      }
    };
  }

  return {
    $,
    $$,
    esc,
    icon,
    init,
    refresh,
    action,
    modal,
    field,
    textField,
    select,
    initials,
    avatar,
    date,
    priority,
    empty,
    header,
    toast,
    banner,
    home,
    download,
    get data() { return data; },
    get user() { return user; },
    get project() { return project; }
  };
})();
