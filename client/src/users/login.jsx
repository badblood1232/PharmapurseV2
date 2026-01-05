import axios from "axios";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { login } from "../redux/userSlice";
import "./login.css"

 function Login(){
    const [data, setData] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const buttonLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/api/login", data);
            const { user, token, message } = response.data || {};
            alert(message || "Login successful");
           dispatch(login({user, token}))
            console.log(response.data); 
            localStorage.setItem("auth",JSON.stringify({user, token}))
            navigate("/");
        } catch (error) {
            console.log(`Login Error ${error}`);
            alert(`${error.response.data.message}`);
        }
    }

    return(
    <div className="auth-login">
        <form className="login" onSubmit={buttonLogin}>
            <h1>Login</h1>
            
            <input type="text" placeholder="username" onChange={(e) => setData({...data, username: e.target.value})}/>
            <input type="password" placeholder="password" onChange={(e) => setData({...data, password: e.target.value})}/>
            <button type="submit">Login</button>
        </form>
        </div>
    )
}

export default Login