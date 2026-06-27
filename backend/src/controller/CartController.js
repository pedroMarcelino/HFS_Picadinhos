import CartService from "../services/CartService.js";

class CartController {
    async createCart(req, res) {
        try {
            const userId = req.user.id;
            const data = req.body;

            const cart = await CartService.createCart({ userId, data });
            return res.status(200).json(cart);

        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
    }

    async getCart(req, res) {
        try {
            const userId = req.user.id;
            const cart = await CartService.getCart({ userId })
            return res.status(200).json(cart);
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
    }

    async updateCart(req, res) {
        try {
            const cartItemId = req.params.id;
            const cartItemData = req.body;
            const update = await CartService.updateCart({ cartItemId, cartItemData });
            return res.status(200).json(update);
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
    }
}

export default new CartController();