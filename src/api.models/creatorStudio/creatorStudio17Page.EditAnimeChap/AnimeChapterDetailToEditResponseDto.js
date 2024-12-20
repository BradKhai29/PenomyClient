import { DateTimeHelper } from "src/helpers/DateTimeHelper";

const getChapterDetailErrors = {
    ChapterIsRemoved: {
        errorCode: "Art22.CHAPTER_IS_TEMPORARILY_REMOVED.2",
        message: "Tập không tìm thấy hoặc bị xóa",
    },
    NoPermission: {
        errorCode: "Art22.NO_PERMISSION_GRANTED_FOR_CURRENT_CREATOR.3",
        message: "Bạn không có quyền truy cập vào nội dung này",
    },
};

/**
 * Get the error message corresponding to the input error code.
 * @param {String} errorCode The error code the get the message.
 * @returns An error message from the input error code.
 */
function getMessageFromErrorCode(errorCode) {
    switch (errorCode) {
        case getChapterDetailErrors.ChapterIsRemoved.errorCode:
            return getChapterDetailErrors.ChapterIsRemoved.message;

        case getChapterDetailErrors.NoPermission.errorCode:
            return getChapterDetailErrors.NoPermission.message;

        default:
            return getChapterDetailErrors.NoPermission.message;
    }
}

class AnimeChapterDetailToEditResponseDto {
    /**
     * @param {String} id Id of current anime chapter.
     * @param {String} animeId Id of anime that contains this chapter.
     * @param {String} title Title of current anime chapter.
     * @param {String} animeTitle anime title of current chapter.
     * @param {String} thumbnailUrl Thumbnail URL of current anime chapter.
     * @param {Number} uploadOrder Upload order of current anime chapter.
     * @param {String} description The description of current anime chapter.
     * @param {Number} publishStatus Publish status value of current anime chapter.
     * @param {Number} publicLevel Public level value of current anime chapter.
     * @param {Boolean} allowComment Indicate to allow comment on this anime chapter.
     * @param {String} publishedAt The datetime that current anime chapter is published at.
     * @param {string} chapterVideoUrl The current video url of this chapter.
     * @param {Number} totalMediaSize The total media size in bytes of current anime chapter.
     */
    constructor(
        id,
        animeId,
        title,
        animeTitle,
        thumbnailUrl,
        uploadOrder,
        description,
        publishStatus,
        publicLevel,
        allowComment,
        publishedAt,
        chapterVideoUrl,
        totalMediaSize
    ) {
        // Chapter detail section.
        this.id = id;
        this.animeId = animeId;
        this.title = title;
        this.animeTitle = animeTitle;
        this.thumbnailUrl = thumbnailUrl;
        this.uploadOrder = uploadOrder;
        this.description = description;
        this.publishStatus = publishStatus;
        this.publicLevel = publicLevel;
        this.allowComment = allowComment;
        this.publishedAt = publishedAt;
        this.chapterVideoUrl = chapterVideoUrl;
        this.totalMediaSize = totalMediaSize;

        // Validation and checking section.
        this.isSuccess = true;
        this.errorMessage = null;
    }

    /**
     * A short hand to create failed instance of AnimeChapterDetailToEditResponseDto
     *
     * @param {String} errorCode The error code to get the message.
     * @returns {AnimeChapterDetailToEditResponseDto} The failed instance of AnimeChapterDetailToEditResponseDto.
     */
    static failedWithErrorCode(errorCode) {
        const failedResult = new AnimeChapterDetailToEditResponseDto();

        failedResult.isSuccess = false;
        failedResult.errorMessage = getMessageFromErrorCode(errorCode);

        return failedResult;
    }

    /**
     * Map the input api response body into AnimeChapterDetailToEditResponseDto instance.
     *
     * @param {AnimeChapterDetailToEditResponseDto} apiResponseBody The response body to map from.
     */
    static mapFrom(apiResponseBody) {
        return new AnimeChapterDetailToEditResponseDto(
            apiResponseBody.id,
            apiResponseBody.animeId,
            apiResponseBody.title,
            apiResponseBody.animeTitle,
            apiResponseBody.thumbnailUrl,
            apiResponseBody.uploadOrder,
            apiResponseBody.description,
            apiResponseBody.publishStatus,
            apiResponseBody.publicLevel,
            apiResponseBody.allowComment,
            apiResponseBody.publishedAt,
            apiResponseBody.chapterVideoUrl,
            apiResponseBody.totalMediaSize
        );
    }
}

export { AnimeChapterDetailToEditResponseDto };
