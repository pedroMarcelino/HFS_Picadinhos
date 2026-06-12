import { Category } from '../model/Category.js';
import mongoose from 'mongoose';
import { slugify } from '../utils/slugify.js'
import { AppError } from '../utils/AppError.js';

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
            throw new Error(error.message);
        }
    }

    
}


export default new CategoryService();