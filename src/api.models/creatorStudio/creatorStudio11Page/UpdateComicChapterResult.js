const createChapterErrors = {
    FileServiceError: {
        errorCode: "Art12.INVALID_JSON_SCHEMA_FROM_INPUT_MEDIA_ITEMS.1",
        message: "Thông tin gửi lên không hợp lệ",
    },
    InvalidFileFormat: {
        errorCode: "Art12.FILE_SERVICE_ERROR.2",
        message: "Có lỗi xảy ra khi tải ảnh lên server",
    },
    ChapterImageListIsEmpty: {
        errorCode: "Art12.FILE_SIZE_IS_EXCEED_THE_LIMIT.4",
        message: "Kích thước ảnh vượt ngưỡng cho phép",
    },
};

/**
 * Get the error message corresponding to the input error code.
 * @param {String} errorCode The error code the get the message.
 * @returns An error message from the input error code.
 */
function getMessageFromErrorCode(errorCode) {
    switch (errorCode) {
        case createChapterErrors.FileServiceError.errorCode:
            return createChapterErrors.FileServiceError.message;

        case createChapterErrors.InvalidFileFormat.errorCode:
            return createChapterErrors.InvalidFileFormat.message;

        case createChapterErrors.ChapterImageListIsEmpty.errorCode:
            return createChapterErrors.ChapterImageListIsEmpty.message;

        default:
            return createChapterErrors.FileServiceError.message;
    }
}

class UpdateComicChapterResult {
    constructor(isSuccess, message) {
        this.isSuccess = isSuccess;
        this.message = message;
    }
}

export { UpdateComicChapterResult };
