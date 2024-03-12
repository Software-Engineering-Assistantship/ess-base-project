import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';

import '../../style/Restaurants.css';

import { jwtDecode } from "jwt-decode";

const API_BASE = "http://localhost:3001";

const ReviewsRestaurant = () => {
    const [reviews, setReviews] = useState([]);
    const [usernames, setUsernames] = useState({});
    const [error, setError] = useState(null);
    const [restaurant, setRestaurant] = useState(null);
    const [avg, setAvg] = useState(0);

    const { idrest } = useParams();

    const [idUserLogin, setIdUserLogin] = useState(null);

    useEffect(() => {

        const getUserInfoFromToken = async () => {
            const token = localStorage.getItem('token');
    
            if (token) {
                try {
                    const decoded = jwtDecode(token);
                    const userID = decoded.userId;

                    setIdUserLogin(userID)

                } catch (error) {
                    console.error("Failed to decode token", error);
                }
            }
            return null;
        };
        getUserInfoFromToken()
    }, []);

    let user = {
        name: "pedro",
        id: "65d51e36c3b06ec45cdd2ac8"
    }

    useEffect(() => {
        const getRestaurant = async () => {
            try {
                const response = await axios.get(`${API_BASE}/restaurants/${idrest}`);

                if (response.data && response.status === 200) {
                    setRestaurant(response.data);
                }

            } catch (error) {
                console.error("Error:", error);
                setError(error.message);
            }
        };

        const getReviews = async () => {
            try {
                const response = await axios.get(`${API_BASE}/reviews/${idrest}`);

                if (response.data && response.status === 200) {
                    setReviews(response.data);
                }

            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setError(error.response.data.error);
                } else {
                    console.error("Error:", error);
                    setError(error.message);
                }

            }
        };

        const getAvg = async () => {
            try {
                const response = await axios.get(`${API_BASE}/ratings/${idrest}/avg`);

                if (response.data && response.status === 200) {
                    setAvg(response.data);
                }
            } catch (error) {
                if (error.response && error.response.status !== 404) {
                    console.error('Erro ao fazer a solicitação para a API', error);
                }
            }
        };

        getRestaurant();
        getReviews();
        getAvg();
    }, [idrest]);

    // Lógica de mapeamento de userIDs
    useEffect(() => {
        const getUsernames = async () => {
            const userIDs = new Set(reviews.map(review => review.user));

        for (const userID of userIDs) {
            try {
                const responseUser = await axios.get(`${API_BASE}/users/${userID}`);
                if (responseUser.data && responseUser.status === 200) {
                    setUsernames(prevState => ({ ...prevState, [userID]: responseUser.data.name }));
                }
            } catch (error) {

                }
            }
        };
        getUsernames();
    }, [reviews, idUserLogin]);

    return (
        <div>
            {restaurant && (
            <div className="reviews-page">

            <div className="restaurant">
                <p>{restaurant.profileImage}</p>
                <p>{restaurant.name}</p>
                <p>Nota média:</p>
                <div>
                            {[...Array(5)].map((star, index) => {
                                const starValue = index + 1;

                                return (
                                <span
                                    key={index}
                                    style={{ color: starValue <= avg ? '#ffc107' : '#e4e5e9' }}
                                >
                                    &#9733;
                                </span>
                                );
                            })}
                        </div>
            
            </div>

            {reviews.length !== 1 ? (
                <div>
                    {reviews.length} Reviews
                </div>
            ) : (
                <div>
                    {reviews.length} Review
                </div>
                
            )}

            <div className="review-list">
                {error && <p>{error}</p>}

                {reviews.map(review => (
                    <div className="review-preview" key={review.id}>
                        <div id="img-and-description">
                            <div id="preview-description">
                                <h2>{review.title}</h2>
                                <div>
                                    {[...Array(5)].map((star, index) => {
                                        const starValue = index + 1;

                                        return (
                                        <span
                                            key={index}
                                            style={{ color: starValue <= review.rating ? '#ffc107' : '#e4e5e9' }}
                                        >
                                            &#9733;
                                        </span>
                                        );
                                    })}
                                </div>
                                <p>{usernames[review.user]}</p>
                                {review.user == idUserLogin ? (
                                    <p>(você)</p>
                                ):(
                                    <p></p>
                                )}
                            </div>
                        </div>
                        <Link className="link" to={`/reviews/${review.restaurant}/${review.user}`}>
                            <div className="view-button">
                                <p>Ver Mais...</p>
                            </div>
                        </Link>
                    </div>
                ))}

            </div>
        </div>
        )}
        <div>
            <Link id="return" to={'/restaurants/'+idrest}>
            Voltar
            </Link>
        </div>
        </div>
    );
};

export default ReviewsRestaurant;
