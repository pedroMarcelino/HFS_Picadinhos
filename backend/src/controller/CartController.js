import CartService from "../services/CartService.js";

class CartController {
    async createCart(req, res) {
        try {

        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
    }
}

export default new CartController();