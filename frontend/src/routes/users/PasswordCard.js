import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios";
import  Modal from "../commons/Modal"
import '../../style/PasswordCard.css'
const API_BASE = "http://localhost:3001"

const PasswordCard = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [user, setUser] = useState(null);
    const { id } = useParams()
    const [modalTitle, setModalTitle] = useState('')
    const [openModal, setOpenModal] = useState(false)
    useEffect(() => {
        fetch( API_BASE + '/users/' + id)
            .then(response => {
                response.json().then(data => {
                    setUser(data)
                })
            })
    }, []); 

    const handlePasswordChange = () => {


        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?]).{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            return;
        }
        
        if (newPassword !== confirmNewPassword) {
            return;
        }
        
        axios.put(`${API_BASE}/users/editPass/${id}`, {
                password: currentPassword,
                newPassword: newPassword
            })
        .then(response => {
            setModalTitle("Sua senha foi alterada com sucesso! Faça login novamente.")
            setOpenModal(true)
            console.log('PUT request successful:', response.data);
        })
        .catch(error => {
            console.error('Error making PUT request:', error);
        });
        
    };

    return( user ? (
        <div class="tudosenha">
            <p class="frasetrocarsenha">TROCAR SENHA</p>
            <div class="containertudosenha">
                <div class="senhaatualcontainer">
                    <p class="frasesenha">Senha atual</p>
                    <input class="inputfrasesenha"
                    type="password"
                    id="current-password"
                    value={currentPassword}
                    onChange={ev => setCurrentPassword(ev.target.value)}
                    />
                </div>
                <div class="novasenhacontainer">
                    <p class="frasenovasenha">Nova senha</p>
                    <input class="inputfrasenovasenha"
                    type="password"
                    id="new-password"
                    value={newPassword}
                    onChange={ev => setNewPassword(ev.target.value)}
                    />
                </div>
                <div class="confirmarsenhacontainer">
                    <p class="fraseconfirmarsenha">Confirmar nova senha</p>
                    <input class="inputconfirmarsenha"
                    type="password"
                    id="confirm-new-password"
                    value={confirmNewPassword}
                    onChange={ev => setConfirmNewPassword(ev.target.value)}
                    />
                </div>
            </div>
            <button onClick={handlePasswordChange} class="confirmartroca">CONFIRMAR</button>
        </div>
    ) : (
        <p>Carregando...</p>
    )
    );
}

export default PasswordCard