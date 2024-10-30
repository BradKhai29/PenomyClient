class CreateArtworkResult {
    /**
     * @param {Boolean} isSuccess True if the result is succes.
     * @param {String} message The error message when the result failed.
     */
    constructor(isSuccess, message) {
        this.isSuccess = isSuccess;
        this.message = message;
    }
}

export { CreateArtworkResult };
