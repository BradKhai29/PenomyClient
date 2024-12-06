import axios from "axios";
import { AxiosHelper } from "src/helpers/AxiosHelper";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { useAuthStore } from "src/stores/common/AuthStore";
const authStore = useAuthStore();
async function RemoveUserPostAsync(postId) {
    try {
        const url = `${BaseWebApiUrl}/sm14/remove`;
        const response = await axios({
            url: url,
            method: HttpMethod.POST,
            data: { postId: postId },
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
        });
        const res = response.data;
        if (res.httpCode === 200) {
            return true;
        }
        return false;
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);
        console.log(axiosError);
    }
}

const RemoveUserPostHandler = {
    RemoveUserPostAsync: RemoveUserPostAsync,
};

export default RemoveUserPostHandler;
