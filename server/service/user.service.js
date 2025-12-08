import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import User from '../models/user.model.js';

const AuthService = {
    register: async (username, email, password) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.Create(username, email, hashedPassword);
        return user;
    },
    login: async (username, password) => {
        const user = await User.findUser(username);
        if (!user) {
            throw new Error('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
           throw new Error('Invalid credentials');
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        return token;
    }
}

export default AuthService