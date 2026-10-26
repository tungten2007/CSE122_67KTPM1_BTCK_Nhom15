/* Khung điều hướng SV3. Tải sau store.js, trước app.js.
 * activate(role, users): ghi phiên demo, trả URL; không tự điều hướng.
 * Hai phân hệ Client/Designer chỉ bật URL thật khi đã ghép đủ file.
 */
window.Navigation = (() => {
  const appUrl=path=>new URL(path,document.baseURI).href;
  const roles={Lead:'Trưởng nhóm',Admin:'Quản trị viên',Designer:'Nhà thiết kế',Client:'Khách hàng'};
  const routes = {
    // Designer Routes (SV2)
    dashboard: ['html/sv2/designer-dashboard.html', 'Bảng điều khiển', 'grid', 'Designer'],
    moodboard: ['html/sv2/designer-moodboard.html', 'Bảng cảm hứng', 'spark', 'Designer'],
    versions: ['html/sv2/designer-version-management.html', 'Quản lý phiên bản', 'file', 'Designer'],

    // Admin Routes (SV2 phụ trách Brief Template Management)
    briefTemplates: ['html/sv2/admin-brief-template-management.html', 'Mẫu Brief & AI', 'file', 'Admin'],
    users: ['html/sv3/admin-user-management.html', 'Người dùng', 'users', 'Admin'],
    settings: ['html/sv3/admin-project-settings.html', 'Thiết lập dự án', 'settings', 'Admin'],

    // Lead Routes
    board: ['html/sv3/lead-task-board.html', 'Bảng công việc', 'grid', 'Lead'],
    review: ['html/sv3/lead-internal-review.html', 'Duyệt nội bộ', 'check', 'Lead'],
    feedback: ['html/sv3/lead-feedback-summary.html', 'Tổng hợp phản hồi', 'spark', 'Lead'],

    // Client Routes
    clientBrief: ['html/sv1/client-creative-brief.html', 'Creative Brief', 'file', 'Client'],
    clientReview: ['html/sv1/client-review-versions.html', 'Duyệt phiên bản', 'check', 'Client'],
    clientProjects: ['html/sv1/client-project-overview.html', 'Tổng quan dự án', 'grid', 'Client'],

    // Shared Routes (Dùng chung)
    profile: ['html/sv2/profile.html', 'Hồ sơ cá nhân', 'users', '*'],
    notifications: ['html/sv2/notifications.html', 'Thông báo', 'bell', '*']
  };

  const integrations={Client:{ready:true,home:'html/sv1/client-project-overview.html'},Designer:{ready:true,home:'html/sv2/designer-dashboard.html'}};
  function home(role){if(role==='Client')return routes.clientProjects[0];if(role==='Designer')return routes.dashboard[0];if(role==='Admin')return routes.users[0];if(role==='Lead')return routes.board[0];const integration=integrations[role];return integration?.ready?integration.home:'html/sv3/role-preview.html'}
  function canOpen(key,user){return key==='error'||!!(user?.active&&(key==='rolePreview'?['Client','Designer'].includes(user.role):(routes[key]?.[3]===user.role||routes[key]?.[3]==='*')))}
  function remember(user){const safe={app:'creatorstudio-sv3',id:user.id,name:user.name,role:user.role};localStorage.setItem('currentUser',JSON.stringify(safe));localStorage.setItem('cs.preferredRole',user.role==='Lead'?'Creative Lead':user.role);try{sessionStorage.setItem('cs-user',user.id);sessionStorage.setItem('cs.session',JSON.stringify({id:user.id,name:user.name,email:user.email,role:user.role==='Lead'?'Creative Lead':user.role}))}catch{}}
  function current(users){let uid;try{uid=sessionStorage.getItem('cs-user')}catch{}if(!uid){try{const saved=JSON.parse(localStorage.getItem('currentUser')||'null');if(['creatorstudio-sv3','creatorstudio'].includes(saved?.app))uid=saved.id}catch{}}return users.find(u=>u.id===uid)||users.find(u=>u.active&&u.role==='Lead')||users.find(u=>u.active&&u.role==='Admin')||users.find(u=>u.active)}
  function activate(role,users,userId){if(!Object.hasOwn(roles,role))throw new Error('Vai trò không hợp lệ.');const user=users.find(u=>u.role===role&&u.active&&(!userId||u.id===userId));if(!user)throw new Error('Không có tài khoản demo hoạt động cho vai trò này.');remember(user);return home(role)}
  function accountOptions(users, selectedId) {
    const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    return Object.entries(roles).map(([role,label])=>`<optgroup label="${esc(label)}">${users.filter(u=>u.active&&u.role===role).map(u=>`<option value="${esc(u.id)}" ${u.id===selectedId?'selected':''}>${esc(u.name)} · ${esc(u.email)}</option>`).join('')}</optgroup>`).join('');
  }
  function switchAccount(id) {
    const users=Store.get().users, user=users.find(u=>u.id===id&&u.active);
    if (!user) throw Error('Tài khoản không hoạt động hoặc không còn tồn tại.');
    return activate(user.role, users, user.id);
  }
  function applyContext(data) {
    const pid = new URLSearchParams(location.search).get('project');
    if (pid && data.projects.some(p => p.id === pid)) sessionStorage.setItem('cs-project', pid);
  }
  function logout(){sessionStorage.removeItem('cs-user');sessionStorage.removeItem('cs.session');sessionStorage.removeItem('cs-project');localStorage.removeItem('currentUser');location.href=appUrl('html/sv1/login.html')}
  function bindMenu(){const q=s=>document.querySelector(s),side=q('.sidebar'),button=q('.menu-toggle'),shade=q('.sidebar-shade'),workspace=q('.workspace');let open=false;const media=matchMedia('(max-width:760px)');
    function setOpen(value){open=!!value&&media.matches;document.body.classList.toggle('menu-open',open);shade.hidden=!open;button.setAttribute('aria-expanded',String(open));workspace.inert=open;side.inert=media.matches&&!open;if(open)q('.mobile-close').focus();else if(media.matches)button.focus()}
    button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','global-sidebar');side.id='global-sidebar';side.inert=media.matches;
    button.onclick=()=>setOpen(true);q('.mobile-close').onclick=()=>setOpen(false);shade.onclick=()=>setOpen(false);
    document.addEventListener('keydown',e=>{if(!open)return;if(e.key==='Escape'){e.preventDefault();setOpen(false)}if(e.key==='Tab'){const items=[...side.querySelectorAll('a[href],button:not(:disabled),select')].filter(n=>n.getClientRects().length);const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}},{signal:window.WorkspaceNavigation?.signal});
    media.addEventListener('change',()=>setOpen(false),{signal:window.WorkspaceNavigation?.signal});
    const bottom=q('.sidebar-bottom');if(bottom&&!q('#logout')){const out=document.createElement('button');out.type='button';out.id='logout';out.className='text-light';out.textContent='Đăng xuất';out.onclick=logout;bottom.append(out);}
  }

  // One shell for Designer, Lead and Admin, including their shared pages.
  function renderShell({key,data,user,project,icon,tools}) {
    const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
    const initials=esc(user.name.split(' ').slice(-2).map(s=>s[0]).join(''));
    const menu=Object.entries(routes).filter(([,v])=>v[3]===user.role||v[3]==='*').map(([k,v])=>`<a href="${v[0]}" class="nav-link ${k===key?'active':''}" ${k===key?'aria-current="page"':''}>${icon(v[2])}<span>${esc(v[1])}</span></a>`).join('');
    document.body.classList.add('team-shell');
    document.body.innerHTML=`<a class="skip-link" href="${esc(location.pathname + location.search)}#main">Đến nội dung chính</a><div class="sidebar-shade" hidden></div>
      <aside class="sidebar" aria-label="Điều hướng chính">
        <a class="brand" href="${home(user.role)}"><span class="brand-mark">✳</span>CreatorStudio</a>
        <button class="icon-button mobile-close" aria-label="Đóng menu">${icon('close')}</button>
        <p class="nav-caption">KHÔNG GIAN ${esc(roles[user.role]).toUpperCase()}</p><nav>${menu}</nav>
        <div class="sidebar-project"><p class="nav-caption">DỰ ÁN ĐANG CHỌN</p><strong>${esc(project.name)}</strong><small>${esc(project.description)}</small></div>
        <div class="sidebar-bottom"><button class="text-light" id="demo-tools-btn">${icon('settings')} Công cụ demo</button><a class="profile" href="html/sv2/profile.html"><span class="avatar">${initials}</span><div><strong>${esc(user.name)}</strong><small>${esc(roles[user.role])}</small></div></a></div>
      </aside>
      <div class="workspace"><header class="topbar"><button class="icon-button menu-toggle" aria-label="Mở menu">${icon('menu')}</button><div class="breadcrumb">Không gian làm việc <span>/</span> <strong>${esc(routes[key]?.[1]||'Trang lỗi')}</strong></div><div class="top-actions">
        <label class="sr-only" for="project-select">Dự án</label><select id="project-select" aria-label="Chọn dự án">${data.projects.map(p=>`<option value="${esc(p.id)}" ${p.id===project.id?'selected':''}>${esc(p.name)}${p.archived?' · Lưu trữ':''}</option>`).join('')}</select>
        <label class="sr-only" for="role-switch">Tài khoản demo</label><select id="role-switch" aria-label="Chuyển tài khoản demo">${accountOptions(data.users,user.id)}</select>
        <a href="html/sv2/notifications.html" class="notification-button" id="activity-bell" aria-label="Xem thông báo">${icon('bell')}</a><a class="avatar small" href="html/sv2/profile.html" aria-label="${initials} — Hồ sơ cá nhân">${initials}</a></div></header>
        <main id="main" tabindex="-1"></main><footer class="page-footer">CreatorStudio · Nhóm 15 · Dữ liệu minh họa lưu trên trình duyệt</footer></div>
      <dialog id="dialog" aria-labelledby="dialog-title"></dialog><div id="toast" role="status" aria-live="polite"></div>`;
    document.querySelector('#role-switch').onchange=e=>{try{const target=new URL(appUrl(switchAccount(e.target.value)));if(window.WorkspaceNavigation?.canOpen(target))window.WorkspaceNavigation.navigate(target);else location.href=target.href}catch(err){e.target.value=user.id;window.App?.toast(err.message)}};
    document.querySelector('#project-select').onchange=e=>{sessionStorage.setItem('cs-project',e.target.value);const url=new URL(location.href);url.searchParams.set('project',e.target.value);url.searchParams.delete('version');if(window.WorkspaceNavigation?.canOpen(url))window.WorkspaceNavigation.navigate(url);else location.href=url.href};
    document.querySelector('#demo-tools-btn').onclick=tools;
    bindMenu();
    const sidebar=document.querySelector('.sidebar');
    const scrollKey='cs-sidebar-scroll-'+user.role;
    try{sidebar.scrollTop=Number(sessionStorage.getItem(scrollKey)||0)}catch{}
    sidebar.addEventListener('scroll',()=>{try{sessionStorage.setItem(scrollKey,String(sidebar.scrollTop))}catch{}},{passive:true});
  }

  return {applyContext,accountOptions,switchAccount,renderShell,roles,routes,integrations,home,canOpen,current,remember,activate,bindMenu,logout};
})();

window.addEventListener?.('pagereveal', event => {
  if (event.viewTransition) {
    event.viewTransition.ready.catch(() => {});
    event.viewTransition.finished.catch(() => {});
  }
});
