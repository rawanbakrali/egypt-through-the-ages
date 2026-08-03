const mongoose = require('mongoose');

const userPlaceStatusSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    placeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Place',
        required: true
    },
    placeName: {
        type: String,
        required: true // denormalized, same reasoning as Review — avoids extra lookups for display
    },
    type: {
        type: String,
        enum: ['favorite', 'wishlist', 'visited'],
        required: true
    }
}, { timestamps: true });

userPlaceStatusSchema.index({ userId: 1, placeId: 1, type: 1 }, { unique: true });

module.exports = mongoose.model('UserPlaceStatus', userPlaceStatusSchema);