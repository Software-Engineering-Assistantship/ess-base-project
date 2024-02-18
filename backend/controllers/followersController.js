const User = require("../models/User")

const users_get = async (req, res) => {
    const users = await User.find()

    if (users.length === 0) {
        return res.status(404).json({ error: 'Ainda não há usuários cadastrados' })
    }else{
        res.json(users)
    }

}

const user_create = async (req, res) => {

    const userExist = await User.find({'name' : req.body.name})

    if(userExist.length) {
        res.json({ error: 'Usuário já cadastrado' })
    } else {
        const user = new User(req.body)

        user.save()

        return res.status(200).json(user)
    }
}

const user_delete = async (req, res) => {
    let user_page = await User.findById(req.params.id)

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

    res.json(user_page)
}

const user_profile_get = async (req, res) => {

    const user_page = await User.findById(req.body)

    if(!user_page){
        return res.status(404).json({ error: 'Usuário não encontrado'})
    } else{
        return res.json(user_page)
    }

}

const user_followers_get = async (req, res) => {

    const user_page = await User.findById(req.params.id)

    const list_followers = user_page.followers

    if (!list_followers.length){
        return res.status(404).json({ error: 'Usuário não possui seguidores'})
    } else {
        return res.status(200).json(list_followers)
    }

}

const user_following_get = async (req, res) => {
    const user_page = await User.findById(req.params.id)

    const list_following = user_page.following

    if (!list_following.length){
        return res.status(404).json({ error: 'Usuário não está seguindo outros usuários'})
    } else {
        return res.status(200).json(list_following)
    }

}

const user_follow = async (req, res) => {
    
    const user_page = await User.findById(req.params.id)

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

            return res.status(200).json({user_followed, user_following})
        } else {

            return res.status(409).send({ error : "Você já segue " + user_page.name})
    
        }

    } catch (e) {

        return res.status(500).send({ message: "Erro ao seguir " + user_page.name})
    }

}

const user_unfollow = async (req, res) => {
    
    const user_page = await User.findById(req.params.id)

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

            return res.status(200).json({user_unfollowed, user_unfollowing})
        } else {
            
            return res.status(409).send({ error : "Você não segue " + user_page.name})
    
        }

    } catch (e) {

        return res.status(500).send({ message: "Erro ao deixar de seguir " + user_page.name})
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
