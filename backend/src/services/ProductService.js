import { validateRequired } from '../utils/validateRequired.js'
import { slugify } from '../utils/slugify.js'
import { AppError } from '../utils/appError.js';
import { Category } from '../model/Category.js';
import { Product } from '../model/Product.js'
import { isValidId } from '../utils/isValidId.js'
import mongoose from 'mongoose';


class ProductService {
    async RegisterProduct({ product }) {
        try {
            validateRequired(product, [
                'name',
                'description',
                'category_id',
                'price',
                'unit',
                'stock_quantity'
            ], 'ProductService.RegisterProduct');

            product.slug = slugify(product.name);
            if (await !isValidId(product.category_id)) {
                throw new AppError('invalid_category_id', 400, 'ProductService.RegisterProduct')
            }
            const validateCategoryId = await Category.findById({ _id: product.category_id })

            if (validateCategoryId) {
                const createProduct = await Product.create(product);
                return createProduct;
            } else {
                throw new AppError('category_id_not_found', 404, 'ProductService.RegisterProduct')
            }


        } catch (error) {
            throw new AppError(error.message, error.statusCode || 500, error.source);
        }



    }
}

export default new ProductService();