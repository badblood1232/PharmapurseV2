import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css"

function Register() {
    const [data, setData] = useState({
        username: "",
        email: ""   ,
        password: "",
       
    });
    const navigate = useNavigate()


    const buttonRegister = async (e) => {
        e.preventDefault();
        try{
            const user = await axios.post("http://localhost:3001/api/register", data);
            alert(user.data.message)
            navigate("/login");
        } catch (err) {
             console.log(`Register Error ${err}`)
             alert("Something Happened Check something")
           
        }
    }

    return(
       <div className="Register">
        <h1>Register</h1>
        <label>Username</label>
        <input type="text" placeholder="username" onChange={(e) => setData({...data, username: e.target.value})}/>
        <label>Email</label>
        <input type="text" placeholder="email" onChange={(e) => setData({...data, email: e.target.value})}/>
        <label>Password</label>
        <input type="password" placeholder="password" onChange={(e) => setData({...data, password: e.target.value})}/>
        <button onClick={buttonRegister}>Register</button>
       </div>
    )
















}

export default Register