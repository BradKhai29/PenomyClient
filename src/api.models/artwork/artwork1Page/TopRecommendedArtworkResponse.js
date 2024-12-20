class TopRecommendedArtworkResponse {
    /**
     *
     * @param {String} id Id of the artwork.
     * @param {String} title Title of the artwork.
     * @param {String} origin Origin of the artwork.
     * @param {String} originImageUrl Image URL of the origin of the artwork.
     * @param {String} thumbnailUrl Thumbnail URL of the artwork.
     * @param {String} introduction The introduction of the artwork.
     * @param {Number} lastChapterUploadOrder Last Chapter Upload Order of the artwork.
     * @param {Number} fixedTotalChapters The fixed number of chapters this artwork will have
     * (Apply only for the artwork with type animation). If you watch enough anime, you will get familiar with information like: 10/12 chapters, in that 12 is indicated this field.
     * @param {String} latestChapterId The id of the latest chapter.
     * @param {String} latestChapterTitle The title of the latest chapter.
     * @param {Number} averageStarRates The average star rates of the artwork.
     * @param {String[]} categories The list of categories of the artwork.
     */
    constructor(
        id,
        title,
        origin,
        originImageUrl,
        thumbnailUrl,
        introduction,
        lastChapterUploadOrder,
        fixedTotalChapters,
        latestChapterId,
        latestChapterTitle,
        averageStarRates,
        categories,
        creatorId,
        creatorName,
        creatorAvatarUrl
    ) {
        this.id = id;
        this.title = title;
        this.origin = origin;
        this.originImageUrl = originImageUrl;
        this.thumbnailUrl = thumbnailUrl;
        this.introduction = introduction;
        this.lastChapterUploadOrder = lastChapterUploadOrder;
        this.fixedTotalChapters = fixedTotalChapters;
        this.latestChapterId = latestChapterId;
        this.latestChapterTitle = latestChapterTitle;
        this.averageStarRates = averageStarRates;
        this.categories = categories;
        // Creator section.
        this.creatorId = creatorId;
        this.creatorName = creatorName;
        this.creatorAvatarUrl = creatorAvatarUrl;
    }

    /**
     * Map from the input apiResponseItem to the TopRecommendedArtworkResponse instance.
     *
     * @param {TopRecommendedArtworkResponse} apiResponseItem The api response item to map from.
     */
    static mapFrom(apiResponseItem) {
        return new TopRecommendedArtworkResponse(
            apiResponseItem.id,
            apiResponseItem.title,
            apiResponseItem.origin,
            apiResponseItem.originImageUrl,
            apiResponseItem.thumbnailUrl,
            apiResponseItem.introduction,
            apiResponseItem.lastChapterUploadOrder,
            apiResponseItem.fixedTotalChapters,
            apiResponseItem.latestChapterId,
            apiResponseItem.latestChapterTitle,
            apiResponseItem.averageStarRates,
            apiResponseItem.categories,
            apiResponseItem.creatorId,
            apiResponseItem.creatorName,
            apiResponseItem.creatorAvatarUrl
        );
    }

    /**
     * Map from the input array of apiResponseItem to the
     * array of TopRecommendedArtworkResponse instance.
     *
     * @param {TopRecommendedArtworkResponse[]} apiResponseItems An array of api response item to map from.
     */
    static mapAsArray(apiResponseItems) {
        return apiResponseItems.map((item) => this.mapFrom(item));
    }
}

export { TopRecommendedArtworkResponse };
