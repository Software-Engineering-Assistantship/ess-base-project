const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Referência ao modelo de usuário
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User', // Referência ao modelo de usuário
        required: true
    },
    attachedImg: {
        type: String,
        required: false
    },
    comments: [CommentSchema], // Subdocumento para armazenar os comentários
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Forum = mongoose.model('Forum', PostSchema);

module.exports = Forum;
