const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RatingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, 
        ref:"User",
        required: true
    },
    restaurant: {
        type: Schema.Types.ObjectId, 
        ref:"Restaurant",
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
})

const Rating = mongoose.model("Rating", RatingSchema)

module.exports = Rating