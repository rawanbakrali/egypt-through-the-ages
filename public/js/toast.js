// Reusable toast notification. Usage: window.showToast('Your message here');

(function () {
  let toastTimeout = null;

  function showToast(message, duration = 3500) {
    let toastEl = document.getElementById('globalToast');

    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.id = 'globalToast';
      toastEl.className = 'toast-notification';
      document.body.appendChild(toastEl);
    }

    toastEl.textContent = message;
    toastEl.classList.add('is-visible');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastEl.classList.remove('is-visible');
    }, duration);
  }

  window.showToast = showToast;
})();