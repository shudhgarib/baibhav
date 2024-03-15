// routes/studentAuth.route.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Student = require('../models/student.model');

// Student Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if student with provided email exists
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const passwordsMatch = await bcrypt.compare(password, student.password);
    if (!passwordsMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ studentId: student._id }, 'your_secret_key', { expiresIn: '1h' });

    // Send token in response
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in student:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
