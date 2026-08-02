// routes/uploadRoutes.js
const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../middleware/auth');
const uploadController = require('../controllers/uploadController');

router.post('/admin/upload', requireAdmin, uploadController.uploadImage);

module.exports = router;