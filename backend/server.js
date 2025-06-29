const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Task = require('./models/Task'); // adjust this path
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
  const { identifier, password } = req.body; // ✅ identifier instead of userId

  try {
    const user = await User.findOne({
      $or: [{ userId: identifier }, { email: identifier }]
    });

    if (!user || user.password !== password) {
      return res.status(401).send('Invalid credentials');
    }

    // ✅ Return user info
    res.json({
      userId: user.userId,
      email: user.email
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).send('Server error');
  }
});


// ✏️ Update task status
app.put('/tasks/:id', async (req, res) => {
  try {
    const { done } = req.body;
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { done },
      { new: true }
    );
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// ❌ Delete a task
app.delete('/tasks/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});
app.get('/', (req, res) => {
  res.send(' Backend working!');
});

const PORT =5050;
// Start server
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});