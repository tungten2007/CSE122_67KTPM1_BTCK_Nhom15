"use strict";
const { $, $$, login, toast } = CS;
const requested = new URLSearchParams(location.search).get("role");
const selected = CS.roles.includes(requested) ? requested : CS.preferredRole();
$("#login-role").value = selected;
function describeRole() {
  const role = $("#login-role").value;
  $("#role-help").textContent =
    role === "Client"
      ? "Có đầy đủ luồng dự án, viết brief và duyệt thiết kế trong bộ SV1."
      : "Bộ SV1 chưa có màn hình của vai trò này. Đăng nhập sẽ mở thông báo phạm vi demo và cho phép quay lại Khách hàng.";
  $$("[data-role]").forEach((button) =>
    button.classList.toggle("selected", button.dataset.role === role),
  );
}
$("#login-role").onchange = describeRole;
describeRole();
$("#quick-client").onclick = () => {
  if (login("Client")) location.href = "client-project-overview.html";
};
for (const id of ["email", "password"]) {
  $("#" + id).addEventListener("input", () => {
    const input = $("#" + id);
    if (input.getAttribute("aria-invalid") !== "true") return;
    const valid =
      id === "email" ? input.validity.valid : input.value.length >= 6;
    if (valid) {
      input.removeAttribute("aria-invalid");
      $("#" + id + "-error").textContent = "";
    }
  });
}
$$("[data-role]").forEach((button) => {
  if (button.dataset.role === selected) button.classList.add("selected");
  button.onclick = () => {
    if (login(button.dataset.role))
      location.href = "client-project-overview.html";
  };
});
$("#toggle-password").onclick = (e) => {
  const visible = $("#password").type === "password";
  $("#password").type = visible ? "text" : "password";
  e.target.textContent = visible ? "Ẩn" : "Hiện";
  e.target.setAttribute(
    "aria-label",
    visible ? "Ẩn mật khẩu" : "Hiện mật khẩu",
  );
  e.target.setAttribute("aria-pressed", String(visible));
};
$("#login-form").onsubmit = async (e) => {
  e.preventDefault();
  const email = $("#email"),
    pass = $("#password");
  const emailValid = email.validity.valid && email.value.trim();
  const passValid = pass.value.length >= 6;
  $("#email-error").textContent = emailValid
    ? ""
    : "Vui lòng nhập địa chỉ email hợp lệ.";
  $("#password-error").textContent = passValid
    ? ""
    : "Mật khẩu demo cần ít nhất 6 ký tự.";
  email.setAttribute("aria-invalid", String(!emailValid));
  pass.setAttribute("aria-invalid", String(!passValid));
  if (!emailValid || !passValid) {
    (!emailValid ? email : pass).focus();
    return;
  }
  $("#login-submit").disabled = true;
  $("#login-status").textContent = "Đang tạo phiên demo…";
  await new Promise((r) => setTimeout(r, 450));
  if (login($("#login-role").value, email.value.trim())) {
    pass.value = "";
    location.href = "client-project-overview.html";
  } else {
    $("#login-submit").disabled = false;
    $("#login-status").textContent =
      "Không thể tạo phiên. Vui lòng bật quyền lưu trữ trình duyệt.";
  }
};
