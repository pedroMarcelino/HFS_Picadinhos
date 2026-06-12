import CategoryService from '../services/CategoryService.js'

class CategoryController {
    async createCategory(req, res) {

        try {
            const { name } = req.body;
            const category = await CategoryService.createCategory({ name });
            return res.status(201).json({ msg: 'category_created', category });
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
    }

    async getCategories(req, res) {
        try {
            const category = await CategoryService.getCategories({});
            return res.status(200).json(category)
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
    }

    async getOneCategory(req, res) {
        try {
            const id = req.params.id;
            const oneCategory = await CategoryService.getOneCategory({ id })
            return res.status(200).json(oneCategory)

        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
    }
}

export default new CategoryController();