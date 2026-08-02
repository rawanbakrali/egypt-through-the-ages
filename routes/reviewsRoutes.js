const express = require('express');
const router = express.Router();
const { requireAuth } = require('../middleware/auth');
const reviewsController = require('../controllers/reviewsController');
const { handleValidationErrors, createReviewRules } = require('../middleware/validators/reviewsValidators');

router.post('/reviews', requireAuth, createReviewRules, handleValidationErrors, reviewsController.createReview);
router.delete('/reviews/:id', requireAuth, reviewsController.deleteReview);
router.get('/reviews/place/:placeId', reviewsController.getReviewsForPlace); // public — anyone can view reviews
router.get('/reviews/mine', requireAuth, reviewsController.getMyReviews);

module.exports = router;