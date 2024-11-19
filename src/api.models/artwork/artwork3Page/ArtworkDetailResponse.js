import { CategoryResponseItem } from "./CategoryResponseItem";

class ArtworkDetailResponse {
    /**
     *
     * @param {String} id Id of the artwork.
     * @param {String} title Title of the artwork.
     * @param {String} thumbnailUrl ThumbnailURL of the artwork.
     * @param {String} introduction Introduction of this artwork.
     * @param {String} authorId The id of the author of this artwork.
     * @param {String} authorName The name of the author of this artwork.
     * @param {String} countryName The country name this artwork is published.
     * @param {Boolean} hasSeries Check if the current artwork has belonged to any series or not.
     * @param {Number} artworkStatus The status of the artwork.
     * @param {Number} starRates The average star rates of this artwork.
     * @param {Number} totalUsersRated Get the total users that rated for this artwork.
     * @param {Number} viewCount Get the total views of this artwork.
     * @param {Number} favoriteCount Get the total users that added to favorite list of this artwork.
     * @param {Number} commentCount Get the total comments of this artwork detail page.
     * @param {Number} followCount Get the total followers of this artwork.
     * @param {Boolean} isAllowComment Check if current artwork allow user to comment at detail page.
     * @param {Boolean} isUserFavorite Check if the current user has added this artwork to favorite list or not.
     * @param {Boolean} hasFollowed Check if the current user has followed this artwork or not.
     * @param {CategoryResponseItem[]} categories The list of category of this artwork
     */
    constructor(
        id,
        title,
        thumbnailUrl,
        introduction,
        authorId,
        authorName,
        countryName,
        hasSeries,
        seriesId,
        seriesName,
        artworkStatus,
        starRates,
        totalUsersRated,
        viewCount,
        favoriteCount,
        commentCount,
        followCount,
        isAllowComment,
        isUserFavorite,
        hasFollowed,
        categories
    ) {
        this.id = id;
        this.title = title;
        this.introduction = introduction;
        this.countryName = countryName;
        // Author section.
        this.authorId = authorId;
        this.authorName = authorName;
        // Series section.
        this.hasSeries = hasSeries;
        this.seriesId = seriesId;
        this.seriesName = seriesName;

        this.categories = categories;
        this.artworkStatus = artworkStatus;
        this.thumbnailUrl = thumbnailUrl;
        this.viewCount = viewCount;
        this.favoriteCount = favoriteCount;
        this.starRates = starRates;
        this.commentCount = commentCount;
        this.followCount = followCount;
        this.isUserFavorite = isUserFavorite;
        this.hasFollowed = hasFollowed;
        this.isAllowComment = isAllowComment;
        this.totalUsersRated = totalUsersRated;
    }

    /**
     * Map from the input response item to the ArtworkChapterResponse instance.
     *
     * @param {ArtworkDetailResponse} apiResponse The response item to map from.
     * @returns {ArtworkDetailResponse} The instance after mapping.
     */
    static mapFrom(apiResponse) {
        return new ArtworkDetailResponse(
            apiResponse.id,
            apiResponse.title,
            apiResponse.thumbnailUrl,
            apiResponse.introduction,
            apiResponse.authorId,
            apiResponse.authorName,
            apiResponse.countryName,
            // Series section.
            apiResponse.hasSeries,
            apiResponse.seriesId,
            apiResponse.seriesName,
            apiResponse.artworkStatus,
            apiResponse.starRates,
            apiResponse.totalUsersRated,
            apiResponse.viewCount,
            apiResponse.favoriteCount,
            apiResponse.commentCount,
            apiResponse.followCount,
            apiResponse.isAllowComment,
            apiResponse.isUserFavorite,
            apiResponse.hasFollowed,
            CategoryResponseItem.mapFromArray(apiResponse.categories)
        );
    }
}
export { ArtworkDetailResponse };
