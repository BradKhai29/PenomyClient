import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ApiResponse } from "src/api.models/common/ApiResponse";
import { useAuthStore } from "src/stores/common/AuthStore";

const authStore = useAuthStore();
const apiUrl = `${BaseWebApiUrl}/sm8/groups/create`;

async function CreateGroupAsync(groupDetail) {
    const requestBody = new FormData();
    
    requestBody.append("name", groupDetail.groupName);
    requestBody.append("description", groupDetail.groupDescription);
    requestBody.append("isPublic", groupDetail.isPublic.value);
    requestBody.append("requireApprovedWhenPost", groupDetail.postMode.value);
    requestBody.append(
        "coverPhoto",
        groupDetail.coverImage,
        groupDetail.coverImage.name
    );
    
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

        return ApiResponse.success(response.data.body.groupId);
    } catch (error) {
        console.log(error);

        return ApiResponse.failed();
    }
}

const CreateGroupApiHandler = {
    CreateGroup: CreateGroupAsync,
};

export default CreateGroupApiHandler;
