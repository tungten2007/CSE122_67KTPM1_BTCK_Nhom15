window.App = (() => {
  const $=(s,root=document)=>root.querySelector(s), $$=(s,root=document)=>[...root.querySelectorAll(s)];
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icons={grid:'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',check:'m5 12 4 4L19 6',spark:'m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z',users:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M16 3a4 4 0 0 1 0 8M22 21v-2a4 4 0 0 0-3-3.87M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',settings:'M4 6h16M4 12h16M4 18h16M8 3v6M16 9v6M10 15v6',plus:'M12 5v14M5 12h14',search:'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',menu:'M3 6h18M3 12h18M3 18h18',arrow:'M5 12h14m-6-6 6 6-6 6',close:'m6 6 12 12M6 18 18 6',clock:'M12 8v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',file:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h5',lock:'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4',bell:'M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4',download:'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5'};
  const icon=name=>`<svg class="icon" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="${icons[name]||icons.grid}"/></svg>`;
  const routes=Navigation.routes;
  const roleName=Navigation.roles;
  const stateLabel={todo:'Cần làm',doing:'Đang thực hiện',review:'Chờ duyệt',done:'Hoàn thành'};
  let data,user,project,renderPage=()=>{},toastTimer;
  function session(key,value){try{if(value!==undefined)sessionStorage.setItem(key,value);return sessionStorage.getItem(key)}catch{return null}}
  function sync(){data=Store.get();user=Navigation.current(data.users);if(!user)throw new Error('Không có tài khoản demo hoạt động.');project=data.projects.find(p=>p.id===session('cs-project'))||data.projects[0];session('cs-project',project.id)}
  function home(){return Navigation.home(user?.role)}
  function toast(message){clearTimeout(toastTimer);$('#toast').textContent=message;$('#toast').classList.add('visible');toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),4000)}
  function banner(){return project.archived?'<div class="notice warning">'+icon('lock')+'<span>Dự án đã lưu trữ. Bạn chỉ có thể xem nội dung.</span></div>':''}
  function shell(key){Navigation.renderShell({key,data,user,project,icon,tools})}
  function init(key,fn){try{Store.load();sync()}catch(e){document.body.innerHTML='<main class="recovery"><h1>Chưa mở được dữ liệu</h1><p>'+esc(e.message)+'</p><button id="backup">Tải bản sao dữ liệu</button> <button id="recover">Đặt lại dữ liệu mẫu</button><p id="recovery-error" role="alert"></p></main>';$('#backup').onclick=()=>{try{download(localStorage.getItem(Store.KEY)||'','creatorstudio-backup.txt')}catch(e){$('#recovery-error').textContent=e.message}};$('#recover').onclick=()=>{if(confirm('Xóa dữ liệu demo hiện tại và khôi phục mẫu?'))try{Store.reset();location.reload()}catch(e){$('#recovery-error').textContent='Trình duyệt đang chặn lưu dữ liệu. Hãy mở bằng Live Server và bật lưu trữ cho trang.'}};return}
    if(!Navigation.canOpen(key,user)){location.replace('404.html?code=403');return}shell(key);renderPage=fn;fn();
  }
  // Keep keyboard position when a page rebuilds its main content.
  function preserveFocus(render){
    const main=$('#main'), active=document.activeElement;
    const inside=main?.contains(active);
    const id=inside?active.id:'';
    const data=inside?[...active.attributes].find(a=>a.name.startsWith('data-')):null;
    const start=inside?active.selectionStart:null, end=inside?active.selectionEnd:null;
    render();
    if(!inside)return;
    const replacement=id?document.getElementById(id):data?$$('['+data.name+']',main).find(el=>el.getAttribute(data.name)===data.value):null;
    const target=replacement&&!replacement.disabled?replacement:main;
    target?.focus({preventScroll:true});
    if(target===replacement&&typeof start==='number'&&typeof target.setSelectionRange==='function')target.setSelectionRange(start,end);
  }
  function refresh(){sync();renderPage()}
  function action(fn,message){try{fn();refresh();if(message)toast(message);return true}catch(e){toast(e.message);return false}}
  function modal(title,body,onSubmit,submit='Lưu thay đổi',danger=false){const d=$('#dialog');d.className='';d.innerHTML=`<form id="dialog-form"><header class="dialog-head"><div><p class="eyebrow">CREATORSTUDIO</p><h2 id="dialog-title">${esc(title)}</h2></div><button type="button" class="icon-button" data-close aria-label="Đóng">${icon('close')}</button></header><div class="dialog-body">${body}<p id="form-error" class="form-error" role="alert"></p></div><footer class="dialog-foot"><button type="button" class="button" data-close>Hủy</button>${onSubmit?`<button class="button ${danger?'danger':'primary'}" type="submit">${esc(submit)}</button>`:'<button type="button" class="button primary" data-close>Đóng</button>'}</footer></form>`;$$('[data-close]',d).forEach(b=>b.onclick=()=>d.close());$('#dialog-form').onsubmit=e=>{e.preventDefault();if(!onSubmit)return;try{onSubmit(Object.fromEntries(new FormData(e.target)),e.target);d.close();refresh()}catch(err){$('#form-error').textContent=err.message;$('#form-error').scrollIntoView({block:'nearest'})}};d.onclick=e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close()}};d.showModal();return d}
  const field=(label,name,value='',type='text',extra='')=>`<label class="field">${label}<input name="${name}" type="${type}" value="${esc(value)}" ${extra}></label>`;
  const textField=(label,name,value='',extra='')=>`<label class="field">${label}<textarea name="${name}" rows="4" ${extra}>${esc(value)}</textarea></label>`;
  const select=(label,name,options,value,extra='')=>`<label class="field">${label}<select name="${name}" ${extra}>${options.map(([v,l])=>`<option value="${esc(v)}" ${v===value?'selected':''}>${esc(l)}</option>`).join('')}</select></label>`;
  const initials=name=>esc(name.split(' ').slice(-2).map(s=>s[0]).join(''));
  const date=d=>d?new Date(d+'T00:00:00').toLocaleDateString('vi-VN',{day:'2-digit',month:'2-digit'}):'Chưa có hạn';
  const priority=p=>`<span class="badge ${p}">${{high:'Cao',medium:'Vừa',low:'Thấp'}[p]||esc(p)}</span>`;
  const empty=(title,desc)=>`<div class="empty">${icon('file')}<h3>${esc(title)}</h3><p>${esc(desc)}</p></div>`;
  const header=(eyebrow,title,desc,buttons='')=>`<section class="page-heading"><div><p class="eyebrow">${esc(eyebrow)}</p><h1>${esc(title)}</h1><p class="muted">${esc(desc)}</p></div><div class="heading-actions">${buttons}</div></section>`;
  const people=()=>data.users.filter(u=>u.active&&['Lead','Designer'].includes(u.role)).map(u=>[u.id,u.name]);
  function download(text,name){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type:'application/json;charset=utf-8'}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
  function tools(){modal('Công cụ demo',`<p>Chuyển vai trò ở góc trên để xem các vai trò. Các vai trò dùng chung dữ liệu dự án, brief, phiên bản và phản hồi. Đây là phiên demo, không phải đăng nhập bảo mật.</p><div class="tool-actions"><button type="button" id="export-data" class="button">${icon('download')}Xuất dữ liệu JSON</button><a class="button" href="404.html">Xem trang 404</a><a class="button" href="404.html?code=403">Xem trang 403</a><button type="button" id="reset-data" class="button danger">Đặt lại dữ liệu mẫu</button></div><p class="muted">Đặt lại chỉ xóa dữ liệu của bản tích hợp này.</p>`,null);$('#export-data').onclick=()=>download(JSON.stringify(Store.get(),null,2),'creatorstudio-data.json');$('#reset-data').onclick=()=>{if(confirm('Xóa mọi thay đổi của demo CreatorStudio và khôi phục dữ liệu mẫu?')){Store.reset();Navigation.activate('Lead',Store.get().users);location.href=routes.board[0]}}}
  return {$,$$,esc,icon,routes,roleName,stateLabel,init,refresh,preserveFocus,action,modal,field,textField,select,initials,date,priority,empty,header,people,toast,banner,home,download,get data(){return data},get user(){return user},get project(){return project}};
})();
