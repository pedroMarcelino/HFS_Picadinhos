import { Router } from 'express';
import { checkToken } from '../utils/checkToken.js';
import { middlewareAdmin } from '../utils/middlewareAdmin.js';
import ProductController from '../controller/ProductController.js'


const productRoutes = Router();

//Rota de criacao de produto
productRoutes.post('/', ProductController.RegisterProduct);

export default productRoutes;

