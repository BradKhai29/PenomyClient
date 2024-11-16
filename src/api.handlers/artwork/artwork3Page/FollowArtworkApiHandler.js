import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";

/**
 * Add the artwork with specified id to the user follow list.
 *
 * @param {String} artworkId Id of the artwork to add to follow list.
 * @param {String} bearerAccessToken Access token that used with api called.
 * @returns {Number} The total follow count of current comic. (If return -1, call API failed)
 */
async function addToFollowAsync(artworkId, bearerAccessToken) {
    const apiUrl = `${BaseWebApiUrl}/g43/artwork/follow`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            data: { artworkId: artworkId },
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
 * Add the artwork with specified id to the user follow list.
 *
 * @param {String} artworkId Id of the artwork to add to follow list.
 * @param {String} bearerAccessToken Access token that used with api called.
 * @returns {Number} The total follow count of current comic. (If return -1, call API failed)
 */
async function removeFollowAsync(artworkId, bearerAccessToken) {
    const apiUrl = `${BaseWebApiUrl}/g44/artwork/unfollow`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            data: { artworkId: artworkId },
            headers: {
                Authorization: bearerAccessToken,
            },
        });

        return true;
    } catch (error) {
        return false;
    }
}

const FollowArtworkApiHandler = {
    addToFollowAsync: addToFollowAsync,
    removeFollowAsync: removeFollowAsync,
};

export {
    FollowArtworkApiHandler
};
