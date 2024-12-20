import axios from "axios";
import { HttpMethod } from "src/api.common/HttpMethod";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";

async function registerAsync(bearerAccessToken) {
    const apiUrl = `${BaseWebApiUrl}/g37/become-creator`;

    try {
        await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            headers: {
                Authorization: bearerAccessToken,
            },
            data: {
                empty: true,
            },
        });

        return true;
    } catch (error) {
        console.log(error);

        return false;
    }
}

const BecomeCreatorApiHandler = {
    registerAsync,
};

export { BecomeCreatorApiHandler };
