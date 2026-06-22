import { Router } from 'express';
import { checkToken } from '../utils/checkToken.js';
import { middlewareAdmin } from '../utils/middlewareAdmin.js';
import ProductController from '../controller/ProductController.js'


const productRoutes = Router();

//(Admin) Cria um novo produto.
productRoutes.post('/', checkToken, middlewareAdmin, ProductController.CreateProduct);

//(Admin) Atualiza informações de um produto.
productRoutes.patch('/:id', checkToken, middlewareAdmin, ProductController.updateProduct)

//(Publica) um unico produto pela 'slug'
productRoutes.get('/:slug', ProductController.getProduct)

//(Publica) traz todos os produtos da mesma category
productRoutes.get('/category/:slug', ProductController.getProductsByCategory)

//(Publica) traz todos os produtos 
productRoutes.get('/', ProductController.getProducts)


export default productRoutes;

