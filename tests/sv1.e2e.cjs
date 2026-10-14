// Optional browser verification: serve the repository over HTTP before running.
const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const base = process.env.CS_BASE_URL || "http://127.0.0.1:8000/";
const executablePath =
  process.env.CS_CHROMIUM_PATH ||
  (fs.existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);
(async () => {
  const browser = await chromium.launch({ headless: true, executablePath });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
  });
  const page = await context.newPage();
  page.setDefaultTimeout(10000);
  const errors = [],
    passed = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const check = (value, label) => {
    assert.ok(value, label);
    passed.push(label);
    console.log("PASS", label);
  };
  const go = async (route) => {
    const response = await page.goto(new URL(route, base).href);
    await page.evaluate(() => document.fonts.ready);
    return response;
  };
  const data = () => page.evaluate(() => CS.read());
  const confirm = () => page.locator("dialog[open] [data-yes]").click();
  await go("client-project-overview.html");
  await page.waitForURL("**/login.html");
  check(true, "Client pages require a demo session");
  await page.fill("#email", "bad-email");
  await page.fill("#password", "123");
  await page.click("#login-submit");
  check(
    (await page.textContent("#email-error")).includes("hợp lệ"),
    "Email validation",
  );
  check(
    (await page.textContent("#password-error")).includes("6 ký tự"),
    "Password validation",
  );
  await page.fill("#email", "sv1@example.com");
  await page.fill("#password", "demo123");
  await page.click("#login-submit");
  await page.waitForSelector(".project-card");
  check(
    (await page.locator(".project-card").count()) === 4,
    "Valid login loads four JSON projects",
  );
  check(
    await page
      .locator(".nav-link[aria-current=page]")
      .textContent()
      .then((t) => t.includes("Dự án")),
    "Current navigation is marked",
  );
  await page.click("#activity-button");
  check(
    await page.locator("#activity-panel").isVisible(),
    "Activity bell opens",
  );
  await page.click("#mark-notifications");
  check(
    await page.locator("#notification-count").isHidden(),
    "Notifications can be marked read",
  );
  await page.keyboard.press("Escape");
  check(
    await page.locator("#activity-panel").isHidden(),
    "Escape closes activity panel",
  );
  await page.fill("#search", "khong-ton-tai");
  check(await page.locator("#reset-filter").isVisible(), "Search empty state");
  await page.click("#reset-filter");
  await page.click('[data-filter="In Review"]');
  check((await page.locator(".project-card").count()) === 1, "Status filter");
  await page.click("[data-filter=all]");
  await page.click("#new-project");
  await page.fill("#project-name", "SV1 — Hành trình");
  await page.fill(
    "#project-description",
    "Thiết kế bộ nhận diện thiên nhiên dành cho người trẻ, phong cách tối giản.",
  );
  await page.fill("#project-deadline", "2026-12-20");
  await page.click("#save-project");
  await page.waitForSelector("#generate");
  const id = new URL(page.url()).searchParams.get("project");
  check(
    (await data()).projects.some((p) => p.id === id),
    "Create project and open its brief",
  );
  await page.fill("#raw-idea", "Ngắn");
  await page.click("#generate");
  check(
    (await page.textContent("#brief-error")).includes("20 ký tự"),
    "Insufficient AI input can fail",
  );
  await page.fill(
    "#raw-idea",
    "Thiết kế thương hiệu thiên nhiên cho người trẻ. Ngân sách 20 triệu. Phong cách tối giản, xanh lá và kem.",
  );
  await page.click("#generate");
  check(await page.locator("#generating").isVisible(), "AI processing state");
  await page.waitForSelector("#structured-form:not([hidden])");
  check(
    (await page.locator("#structured-form textarea").count()) === 5,
    "Five editable structured brief sections",
  );
  check(
    (await page.inputValue("#brief-budget")) === "20000000",
    "Budget extracted from explicit description",
  );
  check(
    await page.locator("#uncertainty-note").isVisible(),
    "Uncertain suggestions need user confirmation",
  );
  check(
    await page.locator("#submit-brief").isDisabled(),
    "Unaccepted result cannot be submitted",
  );
  await page.fill("#brief-budget", "-1");
  await page.click("#accept");
  check(
    (await page.textContent("#brief-error")).includes("lớn hơn 0"),
    "Invalid budget rejected",
  );
  await page.fill("#brief-budget", "15000000");
  await page.fill(
    "#audience",
    "Người trẻ từ 18 đến 25 tuổi quan tâm đến môi trường.",
  );
  await page.click("#accept");
  check(
    (await data()).projects.find((p) => p.id === id).brief.accepted,
    "Accept result persists immediately",
  );
  await page.reload();
  await page.waitForSelector("#accept");
  check(
    (await page.inputValue("#audience")).includes("18 đến 25"),
    "Accepted brief restored after reload",
  );
  await page.fill("#message", "Thông điệp đã điều chỉnh");
  check(
    await page.locator("#submit-brief").isDisabled(),
    "Editing invalidates acceptance",
  );
  await page.click("#accept");
  await page.click("#save-draft");
  await page.reload();
  await page.waitForSelector("#accept");
  check(
    (await page.inputValue("#message")) === "Thông điệp đã điều chỉnh",
    "Draft persists edits",
  );
  await page.click("#submit-brief");
  check(
    (await data()).projects.find((p) => p.id === id).brief.submitted,
    "Submit changes brief state",
  );
  check(
    await page.locator("#brief-next").isVisible(),
    "Submitted brief has next-step navigation",
  );
  await page.click("#brief-next");
  await page.waitForSelector(".project-card");
  const card = page
    .locator(".project-card")
    .filter({ has: page.locator(`a[href*="project=${id}"]`) });
  check(
    (await card.textContent()).includes("Brief đã gửi"),
    "Submitted brief visible in Project Overview",
  );
  await go("client-review-versions.html?project=" + id);
  await page.waitForSelector("#review-empty:not([hidden])");
  check(
    (await page.textContent("#empty-title")).includes("chưa"),
    "New projects show no-version state",
  );
  await go("client-creative-brief.html?project=" + id);
  await page.waitForSelector("#regenerate");
  await page.click("#regenerate");
  await page.waitForSelector("#structured-form:not([hidden])");
  await page.click("#reject");
  await confirm();
  check(
    await page.locator("#result-placeholder").isVisible(),
    "Reject AI result",
  );
  await page.click("#manual");
  for (const field of ["goal", "audience", "message", "style", "deliverables"])
    await page.fill("#" + field, "Nội dung thủ công cho " + field);
  await page.click("#accept");
  await page.click("#submit-brief");
  check(
    (await data()).projects.find((p) => p.id === id).brief.source === "manual",
    "Manual brief works without AI",
  );
  await go("client-project-overview.html");
  await page.waitForSelector(".project-card");
  await page.locator(`[data-action=edit][data-id="${id}"]`).click();
  await page.fill("#project-name", "SV1 — Đã sửa");
  await page.click("#save-project");
  check(
    (await data()).projects.find((p) => p.id === id).name === "SV1 — Đã sửa",
    "Edit project",
  );
  await page.locator(`[data-action=archive][data-id="${id}"]`).click();
  await confirm();
  check(
    (await data()).projects.find((p) => p.id === id).status === "Archived",
    "Archive project",
  );
  await go("client-creative-brief.html?project=" + id);
  await page.waitForSelector("#generate");
  check(
    await page.locator("#generate").isDisabled(),
    "Archived brief read-only",
  );
  check(
    (await page.locator("#project-select option").count()) > 2,
    "Archived project retains navigation to other projects",
  );
  await go("client-project-overview.html");
  await page.waitForSelector(".project-card");
  await page.click("[data-filter=Archived]");
  await page.locator(`[data-action=restore][data-id="${id}"]`).click();
  await confirm();
  check(
    (await data()).projects.find((p) => p.id === id).status === "Active",
    "Restore prior state",
  );
  await page.click("[data-filter=all]");
  await page.locator(`[data-action=archive][data-id="${id}"]`).click();
  await confirm();
  await page.click("[data-filter=Archived]");
  await page.locator(`[data-action=delete][data-id="${id}"]`).click();
  await confirm();
  check(
    !(await data()).projects.some((p) => p.id === id),
    "Delete archived project",
  );
  await go("client-review-versions.html?project=p1");
  await page.waitForSelector("#approve");
  await page.click("#request-changes");
  check(
    (await page.textContent("#toast")).includes("ít nhất"),
    "Changes require feedback",
  );
  await page.locator("#pin-stage").click({ position: { x: 75, y: 120 } });
  await page.fill(
    "#comment-text",
    "Tên thương hiệu cần lớn hơn tại vị trí này.",
  );
  await page.locator("#comment-form button[type=submit]").click();
  check(
    (await data()).projects.find((p) => p.id === "p1").comments.length === 1,
    "Coordinate comment persists",
  );
  await page.locator("[data-action=edit]").click();
  await page.fill("#comment-text", "Tăng cỡ tên thương hiệu.");
  await page.locator("#comment-form button[type=submit]").click();
  await page.reload();
  await page.waitForSelector(".comment-card");
  check(
    (await page.textContent("#comment-list")).includes("Tăng cỡ"),
    "Edit comment and reload",
  );
  await page.click("[data-mode=slider]");
  await page.locator("#compare-range").fill("30");
  check(
    (await page.textContent("#range-value")) === "30%",
    "Comparison slider",
  );
  await page.click("[data-mode=side]");
  check(
    (await page
      .locator(".old-design")
      .evaluate((el) => getComputedStyle(el).clipPath)) === "none",
    "Side view restores full image",
  );
  await page.click("#moodboard");
  check(await page.locator("#mood-dialog").isVisible(), "Moodboard reference");
  await page.click("#close-mood");
  await page.click("#request-changes");
  await confirm();
  check(
    (await data()).projects.find((p) => p.id === "p1").versionStatus ===
      "Changes Requested",
    "Changes Requested state",
  );
  await page.locator("[data-action=resolve]").click();
  await page.click("[data-comments=resolved]");
  check(
    (await page.locator(".comment-card").count()) === 1,
    "Resolve feedback and filter",
  );
  await page.click("#approve");
  await confirm();
  const approved = (await data()).projects.find((p) => p.id === "p1");
  check(
    approved.status === "Completed" && approved.progress === 100,
    "Approve completes project",
  );
  check(
    await page.locator("#add-comment").isDisabled(),
    "Approved version read-only",
  );
  await go("client-review-versions.html?project=p2");
  await page.waitForSelector("#reject-version");
  await page.click("#reject-version");
  await page.fill("#rejection-reason", "          ");
  await page.locator("#rejection-form button[type=submit]").click();
  check(
    (await page.textContent("#rejection-error")).includes("10 ký tự"),
    "Rejection requires specific reason",
  );
  await page.fill(
    "#rejection-reason",
    "Bố cục chưa phù hợp với định hướng thương hiệu.",
  );
  await page.locator("#rejection-form button[type=submit]").click();
  check(
    (await data()).projects.find((p) => p.id === "p2").versionStatus ===
      "Rejected",
    "Reject version state",
  );
  check(
    await page.locator("#rejection-detail").isVisible(),
    "Rejection reason visible",
  );
  await page.reload();
  await page.waitForSelector("#approve");
  check(
    await page.locator("#approve").isDisabled(),
    "Rejected version remains locked after reload",
  );
  await page.selectOption("#role-switch", "Designer");
  await page.waitForSelector("#switch-client");
  check(
    await page.locator("#switch-client").isVisible(),
    "Non-client access gate",
  );
  await page.click("#logout");
  await page.waitForSelector("#login-role");
  check(
    (await page.inputValue("#login-role")) === "Designer",
    "Role preference survives logout",
  );
  await page.click("[data-role=Client]");
  await page.waitForSelector(".project-card");
  for (const width of [360, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "index.html",
      "login.html",
      "client-project-overview.html",
      "client-creative-brief.html?project=p3",
      "client-review-versions.html?project=p3",
    ]) {
      await go(route);
      if (route.startsWith("client"))
        await page.waitForSelector("#role-switch");
      check(
        !(await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        )),
        `No overflow: ${route} at ${width}px`,
      );
    }
  }
  await page.setViewportSize({ width: 360, height: 900 });
  await go("client-project-overview.html");
  await page.waitForSelector(".mobile-menu");
  await page.click(".mobile-menu");
  check(
    await page.locator("#menu-backdrop").isVisible(),
    "Mobile menu backdrop",
  );
  await page.keyboard.press("Escape");
  check(await page.locator("#menu-backdrop").isHidden(), "Escape closes menu");
  check(
    await page
      .locator(".mobile-menu")
      .evaluate((el) => el === document.activeElement),
    "Menu restores keyboard focus",
  );
  await page.click(".mobile-menu");
  await page.locator("#menu-backdrop").click({ position: { x: 320, y: 200 } });
  check(
    await page.locator("#menu-backdrop").isHidden(),
    "Click backdrop closes menu",
  );
  await page.click("#activity-button");
  check(
    !(await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    )),
    "Mobile activity panel fits",
  );
  await page.keyboard.press("Escape");
  await go("client-review-versions.html?project=missing");
  await page.waitForSelector("#review-empty:not([hidden])");
  check(
    (await page.textContent("#empty-title")).includes("không tồn tại"),
    "Deleted/missing project state",
  );
  const failureContext = await browser.newContext();
  const failurePage = await failureContext.newPage();
  failurePage.on("pageerror", (e) => errors.push(e.message));
  await failurePage.goto(base);
  await failurePage.evaluate(() => CS.login("Client"));
  await failurePage.route("**/assets/data/projects.json", (route) =>
    route.abort(),
  );
  await failurePage.goto(new URL("client-project-overview.html", base).href);
  await failurePage.waitForSelector("#retry-data");
  check(
    await failurePage.locator("#retry-data").isVisible(),
    "JSON loading failure has retry",
  );
  await failurePage.unroute("**/assets/data/projects.json");
  await failurePage.click("#retry-data");
  await failurePage.waitForSelector(".project-card");
  check(
    (await failurePage.locator(".project-card").count()) === 4,
    "Retry recovers JSON loading",
  );
  const loadingContext = await browser.newContext();
  const loadingPage = await loadingContext.newPage();
  await loadingPage.goto(base);
  await loadingPage.evaluate(() => CS.login("Client"));
  await loadingPage.route("**/assets/data/projects.json", async (route) => {
    await new Promise((r) => setTimeout(r, 500));
    await route.continue();
  });
  await loadingPage.goto(new URL("client-project-overview.html", base).href, {
    waitUntil: "domcontentloaded",
  });
  check(
    await loadingPage.locator(".data-loading").isVisible(),
    "JSON loading skeleton is visible",
  );
  await loadingPage.waitForSelector(".project-card");
  check(errors.length === 0, "No browser JavaScript errors");
  const report = { passed: passed.length, failed: 0, checks: passed };
  console.log("TOTAL", passed.length, "passed");
  if (process.env.CS_TEST_REPORT)
    fs.writeFileSync(
      process.env.CS_TEST_REPORT,
      JSON.stringify(report, null, 2),
    );
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
