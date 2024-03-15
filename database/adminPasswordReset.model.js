
// models/adminPasswordReset.model.js

const mongoose = require('mongoose');

const adminPasswordResetSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600 // Token expires in 1 hour
  }
});

const AdminPasswordReset = mongoose.model('AdminPasswordReset', adminPasswordResetSchema);

module.exports = AdminPasswordReset;
