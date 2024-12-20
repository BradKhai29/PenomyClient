import axios from "axios";
import { HttpMethod } from "src/api.common/HttpMethod";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { useAuthStore } from "src/stores/common/AuthStore";
import { ComicChapterDetailResponseDto } from "src/api.models/artwork/artwork5Page/ComicChapterDetailResponseDto";
import { ArtworkChapterResponse } from "src/api.models/artwork/artwork3Page/ArtworkChapterResponse";

// Init authStore to get the access-token.
const authStore = useAuthStore();

/**
 * Get the detail of the chapter with specified id.
 *
 * @param {String} comicId Id of the comic contains this chapter.
 * @param {String} chapterId Id of the chapter to get detail.
 * @returns {Promise<ComicChapterDetailResponseDto>} Promise contains the chapter detail.
 */
async function getChapterDetailByIdAsync(comicId, chapterId) {
    let apiUrl = `${BaseWebApiUrl}/g9/comic/${comicId}/chapter/${chapterId}`;

    if (!authStore.isAuth) {
        apiUrl = `${BaseWebApiUrl}/g9/comic/${comicId}/chapter/${chapterId}`;
    }

    try {
        const bearerAccessToken = authStore.bearerAccessToken();

        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            headers: {
                Authorization: bearerAccessToken,
            },
        });

        return ComicChapterDetailResponseDto.mapFrom(response.data.body);
    } catch (error) {
        return ComicChapterDetailResponseDto.failedWithErrorCode();
    }
}

/**
 * Get the list of chapters of the current
 * comic support for chapter navigation.
 *
 * @param {String} comicId Id of the comic to get.
 * @returns {Promise<ArtworkChapterResponse[]>} The list of chapter of current comic.
 */
async function getChapterListByComicIdAsync(comicId) {
    const apiUrl = `${BaseWebApiUrl}/g9/chapter-list`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            params: {
                comicId: comicId,
            },
        });

        const chapterList = ArtworkChapterResponse.mapFromArray(
            response.data.body
        );

        return chapterList;
    } catch (error) {
        console.log(error);

        return null;
    }
}

const Artwork5ApiHandler = {
    getChapterDetailByIdAsync: getChapterDetailByIdAsync,
    getChapterListByComicIdAsync,
};

export { Artwork5ApiHandler };
