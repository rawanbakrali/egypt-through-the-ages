const Review = require('../models/Reviews');
const Place = require('../models/Place');
const Event = require('../models/Event');
const Booking = require('../models/Booking');

exports.createReview = async (req, res) => {
    try {
        const { placeId, eventId, rating, reviewText, tags, images } = req.body;
        const userId = req.session.user.id;

        if (placeId) {
            const place = await Place.findById(placeId);
            if (!place) {
                return res.status(404).json({ success: false, message: 'Place not found.' });
            }

            const existing = await Review.findOne({ userId, placeId });
            if (existing) {
                return res.status(400).json({ success: false, message: 'You have already reviewed this place.' });
            }

            const newReview = new Review({
                userId,
                placeId,
                placeName: place.name,
                rating,
                reviewText: reviewText || '',
                tags: Array.isArray(tags) ? tags : [],
                images: Array.isArray(images) ? images : []
            });
            await newReview.save();
            return res.json({ success: true, review: newReview });
        }

        // Event review — only someone who attended the event can review it
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ success: false, message: 'Event not found.' });
        }

        const attended = await Booking.findOne({ userId, eventId, status: 'attended' });
        if (!attended) {
            return res.status(403).json({ success: false, message: 'Only attendees can review this event.' });
        }

        const existingEventReview = await Review.findOne({ userId, eventId });
        if (existingEventReview) {
            return res.status(400).json({ success: false, message: 'You have already reviewed this event.' });
        }

        const newEventReview = new Review({
            userId,
            eventId,
            eventTitle: event.title,
            rating,
            reviewText: reviewText || '',
            tags: Array.isArray(tags) ? tags : [],
            images: Array.isArray(images) ? images : []
        });
        await newEventReview.save();
        res.json({ success: true, review: newEventReview });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: 'You have already reviewed this.' });
        }
        console.error('Create review error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

exports.deleteReview = async (req, res) => {
    try {
        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({ success: false, message: 'Review not found.' });
        }

        // The review's own author can always delete it; an admin can also remove
        // any review as a moderation action (e.g. abusive/spam content).
        const isOwner = review.userId.toString() === req.session.user.id;
        const isAdmin = req.session.user.role === 'admin';
        if (!isOwner && !isAdmin) {
            return res.status(403).json({ success: false, message: 'You can only delete your own reviews.' });
        }

        await Review.findByIdAndDelete(req.params.id);
        res.json({ success: true });
    } catch (err) {
        console.error('Delete review error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

exports.getReviewsForPlace = async (req, res) => {
    try {
        const reviews = await Review.find({ placeId: req.params.placeId })
            .populate('userId', 'username')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            reviews: reviews.map(formatReview),
            summary: buildSummary(reviews)
        });
    } catch (err) {
        console.error('Get reviews error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

exports.getReviewsForEvent = async (req, res) => {
    try {
        const reviews = await Review.find({ eventId: req.params.eventId })
            .populate('userId', 'username')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            reviews: reviews.map(formatReview),
            summary: buildSummary(reviews)
        });
    } catch (err) {
        console.error('Get event reviews error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

function buildSummary(reviews) {
    if (reviews.length === 0) return null;
    return {
        average: reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length,
        count: reviews.length
    };
}

function formatReview(r) {
    return {
        id: r._id,
        ownerId: r.userId ? r.userId._id.toString() : null,
        username: r.userId ? r.userId.username : 'Unknown',
        rating: r.rating,
        reviewText: r.reviewText,
        tags: r.tags,
        images: r.images,
        createdAt: r.createdAt
    };
}

exports.getMyReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ userId: req.session.user.id }).sort({ createdAt: -1 });
        res.json({ success: true, reviews });
    } catch (err) {
        console.error('Get my reviews error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }

};