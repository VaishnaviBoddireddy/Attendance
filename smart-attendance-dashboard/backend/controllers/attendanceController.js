const Attendance = require('../models/Attendance');
const User = require('../models/User');

exports.markAttendance = async (req, res) => {
    try {
        const studentId = req.user.studentId;
        const { hourName, date } = req.body;

        if (!hourName || !date) {
            return res.status(400).json({ message: 'Missing class details in QR code.' });
        }

        const record = new Attendance({
            studentId,
            date,
            hourName,
            status: 'Present'
        });

        await record.save();
        res.status(200).json({ message: `Attendance marked successfully for ${hourName}` });

    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Attendance already marked for this class hour.' });
        }
        res.status(500).json({ message: 'Error marking attendance' });
    }
};

exports.correctAttendance = async (req, res) => {
    try {
        const { studentRollNumber, date, hourName, newStatus } = req.body;

        const student = await User.findOne({ rollNumber: studentRollNumber });
        if (!student) {
            return res.status(404).json({ message: 'Student roll number not found.' });
        }

        const record = await Attendance.findOneAndUpdate(
            { studentId: student._id, date, hourName },
            { status: newStatus },
            { new: true, upsert: true }
        );

        res.status(200).json({ message: 'Attendance record corrected successfully', record });
    } catch (error) {
        res.status(500).json({ message: 'Error updating attendance' });
    }
};
