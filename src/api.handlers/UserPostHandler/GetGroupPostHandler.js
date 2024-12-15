import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ApiResponse } from "src/api.models/common/ApiResponse";
import { useAuthStore } from "src/stores/common/AuthStore";

const authStore = useAuthStore();
const apiUrl = `${BaseWebApiUrl}/SM11/group-posts/get`;
async function GetGroupPostsAsync(groupId) {
    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            params: {
                groupId: groupId,
            },
        });
        if (response.status === 200) {
            const groupPostsData = response.data.body.groupPosts; // Extract userPosts array

            // Wrap the array in an object with a userPosts key
            return ApiResponse.success(groupPostsData);
        } else {
            console.error("Unexpected response status:", response.status);
            return null;
        }
    } catch (error) {
        console.log(error);
        return ApiResponse.failed();
    }
}

const GetGroupPostHandler = {
    GetGroupPostsAsync: GetGroupPostsAsync,
};

export default GetGroupPostHandler;
