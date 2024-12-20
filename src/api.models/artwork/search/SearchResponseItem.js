import { MangaSearchResponseItem } from "./MangaSearchResponseItem";

class SearchResponseItem {
    /**
     * @param {String} id Id of the artwork.
     * @param {String} name Name of the artwork.
     * @param {String} avatar Avatar/Thumbnail image of the artwork.
     * @param {Number} averageStarRates The average star rates of the artwork.
     * @param {Number} numberOfFollowers The number of total followers of the artwork.
     * @param {Number} artworkType The type of artwork.
     */
    constructor(
        id,
        name,
        avatar,
        averageStarRates,
        numberOfFollowers,
        artworkType
    ) {
        this.id = id;
        this.name = name;
        this.avatar = avatar;
        this.averageStarRates = averageStarRates;
        this.numberOfFollowers = numberOfFollowers;
        this.artworkType = artworkType;
    }

    /**
     * Map from the input response item to the SearchResponseItem instance.
     *
     * @param {MangaSearchResponseItem} responseItem The response item to map from.
     * @returns {SearchResponseItem} The instance after mapping.
     */
    static mapFromManga(responseItem) {
        return new SearchResponseItem(
            responseItem.mangaId,
            responseItem.mangaName,
            responseItem.mangaAvatar,
            responseItem.mangaNumberOfStars,
            responseItem.mangaNumberOfFollowers,
            responseItem.artworkType
        );
    }

    /**
     * Map from the input response item to the SearchResponseItem instance.
     *
     * @param {MangaSearchResponseItem} responseItem The response item to map from.
     * @returns {SearchResponseItem} The instance after mapping.
     */
    static mapFromAnime(responseItem) {
        return new SearchResponseItem(
            responseItem.mangaId,
            responseItem.mangaName,
            responseItem.mangaAvatar,
            responseItem.mangaNumberOfStars,
            responseItem.mangaNumberOfFollowers,
            responseItem.artworkType
        );
    }

    /**
     * Map from the input array of response item to the array of MangaSearchResponseItem instance.
     *
     * @param {MangaSearchResponseItem[]} responseItems The array of response item to map from.
     * @returns {SearchResponseItem[]} The array of instance after mapping.
     */
    static mapFromMangaArray(responseItems) {
        const result = responseItems.map((item) => this.mapFromManga(item));

        return result;
    }
}

export { SearchResponseItem };
