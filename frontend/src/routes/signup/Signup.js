import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import '../../style/Signup.css'
import React from "react"
import logo from "../../assets/logo.svg";
import logo2 from "../../assets/logo2.svg";
import logo3 from "../../assets/logo3.svg";
const API_BASE = "http://localhost:3001"

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // You can add form submission logic here, like sending a request to your backend API
        console.log("Form submitted:", formData);
    };
    
    return (
        <div>
        <div className="headerinicial">
                <img src={logo} alt="logo" className="logo" />
        </div>     
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="headersignup">
                  <img src={logo3} alt="logo3" className="logo3"/>
                  <h2 >AlmoCIn-Cadastrar novo Usuário</h2>

                </div>
                
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
                </div>
                <button type="submit">Cadastrar</button>
                <p>Already have an account? <Link to="/login">Login</Link></p>
            </form>
        </div>
        </div>
    );
}

export default Signup