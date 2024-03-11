import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import '../../style/Login.css'
import React from "react"
import logo from "../../assets/logo.svg";
import logo3 from "../../assets/logo3.svg";
import axios from "axios";
const API_BASE = "http://localhost:3001"

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_BASE}/users/signin`, {
                email,
                password
            });
            localStorage.setItem('token', response.data.token);
            // Handle successful login response
            console.log(response.data);
        } catch (error) {
            // Handle login error
            console.error(error);
        }
    };
    
    return (
        <div>
        <div className ="headerinicial">
            <img src={logo} alt="logo" className="logo"/>
        </div>
        <div className="main-content">
        <p  className="titlelogin">Login</p>
        <div className="line"></div>
        <p className="emaillogin">Email</p>
        <input 
                    type="text" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="input-field"
                />
        <p className="password">Senha</p>
                <input 
                    type="password" 
                    placeholder="Senha" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="input-field"
                />
        <button onClick={handleLogin} className="loginbutton">Login</button>
        <p className="login-link"><Link to="/Signup" className="blue-text">Não possui conta?</Link></p>
        </div>
        
        
        </div>
        
    );
}

export default Login