import { ChapterImageResponseItem } from "./ChapterImageResponseItem";

const getComicChapterErrors = {
    ChapterNotFound: {
        errorCode: "G9.CHAPTER_IS_NOT_FOUND.1",
        message: "Không tìm thấy nội dung",
    },
};

class ComicChapterDetailResponseDto {
    /**
     *
     * @param {String} title Title of current chapter.
     * @param {String} comicTitle Title of the comic that contains current chapter.
     * @param {String} description Description of current chapter.
     * @param {Number} uploadOrder Upload order of current chapter.
     * @param {Boolean} allowComment Indicate if the current chapter is allowed to comment or not.
     * @param {String} createdBy Id of the creator of comic that contains current chapter.
     * @param {Number} totalFavorites Total favorites of current chapter.
     * @param {ChapterImageResponseItem[]} images Imagel list of current chapter.
     */
    constructor(
        title,
        comicTitle,
        description,
        uploadOrder,
        allowComment,
        createdBy,
        totalFavorites,
        images
    ) {
        this.title = title;
        this.comicTitle = comicTitle;
        this.description = description;
        this.uploadOrder = uploadOrder;
        this.allowComment = allowComment;
        this.createdBy = createdBy;
        this.totalFavorites = totalFavorites;
        this.images = images;

        // These fields are supported for api check.
        this.isFound = true;
        this.errorMessage = null;
    }

    clone() {
        return new ComicChapterDetailResponseDto(
            this.title,
            this.comicTitle,
            this.description,
            this.uploadOrder,
            this.allowComment,
            this.createdBy,
            this.totalFavorites,
            this.images
        );
    }

    /**
     * Map the input responseBody into a new ComicChapterDetailResponseDto instance.
     *
     * @param {ComicChapterDetailResponseDto} responseBody The response body to map from.
     */
    static mapFrom(responseBody) {
        return new ComicChapterDetailResponseDto(
            responseBody.title,
            responseBody.comicTitle,
            responseBody.description,
            responseBody.uploadOrder,
            responseBody.allowComment,
            responseBody.createdBy,
            responseBody.totalFavorites,
            ChapterImageResponseItem.mapArray(responseBody.images)
        );
    }

    /**
     * A short hand to create a failed instance of ComicChapterDetailResponseDto.
     *
     * @param {String} errorCode The error code to map and create instance.
     */
    static failedWithErrorCode(errorCode) {
        const failedResult = new ComicChapterDetailResponseDto();

        failedResult.isFound = false;
        failedResult.errorMessage =
            getComicChapterErrors.ChapterNotFound.message;

        return failedResult;
    }
}

export { ComicChapterDetailResponseDto };
