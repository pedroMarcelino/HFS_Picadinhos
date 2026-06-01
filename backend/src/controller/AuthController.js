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

    async me(req, res) {
        try {
            const id = req.params.id;
            console.log("cheguei")

        } catch (error) {

        }

        // res.status(200).json("teste")
    }
}

export default new AuthController();