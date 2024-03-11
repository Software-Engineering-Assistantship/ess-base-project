import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import logo from "../../assets/logo.svg";
import logo3 from "../../assets/logo3.svg";
import "../../style/Signup.css";

const API_BASE = "http://localhost:3001";

const Signup = () => {
    console.log("Signup component rendered!"); // Check if this log is printed
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form submitted!"); // Check if this log is printed

        try {
            const response = await axios.post(`${API_BASE}/users/signup`, formData);
            console.log("Signup successful:", response.data);
            // Redirect the user or show a success message here
        } catch (error) {
            console.error("Signup failed:", error.response.data);
            // Show an error message to the user
        }
    };

    return (
        <div>
            <div className="headerinicial">
                <img src={logo} alt="logo" className="logo" />
            </div>
            <div className="signup-container">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <div className="headersignup">
                        <img src={logo3} alt="logo3" className="logo3" />
                        <h2>AlmoCIn-Cadastrar novo Usuário</h2>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
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
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                    </div>
                    <button className="signupbutton" type="submit">Cadastrar</button>
                    <p className="notlogin">
                        Already have an account? <Link className="linklogin" to="/login">Log in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
