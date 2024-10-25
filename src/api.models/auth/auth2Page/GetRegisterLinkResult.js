const getRegisterLinkErrors = {
    UserExisted: {
        errorCode: "G1.USER_EXIST",
        message: "Email này đã được đăng ký",
    },
    SendMailFailed: {
        errorCode: "G1.SENDING_MAIL_FAILED",
        message: "Có lỗi xảy ra khi gửi mail",
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
        case getRegisterLinkErrors.UserExisted.errorCode:
            return getRegisterLinkErrors.UserExisted.message;

        case getRegisterLinkErrors.SendMailFailed.errorCode:
            return getRegisterLinkErrors.SendMailFailed.message;

        default:
            return "Có lỗi xảy ra khi lấy link đăng ký";
    }
}

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

export { GetRegisterLinkResult };
