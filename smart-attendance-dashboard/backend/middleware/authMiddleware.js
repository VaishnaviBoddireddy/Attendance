const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const tokenHeader = req.header('Authorization');
    
    if (!tokenHeader) {
        return res.status(401).json({ message: 'Access denied. Authorization token required.' });
    }

    try {
        const token = tokenHeader.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'sru_attendance_secret_key_2026');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};
