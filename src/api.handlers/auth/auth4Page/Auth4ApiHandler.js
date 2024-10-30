import axios from "axios";

import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { GetResetPasswordLinkResult } from "src/api.models/auth/auth4Page/GetResetPasswordLinkResult";
import { AxiosHelper } from "src/helpers/AxiosHelper";

/**
 * Verify if the registration token is valid or not.
 *
 * @param {String} email The email of account that need to get reset the password link.
 * @returns {Promise<GetResetPasswordLinkResult>} Return the promise contains the result of get reset password link.
 */
async function getResetPasswordLinkAsync(email) {
    const result = new GetResetPasswordLinkResult(false, null);

    try {
        await axios({
            url: `${BaseWebApiUrl}/g34/forgot-password`,
            method: HttpMethod.POST,
            data: {
                email: email,
            },
        });

        // Get the email get from the verification result.
        result.isSuccess = true;
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);

        result.message = GetResetPasswordLinkResult.getMessageFromErrorCode(
            axiosError.response.data.appCode
        );
    }

    return result;
}

const Auth4ApiHandler = {
    getResetPasswordLinkAsync: getResetPasswordLinkAsync,
};

export { Auth4ApiHandler };
