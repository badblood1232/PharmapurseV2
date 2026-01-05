import EditProfilePage from '../../client/src/pages/EditProfile.jsx';
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

     EditProfilePage: async(id, email, hashedPassword) =>{
        const[result] = await db.query(
            'UPDATE users SET email = ?, password = ? Where id = ?',[email, hashedPassword, id]
        )
        return result;
     }

};

export default User;
