import "./landing.css"
import Navbar from '../navbar/Navbar'
import Contact from '../contact/Contact'

const Landing = () => {
  return (
    <div className='landing_container'>
        <div className='nav'>
            <Navbar />
        </div>
        <div id='contact'>
          <Contact />
        </div>
    </div>
  )
}

export default Landing