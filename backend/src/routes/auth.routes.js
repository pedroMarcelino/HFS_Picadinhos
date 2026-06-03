import { Router } from 'express';
import bcrypt from 'bcrypt';
import AuthController from '../controller/AuthController.js';
import { checkToken } from '../utils/checkToken.js';


const authRoutes = Router();

//Rota de registro de Usuario
authRoutes.post('/register', AuthController.register);

//Rota de Login de usuario 
authRoutes.post('/login', AuthController.login);

//Rota para pegar os dados do CurrentUser no sistema
authRoutes.get('/me/:id', checkToken, AuthController.getCurrentUser)

//Rota para autualizar as informações de perfil de usuario
authRoutes.patch('/user/:id', checkToken, AuthController.updateUser)

//Rota de delete de usuario, na verdade destativamos o usuario do sistemos 
// impedindo de fazer login.
authRoutes.delete('/delete/:id', checkToken, AuthController.deleteUser)


export default authRoutes;