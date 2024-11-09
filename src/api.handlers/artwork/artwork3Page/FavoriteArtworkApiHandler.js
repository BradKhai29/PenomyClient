import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";

const ADD_FAVORITE_FAILED_RESULT = -1;
const REMOVE_FAVORITE_FAILED_RESULT = -1;

/**
 * Add the artwork with specified id to the user favorite list.
 *
 * @param {String} artworkId Id of the artwork to add to favorite list.
 * @param {String} bearerAccessToken Access token that used with api called.
 * @returns {Number} The total favorite count of current comic. (If return -1, call API failed)
 */
async function addToFavoriteAsync(artworkId, bearerAccessToken) {
    const apiUrl = `${BaseWebApiUrl}/g46/favorite/add`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            data: { artworkId: artworkId },
            headers: {
                Authorization: bearerAccessToken,
            },
        });

        return response.data.favoriteCount;
    } catch (error) {
        return ADD_FAVORITE_FAILED_RESULT;
    }
}

/**
 * Remove the artwork with specified id out of the user favorite list.
 *
 * @param {String} artworkId Id of the artwork to remove from the favorite list.
 * @param {String} bearerAccessToken Access token that used with api called.
 * @returns {Number} The total favorite count of current comic. (If return -1, call API failed)
 */
async function removeFavoriteAsync(artworkId, bearerAccessToken) {
    const apiUrl = `${BaseWebApiUrl}/g47/favorite/remove`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            data: { artworkId: artworkId },
            headers: {
                Authorization: bearerAccessToken,
            },
        });

        return response.data.favoriteCount;
    } catch (error) {
        return REMOVE_FAVORITE_FAILED_RESULT;
    }
}

const FavoriteArtworkApiHandler = {
    addToFavoriteAsync: addToFavoriteAsync,
    removeFavoriteAsync: removeFavoriteAsync,
};

export { FavoriteArtworkApiHandler };
