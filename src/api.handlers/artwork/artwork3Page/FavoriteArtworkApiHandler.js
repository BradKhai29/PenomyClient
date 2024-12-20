import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ArtworkTypes } from "../artwork1Page/TopRecommendedArtworkApiHandler";
import { FavoriteArtworkResponseItem } from "src/api.models/artwork/common/FavoriteArtworkResponseItem";

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

/**
 * Get the user followed artwork list by the specified artworkType and page number.
 *
 * @param {Number} [artworkType=ArtworkTypes.COMIC] The type of artwork to get. (Default is set to comic is not specified)
 * @param {Number} [pageNum=1] The page number to get when pagination available. (Default pageNumber is set to 1 if not specified)
 * @returns {Promise<FavoriteArtworkResponseItem[]> | null} The list of favorite artworks of the current guest. Return null if the api call is failed.
 */
async function getAllFavoriteArtworksAsync(
    bearerAccessToken,
    artworkType = ArtworkTypes.COMIC,
    pageNum = 1
) {
    const apiUrl = `${BaseWebApiUrl}/G48/favorite-artworks`;

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

        return FavoriteArtworkResponseItem.mapFromArray(response.data.body);
    } catch (error) {
        console.log(error);

        return null;
    }
}

const FavoriteArtworkApiHandler = {
    addToFavoriteAsync: addToFavoriteAsync,
    removeFavoriteAsync: removeFavoriteAsync,
    getAllFavoriteArtworksAsync,
};

export {
    FavoriteArtworkApiHandler,
    ADD_FAVORITE_FAILED_RESULT,
    REMOVE_FAVORITE_FAILED_RESULT,
};
