import express from 'express';
const router = express.Router();
import AuthController from '../controllers/user.controller.js';
import authMiddleware from '../middleware/Authmiddleware.js';

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.put('/edit',authMiddleware,AuthController.EditProfilePage)

export default router;

