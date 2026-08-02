const { body, validationResult } = require('express-validator');
function handleValidationErrors(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors.array()[0].msg // show the first validation error
        });
    }
    next();
}

const registerRules = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required.')
        .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters.'),
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Please enter a valid email address.'),
    body('password')
        .notEmpty().withMessage('Password is required.')
        .isLength({ min: 8 }).withMessage('Password must be at least 8 characters.'),
    body('confirmPassword')
        .notEmpty().withMessage('Please confirm your password.')
];

const loginRules = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Please enter a valid email address.'),
    body('password')
        .notEmpty().withMessage('Password is required.')
];

const updateAccountRules = [
    body('username')
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters.'),
    body('email')
        .optional({ checkFalsy: true })
        .trim()
        .isEmail().withMessage('Please enter a valid email address.'),
    body('newPassword')
        .optional({ checkFalsy: true })
        .isLength({ min: 8 }).withMessage('New password must be at least 8 characters.')
];

const deleteAccountRules = [
    body('password')
        .notEmpty().withMessage('Password is required to delete your account.')
];

module.exports = {
    handleValidationErrors,
    registerRules,
    loginRules,
    updateAccountRules,
    deleteAccountRules
};