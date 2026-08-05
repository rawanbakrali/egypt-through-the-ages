const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = 'auth_token';
const TOKEN_MAX_AGE = 1000 * 60 * 60 * 24; // 24 hours

function setAuthCookie(res, user) {
    const token = jwt.sign(
        { id: user.id, username: user.username, email: user.email, role: user.role },
        JWT_SECRET,
        { expiresIn: TOKEN_MAX_AGE / 1000 }
    );
    res.cookie(COOKIE_NAME, token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        maxAge: TOKEN_MAX_AGE
    });
}

function clearAuthCookie(res) {
    res.clearCookie(COOKIE_NAME);
}

// Reads and verifies the JWT cookie, then exposes the user as `req.session.user`
// (kept as `req.session` so the rest of the app didn't need to change) and to views.
function attachUserToLocals(req, res, next) {
    req.session = { user: null };

    const token = req.cookies[COOKIE_NAME];
    if (token) {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            req.session.user = {
                id: decoded.id,
                username: decoded.username,
                email: decoded.email,
                role: decoded.role
            };
        } catch (err) {
            // expired or tampered token — treat as logged out
        }
    }

    res.locals.isLoggedIn = !!req.session.user;
    res.locals.currentUser = req.session.user || null;
    next();
}

function requireAuth(req, res, next) {
    if (!req.session.user) {
        return res.status(401).json({ success: false, message: 'You must be signed in to do that.' });
    }
    next();
}

function requireAdmin(req, res, next) {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required.' });
    }
    next();
}

module.exports = { attachUserToLocals, requireAuth, requireAdmin, setAuthCookie, clearAuthCookie };
