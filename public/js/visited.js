// public/js/visited.js

document.addEventListener('DOMContentLoaded', () => {
  const visitedBtn = document.getElementById('drawerVisitedBtn');
  if (!visitedBtn) return;

  const icon = visitedBtn.querySelector('svg');

  visitedBtn.addEventListener('click', () => {
    const isActive = visitedBtn.classList.toggle('is-active');
    icon.setAttribute('fill', isActive ? 'currentColor' : 'none');
    visitedBtn.setAttribute('aria-pressed', isActive);
  });
});