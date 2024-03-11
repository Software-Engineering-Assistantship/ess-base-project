const Review = require("../models/Review")
const Restaurant = require("../models/Restaurant")
const User = require("../models/User")
const Rating = require("../models/Rating")

//show all registered reviews from a given restaurant
const review_show = async (req, res) => {
    const reviews = await Review.find({restaurant: req.params.idrest})

    if (reviews.length === 0) {
        return res.status(404).json({ error: 'Ainda não há reviews para este restaurante' })
    } else {
        res.json(reviews)
    }
}

//show the page of a given review
const review_get = async (req, res) => {
    const review = await Review.findOne({user: req.params.iduser, restaurant: req.params.idrest});
    

    if (!review) {
        return res.status(404).json({ error: 'Review não encontrado' })
    }
    else{
        res.json(review)
    }

}

//create a new review
const review_post = async (req, res) => {
    let existReview = await Review.findOne({user: req.params.iduser, restaurant: req.params.idrest})

    if (existReview) {
        return res.status(400).json({ error: 'Review já existente' })
    }


    let rating = await Rating.findOne({user: req.params.iduser, restaurant: req.params.idrest})
    const review = new Review({...req.body})

    if (rating) {
        if (review.rating != null) {
            if(req.body.rating != rating.rating) {
                rating.set('rating', req.body.rating)
                rating.save()
        } else {
            review.set('rating', rating.rating);
            }
        }
    } else {
        const newRating = new Rating({user: req.body.user, restaurant: req.body.restaurant, rating: req.body.rating});
        newRating.save()
    }

    review.save()
    
    res.json(review)
}

/*
//show the page of the creation of a review
const review_post_page = async (req, res) => {
    let restaurant = await Restaurant.findById(req.params.idrest)

    res.render('create', title = restaurant.name)
}

//show the page of the edit of a review
const review_edit_page = async (req, res) => {
    let restaurant = await Restaurant.findById(req.params.idrest)

    res.render('edit', title = restaurant.name)
}
*/

//Edit a review with the given id
const review_edit = async (req, res) => {
    let review = await Review.findOne({user: req.params.iduser, restaurant: req.params.idrest})
    let rating = await Rating.findOne({user: req.params.iduser, restaurant: req.params.idrest})

    if (!review) {
        return res.status(404).json({ error: 'Review não encontrado' })
    }

    rating.set('rating', req.body.rating)

    review.set(req.body);

    rating.save()

    review.save()

    res.json(review)
}

// delete a review with the given id
const review_delete = async (req, res) => {
    
    let review = await Review.findOneAndDelete({user: req.params.iduser, restaurant: req.params.idrest})
    let rating = await Rating.findOneAndDelete({user: req.params.iduser, restaurant: req.params.idrest})


    if (!review) {
        return res.status(404).json({ error: 'Review não encontrado' })
    }

    res.json(review)

}

// show the review from a given user
const review_user = async (req, res) => {
    const reviews = await Review.find({restaurant: req.params.iduser})

    if (reviews.length === 0) {
        return res.status(404).json({ error: 'Ainda não há reviews para este usuário' })
    } else {
        res.json(reviews)
    }
}

// show all registered reviews
const registered_reviews = async (req, res) => {
    const reviews = await Review.find()

    if (reviews.length === 0) {
        return res.status(404).json({ error: 'Ainda não há reviews cadastradas' })
    }
    else {
        res.json(reviews)
    }
}

module.exports = {
    review_show,
    review_get,
    review_post,
    review_edit,
    review_delete,
    review_user,
    registered_reviews
}
