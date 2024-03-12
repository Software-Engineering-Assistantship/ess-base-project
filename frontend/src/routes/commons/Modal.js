import React from 'react'
import '../../style/Modal.css'

import { useNavigate } from 'react-router-dom';

function Modal({ closeModal, nextPage, title, body, error }) {

    const navigate = useNavigate()

    return (
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="titleCloseBtn">
                        <button
                        onClick={() => {
                            if(!error){
                                navigate(nextPage);
                            } else {
                                closeModal(false)
                            }
                        }}
                        >
                        <img id="x-img" width="24" height="24" src="https://img.icons8.com/color/48/delete-sign--v1.png" alt="delete-sign--v1"/>
                        </button>
                    </div>

                    <div className="modal-title">
                        <h1>{title}</h1>
                    </div>
                    <div className="modal-body">
                        <p>{body}</p>
                        { !error && <p>Obrigado por contribuir com nossa comunidade!</p>}
                    </div>
                    <div className="modal-footer">
                        <button
                        onClick={() => {
                            if(!error){
                                navigate(nextPage);
                            } else {
                                closeModal(false)
                            }
                        }}
                        id="cancelBtn"
                        >
                        Ok
                        </button>
                    </div>
                    
                    <div id="color" className={error ? "color-error" : ""}></div>
                </div>
            </div>
    );
}

export default Modal;