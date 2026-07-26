const express = require('express');
const path = require('path');
const session = require('express-session');
const eras = require('./data/eras');
const events = require('./data/events');
const places = require('./data/places');
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
});

// ==========================================
// ADMIN — REAL PLACES CRUD (in-memory, resets on server restart)
// ==========================================

app.post('/admin/places', requireAdmin, (req, res) => {
    const { name, category, status, location, image, description } = req.body;

    if (!name || !location || !image) {
        return res.status(400).json({ success: false, message: 'Name, location, and image are required.' });
    }

    const newPlace = {
        id: 'plc-' + Date.now(),
        slug: name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        name,
        category: category || 'Ancient Egypt',
        location,
        status: status || 'draft',
        updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        image,
        description: description || ''
    };

    places.push(newPlace); // in-memory only — resets on server restart
    res.json({ success: true, place: newPlace });
});

app.put('/admin/places/:id', requireAdmin, (req, res) => {
    const place = places.find(p => p.id === req.params.id);
    if (!place) {
        return res.status(404).json({ success: false, message: 'Place not found.' });
    }

    const { name, category, status, location, image, description } = req.body;
    if (name) place.name = name;
    if (category) place.category = category;
    if (status) place.status = status;
    if (location) place.location = location;
    if (image) place.image = image;
    if (description !== undefined) place.description = description;
    place.updatedAt = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    res.json({ success: true, place });
});

app.delete('/admin/places/:id', requireAdmin, (req, res) => {
    const index = places.findIndex(p => p.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ success: false, message: 'Place not found.' });
    }
    places.splice(index, 1); // in-memory only — resets on server restart
    res.json({ success: true });
});

app.patch('/admin/places/:id/status', requireAdmin, (req, res) => {
    const place = places.find(p => p.id === req.params.id);
    if (!place) {
        return res.status(404).json({ success: false, message: 'Place not found.' });
    }
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
        places: places,
        events: events,
        bookings: bookings
    });
});

app.get('/profile', (req, res) => {
    if (!req.session.user) return res.redirect('/');
    if (req.session.user.role === 'admin') return res.redirect('/admin');

    res.render('profile', { title: 'My Profile | Egypt Through the Ages' });
});

app.get('/era/:slug', (req, res) => {
    const era = eras[req.params.slug];

    if (!era) {
        return res.status(404).send('Era not found');
    }

    res.render('era', {
        title: `${era.name} | Egypt Through the Ages`,
        era: era
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