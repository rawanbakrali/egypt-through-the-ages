function notFoundHandler(req, res, next) {
    res.status(404).render('404', {
        title: 'Page Not Found | Egypt Through the Ages',
        path: req.originalUrl
    });
}
function globalErrorHandler(err, req, res, next) {
    console.error('Unhandled error:', err);
    const wantsJson = req.headers.accept && req.headers.accept.includes('application/json');
    if (wantsJson || req.originalUrl.startsWith('/admin/') || req.originalUrl.startsWith('/account')) {
        return res.status(err.status || 500).json({
            success: false,
            message: err.message || 'Something went wrong on our end. Please try again.'
        });
    }

    res.status(err.status || 500).render('error', {
        title: 'Something Went Wrong | Egypt Through the Ages',
        message: err.message || 'Something went wrong on our end. Please try again.'
    });
}
function asyncHandler(fn) {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
}

module.exports = { notFoundHandler, globalErrorHandler, asyncHandler };