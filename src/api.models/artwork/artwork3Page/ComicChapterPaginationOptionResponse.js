class ComicChapterPaginationOptionResponse {
    /**
     *
     * @param {Number} totalChapters The total chapters of the specified comic.
     * @param {Number} totalPages The total pages to display when pagination.
     * @param {Boolean} isPagination Return true if the current chapter list can apply pagination.
     */
    constructor(totalChapters, totalPages, isPagination) {
        this.totalChapters = totalChapters;
        this.totalPages = totalPages;
        this.isPagination = isPagination;
    }

    /**
     * Map the api response to an instance of ComicChapterPaginationOptionResponse.
     *
     * @param {ComicChapterPaginationOptionResponse} apiResponse The api response to map from.
     */
    static mapFrom(apiResponse) {
        return new ComicChapterPaginationOptionResponse(
            apiResponse.totalChapters,
            apiResponse.totalPages,
            apiResponse.isPagination
        );
    }
}

export { ComicChapterPaginationOptionResponse };
