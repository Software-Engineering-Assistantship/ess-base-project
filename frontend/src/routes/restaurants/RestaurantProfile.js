import { useParams } from "react-router-dom"
import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from 'axios';

const API_BASE = "http://localhost:3001"

const RestaurantProfile = () => {
    const [restaurant, setRestaurant] = useState(null);
    const { id } = useParams()

    const navigate = useNavigate()
    let user = {
        name: "pedro",
        id: "65d51e36c3b06ec45cdd2ac8"
    }

    useEffect(() => {
        fetch( API_BASE + '/restaurants/' + id)
            .then(response => {
                if(response.status !== 200){
                    console.log(response.status)
                    navigate('/error')
                }
                response.json().then(data => {
                    setRestaurant(data)
                })
            })
    }, []); 

    const [rating, setRating] = useState('');
    const [hover, setHover] = useState(null);
    const [totalStars, setTotalStars] = useState(5);
    const [ratingBool, setRatingBool] = useState(false);
    const [avg, setAvg] = useState(0);
    const [numRatings, setNumRatings] = useState(0);
    const [hasReview, setHasReview] = useState(false)

    useEffect(() => {
        const getOldRating = async () => {
            try {
                const oldRating = await axios.get(`${API_BASE}/ratings/${id}/${user.id}`);

                if (oldRating.status === 200) {
                    setRatingBool(true);
                    setRating(oldRating.data.rating);
                }
            } catch (error) {
                if (error.response && error.response.status !== 404) {
                    console.error('Erro ao fazer a solicitação para a API', error);
                }
            }
        };

        const getAvg = async () => {
            try {
                const response = await axios.get(`${API_BASE}/ratings/${id}/avg`);

                if (response.status === 200) {
                    setAvg(response.data);
                }
            } catch (error) {
                if (error.response && error.response.status !== 404) {
                    console.error('Erro ao fazer a solicitação para a API', error);
                }
            }
        };

        const getRatings = async () => {
            try {
                const response = await axios.get(`${API_BASE}/ratings/${id}`);

                if (response.status === 200) {
                    setNumRatings(response.data.length);
                }
            } catch (error) {
                if (error.response && error.response.status !== 404) {
                    console.error('Erro ao fazer a solicitação para a API', error);
                }
            }
        };

        const getReview = async () => {
            try {
                const response = await axios.get(`${API_BASE}/reviews/${id}/${user.id}`);

                if (response.status === 200) {
                    setHasReview(true)
                }
            } catch (error) {
                if (error.response && error.response.status !== 404) {
                    console.error('Erro ao fazer a solicitação para a API', error);
                }
            }
        };

        getOldRating();
        getAvg();
        getRatings();
        getReview();
    }, [id, user.id]);


    async function createRating(ev) {
        try {
            const response = await axios.post(`${API_BASE}/ratings/${id}/${user.id}/create`, {
                user: user.id,
                restaurant: id,
                rating: rating,
            });
        } catch (error) {
            console.error('Falha ao adicionar nota', error.response.statusText);
        }
    }

    async function editRating(ev) {

        try {
            const response = await axios.put(`${API_BASE}/ratings/${id}/${user.id}/edit`, {
                user: user.id,
                restaurant: id,
                rating: rating,
            });
        } catch (error) {
            console.error('Falha ao editar nota', error.response.statusText);
        }
    }

    async function deleteReview(ev) {
        
        try {
            const response = await axios.delete(`${API_BASE}/reviews/${id}/${user.id}/delete`);

            if (response.status === 200) {
                window.location.reload(false);
            } else {
                console.error('Falha ao deletar review', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao fazer a solicitação para a API', error);
        }
    }
    
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
                                    {numRatings !== 1 ? (
                                        <div>
                                            {numRatings} Reviews
                                        </div>
                                    ) : (
                                        <div>
                                            {numRatings} Review
                                        </div>
                                        
                                    )}
                                    <div>
                                        {[...Array(5)].map((star, index) => {
                                            const starValue = index + 1;

                                            return (
                                            <span
                                                key={index}
                                                style={{ color: starValue <= avg ? '#ffc107' : '#524d39' }}
                                            >
                                                &#9733;
                                            </span>
                                            );
                                        })}
                                    </div>
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
                        <Link id="reviews-page" to={'/reviews/'+id}>
                            Reviews de usuários
                        </Link>
                        {hasReview ? (
                            <div>
                                <Link id="edit-review" to={'/reviews/'+id+'/'+user.id+'/edit'}>
                                Editar review
                                </Link>
                                <button className="simple-button" id="create-button" onClick={() => deleteReview()}>
                                <p>Deletar Review</p>
                                </button>
                            </div>
                            
                        ) : (
                            <Link id="create-review" to={'/reviews/'+id+'/'+user.id+'/create'}>
                            Criar review
                            </Link>
                        )}
                        
                        <Link id="edit-page" to={'/restaurants/update/'+id}>
                            Editar Página
                        </Link>
                    </div>
                </div>
            )}
        <div>
            {ratingBool ? (
                <form onSubmit={editRating}>
                    <p>Nota</p>
                    {[...Array(totalStars)].map((star, index) => {
                        const currentRating = index + 1;

                        return (
                            <label key={index}>
                            <input
                                type="radio"
                                name="rating"
                                value={currentRating}
                                onChange={() => setRating(currentRating)}
                                required
                            />
                            <span
                                className="star"
                                style={{
                                color:
                                    currentRating <= (hover || rating) ? "#ffc107" : "#524d39"
                                }}
                                onMouseEnter={() => setHover(currentRating)}
                                onMouseLeave={() => setHover(null)}
                            >
                                &#9733;
                            </span>
                            </label>
                        );
                    })}
                    
                    <button className="simple-button" id="create-button" type = "submit">
                            <p>Atualizar Nota</p>
                        </button>

                </form>
            ) : (
                <form onSubmit={createRating}>

                    <p>Nota</p>
                    {[...Array(totalStars)].map((star, index) => {
                        const currentRating = index + 1;

                        return (
                            <label key={index}>
                            <input
                                type="radio"
                                name="rating"
                                value={currentRating}
                                onChange={() => setRating(currentRating)}
                                required
                            />
                            <span
                                className="star"
                                style={{
                                color:
                                    currentRating <= (hover || rating) ? "#ffc107" : "#524d39"
                                }}
                                onMouseEnter={() => setHover(currentRating)}
                                onMouseLeave={() => setHover(null)}
                            >
                                &#9733;
                            </span>
                            </label>
                        );
                    })}
                    
                    <button className="simple-button" id="create-button" type = "submit">
                            <p>Adicionar Nota</p>
                        </button>

                </form>
            )}
            
        </div>
        </div>
);

}

export default RestaurantProfile;