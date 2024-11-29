import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ArtworkTypes } from "../artwork1Page/TopRecommendedArtworkApiHandler";
import { FollowedArtworkResponseItem } from "src/api.models/artwork/common/FollowedArtworkResponseItem";

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

/**
 * Get the user followed artwork list by the specified artworkType and page number.
 *
 * @param {Number} [artworkType=ArtworkTypes.COMIC] The type of artwork to get. (Default is set to comic is not specified)
 * @param {Number} [pageNum=1] The page number to get when pagination available. (Default pageNumber is set to 1 if not specified)
 * @returns {Promise<Array> | null} The list of followed artworks of the current guest. Return null if the api call is failed.
 */
async function getAllFollowedArtworkAsync(
    bearerAccessToken,
    artworkType = ArtworkTypes.COMIC,
    pageNum = 1
) {
    const apiUrl = `${BaseWebApiUrl}/g45/followed-artworks`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            headers: {
                Authorization: bearerAccessToken,
            },
            params: {
                artworkType: artworkType,
                pageNum: pageNum,
            },
        });

        return FollowedArtworkResponseItem.mapFromArray(response.data.body);
    } catch (error) {
        console.log(error);

        return null;
    }
}

const FollowArtworkApiHandler = {
    addToFollowAsync: addToFollowAsync,
    removeFollowAsync: removeFollowAsync,
    getAllFollowedArtworkAsync,
};

export { FollowArtworkApiHandler };
