const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true }, // Username
  email: { type: String, required: true, unique: true },   // New
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);
