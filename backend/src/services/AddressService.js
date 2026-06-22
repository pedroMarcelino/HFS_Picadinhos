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
                "complement",
                "neighborhood",
                "city",
                "state",
                "zip_code",
                "is_default",
            ], 'AddressService.createAddress');

            if (!isValidId(data['user_id'])) {
                throw new AppError('invalid_id', 400, 'AddressService.createAddress')
            }

            const user = await User.findById(data['user_id']);
            if (!user) {
                throw new AppError('user_not_found', 404, 'AddressService.createAddress')
            }

            const addressSave = await Address.create(data)

            //antes de salvar verificar se usuario ja nao tem casa defalt

            return addressSave;

        } catch (error) {
            throw new AppError(error.message, 500, "AddressService.createAddress");
        }
    }

}

export default new AddressService();