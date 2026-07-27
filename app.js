const express = require('express');
const path = require('path');
const session = require('express-session');
const eras = require('./data/eras');
const events = require('./data/events');
const bookings = require('./data/bookings');
const users = require('./data/users');

const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse form-encoded POST bodies (needed for login/register forms)
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // needed for fetch() calls that send JSON bodies (fixes the Places admin bug above)

// Session middleware — in-memory store (default), resets on server restart
app.use(session({
    secret: 'egypt-through-the-ages-dev-secret', // TEMPORARY — move to an env variable before any real deployment
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));

// Global middleware: makes login state available to every view automatically
app.use((req, res, next) => {
    res.locals.isLoggedIn = !!req.session.user;
    res.locals.currentUser = req.session.user || null;
    next();
});
// Middleware: blocks unauthenticated POST requests to protected endpoints.
// Login/Register/Logout themselves must stay open (a logged-out person
// needs to be able to hit them), everything else that writes data should
// require a session.
function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'You must be signed in to do that.' });
    }
    next();
}

// ==========================================
// HELPERS — flatten data/eras.js into a manageable admin list
// ==========================================
function flattenPlaces() {
    const flat = [];
    Object.keys(eras).forEach(eraSlug => {
        const era = eras[eraSlug];
        if (!era.categoryData) return;
        Object.keys(era.categoryData).forEach(categoryKey => {
            const categoryInfo = (era.categories || []).find(c => c.key === categoryKey) || {};
            era.categoryData[categoryKey].forEach(place => {
                if (place.status === undefined) place.status = 'published'; // default for pre-existing places
                flat.push({
                    compositeId: `${eraSlug}|||${categoryKey}|||${place.name}`,
                    eraSlug,
                    eraName: era.name,
                    categoryKey,
                    categoryLabel: categoryInfo.label || categoryKey,
                    name: place.name,
                    location: place.fullLocation || place.location,
                    image: place.image,
                    description: place.desc,
                    status: place.status,
                    updatedAt: place.updatedAt || '—'
                });
            });
        });
    });
    return flat;
}

function buildEraCategoryMap() {
    const map = {};
    Object.keys(eras).forEach(eraSlug => {
        const era = eras[eraSlug];
        map[eraSlug] = {
            name: era.name,
            categories: (era.categories || []).map(c => ({ key: c.key, label: c.label }))
        };
    });
    return map;
}

function findPlace(eraSlug, categoryKey, name) {
    const era = eras[eraSlug];
    if (!era || !era.categoryData || !era.categoryData[categoryKey]) return null;
    return era.categoryData[categoryKey].find(p => p.name === name) || null;
}

function requireAdmin(req, res, next) {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required.' });
    }
    next();
}

// Routes
app.get('/', (req, res) => {
    res.render('home', {
        title: 'Egypt Through the Ages | Explore Historical Egypt'
    });
});

app.get('/events', (req, res) => {
    res.render('events', {
        title: 'Events — Egypt Through the Ages',
        events: events
    });
});

// Single Event Details Page
app.get('/event/:slug', (req, res) => {
    const event = events.find(e => e.slug === req.params.slug);

    if (!event) {
        return res.status(404).send('Event not found');
    }

    res.render('event', {
        title: `${event.title} | Egypt Through the Ages`,
        event: event
    });
});

// ==========================================
// ADMIN —operating on data/eras.js
// (in-memory, resets on server restart)
// ==========================================

app.post('/admin/eras/:eraSlug/:categoryKey/places', requireAdmin, (req, res) => {
    const { eraSlug, categoryKey } = req.params;
    const { name, location, image, description, status } = req.body;

    const era = eras[eraSlug];
    if (!era || !era.categoryData || !era.categoryData[categoryKey]) {
        return res.status(404).json({ success: false, message: 'Era or category not found.' });
    }
    if (!name || !location || !image) {
        return res.status(400).json({ success: false, message: 'Name, location, and image are required.' });
    }
    if (era.categoryData[categoryKey].find(p => p.name === name)) {
        return res.status(400).json({ success: false, message: 'A place with this name already exists in this category.' });
    }

    const newPlace = {
        name,
        location,
        fullLocation: location,
        image,
        desc: description || '',
        history: description || '',
        tags: [],
        interactive: true,
        reviewCount: "0",
        thumbnails: [],
        quickFacts: { built: '', founder: '', style: '', function: '' },
        visitorInfo: { hours: '', bestTime: '', dressCode: '', entryFee: '' },
        status: status || 'published',
        updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };

    era.categoryData[categoryKey].push(newPlace); // in-memory only — resets on server restart
    res.json({ success: true, place: newPlace });
});

