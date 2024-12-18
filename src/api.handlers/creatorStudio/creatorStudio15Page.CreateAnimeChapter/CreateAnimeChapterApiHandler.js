import axios from "axios";

import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { AxiosHelper } from "src/helpers/AxiosHelper";
import { DateTimeHelper } from "src/helpers/DateTimeHelper";

// DTO for api mapping.
import { AnimeDetailToCreateChapterResponseDto } from "src/api.models/creatorStudio/creatorStudio15Page.CreateAnimeChap/AnimeDetailToCreateChapResponseDto";
import { AnimeChapterDetailRequestDto } from "src/api.models/creatorStudio/creatorStudio15Page.CreateAnimeChap/AnimeChapterDetailRequestDto";

// Init store for later operation.
import { useAuthStore } from "src/stores/common/AuthStore";
import { CreateArtworkResult } from "src/api.models/creatorStudio/creatorStudio6Page/CreateArtworkResult";
const authStore = useAuthStore();

/**
 * Get the detail of the specified anime with input id
 * to create a new chapter for the anime.
 *
 * @param {String} animeId The id of the anime to get detail.
 * @returns {Promise<AnimeDetailToCreateChapterResponseDto> | null} The promise contains the anime detail result or null if api call failed.
 */
async function getAnimeDetailToCreateChapterAsync(animeId) {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/art20/anime/${animeId}`,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
        });

        const body = response.data.body;

        console.log(body);

        return new AnimeDetailToCreateChapterResponseDto(
            body.title,
            body.lastChapterUploadOrder
        );
    } catch (error) {
        console.log(error);

        return null;
    }
}

/**
 * Send the request to api to create a new anime chapter with specified chapterDetail.
 *
 * @param {AnimeChapterDetailRequestDto} chapterDetail The detail of the chapter.
 * @param {Boolean} isDrafted Specify to create a draft for this chapter.
 * @returns {Promise<CreateArtworkResult>} The result of chapter creating.
 */
async function createAnimeChapterAsync(chapterDetail, isDrafted) {
    console.log(chapterDetail);

    const requestBody = new FormData();

    const scheduledAt = DateTimeHelper.toISODateString(
        chapterDetail.scheduleOption.scheduleDateTime
    );

    // Populate anime detail information to the request body.
    requestBody.append("animeId", chapterDetail.animeId);
    requestBody.append("title", chapterDetail.title);
    requestBody.append("description", chapterDetail.description);
    requestBody.append("thumbnailImageFile", chapterDetail.thumbnailImageFile);
    requestBody.append("chapterVideoFile", chapterDetail.chapterVideoFile);
    requestBody.append("publicLevel", chapterDetail.publicLevel);
    requestBody.append("allowComment", chapterDetail.allowComment);
    requestBody.append("isDrafted", isDrafted);
    requestBody.append("isScheduled", chapterDetail.scheduleOption.isScheduled);
    requestBody.append("scheduledAt", scheduledAt);

    const result = {
        isSuccess: false,
        message: null,
    };

    try {
        await axios({
            url: `${BaseWebApiUrl}/art20/anime/chapter/create`,
            method: HttpMethod.POST,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: authStore.bearerAccessToken(),
            },
            data: requestBody,
        });

        result.isSuccess = true;
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);
        console.log(error);

        const errorMessage =
            CreateChapterErrorCodeParser.getMessageFromErrorCode(
                axiosError.response.data.appCode
            );

        result.message = errorMessage;
    }

    return result;
}

const CreateAnimeChapterApiHandler = {
    getAnimeDetailToCreateChapterAsync,
    createAnimeChapterAsync,
};

export { CreateAnimeChapterApiHandler };
