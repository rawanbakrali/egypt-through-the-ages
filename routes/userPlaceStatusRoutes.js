const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const controller = require('../controllers/userPlaceStatusController');

router.post('/status/:type/toggle', requireAuth, controller.toggleStatus);
router.get('/status/:placeId', requireAuth, controller.getStatusesForPlace);
router.get('/status/mine/all', requireAuth, controller.getMyStatuses);

module.exports = router;