class Art3RecommendedArtworkResponseItem {
    /**
     * @param {String} id Id of the artwork item.
     * @param {String} title Title of the artwork item.
     * @param {String} thumbnailUrl Thumbnail URL of the artwork item.
     * @param {String} authorName Author name that creates this artwork item.
     * @param {String[]} categories The list of categories belonged to this artwork item.
     */
    constructor(id, title, thumbnailUrl, authorName, categories) {
        this.id = id;
        this.title = title;
        this.thumbnailUrl = thumbnailUrl;
        this.authorName = authorName;
        this.categories = categories;
    }

    getCategoryListString() {
        return this.categories.join(", ");
    }

    /**
     * Map from the input response item to the Art3RecommendedArtworkResponseItem instance.
     *
     * @param {Art3RecommendedArtworkResponseItem} responseItem The response item to map from.
     * @returns {Art3RecommendedArtworkResponseItem} The instance after mapping.
     */
    static mapFrom(responseItem) {
        return new Art3RecommendedArtworkResponseItem(
            responseItem.id,
            responseItem.title,
            responseItem.thumbnailUrl,
            responseItem.authorName,
            responseItem.categories
        );
    }

    /**
     * Map from the input array of response item to the
     * array of Art3RecommendedArtworkResponseItem instance.
     *
     * @param {Art3RecommendedArtworkResponseItem[]} responseItems The array of item to map from.
     * @returns {Art3RecommendedArtworkResponseItem[]} The array after mapping.
     */
    static mapFromArray(responseItems) {
        const result = responseItems.map((item) => this.mapFrom(item));

        return result;
    }
}

export { Art3RecommendedArtworkResponseItem };
