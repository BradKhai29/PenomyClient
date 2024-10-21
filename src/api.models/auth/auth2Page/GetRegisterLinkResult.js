class GetRegisterLinkResult {
    /**
     * Constructor to initialize new GetRegisterLinkResult instance
     *
     * @param {Boolean} isSuccess True if result is success, false otherwise.
     * @param {String} message The message when the result is failed.
     */
    constructor(isSuccess, message) {
        this.isSuccess = isSuccess;
        this.message = message;
    }
}

export { GetRegisterLinkResult };
