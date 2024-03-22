const Review = require("../models/Review")
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

    const review = await Review.create(req.body)

    if (rating) {
        review.set('rating', rating.rating);
    } else {
        const newRating = await Rating.create({user: req.body.user, restaurant: req.body.restaurant, rating: req.body.rating})
    }
    res.json(review)
}

//Edit a review with the given id
const review_edit = async (req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body))
    
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

module.exports = {
    review_show,
    review_get,
    review_post,
    review_edit,
    review_delete,
    review_user
}
