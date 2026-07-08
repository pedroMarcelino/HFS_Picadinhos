import { Cart } from '../model/Cart.js';
import { Product } from '../model/Product.js';
import mongoose from 'mongoose';
import { AppError } from '../utils/AppError.js';
import { isValidId } from '../utils/isValidId.js';
import { User } from '../model/User.js';
import { CartItem } from '../model/CartItem.js';

class CartService {
    async createCart({ userId, data }) {
        try {
            //valida id do usuairo e se ele esta ativo;
            if (!isValidId(userId)) {
                throw new AppError("invalid_id", 400, "cartService.createCart");
            }

            const user = await User.findById({ _id: userId });
            if (!user) {
                throw new AppError('user_not_found', 404, 'certService.createCart')
            }

            if (user.status != 'active') {
                throw new AppError('error_status_user', 403, 'certService.createCart')
            }

            //valida id de produto e consulta se produto existe no banco
            if (!isValidId(data.productId)) {
                throw new AppError("invalid_id", 400, "cartService.createCart");
            }

            const product = await Product.findById({ _id: data.productId });
            if (!product) {
                throw new AppError('product_not_found', 404, 'cartService.createCart')
            }

            //verifica se ja existe carrinho do usuario
            let cart = await Cart.findOne({ user_id: userId });

            if (!cart) {
                cart = await Cart.create({
                    user_id: userId
                });
            }

            const existingItem = await CartItem.findOne({
                cart_id: cart._id,
                product_id: data.productId
            });

            if (existingItem) {
                existingItem.quantity += data.quantity;
                await existingItem.save();

                return existingItem;
            }

            const cartItem = await CartItem.create({
                cart_id: cart._id,
                product_id: data.productId,
                quantity: data.quantity,
                unit_price: product.price
            });

            return cartItem;

        } catch (error) {
            throw new AppError(
                error.message,
                error.statusCode || 500,
                error.source || "cartService.getCart"
            );
        }
    }

    async getCart({ userId }) {
        try {
            if (!isValidId(userId)) {
                throw new AppError('invalid_id', 400, 'cartService.getCart')
            }

            const user = await User.findById(userId);
            if (!user) {
                throw new AppError('user_not_found', 404, 'CartService.getCart')
            }

            const cart = await Cart.findOne({ user_id: userId });
            if (!cart) {
                throw new AppError('cart_not_found', 404, 'cartService.getCart');
            }

            const cartItem = await CartItem.find({ cart_id: cart._id }).populate('product_id');
            if (!cartItem) {
                throw new AppError('items_not_found', 404, 'cartService.getcart')
            }

            return cartItem;

        } catch (error) {
            throw new AppError(
                error.message,
                error.statusCode || 500,
                error.source || "cartService.getCart"
            );
        }

    }

    async updateCart({ cartItemId, cartItemData }) {
        try {//testar e validar
            if (!isValidId(cartItemId)) {
                throw new AppError('invalid_id', 400, 'cartService.updateCart')
            }

            if (cartItemData.quantity < 0) {
                throw new AppError("invalid_quantity", 400, "cartService.updateCart");
            }

            const cartItem = await CartItem.findById({ _id: cartItemId });
            if (!cartItem) {
                throw new AppError("item_not_found", 404, "cartService.updateCart")
            }

            if (cartItemData.quantity === 0) {
                const deleteItem = await CartItem.findByIdAndDelete({ _id: cartItemId })
                if (!deleteItem) {
                    throw new AppError("item_not_found", 404, "cartService.updateCart");
                }
                return deleteItem;
            }

            const product = await Product.findById(cartItem.product_id);

            if (cartItemData.quantity > product.stock_quantity) {
                throw new AppError("insufficient_stock", 400, "cartService.updateCart");
            }

            cartItem.quantity = cartItemData.quantity;
            return cartItem.save();

        } catch (error) {
            throw new AppError(
                error.message,
                error.statusCode || 500,
                error.source || "cartService.UpdateCart"
            );
        }
    }




}
export default new CartService();