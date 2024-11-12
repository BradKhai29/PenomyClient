import axios from "axios";
import { AxiosHelper } from "src/helpers/AxiosHelper";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ArtworkDetailResponse } from "src/api.models/artwork/artwork3Page/ArtworkDetailResponse";
import { ArtworkChapterResponse } from "src/api.models/artwork/artwork3Page/ArtworkChapterResponse";
import { ComicChapterPaginationOptionResponse } from "src/api.models/artwork/artwork3Page/ComicChapterPaginationOptionResponse";

/**
 * Fetches the artwork detail by the given artwork ID.
 * @param {number} artworkId The artwork ID.
 * @returns {Promise<ArtworkDetailResponse>} The artwork detail response.
 */
async function getArtworkDetailByIdAsync(artworkId, accessToken) {
    try {
        const MINIMUM_TOKEN_LENGTH = 10;

        if (String(accessToken).length < MINIMUM_TOKEN_LENGTH) {
            accessToken = "null";
        }

        const response = await axios({
            url: `${BaseWebApiUrl}/g5/artwork-detail`,
            method: HttpMethod.GET,
            params: {
                artworkId: artworkId,
                accessToken: accessToken,
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
            data.isUserFavorite,
            data.isAllowComment,
            data.totalUsersRated
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
                    chapter.thumbnailUrl,
                    chapter.allowComment
                )
        );
        return { chapters, chapterCount, isPagination };
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);
        console.log(axiosError);
        return null;
    }
}

/**
 * Get the pagination option for the chapter list of the specified comic.
 *
 * @param {String} comicId Id of the comic to get the chapter list pagination.
 */
async function getComicChapterPaginationOptionByIdAsync(comicId) {
    try {
        const apiUrl = `${BaseWebApiUrl}/g8/comic/pagination-options`;

        const apiResponse = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            params: {
                comicId: comicId,
            },
        });

        return ComicChapterPaginationOptionResponse.mapFrom(
            apiResponse.data.body
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
    getComicChapterPaginationOptionByIdAsync,
};
export default artworkDetailApiHandler;
