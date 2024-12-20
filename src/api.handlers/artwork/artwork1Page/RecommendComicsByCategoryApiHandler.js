import axios from "axios";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { RecommendArtworksByCategoryResponse } from "src/api.models/artwork/artwork1Page/RecommendArtworksByCategoryResponse";
import { ArtworkTypes } from "./TopRecommendedArtworkApiHandler";

async function getAsync(
    accessToken,
    guestId,
    artworkType = ArtworkTypes.COMIC
) {
    const apiUrl = `${BaseWebApiUrl}/g4/recommended/artworks`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            params: {
                accessToken: accessToken,
                guestId: guestId,
                artworkType: artworkType,
            },
        });

        const result = RecommendArtworksByCategoryResponse.mapFromArray(
            response.data.body
        );

        return result;
    } catch (error) {
        console.log(error);

        return null;
    }
}

const RecommendComicsByCategoryApiHandler = {
    getAsync,
};

export { RecommendComicsByCategoryApiHandler };
