"use strict";
(async () => {
  const { $, $$, toast, update } = CS;
  if (!(await CS.init()) || !CS.shell("brief", "Creative Brief")) return;
  const p = CS.selectProject("#project-select", "client-creative-brief");
  if (!p) {
    $("#brief-workspace").hidden = true;
    $("#brief-empty").hidden = false;
    if (new URLSearchParams(location.search).has("project"))
      $("#brief-empty h3").textContent = "Dự án không tồn tại hoặc đã bị xóa";
    return;
  }
  const fields = ["goal", "audience", "message", "style", "deliverables"];
  let appliedTemplate=p.brief?.templateId?{id:p.brief.templateId,name:p.brief.templateName,category:p.brief.templateCategory}:null;
  function activeTemplates(){Store.load();return Store.get().briefTemplates.filter(t=>t.status==='Active Template')}
  function renderTemplates(templates,preferred){
    const select=$('#brief-template');select.replaceChildren();
    for(const t of templates){const option=document.createElement('option');option.value=t.id;option.textContent=t.name;select.append(option)}
    if(templates.some(t=>t.id===preferred))select.value=preferred;
    else if(templates.some(t=>t.category===p.category))select.value=templates.find(t=>t.category===p.category).id;
    if(!templates.length){const option=document.createElement('option');option.value='';option.textContent='Chưa có mẫu đang áp dụng';select.append(option)}
    select.disabled=!templates.length;
    $('#template-note').textContent=templates.length?'AI mô phỏng sử dụng ngành hàng và các mục trong mẫu đã chọn.':'Chưa có mẫu hoạt động. Bạn vẫn có thể chọn Tự viết brief.';
  }
  renderTemplates(activeTemplates(),p.brief?.templateId);
  $('#brief-template').onchange=()=>{appliedTemplate=null;edited()};
  const readonly = p.status === "Archived";
  let accepted = false,
    source = "manual",
    explanation = "",
    round = 0,
    busy = false,
    submitted = false;
  $("#raw-idea").value = p.brief?.raw ?? p.description;
  $("#brief-budget").value = p.brief?.budget ?? p.budget ?? "";
  $("#brief-deadline").value = p.brief?.deadline ?? p.deadline;
  if(p.brief?.reason){const note=document.createElement('p');note.setAttribute('role','status');note.textContent='Lead yêu cầu bổ sung: '+p.brief.reason;$('#brief-workspace').prepend(note);}
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
    $("#submit-brief").disabled = readonly || !accepted;
    $("#accepted-note").textContent = accepted
      ? "✓ Nội dung đã xác nhận và lưu. Bạn có thể gửi brief cho đội ngũ."
      : "Vui lòng rà soát và chấp nhận nội dung trước khi gửi.";
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
      templateId:appliedTemplate?.id||null,
      templateName:appliedTemplate?.name||null,
      templateCategory:appliedTemplate?.category||null,
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
  function edited() {
    accepted = false;
    submitted = false;
    state();
    uncertainty();
    $("#save-note").textContent =
      "Có thay đổi chưa lưu. Hãy chọn Lưu bản nháp hoặc xác nhận lại.";
  }
  $("#raw-idea").oninput = () => {
    count();
    edited();
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
    let template;
    try{const templates=activeTemplates(),chosen=$('#brief-template').value;template=templates.find(t=>t.id===chosen);renderTemplates(templates,chosen);if(!template)throw Error('Mẫu đã tạm ngừng hoặc không còn tồn tại. Chọn mẫu đang áp dụng, thử lại hoặc Tự viết brief.')}catch(err){$('#brief-error').textContent=err.message;return}
    busy = true;
    $('#brief-template').disabled=true;
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
        : template.category === "UI/UX"
          ? "Giao diện rõ ràng, hiện đại; ưu tiên khả năng đọc và trải nghiệm trên thiết bị di động."
          : "Bố cục rõ ràng, có điểm nhấn. Cần bổ sung màu sắc, cảm xúc và mẫu tham khảo.",
      deliverables:
        template.category === "Branding"
          ? "Đề xuất: logo, bảng màu, typography và hướng dẫn nhận diện cơ bản. Xác nhận số lượng, định dạng và phạm vi bàn giao."
          : template.category === "UI/UX"
            ? "Đề xuất: sitemap, wireframe, giao diện desktop/mobile và prototype. Xác nhận số màn hình và phạm vi bàn giao."
            : template.category === "Packaging" ? "Đề xuất: thiết kế bao bì, nhãn sản phẩm và quy cách in. Xác nhận kích thước, chất liệu, số lượng và định dạng bàn giao." : "Đề xuất: key visual và bộ ấn phẩm chiến dịch. Xác nhận kênh truyền thông, kích thước và số lượng.",
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
    if(template.sections?.length)values.deliverables+="\nCác mục cần xác nhận theo mẫu: "+template.sections.join("; ")+". Bạn có thể chỉnh sửa trước khi lưu.";
    appliedTemplate={id:template.id,name:template.name,category:template.category};
    fields.forEach((id) => ($("#" + id).value = values[id].slice(0, 2000)));
    explanation = `Đã giữ mô tả gốc và sắp xếp thành 5 phần. ${nature ? "Từ khóa thiên nhiên/xanh gợi ý cảm xúc tự nhiên." : "Phong cách được đề xuất theo loại dự án " + template.category + "."} ${young ? "Có tín hiệu về đối tượng người trẻ." : "Đối tượng chưa rõ, cần bạn bổ sung."} ${extractedBudget ? "Đã nhận diện ngân sách từ mô tả; hãy kiểm tra con số." : "Ngân sách và ngày bàn giao dùng thông tin bạn nhập."} Các nội dung đề xuất cần được xác nhận; đây là mô phỏng bằng quy tắc.`;
    explanation+=" Mẫu đang áp dụng: "+template.name+". Đây là mô phỏng theo ngành hàng và các mục của mẫu, không thực thi prompt bằng mô hình ngôn ngữ.";
    $("#brief-template").disabled=false;
    $("#generating").hidden = true;
    $("#brief-result").setAttribute("aria-busy", "false");
    $$(
      "#brief-workspace button, #brief-workspace input, #brief-workspace textarea",
    ).forEach((el) => (el.disabled = false));
    busy = false;
    showResult();
    state();
    toast("Đã tạo gợi ý. Hãy rà soát các thông tin cần xác nhận.");
  }
  $("#generate").onclick = $("#regenerate").onclick = generate;
  $("#manual").onclick = () => {
    appliedTemplate=null;
    $("#brief-error").textContent="";
    source = "manual";
    explanation =
      "Bạn chủ động viết 5 phần định hướng. Hãy xác nhận nội dung và phạm vi trước khi gửi.";
    fields.forEach((id) => ($("#" + id).value = ""));
    accepted = false;
    submitted = false;
    showResult();
    state();
    $("#goal").focus();
  };
  $("#accept").onclick = () => {
    if (!validate()) return;
    accepted = true;
    submitted = false;
    if (update(p.id, (project) => (project.brief = collect()))) {
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
        state();
      },
    );
  $("#save-draft").onclick = () => {
    if (!validate(false)) return;
    submitted = false;
    if (update(p.id, (project) => (project.brief = collect()))) {
      state();
      $("#save-note").textContent = "Đã lưu bản nháp vào trình duyệt.";
      toast("Đã lưu bản nháp.");
    }
  };
  $("#structured-form").onsubmit = (e) => {
    e.preventDefault();
    if (readonly || !accepted || !validate()) return;
    submitted = true;
    if (
      update(p.id, (project) => {
        project.brief = collect();
        project.deadline = $("#brief-deadline").value;
        project.budget = collect().budget;
        project.progress = Math.max(project.progress, 20);
      })
    ) {
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
  if (readonly)
    $$(
      "#brief-workspace input, #brief-workspace textarea, #brief-workspace select, #brief-workspace button",
    ).forEach((el) => (el.disabled = true));
})();
