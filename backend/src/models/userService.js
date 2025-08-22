import initDB from "../database/db.js";

const addUser = async (userData) => {
    const db = await initDB();
    const { fullName, username, birth_date, gender, photo, password } = userData;

    const result = await db.run(`
        INSERT INTO users (fullName, username, birth_date, gender, photo, password) 
        VALUES (?, ?, ?, ?, ?, ?)
    `, [fullName, username, birth_date, gender, photo, password]);

    return result.lastID; // Retorna o ID do novo usuário inserido
};

export { addUser };

const getAllUsers = async () => {
    const db = await initDB();
    const users = await db.all('SELECT * FROM users');
    return users;
};

const getUserById = async (id) => {
    const db = await initDB();
    const user = await db.get('SELECT * FROM users WHERE id = ?', [id]);
    return user;
};

export { getAllUsers, getUserById };

const updateUser = async (id, userData) => {
    const db = await initDB();
    const { fullName, username, birth_date, gender, photo, password } = userData;

    await db.run(`
        UPDATE users
        SET fullName = ?, username = ?, birth_date = ?, gender = ?, photo = ?, password = ?
        WHERE id = ?
    `, [fullName, username, birth_date, gender, photo, password, id]);

    return { id, ...userData }; // Retorna os dados atualizados
};

export { updateUser };

const deleteUser = async (id) => {
    const db = await initDB();
    await db.run('DELETE FROM users WHERE id = ?', [id]);
    return { message: `User with ID ${id} deleted successfully` };
};

export { deleteUser };