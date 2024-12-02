import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ApiResponse } from "src/api.models/common/ApiResponse";
import { useAuthStore } from "src/stores/common/AuthStore";

const authStore = useAuthStore();
const apiUrl = `${BaseWebApiUrl}/sm9/created-groups/get`;

async function GetCreatedGroupsAsync(maxRecord) {
    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            params: {
                maxRecord: maxRecord
            },
        });
        return ApiResponse.success(response.data.body.groupList);
    } catch (error) {
        console.log(error);

        return ApiResponse.failed();
    }
}

const MyCreatedGroupsApiHandler = {
    MyCreatedGroups: GetCreatedGroupsAsync,
};

export default MyCreatedGroupsApiHandler;
