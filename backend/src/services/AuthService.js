import bcrypt from 'bcrypt';
import User from '../model/User.js';
import { validaEmail } from '../utils/validaEmail.js';
import { isValidToken } from '../utils/isValidToken.js'
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';


class AuthService {

    async register({ name, email, password }) {

        if (!name || name.trim() === '') {
            throw new Error("name_required : authService.Register")
        }

        if (!email || email.trim() === '') {
            throw new Error("email_required : authService.Register")
            const valida = validaEmail(email);
            if (!valida.valid) {
                throw new Error(valida.code);
            }
        }

        if (!password || password.trim() === '') {
            throw new Error("password_required : authService.Register")
        }

        const userAlreadyExists = await User.findOne({ email });

        console.log(userAlreadyExists);

        if (userAlreadyExists) {
            throw new Error('email_already_exists : authService.Register');
        }

        const salt = await bcrypt.genSalt(12);
        const password_hash = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password_hash
        });

        return user;
    }

    async login({ email, password }) {

        if (!email || email.trim() === '') {

            throw new Error("email_required : authService.login");

            const valida = validaEmail(email);
            if (!valida.valid) {
                throw new Error(valida.code);
            }
        }

        if (!password || password.trim() === '') {
            throw new Error("password_required : authService.login");
        }

        const user = await User.findOne({ email: email })

        if (!user) {
            throw new Error("email_not_found : authService.login");
        }

        const checkpassword = await bcrypt.compare(password, user.password_hash)
        if (!checkpassword) {
            throw new Error("password_mismatch : authService.login");
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
            throw new Error("internal_server_error: authService.login");

        }
    }

    async getCurrentUser({ id }) {
        if (!isValidToken(id)) {
            throw new Error("invalid_id : authService.getCurrentUser")
        }

        const userData = await User.findById(id, '-password_hash');

        if (!userData) {
            throw new Error('user_not_found : authService.getCurrrentUser')
        }

        return userData;
    }

    async updateUser({ id, name, surname, ddd, phone_number }) {
        if (!isValidToken(id)) {
            throw new Error("invalid_id : authService.updateUser")
        }

        if (!name || name.trim() === '') {
            throw new Error("name_required : authService.updateUser")
        }

        if (!surname || surname.trim() === '') {
            throw new Error("surname_required : authService.updateUser")
        }

        if (!ddd || ddd.trim() === '') {
            throw new Error("ddd_required : authService.updateUser")
        }

        if (!phone_number || phone_number.trim() === '') {
            throw new Error("phone_number_required : authService.updateUser")
        }

        

    }
}

export default new AuthService();