// public/js/wishlist.js

document.addEventListener('DOMContentLoaded', () => {
  const wishlistBtn = document.getElementById('drawerWishlistBtn');
  if (!wishlistBtn) return;

  const icon = wishlistBtn.querySelector('svg');

  wishlistBtn.addEventListener('click', () => {
    const isActive = wishlistBtn.classList.toggle('is-active');
    icon.setAttribute('fill', isActive ? 'currentColor' : 'none');
    wishlistBtn.setAttribute('aria-pressed', isActive);
  });
});