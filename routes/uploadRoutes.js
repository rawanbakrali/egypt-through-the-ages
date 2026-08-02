const express = require('express');
const router = express.Router();
const { requireAdmin, requireAuth } = require('../middleware/auth');
const uploadController = require('../controllers/uploadController');

router.post('/admin/upload', requireAdmin, uploadController.uploadImage);
router.post('/upload', requireAuth, uploadController.uploadImage);

module.exports = router;