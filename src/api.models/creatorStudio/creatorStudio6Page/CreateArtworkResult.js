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
 *
 * @param {String} errorCode The error code the get the message.
 * @returns {String} An error message from the input error code.
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

class CreateArtworkResult {
    /**
     * @param {Boolean} isSuccess True if the result is succes.
     * @param {String} comicId Id of the comic that created successfully.
     * @param {String} message The error message when the result failed.
     */
    constructor(isSuccess, comicId, message) {
        this.isSuccess = isSuccess;
        this.comicId = comicId;
        this.message = message;
    }

    /**
     * A short hand to create failed instance of CreateArtworkResult.
     *
     * @param {String} errorCode The error code to get the message.
     * @returns {GetComicChapterDetailResponseDto} The failed instance of ReloadChapterImageResult.
     */
    static failedWithErrorCode(errorCode) {
        const failedResult = new CreateArtworkResult(false, null, null);

        failedResult.errorMessage = getMessageFromErrorCode(errorCode);

        return failedResult;
    }

    /**
     * A short hand to create success instance of CreateArtworkResult class.
     *
     * @param {String} comicId Id of the comic that created successfully..
     * @returns {CreateArtworkResult} The success instance of CreateArtworkResult.
     */
    static success(comicId) {
        return new CreateArtworkResult(true, comicId, null);
    }
}

export { CreateArtworkResult };
