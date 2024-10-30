const tempRemoveArtworkErrors = {
    ArtworkIdNotFound: {
        errorCode: "Art8.ARTWORK_ID_NOT_FOUND.1",
        message: "Không tìm thấy tác phẩm",
    },
    ArtworkAlreadyRemoved: {
        errorCode: "Art8.ARTWORK_IS_ALREADY_REMOVED.2",
        message: "Tác phẩm đã bị xóa hoặc không tồn tại",
    },
    DatabaseError: {
        errorCode: "Art8.DATABASE_ERROR.3",
        message: "Có lỗi xảy ra khi xử lý",
    },
};

/**
 * Get the error message corresponding to the input error code.
 * @param {String} errorCode The error code the get the message.
 * @returns An error message from the input error code.
 */
function internalGetMessageFromErrorCode(errorCode) {
    switch (errorCode) {
        case tempRemoveArtworkErrors.ArtworkIdNotFound.errorCode:
            return tempRemoveArtworkErrors.ArtworkIdNotFound.message;

        case tempRemoveArtworkErrors.ArtworkAlreadyRemoved.errorCode:
            return tempRemoveArtworkErrors.ArtworkAlreadyRemoved.message;

        default:
            return tempRemoveArtworkErrors.DatabaseError.message;
    }
}

class TemporarilyRemoveArtworkResult {
    /**
     *
     * @param {Boolean} isSuccess True is indicated the result is succes.
     * @param {*} message The error message of the result when failed
     */
    constructor(isSuccess, message) {
        this.isSuccess = isSuccess;
        this.message = message;
    }

    static getMessageFromErrorCode(errorCode) {
        return internalGetMessageFromErrorCode(errorCode);
    }
}

export { TemporarilyRemoveArtworkResult };
