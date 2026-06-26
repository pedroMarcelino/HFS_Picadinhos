import { Router } from 'express';
import CartController from '../controller/CartController.js';

const cartRoutes = Router();
//Rota de registro de Usuario
cartRoutes.post('/items', CartController.createCart);


export default cartRoutes;

