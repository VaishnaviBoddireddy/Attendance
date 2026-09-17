const Attendance = require('../models/Attendance');

const BATCH_SIZE = 50;

exports.getHourlyAnalytics = async (req, res) => {
    try {
        const { date, hourName } = req.query;

        const presentCount = await Attendance.countDocuments({ 
            date, 
            hourName, 
            status: { $in: ['Present', 'Corrected'] } 
        });

        const absentCount = Math.max(0, BATCH_SIZE - presentCount);

        res.status(200).json({
            hourName: hourName || 'DBMS',
            totalStudents: BATCH_SIZE,
            present: presentCount,
            absent: absentCount
        });
    } catch (error) {
        res.status(500).json({ message: 'Error computing hourly analytics' });
    }
};

exports.getSummaryAnalytics = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;

        const records = await Attendance.find({
            date: { $gte: startDate, $lte: endDate },
            status: { $in: ['Present', 'Corrected'] }
        });

        const uniqueSessions = await Attendance.distinct('hourName', {
            date: { $gte: startDate, $lte: endDate }
        });

        const sessionCount = uniqueSessions.length || 1;
        const avgPresent = Math.round(records.length / sessionCount);
        const avgAbsent = Math.max(0, BATCH_SIZE - avgPresent);

        res.status(200).json({
            totalStudents: BATCH_SIZE,
            averagePresent: avgPresent,
            averageAbsent: avgAbsent
        });
    } catch (error) {
        res.status(500).json({ message: 'Error computing summary analytics' });
    }
};
