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

const createReviewRules = [
    body('placeId')
        .optional({ checkFalsy: true })
        .isMongoId().withMessage('Invalid place.'),
    body('eventId')
        .optional({ checkFalsy: true })
        .isMongoId().withMessage('Invalid event.'),
    body().custom((body) => {
        if (!body.placeId === !body.eventId) {
            throw new Error('Specify either a place or an event to review, not both.');
        }
        return true;
    }),
    body('rating')
        .notEmpty().withMessage('A star rating is required.')
        .isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5.'),
    body('reviewText')
        .optional({ checkFalsy: true })
        .isLength({ max: 2000 }).withMessage('Review text must be under 2000 characters.')
];

module.exports = { handleValidationErrors, createReviewRules };