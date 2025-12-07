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
        <div className="auth-register">
            <form className="register" onSubmit={buttonRegister}>
                <h1>Register</h1>
                <input type="text" placeholder="username" onChange={(e) => setData({...data, username: e.target.value})}/>
                <input type="email" placeholder="email" onChange={(e) => setData({...data, email: e.target.value})}/>
                <input type="password" placeholder="password" onChange={(e) => setData({...data, password: e.target.value})}/>
                <button type="submit">Register</button>
            </form>
       </div>
    )
















}

export default Register