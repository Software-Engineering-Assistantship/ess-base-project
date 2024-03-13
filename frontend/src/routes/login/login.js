import { Link, useNavigate } from "react-router-dom"; // Import useNavigate here
import { useState, useEffect } from "react";
import '../../style/Login.css';
import React from "react";
import logo from "../../assets/logo.svg";
import axios from "axios";
import Headerinicial from "../../components/headerinicial/headerinicial";
const API_BASE = "http://localhost:3001";

function getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        return decodedPayload.userId; // Ensure this matches your JWT payload
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginFailed, setLoginFailed] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_BASE}/users/signin`, {
                email,
                password
            });
            
            if (response.status !== 200) {
                throw new Error('Login failed');
            }
            
            
            localStorage.setItem('token', response.data.token);
            setLoginFailed(false);
            const userId = getUserIdFromToken();
            // Redirect to user profile page upon successful login
            navigate(`/users/${userId}`); // Adjust '/profile' to your profile page's path
            
            console.log(response.data);
        } catch (error) {
            setLoginFailed(true);
            console.error(error);
        }
    };
    
    return (
        <div>
            <Headerinicial />
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
