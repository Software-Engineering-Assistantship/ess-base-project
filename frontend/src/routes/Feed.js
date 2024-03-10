import React from "react"
import '../style/Feed.css'
import logo from "../assets/logo.svg";
import noprofileimage from "../assets/noprofileimage.png";
const API_BASE = "http://localhost:3001"

const Feed = () => {
    return (
    <div> 
        <div className ="header">
            <img src={logo} alt="logo" className="logo"/>
            <h1 className="restaurants">Restaurantes</h1>
            <h1 className="users">Usuários</h1>
            <h1 className="lists">Listas</h1>
            <h1 className="forum">Fórum</h1>
            <img src={noprofileimage} alt="noprofileimage" className="noprofileimage"/>
        </div>
    </div>
    );
}

export default Feed
