class PaginationOptionsApiResponse {
    /**
     * @param {Boolean} isPagination True if the pagination is available
     * @param {Number} totalArtworks The total number of artworks belonged to specified type that fetched from the creator created artwork list.
     * @param {Number} totalPages The total number of pages that will display when pagination
     * @param {Number} pageSize The size (total items to display per page) when pagination
     */
    constructor(isPagination, totalArtworks, totalPages, pageSize) {
        this.isPagination = isPagination;
        this.totalArtworks = totalArtworks;
        this.totalPages = totalPages;
        this.pageSize = pageSize;
    }

    /**
     * Map from the api response to the PaginationOptionsApiResponse instance.
     *
     * @param {PaginationOptionsApiResponse} apiResponse The api response to map from.
     * @returns {PaginationOptionsApiResponse} The instance after mapping.
     */
    static mapFrom(apiResponse) {
        return new PaginationOptionsApiResponse(
            apiResponse.isPagination,
            apiResponse.totalArtworks,
            apiResponse.totalPages,
            apiResponse.pageSize
        );
    }
}

export { PaginationOptionsApiResponse };
