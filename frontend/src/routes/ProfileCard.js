import React from 'react';
import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import '../style/ProfileCard.css'
import noProfileImage from "../images/noprofileimage.png"
import noCoverImage from "../images/nocoverimage.png"
import iconPencil from "../images/iconpencil.png"
import axios from "axios";

const API_BASE = "http://localhost:3001"

const ProfileCard = () => {

    const [user, setUser] = useState(null);
    const { id } = useParams()

    const [newUsername, setNewUsername] = useState('');
    const [newBio, setNewBio] = useState('');

    useEffect(() => {
        fetch( API_BASE + '/users/' + id)
            .then(response => {
                response.json().then(data => {
                    setUser(data)
                })
            })
    }, []); 

    
    if(user && user.profileImage) {
        noProfileImage = user.profileImage;
    }
    
    if(user && user.coverImage) {
        noCoverImage = user.coverImage;
    }
    
    if(user && !user.bio){
        user.bio = "";
    }

    const handleUserChange = () => {
        
        if(user.name !== newUsername && user.bio !== newBio){
            axios.put(`${API_BASE}/users/edit/${id}`, {
                name: newUsername,
                bio: newBio
            })
            .then(response => {
                console.log('PUT request successful:', response.data);
            })
            .catch(error => {
                console.error('Error making PUT request:', error);
            });
        }
        else if(user.bio === newBio && user.name !== newUsername){
            axios.put(`${API_BASE}/users/edit/${id}`, {
                name: newUsername
            })
            .then(response => {
                console.log('PUT request successful:', response.data);
            })
            .catch(error => {
                console.error('Error making PUT request:', error);
            });
        }
        else if(user.bio !== newBio){
            axios.put(`${API_BASE}/users/edit/${id}`, {
                bio: newBio
            })
            .then(response => {
                console.log('PUT request successful:', response.data);
            })
            .catch(error => {
                console.error('Error making PUT request:', error);
            });
        }

    };

    
    return( user ? (
        <div class="profilecard">
            <div class="coverContainer">
                <img class="coverimage" src={noCoverImage}></img>
                <div class="coverContainer2">
                    <p class="coverfrase">Trocar Capa</p>
                    <button class="botaocapa"></button>
                </div>
            </div>
            <div class="perfilcontainer">
                <img class="profileimage" src={noProfileImage}></img>
                <div class="perfilcontainer2">
                    <p class="perfilfrase">Trocar Ícone</p>
                    <button class="botaoperfil" src={iconPencil}></button>
                </div>
            </div>
            <div class="nomecontainer">
                <p class="nomefrase">Nome de Usuário</p>
                <input class="nomeusuario"
                type="text"
                value={newUsername}
                onChange={ ev => {setNewUsername(ev.target.value)}} />
                <button class="botaonome" src={iconPencil}></button>
            </div>
            <div class="biocontainer">
                <p class="bioo">Bio</p>
                <input class="bio"
                type="text"
                value={newBio}
                onChange={ ev => {setNewBio(ev.target.value)}} />
                <button class="botaobio" src={iconPencil}></button>
            </div>
            <button class="botaoconfirmar" onClick={handleUserChange}>CONFIRMAR</button>
        </div>
    ) : (
        <div>Carregando...</div>
    )
    );
}

export default ProfileCard;