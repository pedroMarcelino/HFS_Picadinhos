import { Category } from '../model/Category.js';
import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js'
import { AppError } from '../utils/AppError.js';
import { isValidId } from '../utils/isValidId.js';

class CategoryService {
    async createCategory({ name }) {

        console.log(name);

        if (!name || name.trim() === '') {
            throw new AppError("name_required", 400, "categoryService.createCategory")
        }

        const categoryAlreadyExists = await Category.findOne({ name });

        if (categoryAlreadyExists) {
            throw new AppError("category_already_exists", 409, "categoryService.createCategory");
        }

        const slug = await slugify(name);

        console.log(name)

        try {
            const category = await Category.create({
                name,
                slug
            });

            return category;
        } catch (error) {
            throw new Error("internal_error", 500, "categoryService.createCategory");
        }
    }

    async getCategories() {
        try {
            const categories = await Category.find({ is_active: true })
                .sort({
                    name: 1
                });
            return categories;
        } catch (error) {
            throw new AppError(error.message, 400, "categoryService.getCategories")
        }
    }

    async getOneCategory({ id }) {
        const checkId = await isValidId(id);

        console.log(checkId)

        if (!checkId) {
            throw new AppError("invalid_id", 400, "categoryService.getOneCategory")
        }

        try {
            const category = await Category.findById({ _id: id });
            return category;
        } catch (error) {
            throw new AppError(error.message, 500, "categoryService.getOneCategory")
        }
    }

    


}


export default new CategoryService();