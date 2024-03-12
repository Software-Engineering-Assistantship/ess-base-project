import { useParams, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import ProfileImage from "../images/noprofileimage.png"
import CoverImage from "../images/nocoverimage.png"

import '../style/UserProfile.css'

const API_BASE = "http://localhost:3001"

function getUserIdFromToken() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(atob(payload));
        return decodedPayload.userId; // Ensure this matches your JWT payload
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
}
const UserProfile = () => {

    let navigate = useNavigate()

    const currentUserId = getUserIdFromToken()

    const [currentUser, setCurrentUser] = useState(null)
    const [user, setUser] = useState(null);
    const { id } = useParams()
    const [error, setError] = useState(null)
    console.log(currentUser);
    useEffect(() => {
        fetch( API_BASE + '/users/' + id)
            .then(response => {
                response.json().then(data => {
                    setUser(data)
                })
            }).then(fetch( API_BASE + '/users/' + currentUserId)
            .then(response => {
                response.json().then(data => {
                    setCurrentUser(data)
                }).catch(err => {
                    console.error("Error: ", err);
                    setError(err.message);
                })
            }))
    }, []); 

    async function follow(target) {

        fetch(API_BASE + '/users/follow/' + target + '/' + currentUserId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(response => response.ok.then(window.location.reload(false)))
            .catch(err => {
                    console.error("Error: ", err);
                    setError(err.message);
                })
    }

    async function unfollow(target) {


        fetch(API_BASE + '/users/unfollow/' + target + '/' + currentUserId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            }})
            .then(response => response.ok.then(window.location.reload(false)))
            .catch(err => {
                    console.error("Error: ", err);
                    setError(err.message);
                    })
            

    }

    const check1 = user && user.profileImage;
    const check2 = user && user.coverImage;
    const check3 = user && (currentUserId === id)

    return (user && currentUser ? (
            <div class="tudinho">
                <div class="containerProfile">
                    <div class="coverImageContainer">
                        {check2 ? (
                            <img src={`${API_BASE}/${user.coverImage}`} alt="Cover Image" class="fotocapa"/>
                        ) : (
                            <img src={CoverImage} alt="null Cover Image" class="fotocapa"/>    
                            )}
                    </div>
                    <div class="combineinfos">
                        <div class="profileImageContainer">
                            {check1 ? (
                                <img src={`${API_BASE}/${user.profileImage}`} alt="Profile Image" class="fotoperfil"/>
                            ) : (    
                                <img src={ProfileImage} alt="null Profile Image" class="fotoperfil"/>
                            )}
                        </div>
                        <div class="profileInfo">
                            <p class="nameuser">{user.name}</p>
                            <p class="biouser">{user.bio}</p>
                            <div class="followuser">
                                <Link class="followersuser" to={`/users/followers/${id}`}>
                                    {user.followers.length ?? 0} SEGUIDORES
                                </Link>
                                <Link class="followinguser" to={`/users/following/${id}`}>
                                    {user.following.length ?? 0} SEGUINDO
                                </Link> 
                            </div>
                        </div>
                        <div className="followbutton">
                            
                                {!check3 ? (
                        
                                    ((currentUser.following) ? 
                                    
                                        (!currentUser.following.includes(id) ? (
                                            
                                            <Link className="link-follow" onClick={(e) => {follow(id, e)}}>
                                                <div className="follow-button-user-page">
                                                    <p>Seguir</p>
                                                </div>
                                            </Link>
                                            
                                            ) : (
                                            
                                            <Link className="link-follow" onClick={(e) => {unfollow(id, e)}}>
                                                <div className="unfollow-button-user-page">
                                                    <p>Deixar de seguir</p>
                                                </div>
                                            </Link>
                                           
                                        )) 
                                    
                                    
                                    : (
                                        <p></p>
                                    ))) 
                                
                                : (
                                    <></>
                                ) }

                            </div>
                    </div>
                </div>
                <div class="buttonsuserprofile" >
                    <button class="buttonreviews"> REVIEWS </button>
                    {check3 ? (
                        <button class="buttonedit" onClick={() => navigate("/users/edit/" + id)}></button>
                    ) : null
                    }
                </div>
            </div>
        ):(
            <p>Loading...</p>
        )
    );
}

export default UserProfile
