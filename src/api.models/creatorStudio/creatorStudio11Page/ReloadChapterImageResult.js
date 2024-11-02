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

class ReloadChapterImageResult {
    /**
     * @param {Boolean} isSuccess True if the result is success.
     * @param {String} errorMessage Error message when reload the chapter images failed.
     * @param {EditableChapterImageItem[]} chapterImageItems The list of chapter image items that loaded success.
     */
    constructor(isSuccess, errorMessage, chapterImageItems) {
        this.isSuccess = isSuccess;
        this.errorMessage = errorMessage;
        this.chapterImageItems = chapterImageItems;
    }

    /**
     * Map the api response body into ReloadChapterImageResult instance.
     *
     * @param {EditableChapterImageItem[]} apiResponseBody The response body to map from.
     */
    static mapFrom(apiResponseBody) {
        const chapterImageItems =
            EditableChapterImageItem.mapArray(apiResponseBody);

        return new ReloadChapterImageResult(true, null, chapterImageItems);
    }

    /**
     * A short hand to create failed instance of ReloadChapterImageResult.
     *
     * @param {String} errorCode The error code to get the message.
     * @returns {GetComicChapterDetailResponseDto} The failed instance of ReloadChapterImageResult.
     */
    static failedWithErrorCode(errorCode) {
        const failedResult = new ReloadChapterImageResult(false, null);

        failedResult.errorMessage = getMessageFromErrorCode(errorCode);

        return failedResult;
    }
}

export { ReloadChapterImageResult };
