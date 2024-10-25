import { UserProfile } from "./UserProfile";

/**
 * The api response returned from the login api.
 */
class LoginApiResponse {
    /**
     * @param {Boolean} isSuccess Check if login process is success or not.
     * @param {String} accessToken The access token that returned with this api response.
     * @param {String} refreshToken The refresh token that returned with this api response.
     * @param {UserProfile} user The user profile that returned with this api response.
     */
    constructor(isSuccess, accessToken, refreshToken, user) {
        this.isSuccess = isSuccess;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.user = user;
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
     * The short hand to return a failed instance of LoginApiResponse.
     *
     * @returns {LoginApiResponse} The failed instance of login api response.
     */
    static failed() {
        return new LoginApiResponse(false);
    }
}

export { LoginApiResponse };
