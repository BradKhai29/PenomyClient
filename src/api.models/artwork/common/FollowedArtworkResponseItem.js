import { DateTimeHelper } from "src/helpers/DateTimeHelper";

class ChapterResponseItem {
    /**
     * @param {String} id If of the chapter.
     * @param {Number} uploadOrder Upload order of the chapter.
     * @param {String} publishedAt The published datetime (ISO format) of the chapter from this user.
     */
    constructor(id, uploadOrder, publishedAt) {
        this.id = id;
        this.uploadOrder = uploadOrder;
        this.publishedAt = publishedAt;
        this.publishedDateTime = new Date(publishedAt);
    }

    getShortPublishedAt() {
        return DateTimeHelper.formatISODate(
            this.publishedAt,
            DateTimeHelper.DD_MM_YYYY_FORMAT
        );
    }

    getNormalizedPublishedAt() {
        return this.publishedDateTime;
    }

    /**
     * Map from the api response to the ChapterResponseItem instance.
     *
     * @param {ChapterResponseItem} apiResponse The api response to map from.
     * @returns {ChapterResponseItem} The instance after mapping.
     */
    static mapFrom(apiResponse) {
        if (apiResponse) {
            return new ChapterResponseItem(
                apiResponse.id,
                apiResponse.uploadOrder,
                apiResponse.publishedAt
            );
        }

        return new ChapterResponseItem(null, null, null);
    }
}

class FollowedArtworkResponseItem {
    /**
     * @param {String} id Id of the artwork item.
     * @param {String} title Title of the artwork item.
     * @param {String} thumbnailUrl ThumbnailURL of the artwork item.
     * @param {Number} artworkStatus The status of the artwork item.
     * @param {Number} averageStarRates The average star rates value of the artwork item.
     * @param {String} originImageUrl The image of the origin of the artwork item.
     * @param {String} creatorId The id of the creator of this artwork item.
     * @param {String} creatorName The name of the creator of the artwork item.
     * @param {String} creatorAvatarUrl The avatar url of the creator of the artwork item.
     * @param {ChapterResponseItem} chapter The last viewed chapter of the user
     */
    constructor(
        id,
        title,
        thumbnailUrl,
        artworkStatus,
        averageStarRates,
        originImageUrl,
        creatorId,
        creatorName,
        creatorAvatarUrl,
        chapter
    ) {
        this.id = id;
        this.title = title;
        this.thumbnailUrl = thumbnailUrl;
        this.artworkStatus = artworkStatus;
        this.averageStarRates = averageStarRates;
        this.originImageUrl = originImageUrl;
        this.creatorId = creatorId;
        this.creatorName = creatorName;
        this.creatorAvatarUrl = creatorAvatarUrl;
        this.chapter = chapter;
    }

    getNormalizedPublishedAt() {
        return this.chapter.getNormalizedPublishedAt();
    }

    getShortPublishedAt() {
        return this.chapter.getShortPublishedAt();
    }

    /**
     * Map from the api response to the ViewHistoryArtworkResponseItem instance.
     *
     * @param {FollowedArtworkResponseItem} apiResponse The api response to map from.
     * @returns {FollowedArtworkResponseItem} The instance after mapping.
     */
    static mapFrom(apiResponse) {
        return new FollowedArtworkResponseItem(
            apiResponse.id,
            apiResponse.title,
            apiResponse.thumbnailUrl,
            apiResponse.artworkStatus,
            apiResponse.averageStarRates,
            apiResponse.originImageUrl,
            apiResponse.creatorId,
            apiResponse.creatorName,
            apiResponse.creatorAvatarUrl,
            ChapterResponseItem.mapFrom(apiResponse.chapter)
        );
    }

    /**
     * Map from the array of api response items to the array of ViewHistoryArtworkResponseItem instance.
     *
     * @param {FollowedArtworkResponseItem[]} responseItems The array of items to map from.
     * @returns {FollowedArtworkResponseItem[]} The array of instance after mapping.
     */
    static mapFromArray(responseItems) {
        return responseItems.map((item) => this.mapFrom(item));
    }
}

export { FollowedArtworkResponseItem, ChapterResponseItem };
