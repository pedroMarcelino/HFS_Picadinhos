import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        label: {
            type: String,
            required: true,
            trim: true,
            maxlength: 50,
        },

        street: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        number: {
            type: String,
            required: true,
            trim: true,
            maxlength: 20,
        },

        complement: {
            type: String,
            trim: true,
            maxlength: 100,
        },

        neighborhood: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        city: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        state: {
            type: String,
            required: true,
            trim: true,
            maxlength: 2,
            uppercase: true,
        },

        zip_code: {
            type: String,
            required: true,
            trim: true,
            maxlength: 9,
        },

        is_default: {
            type: Boolean,
            default: false,
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

export const Address = mongoose.model(
    "Address",
    addressSchema
);