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

const createPlaceRules = [
    body('name')
        .trim()
        .notEmpty().withMessage('Place name is required.')
        .isLength({ max: 100 }).withMessage('Place name must be under 100 characters.'),
    body('era')
        .trim()
        .notEmpty().withMessage('Please select an era.'),
    body('category')
        .trim()
        .notEmpty().withMessage('Please select a category.'),
    body('location')
        .trim()
        .notEmpty().withMessage('Location is required.')
        .isLength({ max: 150 }).withMessage('Location must be under 150 characters.'),
    body('image')
        .trim()
        .notEmpty().withMessage('An image is required.'),
    body('lat')
        .notEmpty().withMessage('Please pick a location on the map.')
        .isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude.'),
    body('lng')
        .notEmpty().withMessage('Please pick a location on the map.')
        .isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude.'),
    body('description')
        .optional({ checkFalsy: true })
        .isLength({ max: 2000 }).withMessage('Description must be under 2000 characters.'),
    body('status')
        .optional({ checkFalsy: true })
        .isIn(['published', 'draft']).withMessage('Status must be either Published or Draft.')
];

const updatePlaceRules = [
    body('name')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 100 }).withMessage('Place name must be under 100 characters.'),
    body('location')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 150 }).withMessage('Location must be under 150 characters.'),
    body('description')
        .optional({ checkFalsy: true })
        .isLength({ max: 2000 }).withMessage('Description must be under 2000 characters.'),
    body('status')
        .optional({ checkFalsy: true })
        .isIn(['published', 'draft']).withMessage('Status must be either Published or Draft.'),
    body('lat')
        .optional({ checkFalsy: true })
        .isFloat({ min: -90, max: 90 }).withMessage('Invalid latitude.'),
    body('lng')
        .optional({ checkFalsy: true })
        .isFloat({ min: -180, max: 180 }).withMessage('Invalid longitude.')
];

module.exports = { handleValidationErrors, createPlaceRules, updatePlaceRules };