const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    reviews: [{
        type: Schema.Types.ObjectId, 
        ref:"Review"
    }]
})

const User = mongoose.model("User", UserSchema)

module.exports = User