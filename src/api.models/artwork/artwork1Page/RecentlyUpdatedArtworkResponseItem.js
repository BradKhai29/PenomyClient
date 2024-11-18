import { NewChapterResponseItem } from "./NewChapterResponseItem";

class RecentlyUpdatedArtworkResponseItem {
    /**
     * @param {String} title Title of the artwork.
     * @param {String} thumbnailUrl Thumbnail ULR of the artwork.
     * @param {String} originImageUrl The origin country flag image url of the artwork.
     * @param {Number} averageStarRates Average star rates of the artwork.
     * @param {String} creatorId Id of the creator of the artwork.
     * @param {String} creatorAvatarUrl Avatar URL of the creator of the artwork.
     * @param {String} creatorName Nickname of the creator of the artwork.
     * @param {NewChapterResponseItem[]} newChapters The list of new chapter of current artwork.
     */
    constructor(
        artworkId,
        title,
        thumbnailUrl,
        originImageUrl,
        averageStarRates,
        creatorId,
        creatorAvatarUrl,
        creatorName,
        newChapters
    ) {
        this.artworkId = artworkId;
        this.title = title;
        this.thumbnailUrl = thumbnailUrl;
        this.originImageUrl = originImageUrl;
        this.averageStarRates = averageStarRates;
        this.creatorId = creatorId;
        this.creatorAvatarUrl = creatorAvatarUrl;
        this.creatorName = creatorName;
        this.newChapters = newChapters;
    }

    /**
     * Map from the input responseItem to an instance of RecentlyUpdatedArtworkResponseItem.
     *
     * @param {RecentlyUpdatedArtworkResponseItem} responseItem The response item to map from.
     * @returns {RecentlyUpdatedArtworkResponseItem} The instance after mapping.
     */
    static mapFrom(responseItem) {
        return new RecentlyUpdatedArtworkResponseItem(
            responseItem.artworkId,
            responseItem.title,
            responseItem.thumbnailUrl,
            responseItem.originImageUrl,
            responseItem.averageStarRates,
            responseItem.creatorId,
            responseItem.creatorAvatarUrl,
            responseItem.creatorName,
            NewChapterResponseItem.mapFromArray(responseItem.newChapters)
        );
    }

    /**
     * Map from the input array of responseItems to an array of RecentlyUpdatedArtworkResponseItem instances.
     *
     * @param {RecentlyUpdatedArtworkResponseItem[]} responseItems The array of response item to map from.
     * @returns {RecentlyUpdatedArtworkResponseItem[]} The array of instance after mapping.
     */
    static mapFromArray(responseItems) {
        return responseItems.map((item) => this.mapFrom(item));
    }
}

export { RecentlyUpdatedArtworkResponseItem };
