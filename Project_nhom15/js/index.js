"use strict";
document.querySelector("#hero-demo").onclick = () => {
  if (CS.login("Client")) location.href = CS.home();
};
document.querySelectorAll("[data-role]").forEach(
  (button) =>
    (button.onclick = () => {
      if (CS.login(button.dataset.role))
        location.href = CS.home();
    }),
);

// Disclosure menus use normal links: Tab navigates, Escape closes and restores focus.
const landingNav = document.querySelector('.public-header nav');
const disclosures = [...landingNav.querySelectorAll('.nav-disclosure')];
function closeLandingMenus(restoreFocus = false) {
  const opened = disclosures.find(button => button.getAttribute('aria-expanded') === 'true');
  disclosures.forEach(button => {
    button.setAttribute('aria-expanded', 'false');
    document.getElementById(button.getAttribute('aria-controls')).hidden = true;
  });
  if (restoreFocus) opened?.focus();
}
disclosures.forEach(button => {
  const panel = document.getElementById(button.getAttribute('aria-controls'));
  button.addEventListener('click', () => {
    const open = button.getAttribute('aria-expanded') !== 'true';
    closeLandingMenus();
    if (open) { button.setAttribute('aria-expanded', 'true'); panel.hidden = false; }
  });
  button.addEventListener('keydown', event => {
    if (event.key !== 'ArrowDown') return;
    event.preventDefault();
    closeLandingMenus();
    button.setAttribute('aria-expanded', 'true'); panel.hidden = false;
    panel.querySelector('a').focus();
  });
});
document.addEventListener('click', event => {
  if (!event.target.closest('.nav-dropdown')) closeLandingMenus();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && disclosures.some(button => button.getAttribute('aria-expanded') === 'true')) {
    event.preventDefault(); closeLandingMenus(true);
  }
});
landingNav.addEventListener('focusout', () => {
  requestAnimationFrame(() => { if (!landingNav.contains(document.activeElement)) closeLandingMenus(); });
});
landingNav.querySelectorAll('.mega-link').forEach(link => {
  link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    if (link.dataset.demoPage) {
      event.preventDefault();
      if (CS.login(link.dataset.demoRole)) {
        const data = Store.get();
        const project = data.projects.find(p => !p.archived) || data.projects[0];
        if (project) sessionStorage.setItem('cs-project', project.id);
        location.href = link.dataset.demoPage + (project ? '?project=' + encodeURIComponent(project.id) : '');
      }
    }
    closeLandingMenus();
    if (link.hash) document.getElementById(link.hash.slice(1))?.focus({preventScroll:true});
  });
});
