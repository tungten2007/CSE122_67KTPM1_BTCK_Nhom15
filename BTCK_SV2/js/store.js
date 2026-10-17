/* Store: Quản lý dữ liệu tập trung, kiểm tra nghiệp vụ và lưu LocalStorage */
window.Store = (() => {
  const PRIMARY_KEY = 'creatorstudio.v1';
  const FALLBACK_KEY = 'creatorstudio.sv3.v1';
  let db;

  const clone = x => JSON.parse(JSON.stringify(x));
  const requireValue = (test, message) => { if (!test) throw new Error(message); };
  const roles = ['Client', 'Designer', 'Lead', 'Admin'];
  const taskStatuses = ['todo', 'doing', 'review', 'done'];

  function id(prefix) {
    return prefix + '-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7);
  }

  function load() {
    let raw = localStorage.getItem(PRIMARY_KEY);
    if (!raw) {
      raw = localStorage.getItem(FALLBACK_KEY);
    }

    if (raw) {
      try {
        db = JSON.parse(raw);
        // Bảo đảm các mảng và entity cần thiết tồn tại
        const seed = CS_SEED();
        const requiredArrays = ['users', 'projects', 'tasks', 'briefs', 'versions', 'notes', 'comments', 'moodboards', 'briefTemplates', 'notifications', 'activity', 'tags'];
        requiredArrays.forEach(k => {
          if (!Array.isArray(db[k])) db[k] = seed[k] || [];
        });
        if (!db.settings) db.settings = seed.settings;
      } catch (e) {
        db = CS_SEED();
      }
    } else {
      db = CS_SEED();
    }

    localStorage.setItem(PRIMARY_KEY, JSON.stringify(db));
    localStorage.setItem(FALLBACK_KEY, JSON.stringify(db));
    return clone(db);
  }

  const get = () => clone(db || load());

  function tx(fn) {
    if (!db) load();
    const next = clone(db);
    fn(next);
    try {
      localStorage.setItem(PRIMARY_KEY, JSON.stringify(next));
      localStorage.setItem(FALLBACK_KEY, JSON.stringify(next));
    } catch (e) {
      throw new Error('Không thể lưu dữ liệu vào LocalStorage. Bộ nhớ có thể đã đầy hoặc bị chặn.');
    }
    db = next;
    return get();
  }

  function log(d, text) {
    d.activity = d.activity || [];
    d.activity.unshift({ id: id('a'), text, time: new Date().toISOString() });
    d.activity = d.activity.slice(0, 80);
  }

  function actor(d, uid, allowedRoles) {
    const u = d.users.find(u => u.id === uid);
    requireValue(u && u.active, 'Tài khoản không tồn tại hoặc đã bị khóa.');
    if (allowedRoles) {
      const allowed = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
      requireValue(allowed.includes(u.role), `Bạn không có quyền thực hiện thao tác này (${u.role}).`);
    }
    return u;
  }

  function writable(d, pid) {
    const p = d.projects.find(p => p.id === pid);
    requireValue(p, 'Không tìm thấy dự án.');
    requireValue(!p.archived, 'Dự án đã lưu trữ, chỉ được xem.');
    return p;
  }

  // --- Task Methods ---
  function taskData(d, t) {
    requireValue(t.title?.trim().length >= 3 && t.title.trim().length <= 120, 'Tên công việc cần từ 3 đến 120 ký tự.');
    requireValue(taskStatuses.includes(t.status), 'Trạng thái không hợp lệ.');
    requireValue(['high', 'medium', 'low'].includes(t.priority), 'Mức ưu tiên không hợp lệ.');
    requireValue(d.users.some(u => u.id === t.assignee && u.active), 'Chọn người phụ trách hợp lệ.');
    return { ...t, title: t.title.trim(), description: (t.description || '').trim() };
  }

  function saveTask(uid, data) {
    let resultId;
    tx(d => {
      actor(d, uid, ['Lead', 'Designer']);
      writable(d, data.projectId);
      const clean = taskData(d, data);
      if (data.id) {
        const t = d.tasks.find(t => t.id === data.id && t.projectId === data.projectId);
        requireValue(t, 'Không tìm thấy công việc.');
        Object.assign(t, clean);
        resultId = t.id;
      } else {
        resultId = id('CS');
        d.tasks.push({ ...clean, id: resultId, type: clean.type || 'Thiết kế' });
      }
      log(d, `Đã cập nhật công việc: ${clean.title}`);
    });
    return resultId;
  }

  function moveTask(uid, tid, status) {
    tx(d => {
      actor(d, uid, ['Lead', 'Designer']);
      const t = d.tasks.find(t => t.id === tid);
      requireValue(t, 'Không tìm thấy công việc.');
      writable(d, t.projectId);
      requireValue(taskStatuses.includes(status), 'Trạng thái không hợp lệ.');
      t.status = status;
      log(d, `Đã đổi trạng thái công việc ${t.title} sang ${status}.`);
    });
  }

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
      writable(d, v.projectId);
      requireValue(v.status === 'Draft' || v.status === 'Changes Requested', 'Phiên bản không ở trạng thái Draft hoặc Changes Requested.');

      if (d.settings?.requireReview) {
        requireValue(v.checkFeedback && v.checkSpec && v.checkExport, 'Vui lòng hoàn thành toàn bộ checklist nghiệm thu trước khi nộp duyệt nội bộ.');
      }

      v.status = 'Internal Review';
      v.history.push({ action: 'submitted_internal', time: new Date().toISOString(), by: uid });
      
      // Tạo thông báo cho Trưởng nhóm
      const leadUser = d.users.find(u => u.role === 'Lead' && u.active);
      if (leadUser) {
        d.notifications.unshift({
          id: id('notif'),
          userId: leadUser.id,
          projectId: v.projectId,
          type: 'version',
          title: `Phiên bản mới chờ duyệt: ${v.name}`,
          message: `${user.name} đã hoàn tất và nộp ${v.code} để duyệt nội bộ.`,
          time: new Date().toISOString(),
          read: false,
          link: 'lead-internal-review.html'
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

  // --- SV3 Compatible Support Methods ---
  function saveUser(uid, data) {
    tx(d => {
      actor(d, uid, 'Admin');
      requireValue(data.name?.trim().length >= 2, 'Tên cần từ 2 ký tự.');
      const email = data.email?.trim().toLowerCase();
      requireValue(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), 'Email không hợp lệ.');
      requireValue(!d.users.some(u => u.id !== data.id && u.email.toLowerCase() === email), 'Email đã tồn tại.');
      if (data.id) {
        const u = d.users.find(u => u.id === data.id);
        requireValue(u, 'Không tìm thấy người dùng.');
        Object.assign(u, { name: data.name.trim(), email, role: data.role });
      } else {
        d.users.push({ id: id('u'), name: data.name.trim(), email, role: data.role, active: true });
      }
      log(d, `Đã lưu người dùng: ${data.name}`);
    });
  }

  function toggleUser(uid, targetId) {
    tx(d => {
      actor(d, uid, 'Admin');
      const u = d.users.find(u => u.id === targetId);
      requireValue(u, 'Không tìm thấy user.');
      requireValue(targetId !== uid, 'Không thể tự khóa tài khoản đang đăng nhập.');
      u.active = !u.active;
      log(d, `${u.active ? 'Mở khóa' : 'Khóa'} tài khoản: ${u.name}`);
    });
  }

  function settings(uid, data) {
    tx(d => {
      actor(d, uid, 'Admin');
      const n = Number(data.warningDays);
      requireValue(Number.isInteger(n) && n >= 0 && n <= 30, 'Ngưỡng cảnh báo từ 0 đến 30 ngày.');
      requireValue(data.versionPattern && ['{project}', '{asset}', '{number}'].every(s => data.versionPattern.includes(s)), 'Mẫu phiên bản cần có {project}, {asset}, {number}.');
      d.settings = { warningDays: n, versionPattern: data.versionPattern.trim(), requireReview: !!data.requireReview };
      log(d, 'Đã lưu cấu hình studio.');
    });
  }

  function tag(uid, name, action, newName) {
    tx(d => {
      actor(d, uid, 'Admin');
      if (action === 'delete') {
        d.tags = d.tags.filter(t => t !== name);
      } else if (action === 'edit') {
        d.tags = d.tags.map(t => t === name ? newName.trim() : t);
      } else {
        d.tags.push(name.trim());
      }
      log(d, 'Đã cập nhật nhãn.');
    });
  }

  function archive(uid, pid) {
    tx(d => {
      actor(d, uid, 'Admin');
      const p = writable(d, pid);
      p.archived = true;
      log(d, `Đã lưu trữ dự án: ${p.name}`);
    });
  }

  function reset() {
    const next = CS_SEED();
    localStorage.setItem(PRIMARY_KEY, JSON.stringify(next));
    localStorage.setItem(FALLBACK_KEY, JSON.stringify(next));
    db = next;
  }

  return {
    KEY: PRIMARY_KEY,
    load,
    get,
    id,
    reset,
    // Task
    saveTask,
    moveTask,
    // Version (SV2)
    computeVersionCode,
    saveVersion,
    submitVersionForReview,
    deleteVersion,
    archiveVersion,
    // Moodboard (SV2)
    saveMoodboard,
    addMoodCard,
    removeMoodCard,
    applyAIPalette,
    // Brief Template (SV2 Admin)
    saveBriefTemplate,
    toggleBriefTemplate,
    // Profile & User (SV2 Shared)
    updateProfile,
    saveUser,
    toggleUser,
    // Notifications (SV2 Shared)
    markNotification,
    markAllNotifications,
    deleteNotification,
    clearAllNotifications,
    // Settings & Tags
    settings,
    tag,
    archive
  };
})();
