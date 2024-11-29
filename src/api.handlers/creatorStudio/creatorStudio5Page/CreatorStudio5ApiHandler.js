import axios from "axios";

import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ArtworkDetailResponseItem } from "src/api.models/creatorStudio/creatorStudio5Page/ArtworkDetailResponseItem";
import { OverviewStatisticResponseItem } from "src/api.models/creatorStudio/creatorStudio5Page/OverviewStatisticResponseItem";
import { PaginationOptionResponseItem } from "src/api.models/creatorStudio/creatorStudio5Page/PaginationOptionResponseItem";
import { useAuthStore } from "src/stores/common/AuthStore";

// Init store for later operation.
const authStore = useAuthStore();

/**
 * Map the response body from api to list of Artwork item.
 * @param {ArtworkDetailResponseItem[]} responseBody The response body to parse.
 */
function mapToArtworkList(responseBody) {
    return responseBody;
}

/**
 * Get the list or artworks with specified artworkType and pageNumber.
 *
 * @param {Number} artworkType The type of the artwork to get.
 * @param {Number} pageNumber The page number that need to get the artwork list.
 * @returns {Promise<ArtworkDetailResponseItem[]>} The promise contains the list of artwork item get from api.
 */
async function getArtworksByTypeWithPagination(artworkType, pageNumber) {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/art1/artworks?artworkType=${artworkType}&pageNumber=${pageNumber}`,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
        });

        const result = mapToArtworkList(response.data.body);

        return result;
    } catch (error) {
        console.log(error);

        return null;
    }
}

/**
 * Get the pagination options to display the pagination bar.
 *
 * @param {Number} [artworkType=ArtworkTypes.COMIC] The type of the artwork to get. Default is COMIC.
 * @returns {Promise<PaginationOptionResponseItem>} The promise contains the list of artwork item get from api.
 */
async function getPaginationOptionsAsync(artworkType = ArtworkTypes.COMIC) {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/art1/pagination?artworkType=${artworkType}`,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
        });

        return response.data.body;
    } catch (error) {
        console.log(error);

        return null;
    }
}

/**
 * Get the overview statistic of all artworks and series
 * from the webapi of the current creator's studio.
 *
 * @returns {OverviewStatisticResponseItem} The overview statistic get from webapi.
 */
async function getOverviewStatisticAsync() {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/art1/overview-statistic`,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
        });

        return response.data.body;
    } catch (error) {
        console.log(error);

        return null;
    }
}

const CreatorStudio5ApiHandler = {
    getArtworksByTypeWithPaginationAsync: getArtworksByTypeWithPagination,
    getPaginationOptionsAsync: getPaginationOptionsAsync,
    getOverviewStatisticAsync: getOverviewStatisticAsync,
};

const ArtworkTypes = {
    COMIC: 1,
    ANIMATION: 2,
};

export { CreatorStudio5ApiHandler, ArtworkTypes };
