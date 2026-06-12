import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        surname: {
            type: String,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password_hash: {
            type: String,
            required: true
        },

        ddd: {
            type: String
        },

        phone_number: {
            type: String
        },

        role: {
            type: String,
            enum: ['client', 'admin'],
            default: 'client'
        },
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active'
        },
        deletedAt: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

export const User = mongoose.model(
    'User',
    userSchema
);