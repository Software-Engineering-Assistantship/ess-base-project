import React from "react"
import { useState } from "react"
import '../../style/Feed.css'
import triangle from "../../assets/triangle.png";
const API_BASE = "http://localhost:3001"

const Feed = () => {
    const [restaurants] = useState([]);
    const [reviews] = useState([]);

    return (
        <div>

            <h1 className="title">Reviews em Alta</h1>
            {reviews.length === 0 && (
                <div className="content">
                    <h1 className= "noDataReview">AINDA NÃO EXISTEM REVIEWS CADASTRADAS NO SITE</h1>
                </div>
            )}
            {reviews.length > 0 && (
                <div className="content">
                    <img src={triangle} alt="triangle" className="leftTriangle"/>
                    <img src={triangle} alt="triangle" className="rightTriangle"/>
                </div>
            )}

            <h1 className="title">Restaurantes</h1>
            {restaurants.length === 0 && (
                <div className="content">
                    <h1 className= "noDataRestaurant">AINDA NÃO EXISTEM RESTAURANTES CADASTRADOS NO SITE</h1>
                </div>
            )}
            {restaurants.length > 0 && (
                <div className="content">
                    <img src={triangle} alt="triangle" className="leftTriangle"/>
                    <img src={triangle} alt="triangle" className="rightTriangle"/>
                </div>
            )}

            <h1 className="title">Reviews</h1>
            {reviews.length === 0 && (
                <div className="lastContent">
                    <h1 className= "noDataReview">AINDA NÃO EXISTEM REVIEWS CADASTRADAS NO SITE</h1>
                </div>
            )}
            {reviews.length > 0 && (
                <div className="lastContent">
                    <img src={triangle} alt="triangle" className="leftTriangle"/>
                    <img src={triangle} alt="triangle" className="rightTriangle"/>
                </div>
            )}
        </div>
    )
}

export default Feed
