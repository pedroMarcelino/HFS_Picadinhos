export function validaEmail(email) {

    if (!email || email.trim() === '') {
        return {
            valid: false,
            code: "email_required"
        };
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        return {
            valid: false,
            code: "invalid_email"
        };

    }

    return {
        valid: true
    };
}