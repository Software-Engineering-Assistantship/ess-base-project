import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom";
import '../../style/Header.css'
import logo from "../../assets/logo.svg";
import noprofileimage from "../../assets/noprofileimage.png";
import searchicon from "../../assets/searchicon.png";

const Header = () => {
    const [restaurant, setRestaurant] = useState("");

    return (
    <div> 
        <div className ="header">
            <Link className="link" to={`/feed`}>
                <img src={logo} alt="logo" className="logo"/>
            </Link>

            <Link className="link" to={`/restaurants`}>
                <h1 className="restaurants">Restaurantes</h1>
            </Link>

            <h1 className="users">Usuários</h1>
            <h1 className="lists">Listas</h1>
            <h1 className="forum">Fórum</h1>

            <div id="input-and-icon">
                <input 
                    type="text" 
                    placeholder="Ache seus pontos gastronômicos favoritos" 
                    value={restaurant} 
                    onChange={(e) => setRestaurant(e.target.value)} 
                    className="search-field"
                />
                
                <img src={searchicon} alt="searchicon" className="searchicon"/>
            </div>

            <img src={noprofileimage} alt="noprofileimage" className="noprofileimage"/>
        </div>
    </div>
    );
}

export default Header;
