
document.addEventListener('DOMContentLoaded', () => {
  initTabs();
  initListsToolbar();
  initEditProfileModal();
});

// ---- tab switching ----
function initTabs() {
  const tabButtons = document.querySelectorAll('.tab');
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabName = btn.getAttribute('data-tab');

      tabButtons.forEach(t => t.classList.toggle('is-active', t === btn));
      document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.toggle('is-active', panel.id === 'panel-' + tabName);
      });
    });
  });
}

// ---- Lists tab: filter pills, sort dropdown, grid/list view ----
function initListsToolbar() {
  const grid = document.getElementById('listsGrid');
  if (!grid) return;

  let currentFilter = 'all';
  let currentSort = 'recent';
  let currentView = 'grid';

  function apply() {
    const cards = Array.from(grid.querySelectorAll('.place-card'));

    let visibleCount = 0;
    cards.forEach(card => {
      const status = card.getAttribute('data-status');
      const show = currentFilter === 'all' || status === currentFilter;
      card.hidden = !show;
      if (show) visibleCount++;
    });

    cards.sort((a, b) => {
      if (currentSort === 'name') {
        return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
      } else if (currentSort === 'rating') {
        return parseFloat(b.getAttribute('data-rating')) - parseFloat(a.getAttribute('data-rating'));
      } else if (currentSort === 'location') {
        return a.getAttribute('data-location').localeCompare(b.getAttribute('data-location'));
      }
      return b.getAttribute('data-date').localeCompare(a.getAttribute('data-date'));
    });
    cards.forEach(card => grid.appendChild(card));

    grid.classList.toggle('is-list', currentView === 'list');

    const emptyState = document.getElementById('listsEmpty');
    if (emptyState) emptyState.hidden = visibleCount !== 0;
  }

  document.querySelectorAll('.pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('.pill').forEach(p => p.classList.remove('is-active'));
      pill.classList.add('is-active');
      currentFilter = pill.getAttribute('data-filter');
      apply();
    });
  });

  const sortSelect = document.getElementById('sortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      apply();
    });
  }

  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      currentView = btn.getAttribute('data-view');
      apply();
    });
  });

  apply(); // run once on load so the empty-state check is correct immediately
}

// ---- Edit Profile modal 
function initEditProfileModal() {
  const modal = document.getElementById('modalBackdrop');
  const openBtn = document.getElementById('editProfileBtn');
  const closeBtn = document.getElementById('modalClose');
  const cancelBtn = document.getElementById('modalCancel');
  const form = document.getElementById('editProfileForm');
  if (!modal || !form) return;

  function open() { modal.hidden = false; }
  function close() { modal.hidden = true; }

  openBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  cancelBtn.addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const payload = {
      username: document.getElementById('inputName').value.trim(),
      bio: document.getElementById('inputBio').value.trim(),
      location: document.getElementById('inputLocation').value.trim()
    };

    try {
      const res = await fetch('/account', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (!data.success) {
        showToast(data.message || 'Failed to update profile.');
        return;
      }

      showToast('Profile updated');
      close();
      // Reload so the page reflects the real, saved data everywhere
      setTimeout(() => window.location.reload(), 600);
    } catch (err) {
      showToast('Network error — could not update profile.');
    }
  });
}

// ---- toast ----
let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.hidden = true; }, 2400);
}