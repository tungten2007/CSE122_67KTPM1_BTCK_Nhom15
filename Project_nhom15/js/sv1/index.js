"use strict";
document.querySelector("#hero-demo").onclick = () => {
  location.href = new URL("html/sv1/login.html", document.baseURI).href;
};
document.querySelectorAll("[data-role]").forEach(
  (button) =>
    (button.onclick = () => {
      location.href = new URL('html/sv1/login.html?role=', document.baseURI).href + encodeURIComponent(button.dataset.role);
    }),
);

// Disclosure menus use normal links: Tab navigates, Escape closes and restores focus.
const landingNav = document.querySelector('.public-header nav');
// Account for the taller two-row navbar on phones when scrolling to a section.
const landingHeader = document.querySelector('.public-header');
function updateLandingHeaderHeight() {
  document.documentElement.style.setProperty('--landing-header-height', `${landingHeader.offsetHeight}px`);
}
updateLandingHeaderHeight();
new ResizeObserver(updateLandingHeaderHeight).observe(landingHeader);
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
    closeLandingMenus();
    if (link.hash) document.getElementById(link.hash.slice(1))?.focus({preventScroll:true});
  });
});
