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

function togglePlaceStatus(placeId) {
  const rows = document.querySelectorAll(`tr[data-id="${placeId}"]`);
  rows.forEach(row => {
    const badge = row.querySelector('.status-badge');
    if (badge) {
      if (badge.classList.contains('badge-published')) {
        badge.classList.remove('badge-published');
        badge.classList.add('badge-draft');
        badge.textContent = 'Draft';
        showToast('Place status updated to Draft');
      } else {
        badge.classList.remove('badge-draft');
        badge.classList.add('badge-published');
        badge.textContent = 'Published';
        showToast('Place published successfully');
      }
    }
  });
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

function handlePlaceFormSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('placeFormId').value;
  const name = document.getElementById('placeFormName').value;
  const category = document.getElementById('placeFormCategory').value;
  const status = document.getElementById('placeFormStatus').value;
  const img = document.getElementById('placeFormImage').value;

  if (id) {
    // Update existing row
    document.querySelectorAll(`tr[data-id="${id}"]`).forEach(row => {
      const titleEl = row.querySelector('.cell-title');
      if (titleEl) titleEl.textContent = name;
      if (row.cells[1]) row.cells[1].textContent = category;
      const imgEl = row.querySelector('.cell-thumb');
      if (imgEl && img) imgEl.src = img;
      
      const badge = row.querySelector('.status-badge');
      if (badge) {
        badge.className = `status-badge ${status === 'published' ? 'badge-published' : 'badge-draft'}`;
        badge.textContent = status === 'published' ? 'Published' : 'Draft';
      }
    });
    showToast(`Updated "${name}" successfully`);
  } else {
    // Create new place row dynamically
    const newId = 'plc-' + Date.now();
    const tbody = document.querySelector('#tablePlacesOverview tbody');
    if (tbody) {
      const tr = document.createElement('tr');
      tr.setAttribute('data-id', newId);
      tr.innerHTML = `
        <td>
          <div class="cell-media">
            <img src="${img}" alt="${name}" class="cell-thumb" />
            <div class="cell-info">
              <span class="cell-title">${name}</span>
            </div>
          </div>
        </td>
        <td>${category}</td>
        <td>
          <span class="status-badge ${status === 'published' ? 'badge-published' : 'badge-draft'}" onclick="togglePlaceStatus('${newId}')">
            ${status === 'published' ? 'Published' : 'Draft'}
          </span>
        </td>
        <td>Just now</td>
        <td>
          <div class="action-group">
            <button class="action-btn" title="Edit Place" onclick="openEditPlaceModal('${newId}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </button>
            <button class="action-btn delete" title="Delete Place" onclick="confirmDelete('place', '${newId}', '${name}')">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          </div>
        </td>
      `;
      tbody.prepend(tr);
    }
    showToast(`Added "${name}" to historical places`);
  }

  closeModal('modalPlace');
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

function handleEventFormSubmit(e) {
  e.preventDefault();
  const slug = document.getElementById('eventFormSlug').value;
  const title = document.getElementById('eventFormTitle').value;

  if (slug) {
    document.querySelectorAll(`tr[data-id="${slug}"]`).forEach(row => {
      const titleEl = row.querySelector('.cell-title');
      if (titleEl) titleEl.textContent = title;
    });
    showToast(`Updated event "${title}"`);
  } else {
    showToast(`Created official event "${title}"`);
  }
  closeModal('modalEvent');
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
  if (content) {
    content.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <span class="status-badge badge-submission">Community Submission</span>
          <h4 style="font-family: var(--font-serif); font-size: 1.2rem; margin-top: 0.5rem;">Al-Muizz Street Festival</h4>
        </div>
        <p style="font-size: 0.85rem; color: var(--text-muted);">
          Submitted by: <strong>Sarah Ahmed</strong> (sarah.a@example.com)
        </p>
        <div style="background: #f9fafb; padding: 1rem; border-radius: 8px; border: 1px solid #e5e7eb; font-size: 0.85rem;">
          <strong>Description:</strong><br>
          An annual cultural festival showcasing folk music, heritage crafts, and guided walking tours along historic Al-Muizz street in Islamic Cairo.
        </div>
        <div style="font-size: 0.85rem;">
          <strong>Date:</strong> Jun 5 - Jun 7, 2025<br>
          <strong>Location:</strong> Al-Muizz Street, Cairo
        </div>
      </div>
    `;
  }
  openModal('modalSubmission');
}

function handleApproveSubmission() {
  if (activeSubmissionSlug) {
    document.querySelectorAll(`tr[data-id="${activeSubmissionSlug}"]`).forEach(row => {
      const badge = row.querySelector('.status-badge');
      if (badge) {
        badge.className = 'status-badge badge-published';
        badge.textContent = 'Published';
      }
    });
    showToast('Submission approved and published on live site!');
  }
  closeModal('modalSubmission');
}

function handleRejectSubmission() {
  showToast('Submission rejected');
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

function executeDelete() {
  if (activeDeletePayload) {
    const { id, name } = activeDeletePayload;
    document.querySelectorAll(`tr[data-id="${id}"]`).forEach(row => row.remove());
    showToast(`Deleted "${name}"`);
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
