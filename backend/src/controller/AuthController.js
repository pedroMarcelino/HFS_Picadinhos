import AuthService from '../services/AuthService.js';

class AuthController {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            const user = await AuthService.register({ name, email, password });
            return res.status(201).json({ msg: 'sucess_register', user });

        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const data = await AuthService.login({ email, password })
            return res.status(200).json({ msg: 'sucess_login', data })

        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
    }

    async getCurrentUser(req, res) {
        try {
            const id = req.params.id;
            const data = await AuthService.getCurrentUser({ id })
            return res.status(200).json(data)
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
        // res.status(200).json("teste")
    }

    async updateUser(req, res) {
        try {
            const id = req.params.id;
            const { name, surname, ddd, phone_number } = req.body
            const data = await AuthService.updateUser({ id, name, surname, ddd, phone_number })
            res.status(200).json({ msg: 'user_updated', data })
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
    }

    async deleteUser(req, res) {
        try {
            const id = req.params.id;
            const data = await AuthService.deleteUser({ id })
            return res.status(200).json({ msg: 'user_deleted' })
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
    }


}

export default new AuthController();