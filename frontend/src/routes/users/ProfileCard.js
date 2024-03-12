import React from 'react';
import { Form, useNavigate, useParams } from "react-router-dom"
import {  useState, useEffect, useRef  } from "react"
import '../../style/ProfileCard.css'
import noProfileImage from "../../images/noprofileimage.png"
import noCoverImage from "../../images/nocoverimage.png"
import iconPencil from "../../images/iconpencil.png"
import axios from "axios";

const API_BASE = "http://localhost:3001"

const ProfileCard = () => {
    const clickCover = useRef(null);
    const clickProfile = useRef(null);
    const navigate = useNavigate()

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

                    setNewUsername(data.name)
                    if(data.bio){
                        setNewBio(data.bio)
                    }
                    setUser(data)
                })
            })
    }, []); 

    
    let check1 = false;
    if(user && !user.profileImage) {
        check1 = true;    
    }
   
    let check2 = false;
    if(user && !user.coverImage) {
        check2 = true;
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

        console.log(data)
       
        axios.put(`${API_BASE}/users/edit/${id}`,
            data
        )
        .then(response => {
            console.log('PUT request successful:', response.data);
        })
        .catch(error => {
            console.error('Error making PUT request:', error);
        })
        .finally(() => {
            navigate('/users/' + id)
            window.location.reload()
        });
    };

    const handleCoverChange = () => {
        clickCover.current.click();
    };

    const handleProfilePicChange = () => {
        clickProfile.current.click();
    };
    
    return( user ? (
        <div class="profilecard">
            <div class="coverContainer">
                {
                    check2 ? (
                        <img class="coverimage" src={noCoverImage}></img>
                    ) : (
                        <img class="coverimage" src={`${API_BASE}/${user.coverImage}`}></img>
                    )
                }
                <div class="coverContainer2">
                    <p class="coverfrase">Trocar Capa</p>
                    <button class="botaocapa" src={iconPencil} onClick={handleCoverChange}></button>
                    <input type="file" id="coverPhoto" name="file2" style={{display: 'none'}}
                        ref={clickCover} onChange={ev => setFiles2(ev.target.files)}/>
                </div>
            </div>
            <div class="perfilcontainer">
                {
                    check1 ? (
                        <img class="profileimage" src={noProfileImage}></img>
                    ) : (
                        <img class="profileimage" src={`${API_BASE}/${user.profileImage}`}></img>
                    )
                }
                <div class="perfilcontainer2">
                    <p class="perfilfrase">Trocar Ícone</p>
                    <button class="botaoperfil" src={iconPencil} onClick={handleProfilePicChange}></button>
                    <input type="file" id="profilePhoto" name="file1" style={{display: 'none'}}
                        ref={clickProfile} onChange={ev => setFiles1(ev.target.files)}/>
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
                onChange={ ev => {setNewBio(ev.target.value)}}/>
                <button class="botaobio" src={iconPencil}></button>
            </div>
            <button class="botaoconfirmar" onClick={handleUserChange}>CONFIRMAR</button>
        </div>
    ) : (
        <div></div>
    )
    );
}

export default ProfileCard;
