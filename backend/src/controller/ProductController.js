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

    async getProduct(req, res) {
        try {
            const slug = req.params.slug;

            if (slug == "") {
                throw new AppError('empty_slug', 400, 'productService.getProduct')
            }

            const product = await ProductService.getProduct({ slug })
            return res.status(200).json(product);
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
    }
}

export default new ProductController();