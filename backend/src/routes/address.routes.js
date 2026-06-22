import { Router } from 'express';
import { checkToken } from '../utils/checkToken.js';
import { middlewareAdmin } from '../utils/middlewareAdmin.js';
import AddressController from '../controller/AddressController.js';


const addressRoute = Router();

//(Admin) Cria um novo produto.
addressRoute.post('/', checkToken, middlewareAdmin, ProductController.CreateProduct);



export default addressRoute;

