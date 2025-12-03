import db from '../config/db.js';

const User = {
    findUser: async (username) => {
        const[row] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
        return row[0];
    },


    Create: async (username, email, hashedpassword) => {
        const [row] = await db.execute('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedpassword]);
        return row.insertId;
    },

  
}

export default User;