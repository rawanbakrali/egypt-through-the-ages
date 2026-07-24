// public/js/auth-guard.js
//
// Global click interceptor for any button/link marked class="require-auth".
// If the user is logged out, the action is blocked and the auth modal opens
// with a contextual message. If logged in, the click passes through normally.

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
      // no modal needed since the person is already authenticated.
      e.preventDefault();
      e.stopPropagation();
      window.showToast('This action is only available to regular user accounts.');
      return;
    }
    // Logged in as a regular user — let the click proceed normally.
  }, true); // capture phase, so this runs before other click listeners (e.g. Favorite's own toggle handler)
});