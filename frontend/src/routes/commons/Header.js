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

function renderImage(user){
    if(user.profileImage){
        const image = `${API_BASE}/${user.profileImage}`
        return image
    }
    return noprofileimage
}

const Header = () => {
    let navigate = useNavigate()
    const [error, setError] = useState(null)
    const [restaurant, setRestaurant] = useState("");
    const loggedUserId = getUserIdFromToken()
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(API_BASE + '/users/' + loggedUserId)
            .then(response => {
                response.json().then(data =>{
                    setUser(data)
                })
            }).catch(err => {
                console.error("Error: ", err);
                setError(err.message);
            })
    }, []);

    let check = false;
    if(user && !user.profileImage) {
        check = true;
    }

    const handleRedirection = () => {
        navigate("/users/" + loggedUserId)
        window.location.reload()
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
                ) : (    
                    <img src={renderImage(user)} alt="profileimage" className="noprofileimage" onClick = {handleRedirection}/>
                )}
        </div>
    </div>
    );
}

export default Header;
