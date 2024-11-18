import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { TopRecommendedArtworkResponse } from "src/api.models/artwork/artwork1Page/TopRecommendedArtworkResponse";

const ArtworkTypes = {
    COMIC: 1,
    ANIMATION: 2,
};

/**
 * Get the top recommended artworks of the platform based on the input artwork type.
 *
 * @param {Number} artworkType The artwork type to get the top recommended artworks.
 * @returns {TopRecommendedArtworkResponse[]} The list of top recommended artworks.
 */
async function getAsync(artworkType = ArtworkTypes.COMIC) {
    const apiUrl = `${BaseWebApiUrl}/g2/top-recommended`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            params: {
                artworkType: artworkType,
            },
        });

        const responseBody = TopRecommendedArtworkResponse.mapAsArray(
            response.data.body
        );

        return responseBody;
    } catch (error) {
        console.log(error);

        return null;
    }
}

const TopRecommendedArtworkApiHandler = {
    getAsync,
};

export { TopRecommendedArtworkApiHandler, ArtworkTypes };
