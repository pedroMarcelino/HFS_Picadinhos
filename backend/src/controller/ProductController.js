import ProductService from "../services/ProductService.js";

class ProductController {
    async CreateProduct(req, res) {
        try {
            const product = req.body;
            const createProduct = await ProductService.CreateProduct({ product })
            return res.status(200).json(createProduct)
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
    }

    async updateProduct(req, res) {
        try {
            const id = req.params.id;
            const product = req.body;
            const updateProduct = await ProductService.updateProduct({ product, id })
            return res.status(200).json(updateProduct)
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
    }

    async deleteProduct(req, res) {
        try {
            const id = req.params.id;
            const deleteProduct = await ProductService.deleteProduct({ id })
            return res.status(200).json(deleteProduct)
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
    }
}

export default new ProductController();