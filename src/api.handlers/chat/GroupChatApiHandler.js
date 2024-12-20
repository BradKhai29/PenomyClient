import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ApiResponse } from "src/api.models/common/ApiResponse";
import { useAuthStore } from "src/stores/common/AuthStore";

const authStore = useAuthStore();
const getMessageUrl = `${BaseWebApiUrl}/Chat10/chat-groups/get`;

async function GetGroupChatMesssagesAsync(
    groupChatId,
    pageNum,
    chatNum
) {
    try {
        const response = await axios({
            url: getMessageUrl,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            params: {
                groupChatId: "1",
                pageNum: "1",
                chatNum: "20"
            },
        });
        console.log(response.data.body);

        return ApiResponse.success(response.data.body);
    } catch (error) {
        console.log(error);

        return ApiResponse.failed();
    }
}

const GroupChatApiHandler = {
    GetGroupChatMesssagesAsync: GetGroupChatMesssagesAsync,
};

export default GroupChatApiHandler;
