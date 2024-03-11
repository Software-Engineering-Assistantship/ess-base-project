import { useParams, useNavigate, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { Axios, AxiosResponse } from 'axios'
import ProfileImage from "../images/noprofileimage.png"
import '../style/FollowList.css'

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



    const follow = async () => {

        try{
            const response = await Axios.put({
                url: API_BASE + '/users/follow' + userTargetId, 
                data: JSON.stringify(currentUser)
            })

            if (response.ok){
                window.location.reload(false)
            }
        } catch (e) {
            console.error(e)
        }

    }

    async function unfollow() {

        try{
            const response = await fetch(API_BASE + '/users/unfollow' + userTargetId, {
                method: "PUT",
                data: JSON.stringify(currentUser)
            })

            if (response.ok){
                window.location.reload(false)
            }
        } catch (e) {
            console.error(e)
        }

    }

    const allSet = ((userPage !== null) && (followeds !== null)) && (currentUser !== null)

    return ( allSet ? (
        <div className="page">
            <div className="body-list">
                <div className="list-top">   
                    <h2 className="list-title">Pessoas que {userPage.name} segue</h2>
                    <Link className="close-button" to={`/users/${id}`}> X </Link>
                </div> 

            <div className="all-users">
                {followeds.map(followed => (
                    <div className="unit-preview" key={followed._id} > 
                        <div className="unit">
                            <div class="unit-img">
                                {followed.profileImage ? (
                                    <img src={followed.profileImage} alt="Profile Image" class="foto-perfil"/>
                                ) : (    
                                    <img src={ProfileImage} alt="null Profile Image" class="foto-perfil"/>
                                )}
                            </div>
                            <div className="unit-info">
                                <h2>{followed.name}</h2>
                                <h3>{followed.followers.length} SEGUIDORES</h3> 
                                <h3>{followed.reviews.length} REVIEWS</h3>
                            </div>
                        </div>
                    <div>
                        {(currentUser._id !== followed._id) ? (
                        
                            ((currentUser.following) ? 
                                
                                (!currentUser.following.includes(followed._id) ? (
                                    <div className="unit-buttons">
                                        <Link className="link" to={`/users/${followed._id}`}>
                                            <div className="view-button-f">
                                                <p>Ver perfil</p>
                                            </div>
                                        </Link>
                                        <Link className="link" onClick={() => {follow(setUserTargetId(f => followed._id))}}>
                                            <div className="follow-button">
                                                <p>Seguir</p>
                                            </div>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="unit-buttons">
                                        <Link className="link" to={`/users/${followed._id}`}>
                                            <div className="view-button-f">
                                                <p>Ver perfil</p>
                                            </div>
                                        </Link>
                                        <Link className="link" onClick={() => {unfollow(setUserTargetId(f => followed._id))}}>
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
                            <div className="unit-button-view">
                                <Link className="link" to={`/users/${followed._id}`}>
                                    <div className="view-button-alone">
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