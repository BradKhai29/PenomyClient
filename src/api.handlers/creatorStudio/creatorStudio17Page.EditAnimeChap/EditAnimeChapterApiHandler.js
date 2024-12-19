import axios from "axios";

// Dependencies section.
import { BaseWebApiUrl } from "src/api.common/BaseWebApiUrl";
import { HttpMethod } from "src/api.common/HttpMethod";
import { AxiosHelper } from "src/helpers/AxiosHelper";
import { DateTimeHelper } from "src/helpers/DateTimeHelper";
import { FileHelper } from "src/helpers/FileHelper";

// Models section.
import { AnimeChapterDetailToEditResponseDto } from "src/api.models/creatorStudio/creatorStudio17Page.EditAnimeChap/AnimeChapterDetailToEditResponseDto";
import { EditAnimeChapterDetailRequestDto } from "src/api.models/creatorStudio/creatorStudio17Page.EditAnimeChap/EditAnimeChapterDetailRequestDto";
import { UpdateArtworkResult } from "src/api.models/creatorStudio/creatorStudio8Page/UpdateArtworkResult";

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
 * @returns {Promise<AnimeChapterDetailToEditResponseDto>} The promise contains the comic detail result.
 */
async function getChapterDetailByIdAsync(chapterId) {
    try {
        const response = await axios({
            url: `${BaseWebApiUrl}/art22/chapter/${chapterId}`,
            method: HttpMethod.GET,
            headers: {
                Authorization: authStore.bearerAccessToken(),
            },
        });

        const chapterDetail = AnimeChapterDetailToEditResponseDto.mapFrom(
            response.data.body
        );

        return chapterDetail;
    } catch (error) {
        const axiosError = AxiosHelper.toAxiosError(error);
        const errorCode = axiosError.response.data.appCode;

        return AnimeChapterDetailToEditResponseDto.failedWithErrorCode(
            errorCode
        );
    }
}

/**
 * Send the request to api to update a comic chapter with specified chapterDetail.
 *
 * @param {EditAnimeChapterDetailRequestDto} chapterDetail The detail of the chapter.
 * @param {Number} updateMode Specify to update mode for this chapter.
 * @returns {Promise<UpdateArtworkResult>} The result of chapter updating.
 */
async function updateAnimeChapterAsync(chapterDetail, updateMode) {
    const requestBody = new FormData();

    // Populate comic detail information to the request body.
    requestBody.append("animeId", chapterDetail.animeId);
    requestBody.append("chapterId", chapterDetail.id);
    requestBody.append("title", chapterDetail.title);
    requestBody.append("description", chapterDetail.description);
    requestBody.append("thumbnailImageFile", chapterDetail.thumbnailImageFile);
    requestBody.append("chapterVideoFile", chapterDetail.chapterVideoFile);
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

    const result = new UpdateArtworkResult(false, null);

    try {
        await axios({
            url: `${BaseWebApiUrl}/art22/chapter/update`,
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

const EditAnimeChapterApiHandler = {
    getChapterDetailByIdAsync: getChapterDetailByIdAsync,
    updateAnimeChapterAsync,
};

export { EditAnimeChapterApiHandler, ChapterUpdateModes };
