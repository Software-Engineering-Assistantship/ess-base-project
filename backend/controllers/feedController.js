const Review = require("../models/Review")
const Restaurant = require("../models/Restaurant")

// finds the ten most liked reviews created on a specific day
const get_likes = async (req, res) => {
    const today = new Date()
    
    today.setHours(0, 0, 0, 0);

    const most_liked_reviews = await Review.find({
        created: { $gte: today }
    }).sort({ likes: -1 }).limit(10);

    if (most_liked_reviews.length === 0) {
        return res.status(404).json({ error: 'Ainda não foi feita nenhuma review hoje' });
    }
    else {
        res.json(most_liked_reviews)
    }
}

// finds the ten most viewed reviews created on a specific day
const get_views = async (req, res) => {
    const today = new Date()
    
    today.setHours(0, 0, 0, 0);

    const most_viewed_reviews = await Review.find({
        created: { $gte: today }
    }).sort({ views: -1 }).limit(10);

    if (most_viewed_reviews.length === 0) {
        return res.status(404).json({ error: 'Ainda não foi feita nenhuma review hoje' });
    }
    else {
        res.json(most_viewed_reviews)
    }
}

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


module.exports = {
    get_likes,
    get_views,
    get_random_restaurants
}
