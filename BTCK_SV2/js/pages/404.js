/* Logic riêng của 404.html. Các phụ thuộc dùng chung được nạp trước trong HTML. */
document.addEventListener('DOMContentLoaded', () => {
  Store.load();
  const params = new URLSearchParams(window.location.search);
  const code = params.get('code');

  if (code === '403') {
    document.getElementById('err-code').textContent = '403';
    document.getElementById('err-title').textContent = 'Không có quyền truy cập (Forbidden)';
    document.getElementById('err-desc').textContent = 'Vai trò demo hiện tại của bạn không được phân quyền truy cập vào màn hình này. Hãy đổi vai trò phù hợp trên thanh điều hướng hoặc quay về trang an toàn.';
  }

  // Xác định trang home an toàn dựa trên role của người dùng hiện tại
  try {
    const u = Navigation.current(Store.get().users);
    if (u) {
      const homeUrl = Navigation.home(u.role);
      document.getElementById('safe-home-btn').href = homeUrl;
    }
  } catch (e) {}
});
