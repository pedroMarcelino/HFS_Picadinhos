import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
    {
        order_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
            required: true,
        },

        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: 1,
        },

        unit_price: {
            type: Number,
            required: true,
            min: 0,
        },

        subtotal: {
            type: Number,
            required: true,
            min: 0,
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

export const OrderItem = mongoose.model("OrderItem", orderItemSchema);