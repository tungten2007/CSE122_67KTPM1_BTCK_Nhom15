/* Logic riêng của designer-dashboard.html. Các phụ thuộc dùng chung được nạp trước trong HTML. */
document.addEventListener('DOMContentLoaded', () => {
  let currentFilter = 'all';
  let currentPriorityFilter = 'all';
  let searchQuery = '';
  let currentStateMode = 'normal'; // normal, loading, empty, urgent

  App.init('dashboard', renderDashboard);

  function renderDashboard() {
    const { $, $$, esc, icon, data, user, project, banner, date, priority } = App;
    const main = $('#main');

    // Lấy danh sách nhiệm vụ của dự án hoặc của user
    let myTasks = data.tasks.filter(t => t.projectId === project.id && t.assignee === user.id);
    const isUrgent = t => t.status !== 'done' && (t.urgent || t.priority === 'high' || (t.due && new Date(t.due + 'T23:59:59') <= new Date(Date.now() + (data.settings.warningDays || 0) * 86400000)));
    const focusTask = myTasks.find(isUrgent);

    // Tính toán KPI
    const totalPending = myTasks.filter(t => t.status === 'todo' || t.status === 'doing').length;
    const totalUrgent = myTasks.filter(isUrgent).length;
    const activeProjectsCount = data.projects.filter(p => !p.archived && data.tasks.some(t => t.projectId === p.id && t.assignee === user.id)).length;
    const inReviewVersionsCount = data.versions.filter(v => v.projectId === project.id && (v.status === 'Internal Review' || v.status === 'Client Review')).length;

    // Xử lý chế độ trạng thái (State Simulation: Normal, Loading, Empty, Urgent)
    let displayTasks = [...myTasks];
    if (currentStateMode === 'empty') {
      displayTasks = [];
    } else if (currentStateMode === 'urgent') {
      displayTasks = displayTasks.filter(isUrgent);
    }

    // Lọc theo tìm kiếm và tab
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      displayTasks = displayTasks.filter(t => t.title.toLowerCase().includes(q) || (t.description && t.description.toLowerCase().includes(q)));
    }

    if (currentFilter !== 'all') {
      displayTasks = displayTasks.filter(t => t.status === currentFilter);
    }

    if (currentPriorityFilter !== 'all') {
      displayTasks = displayTasks.filter(t => t.priority === currentPriorityFilter);
    }

    let tasksHtml = '';
    if (currentStateMode === 'loading') {
      tasksHtml = `
        <div class="skeleton skeleton-box"></div>
        <div class="skeleton skeleton-box"></div>
        <div class="skeleton skeleton-box"></div>
      `;
    } else if (displayTasks.length === 0) {
      tasksHtml = App.empty('Không có nhiệm vụ nào', 'Không tìm thấy công việc nào phù hợp với bộ lọc hiện tại.');
    } else {
      tasksHtml = `
        <div class="task-list">
          ${displayTasks.map(t => {
            const isUrgent = t.urgent || t.priority === 'high';
            const isDone = t.status === 'done';
            return `
              <div class="task-item ${isUrgent && !isDone ? 'urgent' : ''}">
                <input type="checkbox" class="task-item-check" data-id="${t.id}" ${isDone ? 'checked' : ''} title="Đánh dấu hoàn thành">
                <div class="task-item-main">
                  <div class="task-item-title">
                    <span class="${isDone ? 'task-title-done' : ''}">${esc(t.title)}</span>
                    ${priority(t.priority)}
                    <span class="badge gray">${esc(t.type || 'Thiết kế')}</span>
                    ${isUrgent && !isDone ? '<span class="badge high">Gấp</span>' : ''}
                  </div>
                  ${t.description ? `<p class="task-item-desc">${esc(t.description)}</p>` : ''}
                </div>
                <div class="task-item-meta">
                  <span class="due-badge ${isUrgent && !isDone ? 'urgent' : ''}">
                    ${icon('clock')} ${date(t.due)}
                  </span>
                  <select class="task-status-select" data-id="${t.id}" aria-label="Đổi trạng thái">
                    <option value="todo" ${t.status === 'todo' ? 'selected' : ''}>Cần làm</option>
                    <option value="doing" ${t.status === 'doing' ? 'selected' : ''}>Đang làm</option>
                    <option value="review" ${t.status === 'review' ? 'selected' : ''}>Chờ duyệt</option>
                    <option value="done" ${t.status === 'done' ? 'selected' : ''}>Hoàn thành</option>
                  </select>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    main.innerHTML = `
      ${banner()}

      ${App.header(
        'KHÔNG GIAN NHÀ THIẾT KẾ',
        'Bảng điều khiển & Ưu tiên công việc',
        'Quản lý tiến độ dự án, hạn chót nhiệm vụ và nhận đề xuất thông minh từ AI.',
        `
          <a href="designer-moodboard.html" class="button soft">${icon('spark')} Mở Moodboard</a>
          <a href="designer-version-management.html" class="button primary">${icon('plus')} Quản lý phiên bản</a>
        `
      )}

      <!-- Thanh điều khiển mô phỏng trạng thái (Phù hợp CRUD R: Normal, Loading, Empty, Urgent) -->
      <div class="state-controls">
        <strong>Trạng thái hiển thị (Mục 8):</strong>
        <button class="state-btn ${currentStateMode === 'normal' ? 'active' : ''}" data-mode="normal">Bình thường (Normal)</button>
        <button class="state-btn ${currentStateMode === 'loading' ? 'active' : ''}" data-mode="loading">Đang tải (Loading)</button>
        <button class="state-btn ${currentStateMode === 'empty' ? 'active' : ''}" data-mode="empty">Rỗng (Empty)</button>
        <button class="state-btn ${currentStateMode === 'urgent' ? 'active' : ''}" data-mode="urgent">Cảnh báo gấp (Urgent)</button>
      </div>

      <!-- Lưới thống kê KPI -->
      <section class="kpi-grid">
        <div class="kpi-card">
          <div class="kpi-info">
            <strong>${totalPending}</strong>
            <p>Nhiệm vụ cần xử lý</p>
          </div>
          <div class="kpi-icon purple">${icon('grid')}</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-info">
            <strong>${totalUrgent}</strong>
            <p>Cảnh báo gấp / Cận hạn</p>
          </div>
          <div class="kpi-icon red">${icon('alert')}</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-info">
            <strong>${inReviewVersionsCount}</strong>
            <p>Phiên bản đang duyệt</p>
          </div>
          <div class="kpi-icon amber">${icon('clock')}</div>
        </div>

        <div class="kpi-card">
          <div class="kpi-info">
            <strong>${activeProjectsCount}</strong>
            <p>Dự án đang tham gia</p>
          </div>
          <div class="kpi-icon green">${icon('check')}</div>
        </div>
      </section>

      <!-- Banner Cảnh báo gấp (Urgent Notice) -->
      ${totalUrgent > 0 ? `
        <div class="urgent-banner">
          <div class="urgent-banner-content">
            <div class="urgent-banner-icon">${icon('alert')}</div>
            <div>
              <h3>Có ${totalUrgent} nhiệm vụ cần ưu tiên giải quyết hôm nay!</h3>
              <p>Hạn chót phiên bản mới cho dự án ${esc(project.name)} đang đến gần. Vui lòng kiểm tra và cập nhật tiến độ.</p>
            </div>
          </div>
          <a href="#task-queue" class="button small danger">Xem chi tiết việc gấp</a>
        </div>
      ` : ''}

      <!-- AI Priority & Focus Recommendation (Tham chiếu AI-3) -->
      <section class="ai-insight-panel">
        <div class="ai-insight-header">
          ${icon('spark')}
          <span>Ưu tiên theo hạn chót · Tham chiếu Moodboard AI-3</span>
        </div>
        <div class="ai-insight-body">
          ${focusTask ? `Ưu tiên <strong>${esc(focusTask.id)} ${esc(focusTask.title)}</strong>, hạn ${date(focusTask.due)}.` : 'Bạn không có nhiệm vụ gấp trong dự án đang chọn.'}
          Xem định hướng phong cách tại <a href="designer-moodboard.html">Moodboard AI-3</a>. Gợi ý ưu tiên được tính từ dữ liệu nhiệm vụ.
        </div>
      </section>

      <!-- Danh sách nhiệm vụ cần làm -->
      <section class="panel" id="task-queue">
        <div class="panel-title">
          <div>
            <h2>Hàng đợi công việc (Task Queue)</h2>
            <p>Danh sách các đầu việc thiết kế theo dự án ${esc(project.name)}</p>
          </div>
          <button class="button small primary" id="add-task-btn">${icon('plus')} Thêm nhiệm vụ</button>
        </div>

        <!-- Toolbar lọc và tìm kiếm -->
        <div class="toolbar">
          <div class="search-box">
            ${icon('search')}
            <input type="search" id="task-search" placeholder="Tìm theo tên hoặc mô tả công việc..." value="${esc(searchQuery)}">
          </div>

          <select id="status-filter">
            <option value="all" ${currentFilter === 'all' ? 'selected' : ''}>Tất cả trạng thái</option>
            <option value="todo" ${currentFilter === 'todo' ? 'selected' : ''}>Cần làm (To Do)</option>
            <option value="doing" ${currentFilter === 'doing' ? 'selected' : ''}>Đang làm (Doing)</option>
            <option value="review" ${currentFilter === 'review' ? 'selected' : ''}>Chờ duyệt (Review)</option>
            <option value="done" ${currentFilter === 'done' ? 'selected' : ''}>Hoàn thành (Done)</option>
          </select>

          <select id="priority-filter">
            <option value="all" ${currentPriorityFilter === 'all' ? 'selected' : ''}>Tất cả mức ưu tiên</option>
            <option value="high" ${currentPriorityFilter === 'high' ? 'selected' : ''}>Ưu tiên cao</option>
            <option value="medium" ${currentPriorityFilter === 'medium' ? 'selected' : ''}>Ưu tiên vừa</option>
            <option value="low" ${currentPriorityFilter === 'low' ? 'selected' : ''}>Ưu tiên thấp</option>
          </select>

          <span class="toolbar-count">Hiển thị <strong>${displayTasks.length}</strong> nhiệm vụ</span>
        </div>

        <!-- Danh sách công việc hoặc trạng thái -->
        ${tasksHtml}
      </section>
    `;

    // Gắn sự kiện chuyển đổi State Mode
    $$('.state-btn').forEach(btn => {
      btn.onclick = () => {
        currentStateMode = btn.dataset.mode;
        renderDashboard();
      };
    });

    // Gắn sự kiện tìm kiếm & lọc
    const searchInput = $('#task-search');
    if (searchInput) {
      searchInput.oninput = e => {
        searchQuery = e.target.value;
        renderDashboard();
      };
    }

    const statusSelect = $('#status-filter');
    if (statusSelect) {
      statusSelect.onchange = e => {
        currentFilter = e.target.value;
        renderDashboard();
      };
    }

    const prioritySelect = $('#priority-filter');
    if (prioritySelect) {
      prioritySelect.onchange = e => {
        currentPriorityFilter = e.target.value;
        renderDashboard();
      };
    }

    // Gắn sự kiện thay đổi trạng thái task
    $$('.task-status-select').forEach(sel => {
      sel.onchange = e => {
        const tid = e.target.dataset.id;
        App.action(() => {
          Store.moveTask(user.id, tid, e.target.value);
        }, 'Đã cập nhật trạng thái nhiệm vụ.');
      };
    });

    // Checkbox hoàn thành nhanh
    $$('.task-item-check').forEach(chk => {
      chk.onchange = e => {
        const tid = e.target.dataset.id;
        const nextStatus = e.target.checked ? 'done' : 'doing';
        App.action(() => {
          Store.moveTask(user.id, tid, nextStatus);
        }, e.target.checked ? 'Đã hoàn thành nhiệm vụ!' : 'Đã mở lại nhiệm vụ.');
      };
    });

    // Thêm nhiệm vụ mới modal
    const addTaskBtn = $('#add-task-btn');
    if (addTaskBtn) {
      addTaskBtn.onclick = () => {
        App.modal(
          'Thêm nhiệm vụ thiết kế mới',
          `
            ${App.field('Tên nhiệm vụ *', 'title', '', 'text', 'required minlength="3" placeholder="Ví dụ: Hoàn thiện nhãn phụ hộp quà"')}
            ${App.textField('Mô tả công việc', 'description', '', 'placeholder="Mô tả các yêu cầu hoặc ghi chú..."')}
            <div class="form-grid">
              ${App.select('Mức ưu tiên *', 'priority', [['high', 'Cao'], ['medium', 'Vừa'], ['low', 'Thấp']], 'high')}
              ${App.field('Hạn hoàn thành *', 'due', new Date(Date.now() + 86400000 * 2).toISOString().slice(0, 10), 'date', 'required')}
            </div>
            ${App.select('Người phụ trách', 'assignee', data.users.filter(u => u.active && ['Designer', 'Lead'].includes(u.role)).map(u => [u.id, u.name]), user.id)}
          `,
          formData => {
            Store.saveTask(user.id, {
              ...formData,
              projectId: project.id,
              status: 'todo',
              type: 'Thiết kế'
            });
          },
          'Tạo nhiệm vụ'
        );
      };
    }
  }
});
