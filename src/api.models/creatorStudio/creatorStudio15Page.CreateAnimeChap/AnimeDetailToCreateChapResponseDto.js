class AnimeDetailToCreateChapterResponseDto {
    /**
     * Constructor to initialize a new AnimeDetailToCreateChapterResponseDto instance.
     * @param {String} title The title of the comic.
     * @param {Number} lastChapterUploadOrder The last chapter's upload order of the comic.
     */
    constructor(title, lastChapterUploadOrder) {
        this.title = title;
        this.lastChapterUploadOrder = lastChapterUploadOrder;
    }
}

export { AnimeDetailToCreateChapterResponseDto };
