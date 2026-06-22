import { Router } from 'express';
import { checkToken } from '../utils/checkToken.js';
import { middlewareAdmin } from '../utils/middlewareAdmin.js';
import AddressController from '../controller/AddressController.js';


const addressRoute = Router();

//(Privada) Cria um novo produto.
addressRoute.post('/', AddressController.createAddress);





export default addressRoute;

