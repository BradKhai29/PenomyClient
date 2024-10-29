const getResetPasswordLinkErrors = {
    UserNotExisted: {
        errorCode: "G34.USER_NOT_EXIST",
        message: "Email chưa được đăng ký",
    },
};

/**
 * Get the error message corresponding to the input error code.
 *
 * @param {String} errorCode The error code the get the message.
 * @returns An error message from the input error code.
 */
function internalGetMessageFromErrorCode(errorCode) {
    switch (errorCode) {
        case getResetPasswordLinkErrors.UserNotExisted.errorCode:
            return getResetPasswordLinkErrors.UserNotExisted.message;

        default:
            return getResetPasswordLinkErrors.UserNotExisted.message;
    }
}

/**
 * An internal class support for representing the result of get reset password link.
 */
class GetResetPasswordLinkResult {
    /**
     *
     *
     * @param {Boolean} isSuccess True if the operation is success.
     * @param {String} message The error message when the operation is failed.
     */
    constructor(isSuccess, message) {
        this.isSuccess = isSuccess;
        this.message = message;
    }

    /**
     * Get the error message corresponding to the input error code.
     *
     * @param {String} errorCode The error code the get the message.
     * @returns An error message from the input error code.
     */
    static getMessageFromErrorCode(errorCode) {
        return internalGetMessageFromErrorCode(errorCode);
    }
}

export { GetResetPasswordLinkResult };
