import { useState, useEffect } from "react"
import { Link, Navigate } from "react-router-dom"
import Modal from "../commons/Modal"

import '../../style/Restaurants.css'

const API_BASE = "http://localhost:3001"

const RestaurantCreate = () => {

    const [name, setName] = useState('')
    const [site, setSite] = useState('')
    const [typeOfFood, settypeOfFood] = useState('')
    const [number, setNumber] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [files, setFiles] = useState('')
    const [openModal, setOpenModal] = useState(false)
    const [nextPage, setNextPage] = useState('/resturants')

    async function createNewRestaurant(ev){

        ev.preventDefault()

        const data = new FormData();
        data.append('name', name);
        data.append('site', site);
        data.append('typeOfFood', typeOfFood);
        data.append('file', files[0]); // Assuming files[0] is the file you want to upload

        // Append the nested address object
        data.append('address[number]', number);
        data.append('address[street]', street);
        data.append('address[city]', city);
        data.append('address[neighborhood]', neighborhood);

        const response = await fetch(API_BASE + '/restaurants/create', {
            method: 'POST',
            body: data
        })

        if(response.ok) {

            const restaurant = await response.json();

            setNextPage('/restaurants/' + restaurant._id)
            console.log(restaurant)
            setOpenModal(true)
        } else {
            console.error('Failed to create restaurant:', response.statusText);
        }
    }

    return (
        <div>
            <div id = "formpage">
                {openModal && <Modal closeModal={setOpenModal} title="Restaurante cadastrado com sucesso" nextPage={nextPage}/>}

                <form>
                    <div>
                        <label htmlFor="restaurantName">Nome do restaurante</label>
                        <input type="text" id="restaurantName" placeholder="Melhor Pizza" value={name} 
                            onChange={ev => setName(ev.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="typeofFood" >Tipo de comida</label>
                        <input type="text" id="typeofFood" placeholder="Pizza" value={typeOfFood} 
                            onChange={ev => settypeOfFood(ev.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="restaurantSite">Site oficial</label>
                        <input type="text" id="restaurantSite" placeholder="melhorpizza.com" 
                        value={site} onChange={ev => setSite(ev.target.value)}/>
                    </div>

                    <p id="address-title" >Endereço</p>

                    <div>
                        <label htmlFor="street">Rua</label>
                        <input type="text" id="street" placeholder="Avenida Paulista" 
                        value={street} onChange={ev => setStreet(ev.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="number">Número</label>
                        <input type="text" id="number" placeholder="123" value={number} 
                        onChange={ev => setNumber(ev.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="neighborhood">Bairro</label>
                        <input type="text" id="neighborhood" placeholder="Madalena"
                        value={neighborhood} onChange={ev => setNeighborhood(ev.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="city">Cidade</label>
                        <input type="text" id="city" placeholder="São Paulo"
                        value={city} onChange={ev => setCity(ev.target.value)}/>
                    </div>

                    <div>
                        <label htmlFor="profilePhoto">Foto da página do restaurante</label>
                        <input type="file" id="profilePhoto"
                        onChange={ev => setFiles(ev.target.files)}/>
                    </div>

                    <button className="simple-button" id="create-button" onClick={(createNewRestaurant)}>
                        <p>Enviar</p>
                    </button>

                </form>
                
            </div>

        </div>
    );
};

export default RestaurantCreate;