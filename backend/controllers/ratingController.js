const Rating = require("../models/Rating")

//give a rating
const rating_post = async (req, res) => {
    const rating = new Rating({...req.body})

    rating.save()

    res.json(rating)
}

//avg of ratings
const rating_avg = async (req, res) => {

    const average = await Rating.aggregate([{"$match": { "restaurant": req.params.idrest } },
    {
        $group:
           {
             _id: null,
             averageRating: { $avg: "$rating" }
           }
      }]);

    res.json(average)
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
    rating_list
}

