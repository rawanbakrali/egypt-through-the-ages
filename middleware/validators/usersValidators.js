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

const updateUserRules = [
    body('username')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ max: 50 }).withMessage('Username must be under 50 characters.'),
    body('email')
        .optional({ checkFalsy: true })
        .trim()
        .isEmail().withMessage('Please provide a valid email.'),
    body('role')
        .optional({ checkFalsy: true })
        .isIn(['user', 'admin']).withMessage('Role must be either User or Admin.')
];

module.exports = { handleValidationErrors, updateUserRules };
