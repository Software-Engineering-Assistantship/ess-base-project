import React from "react"
import { useState } from "react"
import { Link } from "react-router-dom";
import '../../style/SearchResult.css'

const API_BASE = "http://localhost:3001"

const SearchResult = () => {
    const [restaurants] = useState([]);
    const [error] = useState(null);

    return (
        <div>

            <div className="restaurants-page"> 
                <Link className="link" to={`/restaurants/create`}>
                    <div className="create-button">
                        <p>Cadastrar restaurante</p>
                    </div>
                </Link>

                <div className="restaurant-list"> 
                    <h2 className="category"> Resultado da Busca </h2>
                    {restaurants.length === 0 && (
                        <h1 className= "noData">AINDA NÃO HÁ RESTAURANTES CADASTRADOS</h1>
                    )}
                    {restaurants.map(restaurant => (
                        <div className="restaurant-preview" key={restaurant.id}> 
                            <div id="img-and-description">
                                <img id="restaurant-img-preview" src={`${API_BASE}/${restaurant.profileImage}`} />
                                <div id = "preview-description">
                                    <h2>{restaurant.name}</h2>
                                    <p>{restaurant.address.neighborhood} - {restaurant.address.city}</p>
                                    <p>{restaurant.typeOfFood}</p>
                                </div>
                            </div>
                            <Link className="link" to={`/restaurants/${restaurant._id}`}>
                                <div className="view-button">
                                    <p>Visualizar</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SearchResult;
