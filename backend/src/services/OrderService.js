import { isValidId } from "../utils/isValidId.js";
import { AppError } from "../utils/appError.js";
import { Cart } from "../model/Cart.js";
import { CartItem } from "../model/CartItem.js";
import { Order } from "../model/Order.js";
import mongoose from "mongoose";
import { Address } from "../model/Address.js";

class OrderService {

    async createOrder({ userId }) {
        //verificar se ha a necessidade de tanto find. sera que nao fica pesado ? 
        try {
            //precisamos pegar UserId e validar  - check 
            // puxar o carrinho e os itens dentro do carrinho - check
            // cadastra-los no order e depois apaga-los do cart 

            if (!isValidId(userId)) {
                throw new AppError('invalid_id', 403, 'OrderService.createOrder')
            }

            const addressUser = await Address.findOne({ user_id: userId });

            if (!addressUser) {
                throw new AppError('Address_not_found', 404, 'OrderService.CreateOrder')
            }

            const cart = await Cart.findOne({ user_id: userId })
            if (!cart) {
                throw new AppError("cart_not_found", 404, "OrderService.CreateOrder")
            }

            const cartItens = await CartItem.find({ cart_id: cart._id })
            if (!cartItens) {
                throw new AppError('not_found_cartItems', 404, 'OrderService.CreateOrder')
            }

            //ainda necessario cadastrar total e notes.

            const order = await Order.findOne({ user_id: userId })

            if (!order) {
                let dataOrder = { user_id: userId, address_id: addressUser._id }
                const order = await Order.create({ dataOrder })
            }

            // cadastrar no orderItem (orderId, Productid, quantity, unit_price, subtotal)

            //fazer um for ou map ou fecth com o retorno de cartItens e 
            //e cadastrar cada um em order item 


        } catch (error) {
            throw new AppError(
                error.message,
                error.statusCode || 500,
                error.source || "cartService.getCart"
            );
        }
    }

}

export default new OrderService();