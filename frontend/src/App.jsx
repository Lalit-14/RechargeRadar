import "./App.css"
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Landing from "./components/landing/Landing"
import Signup from "./components/signup/Signup"
import Login from "./components/login/Login"
import Book from "./components/book/Book"
import Admin from "./components/admin/Admin"
import Navbar from "./components/navbar/Navbar"
import Dash from "./components/dash/Dash"
const App = () => {
  return (
    <Router>
      <div className="page">
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/book" element={<Book/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/map" element={<Map/>}/>
          <Route path="dash" element={<Dash/>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App