const createChapterErrors = {
    FileServiceError: {
        errorCode: "Art20.FILE_SERVICE_ERROR.1",
        message: "Server gặp lỗi khi tải ảnh",
    },
    DatabaseError: {
        errorCode: "Art20.DATABASE_ERROR.2",
        message: "Server gặp lỗi khi tải ảnh",
    },
    InvalidFileFormat: {
        errorCode: "Art20.INVALID_FILE_FORMAT.4",
        message: "File có định dạng không hợp lệ hoặc bị chỉnh sửa",
    },
    ChapterImageListIsEmpty: {
        errorCode: "Art20.CHAPTER_IMAGE_LIST_IS_EMPTY.6",
        message: "Danh sách ảnh tải không để trống",
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

const CreateAnimeChapterErrorCode = {
    getMessageFromErrorCode: getMessageFromErrorCode,
};

export { CreateAnimeChapterErrorCode };
