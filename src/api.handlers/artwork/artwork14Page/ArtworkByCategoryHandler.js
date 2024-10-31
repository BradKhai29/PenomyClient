import axios from "axios";
import { AxiosHelper } from "src/helpers/AxiosHelper";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ArtworkDetailResponse } from "src/api.models/artwork/artwork14Page/ArtworkResponse";

async function getArtworkByCategoryAsync(accessToken) {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/g14/recommended-category`,
            method: HttpMethod.GET,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                limit: 10,
            },
        });
        if (response.data.httpCode !== 200) {
            return null;
        }
        const data = response.data.body;
        return data;
        // return new ArtworkDetailResponse(
        //     data.name,
        //     data.countryName,
        //     data.authorName,
        //     data.categories,
        //     data.artworkStatus,
        //     data.seriesName,
        //     data.hasSeries,
        //     data.thumbnailUrl,
        //     data.viewCount,
        //     data.favoriteCount,
        //     data.starRates,
        //     data.introduction,
        //     data.commentCount
        // );
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);
        console.log(axiosError);
        return null;
    }
}

const artworkCategoryApiHandler = {
    getArtworkByCategoryAsync,
};
export default artworkCategoryApiHandler;
