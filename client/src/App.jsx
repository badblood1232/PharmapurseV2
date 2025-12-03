import Login  from './users/login.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

function App() {
 
  return (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  </Router>
  )
}

export default App
