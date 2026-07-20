// public/js/favorites.js

document.addEventListener('DOMContentLoaded', () => {
  const favoriteBtn = document.getElementById('drawerFavoriteBtn');
  if (!favoriteBtn) return;

  const icon = favoriteBtn.querySelector('svg');

  favoriteBtn.addEventListener('click', () => {
    const isActive = favoriteBtn.classList.toggle('is-active');
    icon.setAttribute('fill', isActive ? 'currentColor' : 'none');
    favoriteBtn.setAttribute('aria-pressed', isActive);
  });
});