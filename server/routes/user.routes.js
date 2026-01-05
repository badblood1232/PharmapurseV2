import express from 'express';
const router = express.Router();
import AuthController from '../controllers/user.controller.js';

router.post('/register', AuthController.register);

router.post('/login', AuthController.login);

router.post('/edit',AuthController.EditProfilePage)

export default router;

