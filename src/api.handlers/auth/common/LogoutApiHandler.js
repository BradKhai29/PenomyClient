import axios from "axios";
import { HttpMethod } from "src/api.common/HttpMethod";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";

/**
 * Log out the current user from the system.
 *
 * @param {string} bearerAccessToken Access token with Bearer prefix that used to logout current user.
 */
async function logoutAsync(bearerAccessToken) {
    try {
        const apiUrl = `${BaseWebApiUrl}/g33/logout`;

        await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            headers: {
                Authorization: bearerAccessToken,
            },
        });

        return true;
    } catch (error) {
        return false;
    }
}

const LogoutApiHandler = {
    logoutAsync: logoutAsync,
};

export { LogoutApiHandler };
