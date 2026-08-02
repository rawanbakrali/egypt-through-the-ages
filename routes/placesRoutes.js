const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../middleware/auth');
const placesController = require('../controllers/placesController');
const {
    handleValidationErrors,
    createPlaceRules,
    updatePlaceRules
} = require('../middleware/validators/placesValidators');

router.post('/admin/places', requireAdmin, createPlaceRules, handleValidationErrors, placesController.createPlace);
router.put('/admin/places/:id', requireAdmin, updatePlaceRules, handleValidationErrors, placesController.updatePlace);
router.delete('/admin/places/:id', requireAdmin, placesController.deletePlace);
router.patch('/admin/places/:id/status', requireAdmin, placesController.toggleStatus);

module.exports = router;