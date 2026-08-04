const Booking = require('../models/Booking');
const Event = require('../models/Event');

exports.setStatus = async (req, res) => {
    try {
        const { eventId, status } = req.body;
        const userId = req.session.user.id;
        const validStatuses = ['interested', 'attending', 'attended'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status.' });
        }

        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found.' });
        }

        const existing = await Booking.findOne({ userId, eventId });

        // Clicking the same status again turns it off
        if (existing && existing.status === status) {
            await Booking.findByIdAndDelete(existing._id);
            return res.json({ success: true, status: null });
        }

        if (existing) {
            existing.status = status;
            await existing.save();
            return res.json({ success: true, status: existing.status });
        }

        const newBooking = await Booking.create({
            userId,
            eventId,
            eventTitle: event.title,
            status
        });
        res.json({ success: true, status: newBooking.status });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: 'Booking already exists.' });
        }
        console.error('Set booking status error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

exports.getStatusForEvent = async (req, res) => {
    try {
        const booking = await Booking.findOne({ userId: req.session.user.id, eventId: req.params.eventId });
        res.json({ success: true, status: booking ? booking.status : null });
    } catch (err) {
        console.error('Get booking status error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({})
            .populate('userId', 'username email')
            .populate('eventId')
            .sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (err) {
        console.error('Get all bookings error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};