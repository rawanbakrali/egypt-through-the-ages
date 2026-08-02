/* ==========================================================================
   Egypt Through the Ages 
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initModalTriggers();
  initGlobalSearch();
  initActionDelegation(); 
  populateEraOptions();

  const logoutBtn = document.getElementById('adminLogoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      await fetch('/logout', { method: 'POST' });
      window.location.href = '/';
    });
  }
});


function populateEraOptions() {
  const eraSelect = document.getElementById('placeFormEra');
  if (!eraSelect || !window.ERA_CATEGORY_MAP) return;

  Object.keys(window.ERA_CATEGORY_MAP).forEach(eraSlug => {
    const opt = document.createElement('option');
    opt.value = eraSlug;
    opt.textContent = window.ERA_CATEGORY_MAP[eraSlug].name;
    eraSelect.appendChild(opt);
  });
}

function populateCategoryOptions(preselectCategoryKey) {
  const eraSelect = document.getElementById('placeFormEra');
  const categorySelect = document.getElementById('placeFormCategory');
  const eraSlug = eraSelect.value;

  categorySelect.innerHTML = '';

  if (!eraSlug || !window.ERA_CATEGORY_MAP[eraSlug]) {
    categorySelect.innerHTML = '<option value="">Select an era first</option>';
    return;
  }

  window.ERA_CATEGORY_MAP[eraSlug].categories.forEach(cat => {
    const opt = document.createElement('option');
    opt.value = cat.key;
    opt.textContent = cat.label;
    if (cat.key === preselectCategoryKey) opt.selected = true;
    categorySelect.appendChild(opt);
  });
}

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
      document.getElementById('placeFormOriginalName').value = "";
      document.getElementById('placeFormEra').disabled = false;
      document.getElementById('placeFormCategory').disabled = false;
      document.getElementById('placeFormImage').value = "";
      const placePreview = document.getElementById('placeFormImagePreview');
      placePreview.src = "";
      placePreview.style.display = 'none';
      populateCategoryOptions();
      openModal('modalPlace');
    });
  });

  // Add Event triggers
  document.querySelectorAll('.btn-open-add-event').forEach(btn => {
    btn.addEventListener('click', () => {
      document.getElementById('modalEventTitle').textContent = "Add Official Event";
      document.getElementById('formEvent').reset();
      document.getElementById('eventFormSlug').value = "";
      document.getElementById('eventFormImage').value = "";
      const eventPreview = document.getElementById('eventFormImagePreview');
      eventPreview.src = "";
      eventPreview.style.display = 'none';
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

async function togglePlaceStatus(compositeId) {
  try {
    const res = await fetch(`/admin/places/${compositeId}/status`, { method: 'PATCH' });
    const data = await res.json();

    if (!data.success) {
      showToast(data.message || 'Failed to update status.');
      return;
    }

    document.querySelectorAll(`tr[data-id="${compositeId}"]`).forEach(row => {
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

function openEditPlaceModal(compositeId) {
  const place = (window.ADMIN_PLACES || []).find(p => p.compositeId === compositeId);
  if (!place) return;

  document.getElementById('modalPlaceTitle').textContent = "Edit Historical Place";
  document.getElementById('placeFormId').value = compositeId;
  document.getElementById('placeFormOriginalName').value = place.name;
  document.getElementById('placeFormName').value = place.name;
  document.getElementById('placeFormStatus').value = place.status;
  document.getElementById('placeFormLocation').value = place.location;
  document.getElementById('placeFormImage').value = place.image;
  document.getElementById('placeFormDescription').value = place.description || '';

  const placePreview = document.getElementById('placeFormImagePreview');
  placePreview.src = place.image;
  placePreview.style.display = place.image ? 'block' : 'none';

  const eraSelect = document.getElementById('placeFormEra');
  eraSelect.value = place.eraSlug;
  eraSelect.disabled = false;
  populateCategoryOptions(place.categoryKey);
  document.getElementById('placeFormCategory').disabled = false;

  openModal('modalPlace');
}

async function handlePlaceFormSubmit(e) {
  e.preventDefault();
  const compositeId = document.getElementById('placeFormId').value;
  const name = document.getElementById('placeFormName').value;
  const eraSlug = document.getElementById('placeFormEra').value;
  const categoryKey = document.getElementById('placeFormCategory').value;
  const status = document.getElementById('placeFormStatus').value;
  const location = document.getElementById('placeFormLocation').value;
  const description = document.getElementById('placeFormDescription').value;
  const fileInput = document.getElementById('placeFormImageFile');
  const hiddenImage = document.getElementById('placeFormImage');

  if (!eraSlug || !categoryKey) {
  showToast('Please select both an era and a category.');
  return;
}

  // If a new file was chosen, upload it first
  let imageUrl = hiddenImage.value;
  if (fileInput.files && fileInput.files[0]) {
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    try {
      const uploadRes = await fetch('/admin/upload', { method: 'POST', body: formData });
      const uploadData = await uploadRes.json();
      if (!uploadData.success) {
        showToast(uploadData.message || 'Image upload failed.');
        return;
      }
      imageUrl = uploadData.url;
    } catch (err) {
      showToast('Network error — could not upload image.');
      return;
    }
  }

  if (!imageUrl) {
    showToast('Please choose an image.');
    return;
  }

  const payload = { name, era: eraSlug, category: categoryKey, location, image: imageUrl, description, status };

  try {
    const url = compositeId ? `/admin/places/${compositeId}` : '/admin/places';
    const method = compositeId ? 'PUT' : 'POST';

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
    window.location.reload();
  } catch (err) {
    showToast('Network error — could not save place.');
  }
}

// ==========================================
// EVENTS FORM & SUBMISSIONS
// ==========================================

function openEditEventModal(eventSlug) {
  const event = (window.ADMIN_EVENTS || []).find(e => e.slug === eventSlug);
  if (!event) return;

  document.getElementById('modalEventTitle').textContent = "Edit Event";
  document.getElementById('eventFormSlug').value = event.slug;
  document.getElementById('eventFormTitle').value = event.title;
  document.getElementById('eventFormType').value = event.type;
  document.getElementById('eventFormCategory').value = event.category;
  document.getElementById('eventFormDate').value = event.date;
  document.getElementById('eventFormBookingStatus').value = event.booking;
  document.getElementById('eventFormLocation').value = event.location;
  document.getElementById('eventFormImage').value = event.image;
  const eventPreview = document.getElementById('eventFormImagePreview');
  eventPreview.src = event.image;
  eventPreview.style.display = event.image ? 'block' : 'none';
  document.getElementById('eventFormDescription').value = event.description || '';

  openModal('modalEvent');
}

async function handleEventFormSubmit(e) {
  e.preventDefault();
  const slug = document.getElementById('eventFormSlug').value;
  const title = document.getElementById('eventFormTitle').value;
  const type = document.getElementById('eventFormType').value;
  const category = document.getElementById('eventFormCategory').value;
  const date = document.getElementById('eventFormDate').value;
  const bookingStatus = document.getElementById('eventFormBookingStatus').value;
  const location = document.getElementById('eventFormLocation').value;
  const description = document.getElementById('eventFormDescription').value;
  const fileInput = document.getElementById('eventFormImageFile');
  const hiddenImage = document.getElementById('eventFormImage');

  let imageUrl = hiddenImage.value;
  if (fileInput.files && fileInput.files[0]) {
    const formData = new FormData();
    formData.append('image', fileInput.files[0]);
    try {
      const uploadRes = await fetch('/admin/upload', { method: 'POST', body: formData });
      const uploadData = await uploadRes.json();
      if (!uploadData.success) {
        showToast(uploadData.message || 'Image upload failed.');
        return;
      }
      imageUrl = uploadData.url;
    } catch (err) {
      showToast('Network error — could not upload image.');
      return;
    }
  }

  if (!imageUrl) {
    showToast('Please choose an image.');
    return;
  }

  const payload = { title, type, category, date, bookingStatus, location, image: imageUrl, description };

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
function switchEventSubTab(filter, btnEl) {
  const tabs = btnEl.parentElement.querySelectorAll('.tab-btn');
  tabs.forEach(t => t.classList.remove('is-active'));
  btnEl.classList.add('is-active');

  const rows = document.querySelectorAll('#tableEventsFull tbody tr');
  rows.forEach(row => {
    const type = row.getAttribute('data-type');
    if (filter === 'all') {
      row.style.display = '';
    } else if (filter === 'submission' && type !== 'official') {
      row.style.display = '';
    } else if (filter === 'official' && type === 'official') {
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
    content.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = '1rem';

    // Header block: badge + title
    const headerBlock = document.createElement('div');
    const badge = document.createElement('span');
    badge.className = 'status-badge badge-submission';
    badge.textContent = event.type === 'community' ? 'Community Submission' : 'Business Submission';
    const heading = document.createElement('h4');
    heading.style.fontFamily = 'var(--font-serif)';
    heading.style.fontSize = '1.2rem';
    heading.style.marginTop = '0.5rem';
    heading.textContent = event.title;
    headerBlock.appendChild(badge);
    headerBlock.appendChild(heading);

    // Description block
    const descBlock = document.createElement('div');
    descBlock.style.background = '#f9fafb';
    descBlock.style.padding = '1rem';
    descBlock.style.borderRadius = '8px';
    descBlock.style.border = '1px solid #e5e7eb';
    descBlock.style.fontSize = '0.85rem';
    const descLabel = document.createElement('strong');
    descLabel.textContent = 'Description:';
    descBlock.appendChild(descLabel);
    descBlock.appendChild(document.createElement('br'));
    descBlock.appendChild(document.createTextNode(event.description || ''));

    // Meta block: date, location, category, ticket link
    const metaBlock = document.createElement('div');
    metaBlock.style.fontSize = '0.85rem';

    const appendMeta = (label, value) => {
      const strong = document.createElement('strong');
      strong.textContent = `${label}: `;
      metaBlock.appendChild(strong);
      metaBlock.appendChild(document.createTextNode(value || ''));
      metaBlock.appendChild(document.createElement('br'));
    };

    appendMeta('Date', `${event.date || ''} ${event.time || ''}`.trim());
    appendMeta('Location', event.location);
    appendMeta('Category', event.category);

    if (event.ticketUrl) {
      const strong = document.createElement('strong');
      strong.textContent = 'Booking Link: ';
      const link = document.createElement('a');
      link.href = event.ticketUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = event.ticketUrl;
      metaBlock.appendChild(strong);
      metaBlock.appendChild(link);
    }

    wrapper.appendChild(headerBlock);
    wrapper.appendChild(descBlock);
    wrapper.appendChild(metaBlock);
    content.appendChild(wrapper);
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
  row.querySelectorAll('[data-action="override-booking"]').forEach(el => {
    el.dataset.status = newStatus;
  });
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
// GLOBAL SEARCH
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
function initActionDelegation() {
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const action = el.dataset.action;

    switch (action) {
      case 'toggle-place-status':
        togglePlaceStatus(el.dataset.id);
        break;
      case 'edit-place':
        openEditPlaceModal(el.dataset.id);
        break;
      case 'delete-place':
        confirmDelete('place', el.dataset.id, el.dataset.name);
        break;
      case 'edit-event':
        openEditEventModal(el.dataset.slug);
        break;
      case 'delete-event':
        confirmDelete('event', el.dataset.slug, el.dataset.name);
        break;
      case 'view-event-page':
        window.open('/events', '_blank');
        break;
      case 'review-submission':
        openReviewSubmissionModal(el.dataset.slug);
        break;
      case 'override-booking':
        openOverrideBookingModal(el.dataset.id, el.dataset.status);
        break;
      default:
        break;
    }
  });
}
