import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ApiResponse } from "src/api.models/common/ApiResponse";
import { useAuthStore } from "src/stores/common/AuthStore";

const authStore = useAuthStore();
const getMemberApiUrl = `${BaseWebApiUrl}/sm39/group-member/get`;
const changeMemberRoleApiUrl = `${BaseWebApiUrl}/sm40/group-member/assign-role`;

async function RemoveGroupMemberAsync(groupId, memberId) {
    const removeMemberApiUrl = `${BaseWebApiUrl}/sm41/group-member/remove/${groupId}/${memberId}`;
    try {
        const response = await axios({
            url: removeMemberApiUrl,
            method: HttpMethod.DELETE,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            // params: {
            //     groupId: groupId,
            //     memberId: memberId,
            // },
        });
        return ApiResponse.success(response.data.body);
    } catch (error) {
        console.log(error);

        return ApiResponse.failed();
    }
}

async function GetGroupMemberAsync(groupId, memberId) {
    try {
        const response = await axios({
            url: getMemberApiUrl,
            method: HttpMethod.GET,
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

async function ChangeMemberRoleAsync(groupId, memberId) {
    try {
        const response = await axios({
            url: changeMemberRoleApiUrl,
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

const GroupMemberApiHandler = {
    RemoveGroupMemberAsync: RemoveGroupMemberAsync,
    GetGroupMemberAsync: GetGroupMemberAsync,
    ChangeMemberRoleAsync: ChangeMemberRoleAsync
};

export default GroupMemberApiHandler;
