/* Shared storage adapter for the submitted Client views. No duplicate database. */
window.TeamClient=(()=>{
 let baseline;
 const clone=x=>JSON.parse(JSON.stringify(x)),check=(v,m)=>{if(!v)throw Error(m)},equal=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
 const publicStates=['Client Review','Approved','Changes Requested','Rejected'];
 function session(){try{const s=JSON.parse(sessionStorage.getItem('cs.session')||'null');if(!s)return null;Store.load();const u=Store.get().users.find(u=>u.id===s.id&&u.active);return u?{...u,role:u.role==='Lead'?'Creative Lead':u.role}:null}catch{return null}}
 function login(role){try{Store.load();Navigation.activate(role==='Creative Lead'?'Lead':role,Store.get().users);return true}catch(e){window.CS?.toast(e.message);return false}}
 function authenticate(email,password){
  Store.load();const user=Store.get().users.find(u=>u.email.toLowerCase()===email.trim().toLowerCase());
  check(user&&user.active&&(user.demoPassword||'demo123')===password,'Email hoặc mật khẩu demo không đúng, hoặc tài khoản đã bị khóa.');
  Navigation.remember(user);return user;
 }
 function home(){const r=session()?.role;return Navigation.home(r==='Creative Lead'?'Lead':r)}
 function projectView(p,d){
  const versions=d.versions.filter(v=>v.projectId===p.id&&publicStates.includes(v.status)).sort((a,b)=>(Date.parse(a.createdAt)||0)-(Date.parse(b.createdAt)||0)||(a.versionNum||0)-(b.versionNum||0));
  const requested=new URLSearchParams(location.search).get('version');const v=versions.find(v=>v.id===requested)||versions.at(-1);
  const previous=versions[versions.findIndex(x=>x.id===v?.id)-1];
  const b=d.briefs.filter(b=>b.projectId===p.id).at(-1),tasks=d.tasks.filter(t=>t.projectId===p.id);
  return {...p,category:p.category||p.tags?.[0]||'Branding',art:p.art||'moc',deadline:p.deadline||b?.deadline||'2026-12-01',
   status:p.archived?'Archived':p.status||(v?.status==='Approved'?'Completed':v?.status==='Client Review'?'In Review':'Active'),
   progress:p.status==='Completed'?100:tasks.length?Math.round(tasks.filter(t=>t.status==='done').length/tasks.length*100):(p.progress||0),
   versionId:v?.id||null,versionStatus:v?.status||null,versionImage:v?.image||'assets/coffee.svg',previousImage:previous?.image||null,rejectionReason:[...(v?.history||[])].reverse().find(h=>h.action==='Rejected')?.reason||'',
   availableVersions:versions.map(v=>({id:v.id,name:v.name,status:v.status})),
   comments:d.comments.filter(c=>c.versionId===v?.id).map(c=>({...c,x:c.x??.5,y:c.y??.5,createdAt:c.createdAt||'2026-10-01T00:00:00Z'})),
   brief:b?{...b.clientData,sections:b.clientData?.sections||{goal:b.summary||'',audience:b.audience||'',message:'',style:'',deliverables:b.deliverables||''},deadline:b.deadline,accepted:b.clientData?.accepted??true,submitted:['submitted','approved'].includes(b.status),reviewStatus:b.status,reason:b.reason||''}:null};
 }
 function read(){Store.load();const d=Store.get(),uid=session()?.id;const value={projects:d.projects.map(p=>projectView(p,d)),notifications:d.notifications.filter(n=>n.userId===uid).map(n=>({...n,message:n.message||n.title,createdAt:n.time}))};baseline=clone(value);return value}
 function write(value){try{const old=baseline,user=session();check(old,'Tải lại dữ liệu trước khi lưu.');check(user?.role==='Client','Chỉ Client được sửa dữ liệu khách hàng.');
 Store.transaction(d=>{
 check(d.users.some(u=>u.id===user.id&&u.active&&u.role==='Client'),'Tài khoản không còn quyền chỉnh sửa.');
 for(const p of old.projects.filter(p=>!value.projects.some(x=>x.id===p.id))){check(d.projects.find(x=>x.id===p.id)?.archived,'Chỉ xóa dự án đã lưu trữ.');check(!['tasks','briefs','versions','comments','moodboards'].some(k=>d[k].some(x=>x.projectId===p.id)),'Dự án đã có dữ liệu liên kết; hãy giữ ở trạng thái lưu trữ.');check(d.projects.length>1,'Cần giữ ít nhất một dự án.');d.projects=d.projects.filter(x=>x.id!==p.id)}
 for(const p of value.projects){const before=old.projects.find(x=>x.id===p.id);if(before&&equal(before,p))continue;let target=d.projects.find(x=>x.id===p.id);check(p.name?.trim().length>=3,'Tên dự án cần ít nhất 3 ký tự.');
 if(!target){check(!before,'Dự án đã bị xóa, hãy tải lại.');target={id:p.id,code:'CS-'+p.id.slice(-6),tags:[],archived:false};d.projects.push(target)}
 if(target.archived)check(p.status!=='Archived'||equal(before,p),'Dự án lưu trữ chỉ được xem.');
 for(const k of ['name','description','category','deadline','budget','art','previousStatus'])if(!before||!equal(p[k],before[k]))target[k]=p[k];
 if(!before||p.status!==before.status){target.archived=p.status==='Archived';target.status=p.status}
 if(!equal(p.brief,before?.brief)&&p.brief){check(!target.archived,'Dự án đã lưu trữ.');const b=p.brief,sec=b.sections||{};let brief=d.briefs.filter(x=>x.projectId===p.id).at(-1);if(!brief){brief={id:Store.id('brief'),projectId:p.id};d.briefs.push(brief)}Object.assign(brief,{title:p.name,client:user.name,summary:sec.goal||b.raw||'',audience:sec.audience||'',deliverables:sec.deliverables||'',deadline:b.deadline,status:b.submitted?'submitted':'draft',reason:'',clientData:clone(b)})}
 if(p.versionId&&(!equal(p.comments,before?.comments)||p.versionStatus!==before?.versionStatus)){
 const v=d.versions.find(v=>v.id===p.versionId&&v.projectId===p.id);check(!target.archived&&v?.status==='Client Review','Phiên bản đã chuyển bước; hãy tải lại trước khi phản hồi.');check(publicStates.includes(p.versionStatus),'Trạng thái phiên bản không hợp lệ.');
 const removed=(before?.comments||[]).filter(c=>!p.comments.some(x=>x.id===c.id)).map(c=>c.id);d.comments=d.comments.filter(c=>!removed.includes(c.id));
 for(const c of p.comments){const prev=before?.comments.find(x=>x.id===c.id);if(prev&&equal(prev,c))continue;check(c.text?.trim().length>=3,'Phản hồi cần ít nhất 3 ký tự.');const entry={...c,projectId:p.id,versionId:v.id,author:user.name};const i=d.comments.findIndex(x=>x.id===c.id);if(i<0)d.comments.push(entry);else d.comments[i]=entry}
 if(v.status!==p.versionStatus){v.status=p.versionStatus;v.history.push({action:p.versionStatus,by:user.id,time:new Date().toISOString(),reason:p.rejectionReason||p.changeReason||''});for(const u of d.users.filter(u=>u.active&&['Lead','Designer'].includes(u.role)))d.notifications.unshift({id:Store.id('notif'),userId:u.id,projectId:p.id,type:'feedback',title:'Khách hàng đã phản hồi',message:p.name+': '+p.versionStatus,read:false,time:new Date().toISOString(),link:u.role==='Lead'?'lead-feedback-summary.html':'designer-version-management.html'})}
 }
 }
 for(const n of value.notifications){const prev=old.notifications.find(x=>x.id===n.id);if(prev&&n.read!==prev.read){const target=d.notifications.find(x=>x.id===n.id&&x.userId===user.id);if(target)target.read=n.read}}
 });baseline=clone(value);return true}catch(e){window.CS?.toast(e.message);return false}}
 function notify(message,projectId,type){try{const user=session();Store.transaction(d=>{check(user?.role==='Client','Phiên Client không hợp lệ.');for(const u of d.users.filter(u=>u.active&&(u.role==='Lead'||u.id===user.id)))d.notifications.unshift({id:Store.id('notif'),userId:u.id,projectId,type,title:message,message,read:false,time:new Date().toISOString(),link:u.role==='Lead'?'lead-task-board.html':'client-project-overview.html?project='+encodeURIComponent(projectId)})});return true}catch(e){window.CS?.toast(e.message);return false}}
 return {read,write,session,login,authenticate,home,notify};
})();
