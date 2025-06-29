const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: String,
  done: { type: Boolean, default: false },
  userId: String  // ✅ This stores who the task belongs to
});

module.exports = mongoose.model('Task', TaskSchema);
