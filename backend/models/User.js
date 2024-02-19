const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true,
    },

    newPassword: {
        type: String,
        required: false
    },

    bio: {
        type: String,
        required: false
    },

    profileImage:{
        type: String
    },

    coverImage:{
        type: String
    }
    
})

const User = mongoose.model("User", UserSchema)

module.exports = User