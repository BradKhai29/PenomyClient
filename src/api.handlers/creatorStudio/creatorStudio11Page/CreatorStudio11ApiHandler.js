import axios from "axios";

// Dependencies section.
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { AxiosHelper } from "src/helpers/AxiosHelper";
import { DateTimeHelper } from "src/helpers/DateTimeHelper";

// Models section.
import { GetComicChapterDetailResponseDto } from "src/api.models/creatorStudio/creatorStudio11Page/GetComicChapterDetailResponseDto";
import { UpdateComicChapterDetail } from "src/api.models/creatorStudio/creatorStudio11Page/UpdateComicChapterDetail";
import { UpdateComicChapterResult } from "src/api.models/creatorStudio/creatorStudio11Page/UpdateComicChapterResult";
import { FileHelper } from "src/helpers/FileHelper";
import { ReloadChapterImageResult } from "src/api.models/creatorStudio/creatorStudio11Page/ReloadChapterImageResult";

// Init store for later operation.
import { useAuthStore } from "src/stores/common/AuthStore";
const authStore = useAuthStore();

const ChapterUpdateModes = {
    DRAFTED: {
        name: "DRAFTED",
        value: 1,
    },
    SCHEDULED: {
        name: "SCHEDULED",
        value: 2,
    },
    PUBLISHED: {
        name: "PUBLISHED",
        value: 3,
    },
    UPDATE_CONTENT_ONLY: {
        name: "UPDATE_CONTENT_ONLY",
        value: 4,
    },
};

/**
 * Get the detail of the specified chapter with input id
 * support for updating the detail.
 *
 * @param {String} chapterId The id of the chapter to get detail.
 * @returns {Promise<GetComicChapterDetailResponseDto>} The promise contains the comic detail result.
 */
async function getChapterDetailByIdAsync(chapterId) {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/art12/chapter/${chapterId}`,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
        });

        const chapterDetail = GetComicChapterDetailResponseDto.mapFrom(
            response.data.body
        );

        return chapterDetail;
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);
        const errorCode = axiosError.response.data.appCode;

        return GetComicChapterDetailResponseDto.failedWithErrorCode(errorCode);
    }
}

/**
 * Send the request to api to update a comic chapter with specified chapterDetail.
 *
 * @param {UpdateComicChapterDetail} chapterDetail The detail of the chapter.
 * @param {Boolean} isDrafted Specify to update a draft for this chapter.
 * @returns {Promise<UpdateComicChapterResult>} The result of chapter updating.
 */
async function updateComicChapter(chapterDetail, updateMode) {
    const requestBody = new FormData();

    // Populate comic detail information to the request body.
    requestBody.append("comicId", chapterDetail.comicId);
    requestBody.append("chapterId", chapterDetail.id);
    requestBody.append("title", chapterDetail.title);
    requestBody.append("description", chapterDetail.description);
    requestBody.append("thumbnailImageFile", chapterDetail.thumbnailImageFile);
    requestBody.append("publicLevel", chapterDetail.publicLevel);
    requestBody.append("allowComment", chapterDetail.allowComment);
    requestBody.append("updateMode", updateMode);

    // Get the scheduled at from scheduleOption
    // when the update mode is SCHEDULED.
    if (updateMode == ChapterUpdateModes.SCHEDULED.value) {
        const scheduledAt = DateTimeHelper.toISODateString(
            chapterDetail.scheduleOption.scheduleDateTime
        );
        requestBody.append("scheduledAt", scheduledAt);
    }
    // Otherwise ignore the schedule option
    // and add the datetimeNow as default.
    else {
        const dateTimeNow = new Date();

        requestBody.append(
            "scheduledAt",
            DateTimeHelper.toISODateString(dateTimeNow)
        );
    }

    // Add the chapter image list to the request body.
    requestBody.append(
        "chapterMediaItemsInJson",
        JSON.stringify(chapterDetail.chapterMedias)
    );

    // Add all new upload image files to the request body.
    for (const mediaItem of chapterDetail.chapterMedias) {
        if (mediaItem.imageFile) {
            const imageFile = mediaItem.imageFile;
            const fileExtension = FileHelper.getFileExtension(imageFile);

            requestBody.append(
                "newChapterImageFiles",
                imageFile,
                `${mediaItem.id}.${fileExtension}`
            );
        }
    }

    const result = new UpdateComicChapterResult(false, null);

    try {
        await axios({
            url: `${BaseWebApiUrl}/art12/chapter/update`,
            method: HttpMethod.POST,
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: authStore.bearerAccessToken(),
            },
            data: requestBody,
        });

        result.isSuccess = true;
    } catch (error) {
        console.log(error);

        result.message = null;
    }

    return result;
}

/**
 * Reload all images of the specified chapter.
 *
 * @param {String} comicId Id of the comic that contains the chapter.
 * @param {String} chapterId Id of the chapter to reload the images.
 * @returns {Promise<ReloadChapterImageResult>} The promise contains ReloadChapterImageResult instance as the result of fetching api.
 */
async function reloadChapterImagesAsync(comicId, chapterId) {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/art12/chapter/reload?comicId=${comicId}&chapterId=${chapterId}`,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
        });

        return ReloadChapterImageResult.mapFrom(response.data.body);
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);

        return ReloadChapterImageResult.failedWithErrorCode(
            axiosError.response.data.appCode
        );
    }
}

const CreatorStudio11ApiHandler = {
    getChapterDetailByIdAsync: getChapterDetailByIdAsync,
    updateComicChapterAsync: updateComicChapter,
    reloadChapterImagesAsync: reloadChapterImagesAsync,
};

export { CreatorStudio11ApiHandler, ChapterUpdateModes };
