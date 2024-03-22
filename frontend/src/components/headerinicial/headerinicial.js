import React from 'react';
import logo from '../../assets/logo.svg'; 
import './headerinicial.css';
const HeaderInicial = () => {
    return (
        <div className="headerinicial">
            <img src={logo} alt="logo" className="logo4" />
        </div>
    );
}

export default HeaderInicial;