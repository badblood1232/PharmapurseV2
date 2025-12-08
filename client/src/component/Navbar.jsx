import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/userSlice'
import './navbar.css'

function Navbar() {
  const { user, token } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  // Only show navbar if user is logged in
  if (!token) {
    return null
  }

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          <h2>PharmaPurse</h2>
        </Link>
        <div className="navbar__links">
          <Link to="/medicine-inventory" className="navbar__link">
            Medicine Inventory
          </Link>
          <Link to="/profile" className="navbar__link">
            Profile
          </Link>
          {user && (
            <span className="navbar__user">Welcome, {typeof user === 'string' ? user : user.username || 'User'}</span>
          )}
          <button onClick={handleLogout} className="navbar__logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

