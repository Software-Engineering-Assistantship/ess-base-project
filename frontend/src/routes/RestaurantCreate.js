import { useState, useEffect } from "react"
import { Link, Navigate } from "react-router-dom"

import '../style/Restaurants.css'

const API_BASE = "http://localhost:3001"

const RestaurantCreate = () => {

    const [redirect, setRedirect] = useState(false)

    const [name, setName] = useState('')
    const [site, setSite] = useState('')
    const [typeFood, setTypeFood] = useState('')
    const [number, setNumber] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [files, setFiles] = useState('')

    async function createNewRestaurant(ev){
        const data = new FormData()
        data.set('name', name)
        data.set('typeFood', typeFood)
        data.set('site', site)
        data.set('number', number)
        data.set('street', street)
        data.set('city', city)
        data.set('neighborhood', neighborhood)
        data.set('file', files[0])

        const response = await fetch(API_BASE + '/restaurants/create', {
            method: 'POST',
            body: data
        })

        if(response.ok) {
            setRedirect(true)
        }
    }

    if (redirect){
        return <Navigate to={'/restaurants'}/>
    }

    return (
        <div>
            <form onSubmit={createNewRestaurant}>
                <p>Nome do restaurante</p>
                <input type="text" placeholder="Melhor Pizza" 
                    value={name} 
                    onChange={ev => setName(ev.target.value)}/>

                <p>Tipo de comida</p>
                <input type="text" placeholder="Pizza" value={typeFood} 
                    onChange={ev => setTypeFood(ev.target.value)}/>

                <p>Site oficial</p>
                <input type="text" placeholder="Avenida Paulista" 
                    value={site} onChange={ev => setSite(ev.target.value)}/>

                <p>Endereço</p>

                <p>Rua</p>
                <input type="text" placeholder="Avenida Paulista" 
                    value={street} onChange={ev => setStreet(ev.target.value)}/>

                <p>Número</p>
                <input type="number" placeholder="123" value={number} 
                    onChange={ev => setNumber(ev.target.value)}/>

                <p>Bairro</p>
                <input type="text" placeholder="Madalena"
                    value={neighborhood} onChange={ev => setNeighborhood(ev.target.value)}/>

                <p>Cidade</p>
                <input type="text" placeholder="São Paulo"
                    value={city} onChange={ev => setCity(ev.target.value)}/>

                <p>Foto da página do restaurante</p>  
                <input type="file"
                    onChange={ev => setFiles(ev.target.files)}/>

            <button className="create-button">
                <p>Enviar</p>
            </button>

            </form>

        </div>
    );
};

export default RestaurantCreate;