const express = require('express');
const router = express.Router();
const { requireAuth, requireAdmin } = require('../middleware/auth');
const bookingsController = require('../controllers/bookingsController');

router.post('/bookings', requireAuth, bookingsController.setStatus);
router.get('/bookings/event/:eventId', requireAuth, bookingsController.getStatusForEvent);
router.get('/admin/bookings', requireAdmin, bookingsController.getAllBookings);

module.exports = router;