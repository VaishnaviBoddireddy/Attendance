const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    studentId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    date: { 
        type: String, 
        required: true // YYYY-MM-DD
    },
    hourName: { 
        type: String, 
        required: true // e.g., "DBMS", "OS"
    },
    status: { 
        type: String, 
        enum: ['Present', 'Absent', 'Corrected'], 
        default: 'Present' 
    },
    timestamp: { 
        type: Date, 
        default: Date.now 
    }
});

attendanceSchema.index({ studentId: 1, date: 1, hourName: 1 }, { unique: true });

module.exports = mongoose.model('Attendance', attendanceSchema);
