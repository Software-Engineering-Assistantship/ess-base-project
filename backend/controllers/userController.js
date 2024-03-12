const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')

const secret = "gjnhawrgohuqwjkrfnb1o3i4y1230984u35nkrwfvdfgbrty"


const user_signup = async (req, res) => {
    //req.body = JSON.parse(JSON.stringify(req.body))
    let { name, email, password } = req.body;
    
    name = name.trim();
    email = email.trim();
    password = password.trim();

    
    if (name == "" || email == "" || password == "") {
        return res.status(400).json({
            status: "FAILURE",
            message: "Empty input fields"
        });
    }

    if (!/^[a-zA-Z]*$/.test(name)) {
        return res.status(400).json({
            status: "FAILURE",
            message: "Invalid name"
        });
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return res.status(400).json({
            status: "FAILURE",
            message: "Invalid email"
        });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?]).{8,}$/;
            if (!passwordRegex.test(password)) {
                return res.status(400).json({ error: 'A senha deve conter no mínimo 1 caracter maiúsculo, 1 caracter minúsculo, 1 simbolo especial e tamanho de pelo menos 8.' });
            }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({
                status: "FAILURE",
                message: "User with this email already exists"
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });
        await newUser.save();
         
        return res.json({
            status: "SUCCESS",
            message: "Registration successful",
            data: newUser
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "FAILURE",
            message: "Internal server error"
        });
    }
};

const user_signin = async (req, res) => {
    let { email, password } = req.body;
    email = email.trim();
    password = password.trim();

    if (email == "" || password == "") {
        return res.status(400).json({
            status: "FAILURE",
            message: "Empty credentials supplied"
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                status: "FAILURE",
                message: "Invalid credentials"
            });
        }

        const hashedPassword = user.password;
        const match = await bcrypt.compare(password, hashedPassword);

        if (match) {
            const token = jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });

            return res.json({
                status: "SUCCESS",
                message: "Signin successful",
                token:token,
                data: user
            });
        } else {
            return res.status(401).json({
                status: "FAILURE",
                message: "Invalid password"
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "FAILURE",
            message: "Internal server error"
        });
    }
};


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
    let user = await User.findById(req.params.id);

    if(!user){
        return res.status(404).json({ error: 'Usuário não encontrado' })
    }
    else{

        req.body = JSON.parse(JSON.stringify(req.body))

        let profileImage = user.profileImage
        let coverImage = user.coverImage

        console.log(req.body)

        if(req.files.file1 !== undefined){
            const file1 = req.files.file1[0];
            profileImage = file1.destination + file1.filename
        }

        if(req.files.file2 !== undefined){
            const file2 = req.files.file2[0]; 
            coverImage = file2.destination + file2.filename
        }

        // se achou o usuário
        //atualiza nome, bio, imagem e capa (se houver para troca)
        user = await User.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, bio: req.body.bio, profileImage, coverImage }, 
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
                    {$pull : {following: deletedUser.id}}, 
                    {new: true}
                )

            }
        }

        //for each user followed: pull user_page.id from the followers list
        if (deletedUser.following.length !== 0){
            for (const followed_id of deletedUser.following){
                let user_followed = await User.findByIdAndUpdate(
                    {_id: followed_id}, 
                    {$pull : {followers: deletedUser.id}}, 
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

module.exports = {
  
  user_signup,
  user_signin,
  deleteUser, 
  getAll, 
  getUser, 
  updateUser, 
  updatePassword
  
};

