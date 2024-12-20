import { DateTimeHelper } from "src/helpers/DateTimeHelper";
import { EditableChapterImageItem } from "./EditableChapterImageItem";

const getChapterDetailErrors = {
    ChapterNotFound: {
        errorCode: "Art12.CHAPTER_ID_IS_NOT_FOUND.1",
        message: "Tập không tìm thấy hoặc bị xóa",
    },
    ChapterIsRemoved: {
        errorCode: "Art12.CHAPTER_IS_TEMPORARILY_REMOVED.2",
        message: "Tập không tìm thấy hoặc bị xóa",
    },
    NoPermission: {
        errorCode: "Art12.NO_PERMISSION_GRANTED_FOR_CURRENT_CREATOR.3",
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
        case getChapterDetailErrors.ChapterNotFound.errorCode:
            return getChapterDetailErrors.ChapterNotFound.message;

        case getChapterDetailErrors.ChapterIsRemoved.errorCode:
            return getChapterDetailErrors.ChapterIsRemoved.message;

        case getChapterDetailErrors.NoPermission.errorCode:
            return getChapterDetailErrors.NoPermission.message;

        default:
            return getChapterDetailErrors.ChapterNotFound.message;
    }
}

class GetComicChapterDetailResponseDto {
    /**
     * @param {String} id Id of current comic chapter.
     * @param {String} comicId Id of comic that contains this chapter.
     * @param {String} title Title of current comic chapter.
     * @param {String} comicTitle Comic title of current chapter.
     * @param {String} thumbnailUrl Thumbnail URL of current comic chapter.
     * @param {Number} uploadOrder Upload order of current comic chapter.
     * @param {String} description The description of current comic chapter.
     * @param {Number} publishStatus Publish status value of current comic chapter.
     * @param {Number} publicLevel Public level value of current comic chapter.
     * @param {Boolean} allowComment Indicate to allow comment on this comic chapter.
     * @param {Strign} publishedAt The datetime that current comic chapter is published at.
     * @param {EditableChapterImageItem[]} chapterMedias The list of medias of current comic chapter.
     * @param {Number} totalMediaSize The total media size in bytes of current comic chapter.
     */
    constructor(
        id,
        comicId,
        title,
        comicTitle,
        thumbnailUrl,
        uploadOrder,
        description,
        publishStatus,
        publicLevel,
        allowComment,
        publishedAt,
        chapterMedias,
        totalMediaSize
    ) {
        // Chapter detail section.
        this.id = id;
        this.comicId = comicId;
        this.title = title;
        this.comicTitle = comicTitle;
        this.thumbnailUrl = thumbnailUrl;
        this.uploadOrder = uploadOrder;
        this.description = description;
        this.publishStatus = publishStatus;
        this.publicLevel = publicLevel;
        this.allowComment = allowComment;
        this.publishedAt = DateTimeHelper.formatISODate(publishedAt);
        this.chapterMedias = chapterMedias;
        this.totalMediaSize = totalMediaSize;

        // Validation and checking section.
        this.isSuccess = true;
        this.errorMessage = null;
    }

    /**
     * A short hand to create failed instance of GetComicChapterDetailResponseDto
     *
     * @param {String} errorCode The error code to get the message.
     * @returns {GetComicChapterDetailResponseDto} The failed instance of GetComicChapterDetailResponseDto.
     */
    static failedWithErrorCode(errorCode) {
        const failedResult = new GetComicChapterDetailResponseDto();

        failedResult.isSuccess = false;
        failedResult.errorMessage = getMessageFromErrorCode(errorCode);

        return failedResult;
    }

    /**
     * Map the input api response body into GetComicChapterDetailResponseDto instance.
     *
     * @param {GetComicChapterDetailResponseDto} apiResponseBody The response body to map from.
     */
    static mapFrom(apiResponseBody) {
        return new GetComicChapterDetailResponseDto(
            apiResponseBody.id,
            apiResponseBody.comicId,
            apiResponseBody.title,
            apiResponseBody.comicTitle,
            apiResponseBody.thumbnailUrl,
            apiResponseBody.uploadOrder,
            apiResponseBody.description,
            apiResponseBody.publishStatus,
            apiResponseBody.publicLevel,
            apiResponseBody.allowComment,
            apiResponseBody.publishedAt,
            EditableChapterImageItem.mapArray(apiResponseBody.chapterMedias),
            apiResponseBody.totalMediaSize
        );
    }
}

export { GetComicChapterDetailResponseDto };
