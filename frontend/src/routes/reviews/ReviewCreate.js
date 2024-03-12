import { useParams, useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';

import "../../style/Stars.css";

const API_BASE = "http://localhost:3001";

const ReviewCreate = () => {

    const navigate = useNavigate()
    const params = useParams();
    const iduser = params.iduser;
    const idrest = params.idrest;

    const [redirect, setRedirect] = useState(false);

    const [title, setTitle] = useState('');
    const [text, setText] = useState('');

    const [rating, setRating] = useState('');
    const [hover, setHover] = useState(null);
    const [totalStars, setTotalStars] = useState(5);

    const [sabor, setSabor] = useState('');
    const [hoverS, setHoverS] = useState(null);
    const [totalStarsS, setTotalStarsS] = useState(5);

    const [atendimento, setAtendimento] = useState('');
    const [hoverA, setHoverA] = useState(null);
    const [totalStarsA, setTotalStarsA] = useState(5);

    const [tempoDeEspera, setTempoDeEspera] = useState('');
    const [hoverT, setHoverT] = useState(null);
    const [totalStarsT, setTotalStarsT] = useState(5);

    const [preco, setPreco] = useState('');
    const [hoverP, setHoverP] = useState(null);
    const [totalStarsP, setTotalStarsP] = useState(5);

    useEffect(() => {
        const getOldRating = async () => {
            try {
                const oldRating = await axios.get(`${API_BASE}/ratings/${idrest}/${iduser}`);

                if (oldRating.status === 200) {
                    setRating(oldRating.data.rating);
                }
            } catch (error) {
                if (error.response && error.response.status !== 404) {
                    console.error('Erro ao fazer a solicitação para a API', error);
                }
            }
        };
        getOldRating();
    }, [idrest, iduser]);

    async function createNewReview(ev) {

        ev.preventDefault()
        
        try {
            const response = await axios.post(`${API_BASE}/reviews/${idrest}/${iduser}/create`, {
                title: title,
                user: iduser,
                restaurant: idrest,
                rating: rating,
                text: text,
                sabor: sabor,
                atendimento: atendimento,
                tempoDeEspera: tempoDeEspera,
                preco: preco,
                likes: 0,
                dislikes: 0
            });

            if (response.status === 200) {
                setRedirect(true);
            } else {
                console.error('Falha ao criar review', response.statusText);
            }
        } catch (error) {
            console.error('Erro ao fazer a solicitação para a API', error);
        }
    }

    

    if (redirect) {
        navigate('/reviews/' + idrest)
    }

    return (
        <div>
            <form onSubmit={createNewReview}>
                <p>Título</p>
                <input type="text" placeholder="Coxinha Boa" 
                    value={title} 
                    onChange={ev => setTitle(ev.target.value)}
                    required
                />

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
                
                <p>Texto</p>
                <textarea
                rows = {10}
                cols = {50}
                placeholder="Amei a coxinha..." 
                wrap = "soft"
                name = "text"
                required
                value={text} onChange={ev => setText(ev.target.value)}
                />
                
                <p>Sabor</p>
                {[...Array(totalStarsS)].map((star, index) => {
                    const currentSabor = index + 1;

                    return (
                        <label key={index}>
                        <input
                            type="radio"
                            name="sabor"
                            value={currentSabor}
                            onChange={() => setSabor(currentSabor)}
                        />
                        <span
                            className="star"
                            style={{
                            color:
                            currentSabor <= (hoverS || sabor) ? "#ffc107" : "#524d39"
                            }}
                            onMouseEnter={() => setHoverS(currentSabor)}
                            onMouseLeave={() => setHoverS(null)}
                        >
                            &#9733;
                        </span>
                        </label>
                    );
                })}

                <p>Atendimento</p>
                {[...Array(totalStarsA)].map((star, index) => {
                    const currentAtendimento = index + 1;

                    return (
                        <label key={index}>
                        <input
                            type="radio"
                            name="atendimento"
                            value={currentAtendimento}
                            onChange={() => setAtendimento(currentAtendimento)}
                        />
                        <span
                            className="star"
                            style={{
                            color:
                            currentAtendimento <= (hoverA || atendimento) ? "#ffc107" : "#524d39"
                            }}
                            onMouseEnter={() => setHoverA(currentAtendimento)}
                            onMouseLeave={() => setHoverA(null)}
                        >
                            &#9733;
                        </span>
                        </label>
                    );
                })}

                <p>Tempo de Espera</p>
                {[...Array(totalStarsT)].map((star, index) => {
                    const currentTempoDeEspera = index + 1;

                    return (
                        <label key={index}>
                        <input
                            type="radio"
                            name="tempoDeEspera"
                            value={currentTempoDeEspera}
                            onChange={() => setTempoDeEspera(currentTempoDeEspera)}
                        />
                        <span
                            className="star"
                            style={{
                            color:
                            currentTempoDeEspera <= (hoverT || tempoDeEspera) ? "#ffc107" : "#524d39"
                            }}
                            onMouseEnter={() => setHoverT(currentTempoDeEspera)}
                            onMouseLeave={() => setHoverT(null)}
                        >
                            &#9733;
                        </span>
                        </label>
                    );
                })}

                <p>Preço</p>
                {[...Array(totalStarsP)].map((star, index) => {
                    const currentPreco = index + 1;

                    return (
                        <label key={index}>
                        <input
                            type="radio"
                            name="preco"
                            value={currentPreco}
                            onChange={() => setPreco(currentPreco)}
                        />
                        <span
                            className="star"
                            style={{
                            color:
                            currentPreco <= (hoverP || preco) ? "#ffc107" : "#524d39"
                            }}
                            onMouseEnter={() => setHoverP(currentPreco)}
                            onMouseLeave={() => setHoverP(null)}
                        >
                            &#9733;
                        </span>
                        </label>
                    );
                })}
                <div>
                <button className="simple-button" id="create-button" type = "submit">
                        <p>Enviar</p>
                    </button>
                </div>

                

            </form>

        </div>
    );
}

export default ReviewCreate;