import React from "react"
import { useNavigate } from "react-router-dom"

const UserPage = () => {

    let navigate = useNavigate()
    let user = {
        id: 132,
        name: "sasa"
    }

    return (
        <div>
        <h1> {user.name} </h1>

        <button onClick={() => navigate("/users/followers/" + user.id)}>
            SEGUIDORES
        </button>

        <button onClick={() => navigate("/users/following/" + user.id)}>
            SEGUINDO
        </button>
        </div>
      )
    
}

export default UserPage