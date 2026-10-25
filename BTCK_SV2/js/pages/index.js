/* Logic riêng của index.html. Các phụ thuộc dùng chung được nạp trước trong HTML. */
document.addEventListener('DOMContentLoaded', () => {
  Store.load();
  document.querySelectorAll('.screen-card a').forEach(link => {
    link.onclick = () => Navigation.activate(link.getAttribute('href').startsWith('admin-') ? 'Admin' : 'Designer', Store.get().users);
  });

  // Nút Reset data
  document.getElementById('reset-data-btn').onclick = () => {
    if (confirm('Khôi phục toàn bộ dữ liệu mẫu ban đầu của CreatorStudio?')) {
      Store.reset();
      alert('Đã khôi phục dữ liệu mẫu thành công!');
      location.reload();
    }
  };

  // Role switcher buttons
  document.querySelectorAll('.role-btn').forEach(btn => {
    btn.onclick = () => {
      const role = btn.dataset.role;
      try {
        const dest = Navigation.activate(role, Store.get().users);
        location.href = dest;
      } catch (e) {
        alert(e.message);
      }
    };
  });
});
