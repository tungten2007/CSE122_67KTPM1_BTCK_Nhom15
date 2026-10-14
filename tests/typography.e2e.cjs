const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const fs = require("node:fs");
(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath:
      process.env.CS_CHROMIUM_PATH ||
      (fs.existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined),
  });
  const context = await browser.newContext({ locale: "vi-VN" });
  const page = await context.newPage();
  const base = process.env.CS_BASE_URL || "http://127.0.0.1:8000/";
  const failedFonts = [],
    outside = [],
    errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("requestfailed", (r) => {
    if (r.url().endsWith(".woff2")) failedFonts.push(r.url());
  });
  page.on("request", (r) => {
    if (!r.url().startsWith(base) && !r.url().startsWith("data:"))
      outside.push(r.url());
  });
  await page.goto(base);
  await page.evaluate(() => CS.login("Client"));
  let checks = 0;
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "index.html",
      "login.html",
      "client-project-overview.html",
      "client-creative-brief.html?project=p1",
      "client-review-versions.html?project=p1",
    ]) {
      await page.goto(base + route);
      if (route.startsWith("client"))
        await page.waitForSelector("#role-switch");
      await page.evaluate(() => document.fonts.ready);
      assert.ok(
        !(await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        )),
        route + " overflow at " + width,
      );
      const tiny = await page.evaluate(() =>
        [...document.querySelectorAll("body *")]
          .filter(
            (el) =>
              el.children.length === 0 &&
              el.getClientRects().length &&
              el.textContent.trim() &&
              !["SCRIPT", "STYLE", "OPTION"].includes(el.tagName) &&
              !(el instanceof SVGElement) &&
              parseFloat(getComputedStyle(el).fontSize) < 13,
          )
          .map((el) => ({
            tag: el.tagName,
            class: el.className,
            text: el.textContent.slice(0, 50),
            size: getComputedStyle(el).fontSize,
          })),
      );
      assert.deepEqual(tiny, [], route + " text smaller than 13px");
      const smallFields = await page.evaluate(() =>
        [
          ...document.querySelectorAll(
            ".field input,.field textarea,.field select,.search-box input",
          ),
        ]
          .filter(
            (el) =>
              el.getClientRects().length &&
              parseFloat(getComputedStyle(el).fontSize) < 16,
          )
          .map((el) => el.id),
      );
      assert.deepEqual(smallFields, [], route + " form text smaller than 16px");
      checks += 3;
    }
  }
  await page.goto(base);
  await page.evaluate(() => {
    for (const style of ["normal", "italic"]) {
      const el = document.createElement("p");
      el.id = "probe-" + style;
      el.textContent =
        "Tiếng Việt: Ă Â Đ Ê Ô Ơ Ư ă â đ ê ô ơ ư Ắ Ằ Ẳ Ẵ Ặ Ấ Ầ Ẩ Ẫ Ậ Ế Ề Ể Ễ Ệ Ố Ồ Ổ Ỗ Ộ Ớ Ờ Ở Ỡ Ợ Ứ Ừ Ử Ữ Ự Ỳ Ỵ Ỷ Ỹ. Ngân sách, dự án, phản hồi, khởi đầu.";
      el.textContent +=
        " " +
        String.fromCharCode(
          ...Array.from({ length: 90 }, (_, i) => 0x1ea0 + i),
        ) +
        " " +
        el.textContent.normalize("NFD");
      el.style.cssText =
        'font-family:"CreatorStudio Inter";font-size:16px;font-weight:650;font-style:' +
        style +
        ";position:absolute;left:-10000px";
      document.body.append(el);
    }
  });
  await page.evaluate(() => document.fonts.ready);
  const cdp = await context.newCDPSession(page);
  await cdp.send("DOM.enable");
  await cdp.send("CSS.enable");
  const { root } = await cdp.send("DOM.getDocument");
  for (const style of ["normal", "italic"]) {
    const { nodeId } = await cdp.send("DOM.querySelector", {
      nodeId: root.nodeId,
      selector: "#probe-" + style,
    });
    const { fonts } = await cdp.send("CSS.getPlatformFontsForNode", { nodeId });
    assert.ok(
      fonts.length > 0 &&
        fonts.every((f) => f.isCustomFont && f.familyName.startsWith("Inter")),
      JSON.stringify(fonts),
    );
    console.log(
      "PASS: Vietnamese " + style + " rendered entirely with bundled Inter",
      JSON.stringify(fonts),
    );
    checks++;
  }
  assert.deepEqual(failedFonts, []);
  assert.deepEqual(outside, []);
  assert.deepEqual(errors, []);
  checks += 3;
  await page.evaluate(() => {
    document.querySelectorAll("[id^=probe-]").forEach((el) => el.remove());
  });
  const fallbackContext = await browser.newContext();
  const fallback = await fallbackContext.newPage();
  await fallback.route("**/*.woff2", (r) => r.abort());
  await fallback.goto(base);
  await fallback.evaluate(() => document.fonts.ready);
  assert.ok(await fallback.locator(".hero h1").isVisible());
  assert.ok(
    !(await fallback.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    )),
  );
  checks += 2;
  console.log("PASS: failed webfont requests retain visible fallback text");
  console.log("TOTAL TYPOGRAPHY CHECKS", checks);
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
