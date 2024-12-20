import axios from "axios";

import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { AxiosHelper } from "src/helpers/AxiosHelper";
import { DateTimeHelper } from "src/helpers/DateTimeHelper";
import { ComicChapterDetailRequestDto } from "src/api.models/creatorStudio/creatorStudio9Page/ComicChapterDetailRequestDto";
import { ComicDetailToCreateChapterResponseDto } from "src/api.models/creatorStudio/creatorStudio9Page/ComicDetailToCreateChapterResponseDto";
import { CreateComicChapterResult } from "src/api.models/creatorStudio/creatorStudio9Page/CreateComicChapterResult";
import { CreateChapterErrorCodeParser } from "src/api.models/creatorStudio/creatorStudio9Page/CreateComicChapterError";

// Init store for later operation.
import { useAuthStore } from "src/stores/common/AuthStore";
const authStore = useAuthStore();

/**
 * Get the detail of the specified comic with input id
 * to create a new chapter for the comic.
 *
 * @param {String} comicId The id of the comic to get detail.
 * @returns {Promise<ComicDetailToCreateChapterResponseDto>} The promise contains the comic detail result.
 */
async function getComicDetailToCreateChapter(comicId) {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/art10/comic/${comicId}`,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
        });

        const body = response.data.body;

        return new ComicDetailToCreateChapterResponseDto(
            true,
            body.title,
            body.lastChapterUploadOrder
        );
    } catch (error) {
        console.log(error);

        return ComicDetailToCreateChapterResponseDto.failed();
    }
}

/**
 * Send the request to api to create a new comic chapter with specified chapterDetail.
 *
 * @param {ComicChapterDetailRequestDto} chapterDetail The detail of the chapter.
 * @param {Boolean} isDrafted Specify to create a draft for this chapter.
 * @returns {Promise<CreateComicChapterResult>} The result of chapter creating.
 */
async function createComicChapter(chapterDetail, isDrafted) {
    const requestBody = new FormData();

    const scheduledAt = DateTimeHelper.toISODateString(
        chapterDetail.scheduleOption.scheduleDateTime
    );

    // Populate comic detail information to the request body.
    requestBody.append("comicId", chapterDetail.comicId);
    requestBody.append("title", chapterDetail.title);
    requestBody.append("description", chapterDetail.description);
    requestBody.append("thumbnailImageFile", chapterDetail.thumbnailImageFile);
    requestBody.append("publicLevel", chapterDetail.publicLevel);
    requestBody.append("allowComment", chapterDetail.allowComment);
    requestBody.append("isDrafted", isDrafted);
    requestBody.append("isScheduled", chapterDetail.scheduleOption.isScheduled);
    requestBody.append("scheduledAt", scheduledAt);

    // Add the chapter image list to the request body.
    for (const imageItem of chapterDetail.chapterImageItems) {
        requestBody.append("chapterImageFiles", imageItem.imageFile);
    }

    const result = new CreateComicChapterResult(false, null);

    try {
        await axios({
            url: `${BaseWebApiUrl}/art10/chapter/create`,
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

const CreatorStudio9ApiHandler = {
    getComicDetailToCreateChapterAsync: getComicDetailToCreateChapter,
    createComicChapterAsync: createComicChapter,
};

export { CreatorStudio9ApiHandler };
