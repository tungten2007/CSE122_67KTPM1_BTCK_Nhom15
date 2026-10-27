"use strict";
Store.load();
const form=document.getElementById('register-form'),status=document.getElementById('register-status'),button=document.getElementById('register-submit');
const fields=['name','email','password','confirm'].map(key=>document.getElementById('register-'+key));
function setError(field,message){field.setAttribute('aria-invalid',String(!!message));document.getElementById(field.id+'-error').textContent=message;}
for(const field of fields)field.oninput=()=>{setError(field,'');status.textContent='';};
form.onsubmit=event=>{
 event.preventDefault();if(form.dataset.submitting==='true')return;
 status.textContent='';fields.forEach(field=>setError(field,''));
 const [name,email,password,confirm]=fields,errors=[];
 if(name.value.trim().length<2)errors.push([name,'Nhập họ tên từ 2 ký tự.']);
 if(!email.validity.valid||!email.value.trim())errors.push([email,'Nhập email hợp lệ.']);
 if(password.value.length<6)errors.push([password,'Mật khẩu demo cần ít nhất 6 ký tự.']);
 if(password.value!==confirm.value)errors.push([confirm,'Mật khẩu xác nhận không khớp.']);
 if(errors.length){errors.forEach(([field,message])=>setError(field,message));status.textContent=errors[0][1];errors[0][0].focus();return;}
 form.dataset.submitting='true';form.setAttribute('aria-busy','true');button.disabled=true;
 try{
  Store.registerClient({name:name.value,email:email.value,password:password.value});
  password.value='';confirm.value='';
  location.href=new URL('html/sv1/login.html?registered='+encodeURIComponent(email.value.trim().toLowerCase()),document.baseURI).href;
 }catch(error){
  status.textContent=error.message;
  if(/email/i.test(error.message)){setError(email,error.message);email.focus();}
  form.dataset.submitting='false';form.removeAttribute('aria-busy');button.disabled=false;
 }
};

