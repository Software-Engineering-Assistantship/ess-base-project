import sqlite3 from 'sqlite3';
import path from 'path';
import { open } from 'sqlite';

const initDB = async () => {
    return open({
        filename: path.resolve('database', 'database.sqlite'),
        driver: sqlite3.Database
    })
}

export default initDB;  