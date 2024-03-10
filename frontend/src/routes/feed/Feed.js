import React from "react"
import '../../style/Feed.css'
import Header from "../../header/Header.js";
const API_BASE = "http://localhost:3001"

const Feed = () => {
    return (
        <div>
            <div className ="header">
                <Header />
            </div>

            <h1 className="trendingReviews">Reviews em Alta</h1>
            <div className="listTrendingReviews"></div>

            <h1 className="randomRestaurants">Restaurantes</h1>
            <div className="listRandomRestaurants"></div>

            <h1 className="randomReviews">Reviews</h1>
            <div className="listRandomReviews"></div>
        </div>
    )
}

export default Feed
