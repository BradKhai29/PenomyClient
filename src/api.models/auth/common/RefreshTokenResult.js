const RefreshTokenResults = {
    SUCCESS: {
        code: "G31A.SUCCESS",
        message: "Operation is succces",
    },
    UNAUTHORIZED: {
        code: "G31A.UN_AUTHORIZED",
        message: "Refresh token is expired",
    },
    INPUT_VALIDATION_FAIL: {
        code: "G31A.INPUT_VALIDATION_FAIL",
        message: "Invalid input access token",
    },
    FORBIDDEN: {
        code: "G31A.FORBIDDEN",
        message: "Input tokens are invalid to process",
    },
    ACCESS_TOKEN_IS_NOT_EXPIRED: {
        code: "G31A.ACCESS_TOKEN_IS_NOT_EXPIRED",
        message: "Access token is not expired",
    },
};

/**
 * Get the error message corresponding to the input error code.
 *
 * @param {String} errorCode The error code the get the message.
 * @returns {String} An error message from the input error code.
 */
function getMessageFromErrorCode(errorCode) {
    switch (errorCode) {
        case RefreshTokenResults.SUCCESS.code:
            return RefreshTokenResults.SUCCESS.message;

        case RefreshTokenResults.FORBIDDEN.code:
            return RefreshTokenResults.FORBIDDEN.message;

        case RefreshTokenResults.INPUT_VALIDATION_FAIL.code:
            return RefreshTokenResults.INPUT_VALIDATION_FAIL.message;

        case RefreshTokenResults.UNAUTHORIZED.code:
            return RefreshTokenResults.UNAUTHORIZED.message;

        case RefreshTokenResults.ACCESS_TOKEN_IS_NOT_EXPIRED.code:
            return RefreshTokenResults.ACCESS_TOKEN_IS_NOT_EXPIRED.message;

        default:
            return RefreshTokenResults.UNAUTHORIZED.message;
    }
}

/**
 * A class that used to present the result of refresh token operation.
 */
class RefreshTokenResult {
    /**
     * @param {Boolean} isSuccess True if the operation is succes. Otherwise, false.
     * @param {String} accessToken New access token value when operation is success.
     * @param {String} resultCode Result code of the operation.
     * @param {String} errorMessage Error message when operation is failed.
     */
    constructor(isSuccess, accessToken, resultCode, errorMessage) {
        this.isSuccess = isSuccess;
        this.accessToken = accessToken;
        this.resultCode = resultCode;
        this.errorMessage = errorMessage;
    }

    /**
     * Return a failed-result instance of this class based on input errorCode.
     *
     * @param {String} [errorCode=RefreshTokenResults.FORBIDDEN.code] Error code the init a failed instance. (If no error is indicated, default will be RefreshTokenResults.FORBIDDEN.code)
     * @returns {RefreshTokenResult} A failed instance with specified error code.
     */
    static failedWithErrorCode(errorCode = RefreshTokenResults.FORBIDDEN.code) {
        const failedResult = new RefreshTokenResult(false);

        failedResult.resultCode = errorCode;
        failedResult.errorMessage = getMessageFromErrorCode(errorCode);

        return failedResult;
    }

    /**
     * A short-hand method to return a success instance.
     *
     * @returns {RefreshTokenResult} A success instance of this class.
     */
    static success(newAccessToken) {
        return new RefreshTokenResult(
            true,
            newAccessToken,
            RefreshTokenResults.SUCCESS.code
        );
    }
}

export { RefreshTokenResult, RefreshTokenResults };
