import axios from "axios";

import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { AxiosHelper } from "src/helpers/AxiosHelper";
import { ConfirmRegisterResult } from "src/api.models/auth/auth3Page/ConfirmRegisterResult";

/**
 * Verify if the registration token is valid or not.
 *
 * @param {String} token The token to verify if it is valid or not.
 * @returns {Boolean} Returns true if the input token is valid, false otherwise.
 */
async function verifyResetPasswordTokenAsync(token) {
    try {
        await axios({
            url: `${BaseWebApiUrl}/g1/register/${token}`,
            method: HttpMethod.GET,
        });

        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Send the request contains required information to confirm the registration process.
 *
 * @param {String} token The token that contains credentials support user to complete registration process.
 * @param {String} password The password that user want to reset as new.
 * @returns {ConfirmRegisterResult} The result of resetting the password.
 */
async function confirmResetPasswordAsync(token, password) {
    const result = new ConfirmRegisterResult(false, null);

    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/g1/confirm/register`,
            method: HttpMethod.POST,
            data: {
                preRegistrationToken: token,
                password: password,
            },
        });

        result.isSuccess = true;

        return result;
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);

        return result;
    }
}

const Auth5ApiHandler = {
    verifyResetPasswordTokenAsync: verifyResetPasswordTokenAsync,
    confirmResetPasswordAsync: confirmResetPasswordAsync,
};

export { Auth5ApiHandler };
