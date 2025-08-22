import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./src/database/users.json');

export const readDatabase = () => {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
};

export const writeDatabase = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export const findUser = (userid) => {
    const data = readDatabase();
    return {
        user: data.find(user => user.user === userid),
        data
    };
};
