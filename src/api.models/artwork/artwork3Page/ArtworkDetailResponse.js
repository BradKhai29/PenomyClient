import { CategoryResponseItem } from "./CategoryResponseItem";

class ArtworkDetailResponse {
    /**
     *
     * @param {String} id Id of the artwork.
     * @param {String} title Title of the artwork.
     * @param {String} thumbnailUrl ThumbnailURL of the artwork.
     * @param {String} introduction Introduction of this artwork.
     * @param {String} creatorId The id of the creator of this artwork.
     * @param {String} creatorName The name of the creator of this artwork.
     * @param {String} creatorAvatarUrl The avatarURL of the creator of this artwork.
     * @param {Number} creatorTotalFollowers The total followers of the creator of this artwork.
     * @param {String} countryId The id of the country as an origin of this artwork.
     * @param {String} countryName The name of the country as an origin of this artwork.
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
     * @param {String} firstChapterId Id of the first chapter of current comic.
     * @param {String} lastReadChapterId Id of the last read chapter of current comic that viewed by user.
     * @param {Number} totalChapters Total chapters of the current artwork.
     */
    constructor(
        id,
        title,
        thumbnailUrl,
        introduction,
        creatorId,
        creatorName,
        creatorAvatarUrl,
        creatorTotalFollowers,
        countryId,
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
        categories,
        firstChapterId,
        lastReadChapterId,
        totalChapters
    ) {
        this.id = id;
        this.title = title;
        this.introduction = introduction;
        this.countryId = countryId;
        this.countryName = countryName;
        // Author section.
        this.creatorId = creatorId;
        this.creatorName = creatorName;
        this.creatorAvatarUrl = creatorAvatarUrl;
        this.creatorTotalFollowers = creatorTotalFollowers;
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

        // Chapter view history section.
        this.firstChapterId = firstChapterId;
        this.lastReadChapterId = lastReadChapterId;
        this.totalChapters = totalChapters;
    }

    /**
     * Map from the input response item to the ArtworkDetailResponse instance.
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
            // Creator detail section.
            apiResponse.creatorId,
            apiResponse.creatorName,
            apiResponse.creatorAvatarUrl,
            apiResponse.creatorTotalFollowers,
            apiResponse.countryId,
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
            CategoryResponseItem.mapFromArray(apiResponse.categories),
            apiResponse.firstChapterId,
            apiResponse.lastReadChapterId,
            apiResponse.totalChapters
        );
    }

    /**
     * Map the metadata to this artwork detail.
     *
     * @param {ArtworkDetailResponse} metadata The metadata detail.
     */
    static mapMetaData(metadata) {
        const response = new ArtworkDetailResponse();

        response.starRates = metadata.starRates;
        response.totalUsersRated = metadata.totalUsersRated;
        response.favoriteCount = metadata.favoriteCount;
        response.viewCount = metadata.viewCount;
        response.followCount = metadata.followCount;

        return response;
    }

    /**
     * Map the user preference to this artwork detail.
     *
     * @param {ArtworkDetailResponse} userPreference The userPreference detail.
     */
    static mapPreference(userPreference) {
        const response = new ArtworkDetailResponse();

        response.isUserFavorite = userPreference.isUserFavorite ?? false;
        response.hasFollowed = userPreference.hasFollowed;
        response.firstChapterId = userPreference.firstChapterId;
        response.lastReadChapterId = userPreference.lastReadChapterId;

        return response;
    }

    /**
     * Map the creatorProfile to this artwork detail.
     *
     * @param {ArtworkDetailResponse} creatorProfile The creatorProfile detail.
     */
    static mapCreatorProfile(creatorProfile) {
        const response = new ArtworkDetailResponse();

        response.creatorName = creatorProfile.creatorName;
        response.creatorAvatarUrl = creatorProfile.creatorAvatarUrl;
        response.creatorTotalFollowers = creatorProfile.creatorTotalFollowers;

        return response;
    }

    /**
     * Add the user preference to this artwork detail.
     *
     * @param {ArtworkDetailResponse} userPreference The user preference detail.
     */
    addUserPreference(userPreference) {
        // console.log(userPreference);

        this.isUserFavorite = userPreference.isUserFavorite ?? false;
        this.hasFollowed = userPreference.hasFollowed;
        this.firstChapterId = userPreference.firstChapterId;
        this.lastReadChapterId = userPreference.lastReadChapterId;
    }

    /**
     * Add the metadata to this artwork detail.
     *
     * @param {ArtworkDetailResponse} metadata The metadata detail.
     */
    addMetaData(metadata) {
        // console.log(metadata);

        this.starRates = metadata.starRates;
        this.totalUsersRated = metadata.totalUsersRated;
        this.favoriteCount = metadata.favoriteCount;
        this.viewCount = metadata.viewCount;
        this.followCount = metadata.followCount;
    }

    /**
     * Add the creator detail to this artwork detail.
     *
     * @param {ArtworkDetailResponse} creatorProfile The creator detail.
     */
    addCreatorProfile(creatorProfile) {
        this.creatorName = creatorProfile.creatorName;
        this.creatorAvatarUrl = creatorProfile.creatorAvatarUrl;
        this.creatorTotalFollowers = creatorProfile.creatorTotalFollowers;
    }
}
export { ArtworkDetailResponse };
