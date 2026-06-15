import ProductService from "../services/ProductService.js";

class ProductController {
    async RegisterProduct(req, res) {
        try {
            const product = req.body;
            const createProduct = await ProductService.RegisterProduct({ product })
            return res.status(200).json(createProduct)
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
        //return res.status(200).json(deleteCategory)
    }
}

export default new ProductController();