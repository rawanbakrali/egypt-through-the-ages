/* ==========================================================================
   Egypt Through the Ages — Admin Management UI Frontend Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initModalTriggers();
  initGlobalSearch();
});

// View Titles Mapping
const VIEW_TITLES = {
  overview: { title: "Dashboard", subtitle: "Welcome back, Admin" },
  places: { title: "Historical Places", subtitle: "Manage historical sites, categories, and published status" },
  events: { title: "Events Management", subtitle: "Review submissions, manage official events, and feature highlights" },
  bookings: { title: "Event Bookings", subtitle: "Track reservations, manage ticket capacities, and override booking status" },
  users: { title: "User Management", subtitle: "Admin accounts, roles, and community permissions" },
  media: { title: "Media Library", subtitle: "Upload, tag, and organize media assets" },
  settings: { title: "Platform Settings", subtitle: "Site configuration, API integrations, and system preferences" }
};

let activeDeletePayload = null;
let activeSubmissionSlug = null;

// ==========================================
// NAVIGATION & VIEW SWITCHING
// ==========================================

function initNavigation() {
  const navItems = document.querySelectorAll('.sidebar-nav .nav-item');
  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const view = item.getAttribute('data-view');
      if (view) switchAdminView(view);
    });
  });
}

function switchAdminView(viewName) {
  // Update sidebar active link
  document.querySelectorAll('.sidebar-nav .nav-item').forEach(el => {
    if (el.getAttribute('data-view') === viewName) {
      el.classList.add('is-active');
    } else {
      el.classList.remove('is-active');
    }
  });

  // Switch view section visibility
  document.querySelectorAll('.view-section').forEach(sec => {
    if (sec.id === `view-${viewName}`) {
      sec.classList.add('is-active');
    } else {
      sec.classList.remove('is-active');
    }
  });

  // Update Header Title
  const info = VIEW_TITLES[viewName] || { title: viewName.toUpperCase(), subtitle: "Admin Portal" };
  const titleEl = document.getElementById('currentViewTitle');
  const subEl = document.getElementById('currentViewSubtitle');
  if (titleEl) titleEl.textContent = info.title;
  if (subEl) subEl.textContent = info.subtitle;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================
// MODAL CONTROLS ("modals go white")
// ==========================================

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
}

function initModalTriggers() {
  // Event listeners for backdrop click to close modal
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeModal(backdrop.id);
      }
    });
  });

  // Add Place triggers
  document.querySelectorAll('.btn-open-add-place').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('modalPlaceTitle').textContent = "Add New Historical Place";
      document.getElementById('formPlace').reset();
      document.getElementById('placeFormId').value = "";
      openModal('modalPlace');
    });
  });

  // Add Event triggers
  document.querySelectorAll('.btn-open-add-event').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('modalEventTitle').textContent = "Add Official Event";
      document.getElementById('formEvent').reset();
      document.getElementById('eventFormSlug').value = "";
      openModal('modalEvent');
    });
  });

  // Drawer Toggle
  const drawerBtn = document.getElementById('toggleNotificationsDrawer');
  if (drawerBtn) {
    drawerBtn.addEventListener('click', () => toggleDrawer('drawerNotifications'));
  }
}

function toggleDrawer(drawerId) {
  const drawer = document.getElementById(drawerId);
  if (drawer) {
    drawer.classList.toggle('is-open');
  }
}

// ==========================================
// HISTORICAL PLACES FORM & STATUS TOGGLE
// ==========================================

async function togglePlaceStatus(placeId) {
  try {
    const res = await fetch(`/admin/places/${placeId}/status`, { method: 'PATCH' });
    const data = await res.json();

    if (!data.success) {
      showToast(data.message || 'Failed to update status.');
      return;
    }

    document.querySelectorAll(`tr[data-id="${placeId}"]`).forEach(row => {
      const badge = row.querySelector('.status-badge');
      if (badge) {
        const isPublished = data.status === 'published';
        badge.classList.toggle('badge-published', isPublished);
        badge.classList.toggle('badge-draft', !isPublished);
        badge.textContent = isPublished ? 'Published' : 'Draft';
      }
    });
    showToast(`Place status updated to ${data.status === 'published' ? 'Published' : 'Draft'}`);
  } catch (err) {
    showToast('Network error — could not update status.');
  }
}

function openEditPlaceModal(placeId) {
  const row = document.querySelector(`tr[data-id="${placeId}"]`);
  if (!row) return;

  const title = row.querySelector('.cell-title') ? row.querySelector('.cell-title').textContent : '';
  const categoryCell = row.cells[1] ? row.cells[1].textContent : '';
  const badge = row.querySelector('.status-badge');
  const status = badge && badge.textContent.trim().toLowerCase() === 'published' ? 'published' : 'draft';
  const img = row.querySelector('.cell-thumb') ? row.querySelector('.cell-thumb').src : '';

  document.getElementById('modalPlaceTitle').textContent = "Edit Historical Place";
  document.getElementById('placeFormId').value = placeId;
  document.getElementById('placeFormName').value = title;
  document.getElementById('placeFormCategory').value = categoryCell.trim() || 'Ancient Egypt';
  document.getElementById('placeFormStatus').value = status;
  document.getElementById('placeFormLocation').value = "Egypt";
  document.getElementById('placeFormImage').value = img;
  document.getElementById('placeFormDescription').value = `Historical site information for ${title}`;

  openModal('modalPlace');
}

async function handlePlaceFormSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('placeFormId').value;
  const name = document.getElementById('placeFormName').value;
  const category = document.getElementById('placeFormCategory').value;
  const status = document.getElementById('placeFormStatus').value;
  const location = document.getElementById('placeFormLocation').value;
  const image = document.getElementById('placeFormImage').value;
  const description = document.getElementById('placeFormDescription').value;

  const payload = { name, category, status, location, image, description };

  try {
    const url = id ? `/admin/places/${id}` : '/admin/places';
    const method = id ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (!data.success) {
      showToast(data.message || 'Failed to save place.');
      return;
    }

    closeModal('modalPlace');
    // Reload so the table reflects the real, current server-side data —
    // avoids any risk of the page's HTML drifting from actual saved state.
    window.location.reload();
  } catch (err) {
    showToast('Network error — could not save place.');
  }
}

// ==========================================
// EVENTS FORM & SUBMISSIONS
// ==========================================

function openEditEventModal(eventSlug) {
  const row = document.querySelector(`tr[data-id="${eventSlug}"]`);
  if (!row) return;

  const title = row.querySelector('.cell-title') ? row.querySelector('.cell-title').textContent : '';

  document.getElementById('modalEventTitle').textContent = "Edit Event";
  document.getElementById('eventFormSlug').value = eventSlug;
  document.getElementById('eventFormTitle').value = title;
  document.getElementById('eventFormType').value = "official";
  document.getElementById('eventFormCategory').value = "Cultural";
  document.getElementById('eventFormDate').value = "Upcoming";
  document.getElementById('eventFormBookingStatus').value = "open";
  document.getElementById('eventFormLocation').value = "Cairo";
  document.getElementById('eventFormImage').value = "https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=300&q=80";
  document.getElementById('eventFormDescription').value = `Full event details for ${title}`;

  openModal('modalEvent');
}

async function handleEventFormSubmit(e) {
  e.preventDefault();
  const slug = document.getElementById('eventFormSlug').value;
  const title = document.getElementById('eventFormTitle').value;
  const category = document.getElementById('eventFormCategory').value;
  const date = document.getElementById('eventFormDate').value;
  const bookingStatus = document.getElementById('eventFormBookingStatus').value;
  const location = document.getElementById('eventFormLocation').value;
  const image = document.getElementById('eventFormImage').value;
  const description = document.getElementById('eventFormDescription').value;

  const payload = { title, category, date, bookingStatus, location, image, description };

  try {
    const url = slug ? `/admin/events/${slug}` : '/admin/events';
    const method = slug ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json();

    if (!data.success) {
      showToast(data.message || 'Failed to save event.');
      return;
    }

    closeModal('modalEvent');
    window.location.reload();
  } catch (err) {
    showToast('Network error — could not save event.');
  }
}

function filterOverviewEvents(filter, btnEl) {
  const tabs = btnEl.parentElement.querySelectorAll('.tab-btn');
  tabs.forEach(t => t.classList.remove('is-active'));
  btnEl.classList.add('is-active');

  const rows = document.querySelectorAll('#tableEventsOverview tbody tr');
  rows.forEach(row => {
    const type = row.getAttribute('data-type');
    const featured = row.getAttribute('data-featured');

    if (filter === 'all') {
      row.style.display = '';
    } else if (filter === 'submission' && type !== 'official') {
      row.style.display = '';
    } else if (filter === 'featured' && featured === 'true') {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function openReviewSubmissionModal(slug) {
  activeSubmissionSlug = slug;
  const content = document.getElementById('submissionReviewContent');
  const event = (window.ADMIN_EVENTS || []).find(e => e.slug === slug);

  if (content && event) {
    content.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <span class="status-badge badge-submission">${event.type === 'community' ? 'Community Submission' : 'Business Submission'}</span>
          <h4 style="font-family: var(--font-serif); font-size: 1.2rem; margin-top: 0.5rem;">${event.title}</h4>
        </div>
        <div style="background: #f9fafb; padding: 1rem; border-radius: 8px; border: 1px solid #e5e7eb; font-size: 0.85rem;">
          <strong>Description:</strong><br>
          ${event.description}
        </div>
        <div style="font-size: 0.85rem;">
          <strong>Date:</strong> ${event.date} ${event.time || ''}<br>
          <strong>Location:</strong> ${event.location}<br>
          <strong>Category:</strong> ${event.category}
          ${event.ticketUrl ? `<br><strong>Booking Link:</strong> <a href="${event.ticketUrl}" target="_blank">${event.ticketUrl}</a>` : ''}
        </div>
      </div>
    `;
  }
  openModal('modalSubmission');
}

async function handleApproveSubmission() {
  if (activeSubmissionSlug) {
    try {
      const res = await fetch(`/admin/events/${activeSubmissionSlug}/approve`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        closeModal('modalSubmission');
        window.location.reload();
        return;
      }
      showToast(data.message || 'Failed to approve submission.');
    } catch (err) {
      showToast('Network error — could not approve submission.');
    }
  }
  closeModal('modalSubmission');
}

async function handleRejectSubmission() {
  if (activeSubmissionSlug) {
    try {
      const res = await fetch(`/admin/events/${activeSubmissionSlug}/reject`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        closeModal('modalSubmission');
        window.location.reload();
        return;
      }
      showToast(data.message || 'Failed to reject submission.');
    } catch (err) {
      showToast('Network error — could not reject submission.');
    }
  }
  closeModal('modalSubmission');
}

function handleEditSubmission() {
  closeModal('modalSubmission');
  openEditEventModal(activeSubmissionSlug);
}

// ==========================================
// EVENT BOOKINGS OVERRIDE
// ==========================================

function filterOverviewBookings(filter, btnEl) {
  const tabs = btnEl.parentElement.querySelectorAll('.tab-btn');
  tabs.forEach(t => t.classList.remove('is-active'));
  btnEl.classList.add('is-active');

  const rows = document.querySelectorAll('#tableBookingsOverview tbody tr');
  rows.forEach(row => {
    const status = row.getAttribute('data-status');
    if (filter === 'all' || status === filter) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

function openOverrideBookingModal(bookingId, currentStatus) {
  document.getElementById('overrideBookingId').value = bookingId;
  document.getElementById('overrideBookingIdLabel').textContent = bookingId;
  document.getElementById('overrideBookingSelect').value = currentStatus || 'open';
  openModal('modalBooking');
}

function handleBookingOverrideSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('overrideBookingId').value;
  const newStatus = document.getElementById('overrideBookingSelect').value;

  document.querySelectorAll(`tr[data-id="${id}"]`).forEach(row => {
    row.setAttribute('data-status', newStatus);
    const badge = row.querySelector('.status-badge');
    if (badge) {
      badge.className = `status-badge badge-${newStatus}`;
      badge.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1);
    }
  });

  showToast(`Booking ${id} status overridden to ${newStatus.toUpperCase()}`);
  closeModal('modalBooking');
}

// ==========================================
// DELETE CONFIRMATION
// ==========================================

function confirmDelete(type, id, name) {
  activeDeletePayload = { type, id, name };
  document.getElementById('deleteTargetName').textContent = `"${name}"`;
  openModal('modalDelete');
}

async function executeDelete() {
  if (!activeDeletePayload) return;
  const { type, id, name } = activeDeletePayload;

  if (type === 'place') {
    try {
      const res = await fetch(`/admin/places/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (!data.success) {
        showToast(data.message || 'Failed to delete place.');
        closeModal('modalDelete');
        return;
      }

      closeModal('modalDelete');
      window.location.reload();
      return;
    } catch (err) {
      showToast('Network error — could not delete place.');
      closeModal('modalDelete');
      return;
    }
  }

  if (type === 'event') {
    try {
      const res = await fetch(`/admin/events/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!data.success) {
        showToast(data.message || 'Failed to delete event.');
        closeModal('modalDelete');
        return;
      }
      closeModal('modalDelete');
      window.location.reload();
      return;
    } catch (err) {
      showToast('Network error — could not delete event.');
      closeModal('modalDelete');
      return;
    }
  }

  closeModal('modalDelete');
}

// ==========================================
// GLOBAL SEARCH & TOAST SYSTEM
// ==========================================

function initGlobalSearch() {
  const searchInput = document.getElementById('globalAdminSearch');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    const activeSection = document.querySelector('.view-section.is-active');
    if (!activeSection) return;

    const rows = activeSection.querySelectorAll('.admin-table tbody tr');
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      if (text.includes(query)) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  });
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.2s ease';
    setTimeout(() => toast.remove(), 200);
  }, 3000);
}
