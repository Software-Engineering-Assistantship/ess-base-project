import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import '../../style/LandingPage.css'
import React from "react"
import logo from "../../assets/logo.svg";
import logo2 from "../../assets/logo2.svg";
const API_BASE = "http://localhost:3001"

const LandingPage = () => {
    const handleSignIn = () => { 
        console.log("Sign in button clicked")
    };
    return (
        <div> 
        <div className ="headerinicial">
            <img src={logo} alt="logo" className="logo"/>
        </div>

        <div className="main-content">
                <h1 className="titlelanddingpage">O melhor site de reviews gastronômicas do Brasil!</h1>
                <img src={logo2} alt="logo2" className="logo2"/>
                <Link to="/signup" className="sign-up-button">Cadastre-se Já!!</Link>
                <p className="login-link"><Link to="/login" className="blue-text">Já possui conta?</Link></p>
                
            </div>
        </div>
        
    );
}

export default LandingPage