

export function isValidEmail(email : string): boolean {
    const emailRegx = /\S+@\S+\.\S+/;
    return emailRegx.test(email)
}