import { Link, useNavigate } from "react-router-dom"; // Step 1: Import useNavigate
import { useState } from "react";
import axios from "axios";
import logo from "../../assets/logo.svg";
import logo3 from "../../assets/logo3.svg";
import "../../style/Signup.css";
import HeaderInicial from "../../components/headerinicial/headerinicial";

const API_BASE = "http://localhost:3001";

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate(); // Step 2: Initialize useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "password") {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?]).{8,}$/;
            setPasswordError(!passwordRegex.test(value));
        }
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE}/users/signup`, formData);
            console.log("Signup successful:", response.data);
            // Redirect the user to the login page
            navigate('/login'); // Step 3: Navigate to login page
        } catch (error) {
            console.error("Signup failed:", error.response.data);
            // Show an error message to the user
        }
    };

    return (
        <div>
            <HeaderInicial/>
            <div className="signup-container">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="headersignup">
                        <img src={logo3} alt="logo3" className="logo3" />
                        <h2>AlmoCIn-Cadastrar novo Usuário</h2>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Senha</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={passwordError ? "input-error" : ""}
                        />
                        {passwordError && <p className="password-requirement">A senha deve conter no mínimo 1 caracter maiúsculo, 1 caracter minúsculo, 1 símbolo especial e tamanho de pelo menos 8.</p>}
                    </div>
                    <button className="signupbutton" type="submit">Cadastrar</button>
                    <p className="notlogin">
                        Já tem uma conta? <Link className="linklogin" to="/login">Log in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
