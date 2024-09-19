import axios from "axios";
import { AxiosHelper } from "src/helpers/AxiosHelper";
import { HttpMethod } from "src/api.common/HttpMethod";
import { baseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { LoginApiResponse } from "src/api.models/auth/auth01/LoginApiResponse";

const apiUrl = `${baseWebApiUrl}/api/login`;

/**
 *
 * @param {String} email Email of the user account to login.
 * @param {String} password Password the user account to login.
 * @returns {LoginApiResponse} Response contains access token and refresh token.
 */
async function loginAsync(email, password) {
    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            data: {
                email: email,
                password: password,
            },
        });

        const data = response.data;
        return new LoginApiResponse(
            data.accessToken,
            data.refreshToken,
            data.isSuccess
        );
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);
        console.log(axiosError.response.data);

        return LoginApiResponse.failed();
    }
}

const loginApiHandler = {
    login: loginAsync,
};

export { loginApiHandler };
