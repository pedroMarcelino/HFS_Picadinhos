import { validateRequired } from '../utils/validateRequired.js'
import { slugify } from '../utils/slugify.js'
import { AppError } from '../utils/appError.js';
import { Category } from '../model/Category.js';
import { Product } from '../model/Product.js'
import { isValidId } from '../utils/isValidId.js'
import mongoose from 'mongoose';


class ProductService {
    async CreateProduct({ product }) {
        try {
            validateRequired(product, [
                'name',
                'description',
                'category_id',
                'price',
                'unit',
                'stock_quantity',
                'is_active'
            ], 'ProductService.CreateProduct');

            product.slug = slugify(product.name);
            if (!isValidId(product.category_id)) {
                throw new AppError('invalid_category_id', 400, 'ProductService.CreateProduct')
            }
            const validateCategoryId = await Category.findById({ _id: product.category_id })

            if (validateCategoryId) {
                const createProduct = await Product.create(product);
                return createProduct;
            } else {
                throw new AppError('category_id_not_found', 404, 'ProductService.CreateProduct')
            }
        } catch (error) {
            throw new AppError(error.message, error.statusCode || 500, error.source);
        }
    }

    async updateProduct({ product, id }) {
        try {
            if (!isValidId(id)) {
                throw new AppError("invalid_id", 400, "ProductService.updateProduct")
            }

            const productDataDB = await Product.findById(id);

            if (!productDataDB) {
                throw new AppError('product_not_found', 404, 'ProductService.updateProduct');
            }

            const category = await Category.findById(
                product.category_id
            );

            if (!category) {
                throw new AppError('category_not_found', 404, 'ProductService.updateProduct');
            }

            let change = false;
            if (product.name !== undefined && product.name !== productDataDB.name) {
                const newSlug = await slugify(product.name);

                const verifySlug = await Product.findOne({ slug: newSlug, _id: { $ne: productDataDB._id } })
                if (verifySlug) {
                    throw new AppError('slug_already_exists', 400, 'ProductService.updateProduct');
                }

                productDataDB.name = product.name;
                productDataDB.slug = newSlug;
                change = true;
            }

            if (product.description !== undefined && product.description !== productDataDB.description) {
                productDataDB.description = product.description;
                change = true;
            }

            if (product.category_id !== undefined && product.category_id !== productDataDB.category_id.toString()) {
                productDataDB.category_id = product.category_id;
                change = true;
            }
            if (product.price !== undefined && product.price !== productDataDB.price) {
                productDataDB.price = product.price;
                change = true;
            }
            if (product.unit !== undefined && product.unit !== productDataDB.unit) {
                productDataDB.unit = product.unit;
                change = true;
            }
            if (product.stock_quantity !== undefined && product.stock_quantity !== productDataDB.stock_quantity) {
                productDataDB.stock_quantity = product.stock_quantity;
                change = true;
            }
            if (product.is_active !== undefined && product.is_active !== productDataDB.is_active) {
                productDataDB.is_active = product.is_active;
                change = true;
            }

            if (!change) {
                return productDataDB;
            }

            await productDataDB.save();

            return productDataDB;

        } catch (error) {
            throw new AppError(error.message, error.statusCode || 500, error.source);
        }
    }
}

export default new ProductService();