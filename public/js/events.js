// public/js/events.js
// UI-only interactions for the Events system (Section 19).
// Nothing here persists across a page refresh — that's intentional
// until the real backend + admin approval workflow exists.

document.addEventListener('DOMContentLoaded', () => {
  initFilters();
  initSubmissionModal();
  initBookingActions();
  initEventsOverviewMap();
  initSingleEventMap();
});

/* ---------- Marker colors (Section 13 / matches type badges) ---------- */
const EVENT_TYPE_COLOR = {
  official: '#F5F5F5',
  business: '#2563EB',
  community: '#16A34A'
};

function markerIcon(color) {
  return L.divIcon({
    className: 'event-marker',
    html: `<span style="
      display:block;width:14px;height:14px;border-radius:50%;
      background:${color};border:2px solid #050505;
      box-shadow:0 0 0 2px rgba(255,255,255,0.25);
    "></span>`,
    iconSize: [14, 14],
    iconAnchor: [7, 7]
  });
}

function grayscaleTileLayer() {
  // CARTO's light_all basemap, hue-rotated/desaturated via CSS filter on the
  // tile pane — keeps the "grayscale tiles" requirement (Section 13) without
  // needing a paid grayscale tile provider.
  return L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap &copy; CARTO',
    maxZoom: 19
  });
}

/* ---------- Events listing: overview map of all pins ---------- */
function initEventsOverviewMap() {
  const mapEl = document.getElementById('eventsMap');
  const dataEl = document.getElementById('eventsMapData');
  if (!mapEl || !dataEl || typeof L === 'undefined') return;

  const events = JSON.parse(dataEl.textContent);
  if (!events.length) return;

  const map = L.map(mapEl, { scrollWheelZoom: false }).setView([26.8, 30.8], 6);
  grayscaleTileLayer().addTo(map);
  mapEl.classList.add('map-grayscale');

  const markers = [];
  events.forEach(event => {
    const marker = L.marker([event.coordinates.lat, event.coordinates.lng], {
      icon: markerIcon(EVENT_TYPE_COLOR[event.type] || '#8A8A8A')
    })
      .addTo(map)
      .bindPopup(`
        <strong>${event.title}</strong><br>
        <a href="/event/${event.slug}">View event &rarr;</a>
      `);
    markers.push(marker);
  });

  if (markers.length > 1) {
    map.fitBounds(L.featureGroup(markers).getBounds().pad(0.3));
  }
}

/* ---------- Single event page: one pin centered on this event ---------- */
function initSingleEventMap() {
  const mapEl = document.getElementById('eventMap');
  if (!mapEl || typeof L === 'undefined') return;

  const lat = parseFloat(mapEl.dataset.lat);
  const lng = parseFloat(mapEl.dataset.lng);
  const title = mapEl.dataset.title;
  const color = EVENT_TYPE_COLOR[mapEl.dataset.type] || '#8A8A8A';
  if (Number.isNaN(lat) || Number.isNaN(lng)) return;

  const map = L.map(mapEl, { scrollWheelZoom: false }).setView([lat, lng], 15);
  grayscaleTileLayer().addTo(map);
  mapEl.classList.add('map-grayscale');

  L.marker([lat, lng], { icon: markerIcon(color) })
    .addTo(map)
    .bindPopup(`<strong>${title}</strong>`)
    .openPopup();
}

/* ---------- Events listing: filter pills ---------- */
function initFilters() {
  const filterGroup = document.getElementById('typeFilters');
  const grid = document.getElementById('eventsGrid');
  const emptyState = document.getElementById('eventsEmpty');
  if (!filterGroup || !grid) return;

  filterGroup.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-pill');
    if (!btn) return;

    filterGroup.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('is-active'));
    btn.classList.add('is-active');

    const filter = btn.dataset.filter;
    const cards = grid.querySelectorAll('.event-card');
    let visibleCount = 0;

    cards.forEach(card => {
      const matches = filter === 'all' || card.dataset.type === filter;
      card.style.display = matches ? '' : 'none';
      if (matches) visibleCount++;
    });

    if (emptyState) emptyState.hidden = visibleCount > 0;
  });
}

/* ---------- Submit an Event modal ---------- */
function initSubmissionModal() {
  const overlay = document.getElementById('submitEventOverlay');
  if (!overlay) return;

  const openBtn = document.getElementById('openSubmitEvent');
  const emptyLink = document.getElementById('eventsEmptySubmitLink');
  const closeBtn = document.getElementById('submitEventClose');
  const cancelBtn = document.getElementById('submitEventCancel');
  const form = document.getElementById('submitEventForm');
  const successMsg = document.getElementById('submitEventSuccess');
  const businessOnlyFields = overlay.querySelectorAll('[data-business-only]');
  const toggleBtns = overlay.querySelectorAll('.type-toggle-btn');

  const open = () => { overlay.hidden = false; };
  const close = () => {
    overlay.hidden = true;
    form.reset();
    successMsg.hidden = true;
    form.hidden = false;
  };

  openBtn?.addEventListener('click', open);
  emptyLink?.addEventListener('click', (e) => { e.preventDefault(); open(); });
  closeBtn?.addEventListener('click', close);
  cancelBtn?.addEventListener('click', close);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const isBusiness = btn.dataset.submissionType === 'business';
      businessOnlyFields.forEach(field => { field.style.display = isBusiness ? '' : 'none'; });
    });
  });

  form?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const activeToggle = overlay.querySelector('.type-toggle-btn.is-active');
    const submissionType = activeToggle ? activeToggle.dataset.submissionType : 'business';
    const formData = new FormData(form);

    const payload = {
      submissionType,
      title: formData.get('title'),
      description: formData.get('description'),
      date: formData.get('date'),
      time: formData.get('time'),
      location: formData.get('location'),
      category: formData.get('category'),
      ticketUrl: formData.get('ticketUrl') || null
      // Note: image uploads aren't wired to a real backend yet — any
      // files selected here are not actually sent or stored.
    };

    try {
      const res = await fetch('/events/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        form.hidden = true;
        successMsg.hidden = false;
      } else {
        alert(data.message || 'Something went wrong submitting your event.');
      }
    } catch (err) {
      alert('Network error — could not submit your event.');
    }
  });
}

/* ---------- Single event page: booking actions ---------- */
function initBookingActions() {
  const card = document.querySelector('.booking-card');
  if (!card) return;

  const interestedBtn = card.querySelector('[data-action="interested"]');
  const attendBtn = card.querySelector('[data-action="attend"]');
  const markAttendedBtn = card.querySelector('[data-action="mark-attended"]');
  const leaveReviewBtn = card.querySelector('[data-action="leave-review"]');

  interestedBtn?.addEventListener('click', () => {
    interestedBtn.textContent = interestedBtn.textContent === "I'm Interested"
      ? '✓ Interested'
      : "I'm Interested";
    interestedBtn.classList.toggle('is-active');
  });

  attendBtn?.addEventListener('click', () => {
    attendBtn.textContent = attendBtn.textContent === "I'll Attend"
      ? '✓ Attending'
      : "I'll Attend";
    attendBtn.classList.toggle('is-active');
  });

  markAttendedBtn?.addEventListener('click', () => {
    markAttendedBtn.hidden = true;
    if (leaveReviewBtn) leaveReviewBtn.hidden = false;
  });

  leaveReviewBtn?.addEventListener('click', () => {
    // Hook this up to the existing Review Modal (Section 5B) once
    // events share the same review component as places.
    alert('This would open the Review Modal, same as place reviews.');
  });
}
