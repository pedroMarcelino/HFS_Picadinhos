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
}

export default new AddressController();