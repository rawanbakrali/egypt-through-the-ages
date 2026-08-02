require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const { attachUserToLocals } = require('./middleware/auth');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const placesRoutes = require('./routes/placesRoutes');
const eventsRoutes = require('./routes/eventsRoutes');
const pageRoutes = require('./routes/pageRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');
const { notFoundHandler, globalErrorHandler } = require('./middleware/errorHandlers');

const app = express();
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Parse form-encoded POST bodies (needed for login/register forms)
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // needed for fetch() calls that send JSON bodies

// Session middleware — in-memory store (default), resets on server restart
app.use(session({
    secret: 'egypt-through-the-ages-dev-secret', // TEMPORARY — move to an env variable before any real deployment
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));

app.use(attachUserToLocals);

// Global middleware: makes login state available to every view automatically
app.use(authRoutes);
app.use(uploadRoutes);
app.use(placesRoutes);
app.use(eventsRoutes);
app.use(pageRoutes);
app.use(reviewsRoutes);

app.use(notFoundHandler);
app.use(globalErrorHandler);

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});