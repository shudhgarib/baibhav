// models/studentPasswordReset.model.js

const mongoose = require('mongoose');

const studentPasswordResetSchema = new mongoose.Schema({
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

const StudentPasswordReset = mongoose.model('StudentPasswordReset', studentPasswordResetSchema);

module.exports = StudentPasswordReset;
