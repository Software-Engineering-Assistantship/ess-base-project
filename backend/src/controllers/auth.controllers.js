import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/generateToken.js'
import { readUsersFromFile, writeUsersToFile, validateSignupFields } from '../utils/authAndUser.js'


export const signup = async (req, res) => {
    try {
        const { fullName, username, birth_date, gender, photo, password, confirmPassword } = req.body;

        // Validação de campos vazios
        const validationError = validateSignupFields(fullName, username, birth_date, gender, password, confirmPassword);
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        const data = readUsersFromFile();

        if (!data) {
            return res.status(500).json({ error: "Erro ao ler os usuários do arquivo" });
        }

        const user = data.find(user => user.username === username);
        if (user) {
            return res.status(409).json({ error: "Nome de usuário já utilizado" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const id = String(data.length + 1);

        const newUser = {
            id,
            fullName,
            username,
            birth_date,
            gender,
            photo,
            password: hashedPassword,
        };

        generateTokenAndSetCookie(id, res);

        data.push(newUser);

        writeUsersToFile(data);

        res.status(201).json({
            id,
            fullName,
            username,
            birth_date,
            gender,
        });
    } catch (error) {
        console.error("Error in signup controller:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const data = readUsersFromFile();
        if  (!data) {
            return res.status(500).json({ error: "Erro ao ler os usuários do arquivo" });
        }

        const user = data.find(user => user.username === username);

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
        
        generateTokenAndSetCookie(data.id, res)

        res.status(200).json({
            id: data.id,
            fullName: data.fullName,
            username: data.username,
        })


    } catch (error) {
        console.log("Error in login controller:", error.message)
        res.status(500).json({
            error:"Internal server error"
        })
    }
}

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0})

        res.status(200).json({
            message: "Logged out succesfully"
        })

    } catch (error) {
        console.log("Error in logout controller:", error.message)
        res.status(500).json({
            error:"Internal server error"
        })
    }
}