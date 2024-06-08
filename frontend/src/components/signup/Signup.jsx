import React from 'react'
import './signup.css';
const Signup = () => {
  return (
    <div className="signup-container">

      <h1>Recharge Radar</h1>
      <form>
        <div className="form-group">
        <div class="form-item">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" className='textbox' />
          </div>
        <div class="form-item">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" className='textbox'/>
          </div>
        <div class="form-item">
          <label htmlFor="username">Enter User ID</label>
          <input type="text" id="username" name="username" className='textbox'/>
          </div>
        <div class="form-item">
          <label htmlFor="interests">Interests</label>
          <input type="text" id="interests" name="interests" className='textbox'/>
          </div>
        <div class="form-item">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" className='textbox'/>
          </div>
       <div class="form-item">
          <label htmlFor="skills">Skills</label>
          <input type="text" id="skills" name="skills" className='textbox'/>
          </div>
       <div class="form-item">
          <label htmlFor="email">Email ID</label>
          <input type="email" id="email" name="email" className='textbox'/>
          </div>
       <div class="form-item">
          <label htmlFor="availability">Availability</label>
          <input type="text" id="availability" name="availability" className='textbox'/>
          </div>
        </div>
        <button type="submit" className='submit'>Sign-Up</button>
      </form>
    </div>
  )
}

export default Signup