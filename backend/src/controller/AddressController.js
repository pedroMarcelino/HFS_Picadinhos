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
            const tokenUserId = req.user.id;
            const Addresses = await AddressService.getAddress({ tokenUserId })
            return res.status(200).json(Addresses);
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
    }

    async deleteAddress(req, res) {
        try {
            const addressId = req.params.id;
            const tokenIdUser = req.user.id;
            const deleteData = await AddressService.deleteAddress({ addressId, tokenIdUser });
            return res.status(200).json();
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
    }

    async updateAddress(req, res) {
        try {
            const addressId = req.params.id;
            const addressData = req.body;
            const address = await AddressService.updateAddress({ addressId, addressData })
            return res.status(200).json(address)
        } catch (error) {
            return res.status(error.statusCode || 500).json({
                error: error.message,
                source: error.source
            });
        }
    }
}

export default new AddressController();