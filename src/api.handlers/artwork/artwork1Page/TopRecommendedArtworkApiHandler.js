import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { TopRecommendedArtworkResponse } from "src/api.models/artwork/artwork1Page/TopRecommendedArtworkResponse";
import { ApiResponse } from "src/api.models/common/ApiResponse";

const ArtworkTypes = {
    COMIC: 1,
    ANIMATION: 2,
};

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

        return ApiResponse.success(responseBody);
    } catch (error) {
        console.log(error);

        return ApiResponse.failed();
    }
}

const TopRecommendedArtworkApiHandler = {
    getAsync,
};

export { TopRecommendedArtworkApiHandler, ArtworkTypes };
