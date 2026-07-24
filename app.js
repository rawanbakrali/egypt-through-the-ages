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

    // Look up the related place using event.placeSlug (if it exists)
    let relatedPlace = null;
    if (event.placeSlug) {
        relatedPlace = places.find(p => p.slug === event.placeSlug) || null;
    }

    res.render('event', {
        title: `${event.title} | Egypt Through the Ages`,
        event: event,
        relatedPlace: relatedPlace // <--- Pass relatedPlace here!
    });
});

app.get('/admin', (req, res) => {
    res.render('admin', {
        title: 'Admin Management UI — Egypt Through the Ages',
        places: places,
        events: events,
        bookings: bookings
    });
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