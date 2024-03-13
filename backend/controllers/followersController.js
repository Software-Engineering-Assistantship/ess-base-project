const User = require("../models/User")
const sendEmail = require("../utils/sendEmail")
const getUser = require("./userController")

//list of followers
const user_followers_get = async (req, res) => {

    //gets the user ID from parameters
    const user_page = await User.findById(req.params.id)
    
    //if there's no user with the ID 
    if(!user_page){
        return res.status(404).json({ error: 'Usuário não encontrado'})

    //if there is a user with the ID from the parameters
    } else{
        
        //if there is no followers, return status:404 and an empty JSON
        if (!user_page.followers.length){
            return res.status(404).json(null)
        
        //if there is at least one follower, return status:200 and the list
        } else {
            
            let list_followers = []

            for (const follower_id of user_page.followers){
                let user = await User.findById(follower_id)

                list_followers.push(user)

            }

            return res.status(200).json(list_followers)
        }
    }

}

//list of users a given user follows
const user_following_get = async (req, res) => {

    //gets the user ID from parameters (page of the user)
    const user_page = await User.findById(req.params.id)

    //no user with the ID from the parameters
    if(!user_page){
        return res.status(404).json({ error: 'Usuário não encontrado'})

    } else{ 

        //if the user follows no one: return status:404 and an empty JSON 
        if (!user_page.following.length){
            return res.status(404).json(null)
        
        //if there's at least one user followed, return a sucess status and the list
        } else {
            let list_following = []

            for (const followed_id of user_page.following){
                let user = await User.findById(followed_id)

                list_following.push(user)

            }

            return res.status(200).json(list_following)
        }
    }

}

//user logged in (body) follows another user (parameter)
const user_follow = async (req, res) => {
    
    //user that will be followed 
    //ID in the parameters
    const user_page = await User.findById(req.params.idp)

    if(!user_page){
        return res.status(404).json({ error: 'Usuário não encontrado'})

    } else{
        //user following
        //ID in body
        const user_log = await User.findById(req.params.idl) 

        try{
            
            //if user_page is not followed by user_log
            if (!user_page.followers.includes(user_log.id)){

                //update user_page's followers list 
                //push user_log's id to the list
                let user_followed = await User.findByIdAndUpdate(
                    {_id: user_page._id}, 
                    {$push : {followers: user_log.id}}, 
                    {new: true}
                )
                
                //update user_log's following list 
                //push user_page's id to the list
                let user_following = await User.findByIdAndUpdate(
                    {_id: user_log._id}, 
                    {$push: {following: user_page.id}},
                    {new: true}        
                ) 

                //send email to the followed user
                //notification about a new follower and the follower's page link
                try{
                    const send_to = user_followed.email
                    const subject = "Você tem um novo seguidor!"
                    const message = `
                        <h3> Olá, ${user_followed.name}</h3>
                        <p> Você tem um novo seguidor: ${user_following.name}</p>
                        <a href="http://localhost:3001/users/${user_following.id}" target="_blank" title = "Visitar página de ${user_following.name}"> Página de ${user_following.name}</a>
                    `

                    //from ../utils/sendEmail
                    const status_email = await sendEmail(subject, message, send_to)

                    //return status:200 and JSON with followed.id + followers and follower.id + following
                    return res.status(200).json({
                        followed: {"id": user_followed.id,
                         "followers": user_followed.followers},

                        follower: {"id": user_following.id, 
                         "following": user_following.following}, 

                        status_email: status_email})
                    
                } catch (error_email) {


                    return res.status(200).json({
                        followed: {"id": user_followed.id,
                         "followers": user_followed.followers},

                        follower: {"id": user_following.id, 
                         "following": user_following.following},

                        status_email:"error"})
                }

            //if user_log already follows user_page
            } else {
                //return status:409 conflict and JSON with followed.id + followers and follower.id + following
                return res.status(409).json({ error: "usuário já segue",

                    status_email: "error"})
        
            }

        } catch (e) {

            return res.status(500).error({ error: "Erro ao seguir"})
        }
    }

}

//user logged in (body) unfollows another user (parameter)
const user_unfollow = async (req, res) => {
    
    //user that will be unfollowed 
    //ID in the parameters
    const user_page = await User.findById(req.params.idp)
    
    if(!user_page){
        return res.status(404).json({ error: 'Usuário não encontrado'})

    } else{

        //user unfollowing
        //ID in body
        const user_log = await User.findById(req.params.idl) 
        
        try{
            
            //if user_page is followed by user_log
            if (user_page.followers.includes(user_log.id)){

                //update user_page's followers list 
                //pull user_log's id from the list
                let user_unfollowed = await User.findByIdAndUpdate(
                    {_id: user_page._id}, 
                    {$pull : {followers: user_log.id}}, 
                    {new: true}
                )
                
                //update user_log's following list 
                //pull user_page's id from the list
                let user_unfollowing = await User.findByIdAndUpdate(
                    {_id: user_log._id}, 
                    {$pull: {following: user_page.id}},
                    {new: true}        
                ) 
                
                //return status:200 and JSON with unfollowed.id + follower and unfollowing.id + following
                return res.status(200).json({
                    unfollowed: {"id": user_unfollowed.id,
                     "followers": user_unfollowed.followers},

                    unfollower: {"id": user_unfollowing.id, 
                     "following": user_unfollowing.following}})

            //if user_log does not follow user_page
            } else {
                
                //return status:409 conflict and JSON with unfollowed.id + follower and unfollowing.id + following
                return res.status(409).json({
                    unfollowed: {"id": user_page.id,
                     "followers": user_page.followers},
                     
                    unfollower: {"id": user_log.id, 
                     "following": user_log.following}})      
            }

        } catch (e) {

            return res.status(500).send({ error : "Erro ao deixar de seguir"})
        }
    }
}


module.exports = {
    
    user_followers_get,
    user_following_get,
    user_follow,
    user_unfollow
}
