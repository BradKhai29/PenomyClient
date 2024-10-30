const updateArtworkErrors = {
    FileServiceError: {
        errorCode: "Art7.FILE_SERVICE_ERROR.3",
        message: "Server gặp lỗi khi tải ảnh",
    },
    InvalidFileFormat: {
        errorCode: "Art7.INVALID_FILE_FORMAT.6",
        message: "File có định dạng không hợp lệ hoặc bị chỉnh sửa",
    },
};

/**
 * Get the error message corresponding to the input error code.
 *
 * @param {String} errorCode The error code the get the message.
 * @returns An error message from the input error code.
 */
function internalGetMessageFromErrorCode(errorCode) {
    switch (errorCode) {
        case updateArtworkErrors.FileServiceError.errorCode:
            return updateArtworkErrors.FileServiceError.message;

        case updateArtworkErrors.InvalidFileFormat.errorCode:
            return updateArtworkErrors.InvalidFileFormat.message;

        default:
            return updateArtworkErrors.FileServiceError.message;
    }
}

class UpdateArtworkResult {
    /**
     *
     * @param {Boolean} isSuccess True if the operation is success.
     * @param {String} message The error message when the operation is failed.
     */
    constructor(isSuccess, message) {
        this.isSuccess = isSuccess;
        this.message = message;
    }

    /**
     * Get the error message corresponding to the input error code.
     *
     * @param {String} errorCode The error code the get the message.
     * @returns An error message from the input error code.
     */
    static getMessageFromErrorCode(errorCode) {
        return internalGetMessageFromErrorCode(errorCode);
    }
}

export { UpdateArtworkResult };
