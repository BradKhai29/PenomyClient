class MangaSearchResponseItem {
    /**
     * @param {String} mangaId Id of the manga.
     * @param {String} mangaName Name of the manga.
     * @param {String} mangaAvatar Avatar/Thumbnail image of the manga.
     * @param {Number} mangaNumberOfStars The average star rates of the manga.
     * @param {Number} mangaNumberOfFollowers The total followers of the manga.
     */
    constructor(
        mangaId,
        mangaName,
        mangaAvatar,
        mangaNumberOfStars,
        mangaNumberOfFollowers
    ) {
        this.mangaId = mangaId;
        this.mangaName = mangaName;
        this.mangaAvatar = mangaAvatar;
        this.mangaNumberOfStars = mangaNumberOfStars;
        this.mangaNumberOfFollowers = mangaNumberOfFollowers;
    }

    /**
     * Map from the input response item to the MangaSearchResponseItem instance.
     *
     * @param {MangaSearchResponseItem} responseItem The response item to map from.
     * @returns {MangaSearchResponseItem} The instance after mapping.
     */
    static mapFrom(responseItem) {
        return new MangaSearchResponseItem(
            responseItem.mangaId,
            responseItem.mangaName,
            responseItem.mangaAvatar,
            responseItem.mangaNumberOfStars,
            responseItem.mangaNumberOfFollowers
        );
    }

    /**
     * Map from the input array of response item to the array of MangaSearchResponseItem instance.
     *
     * @param {MangaSearchResponseItem[]} responseItems The array of response item to map from.
     * @returns {MangaSearchResponseItem[]} The array of instance after mapping.
     */
    static mapFromArray(responseItems) {
        const result = responseItems.map((item) => this.mapFrom(item));

        return result;
    }
}

export { MangaSearchResponseItem };
