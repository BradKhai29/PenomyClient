class ArtworkDetailResponse {
    /**
     * @param {String} title The title of this artwork.
     * @param {String} countryName The country name of the artwork.
     * @param {String} authorName The author name of the artwork.
     * @param {ArtworkStatus} artworkStatus The artwork status of this artwork.
     * @param {CategoryItem[]} selectedCategories The list of selected categories of this artwork.
     * @param {Boolean} hasSeries Specify if this artwork has series or not.
     * @param {PublicLevelItem} publicLevel The public level of this artwork.
     * @param {String} thumbnailUrl The thumbnail image's URL of this artwork.
     * @param {Number} viewCount The view count of this artwork.
     * @param {Number} favoriteCount The favorite count of this artwork.
     * @param {Number} starRates The star rate of this artwork.
     */
    constructor(
        name,
        countryName,
        authorName,
        selectedCategories,
        artworkStatus,
        serieName,
        hasSeries,
        thumbnailUrl,
        viewCount,
        favoriteCount,
        starRates,
        introduction,
        commentCount,
        followCount,
        isUserFavorite,
        isAllowComment
    ) {
        this.title = name;
        this.countryName = countryName;
        this.authorName = authorName;
        this.selectedCategories = selectedCategories;
        this.artworkStatus = artworkStatus;
        this.serieName = serieName;
        this.hasSeries = hasSeries;
        this.thumbnailUrl = thumbnailUrl;
        this.viewCount = viewCount;
        this.favoriteCount = favoriteCount;
        this.starRates = starRates;
        this.introduction = introduction;
        this.commentCount = commentCount;
        this.followCount = followCount;
        this.isUserFavorite = isUserFavorite;
        this.isAllowComment = isAllowComment;
    }
}
export { ArtworkDetailResponse };
