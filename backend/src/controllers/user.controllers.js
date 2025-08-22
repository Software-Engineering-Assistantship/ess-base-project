import fs from 'fs'
import path from 'path'
import bcrypt from 'bcryptjs'

export const getAll = (req, res) => {
    try {

        const data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf-8'))

        if (!data || data.length === 0) {
            console.log("Empty users")
            return res.status(200).json({})
        }

        const filterData = data.map(user => ({
            fullName: user.fullName,
            username: user.username,
            birth_date: user.birth_date,
            gender: user.gender,
            photo: user.photo,
        }))

        res.status(200).json(filterData)

    } catch (error) {
        console.log("Error in getAll:", error.message)
        res.status(500).json({ 
            error: "Internal Server Error" 
        })
    }
}

export const getUserById = (req, res) => {
    try {

        const users = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf-8'))
        const user = users.find(element => String(element.id) == String(req.params.userId))
        
        // USER NOT REGISTERED
        if (!user){
            console.log("User not found")
            return res.status(404).json({
                error: "User not found"
            })
        }

        res.status(200).json({
            fullName: user.fullName,
            username: user.username,
            birth_date: user.birth_date,
            gender: user.gender,
            photo: user.photo
        }) 

    } catch (error) {
        console.log("Error in getUserById:", error.message)
        res.status(500).json({ 
            error: "Internal Server Error" 
        })
    }
}

export const updateUser = async (req, res) => {
    try {

        let data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf-8'))

        const userIndex = data.findIndex(element => String(element.id) == String(req.params.userId))        
        // USER NOT REGISTERED
        if (userIndex === -1){
            console.log("User not found")
            return res.status(404).json({
                error: "User not found"
            })
        }

        const user = data[userIndex];

        // CHECK IF PASSWORD IS CORRECT
        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)

        if (!data || !isPasswordCorrect) {
            console.log("Incorrect password")  
            return res.status(401).json({
                error: "Incorrect password"
            })
        }

        // NEW USER IS ALREADY REGISTERED
        const isUsernameTaken = data.some(user =>
            user.username === req.body.username && String(user.id) !== String(req.params.userId)
        );

        if (isUsernameTaken){
            console.log("Username already used")
            return res.status(409).json({
                error: "Username already used"
            })
        }

        // NEW PASSWORD
        let updatedPassword = user.password
        if (req.body.newPassword){
            // HASH PASSWORD HERE
            const salt = await bcrypt.genSalt(10)
            updatedPassword = await bcrypt.hash(req.body.newPassword, salt)
        }

        data[userIndex] = {
            id: req.params.userId,
            fullName: req.body.fullName,
            username: req.body.username,
            birth_date: req.body.birth_date,
            gender: req.body.gender,
            photo: req.body.photo,
            password: updatedPassword
        }

        fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(data, null, 2))

        res.status(200).json(data)

    } catch (error) {
        console.log("Error in updateUserJson:", error.message)
        res.status(500).json({ 
            error: "Internal Server Error" 
        })
    }
}

export const deleteUser = async (req, res) => {
    try {

        let data = JSON.parse(fs.readFileSync(path.resolve('./samples/users.json'), 'utf-8'))
        
        const userIndex = data.findIndex(element => String(element.id) == String(req.params.userId))
        
        // USER NOT REGISTERED
        if (userIndex === -1){
            console.log("User not found")
            return res.status(404).json({
                error: "User not found"
            });
        }

        const password = data[userIndex].password
        
        // CHECK IF PASSWORD IS CORRECT
        const isPasswordCorrect = await bcrypt.compare(req.body.password, password)

        if (!data || !isPasswordCorrect) {
            console.log("Incorrect password")
            return res.status(401).json({
                error: "Incorrect password"
            })
        }

        data.splice(userIndex, 1)

        // Index handling
        for (let i = userIndex; i < data.length; i++) {
            data[i].id = String(Number(data[i].id)-1);
        }
        
        fs.writeFileSync(path.resolve('./samples/users.json'), JSON.stringify(data, null, 2))

        res.status(200).json({message: "User deleted successfully", users: data});

    } catch (error) {
        console.log("Error in deleteUser:", error.message)
        res.status(500).json({ 
            error: "Internal Server Error" 
        })
    }
}