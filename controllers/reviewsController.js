// controllers/reviewsController.js
const Review = require('../models/Reviews');
const Place = require('../models/Place');
exports.createReview = async (req, res) => {
    try {
        const { placeId, rating, reviewText, tags, images } = req.body;
        const userId = req.session.user.id;

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

        res.json({ success: true, review: newReview });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ success: false, message: 'You have already reviewed this place.' });
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

        // Only the review's own author can delete it
        if (review.userId.toString() !== req.session.user.id) {
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

        const summary = reviews.length > 0
            ? { average: reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length, count: reviews.length }
            : null;

        res.json({
            success: true,
            reviews: reviews.map(r => ({
                id: r._id,
                ownerId: r.userId ? r.userId._id.toString() : null,
                username: r.userId ? r.userId.username : 'Unknown',
                rating: r.rating,
                reviewText: r.reviewText,
                tags: r.tags,
                images: r.images,
                createdAt: r.createdAt
            })),
            summary
        });
    } catch (err) {
        console.error('Get reviews error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};
exports.getMyReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ userId: req.session.user.id }).sort({ createdAt: -1 });
        res.json({ success: true, reviews });
    } catch (err) {
        console.error('Get my reviews error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};