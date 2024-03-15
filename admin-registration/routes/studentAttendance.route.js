// routes/studentAttendance.route.js

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const StudentAttendance = require('../models/studentAttendance.model');

// Endpoint to fetch attendance records
router.get('/attendance', async (req, res) => {
  try {
    // Extract student ID from JWT token
    const token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent in the Authorization header
    const decodedToken = jwt.verify(token, 'your_secret_key');
    const studentId = decodedToken.studentId;

    // Fetch attendance records for the current student
    const attendanceRecords = await StudentAttendance.find({ studentId }).sort({ date: -1 });
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;


// routes/studentAttendance.route.js (continued)

// Endpoint to filter attendance records by specific dates
router.get('/attendance/filter', async (req, res) => {
  try {
    // Extract student ID from JWT token
    const token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent in the Authorization header
    const decodedToken = jwt.verify(token, 'your_secret_key');
    const studentId = decodedToken.studentId;

    const { startDate, endDate } = req.query;

    // Fetch attendance records for the current student within the specified date range
    const attendanceRecords = await StudentAttendance.find({
      studentId,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) }
    }).sort({ date: -1 });

    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error('Error filtering attendance records:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;


// Endpoint to mark attendance
router.post('/mark-attendance', async (req, res) => {
  try {
    // Extract student ID from JWT token
    const token = req.headers.authorization.split(' ')[1]; // Assuming the token is sent in the Authorization header
    const decodedToken = jwt.verify(token, 'your_secret_key');
    const studentId = decodedToken.studentId;

    // Extract attendance status from the request body (entering or leaving)
    const { status } = req.body;

    // Create a new attendance record
    const attendanceRecord = new StudentAttendance({
      studentId,
      status // 'Entering' or 'Leaving'
    });

    // Save the attendance record to the database
    await attendanceRecord.save();

    res.status(200).json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
