import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ApiResponse } from "src/api.models/common/ApiResponse";
import { useAuthStore } from "src/stores/common/AuthStore";

const authStore = useAuthStore();
const apiUrl = `${BaseWebApiUrl}/sm24/post-comment/create`;

async function CreatePostCommentAsync(comment, postId) {
    try {
        // Make the API call
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            headers: {
                
                Authorization: authStore.bearerAccessToken(),
            },
            data: {
                commentContent: comment,
                postId: postId
            },
        });

        return ApiResponse.success(response.data.body);
    } catch (error) {
        console.error("Error creating post comment:", error);

        return ApiResponse.failed();
    }
}

const PostCommentApiHandler = {
    CreatePostCommentAsync: CreatePostCommentAsync,
};
export default PostCommentApiHandler;