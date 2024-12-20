import axios from "axios";
import { HttpMethod } from "src/api.common/HttpMethod";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";

// Models for binding api response.
import { UserProfileResponseDto } from "src/api.models/userProfile/userProfile1Page/UserProfileResponseDto";

/**
 * Get the profile information of the specified user with input id.
 *
 * @param {String} accessToken The access token of the user that make the request.
 * @param {String} userId Id of the user to get the profile.
 * @returns {Promise<UserProfileResponseDto>} Promise contains the UserProfileResponseDto instance.
 */
async function getUserProfileAsync(accessToken, userId) {
    const apiUrl = `${BaseWebApiUrl}/g35/user/profile`;
    const MINIMUM_LENGTH = 10;

    if (String(accessToken).length < MINIMUM_LENGTH) {
        accessToken = "accessToken";
    }

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            params: {
                accessToken: accessToken,
                userId: userId,
            },
        });

        const result = UserProfileResponseDto.mapFrom(response.data.body);

        return result;
    } catch (error) {
        return null;
    }
}

const UserProfile1ApiHandler = {
    getUserProfileAsync,
};

export { UserProfile1ApiHandler };
