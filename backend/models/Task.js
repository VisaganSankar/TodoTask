const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  done: { type: Boolean, default: false },
  userId: String,
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
