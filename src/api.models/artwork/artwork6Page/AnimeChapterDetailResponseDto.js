class AnimeChapterDetailResponseDto {
    /**
     *
     * @param {String} id Id of the current chapter.
     * @param {String} title Title of the current chapter.
     * @param {Number} uploadOrder The upload order of current chapter.
     * @param {String} videoUrl The videoURL of current chapter.
     * @param {String} animeId Id of the anime contains this chapter.
     * @param {String} description Description of current chapter.
     * @param {Boolean} allowComment Check if current chapter allow comment.
     * @param {Number} totalViews The total views of current chapter.
     */
    constructor(
        id,
        title,
        uploadOrder,
        videoUrl,
        animeId,
        description,
        allowComment,
        totalViews
    ) {
        this.id = id;
        this.title = title;
        this.uploadOrder = uploadOrder;
        this.videoUrl = videoUrl;
        this.animeId = animeId;
        this.description = description;
        this.allowComment = allowComment;
        this.totalViews = totalViews;
    }

    /**
     *
     * @param {AnimeChapterDetailResponseDto} apiResponse The response item to map from.
     * @returns {AnimeChapterDetailResponseDto} Instance after mapping.
     */
    static mapFrom(apiResponse) {
        return new AnimeChapterDetailResponseDto(
            apiResponse.id,
            apiResponse.title,
            apiResponse.uploadOrder,
            apiResponse.videoUrl,
            apiResponse.animeId,
            apiResponse.description,
            apiResponse.allowComment,
            apiResponse.totalViews
        );
    }
}

export { AnimeChapterDetailResponseDto };
