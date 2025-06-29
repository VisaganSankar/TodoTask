import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase';
import './App.css';
import axios from 'axios';

function LoginPage({ setUser }) {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  // Manual login handler
  const handleManualLogin = async () => {
    if (!identifier || !password) {
      alert("Please fill in both fields");
      return;
    }

    try {
      const res = await axios.post('https://todotask-im6j.onrender.com/login', {
        identifier,
        password
      });

      const manualUser = {
        uid: res.data.userId,
        email: res.data.email,
        type: 'manual'
      };

      localStorage.setItem('taskUser', JSON.stringify(manualUser));
      setUser(manualUser);
      navigate('/task');
    } catch (err) {
      console.error("Login error:", err);
      alert('❌ Invalid username/email or password');
    }
  };

  // Google login handler
 const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userData = {
      displayName: user.displayName,
      email: user.email,
      uid: user.uid,
      type: "google",
    };

    setUser(userData);
    localStorage.setItem("taskUser", JSON.stringify(userData));
    navigate("/task");
  } catch (error) {
    console.error("❌ Google login failed:", error);
    alert("Google login failed. Check console.");
  }
};

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2 style={{ marginBottom: '20px', color: '#00ffc6' }}>Login to Task Manager</h2>

      <input
        type="text"
        placeholder="Username or Email"
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

      <button className="save-btn" onClick={handleManualLogin}> Login with ID</button>

      <hr style={{ margin: '30px auto', width: '60%', borderColor: '#444' }} />

      <button className="save-btn" onClick={handleGoogleLogin}> Sign in with Google</button>

      <p style={{ marginTop: '20px' }}>
        Don’t have an account? <a href="/register">Register</a>
      </p>
    </div>
  );
}

export default LoginPage;
