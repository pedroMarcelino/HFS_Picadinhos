import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        description: {
            type: String,
            trim: true,
            maxlength: 1000,
        },

        //image_url: {
        //    type: [String],
        //    trim: true,
        //},

        category_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        unit: {
            type: String,
            required: true,
            enum: [
                "kg",
                "unidade",
                "bandeja",
                "caixa"
            ],
        },

        stock_quantity: {
            type: Number,
            required: true,
            min: 0,
            default: 0,
        },

        is_active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
        },
        versionKey: false,
    }
);

export const Product = mongoose.model(
    "Product",
    productSchema
);