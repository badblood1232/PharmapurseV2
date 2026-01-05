

function EditProfilePage({isOpen, onClose}) {

    if (!isOpen) return null;
    return (
       <div className="edit-profile-page" onClick={onClose}>
        <div className="edit-profile-page__header" onClick={e => e.stopPropagation()}>
            <h2>Edit Profile</h2>

            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Password" />
         
        </div>
        <button onClick={onClose}>Close</button>
       </div>
    )
}   

export default EditProfilePage;