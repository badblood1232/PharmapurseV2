import Service from '../service/user.service.js';


const AuthController = {
    register: async (req, res) => {
        const { username, email, password } = req.body;
        const user = await Service.register(username, email, password);
        res.json(user);
    },
    login: async (req, res) => {
        try{
        const { username, password } = req.body;
        const token = await Service.login(username, password);
        res.json({ message: 'Login successful', token });
        }catch (error) {
            res.status(401).json({ message: 'Invalid credentials' });
        }
       
    },
}

export default AuthController