// routes/qrPageAuth.route.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');

// QR-Page Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin with provided email exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const passwordsMatch = await bcrypt.compare(password, admin.password);
    if (!passwordsMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ adminId: admin._id }, 'your_secret_key', { expiresIn: '1h' });

    // Send token in response
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in admin for QR-Page:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
