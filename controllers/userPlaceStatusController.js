const UserPlaceStatus = require('../models/UserPlaceStatus');
const Place = require('../models/Place');

const VALID_TYPES = ['favorite', 'wishlist', 'visited'];
exports.toggleStatus = async (req, res) => {
    try {
        const { type } = req.params;
        const { placeId } = req.body;
        const userId = req.session.user.id;

        if (!VALID_TYPES.includes(type)) {
            return res.status(400).json({ success: false, message: 'Invalid status type.' });
        }

        const place = await Place.findById(placeId);
        if (!place) {
            return res.status(404).json({ success: false, message: 'Place not found.' });
        }

        const existing = await UserPlaceStatus.findOne({ userId, placeId, type });

        if (existing) {
            await UserPlaceStatus.findByIdAndDelete(existing._id);
            return res.json({ success: true, active: false });
        }

        await UserPlaceStatus.create({ userId, placeId, placeName: place.name, type });
        res.json({ success: true, active: true });
    } catch (err) {
        if (err.code === 11000) {
            return res.json({ success: true, active: true });
        }
        console.error('Toggle status error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

exports.getStatusesForPlace = async (req, res) => {
    try {
        const { placeId } = req.params;
        const userId = req.session.user.id;

        const entries = await UserPlaceStatus.find({ userId, placeId });
        const active = { favorite: false, wishlist: false, visited: false };
        entries.forEach(entry => { active[entry.type] = true; });

        res.json({ success: true, active });
    } catch (err) {
        console.error('Get statuses error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};
exports.getMyStatuses = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const entries = await UserPlaceStatus.find({ userId }).populate('placeId');

        const grouped = { favorite: [], wishlist: [], visited: [] };
        entries.forEach(entry => {
            if (grouped[entry.type]) grouped[entry.type].push(entry);
        });

        res.json({ success: true, ...grouped });
    } catch (err) {
        console.error('Get my statuses error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};