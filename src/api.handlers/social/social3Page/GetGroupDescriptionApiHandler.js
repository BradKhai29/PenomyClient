import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ApiResponse } from "src/api.models/common/ApiResponse";
import { useAuthStore } from "src/stores/common/AuthStore";

const authStore = useAuthStore();
const apiUrl = `${BaseWebApiUrl}/sm5/group-description/get`;

async function GetGroupDescriptionAsync(groupId) {
    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            params: {
                groupId: groupId,
                accessToken: authStore.bearerAccessToken(),
            },
        });
        return ApiResponse.success(response.data.body);
    } catch (error) {
        console.log(error);

        return ApiResponse.failed();
    }
}

const GetGroupDescriptionApiHandler = {
    GetGroupDescription: GetGroupDescriptionAsync,
};

export default GetGroupDescriptionApiHandler;
