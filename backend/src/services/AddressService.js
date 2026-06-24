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



}

export default new AddressService();