import axios from "axios";

import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { VerifyResetPasswordTokenResult } from "src/api.models/auth/auth5Page/VerifyResetPasswordTokenResult";

/**
 * Verify if the registration token is valid or not.
 *
 * @param {String} token The token to verify if it is valid or not.
 * @returns {Promise<VerifyResetPasswordTokenResult>} Return the promise contains the result of token verification.
 */
async function verifyResetPasswordTokenAsync(token) {
    const result = new VerifyResetPasswordTokenResult(false, null);

    try {
        const resposne = await axios({
            url: `${BaseWebApiUrl}/g34/forgot-password/verify`,
            method: HttpMethod.POST,
            data: {
                resetPasswordToken: token,
            },
        });

        // Get the email get from the verification result.
        result.isValid = true;
        result.email = resposne.data.body.email;
    } catch (error) {}

    return result;
}

/**
 * Send the request contains required information to confirm the registration process.
 *
 * @param {String} token The token that contains credentials support user to complete registration process.
 * @param {String} password The password that user want to reset as new.
 * @returns {Boolean} The result of resetting the password.
 */
async function confirmResetPasswordAsync(token, password) {
    try {
        await axios({
            url: `${BaseWebApiUrl}/g34/forgot-password/complete`,
            method: HttpMethod.POST,
            data: {
                resetPasswordToken: token,
                newPassword: password,
            },
        });

        return true;
    } catch (error) {
        return false;
    }
}

const Auth5ApiHandler = {
    verifyResetPasswordTokenAsync: verifyResetPasswordTokenAsync,
    confirmResetPasswordAsync: confirmResetPasswordAsync,
};

export { Auth5ApiHandler };
