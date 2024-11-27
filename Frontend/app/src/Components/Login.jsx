import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // State to handle error messages
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      if (response.data.user) {
        localStorage.setItem('userEmail', response.data.user.email); // Store email in localStorage
        console.log('Login successful');
        navigate('/profile'); // Redirect to ProfilePage
      } else {
        setError(response.data.message || 'Login failed'); // Show error message
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      setError('An error occurred during login. Please try again.');
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <Link to="/">
          <h1>CODECRAFTER</h1>
        </Link>
      </div>
      <div className="login-box">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>} {/* Display error if exists */}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email :</label>
            <input
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label>Password :</label>
            <input
              type="password"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p>OR</p>
        <p>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
