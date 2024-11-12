import axios from "axios";
import { AxiosHelper } from "src/helpers/AxiosHelper";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ArtworkRatingResponse } from "src/api.models/artwork/artwork3Page/ArtworkRatingResponse";

async function RatingArtworkAsync(artworkId, starRate, accessToken) {
    try {
        const url = `${BaseWebApiUrl}/g49/artwork/rate`;
        const response = await axios({
            url: url,
            method: HttpMethod.POST,
            data: { artworkId: artworkId, starRate: starRate },
            headers: {
                Authorization: accessToken,
            },
        });
        const res = response.data;
        if (res.httpCode !== 200) {
            return null;
        }
        console.log(res);
        return new ArtworkRatingResponse(
            res.body.starRate,
            res.body.totalUsersRate,
            res.body.totalStarRate,
            res.body.currentUserRate
        );
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);
        console.log(axiosError);
    }
}

/**
 * Get the stars that current user has rated for current artwork.
 *
 * @param {String} bearerAccessToken The bearer access token to get the star that user has rated.
 * @returns {Number} Return 0 if user has not rated yet. Otherwise the value that larger that 0 that user has rated.
 */
async function getUserStarRateAsync(bearerAccessToken, artworkId) {
    try {
        const apiUrl = `${BaseWebApiUrl}/g49/artwork/get-rate`;

        const apiResponse = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            headers: {
                Authorization: bearerAccessToken,
            },
            params: {
                artworkId: artworkId,
            },
        });

        return apiResponse.data.body.currentUserRate;
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);
        console.log(axiosError);
        return 0;
    }
}

const ArtworkRatingApiHandler = {
    RatingArtworkAsync,
    getUserStarRateAsync,
};

export default ArtworkRatingApiHandler;
