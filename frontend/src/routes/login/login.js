import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import '../../style/Login.css'
import React from "react"
import logo from "../../assets/logo.svg";
const API_BASE = "http://localhost:3001"

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    return (
        <div>
        <div className ="headerinicial">
            <img src={logo} alt="logo" className="logo"/>
        </div>
        <div className="main-content">
        <p  className="title">Login</p>
        <div className="line"></div>
        <p className="name">Usuário</p>
        <input 
                    type="text" 
                    placeholder="Nome de usuário" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
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
        <p className="login-link"><Link to="/login" className="blue-text">Não possui conta?</Link></p>
        </div>
        
        
        </div>
        
    );
}

export default Login