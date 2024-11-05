import axios from "axios";

import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { useAuthStore } from "src/stores/common/AuthStore";

// Init authStore for later operation.
const authStore = useAuthStore();

/**
 * Verify the input refresh token is available or not.
 *
 * @param {String} accessToken The access token to verify.
 * @param {String} refreshToken The refresh token to verify.
 * @returns {Promise<Boolean>} Returns true if the provided tokens are valid, false otherwise.
 */
async function verifyTokenAsync(accessToken, refreshToken) {
    const apiUrl = `${BaseWebApiUrl}/g35/verify-tokens`;

    try {
        await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            data: {
                refreshToken: refreshToken,
            },
        });

        return true;
    } catch (error) {
        return false;
    }
}

const Auth6ApiHandler = {
    verifyTokenAsync: verifyTokenAsync,
};

export { Auth6ApiHandler };
