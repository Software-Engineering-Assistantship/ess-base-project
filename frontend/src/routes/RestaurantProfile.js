import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"

const API_BASE = "http://localhost:3001"

const RestaurantProfile = () => {
    const [restaurant, setRestaurant] = useState(null);
    const { id } = useParams()

    useEffect(() => {
        fetch( API_BASE + '/restaurants/' + id)
            .then(response => {
                response.json().then(data => {
                    setRestaurant(data)
                })
            })
    }, []); 
    
    return ( 
        <div>
            { restaurant && (
                <div>
                    <div className="restaurant-details">
                        <h2>{ restaurant.name }</h2>
                        <p>{restaurant.site}</p>
                        <p> Tipo de comida: {restaurant.typeOfFood}</p>
                        <p>{restaurant.address.street}, {restaurant.address.number} - {restaurant.address.neighborhood}, {restaurant.address.city}</p>
                    </div>
                    <div className="restaurant-actions">
                        <p>Reviews de usuários</p>
                        <p>Fazer Review</p>
                        <p>Editar Página</p>
                    </div>
                </div>
            )}
        </div>
        );
}

export default RestaurantProfile