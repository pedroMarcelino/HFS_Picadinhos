import Category from '../model/Category.js';
import mongoose from 'mongoose';
import slugify from '../utils/slugify.js'

class CategoryService {
    async createCategory({ name }) {
        if (!name || name.trim() === '') {
            throw new AppError("name_required", 400, "categoryService.createCategory")
        }

        const categoryAlreadyExists = await Category.findOne({ email });

        if (categoryAlreadyExists) {
            throw new AppError("category_already_exists", 409, "categoryService.createCategory");
        }

        const slug = slugify(name);



        try {
            const category = await Category.create({
                name,
                slug
            });

            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}