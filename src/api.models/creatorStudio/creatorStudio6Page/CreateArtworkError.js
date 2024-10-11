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

const CreateArtworkErrorCodeParser = {
    getMessageFromErrorCode: getMessageFromErrorCode,
};

export { CreateArtworkErrorCodeParser };
