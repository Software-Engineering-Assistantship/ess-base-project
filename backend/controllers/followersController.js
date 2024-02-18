const User = require("../models/User")
const sendEmail = require("../utils/sendEmail")

const users_get = async (req, res) => {
    const users = await User.find()

    if (users.length === 0) {
        return res.status(404).json({ error: 'Ainda não há usuários cadastrados' })
    }else{
        res.json(users)
    }

}

const user_create = async (req, res) => {

    const user_page = await User.find({'name' : req.body.name})

    if(user_page.length) {
        res.status(409).json({ error: 'Usuário já cadastrado', data: user_page})
    } else {
        const user = new User(req.body)

        user.save()

        return res.status(200).json(user)
    }
}

const user_delete = async (req, res) => {
    let user_page = await User.findById(req.params.id)

    if(!user_page){
        return res.status(404).json({ error: 'Usuário não encontrado'})
    } else {
        if (user_page.followers.length !== 0){
            for (const following_id of user_page.followers){
                let user_following = await User.findByIdAndUpdate(
                    {_id: following_id}, 
                    {$pull : {following: user_page._id}}, 
                    {new: true}
                )

            }
        }

        if (user_page.following.length !== 0){
            for (const followed_id of user_page.following){
                let user_followed = await User.findByIdAndUpdate(
                    {_id: followed_id}, 
                    {$pull : {following: user_page._id}}, 
                    {new: true}
                )

            }
        }

        user_page = await User.findByIdAndDelete(req.params.id)

        return res.status(200).json({message: 'Usuário deletado com sucesso'})
    }
}

const user_profile_get = async (req, res) => {

    const user_page = await User.findById(req.body)

    if(!user_page){
        return res.status(404).json({ error: 'Usuário não encontrado'})
    } else{
        return res.status(200).json(user_page)
    }

}

const user_followers_get = async (req, res) => {

    const user_page = await User.findById(req.params.id)
    
    if(!user_page){
        return res.status(404).json({ error: 'Usuário não encontrado'})

    } else{
        const list_followers = user_page.followers

        if (!list_followers.length){
            return res.status(404).json({ error: 'Usuário não possui seguidores', data: user_page})
        } else {
            return res.status(200).json(list_followers)
        }
    }

}

const user_following_get = async (req, res) => {
    const user_page = await User.findById(req.params.id)

    if(!user_page){
        return res.status(404).json({ error: 'Usuário não encontrado'})

    } else{
        const list_following = user_page.following

        if (!list_following.length){
            return res.status(404).json({ error: 'Usuário não está seguindo outros usuários', data: user_page})
        } else {
            return res.status(200).json(list_following)
        }
    }

}

const user_follow = async (req, res) => {
    
    const user_page = await User.findById(req.params.id)

    if(!user_page){
        return res.status(404).json({ error: 'Usuário não encontrado'})

    } else{
        const user_log = await User.findById(req.body) 

        try{
            
            if (!user_page.followers.includes(user_log.id)){
                let user_followed = await User.findByIdAndUpdate(
                    {_id: user_page._id}, 
                    {$push : {followers: user_log.id}}, 
                    {new: true}
                )

                let user_following = await User.findByIdAndUpdate(
                    {_id: user_log._id}, 
                    {$push: {following: user_page.id}},
                    {new: true}        
                ) 

                try{
                    const send_to = user_followed.email
                    const subject = "Você tem um novo seguidor!"
                    const message = `
                        <h3> Olá, ${user_followed.name}</h3>
                        <p> Você tem um novo seguidor: ${user_following.name}</p>
                        <a href="http://localhost:3001/users/${user_following.id}" target="_blank" title = "Visitar página de ${user_following.name}"> Página de ${user_following.name}</a>
                    `
                    await sendEmail(subject, message, send_to)

                    return res.status(200).json({mensagem: "Usuário seguido com sucesso. Mensagem enviada com sucesso.", data: {user_following, user_followed}})
                    
                } catch (error_email) {

                    return res.status(200).json({mensagem: "Usuário seguido com sucesso. Error ao enviar mensagem.", data: {user_following, user_followed}})
                }

            } else {

                return res.status(409).send({ error : "Usuário já segue " + user_page.name, data: {user_log, user_page}})
        
            }

        } catch (e) {

            return res.status(500).send({ message: "Erro ao seguir " + user_page.name, data: {user_log, user_page}})
        }
    }

}

const user_unfollow = async (req, res) => {
    
    const user_page = await User.findById(req.params.id)

    if(!user_page){
        return res.status(404).json({ error: 'Usuário não encontrado'})

    } else{
        const user_log = await User.findById(req.body) 

        try{
            
            if (user_page.followers.includes(user_log.id)){
                let user_unfollowed = await User.findByIdAndUpdate(
                    {_id: user_page._id}, 
                    {$pull : {followers: user_log.id}}, 
                    {new: true}
                )

                let user_unfollowing = await User.findByIdAndUpdate(
                    {_id: user_log._id}, 
                    {$pull: {following: user_page.id}},
                    {new: true}        
                ) 

                return res.status(200).json({ mensagem: "Deixou de seguir usuário com sucesso", data: {user_unfollowing, user_unfollowed}})
            } else {
                
                return res.status(409).send({ error : "Usuário não segue " + user_page.name, data: {user_log, user_page}})
        
            }

        } catch (e) {

            return res.status(500).send({ message: "Erro ao deixar de seguir " + user_page.name, data: {user_log, user_page}})
        }
    }
}


module.exports = {

    users_get,
    user_create,
    user_delete,
    user_profile_get,
    user_followers_get,
    user_following_get,
    user_follow,
    user_unfollow
}
