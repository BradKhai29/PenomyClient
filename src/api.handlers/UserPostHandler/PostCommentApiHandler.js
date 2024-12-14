import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ApiResponse } from "src/api.models/common/ApiResponse";
import { useAuthStore } from "src/stores/common/AuthStore";

const authStore = useAuthStore();
const getCommentApiUrl = `${BaseWebApiUrl}/sm23/post-comment/get`;
const createCommentApiUrl = `${BaseWebApiUrl}/sm24/post-comment/create`;
const editCommentApiUrl = `${BaseWebApiUrl}/sm25/post-comment/update`;

async function GetPostCommentAsync(postId) {
    try {
        // Make the API call
        const response = await axios({
            url: getCommentApiUrl,
            method: HttpMethod.POST,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            data: {
                postId: postId,
            },
        });

        return ApiResponse.success(response.data.body);
    } catch (error) {
        console.error("Error getting post comment:", error);

        return ApiResponse.failed();
    }
}

async function CreatePostCommentAsync(comment, postId) {
    try {
        // Make the API call
        const response = await axios({
            url: createCommentApiUrl,
            method: HttpMethod.POST,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            data: {
                commentContent: comment,
                postId: `${postId}`,
            },
        });
        
        console.log(typeof(postId));
        return ApiResponse.success(response.data.body);
    } catch (error) {
        console.error("Error creating post comment:", error);

        return ApiResponse.failed();
    }
}

async function UpdatePostCommentAsync(comment, commentId) {
    try {
        // Make the API call
        const response = await axios({
            url: editCommentApiUrl,
            method: HttpMethod.POST,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            data: {
                commentContent: comment,
                commentId: commentId,
            },
        });

        return ApiResponse.success(response.data.body);
    } catch (error) {
        console.error("Error editting post comment:", error);

        return ApiResponse.failed();
    }
}

const PostCommentApiHandler = {
    GetPostCommentAsync: GetPostCommentAsync,
    CreatePostCommentAsync: CreatePostCommentAsync,
    UpdatePostCommentAsync: UpdatePostCommentAsync,
};
export default PostCommentApiHandler;
