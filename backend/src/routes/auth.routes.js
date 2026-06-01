import { Router } from 'express';
import bcrypt from 'bcrypt';
import AuthController from '../controller/AuthController.js';
import { checkToken } from '../utils/checkToken.js';


const authRoutes = Router();

authRoutes.post('/register', AuthController.register);
authRoutes.post('/login', AuthController.login);
authRoutes.get('/me/:id', checkToken, AuthController.me)

export default authRoutes;