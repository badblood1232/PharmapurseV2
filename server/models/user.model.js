import db from '../config/db.js';

const User = {
    findUser: async (username) => {
        const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows[0]; // return first matching user
    },

    Create: async (username, email, hashedPassword) => {
        const [result] = await db.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );
        return result.insertId; // return the inserted ID
    },
};

export default User;
