// registration route
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../models/admin.model');

router.post('/register', async (req, res) => {
  try {
    // Validate request body
    if (!req.body.name || !req.body.email || !req.body.mobileNumber || !req.body.password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if email is already registered
    const existingAdmin = await Admin.findOne({ email: req.body.email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new admin
    const newAdmin = new Admin({
      name: req.body.name,
      email: req.body.email,
      mobileNumber: req.body.mobileNumber,
      password: hashedPassword
    });

    // Save the admin to the database
    await newAdmin.save();

    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (error) {
    console.error('Error registering admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;

// Login route
router.post('/login', async (req, res) => {
  try {
    // Validate request body
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Check if admin with provided email exists
    const admin = await Admin.findOne({ email: req.body.email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Compare passwords
    const passwordsMatch = await bcrypt.compare(req.body.password, admin.password);
    if (!passwordsMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ adminId: admin._id }, 'your_secret_key', { expiresIn: '1h' });

    // Send token in response
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in admin:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
