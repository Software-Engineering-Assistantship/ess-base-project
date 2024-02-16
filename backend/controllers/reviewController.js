const Review = require("../models/Review")
const Restaurant = require("../models/Restaurant")

//show all registered reviews from a given restaurant
const review_show = async (req, res) => {
    let restaurant = await Restaurant.findById(req.params.id)
    const reviews = await Review.find({restaurant: restaurant._id})

    if (reviews.length === 0) {
        return res.status(404).json({ error: 'Ainda não há reviews para este restaurante' })
    } else {
        res.json(reviews)
    }
}

//show the page of a given review
const review_get = async (req, res) => {
    const review = await Review.findById(req.params.id)

    if (!review) {
        return res.status(404).json({ error: 'Review não encontrado' })
    }
    else{
        res.json(review)
    }

}

//create a new review
const review_post = async (req, res) => {
    const review = new Review({...req.body})

    review.save()

    res.json(review)
}

/*
//show the page of the creation of a review
const review_post_page = async (req, res) => {
    let restaurant = await Restaurant.findById(req.params.id)

    res.render('create', title = restaurant.name)
}

//show the page of the edit of a review
const review_edit_page = async (req, res) => {
    let restaurant = await Restaurant.findById(req.params.id)

    res.render('edit', title = restaurant.name)
}
*/

//Edit a review with the given id
const review_edit = async (req, res) => {
    let review = await Review.findById(req.params.id)

    if (!review) {
        return res.status(404).json({ error: 'Review não encontrado' })
    }

    review.set(req.body);

    review.save()

    res.json(review)
}

// delete a review with the given id
const review_delete = async (req, res) => {
    
    let review = await Review.findByIdAndDelete(req.params.id)

    if (!review) {
        return res.status(404).json({ error: 'Review não encontrado' })
    }

    review.set(req.body);

    res.json(review)
}

// show the review from a given user

//show all registered reviews from a given restaurant
const review_user = async (req, res) => {
    let user = await User.findById(req.params.id)
    const review = await Review.find({user: user._id})

    res.json(review)
}

module.exports = {
    review_show,
    review_get,
    review_post,
    review_edit,
    review_delete,
    review_user
}
