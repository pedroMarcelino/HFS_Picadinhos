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

    async 
}

export default new CategoryController();