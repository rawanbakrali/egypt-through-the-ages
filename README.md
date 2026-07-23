# Events System — Frontend Files

Matches Stage 5 of the roadmap (Section 15) and the expanded spec in Section 19.
Drop these into your existing `Egypt-through-the-ages/` project:

```
views/events.ejs                    → new
views/event.ejs                     → new
views/partials/event-card.ejs       → new
views/partials/event-submission-modal.ejs → new
views/partials/navbar.ejs           → only if you don't already have one
views/partials/footer.ejs           → only if you don't already have one
data/events.js                      → new
public/css/events.css               → new
public/js/events.js                 → new
```

If `partials/navbar.ejs` and `partials/footer.ejs` already exist from Stage 1,
**keep yours** and delete these two stubs — they're only here so the pages
render standalone.

If your global `public/css/style.css` already defines the `:root` color
variables (Section 2B), delete the `:root { ... }` block at the top of
`events.css` so the values aren't declared twice.

## Routes to add to `app.js`

```js
const events = require('./data/events');
const places = require('./data/places'); // wherever your place data lives

app.get('/events', (req, res) => {
  const approved = events.filter(e => e.status === 'approved');
  res.render('events', { events: approved });
});

app.get('/event/:slug', (req, res) => {
  const event = events.find(e => e.slug === req.params.slug);
  if (!event) return res.status(404).send('Event not found');

  const relatedPlace = event.placeSlug
    ? places.find(p => p.slug === event.placeSlug)
    : null;

  res.render('event', { event, relatedPlace });
});
```

## What's implemented (UI only, no persistence — Section 19)

- `/events` — hero, All/Official/Business/Community filter pills, an
  **events map** (Leaflet, grayscale tiles, color-coded pins matching
  Section 13 — white=official, blue=business, green=community), a
  featured row, and the full grid (`event-card.ejs`).
- `/event/:slug` — banner, description, related place link, a
  **Leaflet map centered on that event's coordinates**, and a booking
  sidebar that branches on `event.booking`:
  - `reserved` → **Reserve Seat** linking to `ticketUrl` (no in-site payment).
  - `open` → **I'm Interested** / **I'll Attend** toggles; once the date
    has passed, these are replaced with **Mark as Attended** →
    **Leave a Review** (currently just a placeholder alert — wire it to
    your existing Review Modal from Section 5B).
- **Submit an Event** modal — white surface per Section 17, toggles
  between Business and Community submission (the official ticket-link
  field only shows for Business), and shows a "sent for review" message
  on submit. Nothing is actually saved — that needs Section 20's admin
  workflow and a real backend.

## Not built here (intentionally out of scope for "events files only")

- Admin approval dashboard (Section 20) — separate surface.
- Login/Register/Forgot Password modals (Section 18) — separate auth flow.
- Real per-place "Related Events" section on `place.ejs` — the data
  wiring (`relatedPlace`) is ready above, you just need to add a similar
  block inside your existing place page template.

## Maps

Every event in `data/events.js` now has a `coordinates: { lat, lng }`
field with real-world coordinates. Both map views use Leaflet 1.9.4
loaded from a CDN (`unpkg.com`) — no npm install needed. The "grayscale"
look (Section 13) is done via a CSS `filter` on the tile pane rather
than a paid grayscale tile provider, so it stays free to run.
