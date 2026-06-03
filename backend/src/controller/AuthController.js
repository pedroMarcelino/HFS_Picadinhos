import AuthService from '../services/AuthService.js';

class AuthController {
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            const user = await AuthService.register({ name, email, password });
            return res.status(201).json(user);

        } catch (error) {
            return res.status(400).json({
                error: error.message
            });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const data = await AuthService.login({ email, password })
            return res.status(200).json(data)

        } catch (error) {
            return res.status(400).json({
                error: error.message
            });
        }
    }

    async getCurrentUser(req, res) {
        try {
            const id = req.params.id;
            const data = await AuthService.getCurrentUser({ id })
            return res.status(200).json(data)
        } catch (error) {
            return res.status(400).json({
                error: error.message
            });
        }
        // res.status(200).json("teste")
    }

    async updateUser(req, res) {
        try {
            const id = req.params.id;
            const { name, surname, ddd, phone_number } = req.body
            const data = await AuthService.updateUser({ id, name, surname, ddd, phone_number })
        } catch (error) {
            return res.status(400).json({
                error: error.message
            });
        }
    }
}

export default new AuthController();