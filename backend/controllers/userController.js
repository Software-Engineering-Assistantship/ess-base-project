const bcrypt = require('bcrypt');
const User = require('../models/user'); 

const user_signup = async (req, res) => {
    let { name, email, password } = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();

    
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

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>?]).{8,}$/;
            if (!passwordRegex.test(password)) {
                return res.status(404).json({ error: 'A senha deve conter no mínimo 1 caracter maiúsculo, 1 caracter minúsculo, 1 simbolo especial e tamanho de pelo menos 8.' });
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

module.exports = {
    user_signup,
    user_signin
};
