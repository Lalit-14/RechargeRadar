import "./landing.css"
import Navbar from '../navbar/Navbar'
import Contact from '../contact/Contact'

const Landing = () => {
  return (
    <div className='landing_container'>
        <div className='nav'>
            <Navbar />
        </div>
        
        <div className='image'>
        <img src="./assets/car.jpg" alt="Car" />
        <div className='text'>
        <p>Recharge.</p>
        <p>Rejuvenate.</p>
        <p>Radiate.</p>
        </div>
        <div className='line'><p>While your vehicle Recharges, you can Rejuvenate yourself at Recharge Radar and Radiate your energy to the universe.</p></div>
        </div>
        <div id='contact' className='contact_container'>
          <Contact />
        </div>
    </div>
  )
}

export default Landing