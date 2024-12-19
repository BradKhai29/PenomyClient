class AnimeChapterDetailRequestDto {
    /**
     * Constructor to initialize ChapterDetail with provided values.

     * @param {string} animeId - The unique ID of the anime.
     * @param {string} title - The title of the chapter.
     * @param {string} description - The description of the chapter.
     * @param {File|null} thumbnailImageFile - The thumbnail image file for the chapter.
     * @param {File} chapterVideoFile - The video file that upload with chapter.
     * @param {number|null} publicLevel - The public visibility level (null or a specific level).
     * @param {boolean} allowComment - Whether comments are allowed on the chapter.
     * @param {boolean} confirmPolicy - Whether the user confirmed the policy.
     * @param {Object} scheduleOption - The scheduling option for the chapter.
     * @param {boolean} scheduleOption.isScheduled - Whether the chapter is scheduled.
     * @param {Date} scheduleOption.scheduleDate - The date to schedule the chapter.
     * @param {Date|null} scheduleOption.scheduleDateTime - The specific date and time to schedule.
     */
    constructor(
        animeId = "",
        title = "",
        description = "",
        thumbnailImageFile = null,
        chapterVideoFile,
        publicLevel = null,
        allowComment = false,
        confirmPolicy = false,
        scheduleOption = {
            isScheduled: false,
            scheduleDate: new Date(),
            scheduleDateTime: null,
        }
    ) {
        this.animeId = animeId;
        this.title = title;
        this.description = description;
        this.thumbnailImageFile = thumbnailImageFile;
        this.chapterVideoFile = chapterVideoFile;
        this.publicLevel = publicLevel;
        this.allowComment = allowComment;
        this.confirmPolicy = confirmPolicy;
        this.scheduleOption = scheduleOption;
    }
}

export { AnimeChapterDetailRequestDto };
