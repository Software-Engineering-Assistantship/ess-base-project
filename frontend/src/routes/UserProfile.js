import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import ProfileImage from "../images/noprofileimage.png"
import CoverImage from "../images/nocoverimage.png"

import '../style/UserProfile.css'

const API_BASE = "http://localhost:3001"

const UserProfile = () => {

    const [user, setUser] = useState(null);
    const { id } = useParams()

    useEffect(() => {
        fetch( API_BASE + '/users/' + id)
            .then(response => {
                response.json().then(data => {
                    setUser(data)
                })
            })
    }, []); 

    const check1 = user && user.profileImage;
    const check2 = user && user.coverImage;

    return (user ? (
            <div class="tudinho">
                <div class="containerProfile">
                    <div class="coverImageContainer">
                        {check2 ? (
                            <img src={user.coverImage} alt="Cover Image" class="fotocapa"/>
                        ) : (
                            <img src={CoverImage} alt="null Cover Image" class="fotocapa"/>    
                            )}
                    </div>
                    <div class="combineinfos">
                        <div class="profileImageContainer">
                            {check1 ? (
                                <img src={user.profileImage} alt="Profile Image" class="fotoperfil"/>
                            ) : (    
                                <img src={ProfileImage} alt="null Profile Image" class="fotoperfil"/>
                            )}
                        </div>
                        <div class="profileInfo">
                            <p class="nameuser">{user.name}</p>
                            <p class="biouser">{user.bio}</p>
                            <div class="followuser">
                                <p class="followersuser">{user.followers.size ?? 0} SEGUIDORES</p>
                                <p class="followinguser">{user.following.size ?? 0} SEGUINDO</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="buttons" >
                    <button class="buttonreviews"> REVIEWS ({user.reviews.size ?? 0})</button>
                    <button class="buttonedit"></button>
                </div>
            </div>

        ):(
            <p>Loading...</p>
        )
    );
}

export default UserProfile