app.put('/admin/eras/:eraSlug/:categoryKey/places/:name', requireAdmin, (req, res) => {
    const { eraSlug, categoryKey, name } = req.params;
    const place = findPlace(eraSlug, categoryKey, name);
    if (!place) return res.status(404).json({ success: false, message: 'Place not found.' });

    const { name: newName, location, image, description, status } = req.body;
    if (newName) place.name = newName;
    if (location) { place.location = location; place.fullLocation = location; }
    if (image) place.image = image;
    if (description !== undefined) { place.desc = description; }
    if (status) place.status = status;
    place.updatedAt = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    res.json({ success: true, place });
});

app.delete('/admin/eras/:eraSlug/:categoryKey/places/:name', requireAdmin, (req, res) => {
    const { eraSlug, categoryKey, name } = req.params;
    const era = eras[eraSlug];
    if (!era || !era.categoryData || !era.categoryData[categoryKey]) {
        return res.status(404).json({ success: false, message: 'Era or category not found.' });
    }
    const index = era.categoryData[categoryKey].findIndex(p => p.name === name);
    if (index === -1) return res.status(404).json({ success: false, message: 'Place not found.' });

    era.categoryData[categoryKey].splice(index, 1); // in-memory only — resets on server restart
    res.json({ success: true });
});

app.patch('/admin/eras/:eraSlug/:categoryKey/places/:name/status', requireAdmin, (req, res) => {
    const { eraSlug, categoryKey, name } = req.params;
    const place = findPlace(eraSlug, categoryKey, name);
    if (!place) return res.status(404).json({ success: false, message: 'Place not found.' });

    place.status = place.status === 'published' ? 'draft' : 'published';
    res.json({ success: true, status: place.status });
});

// ==========================================
// PUBLIC — EVENT SUBMISSION (business/community)
// ==========================================
app.post('/events/submit', (req, res) => {
    const { submissionType, title, description, date, time, location, category, ticketUrl } = req.body;

    if (!title || !description || !date || !time || !location || !category) {
        return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
    }

    const type = submissionType === 'community' ? 'community' : 'business';

    const newEvent = {
        slug: title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now(),
        title,
        type,
        category,
        era: null,
        placeSlug: null,
        date,
        time,
        location,
        // No location picker on the public form yet — defaults to central
        // Cairo until an admin manually sets a precise coordinate.
        coordinates: { lat: 30.0444, lng: 31.2357 },
        description,
        image: '/assets/events/placeholder.jpg', // no real image upload backend yet
        booking: 'open',
        ticketUrl: type === 'business' ? (ticketUrl || null) : null,
        featured: false,
        status: 'pending'
    };

    events.push(newEvent); // in-memory only — resets on server restart
    res.json({ success: true, event: newEvent });
});

// ==========================================
// ADMIN — REAL EVENTS CRUD + APPROVAL (in-memory, resets on server restart)
// ==========================================
app.post('/admin/events', requireAdmin, (req, res) => {
    const { title, category, date, bookingStatus, location, image, description } = req.body;

    if (!title || !location || !image) {
        return res.status(400).json({ success: false, message: 'Title, location, and image are required.' });
    }

    const newEvent = {
        slug: title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        title,
        type: 'official',
        category: category || 'General',
        era: null,
        placeSlug: null,
        date: date || '',
        time: '',
        location,
        coordinates: { lat: 30.0444, lng: 31.2357 },
        description: description || '',
        image,
        booking: bookingStatus || 'open',
        ticketUrl: null,
        featured: false,
        status: 'approved'
    };

    events.push(newEvent);
    res.json({ success: true, event: newEvent });
});

