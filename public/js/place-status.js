// Unified handler for Favorite / Wishlist / Visited toggle buttons.
document.addEventListener('DOMContentLoaded', () => {
  const buttonConfig = [
    { id: 'drawerFavoriteBtn', type: 'favorite' },
    { id: 'drawerWishlistBtn', type: 'wishlist' },
    { id: 'drawerVisitedBtn', type: 'visited' }
  ];

  buttonConfig.forEach(({ id, type }) => {
    const btn = document.getElementById(id);
    if (!btn) return;

    btn.addEventListener('click', async () => {
      if (!window.currentDrawerItem || !window.currentDrawerItem.placeId) return;

      const placeId = window.currentDrawerItem.placeId;
      const icon = btn.querySelector('svg');

      try {
        const res = await fetch(`/status/${type}/toggle`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ placeId })
        });
        const data = await res.json();

        if (!data.success) {
          if (window.showToast) window.showToast(data.message || 'Something went wrong.');
          return;
        }

        btn.classList.toggle('is-active', data.active);
        icon.setAttribute('fill', data.active ? 'currentColor' : 'none');
        btn.setAttribute('aria-pressed', data.active);
      } catch (err) {
        if (window.showToast) window.showToast('Network error — could not update.');
      }
    });
  });

  window.refreshPlaceStatuses = async function (placeId) {
    try {
      const res = await fetch(`/status/${placeId}`);
      const data = await res.json();
      if (!data.success) return;

      buttonConfig.forEach(({ id, type }) => {
        const btn = document.getElementById(id);
        if (!btn) return;
        const icon = btn.querySelector('svg');
        const isActive = data.active[type];
        btn.classList.toggle('is-active', isActive);
        icon.setAttribute('fill', isActive ? 'currentColor' : 'none');
        btn.setAttribute('aria-pressed', isActive);
      });
    } catch (err) {
      console.error('Failed to load place statuses:', err);
    }
  };
});