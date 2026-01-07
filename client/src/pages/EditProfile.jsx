import React from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./EditProfile.css";

function EditProfilePage({isOpen, onClose}) {
    const { token } = useSelector((state) => state.user);
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const buttonSubmit = async(e) =>{
        e.preventDefault();
        try{
           const response = await axios.put("http://localhost:3001/api/edit", data, {
               headers: {
                   Authorization: `Auth ${token}`
               }
           })
           alert("Successfully Updated")
           console.log(response.data)
           onClose();
        }catch(error){
            console.log("Edit Profile Error:", error.response?.data || error.message)
            alert(error.response?.data?.message || "Something Happened")
        }
    }

    if (!isOpen) return null;
    
    return (
       <div className="edit-profile-page" onClick={onClose}>
        <div className="edit-profile-page__header" onClick={e => e.stopPropagation()}>
            <button 
                type="button" 
                className="edit-profile-page__close" 
                onClick={onClose}
                aria-label="Close"
            >
                ×
            </button>
            <h2>Edit Profile</h2>
            <form onSubmit={buttonSubmit}>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={data.email}
                    onChange={(e) => setData({...data, email: e.target.value})} 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={data.password}
                    onChange={(e) => setData({...data, password: e.target.value})} 
                />
                <button type="submit">Save Changes</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
       </div>
    )
}   

export default EditProfilePage;