import { DateTimeHelper } from "src/helpers/DateTimeHelper";

class ChapterResponseItem {
    /**
     * @param {String} id If of the chapter.
     * @param {Number} uploadOrder Upload order of the chapter.
     * @param {String} viewedAt The last viewed datetime (ISO format) of the chapter from this user.
     */
    constructor(id, uploadOrder, viewedAt) {
        this.id = id;
        this.uploadOrder = uploadOrder;
        this.viewedAt = viewedAt;
        this.viewAtDateTime = new Date(viewedAt);
    }

    getShortViewedAt() {
        return DateTimeHelper.formatISODate(
            this.viewedAt,
            DateTimeHelper.DD_MM_YYYY_FORMAT
        );
    }

    getNormalizedViewedAt() {
        return this.viewAtDateTime;
    }

    /**
     * Map from the api response to the ChapterResponseItem instance.
     *
     * @param {ChapterResponseItem} apiResponse The api response to map from.
     * @returns {ChapterResponseItem} The instance after mapping.
     */
    static mapFrom(apiResponse) {
        return new ChapterResponseItem(
            apiResponse.id,
            apiResponse.uploadOrder,
            apiResponse.viewedAt
        );
    }
}

class ViewHistoryArtworkResponseItem {
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

    getNormalizedViewedAt() {
        return this.chapter.getNormalizedViewedAt();
    }

    getShortViewedAt() {
        return this.chapter.getShortViewedAt();
    }

    /**
     * Map from the api response to the ViewHistoryArtworkResponseItem instance.
     *
     * @param {ViewHistoryArtworkResponseItem} apiResponse The api response to map from.
     * @returns {ViewHistoryArtworkResponseItem} The instance after mapping.
     */
    static mapFrom(apiResponse) {
        return new ViewHistoryArtworkResponseItem(
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
     * @param {ViewHistoryArtworkResponseItem[]} responseItems The array of items to map from.
     * @returns {ViewHistoryArtworkResponseItem[]} The array of instance after mapping.
     */
    static mapFromArray(responseItems) {
        return responseItems.map((item) => this.mapFrom(item));
    }
}

export { ViewHistoryArtworkResponseItem, ChapterResponseItem };
