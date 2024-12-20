import axios from "axios";
import { AxiosHelper } from "src/helpers/AxiosHelper";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";

// Support models for binding from api response.
import { ArtworkDetailResponse } from "src/api.models/artwork/artwork3Page/ArtworkDetailResponse";
import { ArtworkChapterResponse } from "src/api.models/artwork/artwork3Page/ArtworkChapterResponse";
import { ComicChapterPaginationOptionResponse } from "src/api.models/artwork/artwork3Page/ComicChapterPaginationOptionResponse";
import { Art3RecommendedArtworkResponseItem } from "src/api.models/artwork/artwork3Page/Art3RecommendedArtworkResponseItem";

/**
 * Fetches the artwork detail by the given artwork ID.
 * @param {number} artworkId The artwork ID.
 * @param {number} guestId Id of the guest that visit this page. (Default is -1 if not specified)
 * @returns {Promise<ArtworkDetailResponse>} The artwork detail response.
 */
async function getArtworkDetailByIdAsync(artworkId, guestId = -1, accessToken) {
    try {
        const MINIMUM_TOKEN_LENGTH = 10;

        if (String(accessToken).length < MINIMUM_TOKEN_LENGTH) {
            accessToken = "null";
        }

        // Api-URLs to call.
        const detailApiUrl = `${BaseWebApiUrl}/g5/artwork-detail`;

        const response = await axios({
            url: detailApiUrl,
            method: HttpMethod.GET,
            params: {
                artworkId: artworkId,
                guestId: guestId,
                accessToken: accessToken,
            },
        });

        const data = response.data.body;

        const mapResult = ArtworkDetailResponse.mapFrom(data);

        return mapResult;
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);
        console.log(axiosError);
        return null;
    }
}

/**
 * @param {String} artworkId Id of artwork to get metadata.
 * @param {String} guestId Id of guest.
 * @param {String} accessToken Access token of user.
 * @returns {Promise<ArtworkDetailResponse>} Response contains artwork metadata.
 */
async function getUserArtworkPreferenceAsync(
    artworkId,
    guestId = -1,
    accessToken
) {
    try {
        const MINIMUM_TOKEN_LENGTH = 10;

        if (String(accessToken).length < MINIMUM_TOKEN_LENGTH) {
            accessToken = "null";
        }

        // Api-URLs to call.
        const detailApiUrl = `${BaseWebApiUrl}/g5/user-preference`;

        const response = await axios({
            url: detailApiUrl,
            method: HttpMethod.GET,
            params: {
                artworkId: artworkId,
                guestId: guestId,
                accessToken: accessToken,
            },
        });

        const data = response.data.body;

        const mapResult = ArtworkDetailResponse.mapPreference(data);

        return mapResult;
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);
        console.log(axiosError);
        return null;
    }
}

/**
 * @param {String} artworkId Id of artwork to get metadata.
 * @returns {Promise<ArtworkDetailResponse>} Response contains artwork metadata.
 */
async function getArtworkMetaDataByIdAsync(artworkId) {
    try {
        // Api-URLs to call.
        const apiUrl = `${BaseWebApiUrl}/g5/artwork/metadata/${artworkId}`;

        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
        });

        const data = response.data.body;

        const mapResult = ArtworkDetailResponse.mapMetaData(data);

        return mapResult;
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);
        console.log(axiosError);
        return null;
    }
}

/**
 * @param {String} creatorId Id of artwork to get metadata.
 * @returns {Promise<ArtworkDetailResponse>} Response contains artwork metadata.
 */
async function getCreatorProfileByIdAsync(creatorId) {
    try {
        const apiUrl = `${BaseWebApiUrl}/g5/creator-profile/${creatorId}`;

        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
        });

        const data = response.data.body;

        const mapResult = ArtworkDetailResponse.mapCreatorProfile(data);

        return mapResult;
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
        const apiUrl = `${BaseWebApiUrl}/g8/artwork-chapter/pagination-options`;

        const apiResponse = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            params: {
                artworkId: comicId,
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

/**
 * Get the list of recommended artworks based on the the input artworkId.
 *
 * @param {String} artworkId Id of the artwork to recommended related content.
 * @returns {Promise<Art3RecommendedArtworkResponseItem[]> | null} The list of recommended artworks.
 * Return null if the api is called failed.
 */
async function getRecommendedArtworksAsync(artworkId) {
    const apiUrl = `${BaseWebApiUrl}/g6/artworks/recommend`;
    const TOTAL_RECOMMENDED_ARTWORKS = 3;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            params: {
                artworkId: artworkId,
                totalRecommendedArtworks: TOTAL_RECOMMENDED_ARTWORKS,
            },
        });

        const result = Art3RecommendedArtworkResponseItem.mapFromArray(
            response.data.body
        );

        return result;
    } catch (error) {
        console.log(error);

        return null;
    }
}

const artworkDetailApiHandler = {
    getArtworkDetailByIdAsync,
    getArtworkMetaDataByIdAsync,
    getUserArtworkPreferenceAsync,
    getCreatorProfileByIdAsync,
    getArtworkChaptersByIdAsync,
    getComicChapterPaginationOptionByIdAsync,
    getRecommendedArtworksAsync,
};

export default artworkDetailApiHandler;
