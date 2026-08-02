function attachUserToLocals(req, res, next) {
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

// Blocks non-admin requests to admin-only endpoints
function requireAdmin(req, res, next) {
    if (!req.session.user || req.session.user.role !== 'admin') {
        return res.status(403).json({ success: false, message: 'Admin access required.' });
    }
    next();
}

module.exports = { attachUserToLocals, requireAuth, requireAdmin };