app.put('/admin/events/:slug', requireAdmin, (req, res) => {
    const event = events.find(e => e.slug === req.params.slug);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found.' });

    const { title, category, date, bookingStatus, location, image, description } = req.body;
    if (title) event.title = title;
    if (category) event.category = category;
    if (date) event.date = date;
    if (bookingStatus) event.booking = bookingStatus;
    if (location) event.location = location;
    if (image) event.image = image;
    if (description !== undefined) event.description = description;

    res.json({ success: true, event });
});

app.delete('/admin/events/:slug', requireAdmin, (req, res) => {
    const index = events.findIndex(e => e.slug === req.params.slug);
    if (index === -1) return res.status(404).json({ success: false, message: 'Event not found.' });
    events.splice(index, 1);
    res.json({ success: true });
});

app.post('/admin/events/:slug/approve', requireAdmin, (req, res) => {
    const event = events.find(e => e.slug === req.params.slug);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found.' });
    event.status = 'approved';
    res.json({ success: true, event });
});

app.post('/admin/events/:slug/reject', requireAdmin, (req, res) => {
    const event = events.find(e => e.slug === req.params.slug);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found.' });
    event.status = 'rejected';
    res.json({ success: true, event });
});

app.get('/admin',requireAdmin, (req, res) => {
    res.render('admin', {
        title: 'Admin Management UI — Egypt Through the Ages',
        places: flattenPlaces(),
        eraCategoryMap: buildEraCategoryMap(),
        events: events,
        bookings: bookings
    });
});

app.get('/profile', (req, res) => {
    if (!req.session.user) return res.redirect('/');
    if (req.session.user.role === 'admin') return res.redirect('/admin');

    res.render('profile', {
        title: 'My Profile | Egypt Through the Ages',
        profile: {
            name: req.session.user.username,
            handle: req.session.user.username.toLowerCase(),
            bio: 'Exploring Egypt through the ages, one place at a time.',
            location: 'Egypt',
            joined: 'This session', // no real account-creation date tracked yet
            avatar: '' // no real avatar upload system yet — falls back to initial letter
        },
        places: [], // no real per-user visited/favorite/wishlist data yet
        reviews: [] // reviews are currently stored per-place, not per-user — see note below
    });
});

app.get('/era/:slug', (req, res) => {
    const era = eras[req.params.slug];

    if (!era) {
        return res.status(404).send('Era not found');
    }
    const publicEra = { ...era };
    if (era.categoryData) {
        publicEra.categoryData = {};
        Object.keys(era.categoryData).forEach(categoryKey => {
            publicEra.categoryData[categoryKey] = era.categoryData[categoryKey].filter(p => p.status !== 'draft');
        });
    }
    if (era.markersData) {
        const draftNames = new Set();
        Object.values(era.categoryData || {}).flat().forEach(p => {
            if (p.status === 'draft') draftNames.add(p.name);
        });
        publicEra.markersData = era.markersData.filter(m => !draftNames.has(m.name));
    }

    res.render('era', {
        title: `${era.name} | Egypt Through the Ages`,
        era: publicEra
    });
});

// ==========================================
// AUTHENTICATION ROUTES (Step 1 — backend only, no modal/navbar yet)
// ==========================================

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    // Store only safe fields in the session (never the password)
    req.session.user = { id: user.id, username: user.username, email: user.email, role: user.role };

    // Redirect back to wherever the user came from, defaulting to home
    const redirectTo = req.body.redirectTo || '/';
    res.json({ success: true, redirectTo });
});

app.post('/register', (req, res) => {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ success: false, message: 'Passwords do not match.' });
    }
    if (users.find(u => u.email === email)) {
        return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
    }

    const newUser = {
        id: users.length + 1,
        username,
        email,
        password, // PLAINTEXT — temporary only, see data/users.js note
        role: 'user'
    };
    users.push(newUser); // in-memory only — resets on server restart

    req.session.user = { id: newUser.id, username: newUser.username, email: newUser.email, role: newUser.role };
    res.json({ success: true, redirectTo: '/' });
});

app.post('/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});