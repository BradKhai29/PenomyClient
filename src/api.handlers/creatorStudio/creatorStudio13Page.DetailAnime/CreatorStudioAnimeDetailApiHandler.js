import axios from "axios";

import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { AnimeChapterItemResponseDto } from "src/api.models/creatorStudio/creatorStudio13Page.AnimeDetail/AnimeChapterDetailResponseDto";
import { AnimeDetailResponseDto } from "src/api.models/creatorStudio/creatorStudio13Page.AnimeDetail/AnimeDetailResponseDto";

// Init store for later operation.
import { useAuthStore } from "src/stores/common/AuthStore";
const authStore = useAuthStore();

/**
 * Get the detail of the anime with specified input id.
 *
 * @param {String} artworkId The id of the anime to get detail.
 * @returns {Promise<AnimeDetailResponseDto>} The promise contains detail of the specified anime.
 */
async function getAnimeDetailByIdAsync(artworkId) {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/art16/anime/detail/${artworkId}`,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
        });

        const responseBody = response.data.body;
        const animeDetail = AnimeDetailResponseDto.mapFrom(responseBody);
        console.log(animeDetail);

        return animeDetail;
    } catch (error) {
        return null;
    }
}

/**
 * Load all comic chapters with specified id and publish status.
 *
 * @param {String} artworkId The id of the comic to load the chapter.
 * @param {Number} publishStatus The publish status to load.
 * @returns {Promise<AnimeChapterItemResponseDto[]>} The list contains all comic chapters that loaded from api.
 */
async function getChaptersByIdAndPublishStatusAsync(artworkId, publishStatus) {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/art16/anime/chapters/${artworkId}`,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            params: {
                publishStatus: publishStatus,
            },
        });

        const responseBody = response.data.body;
        const chapters = AnimeChapterItemResponseDto.asArray(responseBody);

        return chapters;
    } catch (error) {
        return null;
    }
}

/**
 * Remove the chapter of current comic by input id.
 *
 * @param {String} artworkId Id of the artwork contains this chapter.
 * @param {String} chapterId Id of the chapter to be removed.
 * @returns {Promise<Boolean>} Return true if the operation is success.
 */
async function removeChapterAsync(artworkId, chapterId) {
    const apiUrl = `${BaseWebApiUrl}/art14/remove/chapter`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.POST,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            data: {
                artworkId: artworkId,
                chapterId: chapterId,
            },
        });

        return true;
    } catch (error) {
        console.log(error);

        return false;
    }
}

const PublishStatuses = {
    DRAFTED: 1,
    PUBLISHED: 2,
    SCHEDULED: 3,
};

const CreatorStudioAnimeDetailApiHandler = {
    getAnimeDetailByIdAsync,
    getChaptersByIdAndPublishStatusAsync,
    removeChapterAsync,
};

export { CreatorStudioAnimeDetailApiHandler, PublishStatuses };
