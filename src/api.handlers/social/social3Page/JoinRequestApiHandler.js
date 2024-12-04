import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ApiResponse } from "src/api.models/common/ApiResponse";
import { useAuthStore } from "src/stores/common/AuthStore";

const authStore = useAuthStore();
const joinApiUrl = `${BaseWebApiUrl}/sm44/group-join-request/create`;
const getRequestApiUrl = `${BaseWebApiUrl}/sm42/group-join-request/get`;
const acceptRequestApiUrl = `${BaseWebApiUrl}/sm43/group-join-request/accept`;
const cancelRequestApiUrl = `${BaseWebApiUrl}/sm45/group-join-request/cancel`;
const rejectRequestApiUrl = `${BaseWebApiUrl}/sm46/group-join-request/reject`;

async function JoinGroupAsync(groupId) {
    try {
        const response = await axios({
            url: joinApiUrl,
            method: HttpMethod.POST,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            data: {
                groupId: groupId,
            },
        });
        return ApiResponse.success(response.data.body);
    } catch (error) {
        console.log(error);

        return ApiResponse.failed();
    }
}

async function GetJoinRequestAsync(groupId) {
    try {
        const response = await axios({
            url: getRequestApiUrl,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            params: {
                groupId: groupId,
            },
        });
        return ApiResponse.success(response.data.body);
    } catch (error) {
        console.log(error);

        return ApiResponse.failed();
    }
}

async function AcceptJoinRequestAsync(groupId, memberId) {
    try {
        const response = await axios({
            url: acceptRequestApiUrl,
            method: HttpMethod.POST,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            data: {
                groupId: groupId,
                memberId: memberId,
            },
        });
        return ApiResponse.success(response.data.body);
    } catch (error) {
        console.log(error);

        return ApiResponse.failed();
    }
}

async function CancelJoinRequestAsync(groupId) {
    try {
        const response = await axios({
            url: cancelRequestApiUrl,
            method: HttpMethod.DELETE,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            params: {
                groupId: groupId,
            },
        });
        return ApiResponse.success(response.data.body);
    } catch (error) {
        console.log(error);

        return ApiResponse.failed();
    }
}

async function RejectJoinRequestAsync(groupId, memberId) {
    try {
        const response = await axios({
            url: rejectRequestApiUrl,
            method: HttpMethod.DELETE,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            params: {
                groupId: groupId,
                memberId: memberId
            },
        });
        return ApiResponse.success(response.data.body);
    } catch (error) {
        console.log(error);

        return ApiResponse.failed();
    }
}

const JoinRequestApiHandler = {
    JoinGroupAsync: JoinGroupAsync,
    GetJoinRequestAsync: GetJoinRequestAsync,
    AcceptJoinRequestAsync: AcceptJoinRequestAsync,
    CancelJoinRequestAsync: CancelJoinRequestAsync,
    RejectJoinRequestAsync: RejectJoinRequestAsync
};

export default JoinRequestApiHandler;
