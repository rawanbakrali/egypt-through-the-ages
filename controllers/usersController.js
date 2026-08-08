const User = require('../models/User');
const Booking = require('../models/Booking');
const Review = require('../models/Reviews');
const UserPlaceStatus = require('../models/UserPlaceStatus');

exports.updateUser = async (req, res) => {
    try {
        const { username, email, role } = req.body;
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

        if (email && email.toLowerCase() !== user.email) {
            const existing = await User.findOne({ email: email.toLowerCase() });
            if (existing) {
                return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
            }
            user.email = email.toLowerCase();
        }

        if (username) user.username = username;

        if (role && role !== user.role) {
            if (user._id.toString() === req.session.user.id) {
                return res.status(400).json({ success: false, message: 'You cannot change your own role.' });
            }
            user.role = role;
        }

        await user.save();
        res.json({
            success: true,
            user: { id: user._id.toString(), username: user.username, email: user.email, role: user.role }
        });
    } catch (err) {
        console.error('Update user error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        if (req.params.id === req.session.user.id) {
            return res.status(400).json({ success: false, message: "You can't delete your own account while logged in." });
        }

        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

        // Cascade delete: remove every Booking, Review, and UserPlaceStatus this user
        // created, so deleting their account doesn't leave orphaned documents behind
        // that reference a userId which no longer exists.
        await Promise.all([
            User.findByIdAndDelete(user._id),
            Booking.deleteMany({ userId: user._id }),
            Review.deleteMany({ userId: user._id }),
            UserPlaceStatus.deleteMany({ userId: user._id })
        ]);

        res.json({ success: true });
    } catch (err) {
        console.error('Delete user error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong.' });
    }
};