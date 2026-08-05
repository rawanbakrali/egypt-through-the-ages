const { body, validationResult } = require('express-validator');

function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array()[0].msg
        });
    }
    next();
}

const submitEventRules = [
    body('title')
        .trim()
        .notEmpty().withMessage('Event title is required.')
        .isLength({ max: 150 }).withMessage('Event title must be under 150 characters.'),
    body('description')
        .trim()
        .notEmpty().withMessage('Description is required.')
        .isLength({ max: 2000 }).withMessage('Description must be under 2000 characters.'),
    body('date')
        .notEmpty().withMessage('Date is required.')
        .isISO8601().withMessage('Please provide a valid date.'),
    body('time')
        .notEmpty().withMessage('Time is required.'),
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required.')
        .isLength({ max: 150 }).withMessage('Location must be under 150 characters.'),
    body('category')
        .trim()
        .notEmpty().withMessage('Please select a category.'),
    body('ticketUrl')
        .optional({ checkFalsy: true })
        .isURL().withMessage('Booking link must be a valid URL.'),
    body('image')
        .optional({ checkFalsy: true })
        .trim(),
    body('lat')
        .optional({ checkFalsy: true })
        .isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude.'),
    body('lng')
        .optional({ checkFalsy: true })
        .isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude.')
];

const createEventRules = [
    body('title')
        .trim()
        .notEmpty().withMessage('Event title is required.')
        .isLength({ max: 150 }).withMessage('Event title must be under 150 characters.'),
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required.')
        .isLength({ max: 150 }).withMessage('Location must be under 150 characters.'),
    body('image')
        .trim()
        .notEmpty().withMessage('An image is required.'),
    body('date')
        .notEmpty().withMessage('Date is required.')
        .isISO8601().withMessage('Please provide a valid date.'),
    body('lat')
        .notEmpty().withMessage('Please pick a location on the map.')
        .isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude.'),
    body('lng')
        .notEmpty().withMessage('Please pick a location on the map.')
        .isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude.'),
    body('description')
        .optional({ checkFalsy: true })
        .isLength({ max: 2000 }).withMessage('Description must be under 2000 characters.'),
    body('bookingStatus')
        .optional({ checkFalsy: true })
        .isIn(['open', 'reserved']).withMessage('Booking status must be Open or Reserved.')
];

const updateEventRules = [
    body('title')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 150 }).withMessage('Event title must be under 150 characters.'),
    body('location')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 150 }).withMessage('Location must be under 150 characters.'),
    body('description')
        .optional({ checkFalsy: true })
        .isLength({ max: 2000 }).withMessage('Description must be under 2000 characters.'),
    body('bookingStatus')
        .optional({ checkFalsy: true })
        .isIn(['open', 'reserved']).withMessage('Booking status must be Open or Reserved.'),
    body('date')
        .optional({ checkFalsy: true })
        .isISO8601().withMessage('Please provide a valid date.'),
    body('lat')
        .optional({ checkFalsy: true })
        .isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude.'),
    body('lng')
        .optional({ checkFalsy: true })
        .isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude.'),
    body('type')
        .optional({ checkFalsy: true })
        .isIn(['official', 'business', 'community']).withMessage('Invalid event type.')
];

module.exports = {
    handleValidationErrors,
    submitEventRules,
    createEventRules,
    updateEventRules
};