import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import '../style/RemoveCard.css'
import axios from "axios";

const API_BASE = "http://localhost:3001"

const RemoveCard = () => {

    const [user, setUser] = useState(null);
    const { id } = useParams()

    const [curPass, setCurPass] = useState('');
    const [curPassAgain, setCurPassAgain] = useState('');

    useEffect(() => {
        fetch( API_BASE + '/users/' + id)
            .then(response => {
                response.json().then(data => {
                    setUser(data)
                })
            })
    }, []); 

    const deleteAccount = () => {
        if(curPass === curPassAgain){
            axios.delete(`${API_BASE}/users/delete/${id}`);
        }
    };

    return ( user ? (
        <div class="tudosenha">
            <p class="frasetrocarsenha">REMOÇÃO DE PERFIL</p>
            <div class="containertudosenha">
                <div class="senhaatualcontainer">
                    <p class="frasesenha">Digite sua senha</p>
                    <input class="inputfrasesenha"
                    type="password"
                    value={curPass}
                    onChange={ev => setCurPass(ev.target.value)}
                    />
                </div>
                <div class="confirmarsenhacontainer">
                    <p class="fraseconfirmarsenha">Confirme sua senha</p>
                    <input class="inputconfirmarsenha"
                    type="password"
                    id="new-password"
                    value={curPassAgain}
                    onChange={ev => setCurPassAgain(ev.target.value)}
                    />
                </div>
            </div>
            <div class="botaobox">
                <p class="fraseirreversivel">Cuidado! Ação irreversível.</p>
                <button class="confirmardelete" onClick={deleteAccount}>CONFIRMAR</button>
            </div>
        </div>
    ) : (
        <p>Carregando...</p>
    )
    );
}

export default RemoveCard