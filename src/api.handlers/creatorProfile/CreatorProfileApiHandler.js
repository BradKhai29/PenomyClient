import axios from "axios";
import { HttpMethod } from "src/api.common/HttpMethod";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";

// Models for binding api response.
import { UserProfileResponseDto } from "src/api.models/userProfile/userProfile1Page/UserProfileResponseDto";

/**
 * Get the profile information of the specified creator with input id.
 *
 * @param {String} creatorId Id of the creator to get the profile.
 * @returns {Promise<UserProfileResponseDto>} Promise contains the UserProfileResponseDto instance.
 */
async function getProfileAsync(creatorId) {
    const apiUrl = `${BaseWebApiUrl}/g35/creator/profile`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            params: {
                creatorId: creatorId,
            },
        });

        const result = UserProfileResponseDto.mapFrom(response.data.body);

        return result;
    } catch (error) {
        return null;
    }
}

const CreatorProfileApiHandler = {
    getProfileAsync,
};

export { CreatorProfileApiHandler };
