import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ApiResponse } from "src/api.models/common/ApiResponse";
import { useAuthStore } from "src/stores/common/AuthStore";

const authStore = useAuthStore();
const getMessageUrl = `${BaseWebApiUrl}/SM7/groups/get`;
const sendMessageApiUrl = `${BaseWebApiUrl}/Chat3/chat/save`;
async function GetMessagesAsync(groupNum) {
    try {
        const response = await axios({
            url: getMessageUrl,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            params: {
                groupId: groupNum,
            },
        });
        return ApiResponse.success(response.data.body);
    } catch (error) {
        console.log(error);

        return ApiResponse.failed();
    }
}

async function SendMessagesAsync(groupNum, content) {
    const requestBody = new FormData();

    requestBody.append("chatGroupId", groupNum);
    requestBody.append("content", content);
    requestBody.append("isReply", false);
    requestBody.append("messageType", 1);
    try {
        const response = await axios({
            url: sendMessageApiUrl,
            method: HttpMethod.POST,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: authStore.bearerAccessToken(),
            },
            data: requestBody,
        });
        return ApiResponse.success(response.data.body);
    } catch (error) {
        console.log(error);

        return ApiResponse.failed();
    }
}

const GetGroupsApiHandler = {
    GetJoinedGroupsAsync: GetMessagesAsync,
    SendMessageAsync: SendMessagesAsync,
};

export default GetGroupsApiHandler;
