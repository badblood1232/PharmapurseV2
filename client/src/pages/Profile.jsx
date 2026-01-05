import { useSelector } from 'react-redux'
import './profile.css'
import EditProfileModal from './EditProfile.jsx'
import { useState } from 'react'
function Profile() {
  const { user, token } = useSelector((state) => state.user)


  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false)
  
  return (
    <div className="profile">
      <div className="profile__header">
        <h1>Profile</h1>
        <p>View and manage your account information</p>
      </div>
      <div className="profile__content">
        <div className="profile__card">
          <h2>Account Information</h2>
          <div className="profile__info">
            <div className="profile__field">
              <label>Username:</label>
              <span>{typeof user === 'string' ? user : user?.username || 'N/A'}</span>
            </div>
            {token && (
              <div className="profile__field">
                <label>Session:</label>
                <span>Logged in</span>
              </div>
            )}
          </div>
        </div>
      </div>
     <button onClick={() => setIsEditProfileOpen(true)}>Edit Profile</button>
     <EditProfileModal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} />
    </div>
  )
}

export default Profile

