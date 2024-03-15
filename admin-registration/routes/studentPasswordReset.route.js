// routes/studentPasswordReset.route.js

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Student = require('../models/student.model');
const StudentPasswordReset = require('../models/studentPasswordReset.model');

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  // Configuration for your email service provider
});

// Endpoint to request password reset
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if student with provided email exists
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Generate unique token for password reset
    const token = crypto.randomBytes(20).toString('hex');

    // Save token to the database
    await StudentPasswordReset.findOneAndDelete({ email }); // Remove any existing reset tokens
    await StudentPasswordReset.create({ email, token });

    // Send email with password reset link
    const resetLink = `http://example.com/reset-password?token=${token}`;
    await transporter.sendMail({
      from: 'your@example.com',
      to: email,
      subject: 'Password Reset Request',
      text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${resetLink}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`
    });

    res.status(200).json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    console.error('Error sending password reset link:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
