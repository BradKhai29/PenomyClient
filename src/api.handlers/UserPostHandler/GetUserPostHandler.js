import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ApiResponse } from "src/api.models/common/ApiResponse";
import { useAuthStore } from "src/stores/common/AuthStore";
import { UserPostResponseDto } from "src/api.models/userpost/UserPostResponseDto";

const authStore = useAuthStore();
const apiUrl = `${BaseWebApiUrl}/sm15/posts/get`;

async function GetCreatedPostsAsync() {
    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
        });
        if (response.status === 200) {
            const userPostsData = response.data.body.userPosts; // Extract userPosts array
            console.log(userPostsData);

            // Wrap the array in an object with a userPosts key
            return new UserPostResponseDto({ userPosts: userPostsData });
        } else {
            console.error("Unexpected response status:", response.status);
            return null;
        }
    } catch (error) {
        console.log(error);
        return ApiResponse.failed();
    }
}

const GetUserPostHandler = {
    GetCreatedPosts: GetCreatedPostsAsync,
};

export default GetUserPostHandler;
