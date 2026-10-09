/* Khung điều hướng SV3. Tải sau store.js, trước app.js.
 * activate(role, users): ghi phiên demo, trả URL; không tự điều hướng.
 * Hai phân hệ Client/Designer chỉ bật URL thật khi đã ghép đủ file.
 */
window.Navigation = (() => {
  const roles={Lead:'Trưởng nhóm',Admin:'Quản trị viên',Designer:'Nhà thiết kế',Client:'Khách hàng'};
  const routes={board:['lead-task-board.html','Bảng công việc','grid','Lead'],review:['lead-internal-review.html','Duyệt nội bộ','check','Lead'],feedback:['lead-feedback-summary.html','Tổng hợp phản hồi','spark','Lead'],users:['admin-user-management.html','Người dùng','users','Admin'],settings:['admin-project-settings.html','Thiết lập dự án','settings','Admin']};
  const integrations={Client:{ready:false,home:'client-project-overview.html'},Designer:{ready:false,home:'designer-dashboard.html'}};
  function home(role){if(role==='Admin')return routes.users[0];if(role==='Lead')return routes.board[0];const integration=integrations[role];return integration?.ready?integration.home:'role-preview.html'}
  function canOpen(key,user){return key==='error'||!!(user?.active&&(key==='rolePreview'?['Client','Designer'].includes(user.role):routes[key]?.[3]===user.role))}
  function remember(user){const safe={app:'creatorstudio-sv3',id:user.id,name:user.name,role:user.role};localStorage.setItem('currentUser',JSON.stringify(safe));try{sessionStorage.setItem('cs-user',user.id)}catch{}}
  function current(users){let uid;try{uid=sessionStorage.getItem('cs-user')}catch{}if(!uid){try{const saved=JSON.parse(localStorage.getItem('currentUser')||'null');if(saved?.app==='creatorstudio-sv3')uid=saved.id}catch{}}return users.find(u=>u.id===uid)||users.find(u=>u.active&&u.role==='Lead')||users.find(u=>u.active&&u.role==='Admin')||users.find(u=>u.active)}
  function activate(role,users){if(!Object.hasOwn(roles,role))throw new Error('Vai trò không hợp lệ.');const user=users.find(u=>u.role===role&&u.active);if(!user)throw new Error('Không có tài khoản demo hoạt động cho vai trò này.');remember(user);return home(role)}
  function bindMenu(){const q=s=>document.querySelector(s),side=q('.sidebar'),button=q('.menu-toggle'),shade=q('.sidebar-shade'),workspace=q('.workspace');let open=false;const media=matchMedia('(max-width:760px)');
    function setOpen(value){open=!!value&&media.matches;document.body.classList.toggle('menu-open',open);shade.hidden=!open;button.setAttribute('aria-expanded',String(open));workspace.inert=open;side.inert=media.matches&&!open;if(open)q('.mobile-close').focus();else if(media.matches)button.focus()}
    button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','global-sidebar');side.id='global-sidebar';side.inert=media.matches;
    button.onclick=()=>setOpen(true);q('.mobile-close').onclick=()=>setOpen(false);shade.onclick=()=>setOpen(false);
    document.addEventListener('keydown',e=>{if(!open)return;if(e.key==='Escape'){e.preventDefault();setOpen(false)}if(e.key==='Tab'){const items=[...side.querySelectorAll('a[href],button:not(:disabled),select')].filter(n=>n.getClientRects().length);const first=items[0],last=items.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
    media.addEventListener('change',()=>setOpen(false));
  }
  return {roles,routes,integrations,home,canOpen,current,remember,activate,bindMenu};
})();
