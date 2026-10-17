// Optional logic regression suite. This DOM simulation does not verify layout or browser rendering.
// Install happy-dom separately for tests; the website itself has no npm dependency.
import { Window } from "happy-dom";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const seed = JSON.parse(read("assets/data/projects.json"));
const windows = [];
let checks = 0;
const check = (value, message) => {
  assert.ok(value, message);
  checks++;
  console.log("PASS", message);
};
async function mount(route, data = seed, role = "Client") {
  const window = new Window({
    url: "http://localhost:8000/" + route,
    settings: {
      disableJavaScriptFileLoading: true,
      disableCSSFileLoading: true,
      enableJavaScriptEvaluation: true,
      suppressInsecureJavaScriptEnvironmentWarning: true,
    },
  });
  windows.push(window);
  window.structuredClone = structuredClone;
  window.fetch = async () => ({
    ok: true,
    json: async () => structuredClone(seed),
  });
  window.document.write(read(route.split("?")[0]));
  window.eval(read("js/shared.js"));
  if (data)
    window.localStorage.setItem("creatorstudio.sv1.v1", JSON.stringify(data));
  if (role) window.CS.login(role);
  await window.eval(read("js/" + route.split("?")[0].replace(".html", ".js")));
  const $ = (selector) => window.document.querySelector(selector);
  const input = (id, value) => {
    const el = $(id);
    el.value = value;
    el.dispatchEvent(new window.Event("input", { bubbles: true }));
  };
  const change = (id, value) => {
    const el = $(id);
    el.value = value;
    el.dispatchEvent(new window.Event("change", { bubbles: true }));
  };
  const submit = (id) =>
    $(id).dispatchEvent(
      new window.Event("submit", { bubbles: true, cancelable: true }),
    );
  const yes = () => $("dialog[open] [data-yes]").click();
  const no = () => $("dialog[open] [data-no]").click();
  return {
    window,
    $,
    input,
    change,
    submit,
    yes,
    no,
    data: () => window.CS.read(),
  };
}
try {
  let t = await mount("index.html", seed, null);
  check(
    t.$(".faq-list").querySelectorAll("details").length === 3,
    "Landing has native keyboard-accessible FAQ",
  );
  t.$('[data-role="Designer"]').click();
  check(
    t.window.location.pathname === "/login.html" && !t.window.CS.session(),
    "Unsupported landing role opens explanation before login",
  );
  t = await mount("login.html?role=Designer", seed, null);
  check(
    t.$("#role-help").textContent.includes("chưa có"),
    "Login explains SV1 role scope before entry",
  );
  t.change("#login-role", "Client");
  check(
    t.$("#role-help").textContent.includes("đầy đủ"),
    "Login explanation follows role selector",
  );
  t.input("#email", "bad");
  t.input("#password", "123");
  t.submit("#login-form");
  check(
    t.$("#email").getAttribute("aria-invalid") === "true" &&
      !t.window.CS.session(),
    "Invalid login keeps user in form with accessible errors",
  );
  t.input("#email", "demo@example.com");
  t.input("#password", "demo123");
  check(
    !t.$("#email").hasAttribute("aria-invalid") &&
      !t.$("#password-error").textContent,
    "Corrected login fields clear stale errors",
  );
  t.$("#quick-client").click();
  check(
    t.window.CS.session().role === "Client" &&
      t.window.location.pathname === "/client-project-overview.html",
    "Quick demo creates a Client session without a password",
  );

  t = await mount("client-project-overview.html");
  check(
    t.window.document.querySelectorAll(".project-card").length === 4,
    "Dashboard keeps the four original sample projects",
  );
  check(
    t.$("#attention-title").textContent.startsWith("3") &&
      t.$("#attention-link").href.endsWith("project=p1"),
    "Attention panel links to a design awaiting review",
  );
  t.change("#project-sort", "deadline");
  check(
    t.$(".project-card h3").textContent.includes("Élan"),
    "Nearest-deadline sorting actually changes card order",
  );
  t.change("#project-sort", "name");
  check(
    t.$(".project-card h3").textContent.includes("Élan"),
    "Vietnamese name sorting uses locale ordering",
  );
  t.input("#search", "moc");
  check(
    t.window.document.querySelectorAll(".project-card").length === 1 &&
      t.$(".project-card h3").textContent.includes("Mộc"),
    "Search without Vietnamese accents finds accented project names",
  );
  check(
    !t.$("#clear-search").hidden &&
      t.$("#result-count").textContent.includes("moc"),
    "Search result and clear control reflect the query",
  );
  t.$("#clear-search").click();
  check(
    t.window.document.querySelectorAll(".project-card").length === 4 &&
      t.$("#clear-search").hidden,
    "Clearing search restores the current list",
  );
  t.$('[data-filter="Completed"]').click();
  check(
    t.window.document.querySelectorAll(".project-card").length === 1,
    "Existing status filter still works alongside sorting",
  );
  t.$('[data-filter="all"]').click();
  t.$("#new-project").click();
  t.input("#project-name", "Dự án thử trải nghiệm");
  t.input(
    "#project-description",
    "Thiết kế bộ nhận diện cho thương hiệu thiên nhiên.",
  );
  t.input("#project-deadline", "2026-12-20");
  t.submit("#project-form");
  const newProject = t.data().projects[0];
  check(
    newProject.name === "Dự án thử trải nghiệm" && !newProject.versionStatus,
    "Creating a project preserves no-version workflow",
  );
  const withNew = t.data();
  t = await mount("client-project-overview.html", withNew);
  const newCard = [...t.window.document.querySelectorAll(".project-card")].find(
    (el) => el.textContent.includes(newProject.name),
  );
  check(
    newCard.textContent.includes("Chưa có thiết kế") &&
      !newCard.querySelector('a[href*="client-review-versions"]'),
    "New-project card guides users to brief instead of an empty review",
  );

  t = await mount("client-creative-brief.html?project=p1");
  check(
    t.$('.journey-strip [aria-current="step"]').href.endsWith("project=p1"),
    "Workflow navigation retains selected project",
  );
  t.$("#manual").click();
  t.input("#goal", "Mục tiêu thử nghiệm");
  check(
    t.$("#brief-progress").value === 1 &&
      t.$("#draft-status").textContent.includes("chưa lưu"),
    "Editing updates brief completion and dirty state",
  );
  const unload = new t.window.Event("beforeunload", { cancelable: true });
  t.window.dispatchEvent(unload);
  check(
    unload.defaultPrevented,
    "Unsaved brief requests a native leave warning",
  );
  t.$(".back-link").click();
  check(
    !!t.$("dialog[open] [data-no]"),
    "In-app navigation warns before discarding a brief",
  );
  t.no();
  check(
    t.window.location.pathname === "/client-creative-brief.html" &&
      t.$("#goal").value === "Mục tiêu thử nghiệm",
    "Cancel navigation keeps the edited brief",
  );
  t.change("#project-select", "p2");
  t.no();
  check(
    t.$("#project-select").value === "p1",
    "Cancel project switch restores the selected project",
  );
  t.change("#role-switch", "Designer");
  t.no();
  check(
    t.window.CS.session().role === "Client" &&
      t.$("#role-switch").value === "Client",
    "Cancel role switch preserves session and selection",
  );
  t.$("#logout").click();
  t.no();
  check(
    t.window.CS.session().role === "Client",
    "Cancel logout does not remove the demo session",
  );
  t.$("#save-draft-bottom").click();
  check(
    t.data().projects[0].brief.sections.goal === "Mục tiêu thử nghiệm",
    "Bottom save action persists a partial draft",
  );
  const cleanUnload = new t.window.Event("beforeunload", { cancelable: true });
  t.window.dispatchEvent(cleanUnload);
  check(
    !cleanUnload.defaultPrevented,
    "Saved brief no longer triggers leave warning",
  );
  t.$("#accept").click();
  check(
    t.$("#audience").getAttribute("aria-invalid") === "true",
    "Accepting an incomplete brief highlights the missing field",
  );
  for (const id of ["audience", "message", "style", "deliverables"])
    t.input("#" + id, "Nội dung cho " + id);
  t.$("#accept").click();
  check(
    t.$("#brief-progress").value === 5 &&
      !t.$("#submit-brief").disabled &&
      t.data().projects[0].brief.accepted,
    "Complete accepted brief is saved and ready to submit",
  );
  t.submit("#structured-form");
  check(
    t.data().projects[0].brief.submitted && t.$("#submit-brief").disabled,
    "Submitting saves the state and prevents duplicate submission",
  );
  t.$("#save-draft-bottom").click();
  check(
    t.data().projects[0].brief.submitted,
    "Saving an unchanged sent brief does not downgrade it to draft",
  );
  t.input("#style", "Phong cách đã chỉnh sửa");
  check(
    t.$("#submit-brief").disabled,
    "Changing accepted text requires confirmation again",
  );
  t.$("#regenerate").click();
  t.no();
  check(
    t.$("#style").value === "Phong cách đã chỉnh sửa",
    "Cancel regeneration preserves edited sections",
  );
  t.$("#manual").click();
  t.no();
  check(
    t.$("#style").value === "Phong cách đã chỉnh sửa",
    "Cancel manual restart preserves edited sections",
  );
  t.$("#regenerate").click();
  t.yes();
  check(
    t.$("#save-draft-bottom").disabled && !t.$("#generating").hidden,
    "Generation temporarily locks save and exposes processing state",
  );
  await new Promise((resolve) => setTimeout(resolve, 800));
  check(
    !t.$("#structured-form").hidden &&
      !t.$("#save-draft-bottom").disabled &&
      t.$("#draft-status").textContent.includes("chưa lưu"),
    "Generated brief restores controls and requires saving",
  );
  t.window.document.dispatchEvent(
    new t.window.KeyboardEvent("keydown", {
      key: "s",
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    }),
  );
  check(
    t.data().projects[0].brief.source === "mock" &&
      t.$("#draft-status").textContent.includes("Đã lưu"),
    "Ctrl S saves the current generated draft",
  );
  const archived = structuredClone(seed);
  archived.projects[0].status = "Archived";
  t = await mount("client-creative-brief.html?project=p1", archived);
  check(
    t.$("#save-draft-bottom").disabled && t.$("#generate").disabled,
    "Archived brief remains read-only with new save controls",
  );
  t = await mount("client-creative-brief.html");
  check(
    t.$(".save-bar").hidden && !t.$("#brief-empty").hidden,
    "No selected project hides inapplicable save actions",
  );

  t = await mount("client-review-versions.html?project=p1");
  t.$("#zoom-design").click();
  check(
    t.$("#preview-dialog").open &&
      t.$("#preview-image").src.endsWith("moc-v2.svg"),
    "Enlarged viewer opens the current project artwork",
  );
  t.$('[data-preview="1"]').click();
  check(
    t.$("#preview-image").src.endsWith("moc-v1.svg") &&
      t.$('[data-preview="1"]').getAttribute("aria-pressed") === "true",
    "Viewer switches version with accessible pressed state",
  );
  t.$("#close-preview").click();
  check(
    !t.$("#preview-dialog").open && !t.data().projects[0].comments.length,
    "Viewing artwork does not change review data",
  );
  t.$("#add-comment").click();
  check(
    t.$("#pin-x").value === "50" && t.$("#pin-y").value === "50",
    "Keyboard feedback starts at a clearly editable center pin",
  );
  t.input("#comment-text", "Tăng kích thước tên thương hiệu.");
  t.input("#pin-x", "99");
  t.submit("#comment-form");
  check(
    t.$("#comment-error").textContent.includes("98") &&
      !t.data().projects[0].comments.length,
    "Out-of-range coordinates cannot be saved",
  );
  t.input("#pin-x", "82");
  t.input("#pin-y", "17");
  t.submit("#comment-form");
  let comment = t.data().projects[0].comments[0];
  check(
    comment.x === 0.82 &&
      comment.y === 0.17 &&
      t.$("#feedback-summary").textContent.includes("1 chưa xử lý"),
    "Keyboard coordinates and pending feedback count are stored correctly",
  );
  t.$('[data-action="edit"]').click();
  t.input("#comment-text", "Chỉnh lại tên thương hiệu cho rõ hơn.");
  t.submit("#comment-form");
  comment = t.data().projects[0].comments[0];
  check(
    comment.x === 0.82 && comment.y === 0.17 && comment.text.includes("rõ hơn"),
    "Editing feedback preserves its original pin position",
  );
  t.$("#request-changes").click();
  t.yes();
  check(
    t.data().projects[0].versionStatus === "Changes Requested",
    "Request changes still follows existing feedback workflow",
  );
  t.$('[data-action="resolve"]').click();
  check(
    t.$("#feedback-summary").textContent.includes("0 chưa xử lý"),
    "Resolving feedback updates the summary",
  );
  t.$("#approve").click();
  t.yes();
  check(
    t.data().projects[0].status === "Completed" &&
      t.data().projects[0].progress === 100 &&
      t.$("#add-comment").disabled,
    "Approve completes project and locks review actions",
  );
  t = await mount("client-review-versions.html?project=p2");
  t.$("#reject-version").click();
  t.input("#rejection-reason", "Chưa phù hợp với định hướng ban đầu.");
  t.submit("#rejection-form");
  check(
    t.data().projects[1].versionStatus === "Rejected" &&
      t.$("#approve").disabled,
    "Rejection with reason still locks the version",
  );
  console.log(
    `TOTAL: ${checks} logic checks passed. No visual layout or real-browser claims.`,
  );
} finally {
  await Promise.all(windows.map((window) => window.happyDOM.abort()));
}
