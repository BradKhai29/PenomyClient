import axios from "axios";
import { HttpMethod } from "src/api.common/HttpMethod";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { RefreshTokenResult } from "src/api.models/auth/common/RefreshTokenResult";
import { AxiosHelper } from "src/helpers/AxiosHelper";

/**
 * Refresh the given access token and refresh token with provided tokens.
 *
 * @param {String} bearerAccessToken Access token with bearer prefix that used to do operation.
 * @param {String} refreshToken Refresh token that used to do operation.
 * @returns {Promise<RefreshTokenResult>} A promise contains the result of the operation.
 */
async function refreshTokensAsync(bearerAccessToken, refreshToken) {
    const apiUrl = `${BaseWebApiUrl}/g31a/refresh-access-token`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            headers: {
                Authorization: bearerAccessToken,
            },
            data: {
                refreshToken: refreshToken,
            },
        });

        return RefreshTokenResult.success(response.data.body.accessToken);
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);
        console.log("Error", axiosError);

        return RefreshTokenResult.failedWithErrorCode();
    }
}

const RefreshTokenApiHandler = {
    refreshTokensAsync: refreshTokensAsync,
};

export { RefreshTokenApiHandler };
