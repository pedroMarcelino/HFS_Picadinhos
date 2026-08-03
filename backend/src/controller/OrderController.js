import OrderService from "../services/OrderService.js";

class OrderController {
    async createOrder(req, res) {
        try {
            const userId = req.user.id;

            const createOrder = await OrderService.createOrder({ userId });
            return res.status(200).json(createOrder);

        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
    }
}

export default new OrderController();