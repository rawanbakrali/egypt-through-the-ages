const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        default: null
    },
    placeName: {
        type: String,
        default: null
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        default: null
    },
    eventTitle: {
        type: String,
        default: null
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    reviewText: {
        type: String,
        default: ''
    },
    tags: {
        type: [String],
        default: []
    },
    images: {
        type: [String],
        default: []
    }
}, { timestamps: true });

// A review belongs to either a place or an event, never both/neither
reviewSchema.pre('validate', function () {
    if (!!this.placeId === !!this.eventId) {
        throw new Error('A review must reference exactly one place or event.');
    }
});

reviewSchema.index({ userId: 1, placeId: 1 }, { unique: true, partialFilterExpression: { placeId: { $type: 'objectId' } } });
reviewSchema.index({ userId: 1, eventId: 1 }, { unique: true, partialFilterExpression: { eventId: { $type: 'objectId' } } });

module.exports = mongoose.model('Review', reviewSchema);
