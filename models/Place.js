const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    era: { type: String, required: true },
    category: { type: String, required: true },
    location: String,
    fullLocation: String,
    image: String,
    thumbnails: [String],
    desc: String,
    history: String,
    tags: [String],
    interactive: { type: Boolean, default: true },
    status: { type: String, enum: ['published', 'draft'], default: 'published' },
    embed3D: String,
    coords: [Number], // [lat, lng]
    quickFacts: {
        built: String,
        founder: String,
        style: String,
        function: String
    },
    visitorInfo: {
        hours: String,
        bestTime: String,
        dressCode: String,
        entryFee: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Place', placeSchema);