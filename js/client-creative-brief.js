"use strict";
(async () => {
  const { $, $$, toast, update } = CS;
  if (!(await CS.init()) || !CS.shell("brief", "Creative Brief")) return;
  const p = CS.selectProject("#project-select", "client-creative-brief");
  if (!p) {
    $("#brief-workspace").hidden = true;
    $("#brief-empty").hidden = false;
    $(".save-bar").hidden = true;
    if (new URLSearchParams(location.search).has("project"))
      $("#brief-empty h3").textContent = "Dự án không tồn tại hoặc đã bị xóa";
    return;
  }
  const fields = ["goal", "audience", "message", "style", "deliverables"];
  const readonly = p.status === "Archived";
  let accepted = false,
    source = "manual",
    explanation = "",
    round = 0,
    busy = false,
    submitted = false,
    dirty = false;
  const navigate = CS.guardChanges(() => dirty && !readonly);
  $("#project-select").onchange = (event) => {
    const href = CS.url("client-creative-brief", event.target.value);
    // Keep the current selection while the user decides whether to leave.
    event.target.value = p.id;
    navigate(href);
  };
  $("#logout").onclick = () =>
    navigate("login.html", () => sessionStorage.removeItem("cs.session"));
  $("#role-switch").onchange = (event) => {
    const role = event.target.value;
    event.target.value = CS.session().role;
    navigate(location.href, () => CS.login(role, CS.session().email));
  };
  function markDirty(value) {
    dirty = value;
    $("#draft-status").textContent = readonly
      ? "Đã lưu trữ · Chỉ đọc"
      : dirty
        ? "Có thay đổi chưa lưu"
        : "Đã lưu tại trình duyệt";
    $("#save-indicator").classList.toggle("unsaved", dirty);
    $("#save-draft-bottom").disabled = readonly || busy;
  }
  function completion() {
    const filled = fields.filter((id) => $("#" + id).value.trim()).length;
    $("#completion-label").textContent = `${filled}/5 phần đã có nội dung`;
    $("#brief-progress").value = filled;
  }
  $("#raw-idea").value = p.brief?.raw ?? p.description;
  $("#brief-budget").value = p.brief?.budget ?? p.budget ?? "";
  $("#brief-deadline").value = p.brief?.deadline ?? p.deadline;
  function count() {
    $("#char-count").textContent =
      `${$("#raw-idea").value.length.toLocaleString("vi-VN")} / 5.000`;
  }
  function state() {
    $("#brief-state").textContent = readonly
      ? "Đã lưu trữ · Chỉ đọc"
      : submitted
        ? "Submitted · Đã gửi"
        : "Draft · Bản nháp";
    $("#brief-state").className = "pill " + (submitted ? "Completed" : "");
    $("#submit-brief").disabled = readonly || !accepted || submitted || busy;
    $("#accepted-note").textContent = readonly
      ? "Dự án đã lưu trữ. Bạn có thể xem nội dung nhưng không thể chỉnh sửa."
      : submitted
        ? "✓ Brief đã gửi trong bản demo. Bạn có thể trở về dự án để theo dõi."
        : accepted
          ? "✓ Nội dung đã xác nhận và lưu. Bạn có thể gửi brief cho đội ngũ."
          : "Điền đủ 5 phần và chọn Chấp nhận kết quả để mở nút Gửi brief.";
    completion();
    $("#brief-next").hidden = !submitted;
  }
  function uncertainty() {
    const concerns = [];
    if (source === "mock") {
      if (/chưa xác định|cần bổ sung/i.test($("#audience").value))
        concerns.push("đối tượng mục tiêu chưa rõ");
      if (!$("#brief-budget").value) concerns.push("ngân sách chưa chốt");
    }
    $("#uncertainty-note").hidden = !concerns.length;
    $("#uncertainty-note").textContent =
      "Cần bạn xác nhận: " +
      concerns.join("; ") +
      ". Bạn có thể sửa trực tiếp các phần bên dưới hoặc dùng brief thủ công.";
  }
  function showResult() {
    $("#result-placeholder").hidden = true;
    $("#structured-form").hidden = false;
    $("#result-source").textContent =
      source === "mock" ? "AI mô phỏng" : "Viết thủ công";
    $("#explanation-text").textContent = explanation;
    uncertainty();
  }
  function collect() {
    return {
      raw: $("#raw-idea").value.trim(),
      sections: Object.fromEntries(
        fields.map((id) => [id, $("#" + id).value.trim()]),
      ),
      budget: $("#brief-budget").value
        ? Number($("#brief-budget").value)
        : null,
      deadline: $("#brief-deadline").value,
      accepted,
      source,
      explanation,
      submitted,
      updatedAt: new Date().toISOString(),
    };
  }
  function validate(requireSections = true) {
    const budget = $("#brief-budget"),
      deadline = $("#brief-deadline");
    [budget, deadline, ...fields.map((id) => $("#" + id))].forEach((el) =>
      el.removeAttribute("aria-invalid"),
    );
    let target = null,
      message = "";
    if (!budget.validity.valid) {
      target = budget;
      message =
        "Ngân sách phải là số nguyên lớn hơn 0, hoặc để trống nếu chưa chốt.";
    } else if (requireSections && !deadline.validity.valid) {
      target = deadline;
      message = "Vui lòng chọn ngày bàn giao mong muốn.";
    } else if (requireSections) {
      const empty = fields.find((id) => !$("#" + id).value.trim());
      if (empty) {
        target = $("#" + empty);
        message = "Vui lòng điền đủ 5 phần của brief.";
      }
    }
    $("#brief-error").textContent = message;
    if (target) {
      target.setAttribute("aria-invalid", "true");
      target.focus();
      return false;
    }
    return true;
  }
  if (p.brief?.sections && Object.values(p.brief.sections).some(Boolean)) {
    fields.forEach((id) => ($("#" + id).value = p.brief.sections[id] || ""));
    accepted = !!p.brief.accepted;
    submitted = !!p.brief.submitted;
    source = p.brief.source || "manual";
    explanation =
      p.brief.explanation || "Nội dung được bạn tự xây dựng và xác nhận.";
    showResult();
  }
  count();
  state();
  if (p.brief) markDirty(false);
  else
    $("#draft-status").textContent = readonly
      ? "Đã lưu trữ · Chỉ đọc"
      : "Chưa lưu brief · Lưu khi bạn sẵn sàng";
  function edited(event) {
    if (event?.target) event.target.removeAttribute("aria-invalid");
    $("#brief-error").textContent = "";
    markDirty(true);
    accepted = false;
    submitted = false;
    state();
    uncertainty();
    $("#save-note").textContent =
      "Có thay đổi chưa lưu. Hãy chọn Lưu bản nháp hoặc xác nhận lại.";
  }
  $("#raw-idea").oninput = (event) => {
    count();
    edited(event);
  };
  [...fields, "brief-budget", "brief-deadline"].forEach(
    (id) => ($("#" + id).oninput = edited),
  );
  async function generate() {
    if (busy || readonly || !validate(false)) return;
    const raw = $("#raw-idea").value.trim();
    if (raw.length <= 20) {
      $("#brief-error").textContent =
        "Chưa đủ thông tin: hãy mô tả ý tưởng dài hơn 20 ký tự, hoặc chọn Tự viết brief.";
      $("#raw-idea").focus();
      return;
    }
    busy = true;
    $("#save-draft-bottom").disabled = true;
    accepted = false;
    submitted = false;
    state();
    $("#brief-error").textContent = "";
    $("#structured-form").hidden = true;
    $("#result-placeholder").hidden = true;
    $("#generating").hidden = false;
    $$(
      "#brief-workspace button, #brief-workspace input, #brief-workspace textarea",
    ).forEach((el) => (el.disabled = true));
    $("#brief-result").setAttribute("aria-busy", "true");
    await new Promise((resolve) => setTimeout(resolve, 700));
    round++;
    source = "mock";
    const nature = /thiên nhiên|tự nhiên|mỹ phẩm|xanh|môi trường/i.test(raw),
      young = /trẻ|gen z|sinh viên/i.test(raw);
    const sentences = raw
      .split(/[.!?\n]+/)
      .map((s) => s.trim())
      .filter(Boolean);
    const values = {
      goal: `${sentences[0] || raw}. ${round % 2 ? "Xây dựng định hướng rõ ràng và trải nghiệm nhất quán cho thương hiệu." : "Ưu tiên tính dễ nhận biết tại các điểm chạm của thương hiệu."}`,
      audience: young
        ? "Người trẻ quan tâm đến phong cách sống và trải nghiệm thương hiệu. Cần bổ sung độ tuổi, hành vi và nhu cầu cụ thể."
        : "Chưa xác định rõ từ mô tả. Hãy bổ sung nhóm khách hàng, độ tuổi và nhu cầu trước khi gửi.",
      message:
        sentences.length > 1
          ? sentences.slice(1).join(". ") + "."
          : "Truyền tải giá trị cốt lõi của thương hiệu một cách gần gũi. Cần xác nhận thông điệp cụ thể.",
      style: nature
        ? "Tự nhiên, tối giản, gần gũi. Gợi ý xanh lá và kem; cần xác nhận màu và font theo nhận diện."
        : p.category === "UI/UX"
          ? "Giao diện rõ ràng, hiện đại; ưu tiên khả năng đọc và trải nghiệm trên thiết bị di động."
          : "Bố cục rõ ràng, có điểm nhấn. Cần bổ sung màu sắc, cảm xúc và mẫu tham khảo.",
      deliverables:
        p.category === "Branding"
          ? "Đề xuất: logo, bảng màu, typography và hướng dẫn nhận diện cơ bản. Xác nhận số lượng, định dạng và phạm vi bàn giao."
          : p.category === "UI/UX"
            ? "Đề xuất: sitemap, wireframe, giao diện desktop/mobile và prototype. Xác nhận số màn hình và phạm vi bàn giao."
            : "Đề xuất: key visual và bộ ấn phẩm chiến dịch. Xác nhận kênh truyền thông, kích thước và số lượng.",
    };
    const budgetMatch = raw.match(
      /(?:ngân sách|budget)\s*[:=]?\s*([\d.,]+)\s*(triệu|tr|million|nghìn|ngàn|k|tỷ|vnđ|vnd)?/i,
    );
    let extractedBudget = false;
    if (budgetMatch && !$("#brief-budget").value) {
      const unit = (budgetMatch[2] || "").toLowerCase(),
        factor = /triệu|^tr$|million/.test(unit)
          ? 1e6
          : /nghìn|ngàn|^k$/.test(unit)
            ? 1e3
            : unit === "tỷ"
              ? 1e9
              : 1;
      const value =
        Number(
          factor === 1
            ? budgetMatch[1].replace(/[.,]/g, "")
            : budgetMatch[1].replace(",", "."),
        ) * factor;
      if (Number.isSafeInteger(value) && value > 0) {
        $("#brief-budget").value = value;
        extractedBudget = true;
      }
    }
    fields.forEach((id) => ($("#" + id).value = values[id].slice(0, 2000)));
    explanation = `Đã giữ mô tả gốc và sắp xếp thành 5 phần. ${nature ? "Từ khóa thiên nhiên/xanh gợi ý cảm xúc tự nhiên." : "Phong cách được đề xuất theo loại dự án " + p.category + "."} ${young ? "Có tín hiệu về đối tượng người trẻ." : "Đối tượng chưa rõ, cần bạn bổ sung."} ${extractedBudget ? "Đã nhận diện ngân sách từ mô tả; hãy kiểm tra con số." : "Ngân sách và ngày bàn giao dùng thông tin bạn nhập."} Các nội dung đề xuất cần được xác nhận; đây là mô phỏng bằng quy tắc.`;
    $("#generating").hidden = true;
    $("#brief-result").setAttribute("aria-busy", "false");
    $$(
      "#brief-workspace button, #brief-workspace input, #brief-workspace textarea",
    ).forEach((el) => (el.disabled = false));
    busy = false;
    markDirty(true);
    showResult();
    state();
    toast("Đã tạo gợi ý. Hãy rà soát các thông tin cần xác nhận.");
  }
  function replaceResult(action, title) {
    if (readonly || busy) return;
    const hasContent =
      !$("#structured-form").hidden &&
      fields.some((id) => $("#" + id).value.trim());
    if (hasContent) {
      CS.confirmAction(
        title,
        "Nội dung 5 phần đang hiển thị sẽ được thay thế. Mô tả ý tưởng, ngân sách và ngày bàn giao được giữ lại. Chọn Hủy nếu bạn muốn lưu bản hiện tại trước.",
        action,
        "Thay thế nội dung",
      );
    } else action();
  }
  $("#generate").onclick = $("#regenerate").onclick = () => {
    if ($("#raw-idea").value.trim().length <= 20 || !validate(false)) {
      generate();
      return;
    }
    replaceResult(generate, "Tạo lại brief và thay nội dung hiện tại?");
  };
  $("#manual").onclick = () =>
    replaceResult(() => {
      source = "manual";
      explanation =
        "Bạn chủ động viết 5 phần định hướng. Hãy xác nhận nội dung và phạm vi trước khi gửi.";
      fields.forEach((id) => ($("#" + id).value = ""));
      accepted = false;
      submitted = false;
      showResult();
      state();
      markDirty(true);
      $("#goal").focus();
    }, "Chuyển sang brief viết thủ công?");
  $("#accept").onclick = () => {
    if (!validate()) return;
    accepted = true;
    submitted = false;
    if (update(p.id, (project) => (project.brief = collect()))) {
      markDirty(false);
      state();
      $("#save-note").textContent =
        "Đã lưu nội dung được chấp nhận vào trình duyệt.";
      toast("Đã chấp nhận và lưu brief.");
    } else {
      accepted = false;
      state();
    }
  };
  $("#reject").onclick = () =>
    CS.confirmAction(
      "Từ chối kết quả hiện tại?",
      "Nội dung 5 phần sẽ được xóa trên màn hình. Mô tả ban đầu được giữ để bạn tạo lại hoặc tự viết.",
      () => {
        fields.forEach((id) => ($("#" + id).value = ""));
        accepted = false;
        submitted = false;
        $("#structured-form").hidden = true;
        $("#result-placeholder").hidden = false;
        $("#result-source").textContent = "Đã từ chối";
        markDirty(true);
        state();
      },
    );
  $("#save-draft").onclick = () => {
    if (readonly || busy || !validate(false)) return;
    if (submitted && !dirty) {
      toast(
        "Brief này đã được gửi và lưu. Chỉnh sửa nội dung nếu bạn muốn tạo bản nháp mới.",
      );
      return;
    }
    submitted = false;
    if (update(p.id, (project) => (project.brief = collect()))) {
      state();
      markDirty(false);
      $("#save-note").textContent = "Đã lưu bản nháp vào trình duyệt.";
      toast("Đã lưu bản nháp.");
    }
  };
  $("#save-draft-bottom").onclick = () => $("#save-draft").click();
  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
      event.preventDefault();
      if (!readonly && !busy) $("#save-draft").click();
    }
  });
  $("#structured-form").onsubmit = (e) => {
    e.preventDefault();
    if (readonly || busy || submitted || !accepted || !validate()) return;
    submitted = true;
    if (
      update(p.id, (project) => {
        project.brief = collect();
        project.deadline = $("#brief-deadline").value;
        project.budget = collect().budget;
        project.progress = Math.max(project.progress, 20);
      })
    ) {
      markDirty(false);
      state();
      CS.notify(`Brief của ${p.name} đã được gửi cho đội ngũ.`, p.id, "brief");
      $("#save-note").textContent =
        "Đã gửi brief. Bạn có thể theo dõi ở trang dự án.";
      toast("Đã gửi brief thành công.");
    } else {
      submitted = false;
      state();
    }
  };
  if (readonly) {
    $("#save-draft-bottom").disabled = true;
    $$(
      "#brief-workspace input, #brief-workspace textarea, #brief-workspace button",
    ).forEach((el) => (el.disabled = true));
  }
})();
