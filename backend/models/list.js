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
        type: String,
    },

    restaurants:{
        type: [{type: Schema.Types.ObjectId, ref:"Restaurant"}],
        required: true
    }

})


const List = mongoose.model("List", ListSchema)
module.exports = List
