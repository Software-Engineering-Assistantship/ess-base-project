import React from 'react'
import '../../style/Modal.css'

import { useNavigate } from 'react-router-dom';

function Modal({ closeModal, title }) {

    const navigate = useNavigate()

    return (
        <div className="modalBackground">
            <div className="modalContainer">
            <div className="titleCloseBtn">
                <button
                onClick={() => {
                    navigate('/restaurants');
                }}
                >
                X
                </button>
            </div>
            <div className="title">
                <h1>{title}</h1>
            </div>
            <div className="body">
                <p>Obrigado por contribuir com nossa comunidade!</p>
            </div>
            <div className="footer">
                <button
                onClick={() => {
                    navigate('/restaurants');
                }}
                id="cancelBtn"
                >
                Ok
                </button>
            </div>
            </div>
        </div>
    );
}

export default Modal;