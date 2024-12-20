import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { FollowedCreatorProfileResponseItem } from "src/api.models/userProfile/userProfile1Page/FollowedCreatorProfileResponseItem";

const ADD_FOLLOW_FAILED_RESULT = -1;
const REMOVE_FOLLOW_FAILED_RESULT = -1;

/**
 * Add the creator with specified id to the user follow list.
 *
 * @param {String} creatorId Id of the creator to add to follow list.
 * @param {String} bearerAccessToken Access token that used with api called.
 * @returns {Number} The total follow count of current comic. (If return -1, call API failed)
 */
async function addToFollowAsync(creatorId, bearerAccessToken) {
    const apiUrl = `${BaseWebApiUrl}/G61/follow-creator`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            data: { creatorId: creatorId },
            headers: {
                Authorization: bearerAccessToken,
            },
        });

        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Add the creator with specified id to the user follow list.
 *
 * @param {String} creatorId Id of the creator to add to follow list.
 * @param {String} bearerAccessToken Access token that used with api called.
 * @returns {Boolean} Return true if call API successed, otherwise false. (If return -1, call API failed)
 */
async function removeFollowAsync(creatorId, bearerAccessToken) {
    const apiUrl = `${BaseWebApiUrl}/G62/unfollow-creator`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            data: { creatorId: creatorId },
            headers: {
                Authorization: bearerAccessToken,
            },
        });

        return true;
    } catch (error) {
        return false;
    }
}

async function checkHasFollowCreatorAsync(creatorId, bearerAccessToken) {
    const apiUrl = `${BaseWebApiUrl}/g61/check-follow`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            data: { creatorId: creatorId, accessToken: bearerAccessToken },
        });

        return response.data.body.hasFollowed;
    } catch (error) {
        return false;
    }
}

/**
 * Get all the followed creators of the current user.
 *
 * @param {String} bearerAccessToken Bearer access token of the user to get their followed creators.
 * @param {Number} pageNumber The page number to get the followed creator list when pagination.
 * @returns {Promise<FollowedCreatorProfileResponseItem[]>} The list of creators that followed by current user.
 */
async function getAllFollowedCreatorsAsync(bearerAccessToken, pageNumber) {
    const apiUrl = `${BaseWebApiUrl}/G63/follow-creator/get`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            headers: {
                Authorization: bearerAccessToken,
            },
            params: {
                pageNum: pageNumber,
            },
        });

        return FollowedCreatorProfileResponseItem.mapFromArray(
            response.data.body
        );
    } catch (error) {
        console.log(error);

        return null;
    }
}

const FollowCreatorApiHandler = {
    addToFollowAsync: addToFollowAsync,
    removeFollowAsync: removeFollowAsync,
    checkHasFollowCreatorAsync,
    getAllFollowedCreatorsAsync,
};

export { FollowCreatorApiHandler };
