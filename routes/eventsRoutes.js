const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../middleware/auth');
const eventsController = require('../controllers/eventsController');
const {
    handleValidationErrors,
    submitEventRules,
    createEventRules,
    updateEventRules
} = require('../middleware/validators/eventsValidators');

// Public
router.get('/events', eventsController.listEvents);
router.get('/event/:slug', eventsController.showEvent);
router.post('/events/submit', submitEventRules, handleValidationErrors, eventsController.submitEvent);

// Admin
router.post('/admin/events', requireAdmin, createEventRules, handleValidationErrors, eventsController.createEvent);
router.put('/admin/events/:slug', requireAdmin, updateEventRules, handleValidationErrors, eventsController.updateEvent);
router.delete('/admin/events/:slug', requireAdmin, eventsController.deleteEvent);
router.post('/admin/events/:slug/approve', requireAdmin, eventsController.approveEvent);
router.post('/admin/events/:slug/reject', requireAdmin, eventsController.rejectEvent);

module.exports = router;