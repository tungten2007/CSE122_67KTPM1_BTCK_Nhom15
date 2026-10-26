document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // Trang lỗi chỉ cần đọc mã lỗi và chọn đường dẫn quay về.
  if (new URLSearchParams(location.search).get('code') === '403') {
    document.getElementById('err-code').textContent = '403';
    document.getElementById('err-title').textContent = 'Không có quyền truy cập';
    document.getElementById('err-desc').textContent = 'Chọn vai trò phù hợp trên trang chính để mở trang này.';
  }
  let vaiTro = 'Designer';
  vaiTro = CreatorStudioAPI.getCurrentUser().data?.role || vaiTro;
  document.getElementById('safe-home-btn').href = trangChu(vaiTro);

});
