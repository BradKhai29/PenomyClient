import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ApiResponse } from "src/api.models/common/ApiResponse";
import { useAuthStore } from "src/stores/common/AuthStore";

const authStore = useAuthStore();
const apiUrl = `${BaseWebApiUrl}/sm17/like-unlike-posts`;

async function LikeUnlikePostAsync(postId, isGroupPost) {
    try {
        // Make the API call
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            data: {
                postId: postId,
                isGroupPost: isGroupPost,
            },
        });

        return ApiResponse.success(response.data.body);
    } catch (error) {
        console.error("Error getting post comment:", error);

        return ApiResponse.failed();
    }
}

const LikePostHandler = {
    LikeUnlikePostAsync: LikeUnlikePostAsync,
};
export default LikePostHandler;
