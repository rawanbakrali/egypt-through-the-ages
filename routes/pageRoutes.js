const express = require('express');
const router = express.Router();
const { requireAdmin } = require('../middleware/auth');
const pageController = require('../controllers/pageController');

router.get('/', pageController.home);
router.get('/era/:slug', pageController.eraPage);
router.get('/admin', requireAdmin, pageController.adminDashboard);
router.get('/profile', pageController.profile);

module.exports = router;