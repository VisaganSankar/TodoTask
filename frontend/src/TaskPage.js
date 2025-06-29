import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';

function TaskPage({ user }) {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const userId = user?.uid || user?.displayName;

  useEffect(() => {
    if (!userId) return;

    axios.get(`https://todotask-im6j.onrender.com/tasks?userId=${userId}`)
      .then(res => setTasks(res.data))
      .catch(err => {
        console.error("❌ Fetch error:", err.message);
        alert("❌ Failed to fetch data");
      });
  }, [userId]);

  const addTask = () => {
    if (!input.trim()) return;
    axios.post('https://todotask-im6j.onrender.com/tasks', { title: input, userId })
      .then(res => {
        setTasks([...tasks, res.data]);
        setInput('');
      });
  };

  const toggleTask = (id, done) => {
    axios.put(`https://todotask-im6j.onrender.com/tasks/${id}`, { done: !done })
      .then(res => {
        setTasks(tasks.map(t => (t._id === id ? res.data : t)));
      });
  };

  const deleteTask = (id) => {
    axios.delete(`https://todotask-im6j.onrender.com/tasks/${id}`)
      .then(() => {
        setTasks(tasks.filter(t => t._id !== id));
      });
  };

  const startEdit = (task) => {
    setEditId(task._id);
    setEditInput(task.title);
  };

  const saveEdit = (id) => {
    if (!editInput.trim()) return;
    axios.put(`https://todotask-im6j.onrender.com/tasks/${id}`, { title: editInput, userId })
      .then(res => {
        setTasks(tasks.map(t => (t._id === id ? res.data : t)));
        setEditId(null);
        setEditInput('');
      });
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem('taskUser');
    navigate('/login');
  };

  const filteredTasks = tasks.filter(task =>
    filter === 'all' ? true :
    filter === 'done' ? task.done :
    !task.done
  );

  return (
    <div className="container">
      <div className="wrapper">
        <div className="account-card">
          <h2>👤 Welcome, <span>{user.displayName}</span></h2>
          {user.email && <p className="account-email">📧 {user.email}</p>}
        </div>

        <header><h1>📝 Todo Task Manager</h1></header>

        <div className="task-form">
          <input
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={addTask}>Add</button>
        </div>

        <div className="filter-bar">
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('done')}>Completed</button>
          <button onClick={() => setFilter('pending')}>Pending</button>
        </div>

        <div className="task-list">
          {filteredTasks.map(task => (
            <div className="task" key={task._id}>
              {editId === task._id ? (
                <>
                  <input
                    type="text"
                    className="edit-input"
                    value={editInput}
                    onChange={(e) => setEditInput(e.target.value)}
                  />
                  <button className="save-btn" onClick={() => saveEdit(task._id)}>Save</button>
                  <button className="cancel-btn" onClick={() => setEditId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <div
                    className="task-title"
                    style={{ textDecoration: task.done ? 'line-through' : 'none' }}
                  >
                    {task.title}
                  </div>
                  <div className="task-actions">
                    <button className="edit-btn" onClick={() => toggleTask(task._id, task.done)}>
                      {task.done ? 'Undo' : 'Done'}
                    </button>
                    <button className="edit-btn" onClick={() => startEdit(task)}>Edit</button>
                    <button className="delete-btn" onClick={() => deleteTask(task._id)}>Delete</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        <div className="logout-wrapper">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
