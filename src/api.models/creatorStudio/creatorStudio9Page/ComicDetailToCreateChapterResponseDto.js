class ComicDetailToCreateChapterResponseDto {
    /**
     * Constructor to initialize a new ComicDetailToCreateChapterResponseDto instance.
     * @param {Boolean} isExisted Check if the comic is existed or not.
     * @param {String} title The title of the comic.
     * @param {Number} lastChapterUploadOrder The last chapter's upload order of the comic.
     */
    constructor(isExisted, title, lastChapterUploadOrder) {
        this.isExisted = isExisted;
        this.title = title;
        this.lastChapterUploadOrder = lastChapterUploadOrder;
    }

    /**
     * The short hand to create a new instance of ComicDetailToCreateChapterResponseDto.
     * @returns {ComicDetailToCreateChapterResponseDto} The failed instance of ComicDetailToCreateChapterResponseDto.
     */
    static failed() {
        return new ComicDetailToCreateChapterResponseDto(false);
    }
}

export { ComicDetailToCreateChapterResponseDto };
