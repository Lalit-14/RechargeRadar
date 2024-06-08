import React, { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem('isLoggedIn', true);
        navigate('/dash');
      } else {
        setError('Invalid email or password');
      }
    } catch (error) {
      setError('Error logging in');
    }
  };

  return (
    <div className='container'>
      <div className='left'>
        <div className='logo'>
          <a href='/'><img src='./assets/logo.png' alt='logo' /></a>
        </div>
        <div className='welcome'>
          <p>Recharge</p>
          <p>Radar</p>
        </div>
      </div>
      <div className='vertical' />
      <form className='sign-in' onSubmit={handleSignIn}>
        <div className='user'>
          <label htmlFor='email'>Email</label>
          <input
            type="email"
            id="email"
            className='textbox'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor='password'>Password</label>
          <input
            type="password"
            id="password"
            className='textbox'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <div className='sign-in'>
            <button id="sign-in" className='button' type='submit'>Login</button>
            <p>Don’t have an account? You can</p>
            <a href='/signup'><p> sign up here</p></a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
