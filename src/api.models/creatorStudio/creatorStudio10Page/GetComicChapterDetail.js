import { DateTimeHelper } from "src/helpers/DateTimeHelper";
import { ComicChapterMediaResponseItem } from "./ComicChapterMedia";

const updateArtworkErrors = {
    FileServiceError: {
        errorCode: "Art4.FILE_SERVICE_ERROR.3",
        message: "Server gặp lỗi khi tải ảnh",
    },
    InvalidFileFormat: {
        errorCode: "Art4.INVALID_FILE_FORMAT.6",
        message: "File có định dạng không hợp lệ hoặc bị chỉnh sửa",
    },
};

/**
 * Get the error message corresponding to the input error code.
 * @param {String} errorCode The error code the get the message.
 * @returns An error message from the input error code.
 */
function getMessageFromErrorCode(errorCode) {
    switch (errorCode) {
        case updateArtworkErrors.FileServiceError.errorCode:
            return updateArtworkErrors.FileServiceError.message;

        case updateArtworkErrors.InvalidFileFormat.errorCode:
            return updateArtworkErrors.InvalidFileFormat.message;

        default:
            return updateArtworkErrors.FileServiceError.message;
    }
}

class ComicChapterDetail {
    /**
     *
     * @param {String} id Id of current comic chapter.
     * @param {String} title Title of current comic chapter.
     * @param {String} comicTitle Comic title of current chapter.
     * @param {String} thumbnailUrl Thumbnail URL of current comic chapter.
     * @param {Number} uploadOrder Upload order of current comic chapter.
     * @param {Number} publishStatus Publish status value of current comic chapter.
     * @param {Number} publicLevel Public level value of current comic chapter.
     * @param {Boolean} allowComment Indicate to allow comment on this comic chapter.
     * @param {Strign} publishedAt The datetime that current comic chapter is published at.
     * @param {ComicChapterMediaResponseItem[]} chapterMedias The list of medias of current comic chapter.
     * @param {Number} totalMediaSize The total media size in bytes of current comic chapter.
     */
    constructor(
        id,
        title,
        comicTitle,
        thumbnailUrl,
        uploadOrder,
        publishStatus,
        publicLevel,
        allowComment,
        publishedAt,
        chapterMedias,
        totalMediaSize
    ) {
        // Chapter detail section.
        this.id = id;
        this.title = title;
        this.comicTitle = comicTitle;
        this.thumbnailUrl = thumbnailUrl;
        this.uploadOrder = uploadOrder;
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

    static failedWithAppCode(errorCode) {
        const failedResult = new GetComicChapterDetailResponseDto();

        failedResult.isSuccess = false;
        failedResult.errorMessage = getMessageFromErrorCode(errorCode);

        return failedResult;
    }
}

export { ComicChapterDetail };
