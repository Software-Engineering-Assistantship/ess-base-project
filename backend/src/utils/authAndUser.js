import fs from 'fs';
import path from 'path';

const USERS_FILE_PATH = path.resolve('./samples/users.json');

export const readUsersFromFile = () => {
    try {
        const data = fs.readFileSync(USERS_FILE_PATH, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading users from file:", error);
        return null;
    }
};

export const writeUsersToFile = (data) => {
    try {
        fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error writing users to file:", error);
    }
};

export const validateSignupFields = (fullName, username, birth_date, gender, password, confirmPassword) => {
    if (!fullName || !username || !birth_date || !gender || !password || !confirmPassword) {
        return "Todos os campos são obrigatórios";
    }

    if (password !== confirmPassword) {
        return "As senhas não coincidem";
    }
    return null; // validação bem-sucedida
};