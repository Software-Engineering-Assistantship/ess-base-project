const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    following:{
        type: Array
    },

    followers: {
        type: Array
    }
})

const User = mongoose.model("User", UserSchema)

module.exports = User