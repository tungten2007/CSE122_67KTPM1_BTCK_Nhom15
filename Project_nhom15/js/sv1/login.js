"use strict";
const { $, $$, login, toast } = CS;
const requested = new URLSearchParams(location.search).get("role");
const selected = CS.roles.includes(requested) ? requested : CS.preferredRole();
$("#login-role").value = selected;
Store.load();
// Only allow known local destinations and use the authenticated account's role.
const featureDestinations = {
  'html/sv1/client-creative-brief.html': 'Client',
  'html/sv2/designer-moodboard.html': 'Designer',
  'html/sv2/designer-version-management.html': 'Designer',
  'html/sv3/lead-feedback-summary.html': 'Creative Lead',
};
const nextPage = new URLSearchParams(location.search).get('next');
const nextRole = Object.hasOwn(featureDestinations, nextPage) ? featureDestinations[nextPage] : null;
if (nextRole) {
  const notice = document.createElement('p');
  notice.className = 'demo-notice';
  notice.textContent = `Đăng nhập bằng tài khoản ${CS.roleLabels[nextRole]} để mở tính năng đã chọn. Nếu dùng vai trò khác, bạn sẽ vào trang tổng quan của tài khoản đó.`;
  document.querySelector('#login-form').before(notice);
}
function destinationAfterLogin() {
  if (!nextRole || CS.session()?.role !== nextRole) return new URL(CS.home(), document.baseURI).href;
  const data = Store.get();
  const project = data.projects.find(p => !p.archived) || data.projects[0];
  if (project) sessionStorage.setItem('cs-project', project.id);
  return new URL(nextPage + (project ? '?project=' + encodeURIComponent(project.id) : ''), document.baseURI).href;
}
function fillSelectedAccount() {
  const user=Store.get().users.find(u=>u.id===$('#login-account').value&&u.active);
  $('#email').value=user?.email||''; $('#password').value=user?(user.demoPassword||'demo123'):'';
}
function fillDemoAccount() {
  const role=$('#login-role').value==='Creative Lead'?'Lead':$('#login-role').value;
  const users=Store.get().users.filter(u=>u.active&&u.role===role);
  $('#login-account').innerHTML='<option value="">Chọn tài khoản mẫu</option>'+users.map(u=>`<option value="${CS.escape(u.id)}">${CS.escape(u.name)} · ${CS.escape(u.email)}</option>`).join('');
  if(users.length===1) $('#login-account').value=users[0].id;
  fillSelectedAccount();
}
$('#login-role').onchange=fillDemoAccount;
$('#login-account').onchange=fillSelectedAccount;
fillDemoAccount();
const registered=new URLSearchParams(location.search).get('registered');
if(registered){$('#email').value=registered;$('#login-status').dataset.kind='success';$('#login-status').textContent='Đăng ký thành công. Nhập mật khẩu demo vừa tạo để đăng nhập.';}
$$("[data-role]").forEach((button) => {
  if (button.dataset.role === selected) button.classList.add("selected");
  button.onclick = () => {
    if ($('#login-role').value !== button.dataset.role) { $('#login-role').value=button.dataset.role; fillDemoAccount(); }
    const account=Store.get().users.find(u=>u.id===$('#login-account').value&&u.active);
    if (!account) { $('#login-status').dataset.kind='progress'; $('#login-status').textContent='Chọn tài khoản mẫu cụ thể trước khi mở demo.'; $('#login-account').focus(); return; }
    if (login(button.dataset.role,account.email)) location.href = destinationAfterLogin();
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
    pass.value='';location.href=destinationAfterLogin();
  } catch(error) {
    $('#login-submit').disabled=false;$('#login-status').dataset.kind='error';$('#login-status').textContent=error.message;pass.focus();
  }
};
