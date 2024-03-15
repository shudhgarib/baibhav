// routes/student.route.js

const express = require('express');
const router = express.Router();
const Student = require('../models/student.model');

// Get students with pagination
router.get('/students', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  try {
    results.totalCount = await Student.countDocuments().exec();
    results.students = await Student.find().limit(limit).skip(startIndex).exec();
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add a new student
router.post('/students', async (req, res) => {
  try {
    const { name, email, mobileNumber, password } = req.body;
    const rollNumber = generateRollNumber(); // You need to implement this function

    const student = new Student({ name, email, mobileNumber, password, rollNumber });
    await student.save();

    // Send email with login credentials
    // You need to implement the email sending functionality

    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    console.error('Error adding student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Update a student
router.put('/students/:id', async (req, res) => {
  try {
    const { name, email, mobileNumber } = req.body;

    await Student.findByIdAndUpdate(req.params.id, { name, email, mobileNumber });

    res.status(200).json({ message: 'Student updated successfully' });
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete a student
router.delete('/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
