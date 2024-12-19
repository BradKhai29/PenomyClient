import axios from "axios";
import { HttpMethod } from "src/api.common/HttpMethod";
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { useAuthStore } from "src/stores/common/AuthStore";

// Models for binding
import { AnimeChapterDetailResponseDto } from "src/api.models/artwork/artwork6Page/AnimeChapterDetailResponseDto";
import { ArtworkChapterResponse } from "src/api.models/artwork/artwork3Page/ArtworkChapterResponse";

// Init authStore to get the access-token.
const authStore = useAuthStore();

/**
 * Get the detail of the chapter with specified id.
 *
 * @param {String} artworkId Id of the anime contains this chapter.
 * @param {String} chapterId Id of the chapter to get detail.
 * @returns {Promise<AnimeChapterDetailResponseDto>} Promise contains the chapter detail.
 */
async function getChapterDetailByIdAsync(artworkId, chapterId) {
    const apiUrl = `${BaseWebApiUrl}/g19/anime/${artworkId}/chapter/${chapterId}`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
        });

        return AnimeChapterDetailResponseDto.mapFrom(response.data.body);
    } catch (error) {
        return null;
    }
}

/**
 * Get the list of chapters of the current
 * anime support for chapter navigation.
 *
 * @param {String} animeId Id of the anime to get.
 * @returns {Promise<ArtworkChapterResponse[]>} The list of chapter of current anime.
 */
async function getChapterListByAnimeIdAsync(animeId) {
    const apiUrl = `${BaseWebApiUrl}/g19/anime/chapter-list`;

    try {
        const response = await axios({
            url: apiUrl,
            method: HttpMethod.GET,
            params: {
                animeId: animeId,
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

const AnimeChapterApiHandler = {
    getChapterDetailByIdAsync,
    getChapterListByAnimeIdAsync,
};

export { AnimeChapterApiHandler };
