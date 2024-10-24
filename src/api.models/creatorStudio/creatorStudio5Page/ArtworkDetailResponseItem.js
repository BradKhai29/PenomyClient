class ArtworkDetailResponseItem {
    /**
     *
     * @param {String} id Id of artwork
     * @param {String} title Title of artwork
     * @param {String} thumbnailUrl URL Thumbnail of artwork
     * @param {Number} artworkStatus
     * @param {Number} publicLevel
     * @param {Number} totalUsersRated
     * @param {Number} averageStarRate
     * @param {Number} totalChapters
     * @param {String} createdAt
     * @param {String} updatedAt
     */
    constructor(
        id,
        title,
        thumbnailUrl,
        originImageUrl,
        artworkStatus,
        publicLevel,
        totalUsersRated,
        averageStarRate,
        totalChapters,
        createdAt,
        updatedAt
    ) {
        this.id = id;
        this.title = title;
        this.thumbnailUrl = thumbnailUrl;
        this.originImageUrl = originImageUrl;
        this.artworkStatus = artworkStatus;
        this.publicLevel = publicLevel;
        this.totalUsersRated = totalUsersRated;
        this.averageStarRate = averageStarRate;
        this.totalChapters = totalChapters;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export { ArtworkDetailResponseItem };
