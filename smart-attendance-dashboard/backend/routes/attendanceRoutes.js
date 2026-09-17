const express = require('express');
const router = express.Router();
const attendanceController = require('../controllers/attendanceController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/scan', authMiddleware, attendanceController.markAttendance);
router.post('/correct', authMiddleware, attendanceController.correctAttendance);

module.exports = router;
