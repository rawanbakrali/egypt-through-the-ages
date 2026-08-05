const eras = require('../data/eras');
const Place = require('../models/Place');

exports.createPlace = async (req, res) => {
    try {
        const { name, era, category, location, image, description, status, lat, lng } = req.body;

        if (!eras[era]) {
            return res.status(400).json({ success: false, message: 'Invalid era.' });
        }
        const validCategory = (eras[era].categories || []).some(c => c.key === category);
        if (!validCategory) {
            return res.status(400).json({ success: false, message: 'Invalid category for this era.' });
        }

        const newPlace = new Place({
            name,
            era,
            category,
            location,
            fullLocation: location,
            image,
            coords: [parseFloat(lat), parseFloat(lng)],
            desc: description || '',
            history: description || '',
            tags: [],
            interactive: true,
            status: status || 'published',
            thumbnails: [],
            quickFacts: {},
            visitorInfo: {}
        });
        await newPlace.save();

        res.json({ success: true, place: newPlace });
    } catch (err) {
        console.error('Create place error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

exports.updatePlace = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) return res.status(404).json({ success: false, message: 'Place not found.' });

        const { name, era, category, location, image, description, status, lat, lng } = req.body;

        if (era) {
            if (!eras[era]) {
                return res.status(400).json({ success: false, message: 'Invalid era.' });
            }
            place.era = era;
        }

        if (category) {
            const eraForValidation = era || place.era;
            const validCategory = (eras[eraForValidation].categories || []).some(c => c.key === category);
            if (!validCategory) {
                return res.status(400).json({ success: false, message: 'Invalid category for this era.' });
            }
            place.category = category;
        }

        if (name) place.name = name;
        if (location) { place.location = location; place.fullLocation = location; }
        if (image) place.image = image;
        if (lat !== undefined && lng !== undefined) place.coords = [parseFloat(lat), parseFloat(lng)];
        if (description !== undefined) place.desc = description;
        if (status) place.status = status;

        await place.save();
        res.json({ success: true, place });
    } catch (err) {
        console.error('Update place error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

exports.deletePlace = async (req, res) => {
    try {
        const result = await Place.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ success: false, message: 'Place not found.' });
        res.json({ success: true });
    } catch (err) {
        console.error('Delete place error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

exports.toggleStatus = async (req, res) => {
    try {
        const place = await Place.findById(req.params.id);
        if (!place) return res.status(404).json({ success: false, message: 'Place not found.' });

        place.status = place.status === 'published' ? 'draft' : 'published';
        await place.save();
        res.json({ success: true, status: place.status });
    } catch (err) {
        console.error('Toggle status error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};