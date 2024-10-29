class VerifyResetPasswordTokenResult {
    /**
     *
     * @param {Boolean} isValid Check if the reset password token is valid or not.
     * @param {String} email The email of the account that wanted to reset the password.
     */
    constructor(isValid, email) {
        this.isValid = isValid;
        this.email = email;
    }
}

export { VerifyResetPasswordTokenResult };
