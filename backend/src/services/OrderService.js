import { isValidId } from "../utils/isValidId.js";
import { AppError } from "../utils/appError.js";
import { Cart } from "../model/Cart.js";
import { CartItem } from "../model/CartItem.js";

import mongoose from "mongoose";

class OrderService {

    async createOrder({ userId }) {
        try {
            //precisamos pegar UserId e validar  
            // puxar o carrinho e os itens dentro do carrinho 
            // cadastra-los no order e depois apaga-los do cart 


            if (!isValidId(userId)) {
                throw new AppError('invalid_id', 403, 'OrderService.createOrder')
            }

            const cart = await Cart.findOne({ user_id: userId })
            if (!cart) {
                throw new AppError("cart_not_found", 404, "OrderService.CreateOrder")
            }

            const cartItens = await CartItem.find({ cart_id: cart._id })

            console.log(cartItens)

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