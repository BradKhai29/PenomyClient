import axios from "axios";
import { HttpMethod } from "src/api.common/HttpMethod";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { UserProfileResponseDto } from "src/api.models/userProfile/userProfile1Page/UserProfileResponseDto";
import { ApiResponse } from "src/api.models/common/ApiResponse";

/**
 * Update the current user profile.
 *
 * @param {UserProfileResponseDto} userProfile Profile detail to update.
 * @param {File} avatarImageFile Avatar image file that upload with.
 * @param {String} bearerAccessToken Bearer access token of current user.
 * @returns {Promise<ApiResponse> | null} The api response that contains the new user avatar URL. Or null if failed to call api.
 */
async function updateProfileAsync(
    userProfile,
    avatarImageFile,
    bearerAccessToken
) {
    const apiUrl = `${BaseWebApiUrl}/g36/user/profile`;

    try {
        const requestBody = new FormData();

        requestBody.append("nickname", userProfile.nickname);
        requestBody.append("aboutMe", userProfile.aboutMe);

        if (avatarImageFile) {
            requestBody.append(
                "AvatarFile",
                avatarImageFile,
                avatarImageFile.name
            );
        }

        const response = await axios({
            url: apiUrl,
            method: HttpMethod.PATCH,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: bearerAccessToken,
            },
            data: requestBody,
        });

        const newAvatarUrl = response.data.body.newAvatarUrl;

        return ApiResponse.success(newAvatarUrl);
    } catch (error) {
        return ApiResponse.failed();
    }
}

const UpdateProfileApiHandler = {
    updateProfileAsync,
};

export { UpdateProfileApiHandler };
