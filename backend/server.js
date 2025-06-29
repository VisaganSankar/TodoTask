const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task'); 
const User = require('./models/User');
const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb+srv://myUser:Mypassword123@cluster0.v36yeof.mongodb.net/todo?retryWrites=true&w=majority')
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));
app.get('/tasks', async (req, res) => {
  const userId = req.query.userId;
  if (!userId) return res.status(400).send('User ID required');
  try {
    const tasks = await Task.find({ userId });
    res.json(tasks);
  } catch (err) {
    console.error("❌ Server error fetching tasks:", err);
    res.status(500).send('Server error');
  }
});
app.post('/tasks', async (req, res) => {
  const { title, userId } = req.body;
  if (!title || !userId) return res.status(400).send('Missing data');

  try {
    const task = new Task({ title, userId });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error("❌ Failed to save task:", err);
    res.status(500).send('Server error');
  }
});

app.post('/register', async (req, res) => {
  const { userId, email, password } = req.body;

  if (!userId || !email || !password)
    return res.status(400).send('Missing fields');

  try {
    const existingUser = await User.findOne({
      $or: [{ userId }, { email }]
    });

    if (existingUser) return res.status(409).send('User already exists');

    const newUser = new User({ userId, email, password });
    await newUser.save();

    res.status(201).send('User registered');
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).send('Server error');
  }
});

app.post('/login', async (req, res) => {
  const { identifier, password } = req.body; 

  try {
    const user = await User.findOne({
      $or: [{ userId: identifier }, { email: identifier }]
    });

    if (!user || user.password !== password) {
      return res.status(401).send('Invalid credentials');
    }

    res.json({
      userId: user.userId,
      email: user.email
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server error');
  }
});

app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, done, userId } = req.body;

  try {
    const updated = await Task.findOneAndUpdate(
      { _id: id, userId },
      { title, done },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Task not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Update failed" });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const deleted = await Task.findOneAndDelete({ _id: id, userId });

    if (!deleted) return res.status(404).json({ error: "Task not found" });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
});

const PORT =5050;
// Start server
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
