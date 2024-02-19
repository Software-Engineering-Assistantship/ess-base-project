const User = require("../models/User")
const bcrypt = require('bcrypt');

const getAll = async (req, res) => {
    const users = await User.find()

    if(users.length === 0){
        return res.status(404).json({ error: 'Ainda não há usuário cadastrados' })
    }

    res.json(users)
}

getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' })
    }
    else{
        res.json(user)
    }
}

const user_signup = async (req, res) => {
    let { name, email, password } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();

    // Validação dos campos de entrada
    if (name == "" || email == "" || password == "") {
        return res.json({
            status: "FAILURE",
            message: "Empty input fields"
        });
    }

    if (!/^[a-zA-Z]*$/.test(name)) {
        return res.json({
            status: "FAILURE",
            message: "Invalid name"
        });
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return res.json({
            status: "FAILURE",
            message: "Invalid email"
        });
    }

    if (password.length < 8) {
        return res.json({
            status: "FAILURE",
            message: "Password too short"
        });
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
        return res.json({
            status: "FAILURE",
            message: "Empty credentials supplied"
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                status: "FAILURE",
                message: "Invalid credentials"
            });
        }

        const hashedPassword = user.password;
        const match = await bcrypt.compare(password, hashedPassword);

        if (match) {
            return res.json({
                status: "SUCCESS",
                message: "Signin successful",
                data: user
            });
        } else {
            return res.json({
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
    const deletedUser = await User.findByIdAndDelete(req.params.id)

    if(!deletedUser){
        return res.status(404).json({ error: 'Usuário não encontrado' })
    }
    else{
        res.json({
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

module.exports = {user_signup, user_signin, deleteUser, getAll, getUser, updateUser, updatePassword};