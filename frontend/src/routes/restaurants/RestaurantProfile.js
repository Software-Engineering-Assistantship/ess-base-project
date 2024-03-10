import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
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
                <div id="restaaurant-profile">
                    {restaurant.coverImage !== "Noneundefined" && <img id="restaurant-cover" src={`${API_BASE}/${restaurant.coverImage}`} />}
                    <div className="restaurant-details">
                            <div id="img-and-data">
                                {restaurant.profileImage == "Noneundefined" && <img id="restaurant-img" src="%PUBLIC_URL%/no_restaurant_img.jpg" />}
                                {restaurant.profileImage !== "Noneundefined" && (<img id="restaurant-img" src={`${API_BASE}/${restaurant.profileImage}`} />)}
                                <div id="restaurant-main-data">
                                    <h2 id="restaurant-name">{ restaurant.name }</h2>
                                    <p className="restaurant-atribute"> Tipo de comida: {restaurant.typeOfFood}</p>
                                    { restaurant.site && <a className="restaurant-atribute" id="restaurant-site" href={restaurant.site}> Site oficial </a>}
                                </div>
                            </div>

                        <div id="add-and-map"> 
                            <p className="restaurant-atribute" id="address">{restaurant.address.street}, {restaurant.address.number} - {restaurant.address.neighborhood}, {restaurant.address.city}</p>
                            <iframe className="map"
                            allowfullscreen
                            referrerpolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyDiNcS5K4Fr7kcD_acuX17sgIwsNS3sqnA
                            &q=${restaurant.address.street},+${restaurant.address.number}-+${restaurant.address.neighborhood}`}>
                            </iframe>
                        </div>
                    </div>

                    <div className="restaurant-actions">
                        <Link id="reviews-page" to={'/restaurants/update/'+id}>
                            Reviews de usuários
                        </Link>
                        <Link id="create-review" to={'/restaurants/update/'+id}>
                            Fazer review
                        </Link>
                        <Link id="edit-page" to={'/restaurants/update/'+id}>
                            Editar Página
                        </Link>
                    </div>
                </div>
            )}
        </div>
        );
}

export default RestaurantProfile