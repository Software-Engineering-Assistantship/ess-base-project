const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RestaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        default: Date.now()
    }
})

const Restaurant = mongoose.model("Restaurant", RestaurantSchema)

module.exports = Restaurant