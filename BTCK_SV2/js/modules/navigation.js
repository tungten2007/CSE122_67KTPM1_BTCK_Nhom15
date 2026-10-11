/* Navigation Module: Quản lý menu, phân quyền demo và điều hướng giữa các vai trò */
window.Navigation = (() => {
  const roles = {
    Designer: 'Nhà thiết kế',
    Admin: 'Quản trị viên',
    Lead: 'Trưởng nhóm',
    Client: 'Khách hàng'
  };

  const routes = {
    // Designer Routes (SV2)
    dashboard: ['designer-dashboard.html', 'Bảng điều khiển', 'grid', 'Designer'],
    moodboard: ['designer-moodboard.html', 'Bảng cảm hứng', 'spark', 'Designer'],
    versions: ['designer-version-management.html', 'Quản lý phiên bản', 'file', 'Designer'],

    // Admin Routes (SV2 phụ trách Brief Template Management)
    briefTemplates: ['admin-brief-template-management.html', 'Mẫu Brief & AI', 'file', 'Admin'],
    users: ['admin-user-management.html', 'Người dùng', 'users', 'Admin'],
    settings: ['admin-project-settings.html', 'Thiết lập dự án', 'settings', 'Admin'],

    // Lead Routes
    board: ['lead-task-board.html', 'Bảng công việc', 'grid', 'Lead'],
    review: ['lead-internal-review.html', 'Duyệt nội bộ', 'check', 'Lead'],
    feedback: ['lead-feedback-summary.html', 'Tổng hợp phản hồi', 'spark', 'Lead'],

    // Client Routes
    clientBrief: ['client-creative-brief.html', 'Creative Brief', 'file', 'Client'],
    clientReview: ['client-review-versions.html', 'Duyệt phiên bản', 'check', 'Client'],
    clientProjects: ['client-project-overview.html', 'Tổng quan dự án', 'grid', 'Client'],

    // Shared Routes (Dùng chung)
    profile: ['profile.html', 'Hồ sơ cá nhân', 'users', '*'],
    notifications: ['notifications.html', 'Thông báo', 'bell', '*']
  };

  function home(role) {
    if (role === 'Designer') return routes.dashboard[0];
    if (role === 'Admin') return routes.briefTemplates[0];
    if (role === 'Lead' || role === 'Client') return routes.profile[0];
    return routes.dashboard[0];
  }

  function canOpen(key, user) {
    if (key === 'error' || key === 'profile' || key === 'notifications') return true;
    const route = routes[key];
    if (!route) return true;
    if (route[3] === '*') return true;
    return !!(user && user.active && user.role === route[3]);
  }

  function remember(user) {
    const safe = { app: 'creatorstudio', id: user.id, name: user.name, role: user.role };
    localStorage.setItem('currentUser', JSON.stringify(safe));
    try {
      sessionStorage.setItem('cs-user', user.id);
    } catch (e) {}
  }

  function current(users) {
    let uid;
    try {
      uid = sessionStorage.getItem('cs-user');
    } catch (e) {}
    if (!uid) {
      try {
        const saved = JSON.parse(localStorage.getItem('currentUser') || 'null');
        if (saved && saved.id) uid = saved.id;
      } catch (e) {}
    }
    return users.find(u => u.id === uid && u.active) ||
           users.find(u => u.active && u.role === 'Designer') ||
           users.find(u => u.active && u.role === 'Admin') ||
           users.find(u => u.active);
  }

  function activate(role, users) {
    if (!Object.hasOwn(roles, role)) throw new Error('Vai trò không hợp lệ.');
    const user = users.find(u => u.role === role && u.active);
    if (!user) throw new Error('Không có tài khoản demo hoạt động cho vai trò này.');
    remember(user);
    return home(role);
  }

  function bindMenu() {
    const q = s => document.querySelector(s);
    const side = q('.sidebar');
    const button = q('.menu-toggle');
    const shade = q('.sidebar-shade');
    const workspace = q('.workspace');
    if (!button || !side) return;

    let open = false;
    const media = matchMedia('(max-width: 760px)');

    function setOpen(value) {
      open = !!value && media.matches;
      document.body.classList.toggle('menu-open', open);
      if (shade) shade.hidden = !open;
      button.setAttribute('aria-expanded', String(open));
      if (workspace) workspace.inert = open;
      side.inert = media.matches && !open;
      if (open) {
        const closeBtn = q('.mobile-close');
        if (closeBtn) closeBtn.focus();
      } else if (media.matches) {
        button.focus();
      }
    }

    button.setAttribute('aria-expanded', 'false');
    button.setAttribute('aria-controls', 'global-sidebar');
    side.id = 'global-sidebar';
    side.inert = media.matches;

    button.onclick = () => setOpen(true);
    const closeBtn = q('.mobile-close');
    if (closeBtn) closeBtn.onclick = () => setOpen(false);
    if (shade) shade.onclick = () => setOpen(false);

    document.addEventListener('keydown', e => {
      if (!open) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
      }
    });

    media.addEventListener('change', () => setOpen(false));
  }

  return {
    roles,
    routes,
    home,
    canOpen,
    current,
    remember,
    activate,
    bindMenu
  };
})();
