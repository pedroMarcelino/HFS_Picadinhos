import { Router } from 'express';
import { checkToken } from '../utils/checkToken.js';
import OrderController from '../controller/OrderController.js';

const orderRoute = Router();

//Cria um novo pedido a partir do carrinho do usuário logado.
orderRoute.post('/', checkToken, OrderController.createOrder);

//Retorna todos os pedidos do usuário logado.
// orderRoute.get('/orders');

//Retorna os detalhes de um pedido específico do usuário.
// orderRoute.get('/orders/:id')

//Cancela um pedido, caso ainda esteja em um status que permita cancelamento.
// orderRoute.patch('orders/:id/cancel')

//Retorna o status atual e o histórico de acompanhamento do pedido.
// orderRoute.get('orders/:id/tracking')

export default orderRoute;
