import { Router } from 'express';
import CartController from '../controller/CartController.js';
import { checkToken } from '../utils/checkToken.js';

const cartRoutes = Router();

//Rota de registro de Usuario
cartRoutes.post('/items/', checkToken, CartController.createCart);

//Rota para trazer os dados do carrinho do usuario
cartRoutes.get('/', checkToken, CartController.getCart);

//Rota para trazer os dados do carrinho do usuario
cartRoutes.patch('/items/:id', checkToken, CartController.updateCart);


export default cartRoutes;

