import axios from "axios";
import { AxiosHelper } from "src/helpers/AxiosHelper";
import { HttpMethod } from "src/api.common/HttpMethod";
import { LoginApiResponse } from "src/api.models/auth/auth1Page/LoginApiResponse";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";

const apiUrl = `${BaseWebApiUrl}/g31/login`;

/**
 * Send the request to login webapi.
 *
 * @param {String} email Email of the user account to login.
 * @param {String} password Password the user account to login.
 * @param {Boolean} rememberMe Indicate to remember the login or not to generate different access & refresh token (default is false).
 * @returns {Promise<LoginApiResponse>} Response contains access token and refresh token.
 */
async function loginAsync(email, password) {
    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            data: {
                email: email,
                password: password,
                rememberMe: true,
            },
        });

        const apiResponse = LoginApiResponse.mapFrom(response.data.body);

        return apiResponse;
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);
        const errorMessage = LoginApiResponse.getMessageFromErrorCode(
            axiosError.response.data.appCode
        );

        return LoginApiResponse.failed(errorMessage);
    }
}

const LoginApiHandler = {
    loginAsync: loginAsync,
};

export { LoginApiHandler };
