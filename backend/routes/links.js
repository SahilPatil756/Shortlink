const express = require('express');
const router = express.Router();
const { createLink, getLinks, getAnalytics } = require('../controllers/linkController');
const { protect, optionalAuth } = require('../middleware/authMiddleware');

router.route('/').post(optionalAuth, createLink).get(protect, getLinks);
router.get('/analytics/:id', protect, getAnalytics);

module.exports = router;
