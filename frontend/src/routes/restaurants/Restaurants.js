import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

import '../../style/Restaurants.css'

const API_BASE = "http://localhost:3001"

const Restaurants = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        GetRestaurants()
            .catch(err => {
                console.error("Error: ", err);
                setError(err.message);
            });
    }, []); 

    const GetRestaurants = async () => {
        const response = await fetch(API_BASE + "/restaurants");
        if (!response.ok) {
            throw new Error("Failed to fetch");
        }
        const data = await response.json();
        setRestaurants(data);
    };

    return (
        <div className="restaurants-page"> 

            <Link className="link" to={`/restaurants/create`}>
                <div className="simple-button" id="create-button">
                    <p>Cadastrar restaurante</p>
                </div>
            </Link>
            <div className="restaurant-list"> 
                <h2 className="category"> Categoria: Todos </h2>
                {error && <p>Error: {error}</p>}
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
    );
};

export default Restaurants;