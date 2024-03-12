const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ReviewSchema = new Schema({
    title: {
        type: String,
        required: true
    },
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
    text: {
        type: String,
        required: true
    },
    sabor: {
        type: Number,
        required: false
    },
    atendimento: {
        type: Number,
        required: false
    },
    tempoDeEspera: {
        type: Number,
        required: false
    },
    preco: {
        type: Number,
        required: false
    },
    created: { type: Date, default: Date.now },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
})

const Review = mongoose.model("Review", ReviewSchema)

module.exports = Review
