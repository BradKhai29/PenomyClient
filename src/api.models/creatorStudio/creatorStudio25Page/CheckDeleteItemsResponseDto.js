class CheckDeleteItemsResponseDto {
    /**
     * @param {Boolean} hasDeletedItems True if the current creator studio has deleted items.
     * @param {Number} totalDeletedComics Total comics that have been temp deleted.
     * @param {Number} totalDeletedAnimes Total animes that have been temp deleted.
     */
    constructor(
        hasDeletedItems = false,
        totalDeletedComics = 0,
        totalDeletedAnimes = 0
    ) {
        this.hasDeletedItems = hasDeletedItems;
        this.totalDeletedComics = totalDeletedComics;
        this.totalDeletedAnimes = totalDeletedAnimes;
    }

    /**
     * Map from the input response item to the CheckDeleteItemsResponseDto instance.
     *
     * @param {CheckDeleteItemsResponseDto} apiResponse The response item to map from.
     * @returns {CheckDeleteItemsResponseDto} The instance after mapping.
     */
    static mapFrom(apiResponse) {
        return new CheckDeleteItemsResponseDto(
            apiResponse.hasDeletedItems,
            apiResponse.totalDeletedComics,
            apiResponse.totalDeletedAnimes
        );
    }
}

export { CheckDeleteItemsResponseDto };
