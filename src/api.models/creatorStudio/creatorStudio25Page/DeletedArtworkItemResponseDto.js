class DeletedArtworkItemResponseDto {
    constructor(
        id,
        title,
        thumbnailUrl,
        publicLevel,
        artworkStatus,
        totalUsersRated,
        averageStarRates,
        totalChapters,
        removedAt,
        totalViews,
        totalFollowers
    ) {
        this.id = id;
        this.title = title;
        this.thumbnailUrl = thumbnailUrl;
        this.artworkStatus = artworkStatus;
        this.publicLevel = publicLevel;
        this.totalUsersRated = totalUsersRated;
        this.averageStarRates = averageStarRates;
        this.totalChapters = totalChapters;
        this.removedAt = removedAt;
        this.totalViews = totalViews;
        this.totalFollowers = totalFollowers;
    }

    /**
     * Map from the input response item to the DeletedArtworkItemResponseDto instance.
     *
     * @param {DeletedArtworkItemResponseDto} responseItem The response item to map from.
     * @returns {DeletedArtworkItemResponseDto} The instance after mapping.
     */
    static mapFrom(responseItem) {
        return new DeletedArtworkItemResponseDto(
            responseItem.id,
            responseItem.title,
            responseItem.thumbnailUrl,
            responseItem.publicLevel,
            responseItem.artworkStatus,
            responseItem.totalUsersRated,
            responseItem.averageStarRates,
            responseItem.totalChapters,
            responseItem.removedAt,
            responseItem.totalViews,
            responseItem.totalFollowers
        );
    }

    /**
     * Map from the input response item to the DeletedArtworkItemResponseDto instance.
     *
     * @param {DeletedArtworkItemResponseDto[]} responseItems The response item to map from.
     * @returns {DeletedArtworkItemResponseDto[]} The instance after mapping.
     */
    static mapFromArray(responseItems) {
        const result = responseItems.map((item) => this.mapFrom(item));

        return result;
    }
}

export { DeletedArtworkItemResponseDto };
