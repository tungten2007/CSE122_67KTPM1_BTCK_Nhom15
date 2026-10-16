/* Same-document navigation for workspace menus. No changes to demo permissions. */
window.WorkspaceNavigation = (() => {
  const pages = new Set([
    'client-project-overview.html', 'client-creative-brief.html', 'client-review-versions.html',
    'designer-dashboard.html', 'designer-moodboard.html', 'designer-version-management.html',
    'lead-task-board.html', 'lead-internal-review.html', 'lead-feedback-summary.html',
    'admin-brief-template-management.html', 'admin-user-management.html', 'admin-project-settings.html',
    'profile.html', 'notifications.html',
  ]);
  const persistentScripts = new Set(['data.js', 'store.js', 'navigation.js', 'workspace-navigation.js']);
  let controller = new AbortController(), busy = false, queued;
  const cache = new Map();
  const file = url => url.pathname.split('/').at(-1);
  const supported = /^https?:$/.test(location.protocol);
  const canOpen = url => supported && url.origin === location.origin &&
    url.pathname.slice(0, url.pathname.lastIndexOf('/')) === location.pathname.slice(0, location.pathname.lastIndexOf('/')) && pages.has(file(url));

  function ready(fn) {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, {once:true, signal:controller.signal});
    else fn();
  }

  async function readPage(url) {
    const key = url.pathname;
    if (cache.has(key)) return cache.get(key);
    const response = await fetch(key, {credentials:'same-origin'});
    if (!response.ok) throw Error('Không tải được trang.');
    const text = await response.text();
    cache.set(key, text);
    return text;
  }

  async function prepare(url) {
    const doc = new DOMParser().parseFromString(await readPage(url), 'text/html');
    if (!doc.querySelector('script[src$="modules/navigation.js"]')) throw Error('Trang không thuộc không gian làm việc.');
    const styles = [...doc.querySelectorAll('link[rel="stylesheet"]')].map(link => new URL(link.getAttribute('href'), url).href);
    if (window.CS?.session()?.role === 'Client' && ['profile.html','notifications.html'].includes(file(url))) styles.push(new URL('css/client-account.css', url).href);
    // Fetch scripts before changing the visible document. Only repository scripts are accepted.
    const scripts = await Promise.all([...doc.querySelectorAll('script')].map(async source => {
      if (!source.src) return /WorkspaceNavigation\.ready\s*\(/.test(source.textContent) ? {text:source.textContent} : null;
      const src = new URL(source.getAttribute('src'), url);
      if (persistentScripts.has(file(src))) return null;
      if (src.origin !== location.origin || !src.pathname.startsWith(new URL('js/', url).pathname)) throw Error('Script không hợp lệ.');
      const response = await fetch(src.href, {credentials:'same-origin'});
      if (!response.ok) throw Error('Không tải được mã của trang.');
      return {text:await response.text(), src:src.href};
    }));
    const oldStyles = [...document.querySelectorAll('link[rel="stylesheet"]')];
    const added = [];
    await Promise.all(styles.map(href => {
      if (oldStyles.some(link => !link.disabled && link.href === href)) return;
      return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet'; link.href = href; link.media = 'not all';
        link.onload = resolve; link.onerror = () => reject(Error('Không tải được giao diện.'));
        document.head.append(link); added.push(link);
      });
    })).catch(error => {added.forEach(link => link.remove()); throw error;});
    return {doc, scripts:scripts.filter(Boolean), styles, added, oldStyles};
  }

  async function navigate(url, push = true) {
    if (busy) { queued = {url, push}; return; }
    busy = true;
    document.querySelector('main')?.setAttribute('aria-busy', 'true');
    try {
      const page = await prepare(url);
      const update = async () => {
        controller.abort(); controller = new AbortController();
        if (push) history.pushState({workspace:true}, '', url.href);
        page.oldStyles.forEach(link => {if (!page.styles.includes(link.href) || link.disabled) link.remove();});
        page.added.forEach(link => {link.media = 'all';});
        document.title = page.doc.title;
        document.body.className = '';
        document.body.replaceChildren(...[...page.doc.body.childNodes].filter(node => node.nodeName !== 'SCRIPT').map(node => document.importNode(node, true)));
        for (const script of page.scripts) {
          const element = document.createElement('script');
          element.textContent = script.text + (script.src ? '\n//# sourceURL=' + script.src : '');
          document.body.append(element); element.remove();
          await Promise.resolve();
        }
        if (!document.querySelector('main')) throw Error('Chưa dựng được nội dung.');
        window.scrollTo({top:0, left:0, behavior:'instant'});
        document.querySelector('main').focus({preventScroll:true});
      };
      if (document.startViewTransition && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
        const transition = document.startViewTransition(update);
        transition.finished.catch(() => {});
        await transition.updateCallbackDone;
        await transition.finished.catch(() => {});
      } else await update();
    } catch {
      location.assign(url.href);
    } finally {
      busy = false;
      document.querySelector('main')?.removeAttribute('aria-busy');
      if (queued) {const next = queued; queued = null; navigate(next.url, next.push);}
    }
  }

  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (!link || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || link.target || link.hasAttribute('download')) return;
    if (!link.closest('.sidebar nav') && !link.matches('#activity-bell,.top-actions > a.avatar')) return;
    const url = new URL(link.href);
    if (!canOpen(url)) return;
    event.preventDefault();
    if (url.href === location.href && !busy) return;
    navigate(url);
  });
  document.addEventListener('pointerover', event => {
    const link = event.target.closest('.sidebar nav a[href]');
    if (link) {const url = new URL(link.href); if (canOpen(url)) readPage(url).catch(() => {});}
  }, {passive:true});
  window.addEventListener('popstate', () => {
    const url = new URL(location.href);
    if (canOpen(url)) navigate(url, false);
    else location.reload();
  });
  if (supported && pages.has(file(new URL(location.href)))) history.replaceState({workspace:true}, '');
  return {ready, get signal() {return controller.signal;}};
})();
