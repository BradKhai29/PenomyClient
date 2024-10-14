import axios from "axios";
import { AxiosHelper } from "src/helpers/AxiosHelper";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ArtworkDetailResponse } from "src/api.models/artwork/artwork3Page/ArtworkDetailResponse";
import { ArtworkChapterResponse } from "src/api.models/artwork/artwork3Page/ArtworkChapterResponse";
import { nextTick } from "vue";
/**
 * Fetches the artwork detail by the given artwork ID.
 * @param {number} artworkId The artwork ID.
 * @returns {Promise<ArtworkDetailResponse>} The artwork detail response.
 */
async function getArtworkDetailByIdAsync(artworkId) {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/g5/artwork-detail`,
            method: HttpMethod.GET,
            params: {
                id: artworkId,
            },
        });
        if (response.data.httpCode !== 200) {
            return null;
        }
        const data = response.data.body;

        return new ArtworkDetailResponse(
            data.name,
            data.countryName,
            data.authorName,
            data.categories,
            data.artworkStatus,
            data.seriesName,
            data.hasSeries,
            data.thumbnailUrl,
            data.viewCount,
            data.favoriteCount,
            data.starRates,
            data.introduction,
            data.commentCount
        );
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);
        console.log(axiosError);
        return null;
    }
}
async function getArtworkChaptersByIdAsync(artworkId, startPage, pageSize) {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/g8/artwork-chapters`,
            method: HttpMethod.GET,
            params: {
                id: artworkId,
                startPage: startPage,
                pageSize: pageSize,
            },
        });
        if (response.data.httpCode !== 200) {
            return null;
        }
        const data = response.data.body;

        return new ArtworkChapterResponse(
            data.id,
            data.uploadOrder,
            data.chapterName,
            data.createdTime,
            data.commentCount,
            data.favoriteCount,
            data.viewCount,
            data.thumbnailUrl
        );
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);
        console.log(axiosError);
        return null;
    }
}
const artworkDetailApiHandler = {
    getArtworkDetailByIdAsync,
    getArtworkChaptersByIdAsync,
};
export default artworkDetailApiHandler;
