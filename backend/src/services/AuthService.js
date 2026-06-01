import bcrypt from 'bcrypt';
import User from '../model/User.js';
import { validaEmail } from '../utils/validaEmail.js';
import jwt from 'jsonwebtoken';

class AuthService {

    async register({ name, email, password }) {

        if (!name || name.trim() === '') {
            throw new Error("name_required")
        }

        if (!email || email.trim() === '') {
            throw new Error("email_required")
            const valida = validaEmail(email);
            if (!valida.valid) {
                throw new Error(valida.code);
            }
        }

        if (!password || password.trim() === '') {
            throw new Error("password_required")
        }

        const userAlreadyExists = await User.findOne({ email });

        console.log(userAlreadyExists);

        if (userAlreadyExists) {
            throw new Error('email_already_exists');
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

            throw new Error("email_required");

            const valida = validaEmail(email);
            if (!valida.valid) {
                throw new Error(valida.code);
            }
        }

        if (!password || password.trim() === '') {
            throw new Error("password_required");
        }

        const user = await User.findOne({ email: email })

        if (!user) {
            throw new Error("email_not_found");
        }

        const checkpassword = await bcrypt.compare(password, user.password_hash)
        if (!checkpassword) {
            throw new Error("password_mismatch");
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
            throw new Error("internal_server_error");

        }
    }

    async me({ id }) {
        
    }
}

export default new AuthService();