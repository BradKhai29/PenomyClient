import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { RecentlyUpdatedArtworkResponseItem } from "src/api.models/artwork/artwork1Page/RecentlyUpdatedArtworkResponseItem";

/**
 * Get the list of comics that are recently updated.
 *
 * @returns {RecentlyUpdatedArtworkResponseItem[]} The recommended list contains the comics that recently updated based on the user preference.
 */
async function getAsync() {
    const apiUrl = `${BaseWebApiUrl}/g3/recently-updated/comics`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
        });

        const responseItems = response.data.body;
        const result =
            RecentlyUpdatedArtworkResponseItem.mapFromArray(responseItems);

        return result;
    } catch (error) {
        console.log(error);

        return null;
    }
}

const RecentlyUpdatedArtworksApiHandler = {
    getAsync,
};

export { RecentlyUpdatedArtworksApiHandler };
