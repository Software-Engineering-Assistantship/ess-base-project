import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

import { jwtDecode } from "jwt-decode";

const API_BASE = "http://localhost:3001";

const ReviewPage = () => {
    const params = useParams();
    const iduser = params.iduser;
    const idrest = params.idrest;

    const navigate = useNavigate()

    const [review, setReview] = useState(null);
    const [restaurant, setRestaurant] = useState(null);
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(true)

    const [redirect, setRedirect] = useState(false);

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);

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

    useEffect(() => {
        if (iduser === idUserLogin) {
            setIsOwner(true)
        }
        async function fetchData() {
            try {
                const response = await axios.get(`${API_BASE}/reviews/${idrest}/${iduser}`);
        
                if (response.status === 200) {
                    setReview(response.data)
                    setLikes(response.data.likes)
                    setDislikes(response.data.dislikes)
                } else {
                    console.error('Falha ao obter dados do review', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao fazer a solicitação de review para a API', error);
            }

            try {
                const response = await axios.get(`${API_BASE}/restaurants/${idrest}`);
        
                if (response.status === 200) {
                    setRestaurant(response.data)
                } else {
                    console.error('Falha ao obter dados do restaurante', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao fazer a solicitação do restaurante para a API', error);
            }

            try {
                const response = await axios.get(`${API_BASE}/users/${iduser}`);
        
                if (response.status === 200) {
                    setUser(response.data)
                } else {
                    console.error('Falha ao obter dados do usuário', response.statusText);
                }
            } catch (error) {
                console.error('Erro ao fazer a solicitação do usuário para a API', error);
            }
        }

        fetchData();
    }, [idrest, iduser]);

    async function deleteReview(ev) {

        try {
            const response = await axios.delete(`${API_BASE}/reviews/${idrest}/${iduser}/delete`);

            if (response.status === 200) {
                setRedirect(true);
            } else {
                console.error('Falha ao deletar review', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao fazer a solicitação para a API', error);
        }
    }

    async function editReview(ev) {

        console.log('entrei')
        try {
            
        } catch (error) {
            console.error('Falha ao dar like ou dislike');
        }
    }

    async function handleLike () {
        setLikes((prevCount) => (prevCount === review.likes ? review.likes + 1 : review.likes))
        setDislikes(review.dislikes)

        console.log(likes)
       
        const response = await axios.put(`${API_BASE}/reviews/${idrest}/${iduser}/edit`, {
            title: review.title,
            user: iduser,
            restaurant: idrest,
            rating: review.rating,
            text: review.text,
            sabor: review.sabor,
            atendimento: review.atendimento,
            tempoDeEspera: review.tempoDeEspera,
            preco: review.preco,
            likes: likes,
            dislikes: dislikes
        });
      };
    
      async function handleDislike () {
        setDislikes((prevCount) => (prevCount === review.dislikes ? review.dislikes + 1 : review.dislikes))
        setLikes(review.likes)

        console.log(dislikes)
        
        const response = await axios.put(`${API_BASE}/reviews/${idrest}/${iduser}/edit`, {
            title: review.title,
            user: iduser,
            restaurant: idrest,
            rating: review.rating,
            text: review.text,
            sabor: review.sabor,
            atendimento: review.atendimento,
            tempoDeEspera: review.tempoDeEspera,
            preco: review.preco,
            likes: likes,
            dislikes: dislikes
        });
    };

    if (redirect) {
        navigate('/reviews/' + idrest)
    }

    return (
        <div>
            {review && user && restaurant &&(
                <div id="review-page">
                    <div className="review-details">
                        <h2>{ review.title }</h2>
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
                        <p>{ user.name}</p>
                        <p>{ restaurant.name}</p>
                        <p>{ review.text}</p>
                        <p>Sabor:</p>
                        <div>
                            {[...Array(5)].map((star, index) => {
                                const starValue = index + 1;

                                return (
                                <span
                                    key={index}
                                    style={{ color: starValue <= review.sabor ? '#ffc107' : '#e4e5e9' }}
                                >
                                    &#9733;
                                </span>
                                );
                            })}
                        </div>
                        <p>Atendimento:</p>
                        <div>
                            {[...Array(5)].map((star, index) => {
                                const starValue = index + 1;

                                return (
                                <span
                                    key={index}
                                    style={{ color: starValue <= review.atendimento ? '#ffc107' : '#e4e5e9' }}
                                >
                                    &#9733;
                                </span>
                                );
                            })}
                        </div>
                        <p>Tempo de Espera</p>
                        <div>
                            {[...Array(5)].map((star, index) => {
                                const starValue = index + 1;

                                return (
                                <span
                                    key={index}
                                    style={{ color: starValue <= review.tempoDeEspera ? '#ffc107' : '#e4e5e9' }}
                                >
                                    &#9733;
                                </span>
                                );
                            })}
                        </div>
                        <p>Preço:</p>
                        <div>
                            {[...Array(5)].map((star, index) => {
                                const starValue = index + 1;

                                return (
                                <span
                                    key={index}
                                    style={{ color: starValue <= review.preco ? '#ffc107' : '#e4e5e9' }}
                                >
                                    &#9733;
                                </span>
                                );
                            })}
                        </div>
                    </div>
                    {isOwner ? (
                        <div>
                        <Link id="review-edit" to={`/reviews/${idrest}/${iduser}/edit`}>
                        Editar Review
                        </Link>

                        <button className="simple-button" id="create-button" onClick={() => deleteReview()}>
                        <p>Deletar Review</p>
                        </button>
                        
                        </div>
                    ): ("")}
                    <div className="restaurant-actions">
                        <p>Avalie este review:</p>
                        <div>
                            <button onClick={handleLike} style={{ color: likes > 0 ? 'blue' : 'black' }}>
                                <AiOutlineLike /> {likes}
                            </button>

                            <button onClick={handleDislike} style={{ color: dislikes > 0 ? 'red' : 'black' }}>
                                <AiOutlineDislike /> {dislikes}
                            </button>
                        </div>
                       
                    </div>

                    <div>
                        <Link id="return" to={'/reviews/'+idrest}>
                        Voltar
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewPage;
