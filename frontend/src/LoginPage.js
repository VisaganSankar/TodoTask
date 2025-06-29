import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase';
import './App.css'; 
import axios from 'axios';

function LoginPage({ setUser }) {
  const API = "https://todotask-im6j.onrender.com/tasks";
  const navigate = useNavigate();
const [identifier, setIdentifier] = useState('');
const [password, setPassword] = useState('');


const handleManualLogin = () => {
  axios.post(API, { identifier, password })
    .then(res => {
      const manualUser = {
        displayName: res.data.userId,
        email: res.data.email,
        type: 'manual'
      };
      setUser(manualUser);
      localStorage.setItem('taskUser', JSON.stringify(manualUser));
      navigate('/task');
    })
    .catch(err => {
      alert('❌ Invalid ID or Password');
      console.error("Login error:", err);
    });
};



  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      localStorage.setItem('taskUser', JSON.stringify(user));
      navigate('/task');
    } catch (error) {
      console.error('Google login failed:', error);
      alert('❌ Google login failed');
    }
  };

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2 style={{ marginBottom: '20px', color: '#00ffc6' }}>Login to Task Manager</h2>

      <input
        type="text"
        placeholder="username or Email"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
        className="edit-input"
        style={{ marginBottom: '10px' }}
      />
      <br />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="edit-input"
        style={{ marginBottom: '20px' }}
      />
      <br />

      <button className="save-btn" onClick={handleManualLogin}>🔐 Login with ID</button>

      <hr style={{ margin: '30px auto', width: '60%', borderColor: '#444' }} />

      <button className="save-btn" onClick={handleGoogleLogin}>🔑 Sign in with Google</button>
      <p style={{ marginTop: '20px' }}>
  Don’t have an account? <a href="/register">Register</a>
</p>

    </div>
  );
}

export default LoginPage;
