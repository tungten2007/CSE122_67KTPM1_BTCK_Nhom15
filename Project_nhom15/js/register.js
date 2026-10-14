"use strict";
Store.load();
const form=document.getElementById('register-form');
form.onsubmit=event=>{
 event.preventDefault();const status=document.getElementById('register-status');status.textContent='';
 const name=document.getElementById('register-name'),email=document.getElementById('register-email'),password=document.getElementById('register-password'),confirm=document.getElementById('register-confirm');
 try{
  if(name.value.trim().length<2){name.focus();throw Error('Nhập họ tên từ 2 ký tự.');}
  if(!email.validity.valid||!email.value.trim()){email.focus();throw Error('Nhập email hợp lệ.');}
  if(password.value.length<6){password.focus();throw Error('Mật khẩu demo cần ít nhất 6 ký tự.');}
  if(password.value!==confirm.value){confirm.focus();throw Error('Mật khẩu xác nhận không khớp.');}
  Store.registerClient({name:name.value,email:email.value,password:password.value});
  password.value='';confirm.value='';location.href='login.html?registered='+encodeURIComponent(email.value.trim().toLowerCase());
 }catch(error){status.textContent=error.message;}
};
