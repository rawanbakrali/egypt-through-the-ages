// public/js/auth.js

(function () {
  const overlay = document.getElementById('authModalOverlay');
  const closeBtn = document.getElementById('authModalClose');
  const messageBox = document.getElementById('authModalMessage');

  const views = {
    login: document.getElementById('authViewLogin'),
    register: document.getElementById('authViewRegister'),
    forgot: document.getElementById('authViewForgot')
  };

  function showMessage(text, type) {
    messageBox.textContent = text;
    messageBox.className = 'auth-modal-message' + (type === 'success' ? ' success' : '');
    messageBox.style.display = 'block';
  }

  function clearMessage() {
    messageBox.style.display = 'none';
    messageBox.textContent = '';
  }

  function switchView(viewName) {
    clearMessage();
    Object.values(views).forEach(v => v.classList.remove('active'));
    if (views[viewName]) views[viewName].classList.add('active');
  }

  function openAuthModal(viewName, message) {
    switchView(viewName || 'login');
    if (message) showMessage(message, 'info');

    // Capture the current page so login can send the person back here
    const redirectField = document.getElementById('loginRedirectTo');
    if (redirectField) redirectField.value = window.location.pathname;

    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeAuthModal() {
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeAuthModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeAuthModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeAuthModal();
  });

  document.querySelectorAll('[data-switch-to]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      switchView(link.dataset.switchTo);
    });
  });

  // LOGIN
  document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessage();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const redirectTo = document.getElementById('loginRedirectTo').value;

    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&redirectTo=${encodeURIComponent(redirectTo)}`
    });
    const data = await res.json();

    if (data.success) {
      window.location.href = data.redirectTo || '/';
    } else {
      showMessage(data.message || 'Login failed.', 'error');
    }
  });
  
  // REGISTER
  document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessage();
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;

    const res = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `username=${encodeURIComponent(username)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&confirmPassword=${encodeURIComponent(confirmPassword)}`
    });
    const data = await res.json();

    if (data.success) {
      window.location.reload();
    } else {
      showMessage(data.message || 'Registration failed.', 'error');
    }
  });

  // FORGOT PASSWORD — real email sent
  document.getElementById('forgotForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    clearMessage();
    const email = document.getElementById('forgotEmail').value;

    try {
      const res = await fetch('/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      showMessage(data.message, data.success ? 'success' : 'error');
    } catch (err) {
      showMessage('Network error — please try again.', 'error');
    }
  });

  window.openAuthModal = openAuthModal;
})();