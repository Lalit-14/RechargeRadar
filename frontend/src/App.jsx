import "./App.css"
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Landing from "./components/landing/Landing"
import Signup from "./components/signup/Signup"
import Login from "./components/login/Login"
import Book from "./components/book/Book"
import Admin from "./components/admin/Admin"
import Navbar from "./components/navbar/Navbar"
const App = () => {
  return (
    <Router>
      <div className="page">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Landing/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/book" element={<Book/>}/>
          <Route path="/admin" element={<Admin/>}/>
          
        </Routes>
      </div>
    </Router>
  )
}

export default App