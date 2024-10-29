import axios from "axios";

import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { AxiosHelper } from "src/helpers/AxiosHelper";
import { ConfirmRegisterResult } from "src/api.models/auth/auth3Page/ConfirmRegisterResult";

/**
 * Verify if the registration token is valid or not.
 *
 * @param {String} registrationToken The token to verify if it is valid or not.
 * @returns {Boolean} Returns true if the input token is valid, false otherwise.
 */
async function verifyRegistrationTokenAsync(registrationToken) {
    try {
        await axios({
            url: `${BaseWebApiUrl}/g1/register/verify`,
            data: {
                registrationToken: `${registrationToken}`,
            },
            method: HttpMethod.POST,
        });

        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Send the request contains required information to confirm the registration process.
 *
 * @param {String} registrationToken The token that contains credentials support user to complete registration process.
 * @param {String} nickname The nickname that user used to create a new account.
 * @param {String} password The password that user used to create a new account..
 * @returns {ConfirmRegisterResult} The result of confirming the register link.
 */
async function confirmRegisterAsync(registrationToken, nickname, password) {
    const result = new ConfirmRegisterResult(false, null);

    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/g1/register/complete`,
            method: HttpMethod.POST,
            data: {
                preRegistrationToken: registrationToken,
                confirmedNickname: nickname,
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

const Auth3ApiHandler = {
    verifyRegistrationTokenAsync: verifyRegistrationTokenAsync,
    confirmRegisterAsync: confirmRegisterAsync,
};

export { Auth3ApiHandler };
