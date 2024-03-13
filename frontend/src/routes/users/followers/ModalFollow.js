import React from 'react'
import { Link } from "react-router-dom"
import '../../../style/ModalFollow.css'

function ModalFollow({ closeModal, body }) {

    return (
        <div className="modal-follow-background">
            <div className="modal-follow-container">
                <div className="modal-follow-body">
                    <p>{body}</p>
                </div>
                <div className="modal-follow-close">
                    <Link className="link-modal-follow" onClick={() => closeModal(false)}>
                        <p>X</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ModalFollow;