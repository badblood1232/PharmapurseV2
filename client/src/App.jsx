import Login  from './users/login.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Register from './users/Register.jsx'

function App() {
 
  return (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  </Router>
  )
}

export default App
