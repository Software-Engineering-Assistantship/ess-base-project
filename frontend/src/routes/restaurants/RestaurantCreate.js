import { useState, useEffect } from "react"
import { Link, Navigate } from "react-router-dom"
import Modal from "../commons/Modal"

import '../../style/Restaurants.css'

const API_BASE = "http://localhost:3001"

const RestaurantCreate = () => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState(false)

    const [name, setName] = useState('')
    const [site, setSite] = useState('')
    const [typeOfFood, settypeOfFood] = useState('')
    const [number, setNumber] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [neighborhood, setNeighborhood] = useState('')
    const [files1, setFiles1] = useState('')
    const [files2, setFiles2] = useState('')

    const [openModal, setOpenModal] = useState(false)
    const [modalBody, setModalBody] = useState('')
    const [nextPage, setNextPage] = useState('/resturants')

    async function createNewRestaurant(ev){

        ev.preventDefault()

        const data = new FormData();
        data.append('name', name);
        data.append('site', site);
        data.append('typeOfFood', typeOfFood);
        data.append('file1', files1[0]); // Assuming files[0] is the file you want to upload
        data.append('file2', files2[0]);

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

            window.scrollTo({
                top: 0,
                behavior: 'smooth'
               });
            setError(false)
            setTitle('O restaurante foi cadastrado com sucesso')
            setNextPage('/restaurants/' + restaurant._id)
            setOpenModal(true)
            setModalBody('')
        } else {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
               });
            setError(true)
            setTitle('ERRO: não foi possível cadastrar o restaurante')
            setModalBody('Há um restaurante com mesmo endereço e nome já cadastrado no sistema')
            setOpenModal(true)
        }
    }

    return (
        <div>
            <div id = "formpage">
                {openModal && <Modal closeModal={setOpenModal} title={title} nextPage={nextPage} error={error} body={modalBody}/>}

                <form>
                    <div className="form-field">
                        <label htmlFor="restaurantName">Nome do restaurante</label>
                        <input type="text" id="restaurantName" placeholder="Melhor Pizza" value={name} 
                            onChange={ev => setName(ev.target.value)}/>
                    </div>

                    <div className="form-field">
                        <label data-cy="typeOfFood" htmlFor="typeofFood" >Tipo de comida</label>
                        <input type="text" id="typeofFood" placeholder="Pizza" value={typeOfFood} 
                            onChange={ev => settypeOfFood(ev.target.value)}/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="restaurantSite">Site oficial</label>
                        <input type="text" id="restaurantSite" placeholder="melhorpizza.com" 
                        value={site} onChange={ev => setSite(ev.target.value)}/>
                    </div>

                    <p id="address-title" >Endereço</p>

                    <div className="form-field">
                        <label htmlFor="street">Rua</label>
                        <input type="text" id="street" placeholder="Avenida Paulista" 
                        value={street} onChange={ev => setStreet(ev.target.value)}/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="number">Número</label>
                        <input type="text" id="number" placeholder="123" value={number} 
                        onChange={ev => setNumber(ev.target.value)}/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="neighborhood">Bairro</label>
                        <input type="text" id="neighborhood" placeholder="Madalena"
                        value={neighborhood} onChange={ev => setNeighborhood(ev.target.value)}/>
                    </div>

                    <div className="form-field"> 
                        <label htmlFor="city">Cidade</label>
                        <input type="text" id="city" placeholder="São Paulo"
                        value={city} onChange={ev => setCity(ev.target.value)}/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="profilePhoto">Foto do perfil do restaurante</label>
                        <input type="file" id="profilePhoto" name="file1"
                        onChange={ev => setFiles1(ev.target.files)}/>
                    </div>

                    <div className="form-field">
                        <label htmlFor="coverPhoto">Capa da página do restaurante</label>
                        <input type="file" id="coverPhoto" name="file2"
                        onChange={ev => setFiles2(ev.target.files)}/>
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