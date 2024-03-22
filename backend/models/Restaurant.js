const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        city: {
            type: String,
            required: true
        },
        neighborhood: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        number: {
            type: String,
            required: true
        }
    },
    typeOfFood: {
        type: String,
        required: true
    },
    site: {
        type: String,
        required: false
    },
    timestamp: {
        type: String,
        default: Date.now()
    },
    profileImage:  {
        type: String,
        required: false
    },
    coverImage:  {
        type: String,
        required: false
    }
})

const Restaurant = mongoose.model("Restaurant", RestaurantSchema)

module.exports = Restaurant