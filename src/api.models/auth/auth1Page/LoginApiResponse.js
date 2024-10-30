import { UserProfile } from "./UserProfile";

const loginErrors = {
    UserNotFound: {
        errorCode: "G31.USER_NOT_FOUND",
        message: "Email chưa được đăng ký",
    },
    InvalidLogin: {
        errorCode: "G31.PASSWORD_IS_INCORRECT",
        message: "Thông tin đăng nhập không đúng",
    },
};

/**
 * The api response returned from the login api.
 */
class LoginApiResponse {
    /**
     * @param {Boolean} isSuccess Check if login process is success or not.
     * @param {String} accessToken The access token that returned with this api response.
     * @param {String} refreshToken The refresh token that returned with this api response.
     * @param {UserProfile} user The user profile that returned with this api response.
     * @param {String} errorMessage The error message when login failed.
     */
    constructor(isSuccess, accessToken, refreshToken, user, errorMessage) {
        this.isSuccess = isSuccess;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.user = user;
        this.errorMessage = errorMessage;
    }

    /**
     * Map the input api response body to LoginApiResponse
     *
     * @param {LoginApiResponse} apiResponseBody The received body
     * @returns {LoginApiResponse} The login api response after mapped success.
     */
    static mapFrom(apiResponseBody) {
        const accessToken = apiResponseBody.accessToken;
        const refreshToken = apiResponseBody.refreshToken;
        const userProfile = apiResponseBody.user;

        return new LoginApiResponse(
            true,
            accessToken,
            refreshToken,
            userProfile
        );
    }

    /**
     * Get the error message corresponding to the input error code.
     *
     * @param {String} errorCode The error code the get the message.
     * @returns An error message from the input error code.
     */
    static getMessageFromErrorCode(errorCode) {
        switch (errorCode) {
            case loginErrors.UserNotFound.errorCode:
                return loginErrors.UserNotFound.message;

            default:
                return loginErrors.InvalidLogin.message;
        }
    }

    /**
     * The short hand to return a failed instance of LoginApiResponse.
     *
     * @param {String} errorMessage The error message belonged to this api response.
     * @returns {LoginApiResponse} The failed instance of login api response.
     */
    static failed(errorMessage) {
        const result = new LoginApiResponse(false);
        result.errorMessage = errorMessage;

        return result;
    }
}

export { LoginApiResponse };
