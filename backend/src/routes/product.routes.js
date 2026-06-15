import { Router } from 'express';
import { checkToken } from '../utils/checkToken.js';
import { middlewareAdmin } from '../utils/middlewareAdmin.js';
import ProductController from '../controller/ProductController.js'


const productRoutes = Router();

//(Admin) Cria um novo produto.
productRoutes.post('/', ProductController.CreateProduct);

//(Admin) Atualiza informações de um produto.
productRoutes.patch('/:id', ProductController.updateProduct)

export default productRoutes;

