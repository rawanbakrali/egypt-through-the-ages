const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    type: { type: String, enum: ['official', 'business', 'community'], default: 'official' },
    category: String,
    date: String,
    time: String,
    location: String,
    coordinates: {
        lat: Number,
        lng: Number
    },
    description: String,
    image: String,
    booking: { type: String, enum: ['open', 'reserved'], default: 'open' },
    ticketUrl: String,
    featured: { type: Boolean, default: false },
    status: { type: String, enum: ['approved', 'pending', 'rejected'], default: 'pending' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);