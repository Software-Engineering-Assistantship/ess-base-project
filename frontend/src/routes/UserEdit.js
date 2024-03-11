import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import noProfileImage from "../images/noprofileimage.png"
import ProfileCard from "./ProfileCard"
import '../style/UserEdit.css'
import PasswordCard from "./PasswordCard"
import RemoveCard from "./RemoveCard"

const API_BASE = "http://localhost:3001"

const UserEdit = () => {

    const [user, setUser] = useState(null);
    const { id } = useParams()
    const [cardProfile, setcardProfile] = useState(false);
    const [passwordCard, setpasswordCard] = useState(false);
    const [removeCard, setRemoveCard] = useState(false);

    useEffect(() => {
        fetch( API_BASE + '/users/' + id)
            .then(response => {
                response.json().then(data => {
                    setUser(data)
                })
            })
    }, []); 

    if(user && !user.profileImage) {
        user.profileImage = noProfileImage;
    }

    const showProfileInfo = () => {
        setRemoveCard(false);
        setpasswordCard(false);
        setcardProfile(!cardProfile);
    };
    
    const showPasswordInfo = () => {
        setRemoveCard(false);
        setcardProfile(false);
        setpasswordCard(!passwordCard);
    };
    
    const showRemoveInfo = () => {
        setpasswordCard(false);
        setcardProfile(false);
        setRemoveCard(!removeCard);
    };

    return ( user ? (
            <div class="tudinhoo">
                <div class="cardmenu">
                    <div class="topinfo">
                        <p class="title">Menu de Edição</p>
                        <img src={user.profileImage} class="profilepicture"></img>
                        <p class="username">{user.name}</p>
                    </div>
                    <div class="bottominfo">
                        <button class="profile" onClick={showProfileInfo}>Perfil</button>
                        <button class="password" onClick={showPasswordInfo}>Senha</button>
                        <button class="advanced" onClick={showRemoveInfo}>Avançado</button>
                    </div>
                </div> 
                <div class="cards"> 
                    {cardProfile && <ProfileCard />} 
                    {passwordCard && <PasswordCard />}
                    {removeCard && <RemoveCard />}
                </div>
            </div>
        ):(
            <p>Carregando...</p>
        )

    );
}

export default UserEdit