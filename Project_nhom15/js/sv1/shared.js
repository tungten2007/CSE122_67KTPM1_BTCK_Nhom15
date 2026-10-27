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
  function read(){return TeamClient.read();}
  async function init(){
    if(!session()){location.replace(new URL('html/sv1/login.html',document.baseURI).href);return false;}
    try{Store.load();return true;}catch(e){document.querySelector('main').textContent='Chưa mở được dữ liệu: '+e.message;return false;}
  }
  function write(value){const ok=TeamClient.write(value);if(ok)renderNotifications();return ok;}
  function session(){return TeamClient.session();}
  function preferredRole() {
    try {
      const role = localStorage.getItem("cs.preferredRole");
      return roles.includes(role) ? role : "Client";
    } catch {
      return "Client";
    }
  }
  function login(role,email){return TeamClient.login(role,email);}
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
    new URL(`html/sv1/${page}.html${id ? "?project=" + encodeURIComponent(id) : ""}`, document.baseURI).href;
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
  function notify(message,projectId,type,versionId){return TeamClient.notify(message,projectId,type,versionId);}
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
  function shell(active, title, contextProject) {
    const user = session();
    if (!user) {
      location.replace(new URL("html/sv1/login.html",document.baseURI).href);
      return false;
    }
    const main = $("main"),
      content = main.outerHTML;
    document.body.classList.add("app");
    const selectedProject = project()?.id || contextProject?.id || sessionStorage.getItem("cs-project") || "";
    const projectOptions = Store.get().projects.map((p) => `<option value="${escape(p.id)}" ${p.id === selectedProject ? "selected" : ""}>${escape(p.name)}${p.archived ? " · Lưu trữ" : ""}</option>`).join("");
    const initials = escape(user.name.split(" ").slice(-2).map((part) => part[0]).join(""));
    document.body.innerHTML = `<a class="skip-link" href="${escape(location.pathname + location.search)}#main">Đến nội dung chính</a><div class="app-shell"><button class="menu-backdrop" id="menu-backdrop" aria-label="Đóng menu" hidden></button><aside class="sidebar" id="sidebar" aria-label="Điều hướng không gian khách hàng"><button class="text-button mobile-close" id="close-menu" aria-label="Đóng menu">✕</button><a class="brand" href="html/sv1/index.html"><span class="brand-mark">✳</span>CreatorStudio</a><p class="nav-label">KHÔNG GIAN KHÁCH HÀNG</p><nav aria-label="Điều hướng chính">${[
      ["projects", "▦", "Dự án của tôi", "client-project-overview"],
      ["brief", "▤", "Creative Brief", "client-creative-brief"],
      ["review", "◫", "Duyệt phiên bản", "client-review-versions"],
      ["feedback", "✉", "Phản hồi", "client-review-versions"],
    ]
      .map(
        ([id, icon, label, page]) =>
          `<a class="nav-link ${active === id ? "active" : ""}" ${active === id ? 'aria-current="page"' : ""} href="${url(page, project()?.id || contextProject?.id)}${id === "feedback" ? (project()?.id || contextProject?.id ? "&" : "?") + "view=feedback" : ""}"><span aria-hidden="true">${icon}</span>${label}</a>`,
      )
      .join(
        "",
      )}<a class="nav-link ${active === "profile" ? "active" : ""}" ${active === "profile" ? 'aria-current="page"' : ""} href="html/sv2/profile.html">Hồ sơ cá nhân</a><a class="nav-link ${active === "notifications" ? "active" : ""}" ${active === "notifications" ? 'aria-current="page"' : ""} href="html/sv2/notifications.html">Thông báo</a></nav><button class="nav-link sidebar-logout" id="logout" type="button"><span aria-hidden="true">↪</span>Đăng xuất</button><div class="sidebar-note"><span class="eyebrow">Cùng nhau sáng tạo</span><h3>Ý tưởng hay bắt đầu<br>từ một brief tốt.</h3><p>Chia sẻ điều bạn mong muốn.<br>Chúng tôi giúp bạn kết nối.</p><a class="btn small" href="html/sv1/client-creative-brief.html">Viết brief mới →</a></div></aside><div class="workspace"><header class="topbar"><button class="btn mobile-menu" aria-controls="sidebar" aria-expanded="false" aria-label="Mở menu">☰</button><span class="breadcrumb">Không gian làm việc <span class="breadcrumb-separator">/</span>${escape(title)}</span><div class="topbar-right"><label class="project-control"><span class="sr-only">Dự án</span><select id="project-switch" aria-label="Chọn dự án">${projectOptions}</select></label><label class="role-control"><span class="sr-only">Tài khoản demo</span><select id="role-switch" aria-label="Chuyển tài khoản demo">${Navigation.accountOptions(Store.get().users,user.id)}</select></label><div class="activity-wrap"><button class="activity-button" id="activity-button" aria-expanded="false" aria-controls="activity-panel"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9Z"/><path d="M10 21h4"/></svg><span id="notification-count" hidden></span></button><section class="activity-panel" id="activity-panel" aria-label="Hoạt động dự án" hidden><div><h3>Hoạt động dự án</h3><button class="text-button" id="close-activity" aria-label="Đóng hoạt động">✕</button></div><ul id="activity-list"></ul><button class="text-button" id="mark-notifications">Đánh dấu tất cả đã đọc</button></section></div><a class="avatar small" href="html/sv2/profile.html" aria-label="${initials} — Hồ sơ cá nhân">${initials}</a></div></header>${content}</div></div>`;
    $("#project-switch").onchange = (e) => {
      sessionStorage.setItem("cs-project", e.target.value);
      const page = location.pathname.split("/").pop().replace(/\.html$/, "");
      if (page === "client-project-overview") {
        if (window.WorkspaceNavigation) window.WorkspaceNavigation.navigate(new URL(location.href), false);
        else location.reload();
        return;
      }
      const route = ["client-creative-brief", "client-review-versions"].includes(page)
        ? page
        : "client-project-overview";
      const target = new URL(url(route, e.target.value));
      if (route === "client-review-versions" && new URLSearchParams(location.search).get("view") === "feedback") target.searchParams.set("view", "feedback");
      if (window.WorkspaceNavigation?.canOpen(target)) window.WorkspaceNavigation.navigate(target);
      else location.assign(target.href);
    };
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
    media.addEventListener("change", syncMenu, {signal:window.WorkspaceNavigation?.signal});
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
      renderNotifications();
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
    }, {signal:window.WorkspaceNavigation?.signal});
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
    }, {signal:window.WorkspaceNavigation?.signal});
    $("#role-switch").onchange = (e) => {
      try {
        const target = new URL(Navigation.switchAccount(e.target.value), document.baseURI);
        if (window.WorkspaceNavigation?.canOpen(target)) window.WorkspaceNavigation.navigate(target);
        else location.assign(target.href);
      } catch (error) { e.target.value=user.id; toast(error.message); }
    };
    $("#logout").onclick = () => {
      sessionStorage.removeItem("cs.session"); sessionStorage.removeItem("cs-user"); localStorage.removeItem("currentUser");
      location.href = new URL("html/sv1/login.html",document.baseURI).href;
    };
    renderNotifications();
    if (user.role !== "Client") {
      $("main").innerHTML =
        `<div class="panel security-notice"><span class="eyebrow">403 · Phân quyền demo</span><h1>Không gian dành cho Client</h1><p>Bộ giao diện SV1 gồm 5 trang. Các màn hình ${escape(roleLabels[user.role])} thuộc phần SV2/SV3 và cần được ghép ở bước tích hợp.</p><div class="actions dialog-actions"><button class="btn primary" id="switch-client">Trải nghiệm vai trò Client</button><a class="btn" href="html/sv1/index.html">Về trang chủ</a></div></div>`;
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
        const target = new URL(url(page, e.target.value));
        if (page === "client-review-versions" && new URLSearchParams(location.search).get("view") === "feedback") target.searchParams.set("view", "feedback");
        location.href = target.href;
    };
    // Explicit rehearsal control; keep normal review transitions unchanged.
    if (current && ["client-creative-brief", "client-review-versions"].includes(page)) {
      const tools = document.createElement("details");
      tools.className = "panel";
      tools.style.padding = "12px 16px";
      tools.style.marginBottom = "16px";
      const summary = document.createElement("summary");
      summary.textContent = "Công cụ tập demo";
      const note = document.createElement("p");
      note.textContent = "Đưa riêng dự án đang chọn về chờ duyệt để tập lại. Giữ nội dung brief, ảnh, phản hồi và các dự án khác; brief trở về nháp. Đây là đặt lại dữ liệu demo, không phải bước duyệt nghiệp vụ.";
      const button = document.createElement("button");
      button.type = "button";
      button.className = "btn small";
      button.id = "prepare-client-demo";
      button.textContent = "Chuẩn bị lại demo";
      tools.append(summary, note, button);
      const heading = document.querySelector(".page-heading");
      if (heading) heading.insertAdjacentElement("afterend", tools);
      else $(container).closest(".panel").insertAdjacentElement("afterend", tools);
      button.onclick = () => confirmAction("Chuẩn bị lại demo cho " + current.name + "?", note.textContent + " Một bản sao dữ liệu hiện tại sẽ được lưu trong trình duyệt trước khi thay đổi.", () => {
        try {
          Store.load();
          const user = session();
          if (user?.role !== "Client") throw Error("Hãy đăng nhập vai trò khách hàng để tập demo.");
          localStorage.setItem("creatorstudio.demo-backup." + current.id, JSON.stringify(Store.get()));
          Store.transaction(d => {
            if (!d.users.some(u => u.id === user.id && u.active && u.role === "Client")) throw Error("Tài khoản không còn quyền thao tác.");
            const target = d.projects.find(item => item.id === current.id);
            if (!target) throw Error("Dự án không còn tồn tại.");
            target.archived = false;
            target.status = current.versionId ? "In Review" : "Active";
            target.progress = Math.min(Number(target.progress) || 0, 75);
            if (current.versionId) {
              const version = d.versions.find(item => item.id === current.versionId && item.projectId === target.id);
              if (!version) throw Error("Phiên bản không còn tồn tại.");
              version.status = "Client Review";
              version.reviewedAt = null;
              version.history = version.history || [];
              version.history.push({action: "Demo reset", by: user.id, time: new Date().toISOString(), reason: "Đặt lại để tập trình diễn, không phải phê duyệt nghiệp vụ."});
            }
            const brief = d.briefs.filter(item => item.projectId === target.id).at(-1);
            if (brief) {
              brief.status = "draft";
              if (brief.clientData) {
                brief.clientData.submitted = false;
                brief.clientData.accepted = false;
              }
            }
            d.activity.unshift({id: Store.id("a"), text: "Chuẩn bị lại demo: " + target.name, time: new Date().toISOString()});
          });
          location.reload();
        } catch (error) { toast(error.message); }
      });
    }
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
    home:TeamClient.home,
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
