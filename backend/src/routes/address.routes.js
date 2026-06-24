import { Router } from 'express';
import { checkToken } from '../utils/checkToken.js';
import { middlewareAdmin } from '../utils/middlewareAdmin.js';
import AddressController from '../controller/AddressController.js';


const addressRoute = Router();

//(Privada) Cria um novo produto.
addressRoute.post('/', checkToken, AddressController.createAddress);

//(Privada) Traz todos os enderecos do usuario logado.
// addressRoute.get('/', checkToken, AddressController.getAddress)





export default addressRoute;

