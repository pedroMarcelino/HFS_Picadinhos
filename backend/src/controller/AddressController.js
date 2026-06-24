import AddressService from "../services/AddressService.js";

class AddressController {
    async createAddress(req, res) {
        try {
            const data = req.body;
            const address = await AddressService.createAddress({ data })
            return res.status(200).json(address);
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
    }

    async getAddress(req, res) {
        try {
            const token = req.headers['authorization'];
            const Addresses = await AddressService.getAddress({ token })
            return res.status(200).json(Addresses);
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
    }
}

export default new AddressController();