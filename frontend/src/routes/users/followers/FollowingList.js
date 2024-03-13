import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import ProfileImage from "../../../images/noprofileimage.png"
import '../../../style/FollowList.css'

const API_BASE = "http://localhost:3001"



const FollowingList = () => {

    let navigate = useNavigate()

    const currentUserId = "65d51f9ac3b06ec45cdd2acb"

    const [error, setError] = useState(null)
    const [followeds, setFolloweds] = useState(null)
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
            }).then(fetch( API_BASE + '/users/following/' + id)
            .then(response => {
                response.json().then(data => {
                    setFolloweds(data)
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

    const allSet = ((userPage !== null) && (followeds !== null)) && (currentUser !== null)

    return ( allSet ? (
        <div className="page-follow-list">
            <div className="body-follow-list">
                <div className="list-follow-top">   
                    <h2 className="list-follow-title">Pessoas que {userPage.name} segue</h2>
                    <Link className="close-button-follow" to={`/users/${id}`}> X </Link>
                </div> 

            <div className="all-users-follow">
                {followeds.map(followed => (
                    <div className="unit-preview-follow" key={followed._id} > 
                        <div className="unit-follow">
                            <div className="unit-img-follow">
                                {followed.profileImage ? (
                                    <img src={followed.profileImage} alt="Profile Image" className="foto-perfil-follow"/>
                                ) : (    
                                    <img src={ProfileImage} alt="null Profile Image" className="foto-perfil-follow"/>
                                )}
                            </div>
                            <div className="unit-info-follow">
                                <h2>{followed.name}</h2>
                                <h3>{followed.followers.length} SEGUIDORES</h3> 
                                <h3>{followed.reviews.length} REVIEWS</h3>
                            </div>
                        </div>
                    <div>
                        {(currentUser._id !== followed._id) ? (
                        
                            ((currentUser.following) ? 
                                
                                (!currentUser.following.includes(followed._id) ? (
                                    <div className="unit-buttons-follow">
                                        <Link className="link-follow" to={`/users/${followed._id}`}>
                                            <div className="view-button-follow">
                                                <p>Ver perfil</p>
                                            </div>
                                        </Link>
                                        <Link className="link-follow" onClick={(e) => {follow(followed._id, e)}} alert="Você seguiu com sucesso">
                                            <div className="follow-button">
                                                <p>Seguir</p>
                                            </div>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="unit-buttons-follow">
                                        <Link className="link-follow" to={`/users/${followed._id}`}>
                                            <div className="view-button-follow">
                                                <p>Ver perfil</p>
                                            </div>
                                        </Link>
                                        <Link className="link-follow" onClick={(e) => {unfollow(followed._id, e)}} alert="Você deixou de seguir com sucesso">
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
                                <Link className="link-follow" to={`/users/${followed._id}`}>
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
            <>ERROR</>
        )
    )
}

export default FollowingList