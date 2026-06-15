import { AppError } from './appError.js';

//funcao para validar campos se estao preenchidos, 
// data = dados | fields = nome_dos_campos | source = caminho da onde esta vindo o error
export function validateRequired(data, fields, source) {
    for (const field of fields) {
        const value = data[field];

        if (
            value === undefined ||
            value === null ||
            value === ''
        ) {
            throw new AppError(
                `${field}_required`,
                400,
                source
            );
        }
    }
}