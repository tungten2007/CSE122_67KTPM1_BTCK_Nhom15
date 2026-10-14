"use strict";
const { $, $$, login, toast } = CS;
const requested = new URLSearchParams(location.search).get("role");
const selected = CS.roles.includes(requested) ? requested : CS.preferredRole();
$("#login-role").value = selected;
Store.load();
function fillDemoAccount(){const role=$('#login-role').value==='Creative Lead'?'Lead':$('#login-role').value;const user=Store.get().users.find(u=>u.active&&u.role===role);if(user){$('#email').value=user.email;$('#password').value=user.demoPassword||'demo123';}}
$('#login-role').onchange=fillDemoAccount;
const registered=new URLSearchParams(location.search).get('registered');
if(registered){$('#email').value=registered;$('#login-status').dataset.kind='success';$('#login-status').textContent='Đăng ký thành công. Nhập mật khẩu demo vừa tạo để đăng nhập.';}else fillDemoAccount();
$$("[data-role]").forEach((button) => {
  if (button.dataset.role === selected) button.classList.add("selected");
  button.onclick = () => {
    if (login(button.dataset.role))
      location.href = CS.home();
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
  $("#login-status").dataset.kind="progress";$("#login-status").textContent = "Đang tạo phiên demo…";
  await new Promise((r) => setTimeout(r, 450));
  try {
    TeamClient.authenticate(email.value.trim(),pass.value);
    pass.value='';location.href=CS.home();
  } catch(error) {
    $('#login-submit').disabled=false;$('#login-status').dataset.kind='error';$('#login-status').textContent=error.message;pass.focus();
  }
};
