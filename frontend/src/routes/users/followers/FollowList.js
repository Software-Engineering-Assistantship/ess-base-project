import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import ProfileImage from "../../../images/noprofileimage.png"
import '../../../style/FollowList.css'
import ModalFollow from "./ModalFollow.js"

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

function FollowList({followers}) {

    const currentUserId = getUserIdFromToken()

    const [error, setError] = useState(null)
    const [list, setList] = useState(null)
    const [currentUser, setCurrentUser] = useState(null)
    const [userPage, setUserPage] = useState(null)
    const [modalFollow, setModalFollow] = useState(false)
    const [modalUnfollow, setModalUnfollow] = useState(false)
    const { id } = useParams()

    let type;

    if (followers) {
        type = 'followers'
    } else {
        type = 'following'
    }

    useEffect(() => {
        fetch( API_BASE + '/users/' + id)
            .then(response => {
                response.json().then(data => {
                    setUserPage(data)
                }).catch(err => {
                    console.error("Error: ", err);
                    setError(err.message);
                })
            }).then(fetch( API_BASE + '/users/' + type + '/' + id)
            .then(response => {
                response.json().then(data => {
                    setList(data)
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
            .then(response => { if (response.ok)
                setModalFollow(true); 
                setTimeout(() => {
                    setModalFollow(false);
                    window.location.reload(false)}, 
                    3000)
                })
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
            .then(
                response => { if (response.ok)
                setModalUnfollow(true); 
                setTimeout(() => {
                    setModalUnfollow(false);
                    window.location.reload(false)}, 
                    3000)
                })
            .catch(err => {
                    console.error("Error: ", err);
                    setError(err.message);
                    })
            

    }

    const allSet = ((userPage !== null) && (list !== null)) && (currentUser !== null)

    return ( allSet ? (
            <div>
                {modalFollow && <ModalFollow closeModal={setModalFollow} body={"Seguiu com sucesso. Uma mensagem foi enviada para o usuário!"}/>}
                {modalUnfollow && <ModalFollow closeModal={setModalUnfollow} body={"Deixou de seguir com sucesso!"}/>}
                <div className="page-follow-list">
                    <div className="body-follow-list">
                        <div className="list-follow-top">   
                            {!followers && <h2 className="list-follow-title">Pessoas que {userPage.name} segue</h2>}
                            {followers && <h2 className="list-follow-title">Seguidores de {userPage.name}</h2>}
                            <Link className="close-button-follow" to={`/users/${id}`}> X </Link>
                        </div> 

                    <div className="all-users-follow">
                        {list.map(user => (
                            <div className="unit-preview-follow" key={user._id} > 
                                <div className="unit-follow">
                                    <div className="unit-img-follow">
                                        {user.profileImage ? (
                                            <img src={user.profileImage} alt="Profile Image" className="foto-perfil-follow"/>
                                        ) : (    
                                            <img src={ProfileImage} alt="null Profile Image" className="foto-perfil-follow"/>
                                        )}
                                    </div>
                                    <div className="unit-info-follow">
                                        <h2>{user.name}</h2>
                                        <h3>{user.followers.length} SEGUIDORES</h3> 
                                        <h3>{user.reviews.length} REVIEWS</h3>
                                    </div>
                                </div>
                            <div>
                                {(currentUser._id !== user._id) ? (
                                
                                    ((currentUser.following) ? 
                                        
                                        (!currentUser.following.includes(user._id) ? (
                                            <div className="unit-buttons-follow">
                                                <Link className="link-follow" to={`/users/${user._id}`}>
                                                    <div className="view-button-follow">
                                                        <p>Ver perfil</p>
                                                    </div>
                                                </Link>
                                                <Link className="link-follow" onClick={(e) => {follow(user._id, e)}}>
                                                    <div className="follow-button">
                                                        <p>Seguir</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        ) : (
                                            <div className="unit-buttons-follow">
                                                <Link className="link-follow" to={`/users/${user._id}`}>
                                                    <div className="view-button-follow">
                                                        <p>Ver perfil</p>
                                                    </div>
                                                </Link>
                                                <Link className="link-follow" onClick={(e) => {unfollow(user._id, e)}}>
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
                                        <Link className="link-follow" to={`/users/${user._id}`}>
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
            </div>
            ) : (
            
            <div className="body-follow-no-user">
                <div className="error-no-follow">   
                    <h2>Loading</h2>
                    <Link className="view-button-follow" to={`/users/${id}`}> voltar </Link>
                </div>    
            </div>
            
            
        )
    )

}

export default FollowList