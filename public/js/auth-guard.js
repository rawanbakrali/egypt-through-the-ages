// public/js/auth-guard.js

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    const target = e.target.closest('.require-auth');
    if (!target) return;

    const isRegularUser = window.IS_LOGGED_IN && window.CURRENT_USER_ROLE === 'user';

    if (!window.IS_LOGGED_IN) {
      e.preventDefault();
      e.stopPropagation();

      const label = target.dataset.authLabel || 'do that';
      window.openAuthModal('login', `Sign in to ${label}.`);
      return;
    }

    if (!isRegularUser) {
      // Logged in, but as admin (or any non-"user" role) — block silently,
      e.preventDefault();
      e.stopPropagation();
      window.showToast('This action is only available to regular user accounts.');
      return;
    }
    // Logged in as a regular user — let the click proceed normally.
  }, true); 
});