import { validateRequired } from '../utils/validateRequired.js';
import { isValidId } from '../utils/isValidId.js'
import { AppError } from '../utils/appError.js';
import { Address } from '../model/Adress.js'
import { User } from '../model/User.js';

class AddressService {
    async createAddress({ data }) {
        try {

            validateRequired(data, [
                "user_id",
                "label",
                "street",
                "number",
                "neighborhood",
                "city",
                "state",
                "zip_code"
            ], 'AddressService.createAddress');

            if (!isValidId(data['user_id'])) {
                throw new AppError('invalid_id', 400, 'AddressService.createAddress')
            }

            const user = await User.findById(data['user_id']);
            if (!user) {
                throw new AppError('user_not_found', 404, 'AddressService.createAddress')
            }

            const user_id = data['user_id'];

            const hasDefaultAddress = await Address.findOne({
                user_id,
                is_default: true
            });

            if (!hasDefaultAddress) {
                //nao possue endereco default
                data['is_default'] = true;
            }

            const addressSave = await Address.create(data);
            return addressSave;

        } catch (error) {
            throw new AppError(error.message, 500, "AddressService.createAddress");
        }
    }

    async getAddress({ tokenUserId }) {
        try {
            const userAddresses = await Address.find({ user_id: tokenUserId })

            if (!userAddresses || userAddresses.length <= 0) {
                throw new AppError('address_not_found', 404, 'AddressService.getAddress')
            }

            return userAddresses;

        } catch (error) {
            throw new AppError(error.message, 500, "AddressService.getAddress");
        }
    }

    async deleteAddress({ addressId, tokenIdUser }) {
        try {
            if (!isValidId(addressId)) {
                throw new AppError('invalid_id', 400, 'addressService.deleteAddress');
            }

            const addressDeleted = await Address.findOneAndDelete({
                _id: addressId,
                user_id: tokenIdUser
            });

            if (!addressDeleted) {
                throw new AppError(
                    'address_not_found',
                    404,
                    'AddressService.deleteAddress'
                );
            }

            return addressDeleted;

        } catch (error) {
            throw new AppError(error.message, 500, "AddressService.deleteAddress");
        }
    }

    async updateAddress({ addressId, addressData }) {
        try {
            if (!isValidId(addressId)) {
                throw new AppError('invalid_id', 400, 'addressService.updateAddress')
            }

            const actualAdress = await Address.findById({ _id: addressId })
            if (!actualAdress) {
                throw new AppError('address_not_found', 404, 'addressService.updateAddress')
            }


            let change = false;
            if (addressData.label !== undefined && actualAdress.label) {
                actualAdress.label = addressData.label
                change = true;
            }
            if (addressData.street !== undefined && actualAdress.street) {
                actualAdress.street = addressData.street
                change = true;
            }
            if (addressData.number !== undefined && actualAdress.number) {
                actualAdress.number = addressData.number
                change = true;
            }
            if (addressData.complement !== undefined && actualAdress.complement) {
                actualAdress.complement = addressData.complement
                change = true;
            }
            if (addressData.neighborhood !== undefined && actualAdress.neighborhood) {
                actualAdress.neighborhood = addressData.neighborhood
                change = true;
            }
            if (addressData.city !== undefined && actualAdress.city) {
                actualAdress.city = addressData.city
                change = true;
            }
            if (addressData.state !== undefined && actualAdress.state) {
                actualAdress.state = addressData.state
                change = true;
            }
            if (addressData.zip_code !== undefined && actualAdress.zip_code) {
                actualAdress.zip_code = addressData.zip_code
                change = true;
            }
            if (addressData.is_default !== undefined && actualAdress.is_default) {
                actualAdress.is_default = addressData.is_default
                change = true;
            }

            if (!change) {
                return actualAdress;
            }

            await actualAdress.save();

            return actualAdress;


        } catch (error) {
            throw new AppError(error.message, 500, "AddressService.updateAddress");
        }
    }






}

export default new AddressService();