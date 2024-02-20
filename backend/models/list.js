const  mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListSchema = new Schema({
    name:{
        type: String,
        required: true
    },

    description:{
        type: String,
    },

    author:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },

    numberOfRestaurants:{
        type: Number,
        default: 0
    },

    restaurants: [RestaurantSchema]

})

ListSchema.pre('save', function(next)){
    this.numberOfRestaurants = this.restaurants.length;
    next();
}


const List = mongoose.model("List", ListSchema)
module.exports = List