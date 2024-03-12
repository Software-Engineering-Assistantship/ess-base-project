import React from "react"
import "../style/Error.css"
import Header from "./commons/Header"

const ErrorPage = () => {
    return (
        <div>
            <Header/>
            <div  id="error-page">
            <div id="error-msg">
                <div id="error-404"> ERROR 404! </div>
                <div id="error-404-detail"> A página procurada não foi encontrada 😭 </div>
            </div>
            </div>
        </div>
    )
}

export default ErrorPage