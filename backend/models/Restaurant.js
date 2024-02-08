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
        type: String
    },
    timestamp: {
        type: String,
        default: Date.now()
    }
})

const Restaurant = mongoose.model("Restaurant", RestaurantSchema)

module.exports = Restaurant