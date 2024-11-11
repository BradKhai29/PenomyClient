class ArtworkChapterResponse {
    /**
     * Creates a new instance of ArtworkChapterResponse.
     * @param {number} id The ID of the chapter.
     * @param {number} uploadOrder The order of the chapter when it was uploaded.
     * @param {string} chapterName The name of the chapter.
     * @param {string} createdTime The date and time when the chapter was created.
     * @param {number} commentCount The number of comments on the chapter.
     * @param {number} favoriteCount The number of favorites on the chapter.
     * @param {number} viewCount The number of views on the chapter.
     * @param {string} thumbnailUrl The URL of the thumbnail image for the chapter.
     * @param {Boolean} allowComment Check if the chapter allow to comment or not.
     */
    constructor(
        id,
        uploadOrder,
        chapterName,
        createdTime,
        commentCount,
        favoriteCount,
        viewCount,
        thumbnailUrl,
        allowComment
    ) {
        (this.id = id),
            (this.uploadOrder = uploadOrder),
            (this.chapterName = chapterName),
            (this.createdTime = createdTime),
            (this.commentCount = commentCount),
            (this.favoriteCount = favoriteCount),
            (this.viewCount = viewCount),
            (this.thumbnailUrl = thumbnailUrl);
        this.allowComment = allowComment;
    }
}
export { ArtworkChapterResponse };
