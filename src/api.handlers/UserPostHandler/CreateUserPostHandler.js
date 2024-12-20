import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ApiResponse } from "src/api.models/common/ApiResponse";
import { useAuthStore } from "src/stores/common/AuthStore";

const authStore = useAuthStore();
const apiUrl = `${BaseWebApiUrl}/SM12/post/create`;
async function CreatePostAsync(postDetail) {
    const requestBody = new FormData();

    // Append text fields
    requestBody.append("title", postDetail.title);
    requestBody.append("allowComment", postDetail.allowComment);
    requestBody.append("publicLevel", postDetail.publicLevel);

    postDetail.attachedMedia.forEach((file, index) => {
        console.log("File:", file);
        requestBody.append("attachedMedia", file, file.name);
    });

    try {
        // Make the API call
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: authStore.bearerAccessToken(),
            },
            data: requestBody,
        });

        return ApiResponse.success(response.data.body);
    } catch (error) {
        console.error("Error creating post:", error);

        return ApiResponse.failed();
    }
}

const CreateUserPostHandler = {
    CreatePostAsync: CreatePostAsync,
};
export default CreateUserPostHandler;
