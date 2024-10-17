import axios from "axios";

import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ArtworkDetailResponseItem } from "src/api.models/creatorStudio/creatorStudio5Page/ArtworkDetailResponseItem";

/**
 * Map the response body from api to list of Artwork item.
 * @param {ArtworkDetailResponseItem[]} responseBody The response body to parse.
 */
function mapToArtworkList(responseBody) {
    return responseBody;
}

/**
 * Get the list or artworks with specified artworkType and pageNumber.
 * @param {Number} artworkType The type of the artwork to get.
 * @param {Number} pageNumber The page number that need to get the artwork list.
 * @returns {Promise<ArtworkDetailResponseItem[]>} The promise contains the list of artwork item get from api.
 */
async function getArtworksByTypeWithPagination(artworkType, pageNumber) {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/art1/artworks?artworkType=${artworkType}&pageNumber=${pageNumber}`,
            method: HttpMethod.GET,
        });

        const result = mapToArtworkList(response.data.body);

        return result;
    } catch (error) {
        console.log(error);

        return null;
    }
}

const CreatorStudio5ApiHandler = {
    getArtworksByTypeWithPaginationAsync: getArtworksByTypeWithPagination,
};

const ArtworkTypes = {
    COMIC: 1,
    ANIMATION: 2,
};

export { CreatorStudio5ApiHandler, ArtworkTypes };
