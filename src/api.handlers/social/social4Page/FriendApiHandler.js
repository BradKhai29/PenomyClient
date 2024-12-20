import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ApiResponse } from "src/api.models/common/ApiResponse";
import { useAuthStore } from "src/stores/common/AuthStore";

const authStore = useAuthStore();
const getFriendsApiUrl = `${BaseWebApiUrl}/SM32/friends/get`;
const addFriendApiUrl = `${BaseWebApiUrl}/SM30/friend/add`;
const unsendaddFriendApiUrl = `${BaseWebApiUrl}/SM30/friend-request/remove`;
const acceptFriendApiUrl = `${BaseWebApiUrl}/SM49/friends/accept`;

async function RemoveFriendAsync(friendId) {
    const removeMemberApiUrl = `${BaseWebApiUrl}/SM31/friend/remove`;
    try {
        const response = await axios({
            url: removeMemberApiUrl,
            method: HttpMethod.POST,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            data: {
                friendId: friendId,
            },
        });
        return ApiResponse.success(response.data.body);
    } catch (error) {
        console.log(error);

        return ApiResponse.failed();
    }
}
async function AcceptFriendAsync(friendId) {
    try {
        const response = await axios({
            url: acceptFriendApiUrl,
            method: HttpMethod.POST,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            data: {
                friendId: friendId,
            },
        });
        return ApiResponse.success(response.data.body);
    } catch (error) {
        console.log(error);

        return ApiResponse.failed();
    }
}
async function GetFriendsAsync() {
    try {
        const response = await axios({
            url: getFriendsApiUrl,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
        });
        return ApiResponse.success(response.data.body);
    } catch (error) {
        console.log(error);

        return ApiResponse.failed();
    }
}

async function AddFriendAsync(friendId) {
    try {
        const response = await axios({
            url: addFriendApiUrl,
            method: HttpMethod.POST,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            data: {
                friendId: friendId,
            },
        });
        return ApiResponse.success(response.data.body);
    } catch (error) {
        console.log(error);

        return ApiResponse.failed();
    }
}
async function UnsendFriendAsync(friendId) {
    try {
        const response = await axios({
            url: unsendaddFriendApiUrl,
            method: HttpMethod.POST,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            data: {
                friendId: friendId,
            },
        });
        return ApiResponse.success(response.data.body);
    } catch (error) {
        console.log(error);

        return ApiResponse.failed();
    }
}

const FriendApiHandler = {
    RemoveFriendAsync: RemoveFriendAsync,
    GetFriendsAsync: GetFriendsAsync,
    AddFriendAsync: AddFriendAsync,
    UnsendFriendAsync: UnsendFriendAsync,
    AcceptFriendAsync: AcceptFriendAsync,
};

export default FriendApiHandler;
