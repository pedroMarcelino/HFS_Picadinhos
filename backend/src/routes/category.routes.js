import { Router } from 'express';
import CategoryController from '../controller/CategoryController.js'
import { checkToken } from '../utils/checkToken.js';
import { middlewareAdmin } from '../utils/middlewareAdmin.js';


const categoryRoutes = Router();

//Rota que lista todas as categorias
categoryRoutes.get('/', CategoryController.getCategories);

//Rota que lista apenas uma categoria
categoryRoutes.get('/:id', CategoryController.getOneCategory);

//Rota cria todas as categorias ( apenas admin )
categoryRoutes.post('/', checkToken, middlewareAdmin, CategoryController.createCategory);

//Rota que atualiza categorias
//categoryRoutes.patch('/:id', CategoryController.);

//Rota que deleta uma categoria
//categoryRoutes.Delete('/:id', CategoryController.);

export default categoryRoutes;

