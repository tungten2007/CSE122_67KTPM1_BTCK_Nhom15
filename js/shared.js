"use strict";
window.CS = (() => {
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [
    ...scope.querySelectorAll(selector),
  ];
  const escape = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const key = "creatorstudio.sv1.v1";
  const roles = ["Client", "Designer", "Creative Lead", "Admin"];
  const roleLabels = {
    Client: "Khách hàng",
    Designer: "Nhà thiết kế",
    "Creative Lead": "Creative Lead",
    Admin: "Quản trị viên",
  };
  let initialData = { projects: [], notifications: [] };
  const validData = (value) =>
    value &&
    Array.isArray(value.projects) &&
    value.projects.every(
      (p) =>
        typeof p.id === "string" &&
        typeof p.name === "string" &&
        Array.isArray(p.comments),
    );
  function read() {
    try {
      const value = JSON.parse(localStorage.getItem(key));
      if (validData(value))
        return { ...value, notifications: value.notifications || [] };
    } catch {
      /* The loader reports invalid data; storage failure is reported on save. */
    }
    return structuredClone(initialData);
  }
  async function init() {
    if (!session()) {
      location.replace("login.html");
      return false;
    }
    const main = $("main");
    main.hidden = true;
    const loading = document.createElement("div");
    loading.className = "data-loading";
    loading.setAttribute("role", "status");
    loading.innerHTML =
      '<span class="brand-mark">✳</span><h2>Đang mở không gian sáng tạo…</h2><p>Chuẩn bị dự án và những ý tưởng của bạn.</p><div class="skeleton-row"><i></i><i></i><i></i></div>';
    document.body.append(loading);
    try {
      let cached = null;
      try {
        const raw = localStorage.getItem(key);
        if (raw !== null) {
          cached = JSON.parse(raw);
          if (!validData(cached)) throw new Error("invalid-cache");
        }
      } catch (error) {
        if (error.name !== "SecurityError") throw error;
      }
      if (cached)
        initialData = { ...cached, notifications: cached.notifications || [] };
      else {
        const response = await fetch("assets/data/projects.json");
        if (!response.ok) throw new Error("data-request");
        const data = await response.json();
        if (!validData(data)) throw new Error("data-format");
        initialData = data;
      }
      return true;
    } catch {
      main.innerHTML =
        '<section class="panel security-notice"><span class="eyebrow">Dữ liệu chưa sẵn sàng</span><h1>Không thể mở danh sách dự án.</h1><p>Hãy chạy website bằng Live Server hoặc máy chủ HTTP và kiểm tra file assets/data/projects.json. Nếu dữ liệu trình duyệt đã hỏng, hãy sao lưu trước khi xóa khóa creatorstudio.sv1.v1.</p><div class="actions dialog-actions"><button class="btn primary" id="retry-data">Thử lại</button><a class="btn" href="index.html">Về trang chủ</a></div></section>';
      $("#retry-data").onclick = () => location.reload();
      return false;
    } finally {
      loading.remove();
      main.hidden = false;
    }
  }
  function write(value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      renderNotifications();
      return true;
    } catch {
      toast(
        "Không thể lưu dữ liệu. Hãy kiểm tra quyền lưu trữ hoặc dung lượng trình duyệt.",
      );
      return false;
    }
  }
  function session() {
    try {
      const value = JSON.parse(sessionStorage.getItem("cs.session"));
      return value && roles.includes(value.role) ? value : null;
    } catch {
      return null;
    }
  }
  function preferredRole() {
    try {
      const role = localStorage.getItem("cs.preferredRole");
      return roles.includes(role) ? role : "Client";
    } catch {
      return "Client";
    }
  }
  function login(role, email = "khachhang@demo.vn") {
    if (!roles.includes(role)) return false;
    try {
      sessionStorage.setItem(
        "cs.session",
        JSON.stringify({ role, email, name: "Minh Anh" }),
      );
      try {
        localStorage.setItem("cs.preferredRole", role);
      } catch {
        /* Session still works if preference storage is blocked. */
      }
      return true;
    } catch {
      toast("Trình duyệt không cho phép lưu phiên demo.");
      return false;
    }
  }
  function toast(message) {
    let el = $("#toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.append(el);
    }
    el.textContent = message;
    el.hidden = false;
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => (el.hidden = true), 4200);
  }
  const labels = {
    Active: "Đang thực hiện",
    "In Review": "Chờ phản hồi",
    Completed: "Hoàn thành",
    Archived: "Đã lưu trữ",
    "Client Review": "Chờ duyệt",
    Approved: "Đã phê duyệt",
    "Changes Requested": "Yêu cầu chỉnh sửa",
    Rejected: "Đã từ chối",
  };
  const pill = (status) =>
    `<span class="pill ${escape(status.replaceAll(" ", ""))}"><span class="badge-dot"></span>${escape(labels[status] || status)}</span>`;
  const url = (page, id) =>
    `${page}.html${id ? "?project=" + encodeURIComponent(id) : ""}`;
  function project() {
    return read().projects.find(
      (p) => p.id === new URLSearchParams(location.search).get("project"),
    );
  }
  function update(id, fn) {
    const data = read(),
      p = data.projects.find((p) => p.id === id);
    if (!p) {
      toast("Dự án không còn tồn tại.");
      return false;
    }
    fn(p);
    return write(data);
  }
  function notify(message, projectId, type = "activity") {
    const data = read();
    data.notifications.unshift({
      id: crypto.randomUUID(),
      message,
      projectId,
      type,
      read: false,
      createdAt: new Date().toISOString(),
    });
    data.notifications = data.notifications.slice(0, 30);
    return write(data);
  }
  function renderNotifications() {
    const list = $("#activity-list");
    if (!list) return;
    const data = read(),
      items = data.notifications || [],
      unread = items.filter((n) => !n.read).length;
    $("#notification-count").textContent = unread;
    $("#notification-count").hidden = !unread;
    $("#activity-button").setAttribute(
      "aria-label",
      `Hoạt động dự án, ${unread} thông báo chưa đọc`,
    );
    list.innerHTML = items.length
      ? items
          .map(
            (n) =>
              `<li class="${n.read ? "" : "unread"}"><a href="${url(n.type === "brief" ? "client-creative-brief" : "client-review-versions", n.projectId)}">${escape(n.message)}<small>${escape(new Date(n.createdAt).toLocaleString("vi-VN"))}</small></a></li>`,
          )
          .join("")
      : '<li class="activity-empty">Chưa có hoạt động mới.</li>';
    $("#mark-notifications").disabled = !unread;
  }
  function shell(active, title) {
    const user = session();
    if (!user) {
      location.replace("login.html");
      return false;
    }
    const main = $("main"),
      content = main.outerHTML;
    document.body.classList.add("app");
    document.body.innerHTML = `<a class="skip-link" href="#main">Đến nội dung chính</a><div class="app-shell"><button class="menu-backdrop" id="menu-backdrop" aria-label="Đóng menu" hidden></button><aside class="sidebar" id="sidebar"><button class="text-button mobile-close" id="close-menu" aria-label="Đóng menu">✕</button><a class="brand" href="index.html"><span class="brand-mark">✳</span>CreatorStudio<span class="brand-dot">.</span></a><p class="nav-label">KHÔNG GIAN KHÁCH HÀNG</p><nav aria-label="Điều hướng chính">${[
      ["projects", "▦", "Dự án của tôi", "client-project-overview"],
      ["brief", "▤", "Creative Brief", "client-creative-brief"],
      ["review", "◫", "Duyệt phiên bản", "client-review-versions"],
    ]
      .map(
        ([id, icon, label, page]) =>
          `<a class="nav-link ${active === id ? "active" : ""}" ${active === id ? 'aria-current="page"' : ""} href="${url(page, project()?.id)}"><span aria-hidden="true">${icon}</span>${label}</a>`,
      )
      .join(
        "",
      )}</nav><div class="sidebar-note"><span class="eyebrow">Cùng nhau sáng tạo</span><h3>Ý tưởng hay bắt đầu<br>từ một brief tốt.</h3><p>Chia sẻ điều bạn mong muốn.<br>Chúng tôi giúp bạn kết nối.</p><a class="btn small" href="client-creative-brief.html">Viết brief mới →</a></div></aside><div class="workspace"><header class="topbar"><button class="btn mobile-menu" aria-controls="sidebar" aria-expanded="false" aria-label="Mở menu">☰</button><span class="breadcrumb">Không gian làm việc <span class="breadcrumb-separator">/</span>${escape(title)}</span><div class="topbar-right"><label class="role-control"><span class="sr-only">Vai trò demo</span><select id="role-switch" aria-label="Vai trò demo">${roles.map((role) => `<option value="${escape(role)}" ${role === user.role ? "selected" : ""}>${escape(roleLabels[role])}</option>`).join("")}</select></label><div class="activity-wrap"><button class="activity-button" id="activity-button" aria-expanded="false" aria-controls="activity-panel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"/><path d="M10 21h4"/></svg><span id="notification-count" hidden></span></button><section class="activity-panel" id="activity-panel" aria-label="Hoạt động dự án" hidden><div><h3>Hoạt động dự án</h3><button class="text-button" id="close-activity" aria-label="Đóng hoạt động">✕</button></div><ul id="activity-list"></ul><button class="text-button" id="mark-notifications">Đánh dấu tất cả đã đọc</button></section></div><div class="user-chip"><span class="avatar">MA</span><div><strong>${escape(user.name)}</strong><small>Phiên demo</small></div></div><button class="text-button" id="logout">Thoát</button></div></header>${content}</div></div>`;
    const menuButton = $(".mobile-menu"),
      sidebar = $("#sidebar"),
      media = matchMedia("(max-width: 760px)");
    function closeMenu(restoreFocus = true) {
      sidebar.classList.remove("open");
      $("#menu-backdrop").hidden = true;
      menuButton.setAttribute("aria-expanded", "false");
      $("main").inert = false;
      $(".topbar-right").inert = false;
      document.body.classList.remove("menu-open");
      if (media.matches) sidebar.inert = true;
      if (restoreFocus && media.matches) menuButton.focus();
    }
    function syncMenu() {
      closeMenu(false);
      sidebar.inert = media.matches;
    }
    syncMenu();
    media.addEventListener("change", syncMenu);
    menuButton.onclick = () => {
      if (sidebar.classList.contains("open")) {
        closeMenu();
        return;
      }
      sidebar.inert = false;
      sidebar.classList.add("open");
      $("#menu-backdrop").hidden = false;
      menuButton.setAttribute("aria-expanded", "true");
      $("main").inert = true;
      $(".topbar-right").inert = true;
      document.body.classList.add("menu-open");
      $("#close-menu").focus();
    };
    $("#close-menu").onclick = $("#menu-backdrop").onclick = () => closeMenu();
    const activityPanel = $("#activity-panel");
    function closeActivity(restoreFocus = false) {
      activityPanel.hidden = true;
      $("#activity-button").setAttribute("aria-expanded", "false");
      if (restoreFocus) $("#activity-button").focus();
    }
    $("#activity-button").onclick = () => {
      activityPanel.hidden = !activityPanel.hidden;
      $("#activity-button").setAttribute(
        "aria-expanded",
        String(!activityPanel.hidden),
      );
      if (!activityPanel.hidden) $("#close-activity").focus();
    };
    $("#close-activity").onclick = () => closeActivity(true);
    $("#mark-notifications").onclick = () => {
      const data = read();
      data.notifications.forEach((n) => (n.read = true));
      if (write(data)) toast("Đã đánh dấu hoạt động đã đọc.");
    };
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".activity-wrap")) closeActivity();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (sidebar.classList.contains("open")) closeMenu();
        if (!activityPanel.hidden) closeActivity(true);
      }
      if (e.key === "Tab" && sidebar.classList.contains("open")) {
        const items = $$("a,button", sidebar).filter(
            (el) => el.getClientRects().length,
          ),
          first = items[0],
          last = items.at(-1);
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
        if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
    $("#role-switch").onchange = (e) => {
      if (login(e.target.value, user.email)) location.reload();
    };
    $("#logout").onclick = () => {
      sessionStorage.removeItem("cs.session");
      location.href = "login.html";
    };
    renderNotifications();
    if (user.role !== "Client") {
      $("main").innerHTML =
        `<div class="panel security-notice"><span class="eyebrow">403 · Phân quyền demo</span><h1>Không gian dành cho Client</h1><p>Bộ giao diện SV1 gồm 5 trang. Các màn hình ${escape(roleLabels[user.role])} thuộc phần SV2/SV3 và cần được ghép ở bước tích hợp.</p><div class="actions dialog-actions"><button class="btn primary" id="switch-client">Trải nghiệm vai trò Client</button><a class="btn" href="index.html">Về trang chủ</a></div></div>`;
      $("#switch-client").onclick = () => {
        if (login("Client", user.email)) location.reload();
      };
      return false;
    }
    return true;
  }
  function selectProject(container, page) {
    const current = project(),
      data = read().projects.filter(
        (p) => p.status !== "Archived" || p.id === current?.id,
      );
    $(container).innerHTML =
      `<option value="">Chọn dự án…</option>${data.map((p) => `<option value="${escape(p.id)}" ${current?.id === p.id ? "selected" : ""}>${escape(p.name)}${p.status === "Archived" ? " — Đã lưu trữ" : ""}</option>`).join("")}`;
    $(container).onchange = (e) => {
      location.href = url(page, e.target.value);
    };
    return current;
  }
  function confirmAction(title, description, onConfirm) {
    const dialog = document.createElement("dialog");
    dialog.innerHTML = `<h2>${escape(title)}</h2><p>${escape(description)}</p><div class="actions dialog-actions"><button class="btn" data-no>Hủy</button><button class="btn primary" data-yes>Xác nhận</button></div>`;
    document.body.append(dialog);
    dialog.showModal();
    $("[data-no]", dialog).onclick = () => dialog.close();
    $("[data-yes]", dialog).onclick = () => {
      dialog.close();
      onConfirm();
    };
    dialog.addEventListener("close", () => dialog.remove());
  }
  return {
    $,
    $$,
    escape,
    init,
    read,
    write,
    session,
    preferredRole,
    roles,
    roleLabels,
    login,
    toast,
    pill,
    url,
    project,
    update,
    notify,
    shell,
    selectProject,
    confirmAction,
  };
})();
