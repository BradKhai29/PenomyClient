class ConfirmRegisterResult {
    /**
     * Constructor to initialize new ConfirmRegisterResult instance
     *
     * @param {Boolean} isSuccess True if result is success, false otherwise.
     * @param {String} message The message when the result is failed.
     * @param {String} accessToken The access token returned with the result from api.
     * @param {String} refreshToken The refresh token returned with the result from api.
     */
    constructor(isSuccess, message, accessToken, refreshToken) {
        this.isSuccess = isSuccess;
        this.message = message;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }
}

export { ConfirmRegisterResult };
