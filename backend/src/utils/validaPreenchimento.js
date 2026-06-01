export function validaPreenchimento(campo, nomeCampo) {
    if (!campo || campo.trim() === '') {
        return {
            valid: false,
            message: `Campo obrigatório: ${nomeCampo}`
        };
    }

    return {
        valid: true
    };

}