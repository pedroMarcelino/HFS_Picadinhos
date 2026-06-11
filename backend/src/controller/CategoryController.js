import CategoryService from '../services/CategoryService.js'

class CategoryController {
    async createCategory(req, res) {
        
        try {
            const { name } = req.body;
            const user = await CategoryService.createCategory({ name });
            return res.status(201).json({ msg: 'sucess_register', user });
        } catch (error) {

        }
    }
}