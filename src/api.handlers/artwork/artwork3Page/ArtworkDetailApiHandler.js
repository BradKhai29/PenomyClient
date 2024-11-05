import axios from "axios";
import { AxiosHelper } from "src/helpers/AxiosHelper";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ArtworkDetailResponse } from "src/api.models/artwork/artwork3Page/ArtworkDetailResponse";
import { ArtworkChapterResponse } from "src/api.models/artwork/artwork3Page/ArtworkChapterResponse";
/**
 * Fetches the artwork detail by the given artwork ID.
 * @param {number} artworkId The artwork ID.
 * @returns {Promise<ArtworkDetailResponse>} The artwork detail response.
 */
async function getArtworkDetailByIdAsync(artworkId, accessToken) {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/g5/artwork-detail`,
            method: HttpMethod.GET,
            params: {
                id: artworkId,
            },
            headers: {
                Authorization: accessToken,
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
            data.commentCount,
            data.followCount,
            data.isUserFavorite
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
        const isPagination = data.isPagination;
        const chapterCount = data.chapterCount;
        const chapters = data.result.map(
            (chapter) =>
                new ArtworkChapterResponse(
                    chapter.id,
                    chapter.uploadOrder,
                    chapter.chapterName,
                    chapter.createdTime,
                    chapter.commentCount,
                    chapter.favoriteCount,
                    chapter.viewCount,
                    chapter.thumbnailUrl
                )
        );
        return { chapters, chapterCount, isPagination };
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
