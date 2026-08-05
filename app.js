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
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); // needed for fetch() calls that send JSON bodies
app.use(cookieParser());

// Reads the JWT auth cookie and makes login state available to every view/route
app.use(attachUserToLocals);

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

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});