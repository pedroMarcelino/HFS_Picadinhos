// {
//     _id,
//     user_id,
//     created_at,
//     updated_at
// }
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true
        }
    },
    {
        timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at"
        },
        versionKey: false
    }
);


export const Cart = mongoose.model(
    "Cart",
    cartSchema
);