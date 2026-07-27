import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        address_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            required: true,
        },

        status: {
            type: String,
            enum: [
                "pending",
                "paid",
                "preparing",
                "delivering",
                "completed",
                "canceled",
            ],
            default: "pending",
            required: true,
        },

        notes: {
            type: String,
            trim: true,
            maxlength: 500,
            default: "",
        },

        total: {
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

export const Order = mongoose.model("Order", orderSchema);