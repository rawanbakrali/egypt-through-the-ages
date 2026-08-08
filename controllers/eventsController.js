const Event = require('../models/Event');
const Booking = require('../models/Booking');
const Review = require('../models/Reviews');

exports.listEvents = async (req, res, next) => {
    try {
        const approvedEvents = await Event.find({ status: 'approved' }).sort({ date: 1 });
        res.render('events', {
            title: 'Events — Egypt Through the Ages',
            events: approvedEvents
        });
    } catch (err) {
        next(err);
    }
};

exports.showEvent = async (req, res, next) => {
    try {
        const event = await Event.findOne({ slug: req.params.slug, status: 'approved' });
        if (!event) {
            return res.status(404).render('404', {
                title: 'Page Not Found | Egypt Through the Ages',
                path: req.originalUrl
            });
        }

        let myBookingStatus = null;
        if (req.session.user) {
            const booking = await Booking.findOne({ userId: req.session.user.id, eventId: event._id });
            if (booking) myBookingStatus = booking.status;
        }

        res.render('event', {
            title: `${event.title} | Egypt Through the Ages`,
            event: event,
            myBookingStatus: myBookingStatus
        });
    } catch (err) {
        next(err);
    }
};

exports.submitEvent = async (req, res) => {
    try {
        const { submissionType, title, description, date, time, location, category, ticketUrl, image, lat, lng } = req.body;

        const type = submissionType === 'community' ? 'community' : 'business';
        const coordinates = (lat && lng)
            ? { lat: parseFloat(lat), lng: parseFloat(lng) }
            : { lat: 30.0444, lng: 31.2357 }; // fallback: Cairo (map picker failed to load or was skipped)

        const newEvent = new Event({
            slug: title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-' + Date.now(),
            title,
            type,
            category,
            date,
            time,
            location,
            coordinates,
            description,
            image: image || '/assets/events/placeholder.jpg',
            booking: 'open',
            ticketUrl: type === 'business' ? (ticketUrl || null) : null,
            featured: false,
            status: 'pending'
        });
        await newEvent.save();

        res.json({ success: true, event: newEvent });
    } catch (err) {
        console.error('Event submission error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

// ---- Admin ----
exports.createEvent = async (req, res) => {
    try {
        const { title, category, date, bookingStatus, location, image, description, lat, lng } = req.body;

        const newEvent = new Event({
            slug: title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
            title,
            type: 'official',
            category: category || 'General',
            date,
            time: '',
            location,
            coordinates: { lat: parseFloat(lat), lng: parseFloat(lng) },
            description: description || '',
            image,
            booking: bookingStatus || 'open',
            ticketUrl: null,
            featured: false,
            status: 'approved'
        });
        await newEvent.save();

        res.json({ success: true, event: newEvent });
    } catch (err) {
        console.error('Create event error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const event = await Event.findOne({ slug: req.params.slug });
        if (!event) return res.status(404).json({ success: false, message: 'Event not found.' });

        const { title, type, category, date, bookingStatus, location, image, description, lat, lng } = req.body;
        if (title) event.title = title;
        if (type) event.type = type;
        if (category) event.category = category;
        if (date) event.date = date;
        if (bookingStatus) event.booking = bookingStatus;
        if (location) event.location = location;
        if (image) event.image = image;
        if (lat !== undefined && lng !== undefined) event.coordinates = { lat: parseFloat(lat), lng: parseFloat(lng) };
        if (description !== undefined) event.description = description;

        await event.save();
        res.json({ success: true, event });
    } catch (err) {
        console.error('Update event error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const event = await Event.findOne({ slug: req.params.slug });
        if (!event) return res.status(404).json({ success: false, message: 'Event not found.' });

        // Cascade delete: remove every Booking and Review tied to this event so
        // deleting it doesn't leave orphaned documents pointing at a dead eventId.
        await Promise.all([
            Event.findByIdAndDelete(event._id),
            Booking.deleteMany({ eventId: event._id }),
            Review.deleteMany({ eventId: event._id })
        ]);

        res.json({ success: true });
    } catch (err) {
        console.error('Delete event error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

exports.approveEvent = async (req, res) => {
    try {
        const event = await Event.findOne({ slug: req.params.slug });
        if (!event) return res.status(404).json({ success: false, message: 'Event not found.' });
        event.status = 'approved';
        await event.save();
        res.json({ success: true, event });
    } catch (err) {
        console.error('Approve event error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

exports.rejectEvent = async (req, res) => {
    try {
        const event = await Event.findOne({ slug: req.params.slug });
        if (!event) return res.status(404).json({ success: false, message: 'Event not found.' });
        event.status = 'rejected';
        await event.save();
        res.json({ success: true, event });
    } catch (err) {
        console.error('Reject event error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};