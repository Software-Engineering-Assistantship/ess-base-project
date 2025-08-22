import initDB from "./db";

const createTables = async () => {
    const db = await initDB();
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            fullName TEXT NOT NULL,
            username TEXT UNIQUE NOT NULL,
            birth_date TEXT NOT NULL,
            gender TEXT NOT NULL,
            photo TEXT NOT NULL,
            password TEXT NOT NULL
        )
    `);
    console.log("Tables created successfully");
}