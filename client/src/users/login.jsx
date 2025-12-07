import axios from "axios";
import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import "./login.css"

 function Login(){
    const [data, setData] = useState({
        username: "",
        password: ""
    });
    const navigate = useNavigate();

    const buttonLogin = (e) => {
        e.preventDefault();
        try{
            const user = axios.post("http://localhost:3001/api/login", data);
            alert(user.data.message)
            navigate("/awd");
        } catch (err) {
             console.log(`Login Error ${err}`)
             alert("Something Happened Check something")
           
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