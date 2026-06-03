import bcrypt from 'bcrypt';
import User from '../model/User.js';
import { validaEmail } from '../utils/validaEmail.js';
import { isValidId } from '../utils/isValidId.js'
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { AppError } from '../utils/AppError.js';


class AuthService {

    async register({ name, email, password }) {

        if (!name || name.trim() === '') {
            throw new AppError("name_required", 400, "authService.Register")
        }

        if (!email || email.trim() === '') {
            throw new AppError("email_required", 400, "authService.Register")
            const valida = validaEmail(email);
            if (!valida.valid) {
                throw new AppError(valida.message, 400, "authService.Register");
            }
        }

        if (!password || password.trim() === '') {
            throw new AppError("password_required", 400, "authService.Register")
        }

        const userAlreadyExists = await User.findOne({ email });

        console.log(userAlreadyExists);

        if (userAlreadyExists) {
            throw new AppError("email_already_exists", 409, "authService.Register");
        }

        const salt = await bcrypt.genSalt(12);
        const password_hash = await bcrypt.hash(password, salt);

        try {
            const user = await User.create({
                name,
                email,
                password_hash
            });

            return user;
        } catch (error) {
            throw new Error(error.message);
        }

    }

    async login({ email, password }) {

        if (!email || email.trim() === '') {

            throw new AppError("email_required", 400, "AuthService.Login");

            const valida = validaEmail(email);
            if (!valida.valid) {
                throw new Error(valida.code);
            }
        }

        if (!password || password.trim() === '') {
            throw new AppError("password_required", 400, "AuthService.Login");
        }

        const user = await User.findOne({ email: email })

        if (!user) {
            throw new AppError("email_not_found", 404, "AuthService.Login");
        }

        if (user.status !== 'active') {
            throw new AppError("inactive_user", 403, "AuthService.Login");
        }

        const checkpassword = await bcrypt.compare(password, user.password_hash)
        if (!checkpassword) {
            throw new AppError("password_mismatch", 400, "AuthService.Login");
        }

        console.log(user.id)

        try {
            const secret = process.env.JWT_SECRET;
            const token = jwt.sign({ id: user.id }, secret)

            const data = {
                msg: 'success_login',
                token
            }

            return data;

        } catch (error) {
            throw new AppError("internal_server_error", 500, "AuthService.Login");

        }
    }

    async getCurrentUser({ id }) {
        if (!isValidId(id)) {
            throw new AppError("invalid_id", 400, "AuthService.getCurrentUser")
        }

        const userData = await User.findById(id, '-password_hash');

        if (!userData) {
            throw new AppError("user_not_found", 404, "AuthService.getCurrentUser")
        }

        return userData;
    }

    async updateUser({ id, name, surname, ddd, phone_number }) {
        if (!isValidId(id)) {
            throw new AppError("invalid_id", 400, "AuthService.updateUser")
        }

        if (!name || name.trim() === '') {
            throw new AppError("name_required", 400, "AuthService.updateUser")
        }

        if (!surname || surname.trim() === '') {
            throw new AppError("surname_required", 400, "AuthService.updateUser")
        }

        if (!ddd || ddd.trim() === '') {
            throw new AppError("ddd_required", 400, "AuthService.updateUser")
        }

        if (!phone_number || phone_number.trim() === '') {
            throw new AppError("phone_number_required", 400, "AuthService.updateUser")
        }

        // console.log(id, name, surname, ddd, phone_number);

        const dataUser = await User.findById(id);

        if (!dataUser) {
            throw new AppError("user_not_found", 404, "AuthService.updateUser");
        }

        dataUser.name = name;
        dataUser.surname = surname;
        dataUser.ddd = ddd;
        dataUser.phone_number = phone_number;

        try {
            await dataUser.save();
            return dataUser;
        } catch (error) {
            throw new AppError(error.message, 500, "AuthService.UpdateUser");
        }


    }
}

export default new AuthService();