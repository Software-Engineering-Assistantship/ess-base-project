import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Axios } from 'axios'
import ProfileImage from "../../../images/noprofileimage.png"
import '../../../style/FollowList.css'

const API_BASE = "http://localhost:3001"


const FollowersList = () => {

    let navigate = useNavigate()

    const currentUserId = "65d51f9ac3b06ec45cdd2acb"

    const [error, setError] = useState(null)
    const [followersL, setFollowersL] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    const [userPage, setUserPage] = useState(null)
    const [userTargetId, setUserTargetId] = useState(null)
    const { id } = useParams()

    useEffect(() => {
        fetch( API_BASE + '/users/' + id)
            .then(response => {
                response.json().then(data => {
                    setUserPage(data)
                }).catch(err => {
                    console.error("Error: ", err);
                    setError(err.message);
                })
            }).then(fetch( API_BASE + '/users/followers/' + id)
            .then(response => {
                response.json().then(data => {
                    setFollowersL(data)
                }).catch(err => {
                    console.error("Error: ", err);
                    setError(err.message);
                })
            })).then(fetch( API_BASE + '/users/' + currentUserId)
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

        fetch(API_BASE + '/users/follow/' + target + '/' + currentUser._id, {
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


        fetch(API_BASE + '/users/unfollow/' + target + '/' + currentUser._id, {
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

    const allSet = ((userPage !== null) && (followersL !== null)) && (currentUser !== null)

    return ( allSet  ? (
        <div className="page-follow-list">
            <div className="body-follow-list">
                <div className="list-follow-top">   
                    <h2 className="list-follow-title">Seguidores de {userPage.name}</h2>
                    <Link className="close-button-follow" to={`/users/${id}`}> X </Link>
                </div> 

            <div className="all-users-follow">
                {followersL.map(follower => (
                    <div className="unit-preview-follow" key={follower._id} > 
                        <div className="unit-follow">
                            <div class="unit-img-follow">
                                {follower.profileImage ? (
                                    <img src={follower.profileImage} alt="Profile Image" class="foto-perfil-follow"/>
                                ) : (    
                                    <img src={ProfileImage} alt="null Profile Image" class="foto-perfil-follow"/>
                                )}
                            </div>
                            <div className="unit-info-follow">
                                <h2>{follower.name}</h2>
                                <h3>{follower.followers.length} SEGUIDORES</h3> 
                                <h3>{follower.reviews.length} REVIEWS</h3>
                            </div>
                        </div>
                    <div>
                        {(currentUser._id !== follower._id) ? (
                        
                            ((currentUser.following) ? 
                                
                                (!currentUser.following.includes(follower._id) ? (
                                    <div className="unit-buttons-follow">
                                        <Link className="link-follow" to={`/users/${follower._id}`}>
                                            <div className="view-button-follow">
                                                <p>Ver perfil</p>
                                            </div>
                                        </Link>
                                        <Link className="link-follow" onClick={(e) => {follow(follower._id, e)}} alert="Você seguiu com sucesso">
                                            <div className="follow-button">
                                                <p>Seguir</p>
                                            </div>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="unit-buttons-follow">
                                        <Link className="link-follow" to={`/users/${follower._id}`}>
                                            <div className="view-button-follow">
                                                <p>Ver perfil</p>
                                            </div>
                                        </Link>
                                        <Link className="link-follow" onClick={(e) => {unfollow(follower._id, e)}} alert="Você deixou de seguir com sucesso">
                                            <div className="unfollow-button">
                                                <p>Deixar de seguir</p>
                                            </div>
                                        </Link>
                                    </div>
                                )) 
                                
                                
                            : (
                                <p></p>
                            ))) 
                                
                        : (
                            <div className="unit-button-view-follow">
                                <Link className="link-follow" to={`/users/${follower._id}`}>
                                    <div className="view-button-alone-follow">
                                        <p>Ver perfil</p>
                                    </div>
                                </Link>
                            </div>
                        ) }

                        </div>

                    </div>

                ))}
            </div>
            </div>

        </div>


        ) : (
            <div className="page-follow-list">
            <div className="body-follow-list">
                <div className="list-follow-top">   
                    <h2 className="list-follow-title"></h2>
                    <Link className="close-button-follow" to={`/users/${id}`}> x </Link>
                </div> 
            </div>
            </div>
        )
    )
}

export default FollowersList