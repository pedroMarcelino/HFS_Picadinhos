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
            throw new AppError("internal_error", 500, "categoryService.createCategory");
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

    async updateCategory({ name, is_active, id }) {
        const checkId = await isValidId(id);
        if (!checkId) {
            throw new AppError("invalid_id", 400, "categoryService.updateCategory")
        }

        const category = await Category.findById({ _id: id })

        if (!category) {
            throw new AppError("category_not_found", 404, "categoryService.updateCategory")
        }

        let dataChange = false;

        if (name !== undefined && name !== category.name) {
            category.name = name;
            category.slug = slugify(name)
            dataChange = true;
        }


        if (is_active !== undefined && is_active !== category.is_active) {
            category.is_active = is_active;
            dataChange = true;
        }

        try {
            if (dataChange) {
                category.save();
            }

            return category;
        } catch (error) {
            throw new AppError(error.message, 500, "categoryService.updateCategory")
        }
    }

    async deleteCategory({ id }) {
        const checkId = await isValidId(id);
        if (!checkId) {
            throw new AppError("invalid_id", 400, "categoryService.deleteCategory")
        }

        try {
            const category = await Category.findById({ _id: id })

            if (category.is_active) {
                category.is_active = false;
                category.save();
            }

            return category;
        } catch (error) {
            throw new AppError(error.message, 500, "categoryService.deleteCategory")
        }
    }


}


export default new CategoryService();