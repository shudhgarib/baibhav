// routes/adminPasswordReset.route.js

const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const Admin = require('../models/admin.model');
const AdminPasswordReset = require('../models/adminPasswordReset.model');

// Create reusable transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  // Configuration for your email service provider
});

// Endpoint to request password reset
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    // Check if admin with provided email exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }

    // Generate unique token for password reset
    const token = crypto.randomBytes(20).toString('hex');

    // Save token to the database
    await AdminPasswordReset.findOneAndDelete({ email }); // Remove any existing reset tokens
    await AdminPasswordReset.create({ email, token });

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

// routes/adminPasswordReset.route.js (continued)

// Endpoint to handle password reset with token
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find the token in the database
    const resetToken = await AdminPasswordReset.findOne({ token });
    if (!resetToken) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Update the admin's password
    const admin = await Admin.findOneAndUpdate({ email: resetToken.email }, { password: newPassword });

    // Delete the reset token from the database
    await AdminPasswordReset.findOneAndDelete({ token });

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;


// Endpoint to handle password reset with token
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find the token in the database
    const resetToken = await AdminPasswordReset.findOne({ token });
    if (!resetToken) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Update the admin's password
    const admin = await Admin.findOne({ email: resetToken.email });
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update admin's password
    admin.password = hashedPassword;
    await admin.save();

    // Delete the reset token from the database
    await AdminPasswordReset.findOneAndDelete({ token });

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

// reset password
// Endpoint to handle password reset with token
router.post('/reset-password', async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    // Find the token in the database
    const resetToken = await StudentPasswordReset.findOne({ token });
    if (!resetToken) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    // Update the student's password
    const student = await Student.findOne({ email: resetToken.email });
    if (!student) {
      return res.status(400).json({ message: 'Student not found' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update student's password
    student.password = hashedPassword;
    await student.save();

    // Delete the reset token from the database
    await StudentPasswordReset.findOneAndDelete({ token });

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
