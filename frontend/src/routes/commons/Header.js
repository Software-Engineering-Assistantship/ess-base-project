import React, { useEffect } from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import '../../style/Header.css'
import logo from "../../assets/logo.svg";
import noprofileimage from "../../assets/noprofileimage.png";
import searchicon from "../../assets/searchicon.png";

const API_BASE = "http://localhost:3001"

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

const Header = () => {
    let navigate = useNavigate()
    const [restaurant, setRestaurant] = useState("");
    const loggedUserId = getUserIdFromToken()
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(API_BASE + '/users/' + loggedUserId)
            .then(response => {
                response.json().then(data =>{
                    setUser(data)
                })
            })
    }, []);

    let check = false;
    if(user && !user.profileImage) {
        check = true;
    }

    function usVerify(){
        return user;
    }

    return (
    <div> 
        <div className ="header">
            <Link className="link" to={`/feed`}>
                <img src={logo} alt="logo" className="logo"/>
            </Link>

            <Link className="link" to={`/restaurants`}>
                <h1 className="restaurants">Restaurantes</h1>
            </Link>

            <Link className="link" to={`/users`}>
                <h1 className="users">Usuários</h1>
            </Link>

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
                {user === null ? (
                    <img src={noprofileimage} alt="noprofileimage" className="noprofileimage"/>
                    ):(    
                    <img src={`${API_BASE}/${user.profileImage}`} alt="noprofileimage" className="noprofileimage" onClick = {() => navigate("/users/" + loggedUserId)}/>
                )}
        </div>
    </div>
    );
}

export default Header;
