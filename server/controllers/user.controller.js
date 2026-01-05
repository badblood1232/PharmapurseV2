import EditProfilePage from '../../client/src/pages/EditProfile.jsx';
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

    EditProfilePage: async (req, res) => {
        try{
            const {email, password } = req.body;
            const {id} = req.id
            const user = await Service.EditProfilePage(id, email, password);
            res.json({ message: 'Profile updated successfully', user: user});
        } catch (error) {
            console.log("EDIT PROFILE ERROR:", error);
            res.status(400).json({ message: error.message || 'Profile update failed' });
        }

        }

}

export default AuthController