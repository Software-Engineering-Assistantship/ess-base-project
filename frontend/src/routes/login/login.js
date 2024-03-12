import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import '../../style/Login.css';
import React from "react";
import logo from "../../assets/logo.svg";
import axios from "axios";

const API_BASE = "http://localhost:3001";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginFailed, setLoginFailed] = useState(false); // Add state for login failure

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_BASE}/users/signin`, {
                email,
                password
            });
            
            // Check if the status code indicates a failure
            if (response.status !== 200) {
                // Assuming 200 is the only success code, adjust as needed
                throw new Error('Login failed');
            }
            
            localStorage.setItem('token', response.data.token);
            setLoginFailed(false); // Reset login failure on success
            // Handle successful login response
            console.log(response.data);
        } catch (error) {
            setLoginFailed(true); // Set login failure on error
            console.error(error);
        }
    };
    

    return (
        <div>
            <div className="headerinicial">
                <img src={logo} alt="logo" className="logo4"/>
            </div>
            <div className="main-content">
                <p className="titlelogin">Login</p>
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
                {loginFailed && <p style={{ color: 'red' }}>Login falhou, por favor tente novamente.</p>}
                <button onClick={handleLogin} className="loginbutton">Login</button>
                <p className="login-link"><Link to="/Signup" className="blue-text">Não possui conta?</Link></p>
            </div>
        </div>
    );
};

export default Login;
