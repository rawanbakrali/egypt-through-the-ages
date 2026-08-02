const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const authController = require('../controllers/authController');
const {
    handleValidationErrors,
    registerRules,
    loginRules,
    updateAccountRules,
    deleteAccountRules
} = require('../middleware/validators/authValidators');

router.post('/login', loginRules, handleValidationErrors, authController.login);
router.post('/register', registerRules, handleValidationErrors, authController.register);
router.post('/logout', authController.logout);
router.put('/account', requireAuth, updateAccountRules, handleValidationErrors, authController.updateAccount);
router.delete('/account', requireAuth, deleteAccountRules, handleValidationErrors, authController.deleteAccount);

module.exports = router;