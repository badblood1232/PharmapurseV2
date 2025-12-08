import Service from '../service/user.service.js';


const AuthController = {
    register: async (req, res) => {
        
        try{
         const { email, username , password } = req.body;
        const user = await Service.register(email, username , password);
        res.json({ message: 'User registered successfully', user: user});
        } catch (error) {
             console.log("REGISTER ERROR:", error);   // <-- IMPORTANT
            res.status(400).json({ message: error.message || 'User already exists' });
           
        }
       
    },
    login: async (req, res) => {
        try{
        const { username, password } = req.body;
        const token = await Service.login(username, password);
        res.json({ message: 'Login successful', token });
        }catch (error) {
            res.status(401).json({ message: error.message });
        }
       
    },
}

export default AuthController