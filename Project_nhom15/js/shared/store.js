/* Lớp dữ liệu: tất cả thay đổi được kiểm tra rồi lưu một lần vào LocalStorage. */
window.Store = (() => {
  const KEY='creatorstudio.team.v1'; let db;
  const clone=x=>JSON.parse(JSON.stringify(x));
  const requireValue=(test,message)=>{if(!test)throw new Error(message)};
  const roles=['Client','Designer','Lead','Admin'], statuses=['todo','doing','review','done'];
  function load(){const raw=localStorage.getItem(KEY);db=raw?JSON.parse(raw):CS_SEED();requireValue(db.schema===1&&['users','projects','tasks','briefs','versions','notes','comments','proposals','tags','activity','moodboards','briefTemplates','notifications'].every(k=>Array.isArray(db[k]))&&db.settings,'Dữ liệu lưu không hợp lệ. Hãy xuất bản sao rồi đặt lại dữ liệu mẫu.');if(!raw)localStorage.setItem(KEY,JSON.stringify(db));return clone(db)}
  const get=()=>clone(db);
  const id=prefix=>prefix+'-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2,7);
  function tx(fn){const latest=localStorage.getItem(KEY);if(latest){const stored=JSON.parse(latest);requireValue(stored.schema===1,"Dữ liệu đã thay đổi định dạng. Hãy tải lại trang.");db=stored}const next=clone(db);fn(next);try{localStorage.setItem(KEY,JSON.stringify(next))}catch(e){throw new Error('Không lưu được dữ liệu. Bộ nhớ trình duyệt có thể đã đầy hoặc bị chặn. Thay đổi chưa được áp dụng.')}db=next;return get()}
  function actor(d,uid,role){const u=d.users.find(u=>u.id===uid);requireValue(u&&u.active&&(!role||(Array.isArray(role)?role.includes(u.role):u.role===role)),'Bạn không có quyền thực hiện thao tác này.');return u}
  function writable(d,pid){const p=d.projects.find(p=>p.id===pid);requireValue(p,'Không tìm thấy dự án.');requireValue(!p.archived,'Dự án đã lưu trữ, chỉ được xem.');return p}
  function log(d,text){d.activity.unshift({id:id('a'),text,time:new Date().toISOString()});d.activity=d.activity.slice(0,80)}
  function taskData(d,t){requireValue(t.title?.trim().length>=3&&t.title.trim().length<=120,'Tên công việc cần từ 3 đến 120 ký tự.');requireValue(statuses.includes(t.status),'Trạng thái không hợp lệ.');requireValue(['high','medium','low'].includes(t.priority),'Mức ưu tiên không hợp lệ.');requireValue(d.users.some(u=>u.id===t.assignee&&u.active&&['Lead','Designer'].includes(u.role)),'Chọn người phụ trách đang hoạt động.');requireValue(/^\d{4}-\d{2}-\d{2}$/.test(t.due)&&!isNaN(Date.parse(t.due))&&new Date(t.due+'T00:00:00Z').toISOString().slice(0,10)===t.due,'Chọn hạn hoàn thành.');return {...t,title:t.title.trim(),description:(t.description||'').trim()}}
  function saveTask(uid,data){let result;tx(d=>{const who=actor(d,uid,['Lead','Designer']);writable(d,data.projectId);requireValue(who.role==='Lead'||data.assignee===uid,'Designer chỉ tạo công việc cho chính mình.');const clean=taskData(d,data);if(data.id){const t=d.tasks.find(t=>t.id===data.id&&t.projectId===data.projectId);requireValue(t,'Không tìm thấy công việc.');requireValue(t.status!=='cancelled','Công việc đã hủy, không thể chỉnh sửa.');requireValue(who.role==='Lead'||t.assignee===uid,'Designer chỉ sửa công việc được giao.');Object.assign(t,clean);result=t.id}else{result=id('CS');d.tasks.push({...clean,id:result,type:clean.type||'Công việc'})}log(d,'Đã lưu công việc: '+clean.title)});return result}
  function moveTask(uid,tid,status){tx(d=>{const who=actor(d,uid,['Lead','Designer']);const t=d.tasks.find(t=>t.id===tid);requireValue(t,'Không tìm thấy công việc.');requireValue(who.role==='Lead'||t.assignee===uid,'Chỉ đổi trạng thái công việc được giao.');writable(d,t.projectId);requireValue(t.status!=='cancelled','Công việc đã hủy, không thể chuyển trạng thái.');requireValue(statuses.includes(status),'Trạng thái không hợp lệ.');t.status=status;log(d,'Đã đổi trạng thái: '+t.title)})}
  function cancelTask(uid,tid,reason=''){tx(d=>{actor(d,uid,'Lead');const t=d.tasks.find(t=>t.id===tid);requireValue(t,'Không tìm thấy công việc.');writable(d,t.projectId);requireValue(!['done','cancelled'].includes(t.status),'Không thể hủy công việc đã hoàn thành hoặc đã hủy.');requireValue(typeof reason==='string'&&reason.trim().length>0,'Nhập lý do hủy công việc.');t.status='cancelled';t.cancelReason=reason.trim();log(d,'Đã hủy công việc: '+t.title)})}
  function brief(uid,bid,action,data){tx(d=>{actor(d,uid,'Lead');requireValue(['approve','return'].includes(action),'Thao tác xử lý brief không hợp lệ.');const b=d.briefs.find(b=>b.id===bid);requireValue(b,'Không tìm thấy brief.');writable(d,b.projectId);requireValue(b.status==='submitted','Brief này đã được xử lý.');if(action==='return'){requireValue(data.reason?.trim().length>=8,'Nêu lý do cần bổ sung, ít nhất 8 ký tự.');b.status='changes';b.reason=data.reason.trim()}else{const task=taskData(d,{...data,projectId:b.projectId,status:'todo'});b.status='approved';d.tasks.push({...task,id:id('CS'),briefId:bid,type:'Từ brief'})}log(d,(action==='return'?'Đã yêu cầu bổ sung brief: ':'Đã duyệt brief và tạo việc: ')+b.title)})}
  function pinCoordinate(value){
    const number=value===null||value===undefined||value===''?50:Number(value);
    return Math.max(2,Math.min(98,Number.isFinite(number)?number:50));
  }
  function note(uid,vid,data){tx(d=>{actor(d,uid,'Lead');const v=d.versions.find(v=>v.id===vid);requireValue(v,'Không tìm thấy phiên bản.');writable(d,v.projectId);requireValue(v.status==='Internal Review','Phiên bản không còn ở bước duyệt nội bộ.');requireValue(data.text?.trim().length>=3&&data.text.length<=600,'Ghi chú cần từ 3 đến 600 ký tự.');if(data.id){const n=d.notes.find(n=>n.id===data.id&&n.versionId===vid);requireValue(n,'Không tìm thấy ghi chú.');n.text=data.text.trim()}else d.notes.push({id:id('n'),versionId:vid,text:data.text.trim(),x:pinCoordinate(data.x),y:pinCoordinate(data.y),resolved:false});log(d,'Đã lưu ghi chú nội bộ.')})}
  function resolveNote(uid,nid){tx(d=>{actor(d,uid,'Lead');const n=d.notes.find(n=>n.id===nid);requireValue(n,'Không tìm thấy ghi chú.');const v=d.versions.find(v=>v.id===n.versionId);writable(d,v.projectId);requireValue(v.status==='Internal Review','Phiên bản đã chuyển bước.');n.resolved=!n.resolved})}
  function reviewChecks(uid,vid,brand,info){tx(d=>{actor(d,uid,'Lead');const v=d.versions.find(v=>v.id===vid);requireValue(v,'Không tìm thấy phiên bản.');writable(d,v.projectId);requireValue(v.status==='Internal Review','Phiên bản đã chuyển bước.');v.checkBrand=!!brand;v.checkInfo=!!info})}
  function review(uid,vid,action,reason=''){tx(d=>{actor(d,uid,'Lead');requireValue(['pass','rework'].includes(action),'Thao tác duyệt không hợp lệ.');const v=d.versions.find(v=>v.id===vid);requireValue(v,'Không tìm thấy phiên bản.');writable(d,v.projectId);requireValue(v.status==='Internal Review','Phiên bản đã được xử lý.');if(action==='pass'){requireValue(v.checkBrand&&v.checkInfo,'Hoàn thành checklist trước khi gửi.');requireValue(!d.notes.some(n=>n.versionId===vid&&!n.resolved),'Còn ghi chú nội bộ chưa xử lý.');v.status='Client Review';const project=d.projects.find(p=>p.id===v.projectId);if(project)project.status='In Review';for(const u of d.users.filter(u=>u.active&&u.role==='Client'))d.notifications.unshift({id:id('notif'),userId:u.id,projectId:v.projectId,type:'version',title:'Phiên bản chờ bạn duyệt',message:v.name,time:new Date().toISOString(),read:false,link:'html/sv1/client-review-versions.html?project='+encodeURIComponent(v.projectId)+'&version='+encodeURIComponent(v.id)})}else{requireValue(reason.trim().length>=8,'Nhập lý do yêu cầu sửa, ít nhất 8 ký tự.');v.status='Changes Requested'}v.history.push({action,reason,time:new Date().toISOString()});log(d,action==='pass'?'Đã chuyển phiên bản sang Client Review.':'Đã yêu cầu Designer sửa phiên bản.')})}
  function addComment(uid,pid,vid,text){tx(d=>{actor(d,uid,'Lead');writable(d,pid);requireValue(d.versions.some(v=>v.id===vid&&v.projectId===pid),'Phiên bản không hợp lệ.');requireValue(text.trim().length>=5&&text.length<=1000,'Phản hồi cần từ 5 đến 1.000 ký tự.');d.comments.push({id:id('C'),projectId:pid,versionId:vid,author:'Phản hồi nhập thủ công',text:text.trim()})})}
  function proposals(uid,pid,items){tx(d=>{actor(d,uid,'Lead');writable(d,pid);const pending=d.proposals.filter(p=>p.projectId===pid&&!p.taskId);requireValue(!pending.length,'Hãy xử lý hoặc bỏ các đề xuất cũ trước khi tạo lại.');for(const item of items){requireValue(!d.tasks.some(t=>t.projectId===pid&&t.sourceIds?.some(s=>item.sourceIds.includes(s))),'Phản hồi này đã có công việc. Bỏ chọn phản hồi đã xử lý trước khi tạo lại.');d.proposals.push({...item,id:id('ai'),projectId:pid,taskId:null})}log(d,'Đã tạo '+items.length+' gợi ý AI mô phỏng.')})}
  function saveProposal(uid,aid,data){tx(d=>{actor(d,uid,'Lead');const a=d.proposals.find(a=>a.id===aid);requireValue(a&&!a.taskId,'Đề xuất không còn chỉnh sửa được.');writable(d,a.projectId);const task=taskData(d,{...a,...data,status:'todo'});Object.assign(a,{title:task.title,description:task.description,assignee:task.assignee,priority:task.priority,due:task.due,ambiguous:false});log(d,'Đã chỉnh sửa đề xuất AI.')})}
  function removeProposal(uid,aid){tx(d=>{actor(d,uid,'Lead');const a=d.proposals.find(a=>a.id===aid);requireValue(a&&!a.taskId,'Không thể bỏ đề xuất đã tạo công việc.');writable(d,a.projectId);d.proposals=d.proposals.filter(a=>a.id!==aid)})}
  function discard(uid,pid){tx(d=>{actor(d,uid,'Lead');writable(d,pid);d.proposals=d.proposals.filter(a=>a.projectId!==pid||a.taskId)})}
  function convert(uid,pid,ids){tx(d=>{actor(d,uid,'Lead');writable(d,pid);requireValue(ids.length,'Chọn ít nhất một đề xuất.');for(const aid of [...new Set(ids)]){const a=d.proposals.find(a=>a.id===aid&&a.projectId===pid);requireValue(a&&!a.taskId,'Đề xuất đã được chuyển hoặc không tồn tại.');requireValue(!a.ambiguous,'Cần làm rõ phản hồi mơ hồ trước khi tạo việc.');const t=taskData(d,{...a,status:'todo'});const tid=id('CS');d.tasks.push({id:tid,projectId:pid,title:t.title,description:t.description,assignee:t.assignee,priority:t.priority,status:'todo',due:t.due,type:'Từ phản hồi',sourceIds:a.sourceIds,proposalId:aid});a.taskId=tid}log(d,'Đã chuyển '+ids.length+' đề xuất thành công việc.')})}
  function saveUser(uid,data){tx(d=>{actor(d,uid,'Admin');requireValue(data.name?.trim().length>=2&&data.name.length<=80,'Tên cần từ 2 đến 80 ký tự.');const email=data.email?.trim().toLowerCase();requireValue(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),'Email không hợp lệ.');requireValue(!d.users.some(u=>u.id!==data.id&&u.email.toLowerCase()===email),'Email này đã tồn tại.');requireValue(roles.includes(data.role),'Vai trò không hợp lệ.');if(data.id){const u=d.users.find(u=>u.id===data.id);requireValue(u,'Không tìm thấy người dùng.');requireValue(data.id!==uid||data.role===u.role,'Không thể tự đổi vai trò của phiên demo đang dùng.');if(u.role==='Admin'&&data.role!=='Admin')requireValue(d.users.some(x=>x.id!==u.id&&x.role==='Admin'&&x.active),'Cần giữ ít nhất một Admin hoạt động.');Object.assign(u,{name:data.name.trim(),email,role:data.role})}else d.users.push({id:id('u'),name:data.name.trim(),email,role:data.role,active:true});log(d,'Đã lưu người dùng: '+data.name.trim())})}
  function toggleUser(uid,id){tx(d=>{actor(d,uid,'Admin');const u=d.users.find(u=>u.id===id);requireValue(u,'Không tìm thấy người dùng.');requireValue(id!==uid,'Không thể tự khóa tài khoản đang dùng.');if(u.active&&u.role==='Admin')requireValue(d.users.some(x=>x.id!==id&&x.active&&x.role==='Admin'),'Cần giữ ít nhất một Admin hoạt động.');u.active=!u.active;log(d,(u.active?'Đã mở khóa: ':'Đã khóa: ')+u.name)})}
  function settings(uid,data){tx(d=>{actor(d,uid,'Admin');const n=Number(data.warningDays);requireValue(Number.isInteger(n)&&n>=0&&n<=30,'Ngưỡng cảnh báo phải từ 0 đến 30 ngày.');requireValue(data.versionPattern.length<=100&&['{project}','{asset}','{number}'].every(s=>data.versionPattern.includes(s)),'Mẫu cần đủ {project}, {asset} và {number}.');d.settings={warningDays:n,versionPattern:data.versionPattern.trim(),requireReview:!!data.requireReview};log(d,'Đã lưu quy tắc studio.')})}
  function tag(uid,name,action,newName){tx(d=>{actor(d,uid,'Admin');if(action==='delete'){requireValue(!d.projects.some(p=>p.tags.includes(name)),'Nhãn đang được dự án sử dụng.');d.tags=d.tags.filter(t=>t!==name)}else{const label=(newName||name).trim();requireValue(label.length>=2&&label.length<=30,'Nhãn cần từ 2 đến 30 ký tự.');requireValue(!d.tags.some(t=>t.toLowerCase()===label.toLowerCase()&&!(action==='edit'&&t===name)),'Nhãn đã tồn tại.');if(action==='edit'){requireValue(d.tags.includes(name),'Nhãn không tồn tại.');requireValue(!d.projects.some(p=>p.archived&&p.tags.includes(name)),'Nhãn thuộc dự án đã lưu trữ, không thể đổi.');d.tags=d.tags.map(t=>t===name?label:t);d.projects.forEach(p=>p.tags=p.tags.map(t=>t===name?label:t))}else d.tags.push(label)}log(d,'Đã cập nhật danh mục nhãn.')})}
  function archive(uid,pid){tx(d=>{actor(d,uid,'Admin');const p=writable(d,pid);requireValue(!d.tasks.some(t=>t.projectId===pid&&!['done','cancelled'].includes(t.status)),'Còn công việc chưa hoàn thành.');requireValue(!d.briefs.some(b=>b.projectId===pid&&b.status!=='approved'),'Còn brief chưa được duyệt.');requireValue(!d.versions.some(v=>v.projectId===pid&&!['Approved','Archived'].includes(v.status)),'Còn phiên bản chưa được khách hàng duyệt.');p.archived=true;log(d,'Đã lưu trữ dự án: '+p.name)})}
  function registerClient(data) {
    let uid;
    tx(d => {
      const name=(data.name||'').trim(),email=(data.email||'').trim().toLowerCase();
      requireValue(name.length>=2&&name.length<=80,'Họ tên cần từ 2 đến 80 ký tự.');
      requireValue(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),'Email không hợp lệ.');
      requireValue(!d.users.some(u=>u.email.toLowerCase()===email),'Email đã được sử dụng.');
      requireValue(typeof data.password==='string'&&data.password.length>=6&&data.password.length<=128,'Mật khẩu demo cần từ 6 đến 128 ký tự.');
      uid=id('u');d.users.push({id:uid,name,email,role:'Client',active:true,demoPassword:data.password,title:'Khách hàng',bio:''});
      log(d,'Đã tạo tài khoản khách hàng: '+name);
    });
    return uid;
  }
  function deleteTask(uid,tid){tx(d=>{actor(d,uid,'Lead');const t=d.tasks.find(t=>t.id===tid);requireValue(t,'Không tìm thấy công việc.');writable(d,t.projectId);requireValue(t.status==='cancelled','Chỉ xóa công việc đã hủy.');requireValue(!d.proposals.some(p=>p.taskId===tid||p.id===t.proposalId),'Công việc đang liên kết với đề xuất, không thể xóa.');d.tasks=d.tasks.filter(item=>item.id!==tid);log(d,'Đã xóa công việc đã hủy: '+t.title)})}
  function deleteUser(uid,userId){tx(d=>{actor(d,uid,'Admin');const u=d.users.find(u=>u.id===userId);requireValue(u,'Không tìm thấy người dùng.');requireValue(userId!==uid,'Không thể xóa tài khoản đang sử dụng.');if(u.active&&u.role==='Admin')requireValue(d.users.some(x=>x.id!==userId&&x.active&&x.role==='Admin'),'Cần giữ ít nhất một Admin hoạt động.');requireValue(!d.tasks.some(t=>t.assignee===userId),'Người dùng vẫn được giao công việc. Hãy phân công lại trước khi xóa.');requireValue(!d.versions.some(v=>v.author===userId||v.designerId===userId||v.userId===userId),'Người dùng có phiên bản thiết kế được lưu. Không thể xóa để giữ lịch sử.');requireValue(!d.comments.some(c=>c.authorId===userId||c.userId===userId),'Người dùng có phản hồi được lưu. Không thể xóa để giữ lịch sử.');requireValue(!d.briefs.some(b=>b.clientId===userId),'Người dùng còn brief đang lưu. Không thể xóa để giữ lịch sử.');requireValue(!d.projects.some(p=>p.clientId===userId||p.ownerId===userId),'Người dùng còn liên kết với dự án. Không thể xóa để giữ lịch sử.');d.users=d.users.filter(item=>item.id!==userId);log(d,'Đã xóa người dùng: '+u.name)})}
  function reset(){const next=CS_SEED();localStorage.setItem(KEY,JSON.stringify(next));db=next}
  // --- Version Methods (SV2) ---
  function computeVersionCode(d, projectId, assetType, versionNum) {
    const p = d.projects.find(p => p.id === projectId);
    const pattern = d.settings?.versionPattern || '{project}-{asset}-v{number}';
    return pattern
      .replace('{project}', p ? p.code : 'PRJ')
      .replace('{asset}', assetType || 'Design')
      .replace('{number}', versionNum || '1');
  }

  function saveVersion(uid, data) {
    let resultId;
    tx(d => {
      const user = actor(d, uid, ['Designer', 'Lead']);
      writable(d, data.projectId);
      requireValue(data.name?.trim().length >= 3, 'Tên phiên bản cần ít nhất 3 ký tự.');
      requireValue(data.changelog?.trim().length >= 5, 'Nhật ký thay đổi (Changelog) cần ít nhất 5 ký tự.');

      const assetType = (data.assetType || 'BaoBi').trim();
      const existingVersions = d.versions.filter(v => v.projectId === data.projectId && v.assetType === assetType);
      const nextNum = Math.max(0, ...existingVersions.map(v => Number(v.versionNum) || 0)) + 1;
      const code = computeVersionCode(d, data.projectId, assetType, nextNum);
      if (!data.id) requireValue(!d.versions.some(v => v.code === code), 'Mã phiên bản đã tồn tại.');

      if (data.id) {
        const v = d.versions.find(v => v.id === data.id && v.projectId === data.projectId);
        requireValue(v, 'Không tìm thấy phiên bản.');
        requireValue(user.role !== 'Designer' || v.author === uid, 'Chỉ được sửa phiên bản do chính mình tạo.');
        requireValue(['Draft', 'Changes Requested'].includes(v.status) || user.role === 'Lead', 'Chỉ có thể sửa bản nháp hoặc phiên bản cần sửa.');
        Object.assign(v, {
          name: data.name.trim(),
          changelog: data.changelog.trim(),
          checkFeedback: !!data.checkFeedback,
          checkSpec: !!data.checkSpec,
          checkExport: !!data.checkExport
        });
        resultId = v.id;
        log(d, `Đã cập nhật phiên bản: ${v.name}`);
      } else {
        resultId = id('v');
        const newVer = {
          id: resultId,
          projectId: data.projectId,
          name: data.name.trim(),
          code,
          assetType,
          versionNum: nextNum,
          status: 'Draft',
          author: uid,
          createdAt: new Date().toISOString(),
          changelog: data.changelog.trim(),
          image: data.image || 'assets/coffee.svg',
          checkFeedback: !!data.checkFeedback,
          checkSpec: !!data.checkSpec,
          checkExport: !!data.checkExport,
          history: [{ action: 'created', time: new Date().toISOString() }]
        };
        d.versions.push(newVer);
        log(d, `Designer ${user.name} đã tạo bản nháp phiên bản: ${newVer.code}`);
      }
    });
    return resultId;
  }

  function submitVersionForReview(uid, versionId) {
    tx(d => {
      const user = actor(d, uid, ['Designer', 'Lead']);
      const v = d.versions.find(v => v.id === versionId);
      requireValue(v, 'Không tìm thấy phiên bản.');
      requireValue(user.role !== 'Designer' || v.author === uid, 'Chỉ được thao tác phiên bản do chính mình tạo.');
      writable(d, v.projectId);
      requireValue(v.status === 'Draft' || v.status === 'Changes Requested', 'Phiên bản không ở trạng thái Draft hoặc Changes Requested.');

      if (d.settings?.requireReview) {
        requireValue(v.checkFeedback && v.checkSpec && v.checkExport, 'Vui lòng hoàn thành toàn bộ checklist nghiệm thu trước khi nộp duyệt nội bộ.');
      }

      v.status = 'Internal Review';
      v.checkBrand=false; v.checkInfo=false;
      const project=d.projects.find(p=>p.id===v.projectId); if(project)project.status='Active';
      v.history.push({ action: 'submitted_internal', time: new Date().toISOString(), by: uid });

      // Tạo thông báo cho Trưởng nhóm
      const leadUsers = d.users.filter(u => u.role === 'Lead' && u.active);
      for (const leadUser of leadUsers) {
        d.notifications.unshift({
          id: id('notif'),
          userId: leadUser.id,
          projectId: v.projectId,
          type: 'version',
          title: `Phiên bản mới chờ duyệt: ${v.name}`,
          message: `${user.name} đã hoàn tất và nộp ${v.code} để duyệt nội bộ.`,
          time: new Date().toISOString(),
          read: false,
          link: 'html/sv3/lead-internal-review.html'
        });
      }

      log(d, `${user.name} đã nộp phiên bản ${v.code} để duyệt nội bộ.`);
    });
  }

  function deleteVersion(uid, versionId) {
    tx(d => {
      const user = actor(d, uid, ['Designer', 'Lead']);
      const v = d.versions.find(v => v.id === versionId);
      requireValue(v, 'Không tìm thấy phiên bản.');
      requireValue(user.role !== 'Designer' || v.author === uid, 'Chỉ được thao tác phiên bản do chính mình tạo.');
      requireValue(v.status === 'Draft', 'Chỉ có thể xóa phiên bản nháp (Draft).');
      writable(d, v.projectId);
      d.versions = d.versions.filter(x => x.id !== versionId);
      log(d, `${user.name} đã xóa bản nháp phiên bản ${v.code}.`);
    });
  }

  function archiveVersion(uid, versionId) {
    tx(d => {
      const user = actor(d, uid, ['Designer', 'Lead', 'Admin']);
      const v = d.versions.find(v => v.id === versionId);
      requireValue(v, 'Không tìm thấy phiên bản.');
      requireValue(user.role !== 'Designer' || v.author === uid, 'Chỉ được thao tác phiên bản do chính mình tạo.');
      writable(d, v.projectId);
      v.status = 'Archived';
      v.history.push({ action: 'archived', time: new Date().toISOString() });
      log(d, `${user.name} đã chuyển phiên bản ${v.code} sang kho lưu trữ.`);
    });
  }

  // --- Moodboard Methods (SV2) ---
  function saveMoodboard(uid, data) {
    let mbId;
    tx(d => {
      const user = actor(d, uid, ['Designer', 'Lead']);
      writable(d, data.projectId);
      requireValue(data.title?.trim().length >= 3, 'Tiêu đề moodboard cần ít nhất 3 ký tự.');

      let mb = d.moodboards.find(m => m.projectId === data.projectId);
      if (!mb) {
        mbId = id('mb');
        mb = {
          id: mbId,
          projectId: data.projectId,
          title: data.title.trim(),
          status: data.status || 'Draft',
          updatedAt: new Date().toISOString(),
          description: (data.description || '').trim(),
          palette: data.palette || [],
          keywords: data.keywords || [],
          cards: data.cards || []
        };
        d.moodboards.push(mb);
      } else {
        mbId = mb.id;
        Object.assign(mb, {
          title: data.title.trim(),
          status: data.status || mb.status,
          updatedAt: new Date().toISOString(),
          description: data.description !== undefined ? data.description.trim() : mb.description,
          palette: data.palette || mb.palette,
          keywords: data.keywords || mb.keywords
        });
      }
      log(d, `${user.name} đã lưu bảng cảm hứng: ${mb.title}`);
    });
    return mbId;
  }

  function addMoodCard(uid, projectId, cardData) {
    tx(d => {
      actor(d, uid, ['Designer', 'Lead']);
      writable(d, projectId);
      requireValue(cardData.title?.trim().length >= 2, 'Tiêu đề thẻ cần ít nhất 2 ký tự.');
      const mb = d.moodboards.find(m => m.projectId === projectId);
      requireValue(mb, 'Không tìm thấy moodboard cho dự án này.');

      mb.cards = mb.cards || [];
      mb.cards.push({
        id: id('card'),
        title: cardData.title.trim(),
        category: cardData.category || 'Cảm hứng',
        image: cardData.image || 'assets/moodboard.svg',
        notes: (cardData.notes || '').trim()
      });
      mb.updatedAt = new Date().toISOString();
      log(d, `Đã thêm thẻ cảm hứng "${cardData.title}" vào moodboard.`);
    });
  }

  function removeMoodCard(uid, projectId, cardId) {
    tx(d => {
      actor(d, uid, ['Designer', 'Lead']);
      writable(d, projectId);
      const mb = d.moodboards.find(m => m.projectId === projectId);
      requireValue(mb, 'Không tìm thấy moodboard.');
      mb.cards = (mb.cards || []).filter(c => c.id !== cardId);
      mb.updatedAt = new Date().toISOString();
      log(d, `Đã xóa thẻ cảm hứng khỏi moodboard.`);
    });
  }

  function applyAIPalette(uid, projectId, { palette, keywords, reason }) {
    tx(d => {
      const user = actor(d, uid, ['Designer', 'Lead']);
      writable(d, projectId);
      let mb = d.moodboards.find(m => m.projectId === projectId);
      requireValue(mb, 'Không tìm thấy moodboard để áp dụng.');

      mb.palette = palette;
      mb.keywords = keywords;
      mb.status = 'Palette Ready';
      mb.updatedAt = new Date().toISOString();
      mb.lastAIReason = reason;

      log(d, `${user.name} đã áp dụng gợi ý từ AI-3 (Mood Keyword Assistant) vào moodboard.`);
    });
  }

  // --- Brief Template Methods (SV2 Admin) ---
  function saveBriefTemplate(uid, data) {
    let resultId;
    tx(d => {
      actor(d, uid, 'Admin');
      requireValue(data.name?.trim().length >= 3, 'Tên mẫu brief cần ít nhất 3 ký tự.');
      requireValue(data.category?.trim().length >= 2, 'Ngành hàng/Phân loại không được để trống.');
      requireValue(data.promptTemplate?.trim().length >= 10, 'Prompt cấu hình cho AI-1 cần ít nhất 10 ký tự.');
      requireValue(!data.status||['Active Template','Inactive','Custom'].includes(data.status),'Trạng thái mẫu brief không hợp lệ.');
      requireValue(data.name.trim().length<=120&&data.promptTemplate.trim().length<=10000,'Tên mẫu tối đa 120 ký tự, prompt tối đa 10.000 ký tự.');
      requireValue(data.promptTemplate.includes('{raw_input}'),'Prompt cần có biến {raw_input} để nhận mô tả khách hàng.');

      if (data.id) {
        const t = d.briefTemplates.find(t => t.id === data.id);
        requireValue(t, 'Không tìm thấy mẫu brief.');
        Object.assign(t, {
          name: data.name.trim(),
          category: data.category.trim(),
          status: data.status || t.status,
          description: (data.description || '').trim(),
          sections: Array.isArray(data.sections) ? data.sections : t.sections,
          promptTemplate: data.promptTemplate.trim()
        });
        resultId = t.id;
      } else {
        resultId = id('bt');
        d.briefTemplates.push({
          id: resultId,
          name: data.name.trim(),
          category: data.category.trim(),
          status: data.status || 'Active Template',
          description: (data.description || '').trim(),
          sections: Array.isArray(data.sections) ? data.sections : ['Mục tiêu', 'Khách hàng', 'Deliverables', 'Tone & Mood', 'Timeline'],
          promptTemplate: data.promptTemplate.trim()
        });
      }
      log(d, `Admin đã lưu mẫu brief: ${data.name.trim()}`);
    });
    return resultId;
  }

  function deleteBriefTemplate(uid,templateId){tx(d=>{actor(d,uid,'Admin');const template=d.briefTemplates.find(t=>t.id===templateId);requireValue(template,'Không tìm thấy mẫu brief.');requireValue(template.status==='Inactive','Chỉ xóa mẫu brief đã tạm ngừng.');requireValue(!d.briefs.some(b=>b.templateId===templateId||b.clientData?.templateId===templateId),'Mẫu đã được brief sử dụng; hãy giữ ở trạng thái tạm ngừng.');d.briefTemplates=d.briefTemplates.filter(t=>t.id!==templateId);log(d,'Đã xóa mẫu brief: '+template.name)})}

  function toggleBriefTemplate(uid, templateId) {
    tx(d => {
      actor(d, uid, 'Admin');
      const t = d.briefTemplates.find(t => t.id === templateId);
      requireValue(t, 'Không tìm thấy mẫu template.');
      t.status = t.status === 'Active Template' ? 'Inactive' : 'Active Template';
      log(d, `Admin đã đổi trạng thái mẫu brief "${t.name}" sang ${t.status}.`);
    });
  }

  // --- Profile & User Methods (SV2 Shared) ---
  function updateProfile(uid, data) {
    tx(d => {
      const u = actor(d, uid);
      requireValue(data.name?.trim().length >= 2, 'Họ và tên cần từ 2 ký tự trở lên.');

      const email = data.email?.trim().toLowerCase();
      requireValue(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), 'Email không đúng định dạng.');
      requireValue(!d.users.some(x => x.id !== uid && x.email.toLowerCase() === email), 'Email này đã được sử dụng.');

      if (data.newPassword) {
        requireValue(data.currentPassword === (u.demoPassword || 'demo123'), 'Mật khẩu demo hiện tại không đúng.');
        requireValue(data.newPassword.length >= 6, 'Mật khẩu mới cần từ 6 ký tự trở lên.');
        requireValue(data.newPassword === data.confirmPassword, 'Mật khẩu xác nhận không khớp.');
        u.demoPassword = data.newPassword;
      }

      if (data.avatarUrl !== undefined) {
        const url = data.avatarUrl.trim();
        requireValue(!url || /^https?:\/\//i.test(url), 'Avatar URL phải bắt đầu bằng http:// hoặc https://.');
        if (url) { try { new URL(url); } catch (e) { throw new Error('Avatar URL không hợp lệ.'); } }
        u.avatarUrl = url;
      }

      u.name = data.name.trim();
      u.email = email;
      if (data.title !== undefined) u.title = data.title.trim();
      if (data.bio !== undefined) u.bio = data.bio.trim();
      if (data.avatarText) u.avatarText = data.avatarText.trim();

      // Đồng bộ thông tin currentUser
      const safe = { app: 'creatorstudio', id: u.id, name: u.name, role: u.role };
      localStorage.setItem('currentUser', JSON.stringify(safe));

      log(d, `${u.name} đã cập nhật thông tin hồ sơ cá nhân.`);
    });
  }

  // --- Notification Methods (SV2 Shared) ---
  function markNotification(notifId, isRead) {
    tx(d => {
      const n = d.notifications.find(x => x.id === notifId);
      if (n) n.read = !!isRead;
    });
  }

  function markAllNotifications(uid) {
    tx(d => {
      d.notifications.forEach(n => {
        if (!uid || n.userId === uid) n.read = true;
      });
      log(d, `Đã đánh dấu tất cả thông báo là đã đọc.`);
    });
  }

  function deleteNotification(notifId) {
    tx(d => {
      d.notifications = d.notifications.filter(x => x.id !== notifId);
    });
  }

  function clearAllNotifications(uid) {
    tx(d => {
      if (uid) {
        d.notifications = d.notifications.filter(x => x.userId !== uid);
      } else {
        d.notifications = [];
      }
      log(d, `Đã xóa danh sách thông báo.`);
    });
  }


  return {computeVersionCode,saveVersion,submitVersionForReview,deleteVersion,archiveVersion,saveMoodboard,addMoodCard,removeMoodCard,applyAIPalette,saveBriefTemplate,toggleBriefTemplate,deleteBriefTemplate,updateProfile,markNotification,markAllNotifications,deleteNotification,clearAllNotifications,registerClient,transaction:tx,KEY,load,get,id,saveTask,moveTask,cancelTask,deleteTask,brief,note,resolveNote,reviewChecks,review,addComment,proposals,saveProposal,removeProposal,discard,convert,saveUser,toggleUser,deleteUser,settings,tag,archive,reset};
})();
