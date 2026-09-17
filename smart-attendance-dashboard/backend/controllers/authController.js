const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { rollNumber, password } = req.body;

        const user = await User.findOne({ rollNumber });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { studentId: user._id, rollNumber: user.rollNumber, role: user.role },
            process.env.JWT_SECRET || 'sru_attendance_secret_key_2026',
            { expiresIn: '8h' }
        );

        res.status(200).json({
            token,
            rollNumber: user.rollNumber,
            name: user.name,
            role: user.role
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error during login' });
    }
};
