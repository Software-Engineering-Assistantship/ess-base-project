const Rating = require("../models/Rating")
const Review = require("../models/Review")

//give a rating
const rating_post = async (req, res) => {

    const rating = Rating.create(req.body)

    res.json(rating)
}

const rating_edit = async (req, res) => {
    req.body = JSON.parse(JSON.stringify(req.body))
    
    let rating = await Rating.findOne({user: req.params.iduser, restaurant: req.params.idrest})
    let review = await Review.findOne({user: req.params.iduser, restaurant: req.params.idrest})

    if (!rating) {
        return res.status(404).json({ error: 'Nota não encontrada' })
    }

    if (review) {
        review.set('rating', req.body.rating)
        review.save()
    }

    rating.set('rating', req.body.rating)
    rating.save()
    

    res.json(rating)
}

//avg of ratings
const rating_avg = async (req, res) => {

    const averages = await Rating.aggregate([{$group: {_id: "$restaurant", avg_rating: {$avg: "$rating"}}}]);


    //testar o parse aqui

    for(avg of averages) {
        if (avg._id == req.params.idrest) {
            const average = avg.avg_rating
            res.json(average)
            break;
        }
    }
}

const rating_get = async (req, res) => {

    const rating = await Rating.findOne({user: req.params.iduser, restaurant: req.params.idrest})

    if (!rating) {
        return res.status(404).json({ error: 'Nota não encontrada' })
    }
    else{
        res.json(rating)
    }
}

const rating_list = async (req, res) => {

    const rating = await Rating.find({restaurant: req.params.idrest})

    if (!rating) {
        return res.status(404).json({ error: 'Não existem notas cadastradas para este restaurante' })
    }
    else{
        res.json(rating)
    }
}

module.exports = {
    rating_post,
    rating_avg,
    rating_get,
    rating_list,
    rating_edit
}

