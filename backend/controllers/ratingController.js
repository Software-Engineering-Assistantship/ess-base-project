const Rating = require("../models/Rating")

//give a rating
const rating_post = async (req, res) => {
    const rating = new Rating({...req.body})

    rating.save()

    res.json(rating)
}

//avg of ratings
const rating_avg = async (req, res) => {

    const average = await Rating.aggregate([{$match: {restaurant: req.params.id}}, {$avg: "$rating"}]);

    res.json(average)
}

const rating_get = async (req, res) => {

    const rating = await Rating.findById(req.params.id)

    if (!rating) {
        return res.status(404).json({ error: 'Nota não encontrada' })
    }
    else{
        res.json(rating)
    }
}

module.exports = {
    rating_post,
    rating_avg,
    rating_get
}

