const crypto = require('crypto');
const User = require('../models/User');
const { sendPasswordResetEmail } = require('../utils/mailer');
const { setAuthCookie, clearAuthCookie } = require('../middleware/auth');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password.' });
        }

        // Store only safe fields in the JWT (never the password)
        setAuthCookie(res, { id: user._id.toString(), username: user.username, email: user.email, role: user.role });

        // Redirect back to wherever the user came from, defaulting to home
        const redirectTo = req.body.redirectTo || '/';
        res.json({ success: true, redirectTo });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
    }
};

exports.register = async (req, res) => {
    try {
        const { username, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Passwords do not match.' });
        }

        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) {
            return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
        }

        const newUser = new User({
            username,
            email: email.toLowerCase(),
            password, // gets automatically hashed by the User model's pre-save hook
            role: 'user'
        });
        await newUser.save();

        setAuthCookie(res, { id: newUser._id.toString(), username: newUser.username, email: newUser.email, role: newUser.role });
        res.json({ success: true, redirectTo: '/' });
    } catch (err) {
        console.error('Register error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
    }
};

exports.logout = (req, res) => {
    clearAuthCookie(res);
    res.json({ success: true });
};

exports.updateAccount = async (req, res) => {
    try {
        const user = await User.findById(req.session.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Account not found.' });
        }

        const { username, email, currentPassword, newPassword } = req.body;

        // Changing email or password requires re-confirming the current password
        if (email || newPassword) {
            if (!currentPassword) {
                return res.status(400).json({ success: false, message: 'Current password is required to change email or password.' });
            }
            const isMatch = await user.comparePassword(currentPassword);
            if (!isMatch) {
                return res.status(401).json({ success: false, message: 'Current password is incorrect.' });
            }
        }

        if (username) user.username = username;
        if (req.body.bio !== undefined) user.bio = req.body.bio;
        if (req.body.location !== undefined) user.location = req.body.location;

        if (email && email.toLowerCase() !== user.email) {
            const existing = await User.findOne({ email: email.toLowerCase() });
            if (existing) {
                return res.status(400).json({ success: false, message: 'An account with this email already exists.' });
            }
            user.email = email.toLowerCase();
        }

        if (newPassword) {
            user.password = newPassword; // re-hashed automatically by the pre-save hook
        }

        await user.save();
        setAuthCookie(res, { id: user._id.toString(), username: user.username, email: user.email, role: user.role });

        res.json({ success: true, message: 'Account updated successfully.' });
    } catch (err) {
        console.error('Update account error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
    }
};

exports.deleteAccount = async (req, res) => {
    try {
        const { password } = req.body;
        if (!password) {
            return res.status(400).json({ success: false, message: 'Password is required to delete your account.' });
        }

        const user = await User.findById(req.session.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'Account not found.' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Incorrect password.' });
        }

        await User.findByIdAndDelete(user._id);

        clearAuthCookie(res);
        res.json({ success: true, message: 'Account deleted successfully.' });
    } catch (err) {
        console.error('Delete account error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
    }
};


exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.json({ success: true, message: "If an account exists for this email, you'll receive a reset link shortly." });
        }

        const token = crypto.randomBytes(32).toString('hex');
        user.resetToken = token;
        user.resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
        await user.save();

        const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${token}`;
        await sendPasswordResetEmail(user.email, resetUrl);

        res.json({ success: true, message: "If an account exists for this email, you'll receive a reset link shortly." });
    } catch (err) {
        console.error('Forgot password error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
    }
};

exports.showResetPasswordPage = async (req, res, next) => {
    try {
        const user = await User.findOne({
            resetToken: req.params.token,
            resetTokenExpiry: { $gt: new Date() }
        });

        if (!user) {
            return res.render('reset-password', {
                title: 'Reset Password | Egypt Through the Ages',
                token: null,
                invalid: true
            });
        }

        res.render('reset-password', {
            title: 'Reset Password | Egypt Through the Ages',
            token: req.params.token,
            invalid: false
        });
    } catch (err) {
        next(err);
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ success: false, message: 'Passwords do not match.' });
        }

        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: new Date() }
        });

        if (!user) {
            return res.status(400).json({ success: false, message: 'This reset link is invalid or has expired.' });
        }

        user.password = password; // re-hashed automatically by the pre-save hook
        user.resetToken = null;
        user.resetTokenExpiry = null;
        await user.save();

        res.json({ success: true, message: 'Password reset successfully. You can now sign in.' });
    } catch (err) {
        console.error('Reset password error:', err);
        res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
    }
};