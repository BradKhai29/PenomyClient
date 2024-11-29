import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ApiResponse } from "src/api.models/common/ApiResponse";
import { useAuthStore } from "src/stores/common/AuthStore";

const authStore = useAuthStore();
const apiUrl = `${BaseWebApiUrl}/sm38/group-cover-image/update`;
const apiUrl1 = `${BaseWebApiUrl}/sm38/group-profile/update`;

async function UpdateGroupCoverImageAsync(groupId, coverImage) {
    const requestBody = new FormData();

    requestBody.append("groupId", groupId);
    requestBody.append("coverPhoto", coverImage, coverImage.name);

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: authStore.bearerAccessToken(),
            },
            data: requestBody,
        });

        return ApiResponse.success(response.data.body.imageUrl);
    } catch (error) {
        console.log(error);

        return ApiResponse.failed();
    }
}

async function UpdateGroupDescriptionAsync(groupDetail) {
    console.log(groupDetail.postMode);
    try {
        const response = await axios({
            url: apiUrl1,
            method: HttpMethod.POST,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            data: {
                groupId: groupDetail.id,
                name: groupDetail.name,
                description: groupDetail.description,
                requireApprovedWhenPost: groupDetail.postMode == "Tự do" ? false : true,
            },
        });

        return ApiResponse.success(response.data.body.isSuccess);
    } catch (error) {
        console.log(error);

        return ApiResponse.failed();
    }
}

const UpdateGroupApiHandler = {
    UpdateGroupCoverImageAsync: UpdateGroupCoverImageAsync,
    UpdateGroupDescriptionAsync: UpdateGroupDescriptionAsync,
};

export default UpdateGroupApiHandler;
