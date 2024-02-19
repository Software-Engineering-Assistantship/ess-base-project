const  mongoose = require('mongoose')
const Schema = mongoose.Schema

const ListSchema = new Schema({
    name:{
        type: String,
        required: true
    },

    description:{
        type: String,
        default: ""
    },

    // Usuários são puxados de outro schema
    // author:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    // },
    // author:{
    //     type: String,
    // },


    // Itens da lista são puxados de outro schema
    restaurants: [{
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    }]

})


const ListModel = mongoose.model("listCollection", ListSchema)
module.exports = ListModel