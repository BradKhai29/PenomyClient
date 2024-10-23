class PaginationOptionResponseItem {
    /**
     *
     * @param {Boolean} allowPagination Check if the pagination is available or not.
     * @param {Number} totalPages The total pages to display for pagination.
     * @param {Number} totalArtworks The total artworks of all pages in the pagination.
     */
    constructor(allowPagination, totalPages, totalArtworks) {
        this.allowPagination = allowPagination;
        this.totalPages = totalPages;
        this.totalArtworks = totalArtworks;
    }
}

export { PaginationOptionResponseItem };
