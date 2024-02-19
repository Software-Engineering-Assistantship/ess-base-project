const User = require("../models/User")
const bcrypt = require('bcrypt');

const getAll = async (req, res) => {
    const users = await User.find()

    if(users.length === 0){
        return res.status(404).json({ error: 'Ainda não há usuário cadastrados' })
    }

    res.json(users)
}

const getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' })
    }
    else{
        res.json(user)
    }
}

const updateUser = async (req, res) => {
    let user = await User.findById(req.params.id, req.body);

    if(!user){
        return res.status(404).json({ error: 'Usuário não encontrado' })
    }
    else{
        // se achou o usuário
        //atualiza nome, bio, imagem e capa (se houver para troca)
        user = await User.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, bio: req.body.bio, profileImage:req.body.profileImage, coverImage:req.body.coverImage }, 
            { new: true }
        );
    }        

    // retorna os dados visíveis do usuário
    return res.json({
        name:user.name,
        bio:user.bio,
        profileImage:user.profileImage,
        coverImage:user.coverImage
    })
}

const deleteUser = async (req, res) =>{
    const deletedUser = await User.findById(req.params.id)

    if(!deletedUser){
        return res.status(404).json({ error: 'Usuário não encontrado' })
    }else{

        //if the user being deleted and has followers
        if (deletedUser.followers.length !== 0){

            //for each follower: pull user_page.id from the following list
            for (const following_id of deletedUser.followers){
                let user_following = await User.findByIdAndUpdate(
                    {_id: following_id}, 
                    {$pull : {following: deletedUser._id}}, 
                    {new: true}
                )

            }
        }

        //for each user followed: pull user_page.id from the followers list
        if (deletedUser.following.length !== 0){
            for (const followed_id of deletedUser.following){
                let user_followed = await User.findByIdAndUpdate(
                    {_id: followed_id}, 
                    {$pull : {followers: deletedUser._id}}, 
                    {new: true}
                )

            }
        }

        const user_deleted = await User.findByIdAndDelete(req.params.id)

        return res.status(200).json({
            name:deletedUser.name,
            bio:deletedUser.bio,
            profileImage:deletedUser.profileImage,
            coverImage:deletedUser.coverImage
        });
    }
}

const updatePassword = async (req, res) => {
    let user = await User.findById(req.params.id);

    if(user){
        //se a senha existir no body corretamente
        if(req.body.password && req.body.newPassword){

            const match = await bcrypt.compare(req.body.password, user.password);

            //caso a senha seja diferente da atual
            if(!match){
                return res.status(400).json({ error: 'Senha atual incorreta.' });
            }

            //quando a tentativa de troca é para a mesma senha
            if(req.body.password === req.body.newPassword){
                return res.status(400).json({ error: 'A nova senha deve ser diferente da senha atual.' });
            }

            //regex para que a senha tenha requisitos mínimos
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?]).{8,}$/;
            if (!passwordRegex.test(req.body.newPassword)) {
                return res.status(404).json({ error: 'A senha deve conter no mínimo 1 caracter maiúsculo, 1 caracter minúsculo, 1 simbolo especial e tamanho de pelo menos 8.' });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(req.body.newPassword, saltRounds);

            //atualiza a senha
            user = await User.findByIdAndUpdate(
                req.params.id,
                { password: hashedPassword},
                { new: true }
            );
            
            res.json({
                message: 'Senha alterada com sucesso!'
            });
        }
    }
    else{
        return res.status(404).json({ error: 'Usuário não encontrado' })
    }
}

module.exports = {deleteUser, getAll, getUser, updateUser, updatePassword};