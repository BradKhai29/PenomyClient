import axios from "axios";

import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { GetRegisterLinkResult } from "src/api.models/auth/auth2Page/GetRegisterLinkResult";
import { AxiosHelper } from "src/helpers/AxiosHelper";

/**
 * Send the request to get the register link from the webapi.
 *
 * @param {String} email The email user used to get the register link.
 * @returns {GetRegisterLinkResult} The result of sending the api to get the register link.
 */
async function getRegisterLinkAsync(email) {
    const result = new GetRegisterLinkResult(false, null);

    try {
        await axios({
            url: `${BaseWebApiUrl}/g1/register`,
            method: HttpMethod.POST,
            data: {
                email: email,
            },
        });

        result.isSuccess = true;

        return result;
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);

        result.message = GetRegisterLinkResult.getMessageFromErrorCode(
            axiosError.response.data.appCode
        );

        return result;
    }
}

const Auth2ApiHandler = {
    getRegisterLinkAsync: getRegisterLinkAsync,
};

export { Auth2ApiHandler };
