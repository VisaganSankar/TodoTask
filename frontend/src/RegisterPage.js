import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {

  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailPattern.test(email)) {
  alert('❌ Please enter a valid email address');
  return;
}

    axios.post('https://todotask-im6j.onrender.com/register', { userId,email,password })
      .then(() => {
        alert('✅ Registered! You can now login.');
        navigate('/login');
      })
      .catch(err => {
        if (err.response?.status === 409) {
          alert('❌ User already exists');
        } else {
          alert('❌ Registration failed');
        }
      });
  };

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2 style={{ color: '#00ffc6' }}>Register New Account</h2>
      <input
        type="text"
        placeholder="Choose a user ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="edit-input"
        style={{ marginBottom: '10px' }}
      />
      <br/>
      <input
  type="email"
  placeholder="Enter Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  className="edit-input"
  required
  style={{ marginBottom: '10px' }}
/>

      <br />
      <input
        type="password"
        placeholder="Choose a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="edit-input"
        style={{ marginBottom: '20px' }}
      />
      <br />
      <button className="save-btn" onClick={handleRegister}>📝 Register</button>
    </div>
  );
}

export default RegisterPage;
