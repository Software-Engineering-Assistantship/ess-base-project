const Restaurant = require("../models/Restaurant")
const Review = require("../models/Review")

// selects 5 random restaurants registered
const get_random_restaurants = async (req, res) => {
    const restaurants = await Restaurant.find()

    if (restaurants.length === 0) {
        return res.status(404).json({ error: 'Ainda não há restaurantes cadastrados' })
    }
    else {
        const random_restaurants = restaurants.sort(() => Math.random() - 0.5).slice(0, 5);
        res.json(random_restaurants)
    }
}

// selects 5  random reviews registered
const get_random_reviews = async (req, res) => {
    const reviews = await Review.find()

    if (reviews.length === 0) {
        return res.status(404).json({ error: 'Ainda não há reviews cadastradas' })
    }
    else {
        const random_reviews = reviews.sort(() => Math.random() - 0.5).slice(0, 5);
        res.json(random_reviews)
    }
}

// finds the 5 most liked reviews
const get_most_liked_reviews = async (req, res) => {
    const reviews = await Review.find()

    if (reviews.length === 0) {
        return res.status(404).json({ error: 'Ainda não há reviews cadastradas' })
    }
    else {
        const most_liked_reviews = await Review.find().sort({ likes: -1 }).limit(5);
        res.json(most_liked_reviews)
    }
}

module.exports = {
    get_random_restaurants,
    get_random_reviews,
    get_most_liked_reviews
}
