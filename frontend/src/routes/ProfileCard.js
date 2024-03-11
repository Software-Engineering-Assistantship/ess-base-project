import React from 'react';
import { Form, useParams } from "react-router-dom"
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

    const [files1, setFiles1] = useState('');
    const [files2, setFiles2] = useState('');

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
        
        const data = new FormData();
        data.append('name', newUsername);
        data.append('bio', newBio);
        data.append('file1', files1[0]);
        data.append('file2', files2[0]);

        console.log(files1)
       
        axios.put(`${API_BASE}/users/edit/${id}`,
            data
        )
        .then(response => {
            console.log('PUT request successful:', response.data);
        })
        .catch(error => {
            console.error('Error making PUT request:', error);
        });

    };

    
    return( user ? (
        <div class="profilecard">
            <div class="coverContainer">
                <img class="coverimage" src={noCoverImage}></img>
                <div class="coverContainer2">
                    <p class="coverfrase">Trocar Capa</p>
                    <div>
                        <input class="botaocapa" type="file" id="coverPhoto" name="file2"
                            onChange={ev => setFiles2(ev.target.files)}/>
                    </div>
                </div>
            </div>
            <div class="perfilcontainer">
                <img class="profileimage" src={noProfileImage}></img>
                <div class="perfilcontainer2">
                    <p class="perfilfrase">Trocar Ícone</p>
                    <input class="botaoperfil" type="file" id="profilePhoto" name="file1"
                        onChange={ev => setFiles1(ev.target.files)}/>
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
