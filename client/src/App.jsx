import Login from './users/login.jsx'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css'
import Register from './users/Register.jsx'
import Home from './pages/Home.jsx'
import MedicineInventory from './pages/MedicineInventory.jsx'
import Profile from './pages/Profile.jsx'
import Navbar from './component/Navbar.jsx'
import {useEffect} from 'react'
import { useDispatch } from "react-redux";
import { login } from "./redux/userSlice";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");

    if (storedAuth) {
      const { user, token } = JSON.parse(storedAuth);
      dispatch(login({ user, token }));
    }
  }, []);
 
  return (
    
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/medicine-inventory" element={<MedicineInventory />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </Router>
  )
}

export default App
