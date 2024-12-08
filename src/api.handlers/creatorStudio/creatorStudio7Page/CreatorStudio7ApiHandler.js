import axios from "axios";

import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { ComicChapterDetail } from "src/api.models/creatorStudio/creatorStudio7Page/ComicChapterDetail";
import { ComicDetail } from "src/api.models/creatorStudio/creatorStudio7Page/ComicDetail";

// Init store for later operation.
import { useAuthStore } from "src/stores/common/AuthStore";
const authStore = useAuthStore();

/**
 * Get the detail of the comic with specified input id.
 *
 * @param {String} comicId The id of the comic to get detail.
 * @returns {Promise<ComicDetail>} The promise contains detail of the specified comic.
 */
async function getComicDetailByIdAsync(comicId) {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/art5/comic/detail/${comicId}`,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
        });

        const responseBody = response.data.body;
        const comicDetail = ComicDetail.mapFrom(responseBody);

        return comicDetail;
    } catch (error) {
        return null;
    }
}

const PublishStatuses = {
    DRAFTED: 1,
    PUBLISHED: 2,
    SCHEDULED: 3,
};

/**
 * Load all comic chapters with specified id and publish status.
 *
 * @param {String} comicId The id of the comic to load the chapter.
 * @param {Number} publishStatus The publish status to load.
 * @returns {Promise<ComicChapterDetail[]>} The list contains all comic chapters that loaded from api.
 */
async function getComicChaptersByIdAndPublishStatusAsync(
    comicId,
    publishStatus
) {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/art6/comic/chapters/${comicId}`,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
            params: {
                publishStatus: publishStatus,
            },
        });

        const responseBody = response.data.body;
        const chapters = ComicChapterDetail.asArray(responseBody);

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

const CreatorStudio7ApiHandler = {
    getComicDetailByIdAsync: getComicDetailByIdAsync,
    getComicChaptersByIdAndPublishStatusAsync:
        getComicChaptersByIdAndPublishStatusAsync,
    removeChapterAsync,
};

export { CreatorStudio7ApiHandler, PublishStatuses };
