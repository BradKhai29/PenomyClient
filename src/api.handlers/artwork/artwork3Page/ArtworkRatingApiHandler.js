import axios from "axios";
import { AxiosHelper } from "src/helpers/AxiosHelper";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";

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
        const body = response.data;
        if (body.httpCode !== 200) {
            return null;
        }
        return body.starRate;
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);
        console.log(axiosError);
    }
}
const ArtworkRatingApiHandler = {
    RatingArtworkAsync,
};
export default ArtworkRatingApiHandler;
