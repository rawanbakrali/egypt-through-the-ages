require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { attachUserToLocals } = require('./middleware/auth');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const placesRoutes = require('./routes/placesRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const pageRoutes = require('./routes/pageRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const userPlaceStatusRoutes = require('./routes/userPlaceStatusRoutes');
const bookingsRoutes = require('./routes/bookingsRoutes');
const usersRoutes = require('./routes/usersRoutes');
const chatRoutes = require('./routes/chatRoutes');
const { notFoundHandler, globalErrorHandler } = require('./middleware/errorHandlers');

const app = express();
const PORT = process.env.PORT || 3000;

// ---------------------------------------------------------------------------
// Database
// ---------------------------------------------------------------------------
let dbPromise = null;

async function connectDB() {
    if (mongoose.connection.readyState === 1) return;
    if (!dbPromise) {
        dbPromise = mongoose
            .connect(process.env.MONGODB_URI, {
                serverSelectionTimeoutMS: 5000, // fail fast instead of hanging until the function times out
                maxPoolSize: 5,                 // small pool: serverless functions each open their own
                autoIndex: false,               // don't run createIndex round trips on every cold start
                autoCreate: false               // don't run createCollection round trips on every cold start
            })
            .then(() => console.log('✅ Connected to MongoDB Atlas'))
            .catch(err => {
                console.error('❌ MongoDB connection error:', err.message);
                dbPromise = null; // lets the next request try again
                throw err;
            });
    }
    await dbPromise;
}

// If the connection drops, allow the next request to reconnect
mongoose.connection.on('disconnected', () => { dbPromise = null; });

// Pages that never touch the database skip the connection entirely
const NO_DB_PATHS = new Set(['/', '/chat']);

// ---------------------------------------------------------------------------
// View engine
// ---------------------------------------------------------------------------
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ---------------------------------------------------------------------------
// Static files
// (On Vercel, public/ is served by the CDN before this ever runs; this is for local dev.)
// ---------------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));

// A missing file under these prefixes is a plain 404: no page render, no database.
app.use(['/assets', '/css', '/js'], (req, res) => res.sendStatus(404));
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// ---------------------------------------------------------------------------
// Parsers + login state (JWT only, no database)
// This runs BEFORE the database step so the error page can always render the navbar.
// ---------------------------------------------------------------------------
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // needed for fetch() calls that send JSON bodies
app.use(cookieParser());

// Reads the JWT auth cookie and makes login state available to every view/route
app.use(attachUserToLocals);

// ---------------------------------------------------------------------------
// Database connection (only for routes that need it)
// ---------------------------------------------------------------------------
app.use(async (req, res, next) => {
    if (NO_DB_PATHS.has(req.path)) return next();
    try {
        await connectDB();
        next();
    } catch (err) {
        next(err);
    }
});

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------
app.use(authRoutes);
app.use(uploadRoutes);
app.use(placesRoutes);
app.use(eventsRoutes);
app.use(pageRoutes);
app.use(reviewsRoutes);
app.use(userPlaceStatusRoutes);
app.use(bookingsRoutes);
app.use(usersRoutes);
app.use(chatRoutes);

app.use(notFoundHandler);
app.use(globalErrorHandler);


if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

module.exports = app;