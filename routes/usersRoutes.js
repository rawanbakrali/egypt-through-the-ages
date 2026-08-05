const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../middleware/auth');
const usersController = require('../controllers/usersController');
const { handleValidationErrors, updateUserRules } = require('../middleware/validators/usersValidators');

router.put('/admin/users/:id', requireAdmin, updateUserRules, handleValidationErrors, usersController.updateUser);
router.delete('/admin/users/:id', requireAdmin, usersController.deleteUser);

module.exports = router;
