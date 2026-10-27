'use strict';

// API đồng bộ cho giao diện SV2. Mọi vai trò dùng Store và một khóa dữ liệu nhóm.
const CreatorStudioAPI = (function () {
  let snapshot = null;
  let readError = null;
  const commands = new Set(['saveTask', 'moveTask', 'saveVersion', 'submitVersionForReview',
    'deleteVersion', 'archiveVersion', 'saveMoodboard', 'saveBriefTemplate',
    'toggleBriefTemplate', 'updateProfile', 'markNotification', 'markAllNotifications',
    'deleteNotification', 'clearAllNotifications', 'reset']);
  function failure(code, error, data) {
    return { ok: false, data: data || null, error: { code: code, message: error.message || String(error) } };
  }
  function load() {
    try {
      const data = Store.load();
      snapshot = localStorage.getItem(Store.KEY);
      readError = null;
      return { ok: true, data: data, error: null };
    } catch (error) {
      readError = error;
      return failure('READ_ERROR', error, CS_SEED());
    }
  }
  function run(command, ...args) {
    try {
      if (readError) throw readError;
      if (snapshot === null) throw Error('Hãy đọc dữ liệu trước khi lưu.');
      if (localStorage.getItem(Store.KEY) !== snapshot) {
        return failure('STALE_DATA', Error('Dữ liệu đã thay đổi ở trang khác. Hãy tải lại trước khi lưu để tránh ghi đè.'));
      }
      if (!commands.has(command)) throw Error('Thao tác dữ liệu không được hỗ trợ.');
      const user = Navigation.current(Store.get().users);
      if (!user?.active) throw Error('Tài khoản không hoạt động.');
      let value;
      if (['markNotification', 'deleteNotification'].includes(command)) {
        if (!Store.get().notifications.some(n => n.id === args[0] && n.userId === user.id)) throw Error('Thông báo không thuộc tài khoản đang dùng.');
        value = Store[command](...args);
      } else if (command === 'reset') {
        value = Store.reset();
      } else {
        value = Store[command](user.id, ...args);
      }
      snapshot = localStorage.getItem(Store.KEY);
      return { ok: true, data: Store.get(), value: value, error: null };
    } catch (error) { return failure('WRITE_ERROR', error); }
  }
  function getCurrentUser() {
    try {
      return { ok: true, data: JSON.parse(localStorage.getItem('currentUser') || 'null'), error: null };
    } catch (error) { return failure('IDENTITY_READ_ERROR', error); }
  }
  function setCurrentUser(user) {
    try {
      Navigation.remember(user);
      return { ok: true, data: { id: user.id, name: user.name, role: user.role }, error: null };
    } catch (error) { return failure('IDENTITY_WRITE_ERROR', error); }
  }
  return { keys: [Store.KEY], load: load, run: run,
    getCurrentUser: getCurrentUser, setCurrentUser: setCurrentUser };
})();
