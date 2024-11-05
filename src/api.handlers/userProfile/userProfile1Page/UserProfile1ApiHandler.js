import axios from "axios";
import { HttpMethod } from "src/api.common/HttpMethod";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { UserProfileResponseDto } from "src/api.models/userProfile/userProfile1Page/UserProfileResponseDto";

/**
 * Get the profile information of the user with input access token.
 *
 * @param {String} accessToken The access token of the user to get profile.
 * @returns {Promise<UserProfileResponseDto>} Promise contains the UserProfileResponseDto instance.
 */
async function getUserProfileAsync(accessToken) {
    const apiUrl = `${BaseWebApiUrl}/g35/user/profile`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        return UserProfileResponseDto.mapFrom(response.data.body);
    } catch (error) {
        return null;
    }
}

const UserProfile1ApiHandler = {
    getUserProfileAsync: getUserProfileAsync,
};

export { UserProfile1ApiHandler };
