const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');

router.get('/hourly', analyticsController.getHourlyAnalytics);
router.get('/summary', analyticsController.getSummaryAnalytics);

module.exports = router;
