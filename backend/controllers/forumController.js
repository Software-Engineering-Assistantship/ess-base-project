const Forum = require("../models/Forum")

const forumPosts_get = async (req, res) => {
    const forumPosts = await Forum.find()

    if (forumPosts.length === 0) {
        return res.status(404).json({ error: 'Ainda não há posts no fórum.' })
    }else{
        res.json(forumPosts)
    }
}

const forumComments_get = async (req, res) => {
    const forumComments = await Forum.find()

    if (forumComments.length === 0) {
        return res.status(404).json({ error: 'Ainda não há comentários no post.' })
    }else{
        res.json(forumComments)
    }
}

const singleForumPost_get  = async (req, res) => {
    const forumPost = await Forum.findById(req.params.id)
    if (!forumPost) {
        return res.status(404).json({ error: 'Post não encontrado.' })
    }
    else{
        res.json(forumPost)
    }
}

const forumPost_create = async (req, res) => {
    const expectedProperties = ['title', 'content', 'author'];

    // checa se todas as propriedades obrigatórias estão presentes
    const areAllPropertiesPresent = expectedProperties.every(prop => req.body.hasOwnProperty(prop));

    if (!areAllPropertiesPresent) {
        return res.status(400).json({ error: 'Dados obrigatórios estão incompletos na solicitação.' });
    }

    const imagePath = req.file ? req.file.path : null;
    const {title, content, author} = req.body

    const forumPost = await Forum.create({
        title, 
        content, 
        author,
        attachedImg: imagePath
    })

    res.json(forumPost)
}

const forumComment_create = async (req, res) => {
    const expectedProperties = ['content', 'author'];

    // checa se todas as propriedades obrigatórias estão presentes
    const areAllPropertiesPresent = expectedProperties.every(prop => req.body.hasOwnProperty(prop));

    if (!areAllPropertiesPresent) {
        return res.status(400).json({ error: 'Dados obrigatórios estão incompletos na solicitação.' });
    }

    const { content, author } = req.body;

    try {
        const forumPost = await Forum.findById(req.params.postId);

        if (!forumPost) {
            return res.status(404).json({ error: 'Post não encontrado.' });
        }

        // Adiciona um novo comentário ao array de comentários no post do fórum
        forumPost.comments.push({
            content,
            author
        });

        // Salva as alterações no post do fórum
        await forumPost.save();

        res.json(forumPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};


const forumPost_edit = async (req, res) => {
    let forumPost = await Forum.findById(req.params.id, req.body)

    if (!forumPost) {
        return res.status(404).json({ error: 'Post não encontrado.' })
    } 

    forumPost.set(req.body)
    res.json(forumPost)
}

const forumComment_edit = async (req, res) => {
    const expectedProperties = ['content'];

    // Checa se todas as propriedades obrigatórias estão presentes
    const areAllPropertiesPresent = expectedProperties.every(prop => req.body.hasOwnProperty(prop));

    if (!areAllPropertiesPresent) {
        return res.status(400).json({ error: 'Dados obrigatórios estão incompletos na solicitação.' });
    }

    const { content } = req.body;

    try {
        const forumPost = await Forum.findById(req.params.postId);

        if (!forumPost) {
            return res.status(404).json({ error: 'Post não encontrado.' });
        }

        const commentIndex = forumPost.comments.findIndex(comment => comment._id.toString() === req.params.commentId);

        if (commentIndex === -1) {
            return res.status(404).json({ error: 'Comentário não encontrado.' });
        }

        // Atualiza o conteúdo do comentário
        forumPost.comments[commentIndex].content = content;

        // Salva as alterações no post do fórum
        await forumPost.save();

        res.json(forumPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};



const forumPost_delete = async (req, res) => {
    const forumPost = await Forum.findByIdAndDelete(req.params.id)

    if (!forumPost) {
        return res.status(404).json({ error: 'Restaurante não encontrado' })
    }else{
        res.json(forumPost)
    }
}

const forumComment_delete = async (req, res) => {
    try {
        const forumPost = await Forum.findById(req.params.postId);

        if (!forumPost) {
            return res.status(404).json({ error: 'Post não encontrado.' });
        }

        const commentIndex = forumPost.comments.findIndex(comment => comment._id.toString() === req.params.commentId);

        if (commentIndex === -1) {
            return res.status(404).json({ error: 'Comentário não encontrado.' });
        }

        // Remove o comentário do array de comentários
        forumPost.comments.splice(commentIndex, 1);

        // Salva as alterações no post do fórum
        await forumPost.save();

        res.json(forumPost);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
};


module.exports = {
    forumPosts_get,
    forumComments_get,
    singleForumPost_get,
    forumPost_create,
    forumComment_create,
    forumPost_edit,
    forumComment_edit,
    forumPost_delete,
    forumComment_delete
}