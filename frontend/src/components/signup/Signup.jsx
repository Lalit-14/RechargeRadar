import React, { useState } from 'react';
import './signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/register', {
        name,
        phone,
        username,
        password,
        email
      });
      if (response.status === 200) {
        navigate('/login');
      } else {
        console.error('Error registering user:', response.data.message);
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="signup-container">
      <h1>Recharge Radar</h1>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <div className="form-item">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="textbox"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="textbox"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label htmlFor="username">Enter User ID</label>
            <input
              type="text"
              id="username"
              name="username"
              className="textbox"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="textbox"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-item">
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              id="email"
              name="email"
              className="textbox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="submit">
          Sign-Up
        </button>
      </form>
    </div>
  );
};

export default Signup;
