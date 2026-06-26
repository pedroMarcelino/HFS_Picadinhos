import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
    {
        cart_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cart",
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
            default: 1,
        },

        // Preço em centavos no momento em que o item foi adicionado ao carrinho
        unit_price: {
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

// Impede que o mesmo produto seja adicionado duas vezes ao mesmo carrinho
cartItemSchema.index(
    {
        cart_id: 1,
        product_id: 1,
    },
    {
        unique: true,
    }
);

export const CartItem = mongoose.model("CartItem", cartItemSchema);