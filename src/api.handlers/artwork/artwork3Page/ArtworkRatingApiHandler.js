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
const ArtworkRatingApiHandler = {
    RatingArtworkAsync,
};
export default ArtworkRatingApiHandler;
