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
     * @param {Number} totalViews
     * @param {Number} totalFavorites
     * @param {Number} totalFollowers
     * @param {Number} totalComments
     * @param {String} createdAt
     * @param {String} updatedAt
     */
    constructor(
        id,
        title,
        thumbnailUrl,
        artworkStatus,
        publicLevel,
        totalUsersRated,
        averageStarRate,
        totalChapters,
        totalViews,
        totalFavorites,
        totalFollowers,
        totalComments,
        createdAt,
        updatedAt
    ) {
        this.id = id;
        this.title = title;
        this.thumbnailUrl = thumbnailUrl;
        this.artworkStatus = artworkStatus;
        this.publicLevel = publicLevel;
        this.totalUsersRated = totalUsersRated;
        this.averageStarRate = averageStarRate;
        this.totalChapters = totalChapters;
        this.totalViews = totalViews;
        this.totalFavorites = totalFavorites;
        this.totalFollowers = totalFollowers;
        this.totalComments = totalComments;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

export { ArtworkDetailResponseItem };
