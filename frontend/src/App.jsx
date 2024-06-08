import "./App.css"
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Landing from "./components/landing/Landing"
import Signup from "./components/signup/Signup"
import Login from "./components/login/Login"
const App = () => {
  return (
    <Router>
      <div className="page">
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          
        </Routes>
      </div>
    </Router>
  )
}

export default App