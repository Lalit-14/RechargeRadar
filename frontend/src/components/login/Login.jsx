import React from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const handleSignIn = () => {

    navigate('/dashboard')
  }

  return (
  <div className='container'>
    <div className='left'>
        <div className='logo'>
            <img src='./assets/'/> 
        </div>
        <div className='welcome'>
            <p>Recharge </p>
            <p>Radar</p>
            
        </div>
    </div>
    <div className='vertical'/>
    <form className='Sign-in'>

        <div className='user'>
        <label htmlFor='username'>User ID</label>
        <input type="text" id="username" className='textbox'/>
        <label htmlFor='username'>Password</label>
        <input type="password" id="password" className='textbox'/>
        <div className='Sign-in'>
        <button id="Sign in" className='button' onClick={handleSignIn}>Login</button>
        <p>Don’t have an account? You can</p>
        <a href='/signup'><p> sign up here</p></a>
        
        </div>

        </div>
        </form>
    </div>
  )
}

export default Login