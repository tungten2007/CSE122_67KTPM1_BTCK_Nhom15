try { Store.load(); const user = Navigation.current(Store.get().users); location.replace(Navigation.home(user?.role)); } catch { location.replace('lead-task-board.html'); }
