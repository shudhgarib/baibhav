// routes/attendance.route.js

const express = require('express');
const router = express.Router();
const Attendance = require('../models/attendance.model');

// Get all student attendance records
router.get('/attendance', async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find().populate('studentId');
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Filter attendance records by date and specific student
router.get('/attendance/search', async (req, res) => {
  try {
    const { date, studentId } = req.query;
    let query = {};

    if (date) {
      query.date = new Date(date);
    }

    if (studentId) {
      query.studentId = studentId;
    }

    const attendanceRecords = await Attendance.find(query).populate('studentId');
    res.status(200).json(attendanceRecords);
  } catch (error) {
    console.error('Error searching attendance records:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
